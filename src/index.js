import { App } from '@tinyhttp/app';
import { getServer } from './lib/server';

require('dotenv').config();

const port = parseInt(process.env.PORT) || 3000;
const isDevelopmentMode = process.env.NODE_ENV === 'development';
const cacheDriver = (process.env.CACHE_DRIVER || 'memory').toLowerCase();

getServer(new App(), isDevelopmentMode, cacheDriver).listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    console.log(`Cache driver: ${cacheDriver}`);
});
