const ItemModel = require('../models/Items');

module.exports = (app) => {
   // fetch items route
   app.get('/', async (req, res) => {
      try {
         // send back collection
         const collection = await ItemModel.find({});
         res.send(collection);
      } catch(error) {
         console.log(error)
      }
   });

   // create new item route
   app.post('/upload', async (req, res) => {
      const { name, description, url, category, price, imageUrl } = req.body;
      // create new record in db
      const newItem = new ItemModel({
         name, description, url, category, price, imageUrl
      });
      console.log(newItem)
      
      // save new model
      await newItem.save((error, item) => {
         if(error) { return console.log(error) };
         console.log(`${item.name} has been successfully saved`);
      });
      res.send(newItem)
   });

   // delete item route
   app.get('/item/:id', async (req,res) => {
      const id = req.params.id;
      ItemModel.findOneAndRemove({ _id: id })
      .then(res => console.log(res))
      .catch(err => console.log(err))

      // send back collection
      const collection = await ItemModel.find({});
      res.send(collection);
   });
}