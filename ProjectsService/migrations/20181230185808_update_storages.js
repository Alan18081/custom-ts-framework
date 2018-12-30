
exports.up = async function(knex, Promise) {
  await knex.schema.alterTable('storages', t => {
      t.string('dataId').nullable().alter();
  });
};

exports.down = async function(knex, Promise) {
    await knex.schema.alterTable('storages', t => {
        t.string('dataId').notNullable().alter();
    });
};
