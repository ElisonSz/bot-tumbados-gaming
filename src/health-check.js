import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'ok',
    message: 'Tumbados Gaming Bot está funcionando',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🏥 Health check server running on port ${PORT}`);
});

export default server; 