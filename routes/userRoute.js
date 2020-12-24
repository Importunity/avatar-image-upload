const express = require( 'express');
const router = express.Router();
const cloudinary = require( '../config/cloudinary');
const upload = require( '../config/multer');
const User = require( '../model/user.js');

router.post("/", upload.single("image"), async (request, response) => {
    try{
        const filePath = request.file.path;
        const result = await cloudinary.uploader.upload(filePath);
        const user = new User({
            name: request.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        })
        await user.save();
        response.json(user);
    }catch(error){
        console.log(error)
    }
})


router.get("/", async (request, response) => {
    try{
        let user = await User.find();
        response.json(user);
    }catch(error){
        console.log(error);
    }
})


module.exports = router;
  