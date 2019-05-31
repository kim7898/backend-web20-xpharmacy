const express = require('express');
const router = express.Router();
const authController = require('./controller');

router.post("/login", (req, res) => {
    authController
    .login(req.body)
    .then(userInfo => {
        req.session.userInfo = userInfo;
        res.status(200).send("Login succes");
    }).catch(err => {
        res.status(501).send(err);
    })
});
router.post("/signup", (req,res)=>{
    authController
    .signup(req.body)
    .then(user => {
        req.session.userInfo = {account: user.account , id: user._id};
        res.status(200).send("register success");
    }).catch(err => {
        res.status(501).send(err);
    })


})

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.status(200).send("Log out success");
})

router.get("/me", (req, res) => {
    if(req.session.userInfo) {
        res.status(200).send(req.session.userInfo);
    } else res.status(401).send("Not signin");
})
module.exports = router;