const _DBOptions = {
    type: "sqlite",
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    synchronize: false,
    migrations: [__dirname + "/migrations/*.js"]
};
  
switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(_DBOptions, {
            type: 'sqlite',
            database: 'db.sqlite',
        });
        break;
    case 'test':
        Object.assign(_DBOptions, {
            type: 'sqlite',
            database: 'test.sqlite',
            migrationsRun: true,
        });
        break;
    case 'production':
        Object.assign(_DBOptions, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            ssl: {
                rejectUnauthorized: false
            }
        });
        break;
    default:
        throw new Error('unknown environment');
}

export const DBOptions = _DBOptions;