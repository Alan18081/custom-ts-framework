
exports.up = async function(knex, Promise) {
  await knex.createTableIfNotExists('projects', t => {
    t.increments('id').unsigned().primary();
    t.string('name').notNull();
    t.string('description');
    t.string('clientId');
    t.string('clientSecret');
    t.integer('authProjectId').unsigned();
    t.integer('storagesCount').unsigned().default(0);
    t.integer('userId').unsigned();
    t.date('createdAt').notNull();
  });

  await knex.createTableIfNotExists('storages', t => {
    t.increments('id').unsinged().primary();
    t.string('name').notNull().unique();
    t.string('description');
    t.string('dataId').notNull();
    t.foreign('projectId').reference('id').inTable('projects');
  });
};

exports.down = async function(knex, Promise) {
  knex.dropTableIfExists('projects');
  knex.dropTableIfExists('storages');
};
