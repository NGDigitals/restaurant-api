import config from './config';
import { registerAs } from '@nestjs/config';
import {Restaurant} from 'src/entity/restaurants.entity';

export default registerAs('database', () => ({
    host: `${config.db_host}`,
    port: `${config.db_port}`,
    username: `${config.db_username}`,
    password: `${config.db_password}`,
    database: `${config.db_database}`,
    entities: [Restaurant],
    synchronize: true,
    auto_load_entities: true
}));