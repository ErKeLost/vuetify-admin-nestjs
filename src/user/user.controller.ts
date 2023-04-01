import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Logger } from 'nestjs-pino';
import { BusinessException } from 'src/common/exception/business.exception';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private logger: Logger,
  ) {}

  @Post()
  create(@Body() user: User) {
    const userTmp = { username: 'erkelost', password: '1256029807' } as User;
    return this.userService.create(userTmp);
  }

  @Get('/profile')
  getUserProfile(): any {
    return this.userService.findProfile(2);
  }

  @Get('/logs')
  getUserLogs(): any {
    return this.userService.findUserLogs(2);
  }

  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2);
    // return res.map((o) => ({
    //   result: o.result,
    //   count: o.count,
    // }));
    return res;
  }

  @Get('/find')
  findAll(): any {
    // const user = { isAdmin: false };
    // if (!user.isAdmin) {
    //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // }
    throw new BusinessException('你这个参数错了');
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Get('/configAccess')
  findBusinessError() {
    throw new BusinessException('你这个参数错了');
  }
}
