"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require("../../module");
var repository_1 = require("../models/repository");
var DbModule = /** @class */ (function () {
    function DbModule() {
    }
    DbModule = __decorate([
        module_1.Module({
            services: [repository_1.Repository],
            exports: [repository_1.Repository]
        })
    ], DbModule);
    return DbModule;
}());
exports.DbModule = DbModule;
