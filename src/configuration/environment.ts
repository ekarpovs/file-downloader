import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

if (fs.existsSync('.env')) {
    // logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const MONGODB_URI = prod ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI_LOCAL;

if (!MONGODB_URI) {
    // logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
    process.exit(1);
}

if (!fs.existsSync('./keys/rsa_1024_priv.pem') || !fs.existsSync('./keys/rsa_1024_pub.pem')) {
    // logger.error('No pem files');
     // tslint:disable-next-line:no-console
     console.log('No pem files\n');
     process.exit(1);
}
export const PRIVATE_KEY = fs.readFileSync('./keys/rsa_1024_priv.pem', 'utf8');
export const PUBLIC_KEY = fs.readFileSync('./keys/rsa_1024_pub.pem', 'utf8');
