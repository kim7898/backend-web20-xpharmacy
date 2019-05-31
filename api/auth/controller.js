const { getUserByAccount , register } = require('../user/controller');
const bcrypt = require('bcryptjs');
const login = ({ account, password }) => {
    return new Promise((resolve, reject) => {
        getUserByAccount(account)
            .then(user => {
                if (!user || !user.password) {
                    reject({
                        status: 400,
                        err: "Incorrect username/password"
                    })
                }else{
                    bcrypt.compare(password, user.password)
                    .then(res => {
                        if(res){
                            resolve({account: user.account , id: user._id})
                        }
                    }).catch(err => reject(err))
                }
            }).catch(err => reject(err));
    })
};
const signup = ({ account, username , password , address , phonenumber , email  }) => {
    return new Promise((resolve, reject) => {
        register({ account, username , password , address , phonenumber , email  })
            .then(user => { 
                resolve(user)
            }).catch(err => reject(err));
    })
};
module.exports = {
    login, 
    signup
};