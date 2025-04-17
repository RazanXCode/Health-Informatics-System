using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HISBackend.Data;
using HISBackend.DTOs;
using HISBackend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using StackExchange.Redis;
using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;


namespace HISBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly MyAppDbContext _context;
        private readonly IMemoryCache _memoryCache;
        private readonly IConnectionMultiplexer _redis;


        public DoctorController(MyAppDbContext context, IMemoryCache memoryCache, IConnectionMultiplexer redis)
        {
            _context = context;
            _memoryCache = memoryCache;
            _redis = redis;
        }

        /// <summary>
        /// Retrieves all doctors with their details
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<DoctorDto>>> GetAllDoctors()
        {
            // Key to save and retrive data from Redis/Imemory 
            string cacheKey = "all_doctors";

            // First Try looking in the IMemoryCache
            if (_memoryCache.TryGetValue(cacheKey, out List<DoctorDto> doctors))
            {
                return Ok(doctors);
            }

            // Secound Try Redis 
            var db = _redis.GetDatabase();
            var redisData = await db.StringGetAsync(cacheKey);

            if (redisData.HasValue)
            {
                doctors = JsonSerializer.Deserialize<List<DoctorDto>>(redisData);
                _memoryCache.Set(cacheKey, doctors, TimeSpan.FromMinutes(2));
                return Ok(doctors);
            }

            // If not in both Immemory and Redis retrive from database 
            doctors = await _context.Users
                .Where(u => u.Role == RoleType.Doctor)
                .Select(u => new DoctorDto
                {
                    UserId = u.UserId,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    Phone = u.Phone,
                    Specialty = u.Specialty.ToString()
                })
                .AsNoTracking()
                .ToListAsync();

            // Save to Redis and IMemoryCache
            var serialized = JsonSerializer.Serialize(doctors);
            await db.StringSetAsync(cacheKey, serialized, TimeSpan.FromMinutes(5));
            _memoryCache.Set(cacheKey, doctors, TimeSpan.FromMinutes(2));

            return Ok(doctors);
        }


    }
}