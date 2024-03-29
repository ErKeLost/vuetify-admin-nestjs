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
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Logger } from 'nestjs-pino';
import { BusinessException } from 'src/common/exception/business.exception';

interface IUserQuery {
  pageSize: number;
  startRow: number;
  limit?: number;
  username?: string;
  role?: number;
  gender?: number;
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private logger: Logger,
  ) {}

  @Post()
  create(@Body() user: User): any {
    console.log(user);
    const userTmp = { username: 'erkelost', password: '1256029807' } as User;
    return this.userService.create(user);
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
  findAll(@Query() query: IUserQuery): any {
    // 前端传递的query 参数全部都是 string
    return this.userService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() user: User) {
    // 判断是否是自己
    // 判断是否有权限更新user
    // 返回数据不能包含敏感数据
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    console.log(id);
    return this.userService.remove(id);
  }

  @Get('/configAccess')
  findBusinessError() {
    throw new BusinessException('你这个参数错了');
  }
}
