/* eslint-disable promise/catch-or-return */
/* eslint-disable no-console */
/* eslint-disable promise/always-return */
export default (req, res) => {
  const options = {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'Swordfish20#',
      database: 'postgres'
    }
  };

  const knex = require('knex')(options);

  knex
    .from('artists')
    .select('*')
    .then(rows => {
      console.log(rows);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ rows }));
    })
    .catch(err => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
};
