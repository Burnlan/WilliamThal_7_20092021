//we import multer
const multer = require('multer');

//we set our extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//we set where and how multer saves the files
const storage = multer.diskStorage({
    //we store the files in the 'images' folder
    destination: (req, file, callback) => {
        callback(null, 'images');
  },
    //we generate the filename
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name+"."+extension);
  }
});

//we export multer
module.exports = multer({storage: storage}).single('image');