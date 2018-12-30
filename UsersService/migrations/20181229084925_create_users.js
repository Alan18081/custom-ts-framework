exports.up = async function(knex, Promise) {
    await knex.schema.createTable('positions', t => {
        t.increments('id').unsigned().primary();
        t.string('title').notNull();
        t.decimal('averageSalary').notNull();
    });

    await knex.schema.createTable('users', t => {
        t.increments('id').unsigned().primary();
        t.string('firstName').nullable();
        t.string('lastName').nullable();
        t.string('email').notNull();
        t.string('password').notNull();
        t.integer('roleId').unsigned();
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('positions');
};
