// import { Factory, Seeder } from 'typeorm-seeding';
// import * as faker from 'faker';
// import { Role } from '../../modules/roles/entities/role.entity';
// import { User } from '../../modules/users/entities/user.entity';
// import { DataSource } from 'typeorm';

// export default class AppSeeder implements Seeder {
//   public async run(factory: Factory, connection: DataSource): Promise<any> {
//     const entities = [Role, User];

//     for (const singleEntity of entities) {
//       const repository = connection.getRepository(singleEntity);
//       await repository.query(
//         `TRUNCATE TABLE "${repository.metadata.tableName}" CASCADE;`,
//       );
//     }
//   }
// }
