const StaticServer = require('static-server'),

server = new StaticServer({
  rootPath: './src',
  port: 8080
});
 
server.start(() => {
  console.log(`Server listening on ${server.port}`);
});
 