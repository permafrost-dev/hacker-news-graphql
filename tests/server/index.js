import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import sirv from 'sirv';
import { readFile } from 'fs/promises';

new App()
    .use(logger())
    .get('/newstories.json', async (_, res) => {
        const file = await readFile(`${process.cwd()}/tests/fixtures/newstories.json`);
        res.send(file.toString());
    })
    .use(sirv('./tests/fixtures'))
    .listen(3031);
