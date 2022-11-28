const mainRoute = require('./main');

const constructorMethod = (app) => {
  app.use('/', mainRoute);

  app.use('*', (req, res) => {
    res.json({error: 'Route no valid'});
  });
};

module.exports = constructorMethod;
