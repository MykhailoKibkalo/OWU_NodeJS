const {
    constants: {
        DOCS_MIMETYPES,
        FILE_MAX_SIZE,
        IMAGE_MAX_SIZE,
        IMAGES_MIMETYPES
    }
} = require('../constant');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;

            console.log('======================');
            console.log(files);
            console.log('======================');

            const allFiles = Object.values(files);

            const docs = [];
            const images = [];

            for (let i = 0; i < allFiles.length; i++) {
                const nameImg = Object.keys(files);

                console.log('+++++++++++++++++++++');
                console.log(nameImg[0]);
                console.log('+++++++++++++++++++++');

                const { name, size, mimetype } = allFiles[i]; // ERR WITH 'name'

                if (IMAGES_MIMETYPES.includes(mimetype)) {
                    if (IMAGE_MAX_SIZE < size) {
                        throw new Error('TEXT FOR ERR IMG');
                    }

                    images.push(allFiles[i]);
                } else if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (FILE_MAX_SIZE < size) {
                        throw new Error('TEXT FOR ERR DOC');
                    }

                    docs.push(allFiles[i]);
                } else {
                    throw new Error('NAPISATI NORMALNU ERROR');
                }
            }

            req.docs = docs;
            req.images = images;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkImage: (req, res, next) => {
        try {
            if (req.images.length > 1) {
                throw new Error('Sorry, but u can upload only 1 img');
            }

            [req.img] = req.images; // req.img = req.images[0];
            next();
        } catch (e) {
            next(e);
        }
    }
};
