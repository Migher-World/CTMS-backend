import { DataSource } from 'typeorm';
import { PermissionGroup } from '../../modules/permission-groups/entities/permission-group.entity';
import { Permission } from '../../modules/permissions/entities/permission.entity';

export default class PermissionSeeder {
  public async run(_: any, connection: DataSource): Promise<any> {
    const entities = [PermissionGroup, Permission];

    // for (const entity of entities) {
    //   const repository = connection.getRepository(entity);
    //   await repository.query(`TRUNCATE TABLE ${repository.metadata.tableName} CASCADE;`);
    // }

    const permissionGroupRepository = connection.getRepository(PermissionGroup);
    const permissionRepository = connection.getRepository(Permission);
    // await permissionGroupRepository.query(`TRUNCATE TABLE roles_permissions_permissions;`);
    // await permissionRepository.clear();
    // await permissionGroupRepository.clear();

    const permissionGroups = await permissionGroupRepository.save([
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3b',
        name: 'User',
        description: 'User management',
        slug: 'user',
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3c',
        name: 'Company',
        description: 'Company management',
        slug: 'company',
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3d',
        name: 'Role',
        description: 'Role management',
        slug: 'role',
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3f',
        name: 'Issue',
        description: 'Issue management',
        slug: 'slug',
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3e',
        name: 'Patient',
        description: 'Patient management',
        slug: 'patient',
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3a',
        name: 'Appointment management',
        description: 'Appointment management',
        slug: 'appointment',
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3h',
        name: 'Dashboard',
        description: 'Dashboard management',
        slug: 'dashboard',
      },
    ]);

    const permissions = await permissionRepository.save([
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3g',
        name: 'Create user',
        description: 'Create user',
        slug: 'create-user',
        permissionGroupId: permissionGroups[0].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3h',
        name: 'Update user',
        description: 'Update user',
        slug: 'update-user',
        permissionGroupId: permissionGroups[0].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3i',
        name: 'Delete user',
        description: 'Delete user',
        slug: 'delete-user',
        permissionGroupId: permissionGroups[0].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3j',
        name: 'Create company',
        description: 'Create company',
        slug: 'create-company',
        permissionGroupId: permissionGroups[1].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3k',
        name: 'Update company',
        description: 'Update company',
        slug: 'update-company',
        permissionGroupId: permissionGroups[1].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3m',
        name: 'Create role',
        description: 'Create role',
        slug: 'create-role',
        permissionGroupId: permissionGroups[2].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3n',
        name: 'Update role',
        description: 'Update role',
        slug: 'update-role',
        permissionGroupId: permissionGroups[2].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3q',
        name: 'Create issue',
        description: 'Create issue',
        slug: 'create-issue',
        permissionGroupId: permissionGroups[3].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3r',
        name: 'Update issue',
        description: 'Update issue',
        slug: 'update-issue',
        permissionGroupId: permissionGroups[3].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3s',
        name: 'Delete issue',
        description: 'Delete issue',
        slug: 'delete-issue',
        permissionGroupId: permissionGroups[3].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3t',
        name: 'Create patient',
        description: 'Create patient',
        slug: 'create-patient',
        permissionGroupId: permissionGroups[4].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3u',
        name: 'Update patient',
        description: 'Update patient',
        slug: 'update-patient',
        permissionGroupId: permissionGroups[4].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3v',
        name: 'Delete patient',
        description: 'Delete patient',
        slug: 'delete-patient',
        permissionGroupId: permissionGroups[4].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3a',
        name: 'View patient',
        description: 'View patient',
        slug: 'view-patient',
        permissionGroupId: permissionGroups[4].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3w',
        name: 'Create appointment',
        description: 'Create appointment',
        slug: 'create-appointment',
        permissionGroupId: permissionGroups[5].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3x',
        name: 'Update appointment',
        description: 'Update appointment',
        slug: 'update-appointment',
        permissionGroupId: permissionGroups[5].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8b3y',
        name: 'Delete appointment',
        description: 'Delete appointment',
        slug: 'delete-appointment',
        permissionGroupId: permissionGroups[5].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8baa',
        name: 'View appointment',
        description: 'View appointment',
        slug: 'view-appointment',
        permissionGroupId: permissionGroups[5].id,
      },
      {
        id: 'cbf4b3b0-0b1b-4b3b-8b3b-0b1b4b3b8bab',
        name: 'View dashboard',
        description: 'View dashboard',
        slug: 'view-dashboard',
        permissionGroupId: permissionGroups[6].id,
      }
    ]);
  }
}
