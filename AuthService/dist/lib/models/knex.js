"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require("knex");
var index_1 = require("../../config/index");
exports.db = knex(index_1.DB_CONFIG);
