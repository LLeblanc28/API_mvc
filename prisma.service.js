
// prisma.config.js

import { PrismaClient } from './generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const mysql = new PrismaMariaDb({  host: process.env.Host,
     port: Number.parseInt(process.env.Port), 
     user: process.env.User,
     password: process.env.Password,
     database: process.env.Database,
     });

const prisma = new PrismaClient({ adapter : mysql })

export { prisma }