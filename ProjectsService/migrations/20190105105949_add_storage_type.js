
exports.up = async function(knex, Promise) {
  await knex.schema.table('storages', t => {
     t.integer('typeId').unsigned().notNull().default(1);
  });
};

exports.down = async function(knex, Promise) {
    await knex.schema.table('storages', t => {
        t.dropColumn('typeId');
    });
};
