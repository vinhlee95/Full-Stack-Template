const ItemModel = require('../models/Items');

module.exports = (app) => {
   app.get('/', (req, res) => {
      res.send('Hi there!')
   });

   app.post('/upload', async (req, res) => {
      const { name, url, category, price, imageUrl } = req.body;
      // create new record in db
      const newItem = new ItemModel({
         name, url, category, price, imageUrl
      });
      console.log(newItem)
      
      // save new model
      await newItem.save((error, item) => {
         if(error) { return console.log(error) };
         console.log(`${item.name} has been successfully saved`);
      });
      res.send(newItem)
   })
}