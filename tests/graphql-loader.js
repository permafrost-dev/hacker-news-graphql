/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const fs = require('fs');

const importGraphQL = file => {
    return fs.readFileSync(file, 'utf-8');
};

module.exports = {
    process(src, filename, config, options) {
        return `module.exports = \`${importGraphQL(filename)}\`;`;
    },
};
