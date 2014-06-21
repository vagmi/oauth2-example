var knex = require('knex')({
  client: 'pg',
  connection: process.env.DB_CONNECTION_URI
});
module.exports.resetSchema = function() {
  return knex.schema.dropTableIfExists("authcodes").createTable("authcodes",function(table){
    table.string("auth_code");
    table.string("client_id");
    table.integer("user_id");
    table.date("expires");
  })
  .dropTableIfExists("accesstokens").createTable("accesstokens",function(table){
    table.string("access_token");
    table.string("client_id");
    table.integer("user_id");
    table.date("expires");
  })
  .dropTableIfExists("refreshtokens").createTable("refreshtokens",function(table){
    table.string("refresh_token");
    table.string("client_id");
    table.integer("user_id");
    table.date("expires");
  })
  .dropTableIfExists("clients").createTable("clients",function(table){
    table.string("client_id");
    table.string("client_secret");
    table.string("redirect_uri");
  })
  .dropTableIfExists("users").createTable("users",function(table){
    table.increments();
    table.string("email");
    table.string("password");
    table.string("password_reset_token");
    table.date("reset_token_expires");
    table.string("first_name");
    table.string("last_name");
  });
};
