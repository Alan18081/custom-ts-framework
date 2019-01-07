
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('project_accounts', t => {
     t.increments('id').unsigned().primary();
     t.integer('projectId').unsigned().notNull();
     t.string('login').notNull();
     t.string('email').notNull();
     t.string('password').notNull();
     t.date('createdAt').notNull();
     t.date('updatedAt');
     t.foreign('projectId').references('id').inTable('projects');
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('project_accounts');
};
