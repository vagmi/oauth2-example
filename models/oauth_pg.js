var knex = require('knex')({
  client: 'pg',
  connection: process.env.DB_CONNECTION_URI
});

var AuthCode = {
  getAuthCode: function(authCode,callback){
    knex.first().from('authcodes').where({auth_code: authCode}).then(function(rows) {
      var code = {
        authCode: row.auth_code,
        clientId: row.client_id,
        expires: row.expires,
        userId: row.user_id
      };
      callback(null,code)
    });
  },
  saveAuthCode: function(code, clientId, expires, userId, callback) {
    knex('authcodes').insert([{
      auth_code: code,
      client_id: clientId,
      expires: expires,
      user_id: userId
    }]).then(function(ids) { callback(null); });
  }
}

module.exports.getAuthCode = AuthCode.getAuthCode;
module.exports.saveAuthCode = AuthCode.saveAuthCode;

var AccessToken = {
  getAccessToken: function(bearerToken, callback) {
    knex.first().from('accesstokens').where({access_token: bearerToken}).then(function(row){
      var code = {
        accessToken: row.access_token,
        clientId: row.client_id,
        expires: row.expires,
        userId: row.user_id
      };
      callback(null,code);
    });
  },
  saveAccessToken: function(token,clientId,expires,userId, callback) {
    knex('accesstokens').insert([{
      access_token: token,
      client_id: clientId,
      expires: expires,
      user_id: userId
    }]).then(function(ids) { callback(null); });
  }
}
module.exports.getAccessToken = AccessToken.getAccessToken;
module.exports.saveAccessToken = AccessToken.saveAccessToken;

var RefreshToken = {
  getRefreshToken: function(refreshToken, callback) {
    knex.first().from('refreshtokens').where({refresh_token: bearerToken}).then(function(row){
      var code = {
        refreshToken: row.refresh_token,
        clientId: row.client_id,
        expires: row.expires,
        userId: row.user_id
      };
      callback(null,code);
    });
  },
  saveRefreshToken: function(token,clientId,expires,userId, callback) {
    knex('refreshtokens').insert([{
      refresh_token: token,
      client_id: clientId,
      expires: expires,
      user_id: userId
    }]).then(function(ids) { callback(null); });
  }
}
module.exports.saveRefreshToken = RefreshToken.saveRefreshToken;
module.exports.getRefreshToken = RefreshToken.getRefreshToken;

var User = require('./user_pg');
module.exports.getUser = User.getUser;

var Client = {
  grantTypeAllowed: function(clientId, grantType,callback) {
    // essentially pass through at this point
    callback(null,true);
  },
  getClient: function(clientId, clientSecret, callback) {
    knex('clients').first().where({client_id: clientId}).then(function(row){
      callback(null,{clientId: row.client_id, 
                     clientSecret: row.client_secret,
                     redirectUri: row.redirect_uri}); 
    });
  }
}
module.exports.getClient = Client.getClient;
module.exports.grantTypeAllowed = Client.grantTypeAllowed;
