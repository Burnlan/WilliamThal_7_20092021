//we import multer
const multer = require('multer');

//we set where and how multer saves the files
const storage = multer.diskStorage({
    //we store the files in the 'images' folder
    destination: (req, file, callback) => {
        callback(null, 'images');
  },
    //we generate the filename
    filename: (req, file, callback) => {
        //we don't allow spaces in files
        const name = file.originalname.split(' ').join('_');
        callback(null, name);
  }
});

//we export multer
module.exports = multer({storage: storage}).single('image');