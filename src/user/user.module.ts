import { Logs } from 'src/logs/entities/logs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Logs])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
