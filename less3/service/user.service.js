const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'dataBase', 'users.json');
// const express = require('express');
// const { promisify } = require('util');
// const readJSONPromise = promisify(fs.readJSON);
// const readFile = promisify(fse.readFile);
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

module.exports = {
    findUsers: () => fs.readJSON(filePath),

    findUserById: async (userId) => {
        const DB = await fs.readJSON(filePath);

        return DB[userId];

        // const buffer = await readFile(filePath);
        // const user = JSON.parse(buffer.toString())[userId];
        // console.log(user);
        // return user;
    },

    createUser: async (user) => {
        const DB = await fs.readJSON(filePath);

        console.log(user);
        DB.push(user);
        return fs.writeJSON(filePath, DB);
    }

};
