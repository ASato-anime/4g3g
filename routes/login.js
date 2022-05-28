const express = require('express');
const router = express.Router();
const USER = require('../models/USER');

router.get("/login", (req, res) => {
    res.render('login', {
        ErrorsArr: [],
    })
});

router.post("/login", async(req, res) => {
    let errors = [];
    const email = req.body.email;
    const password = req.body.password;
    const exUser = await USER.findOne({ email: email });

    if (!exUser) {
        errors.push({ msg: "No user exists." });
        return res.render("login", {
            ErrorsArr: errors,
        })
    }

    if (password !== exUser.password) {
        errors.push({ msg: "Password is not correct." });
        return res.render("login", {
            ErrorsArr: errors,
        })
    }


    req.session.isAuth = true;

    req.session.Email = exUser.email;

    return res.redirect('/myprofile')

})

module.exports = router