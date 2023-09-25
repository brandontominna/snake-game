const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;

const server = http.createServer((req, res) => {
  // Get the requested file path based on the URL
  const url = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(__dirname, url);

  // Determine the content type based on the file extension
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    // Add more cases for other file types as needed
  }

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
      } else {
        // Other server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // File found, send the appropriate content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
