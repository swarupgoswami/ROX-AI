const multer=require('multer');


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

const fileFilter=(req,file,cb)=>{
    const allowedTypes=['image/jpg','image/png','image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('only.jpng,.jpg and .png files are formats are allowed'),false);
    }
};

const upload=multer({storage,fileFilter});

module.exports=upload;