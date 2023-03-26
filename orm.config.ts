import { ConfigEnum } from 'src/enum/config.enum';
import { Logs } from 'src/logs/entities/logs.entity';
import { Roles } from 'src/roles/entities/roles.entity';
import { Profile } from 'src/user/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';

export default {
  type: configService.get(ConfigEnum.DB),
  host: configService.get(ConfigEnum.DB_HOST),
  port: configService.get(ConfigEnum.DB_PORT),
  username: configService.get(ConfigEnum.DB_USERNAME),
  password: configService.get(ConfigEnum.DB_PASSWORD),
  database: configService.get(ConfigEnum.DB_DATABASE),
  entities: [User, Logs, Profile, Roles],
  // 同步本地schema与数据库 -> 每次初始化的时候同步
  synchronize: configService.get(ConfigEnum.DB_SYNCHRONIZE),
  // logging: ['error'],
  // logging: process.env.NODE_ENV === 'development' ? ['error'] : true,
};
