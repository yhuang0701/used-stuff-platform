var User = require('../models/UserInfo.js');
var Item = require('../models/ItemInfo.js');

module.exports = function (router) {
    var itemsRoute = router.route('/items');
    itemsRoute.get(async (req, res) => {
        try {
          let query = Item.find();
          // Apply query parameters
          if (req.query.where) {
            query = query.find(JSON.parse(req.query.where));
          }
          
          if (req.query.sort) {
            query = query.sort(JSON.parse(req.query.sort));
          }

          if (req.query.select) {
            query = query.select(JSON.parse(req.query.select));
          }
      
          if (req.query.skip) {
            query = query.skip(parseInt(req.query.skip));
          }
      
          if (req.query.limit) {
            query = query.limit(parseInt(req.query.limit));
          } else {
            query = query.limit(100); // Default limit for items
          }
      
          if (req.query.count === 'true') {
            const count = await Item.countDocuments(query);
            return res.status(200).send({ message: 'Count calculated', data: count });
          } else {
            const items = await query.exec();
            return res.status(200).send({message: 'Success', data: items});
          }
        } catch (error) {
          return res.status(500).send({ message: 'Server error', data: [] });
        }
    });

    // Create a New Item:
    // Endpoint: POST http://localhost:5173/api/items
    itemsRoute.post(async (req, res) => {
        try {
              const new_item = new Item();
              if ('userID' in req.body && req.body.userID && req.body.userID.length > 0) {
                const user = await User.findById(req.body.userID).exec();
                
                if (user == null) { 
                  return res.status(404).send({ message: "The userID doesn't exist", data: [] });
                } else {
                    new_item.userID = user._id;

                    // await new_item.save();    
                    
                    user.items.push(new_item._id);
                    await user.save();
                }
            } else {
                return res.status(500).send({ message: 'User Id not assgined', data: [] });
            }
    
            if ('name' in req.body && req.body.name) {
                new_item.name = req.body.name;
            } else {
                return res.status(500).send({message: 'Name Missing',data: []});
            }

            if ('label' in req.body && req.body.label) {
                new_item.label = req.body.label;
            } else {
                return res.status(500).send({ message: 'Label missing', data: [] });
            }

            if ('description' in req.body && req.body.description){
                new_item.description = req.body.description;
            } else {
                return res.status(500).send({ message: 'Description missing', data: [] });
            }

            if ('sold' in req.body && req.body.sold !== undefined){
                new_item.sold = req.body.sold;
            } else {
                new_item.sold = false;
            }

            if ('postDate' in req.body && req.body.postDate){
                new_item.postDate = req.body.postDate;
            } else {
                new_item.postDate = Date.now();
            }

            
            if ('images' in req.body && req.body.images){
              new_item.images = req.body.images;
            }


            await new_item.save();
            return res.status(201).send({ message: 'item Created', data: new_item });
        } catch (error) {
          return res.status(500).send({ message: 'Server error', data: error });
        }
    });

    return router;
}