"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require("knex");
var config_1 = require("../../config");
exports.db = knex(config_1.DB_CONFIG);
