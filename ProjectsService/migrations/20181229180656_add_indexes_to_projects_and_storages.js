
exports.up = async function(knex, Promise) {
  await knex.schema.alterTable('projects', t => {
     t.index(['id', 'name']);
  });

  await knex.schema.alterTable('storages', t => {
     t.string('path').notNull();
     t.index(['id', 'name']);
     t.unique('path');
  });
};

exports.down = async function(knex, Promise) {
    await knex.schema.alterTable('projects', t => {
        t.dropIndex(['id', 'name']);
    });

    await knex.schema.alterTable('storages', t => {
        t.dropColumn('path');
        t.dropIndex(['id', 'name']);
        t.dropUnique('path');
    });
};
