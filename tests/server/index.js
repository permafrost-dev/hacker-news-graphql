import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import sirv from 'sirv';
import { readFile } from 'fs/promises';

const loadFixtureFile = async filename => {
    const file = await readFile(`${process.cwd()}/tests/fixtures/${filename}`);

    return file.toString();
};

new App()
    .use(logger())
    .get('/newstories.json', async (_, res) => {
        const data = await loadFixtureFile('newstories.json');
        res.send(data);
    })
    .get('/jobstories.json', async (_, res) => {
        const data = await loadFixtureFile('jobstories.json');
        res.send(data);
    })
    .use(sirv('./tests/fixtures'))
    .listen(3031, () => console.log('listening on http://localhost:3031'));
