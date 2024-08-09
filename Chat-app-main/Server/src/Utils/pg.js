import pkg from 'pg';
const { Pool } = pkg;

import { config } from '../../Config/index.js';

const pool = new Pool({
    user: process.env.user || 'shivanshu',
    password: process.env.password || 'admin',
    host: process.env.host || 'localhost',
    port: process.env.port || '5432',
    database: process.env.database || 'postgres',
});

export {pool};
