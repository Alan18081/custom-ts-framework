"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Knex = require("knex");
const inversify_1 = require("inversify");
let BaseRepository = class BaseRepository {
    constructor(db, tableName, MappingType) {
        this.db = db;
        this.table = db(tableName);
        this.MappingType = MappingType;
    }
    clearData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.table.clearSelect();
            yield this.table.clearWhere();
        });
    }
    find(query, columns) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql;
            if (columns) {
                sql = this.table.select(...columns);
            }
            else {
                sql = this.table.select('*');
            }
            const data = yield sql.where(query);
            yield this.clearData();
            return data.map(item => Reflect.construct(this.MappingType, [item]));
        });
    }
    findOne(query, columns) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql;
            if (columns) {
                sql = this.table.select(...columns);
            }
            else {
                sql = this.table.select('*');
            }
            const data = yield sql.where(query);
            yield this.clearData();
            if (data[0]) {
                return Reflect.construct(this.MappingType, [data[0]]);
            }
        });
    }
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(entity instanceof this.MappingType)) {
                throw new Error('Entity should be an instance of model');
            }
            const rawData = yield this.table
                .insert(entity)
                .returning('*');
            yield this.clearData();
            return Reflect.construct(this.MappingType, [rawData[0]]);
        });
    }
    update(query, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawData = yield this.table
                .update(entity)
                .where(query)
                .returning('*');
            yield this.clearData();
            if (rawData[0]) {
                return Reflect.construct(this.MappingType, [rawData[0]]);
            }
        });
    }
    delete(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.table
                .delete('')
                .where(query);
        });
    }
    getOneQueryResult(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield query.returning('*');
            yield this.clearData();
            if (result[0]) {
                return Reflect.construct(this.MappingType, [result[0]]);
            }
        });
    }
    getManyQueryResults(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield query.returning('*');
            yield this.clearData();
            return result.map(item => Reflect.construct(this.MappingType, [item]));
        });
    }
    queryBuilder() {
        return this.table;
    }
    transaction(callback) {
        return this.db.transaction(callback);
    }
    findManyWithPagination(query, { page, limit }, columns) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql;
            if (columns) {
                sql = this.table.select(...columns);
            }
            else {
                sql = this.table.select('*');
            }
            sql = sql.where(query).offset((page - 1) * limit).limit(limit);
            const rawData = yield sql.clone();
            const totalCount = yield sql.clone().count();
            yield this.clearData();
            return {
                page,
                data: rawData.map(item => Reflect.construct(this.MappingType, [item])),
                itemsPerPage: limit,
                totalCount: totalCount[0].count
            };
        });
    }
};
BaseRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()),
    __param(1, inversify_1.unmanaged()),
    __param(2, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [Function, String, Object])
], BaseRepository);
exports.BaseRepository = BaseRepository;
