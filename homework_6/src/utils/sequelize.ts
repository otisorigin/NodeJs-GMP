import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'd6qo402ikvqkmd',
    'tyyxlqklfoagud',
    '68b94e52df0ddfe8958e85d8f05b3e2ab755886991bcf2f388fb85cbf9681165',
    {
        host: 'ec2-54-247-181-239.eu-west-1.compute.amazonaws.com',
        port: 5432,
        dialect: 'postgres',
        protocol: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
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
