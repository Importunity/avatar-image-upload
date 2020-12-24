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

router.delete("/:id", async (request, response) => {
    try{
        let user = await User.findById(request.params.id);
        await cloudinary.uploader.destroy(user.cloudinary_id);
        await user.remove();
        response.json(user);
    }catch(error){
        console.log(error);
    }
})

router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(user.cloudinary_id);
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
        name: req.body.name || user.name,
        avatar: result.secure_url || user.avatar,
        cloudinary_id: result.public_id || user.cloudinary_id,
        };
        user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
  