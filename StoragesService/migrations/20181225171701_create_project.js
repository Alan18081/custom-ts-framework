
exports.up = async function(knex, Promise) {
  await knex.createTableIfNotExists(t => {
    t.increments('id').unsigned().primary();
    t.string('name').notNull();
  });
};

exports.down = async function(knex, Promise) {
  knex.dropTableIfExists('projects');
};
