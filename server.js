// server.js
// DEPENDÊNCIAS: express, mongoose, express-session, connect-mongo, connect-flash, helmet, dotenv, ejs...
require('dotenv').config();
const express = require('express');

// Conexão com o MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
    app.emit('Conexão feita');
  })
  .catch((error) => console.error('Erro no MongoDB:', error));

const MongoStore = require('connect-mongo').default;

// Configurações de sessão e flash messages
const session = require('express-session');
const flash = require('connect-flash');
const sessionOptions = session({
  secret: 'sua-chave-secreta-aqui',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

const path = require('path');
const routes = require('./routes');
const crsf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const app = express();
const PORT = 3000;

// Configurações de segurança
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Configurações de sessão e flash messages
app.use(sessionOptions);
app.use(flash());

// Configurações de views e arquivos estáticos
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Configurações de CSRF
app.use(crsf());

// Middlewares e rotas
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

// Inicia o servidor após a conexão com o MongoDB ser estabelecida
app.on('Conexão feita', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  }); 
});