const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'index.html'); 
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});


// possible to use express here for a more clean/concise server, 
// since the project is just a small snake game, not really necessary to have extra stuff for the deployment process. 

