"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_model_1 = require("./base.model");
var UserModel = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel(data) {
        var _this = _super.call(this, {}) || this;
        if (data) {
            _this.name = data.name || '';
            _this.age = data.age || 0;
            _this.email = data.email || '';
            _this.password = data.password || '';
        }
        return _this;
    }
    return UserModel;
}(base_model_1.BaseModel));
exports.UserModel = UserModel;
var user = new UserModel();
user.name = 'Alex';
user.age = 25;
user.email = 'test@gmail.com';
user.password = '123456';
var queryBuilder = UserModel.createQueryBuilder();
