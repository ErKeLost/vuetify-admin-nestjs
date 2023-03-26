import AppDataSource from '../orm.config';
import { User } from './user/entities/user.entity';

AppDataSource.initialize()
  .then(async () => {
    const res = await AppDataSource.manager.find(User);
    console.log('Saved a new user with id: ' + res);
  })
  .catch((error) => console.log(error));
