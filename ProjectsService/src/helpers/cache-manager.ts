import { CacheManager } from '@astra/common';
import { config } from '@astra/common';

export const cacheManager = new CacheManager(
    config.ProjectsService.redis.host,
    config.ProjectsService.redis.port,
    config.ProjectsService.redis.db
);