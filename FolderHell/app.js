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
