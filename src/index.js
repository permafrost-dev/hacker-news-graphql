import { App } from '@tinyhttp/app';
import { getServer } from './lib/server';

require('dotenv').config();

const port = parseInt(process.env.PORT) || 3000;
const isDevelopmentMode = process.env.NODE_ENV === 'development';

getServer(new App(), isDevelopmentMode).listen(port, () => console.log(`Listening on http://localhost:${port}`));
