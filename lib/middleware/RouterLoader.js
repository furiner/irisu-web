const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    let routerPath = __dirname + '/../../routes';

    (function read(dirPath, router = '') {
        let files = fs.readdirSync(dirPath);
        for (let file of files) {
            let stat = fs.lstatSync(path.join(dirPath, file));

            if (stat.isDirectory()) {
                read(path.join(dirPath, file), router + '/' + file);
            } else {
                // file
                //let p = path.parse(dirPath);
                let route = `${router}/${file.slice(0, -3)}`;
                let routerClass = require(path.join(dirPath, file));
                let routerAliases = routerClass.aliases || []
                let aliases = [route, ...routerAliases];

                for (let alias of aliases) {
                    app.use(alias, routerClass);
                }

                app.use(route, routerClass);
            }
        }
    })(routerPath);
};