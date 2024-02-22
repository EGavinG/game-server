module.exports = {
    development: {
      client: 'postgresql',
      connection: {
        database: 'game_server',
        user:     'Gavin',
        password: 'Renton'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_highscores_migrations'
      }
    },
  };
  