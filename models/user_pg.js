var knex = require('knex')({
  client: 'pg',
  connection: process.env.DB_CONNECTION_URI
});
var bcrypt = require('bcrypt');
var User = {}
User.authenticate = function(email, password, callback) {
  knex.first().from('users').where({email: email}).then(function(u) {
    callback(null, bcrypt.compareSync(password,u.password) ? u : null);
  });
};
User.getUser = function(email, password, callback) {
  User.authenticate(email, password, callback);
};
User.findOne = function(fields, cb) {
  knex('users').first().where(fields).then(function(u) { cb(null,u); });
};
function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
User.register = function(fields,callback) {
  fields.password = hashPassword(fields.password);
  knex('users').insert([fields]).then(function(){callback(null);});
}
module.exports=User;
