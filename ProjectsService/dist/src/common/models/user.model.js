"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
class UserModel extends base_model_1.BaseModel {
    constructor(data) {
        super({});
        if (data) {
            this.name = data.name || '';
            this.age = data.age || 0;
            this.email = data.email || '';
            this.password = data.password || '';
        }
    }
}
exports.UserModel = UserModel;
const user = new UserModel();
user.name = 'Alex';
user.age = 25;
user.email = 'test@gmail.com';
user.password = '123456';
const queryBuilder = UserModel.createQueryBuilder();
