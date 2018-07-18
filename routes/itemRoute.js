const ItemModel = require('../models/Items');

module.exports = (app) => {
   app.get('/', (req, res) => {
      res.send('Hi there!')
   });

   app.post('/upload', (req, res) => {
      console.log(req.body)
   })

}