const precriptModel = require('./prescriptModel');
const fs = require('fs');

const createPrescription = ({ phone, userId, imgFile }) => {
    return new Promise((resolve, reject) => {
        precriptModel.create({
            image: fs.readFileSync(imgFile.path),
            contentType: imgFile.mimetype,
            phone,
            createBy: userId
        })
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
};

const getAllPrecription = (page) => {
    return new Promise((resolve, reject) => {
        precriptModel.find({})
            .limit(20)
            .skip(20 * (page - 1))
            .exec()
            .then(allPres => {
                resolve(
                    allPres.map(pres =>
                        Object.assign({}, pres._doc, {
                            imageUrl: `/prescription/${pres._id}/data`
                        })
                    )
                )
            })
            .catch(err => reject(err));
    })
};

const getOnePresciption = (id) => {
    return new Promise((resolve, reject) => {
        precriptModel.findById(id)
            .exec()
            .then(pres => resolve(pres))
            .catch(err => reject(err));
    })
};



module.exports = {
    createPrescription,
    getAllPrecription,
    getOnePresciption,
}