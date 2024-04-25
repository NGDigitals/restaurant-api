import { loadConfig } from 'config-dug';
let config = loadConfig('./config');
import * as dotenv from 'dotenv';
dotenv.config();

export default {
    host: config.API_HOST ?? process.env.API_HOST,
    port: config.API_PORT ?? process.env.API_PORT,
    context_path: config.CONTEXT_PATH ?? process.env.CONTEXT_PATH,
    db_host: config.DB_HOST ?? process.env.DB_HOST,
    db_port: config.DB_PORT ?? process.env.DB_PORT,
    db_username: config.DB_USERNAME ?? process.env.DB_USERNAME,
    db_password: config.DB_PASSWORD ?? process.env.DB_PASSWORD,
    db_database: config.DB_DATABASE ?? process.env.DB_DATABASE,
    cors: {
        origin: '*',
        methods: 'POST,GET,PUT,OPTIONS,DELETE',
        allowedHeaders:
            'Timezone-Offset,Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,*',
        preflightContinue: false,
        optionsSuccessStatus: 200,
    },
};
