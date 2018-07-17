const ItemModel = require('../models/Items');

module.exports = (app, upload) => {
   app.get('/', (req, res) => {
      res.send('Hi there!')
   });

   app.post('/upload', upload.single('file'), (req, res) => {
      res.json({ file: req.file });
   });
}