"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@astra/common");
const lodash_1 = require("lodash");
class ProjectModel extends common_1.BaseModel {
    constructor(data) {
        super();
        this.name = data.name;
        this.description = data.description;
        this.clientId = data.clientId;
        this.clientSecret = data.clientSecret;
        this.userId = lodash_1.toNumber(data.userId);
        this.createdAt = new Date();
    }
}
ProjectModel.tableName = 'projects';
exports.ProjectModel = ProjectModel;
