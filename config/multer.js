var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb){
    cb(null, Date.now() + '-' + file.originalname)
  }
});

var upload = multer({storage: storage})

module.export = upload;
