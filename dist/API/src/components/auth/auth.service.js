"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const passport_jwt_1 = require("passport-jwt");
const passport = require("passport");
const common_1 = require("@astra/common");
const message_broker_1 = require("../../helpers/message-broker");
let AuthService = class AuthService {
    constructor() {
        this.passport = passport;
        this.options = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: common_1.config.common.jwtSecret
        };
        passport.use(new passport_jwt_1.Strategy(this.options, (payload, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield message_broker_1.messageBroker.sendMessageAndGetResponse(common_1.QueuesEnum.USERS_SERVICE, common_1.CommunicationCodes.GET_USER_BY_EMAIL, { email: payload.email });
                if (user) {
                    done(null, user);
                }
                else {
                    done({ error: common_1.Messages.USER_NOT_FOUND }, false);
                }
            }
            catch (e) {
                done(e);
            }
        })));
    }
    authenticateJwt(req, res, next) {
        return this.passport.authenticate('jwt')(req, res, next);
    }
};
AuthService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
