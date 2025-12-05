import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret'
