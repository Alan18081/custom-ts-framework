import { RolesGuard } from './guards/roles.guard';
import { Roles } from '@astra/common';

export function rolesGuardsFactory(role: Roles) {
  return new RolesGuard(role);
}