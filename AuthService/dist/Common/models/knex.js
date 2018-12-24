"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const config_1 = require("../../config");
exports.db = knex(config_1.DB_CONFIG);
