using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Caching.Distributed;

namespace HISBackend.Services
{

    public class CacheService : ICacheService
    {
        private readonly IMemoryCache _cache;
        private readonly IDistributedCache _redisCache;


        public CacheService(IMemoryCache cache, IDistributedCache redisCache)
        {
            _cache = cache;
            _redisCache = redisCache;

        }

        public async Task<T> GetOrAddAsync<T>(string cacheKey, Func<Task<T>> fetchData, TimeSpan absoluteExpiration, TimeSpan? slidingExpiration = null)
        {
            //check if data in redis cache
          var redisData = await _redisCache.GetStringAsync(cacheKey);
        if (redisData != null)
        {
            var deserializedRedisData = System.Text.Json.JsonSerializer.Deserialize<T>(redisData);
            
            var redisCacheOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = absoluteExpiration,
                SlidingExpiration = slidingExpiration
            };

            _cache.Set(cacheKey, deserializedRedisData, redisCacheOptions);

            return deserializedRedisData;
        }

        // if not in redis get from IMemoryCache
        if (_cache.TryGetValue(cacheKey, out T memoryCachedData))
        {
            return memoryCachedData;
        }

       // Fetch the data if not in both cache
        var data = await fetchData();

        // set cache options in both Redis and MemoryCache
        var memoryOptions = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = absoluteExpiration,
            SlidingExpiration = slidingExpiration
        };

       // Store the data in cache
 
        _cache.Set(cacheKey, data, memoryOptions);

        var serializedData = System.Text.Json.JsonSerializer.Serialize(data);

        var redisOptions = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = absoluteExpiration,
            SlidingExpiration = slidingExpiration
        };

        // Store the data in Redis cache
        await _redisCache.SetStringAsync(cacheKey, serializedData, redisOptions);

        return data;
    }

       
    }

}
