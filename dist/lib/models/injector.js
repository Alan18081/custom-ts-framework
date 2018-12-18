"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var server_1 = require("../../server");
function InjectRepository(Entity) {
    return function (target, name, index) {
        var types = Reflect.getMetadata('design:paramtypes', target);
        var entity = Reflect.getMetadata(constants_1.METADATA.ENTITY, Entity);
        if (!entity) {
            throw new Error(Entity.name + " has to be decorated by @Entity");
        }
        var columns = Reflect.getMetadata(constants_1.METADATA.COLUMNS, Entity);
        var foreignKeys = Reflect.getMetadata(constants_1.METADATA.FOREIGN_KEYS, Entity) || [];
        if (!columns) {
            throw new Error('You must specify columns');
        }
        var args = [];
        var argsType = types[index];
        if (!Reflect.hasMetadata(server_1.METADATA_KEY.args, argsType)) {
            Reflect.defineMetadata(server_1.METADATA_KEY.args, args, argsType);
        }
        else {
            args = Reflect.getMetadata(server_1.METADATA_KEY.args, argsType);
        }
        args.push(entity.table);
        args.push(Entity);
    };
}
exports.InjectRepository = InjectRepository;
