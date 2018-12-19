var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
exports.up = function (knex, Promise) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable('positions', t => {
            t.increments('id').unsigned().primary();
            t.string('title').notNull();
            t.decimal('averageSalary').notNull();
        });
        yield knex.schema.createTable('users', t => {
            t.increments('id').unsigned().primary();
            t.string('firstName').nullable();
            t.string('lastName').nullable();
            t.string('email').notNull();
            t.string('password').notNull();
            t.integer('positionId').unsigned();
            t.foreign('positionId').references('positions.id');
        });
    });
};
exports.down = function (knex, Promise) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable('users');
        yield knex.schema.dropTable('positions');
    });
};
