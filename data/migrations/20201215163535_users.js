exports.up = function (knex) {
	return knex.schema.createTable('users', (table) => {
		table.increments();
		table.string('username', 32).notNullable().unique();
		table.string('password').notNullable();
		table.string('department').notNullable().defaultTo('lambda');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('users');
};
