var User = require('../models/UserInfo.js');
var Item = require('../models/ItemInfo.js');

module.exports = function (router) {

    // Retrieve an Item by ID:
    // Endpoint: GET http://localhost:5173/api/items/{itemId}

    var Route = router.route('/items/:itemId');
    Route.get(async (req, res) => {
        try {
            const itemId = req.params.itemId;
            var item = await Item.findById(itemId).exec();
    
            if (!item) {
                return res.status(404).send({message: 'Item not Found',data: []});
            } else {
                if (req.query.select){
                    var item = await Item.find({"_id":itemId}).select(JSON.parse(req.query.select)).exec();
                }
                return res.status(200).send({message: 'Item Found',data: item});
            }
        } catch (error) {
            return res.status(500).send({message: 'Server error',data: error});
        }
    });

    // Update Item Details:
    // Endpoint: PUT http://localhost:5173/api/items/{itemId}

    Route.put(async (req, res) => {
        try {

            const itemId = req.params.itemId;
            const item = await Item.findById(itemId).exec();
    
            if (item == null) {
                return res.status(404).send({message: 'Item not Found',data: []});
            }

            const new_Item = {};
    
            if ('name' in req.body && req.body.name) {
                new_Item.name = req.body.name;
            } else {
                return res.status(500).send({message: 'Name missing',data: []});
            }

            if ('label' in req.body && req.body.label) {
                new_Item.label = req.body.label;
            } else {
                return res.status(500).send({ message: 'Label missing', data: [] });
            }

            if ('description' in req.body && req.body.description){
                new_Item.description = req.body.description;
            } else {
                return res.status(500).send({ message: 'Description missing', data: [] });
            }

            if ('sold' in req.body && req.body.sold !== undefined){
                new_Item.sold = req.body.sold;
            } else {
                new_Item.sold = false;
            }

            if ('postDate' in req.body && req.body.postDate){
                new_Item.postDate = req.body.postDate;
            } else {
                new_Item.postDate = Date.now();
            }
            
    
            if ('userID' in req.body) {
                return res.status(500).send({ message: 'Item cannot be assigned to other user', data: [] });
            }

            if ('images' in req.body && req.body.images){
                new_Item.images = req.body.images;
            }
    
            const updatedData = await Item.findByIdAndUpdate(item.id, new_Item, { new: true });
    
            return res.status(200).send({message: 'Item Updated',data: updatedData});
        } catch (error) {
            return res.status(500).send({message: 'Server error',data: error});
        }
    });


    // Partially Update Item Details (e.g., Mark as Sold):
    // Endpoint: PATCH http://localhost:5173/api/items/{itemId}
    
    Route.patch(async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const { sold } = req.body;
        
            // Find the item based on the provided itemId
            const item = await Item.findByIdAndUpdate(itemId, { sold }, { new: true });
        
            if (!item) {
              res.status(404).send({ message: 'Item not found', data: [] });
            } else {
              res.status(200).send({ message: 'Item updated', data: item });
            }
          } catch (error) {
            res.status(500).send({ message: 'Server error', data: error });
          }
    });


    // Delete an Item:
    // Endpoint: DELETE http://localhost:5173/api/items/{itemId}
    
    Route.delete(async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const item = await Item.findById(itemId).exec();

            if (item == null) {
                return res.status(404).send({message: 'Item not Found',data: []});
            }
    
            const user = await User.findById(item.userID).exec();
            user.items.remove(item.id);
            await user.save();
            await Item.deleteOne({_id: itemId});
   
            return res.status(200).send({message: 'Item Deleted',data: []});
        } catch (error) {
            return res.status(500).send({message: 'Server error',data: error});
        }
    });
    
    return router;
}