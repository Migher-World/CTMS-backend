import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.getAllAndOverride<string[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('permissions is', permissions);
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user.permissions) {
      return false;
    }

    console.log('user permissions is', user.permissions);
    // check the permission object down to every leven to see if the user has the permission
    const hasPermission = () => {
      const keys = Object.keys(user.permissions);
      const has = keys.find((key) => user.permissions[key].some((permission) => permissions.includes(permission.slug)));
      return !!has;
    }
    // const hasPermission = () => user.permissions.some((permission) => permissions.includes(permission.slug));

    console.log('has role is', hasPermission());
    // console.log('user prmissions is', user.permissions);
    return hasPermission();
  }
}
