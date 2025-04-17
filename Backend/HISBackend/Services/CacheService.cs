using Microsoft.Extensions.Caching.Memory;

namespace HISBackend.Services
{

    public class CacheService : ICacheService
    {
        private readonly IMemoryCache _cache;

        public CacheService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public async Task<T> GetOrAddAsync<T>(string cacheKey, Func<Task<T>> fetchData, TimeSpan absoluteExpiration, TimeSpan? slidingExpiration = null)
        {
            if (!_cache.TryGetValue(cacheKey, out T cachedData))
            {
                // Fetch the data if not in cache
                cachedData = await fetchData();

                // Set cache options
                var cacheOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = absoluteExpiration,
                    SlidingExpiration = slidingExpiration
                };

                // Store the data in cache
                _cache.Set(cacheKey, cachedData, cacheOptions);
            }

            return cachedData;
        }
    }

}
