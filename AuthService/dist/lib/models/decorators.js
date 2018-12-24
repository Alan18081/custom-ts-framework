"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var entity_metadata_1 = require("./entity-metadata");
var table_1 = require("./table");
function Entity() {
    return function (target) {
        var entityMetadata = new entity_metadata_1.EntityMetadata();
        if (!Reflect.hasMetadata(constants_1.METADATA.ENTITY, target)) {
            Reflect.defineMetadata(constants_1.METADATA.ENTITY, entityMetadata, target);
        }
        else {
            entityMetadata = Reflect.getMetadata(constants_1.METADATA.ENTITY, target);
        }
        entityMetadata.table = target.name.toLowerCase() + "s";
        var columns = getColumns(target);
        var foreignKeys = getForeignKeys(target);
        var table = new table_1.Table(entityMetadata.table, columns, foreignKeys);
        var tables = getTables(Reflect);
        tables.push(table);
    };
}
exports.Entity = Entity;
function Column(type) {
    return function (target, name) {
        var columns = [];
        if (!Reflect.hasMetadata(constants_1.METADATA.COLUMNS, target.constructor)) {
            Reflect.defineMetadata(constants_1.METADATA.COLUMNS, columns, target.constructor);
        }
        else {
            columns = Reflect.getMetadata(constants_1.METADATA.COLUMNS, target.constructor);
        }
        var columnMetadata = {
            name: name,
            type: type
        };
        columns.push(columnMetadata);
    };
}
exports.Column = Column;
function PrimaryGeneratedColumn() {
    return function (target, name) {
        var columns = [];
        if (!Reflect.hasMetadata(constants_1.METADATA.COLUMNS, target.constructor)) {
            Reflect.defineMetadata(constants_1.METADATA.COLUMNS, columns, target.constructor);
        }
        else {
            columns = Reflect.getMetadata(constants_1.METADATA.COLUMNS, target.constructor);
        }
        var columnMetadata = {
            name: name,
            type: constants_1.TYPES.INCREMENTS,
            isPrimary: true
        };
        columns.push(columnMetadata);
    };
}
exports.PrimaryGeneratedColumn = PrimaryGeneratedColumn;
function PrimaryColumn(type) {
    return function (target, name) {
        var columns = [];
        if (!Reflect.hasMetadata(constants_1.METADATA.COLUMNS, target.constructor)) {
            Reflect.defineMetadata(constants_1.METADATA.COLUMNS, columns, target.constructor);
        }
        else {
            columns = Reflect.getMetadata(constants_1.METADATA.PRIMARY_COLUMNS, target.constructor);
        }
        var columnMetadata = {
            name: name,
            type: type,
            isPrimary: true
        };
        columns.push(columnMetadata);
    };
}
exports.PrimaryColumn = PrimaryColumn;
function OneToOne(getEntity) {
    return function (target, name) {
        var entity = getEntity();
        var entityMetadata = new entity_metadata_1.EntityMetadata();
        if (!Reflect.hasMetadata(constants_1.METADATA.ENTITY, target.constructor)) {
            Reflect.defineMetadata(constants_1.METADATA.ENTITY, entityMetadata, target.constructor);
        }
        else {
            entityMetadata = Reflect.getMetadata(constants_1.METADATA.ENTITY, target.constructor);
        }
        var foreignEntityMetadata = Reflect.getMetadata(constants_1.METADATA.ENTITY, entity);
        if (!foreignEntityMetadata) {
            throw new Error('You can define relations only with entity');
        }
        var keys = getForeignKeys(target.constructor);
        var keyMetadata = {
            key: foreignEntityMetadata.table.replace(/s/, '') + 'Id',
            reference: foreignEntityMetadata.table
        };
        keys.push(keyMetadata);
        entityMetadata.oneToOne.push(foreignEntityMetadata);
    };
}
exports.OneToOne = OneToOne;
function getColumns(target) {
    var columns = [];
    if (!Reflect.hasMetadata(constants_1.METADATA.COLUMNS, target)) {
        Reflect.defineMetadata(constants_1.METADATA.COLUMNS, columns, target);
    }
    else {
        columns = Reflect.getMetadata(constants_1.METADATA.COLUMNS, target);
    }
    return columns;
}
function getForeignKeys(target) {
    var keys = [];
    if (!Reflect.hasMetadata(constants_1.METADATA.FOREIGN_KEYS, target)) {
        Reflect.defineMetadata(constants_1.METADATA.FOREIGN_KEYS, keys, target);
    }
    else {
        keys = Reflect.getMetadata(constants_1.METADATA.FOREIGN_KEYS, target);
    }
    return keys;
}
function getTables(target) {
    var tables = [];
    if (!Reflect.hasMetadata(constants_1.METADATA.TABLES, target)) {
        Reflect.defineMetadata(constants_1.METADATA.TABLES, tables, target);
    }
    else {
        tables = Reflect.getMetadata(constants_1.METADATA.TABLES, target);
    }
    return tables;
}
