import { Logs } from '../logs/entities/logs.entity';
import { Profile } from './entities/profile.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, IUserQuery } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
  ) {}
  async create(user: User) {
    const userTmp = await this.userRepository.create(user);
    return this.userRepository.save(userTmp);
  }
  async findAll(query: IUserQuery) {
    // 联合查询
    // SELECT * FROM user u, profile p, role r WHERE u.id = p.userId AND u.roleId = r.id

    // 第二种联合查询
    // SELECT * FROM user u LEFT JOIN profile p ON u.id = p.userId LEFT JOIN role r ON u.roleId = r.id
    const { startRow, pageSize, username, gender, role } = query;
    const take = startRow || 10;
    const skip = ((pageSize || 1) - 1) * startRow || 0;
    return this.userRepository.find({
      relations: {
        profile: true,
        roles: true,
      },
      select: {
        id: true,
        username: true,
        profile: {
          gender: true,
        },
      },
      where: {
        username,
        profile: {
          gender,
        },
        roles: {
          id: role,
        },
      },
      take,
      skip,
    });
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  }

  async findUserLogs(id: number) {
    const user = await this.findOne(id);
    return this.logsRepository.find({
      where: { user },
      relations: {
        user: true,
      },
    });
  }

  // 日志分组
  /**
     * 
     *     SELECT logs.result, COUNT(logs.result) AS count FROM logs, user WHERE logs.userId = user.id
    AND user.id = 2 GROUP BY logs.result;
     * 
     */
  async findLogsByGroup(id: number) {
    // return (
    //   this.logsRepository
    //     .createQueryBuilder('logs')
    //     .select('logs.result', 'result')
    //     .addSelect('COUNT("logs.result")', 'count')
    //     .leftJoinAndSelect('logs.user', 'user')
    //     .where('user.id = :id', { id })
    //     .groupBy('logs.result')
    //     // .orderBy('count', 'DESC')
    //     .orderBy('result', 'DESC')
    //     .getRawMany()
    // );

    return this.logsRepository.query('SELECT * FROM logs');
  }
}
