const productModel = require('./productModel');
const fs = require('fs');
const createProduct = ({ title, description, price, imgFile }) => {
    return new Promise((resolve, reject) => {
        productModel.create({
            image: fs.readFileSync(imgFile.path),
            contentType: imgFile.mimetype,
            title,
            description,
            price
        }).then(product => resolve(product._id))
            .catch(err => reject(err));
    });
};

const getAllProduct = (page) => {
    return new Promise((resolve, reject) => {
        productModel.find({})
            .limit(10)
            .skip((page - 1) * 10)
            .exec()
            .then(allProduct =>
                resolve(
                    allProduct.map(product =>
                        Object.assign({}, product._doc, {
                            imageUrl: `/product/${product._id}/data`
                        })
                    )
                )
            )
            .catch(err => reject(err))
    })
};

const getOneProduct = (id) => {
    return new Promise((resolve, reject) => {
        productModel.findById(id)
            .exec()
            .then(product => resolve(product))
            .catch(err => reject(err));
    })
};
const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        productModel.findByIdAndRemove(id, (err, product) => {
            if(err) return reject(err);
            else{
                return reject(product);
            }
        });

    })
}
module.exports = {
    createProduct,
    getAllProduct,
    getOneProduct,
    deleteProduct
}