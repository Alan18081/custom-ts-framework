"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@astra/common");
const lodash_1 = require("lodash");
class UserModel extends common_1.BaseModel {
    constructor(data) {
        super();
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.positionId = data.positionId && lodash_1.toNumber(data.positionId);
        this.roleId = data.roleId && lodash_1.toNumber(data.roleId);
    }
}
UserModel.tableName = 'users';
exports.UserModel = UserModel;
