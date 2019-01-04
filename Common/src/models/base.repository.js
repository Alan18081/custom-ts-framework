"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("reflect-metadata");
var inversify_1 = require("inversify");
var BaseRepository = /** @class */ (function () {
    function BaseRepository(db, tableName, MappingType) {
        this.db = db;
        this.table = db(tableName);
        this.MappingType = MappingType;
    }
    BaseRepository.prototype.clearData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.table.clearSelect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.table.clearWhere()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.find = function (query, columns) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sql, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (columns) {
                            sql = (_a = this.table).select.apply(_a, columns);
                        }
                        else {
                            sql = this.table.select('*');
                        }
                        return [4 /*yield*/, sql.where(query)];
                    case 1:
                        data = _b.sent();
                        return [4 /*yield*/, this.clearData()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, data.map(function (item) { return Reflect.construct(_this.MappingType, [item]); })];
                }
            });
        });
    };
    BaseRepository.prototype.findOne = function (query, columns) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sql, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (columns) {
                            sql = (_a = this.table).select.apply(_a, columns);
                        }
                        else {
                            sql = this.table.select('*');
                        }
                        return [4 /*yield*/, sql.where(query)];
                    case 1:
                        data = _b.sent();
                        return [4 /*yield*/, this.clearData()];
                    case 2:
                        _b.sent();
                        if (data[0]) {
                            return [2 /*return*/, Reflect.construct(this.MappingType, [data[0]])];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.save = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var rawData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(entity instanceof this.MappingType)) {
                            throw new Error('Entity should be an instance of model');
                        }
                        return [4 /*yield*/, this.table
                                .insert(entity)
                                .returning('*')];
                    case 1:
                        rawData = _a.sent();
                        return [4 /*yield*/, this.clearData()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Reflect.construct(this.MappingType, [rawData[0]])];
                }
            });
        });
    };
    BaseRepository.prototype.update = function (query, entity) {
        return __awaiter(this, void 0, void 0, function () {
            var rawData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.table
                            .update(entity)
                            .where(query)
                            .returning('*')];
                    case 1:
                        rawData = _a.sent();
                        return [4 /*yield*/, this.clearData()];
                    case 2:
                        _a.sent();
                        if (rawData[0]) {
                            return [2 /*return*/, Reflect.construct(this.MappingType, [rawData[0]])];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype["delete"] = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.table["delete"]('')
                            .where(query)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.getOneQueryResult = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, query.returning('*')];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.clearData()];
                    case 2:
                        _a.sent();
                        if (result[0]) {
                            return [2 /*return*/, Reflect.construct(this.MappingType, [result[0]])];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.getManyQueryResults = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, query.returning('*')];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.clearData()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result.map(function (item) { return Reflect.construct(_this.MappingType, [item]); })];
                }
            });
        });
    };
    BaseRepository.prototype.queryBuilder = function () {
        return this.table;
    };
    BaseRepository.prototype.transaction = function (callback) {
        return this.db.transaction(callback);
    };
    BaseRepository.prototype.findManyWithPagination = function (query, _a, columns) {
        var page = _a.page, limit = _a.limit;
        return __awaiter(this, void 0, void 0, function () {
            var _b, sql, rawData, totalCount;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (columns) {
                            sql = (_b = this.table).select.apply(_b, columns);
                        }
                        else {
                            sql = this.table.select('*');
                        }
                        sql = sql.where(query).offset((page - 1) * limit).limit(limit);
                        return [4 /*yield*/, sql.clone()];
                    case 1:
                        rawData = _c.sent();
                        return [4 /*yield*/, sql.clone().count()];
                    case 2:
                        totalCount = _c.sent();
                        return [4 /*yield*/, this.clearData()];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, {
                                page: page,
                                data: rawData.map(function (item) { return Reflect.construct(_this.MappingType, [item]); }),
                                itemsPerPage: limit,
                                totalCount: totalCount[0].count
                            }];
                }
            });
        });
    };
    BaseRepository = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.unmanaged()),
        __param(1, inversify_1.unmanaged()),
        __param(2, inversify_1.unmanaged())
    ], BaseRepository);
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
