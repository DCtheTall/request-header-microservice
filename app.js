const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');
const getWhoami = require('./get-whoami');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.render('index'));
app.get('/whoami', getWhoami);

function normalizePort(val) {
  var port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
}

const port = normalizePort(process.env.PORT || 3001);

function onListen() {
  console.log(`Listening on port ${port}`);
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
}

function onError(err) {
  if (err.syscall !== 'listen') throw err;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (err.code) {
    case 'EACCESS':
      console.log(`${bind} requires elevated privilege`);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      break;
    default:
      throw err;
  }
}

const server = http.createServer(app);
server.on('listening', onListen);
server.on('error', onError);
server.listen(port);
