import { CreateCacheFactory } from '@astra/common';
import { cacheManager } from './cache-manager';

export const CacheFactory = CreateCacheFactory(cacheManager);
