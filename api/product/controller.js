const productModel = require('./productModel');
const fs = require('fs');
const createProduct = ({ title, description, price, imgFile, category, bestSeller }) => {
    return new Promise((resolve, reject) => {
        productModel.create({
            image: fs.readFileSync(imgFile.path),
            contentType: imgFile.mimetype,
            title,
            description,
            price,
            category,
            bestSeller
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
            .then(product => resolve(product._doc))
            .catch(err => reject(err));
    })
};
const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        productModel.findByIdAndRemove(id, (err, product) => {
            if (err) return reject(err);
            else {
                return resolve(product);
            }
        });

    })
};

const getBestSeller = () => {
    return new Promise((resolve, reject) => {
<<<<<<< HEAD
        productModel.find({ bestSeller: true })
            .then(bestSellerProducts => resolve(
                bestSellerProducts.map(product =>
                    Object.assign({}, product._doc, {
                        url: `api/v1/product/${product._id}/data`
                    })
                )
=======
        productModel.find({bestSeller: true})
        .then(bestSellerProducts => resolve(
            bestSellerProducts.map(product =>
                Object.assign({}, product._doc, {
                    imageUrl: `/product/${product._id}/data`
                })
            )
>>>>>>> 78c100098a198b0f9c96092364969a0d302da13a
            )
            ).catch(err => reject);
    })
}

const getProductByCategory = (category) => {
    return new Promise((resolve, reject) => {
        productModel.find({ category: `"${category}"` })
            .then(products => resolve(
                products.map(product => 
                    Object.assign({},product._doc,{
                        url:`api/v1/${product._id}/data`
                    })    
                )
            ))
            .catch(err => reject(err));
    })
}
module.exports = {
    createProduct,
    getAllProduct,
    getOneProduct,
    deleteProduct,
    getBestSeller,
    getProductByCategory
}