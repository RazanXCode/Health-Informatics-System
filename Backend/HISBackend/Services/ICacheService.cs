namespace HISBackend.Services
{
    public interface ICacheService
    {
        Task<T> GetOrAddAsync<T>(string cacheKey, Func<Task<T>> fetchData, TimeSpan absoluteExpiration, TimeSpan? slidingExpiration = null);
    }

}
