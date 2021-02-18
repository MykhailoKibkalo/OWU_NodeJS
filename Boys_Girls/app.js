const fs = require('fs');
const path = require('path');

const boys = path.join(__dirname, '1800');
const girls = path.join(__dirname, '2000');

function checkFiles(myPth) {
    fs.readdir(myPth, ((err, files) => {
        if (err) {
            console.log(err);
        }
        files.map(fileName => {
            fs.readFile(path.join(myPth, fileName), (err1, data) => {
                const user = JSON.parse(data);
                if (user.gender === 'female') {
                    fs.rename(path.join(myPth, fileName), path.join(girls, fileName), err2 => {
                        if (err2) console.log(err2)
                    })
                } else {
                    if (user.gender === 'male'){
                    fs.rename(path.join(myPth, fileName), path.join(boys, fileName), err3 => {
                        if (err3) console.log(err3)
                    })
                    }
                }
            })
        })
    }
    ))
}
checkFiles(boys);
checkFiles(girls);
