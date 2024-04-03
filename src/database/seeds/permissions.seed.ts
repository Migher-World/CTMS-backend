import { DataSource } from 'typeorm';
import { PermissionGroup } from '../../modules/permission-groups/entities/permission-group.entity';
import { Permission } from '../../modules/permissions/entities/permission.entity';

export default class PermissionSeeder {
  public async run(_: any, connection: DataSource): Promise<any> {
    const entities = [PermissionGroup, Permission];

    for (const entity of entities) {
      const repository = connection.getRepository(entity);
      await repository.query(`TRUNCATE TABLE "${repository.metadata.tableName}" CASCADE;`);
    }

    const permissionGroupRepository = connection.getRepository(PermissionGroup);
    const permissionRepository = connection.getRepository(Permission);

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
        name: 'Issue management',
        description: 'Issue management',
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
    ]);
  }
}
