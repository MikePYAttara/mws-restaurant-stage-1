const StaticServer = require('static-server');

const server = new StaticServer({
  rootPath: './dist',
  port: 8000
});
 
server.start(() => {
  console.log(`
  -----------------------------------------------------------
        -----------------------------------------

  THE SERVER LIVE AND LISTENING ON PORT ${server.port}
  
  Visit http://localhost:${server.port} to view this website. 
  
        ------------------------------------------
  ------------------------------------------------------------
  `);
});
 