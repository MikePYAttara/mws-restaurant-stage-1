const StaticServer = require('static-server'),

server = new StaticServer({
  rootPath: './dist',
  port: 8080
});
 
server.start(() => {
  console.log(`Server listening on ${server.port}`);
});
 