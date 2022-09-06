const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get('/signup', (req, res, next) => {
	res.render('signup')
});

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body
	//validation
	if (password.length < 4) {
		res.render('signup', { message: 'Password has to be 4  chars min' })
		return
	}
	// check if username is not empty
	if (username === '') {
		res.render('signup', { message: 'Username cannot be empty' })
		return
	}
	// validation passed
	// check if the username is already used
	User.find({ username: username })
		.then(userFromDB => {
			if (userFromDB !== null) {
				res.render('signup', { message: 'Your username is already taken' })
			} else {
				// we can use that username
				// hash the password
				const salt = bcrypt.genSaltSync()
				const hash = bcrypt.hashSync(password, salt)
				console.log(hash)
				// create the user
				User.create({ username: username, password: hash })
					.then(createdUser => {
						console.log(createdUser)
						res.redirect('/auth/login')
					})
					.catch(err => {
						next(err)
					})
			}
		})
});


router.get('/login', (req, res, next) => {
	res.render('login')
});




module.exports = router;