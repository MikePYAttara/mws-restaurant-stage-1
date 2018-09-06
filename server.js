const StaticServer = require('static-server');

const server = new StaticServer({
  rootPath: './src',
  port: 8000
});
 
server.start(() => {
  console.log(`
  --------------------------------------
  --------------------------------------

  SERVER LISTENING ON ${server.port}
  
  Visit http://localhost:${server.port} 
  to view this website. 
  
  --------------------------------------
  --------------------------------------
  `);
});
 