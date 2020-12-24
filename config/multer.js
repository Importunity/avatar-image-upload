const multer = require('multer');
const path = require('path');


module.exports =  multer({
    storage: multer.diskStorage({}),
    fileFilter: (request, file, callback) => {
        let extension_name = path.extname(file.originalname).toLowerCase();
        if(extension_name !== ".jpg" && extension_name !== ".jpeg" && extension_name !== ".png"){
            callback(new Error("File type not supported"), false);
            return;
        }
        callback(null, true);
    },
});