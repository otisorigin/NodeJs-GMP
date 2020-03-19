import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        protocol: process.env.DB_PROTOCOL,
        pool: {
            max: Number(process.env.DB_POOL_MAX),
            min: Number(process.env.DB_POOL_MIN),
            idle: Number(process.env.DB_POOL_IDLE)
        },
        dialectOptions: {
            ssl: true
        },
        define: {
            timestamps: false
        }
    }
);

export default sequelize;
