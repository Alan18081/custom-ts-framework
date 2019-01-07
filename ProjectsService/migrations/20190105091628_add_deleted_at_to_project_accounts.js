
exports.up = async function(knex, Promise) {
  await knex.schema.table('project_accounts', t => {
     t.date('deletedAt');
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.table('project_accounts', t => {
     t.dropColumn('deletedAt');
  });
};
