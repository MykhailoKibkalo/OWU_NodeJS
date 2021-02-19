const fs = require('fs');
const path = require('path');

const badPath = path.join(__dirname, 'bad');
const goodPath = path.join(__dirname, 'good');

function cleaner(badPath, goodPath) {
    fs.readdir(badPath, (err, files) => {
        if (err) {
            console.log(err);
        }

        files.forEach(file => {
            const tempPath = path.join(badPath, file);
            fs.stat(tempPath, (err1, stats) => {
                if (err1) {
                    console.log(err1);
                }
                if (stats.isDirectory()) {
                    cleaner(tempPath, goodPath);
                } else
                {
                    fs.rename(tempPath, path.join(goodPath, file), err2 => {
                        if (err2) {
                            console.log(err2);
                        }
                    })
                }

            })
        })
    });


};

cleaner(badPath,goodPath);

//---------------------------------------------------------------------

const { promisify } = require('util')
const fs = require('fs')
const readFile = promisify(fs.readFile);

// npm i fs-extra
const fsExtra = require('fs-extra')

const path = require('path');

// npm i chalk -D
const chalk = require('chalk')

const func = async() => {
    try {
        //1 - util
        // const data = await readFile(path.join(process.cwd(), 'test.txt')))

        // 2 - fs-extra
        const data = await fsExtra.readFile(path.join(process.cwd(), 'test.txt'))
        console.log(chalk.blue.bold.underline(data.toString()))
    } catch (e) {
        console.log(e.message)
    }
}

func()
