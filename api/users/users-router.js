const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../middlewares/restricted');

router.get('/', restricted, async (req, res) => {
	try {
		const users = await Users.find();
		res.status(200).json(users);
	} catch (err) {
		console.log(err.message);
		res.status(500).json('500 server error');
	}
});

module.exports = router;
