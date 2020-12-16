const db = require('../../data/dbConfig');

module.exports = {
	find,
	findById,
	findBy,
	add,
};

function find() {
	return db('users');
}

function findById(id) {
	return db('users').where({ id }).first();
}

function findBy(key) {
	return db('users').where(key).first();
}

async function add(user) {
	const [id] = await db('users').insert(user, 'id');
	return findById(id);
}
