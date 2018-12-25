"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("../../common/models/base.model");
const lodash_1 = require("lodash");
class UserModel extends base_model_1.BaseModel {
    constructor(data) {
        super();
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.position_id = lodash_1.toNumber(data.position_id);
    }
}
UserModel.tableName = 'auth';
exports.UserModel = UserModel;
