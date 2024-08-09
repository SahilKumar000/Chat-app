import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
let config = dotenv.config({ path: process.env.NODE_ENV ? `${__dirname}/.env.dev` : `${__dirname}/.env.prod` });
console.log(`using ${process.env.NODE_ENV ? '.env.dev' : '.env.prod'}`);

export { config };
