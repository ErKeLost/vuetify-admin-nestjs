import { Logs } from '../logs/entities/logs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Logs]),
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport:
    //       process.env.NODE_ENV === 'development'
    //         ? {
    //             target: 'pino-pretty',
    //             options: {
    //               colorize: true,
    //             },
    //           }
    //         : {
    //             target: 'pino-roll',
    //             options: {
    //               file: path.join('log', 'log.txt'),
    //               frequency: 'daily', //hourly
    //               size: '100m',
    //               mkdir: true,
    //             },
    //           },
    //   },
    // }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
