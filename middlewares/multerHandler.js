const multer = require('multer');
const path = require('path');

const storage =  multer.diskStorage({
    destination: async (req, file, img) => {
        img(null, path.join(__dirname, '../public/images'))
    },
    filename: (req, file, name) => {
        const originalExtension = path.extname(file.originalname);
        name(null, `image${Date.now()}${originalExtension}`);
    },
});

module.exports = {
    storage
}