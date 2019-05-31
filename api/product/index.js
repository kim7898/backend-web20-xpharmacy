const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: "/app/uploads"});
const { createProduct, getAllProduct, getOneProduct, deleteProduct } = require('./controller');

router.post("/",upload.single("image"), (req, res) => {
    req.body.imgFile = req.file;
    createProduct(req.body)
    .then(productId => res.status(200).send(productId))
    .catch(err => res.status(501).send(err));
});
router.get("/", (req, res) => {
    getAllProduct(req.query.page || 1)
    .then(allProducts => res.status(200).json(allProducts))
    .catch(err => res.status(501).send(err));

});
router.get("/:id", (req, res) => {
    getOneProduct(req.params.id)
    .then(product => res.status(200).json(Object.assign({}, product, {
        imageUrl: `/product/${product._id}/data`
    }))).catch(err => res.send(err));
});
router.get("/:id/data", (req, res) => {
    getOneProduct(req.params.id)
    .then(product => {
        res.contentType(product.contentType);
        res.send(product.image);
    }).catch(err => res.status(501).send(err));
});
router.delete("/:id", (req, res) => {
    deleteProduct(req.params.id)
    .then(product => res.status(200).send("Delete success "))
    .catch(err => res.status(501).send(err));
});

module.exports = router;