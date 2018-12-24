"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
function Model() {
    return function (target) {
        return Proxy.bind(new target(), {
            set: function (obj, property, value) {
                var columns = getColumnsToUpdate(target);
                columns.push(property);
                target[property] = value;
            }
        });
    };
}
exports.Model = Model;
function Column() {
    return function (target, name) {
    };
}
exports.Column = Column;
function getColumns(target) {
    var columns = [];
    if (!Reflect.hasMetadata(constants_1.MODEL_METADATA.COLUMNS, target)) {
        Reflect.defineMetadata(constants_1.MODEL_METADATA.COLUMNS, columns, target);
    }
    else {
        columns = Reflect.getMetadata(constants_1.MODEL_METADATA.COLUMNS, target);
    }
    return columns;
}
function getColumnsToUpdate(target) {
    var columns = [];
    if (!Reflect.hasMetadata(constants_1.MODEL_METADATA.COLUMNS_TO_UPDATE, target)) {
        Reflect.defineMetadata(constants_1.MODEL_METADATA.COLUMNS_TO_UPDATE, columns, target);
    }
    else {
        columns = Reflect.getMetadata(constants_1.MODEL_METADATA.COLUMNS_TO_UPDATE, target);
    }
    return columns;
}
