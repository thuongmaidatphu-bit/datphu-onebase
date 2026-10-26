const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const filePath = path.join(__dirname, 'datphu_booking_app.html');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Dat Phu OneBase Booking App running at http://localhost:${PORT}`);
});
