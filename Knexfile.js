module.exports = {
    development: {
      client: 'pg',
      connection: {
        database: 'game_server',
        user: 'Gavin',
        password: 'Renton',
        host: 'localhost',
        port: '5432'
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    }
  };
  