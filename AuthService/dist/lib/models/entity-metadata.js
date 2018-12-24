"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityMetadata = /** @class */ (function () {
    function EntityMetadata() {
        this.table = '';
        this.oneToOne = [];
        this.oneToMany = [];
        this.manyToOne = [];
        this.manyToMany = [];
    }
    return EntityMetadata;
}());
exports.EntityMetadata = EntityMetadata;
