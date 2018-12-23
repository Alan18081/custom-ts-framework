"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("./knex");
const pg = require("pg-promise");
const raw = pg()({});
class BaseModel {
    constructor(...args) {
        return new Proxy(this, this);
    }
    ;
    static createQueryBuilder() {
        return knex_1.db.queryBuilder();
    }
    static getOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield raw.oneOrNone(query.toSQL().sql);
            return new this(data);
        });
    }
    static getMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield raw.manyOrNone(query.toSQL().sql);
            return data.map(item => new this(item));
        });
    }
    static save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawData = yield knex_1.db.table(this.tableName)
                .insert(entity)
                .returning('*');
            return new this(rawData);
        });
    }
    static update(query, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawData = yield knex_1.db.table(this.tableName)
                .update(entity)
                .where(query)
                .returning('*');
            return new this(rawData);
        });
    }
    static delete(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.db.table(this.tableName)
                .delete('')
                .where(query);
        });
    }
}
exports.BaseModel = BaseModel;
