const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');

const { jwtSecret } = require('../../config/secrets');

// middlewares
const validateCredentials = require('../middlewares/validateCredentials');

router.post('/register', validateCredentials, async (req, res) => {
	console.log('register endpoint');
	const rounds = process.env.BCRYPT_ROUNDS || 10;
	const hash = bcrypt.hashSync(req.user.password, rounds);
	req.user.password = hash;
	try {
		const user = Users.add(req.user);
		res.status(201).json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: '*** 500 *** ' + err.message });
	}
});

router.post('/login', validateCredentials, async (req, res) => {
	console.log('login endpoint');
	try {
		const user = await Users.findBy({ username: req.user.username });
		if (user && bcrypt.compareSync(req.user.password, user.password)) {
			const token = makeToken(user);
			res
				.status(200)
				.json({ message: `welcome ${user.username}`, token: token });
		} else {
			res.status(401).json({ errMessage: 'invalid credentials' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json('500 error');
	}
});

// needs to be pushed to another file
const makeToken = (user) => {
	const payload = {
		subject: user.id,
		username: user.username,
		department: user.department,
	};
	const options = {
		expiresIn: '900s',
	};
	return jwt.sign(payload, jwtSecret, options);
};

module.exports = router;
