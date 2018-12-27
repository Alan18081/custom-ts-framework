"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@astra/common");
const lodash_1 = require("lodash");
class StorageModel extends common_1.BaseModel {
    constructor(data) {
        super();
        this.name = data.name;
        this.description = data.description;
        this.path = data.path;
        this.projectId = lodash_1.toNumber(data.projectId);
        this.userId = lodash_1.toNumber(data.userId);
    }
}
exports.StorageModel = StorageModel;
