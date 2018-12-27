"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_guard_1 = require("./guards/roles.guard");
function rolesGuardsFactory(role) {
    return new roles_guard_1.RolesGuard(role);
}
exports.rolesGuardsFactory = rolesGuardsFactory;
