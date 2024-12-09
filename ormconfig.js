var dbConfig = {
  synchronize: false,
};

switch (process.env.NODE_ENV) {
  case 'development':
    console.log("dev ", process.env.NODE_ENV)
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    console.log(process.env.NODE_ENV)
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('Unknown enviroment');
}

module.exports = dbConfig
