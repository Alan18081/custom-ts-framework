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
class BaseModel {
    constructor(...args) {
        return new Proxy(this, this);
    }
    ;
    static createQueryBuilder() {
        return this.db.queryBuilder();
    }
    static find(query, columns) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = this.db.table(this.tableName);
            if (columns) {
                sql.select(...columns);
            }
            else {
                sql.select('*');
            }
            const data = yield sql.where(query);
            return data.map(item => new this(item));
        });
    }
    static findOne(query, columns) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = this.db.table(this.tableName);
            if (columns) {
                sql.select(...columns);
            }
            else {
                sql.select('*');
            }
            const data = yield sql.where(query);
            if (data[0]) {
                return new this(data[0]);
            }
        });
    }
    static save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(entity instanceof this)) {
                throw new Error('Entity should be an instance of model');
            }
            const rawData = yield this.db.table(this.tableName)
                .insert(entity)
                .returning('*');
            return new this(rawData[0]);
        });
    }
    static update(query, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawData = yield this.db.table(this.tableName)
                .update(entity)
                .where(query)
                .returning('*');
            return new this(rawData);
        });
    }
    static delete(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.table(this.tableName)
                .delete('')
                .where(query);
        });
    }
}
exports.BaseModel = BaseModel;
