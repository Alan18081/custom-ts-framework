"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("../../../../config");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.config.common.jwtSecret
};
passport.use(new passport_jwt_1.Strategy(options, (payload) => {
    console.log(payload);
}));
exports.authenticateJwt = passport.authenticate('jwt');
