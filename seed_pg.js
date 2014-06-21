var schema = require('./models/schema_pg');
var user = require('./models/user_pg');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DB_CONNECTION_URI
});
schema.resetSchema().then(function(){
  knex('clients').insert([{client_id: 'test', client_secret: 'test', redirect_uri: 'http://oauthclient:4000/auth/queen/callback'}])
  .then(function(){
    user.register({email: 'vagmi@example.com', password: 'password', first_name: 'Vagmi', last_name: 'Mudumbai'},function(cb) {
      process.exit();
    });
  })
});
