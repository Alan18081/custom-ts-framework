"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@astra/common");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: common_1.config.common.jwtSecret
};
passport.use(new passport_jwt_1.Strategy(options, (payload) => {
    console.log(payload);
}));
exports.authenticateJwt = passport.authenticate('jwt');
