const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "/app/uploads/" });

const { createPrescription, getAllPrecription, getOnePresciption } = require("./controller")

router.post("/",
    upload.single("image"),
    
    (req, res) => {
        // req.body.userId = req.session.userInfo.id ;
        req.body.imgFile = req.file;
        createPrescription(req.body)
            .then(data => res.status(200).send(data._id))
            .catch(err => res.status(503).send(err));
    });

router.get("/", (req, res) => {
    getAllPrecription(req.query.page || 1)
    .then(allPresciption => res.status(200).json(allPresciption))
    .catch(err => res.status(503).send(err));
});

router.get("/:presId", (req, res) => {
    getOnePresciption(req.params.presId)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).send(err));
})

router.get("/:presId/data", (req, res) => {
    getOnePresciption(req.params.presId)
    .then(pres => {
        res.contentType(pres.contentType);
        res.send(pres.image);
    }).catch(err => res.status(502).send(err));
})
module.exports = router;