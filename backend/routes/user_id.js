var User = require('../models/UserInfo.js');
var Item = require('../models/ItemInfo.js');

module.exports = function (router) {
    // Get User Information:
    // Endpoint: GET http://localhost:5173/api/users/{userId}

    var Route = router.route('/users/:userId');
    
    Route.get(async (req, res) => {
        try {
            const userId = req.params.userId;
            var user = await User.findOne({ _id: userId }).exec();

            if (!user) {
                return res.status(404).send({message: 'User not Found',data: []});
            } else {
                if (req.query.select){
                    var user = await User.find({_id: userId}).select(JSON.parse(req.query.select)).exec();
                }
                return res.status(200).send({message: 'User Found',data: user});
            }
        } catch (error) {
            return res.status(500).send({message: 'Server Error',data: []});
        }
    });

    // Update User Rating:
    // Endpoint: PATCH http://localhost:5173/api/users/{userId}/rating
    var Route = router.route('/users/:userId/rating');
    
    Route.patch(async (req, res) => {
        try {
            const userId = req.params.userId;
            const { rating } = req.body;
        
            const updatedUserProfile = await User.findOneAndUpdate(
              { _id: userId },
              { rating },
              { new: true }
            );
        
            if (!updatedUserProfile) {
              res.status(404).send({ message: 'User profile not found', data: [] });
            } else {
              res.status(200).send({ message: "User found", data: updatedUserProfile});
            }
          } catch (error) {
            res.status(500).send({ message: 'Server error', data: error });
          }
    });

    // Update User Contact Information:
    // Endpoint: PATCH http://localhost:5173/api/users/{userId}/contact
    var Route = router.route('/users/:userId/contact');
    
    Route.patch(async (req, res) => {
        try {
            const userId = req.params.userId;
            const { contact } = req.body;
        
            const updatedUserProfile = await User.findOneAndUpdate(
              { _id: userId },
              { contact },
              { new: true }
            );
        
            if (!updatedUserProfile) {
              res.status(404).send({ message: 'User profile not found', data: [] });
            } else {
              res.status(200).send({ message: "User found", data: updatedUserProfile});
            }
          } catch (error) {
            res.status(500).send({ message: 'Server error', data: error });
        }
    });

    // Get User Items:
    // Endpoint: GET http://localhost:5173/api/users/{userId}/items
    var Route = router.route('/users/:userId/items');
    
    Route.get(async (req, res) => {
        try {
            const userId = req.params.userId;
        
            const userInfo = await User.findOne({ _id: userId }).populate('items');
        
            if (!userInfo) {
              res.status(404).send({ message: 'User info not found', data: [] });
            } else {
              const userItems = userInfo.items;
              res.status(200).send({ message: 'User found', data: userItems});
            }
          } catch (error) {
            res.status(500).send({ message: 'Server error', data: error });
        }
    });

    // Add Item to User's Posted List:
    // Endpoint: POST http://localhost:5173/api/users/{userId}/items

    Route.post(async (req, res) => {
        try {
            const userId = req.params.userId;
            
            const userInfo = await User.findOne({ _id: userId });
            if (!userInfo) {
              res.status(404).send({ message: 'User info not found', data: [] });
            }
            
            const new_item = new Item();
    
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
            new_item.userID = userId

            if ('images' in req.body && req.body.images){
              new_item.images = req.body.images;
            }
  
            await new_item.save();
            
            
            // Add the item to the user's posted list
            userInfo.items.push(new_item._id);
            await userInfo.save();
        
            res.status(201).send({message: 'New item pushed', data: new_item});
            
          } catch (error) {
            res.status(500).send({ message: 'Server error', data: error });
        }
    });

    // Remove Item from User's Posted List:
    // Endpoint: DELETE http://localhost:5173/api/users/{userId}/items/{itemId}
    var Route = router.route('/users/:userId/items/:itemId');
    
    Route.delete(async (req, res) => {
        try {
            const userId = req.params.userId;
            const itemId = req.params.itemId;

            const userInfo = await User.findOne({ _id: userId });
        
            if (!userInfo) {
              res.status(404).send({ message: 'User info not found', data: [] });
            } else {
              userInfo.items.pull(itemId);
              await userInfo.save();    
              await Item.deleteOne({_id: itemId});
        
              res.status(200).send({ message: 'Item removed successfully', data:[] });
            }
          } catch (error) {
            res.status(500).send({ message: 'Server error', data: error });
        }
    });


    // Get User favorite Items:
    // Endpoint: GET http://localhost:5173/api/users/{userId}/favorite

    var Route = router.route('/users/:userId/favorite');
    
    Route.get(async (req, res) => {
        try {
            const userId = req.params.userId;
            const userInfo = await User.findOne({ _id: userId }).populate('favorite');
        
            if (!userInfo) {
              res.status(404).send({ message: 'User info not found', data: [] });
            } else {
              const userfavoriteItems = userInfo.favorite;
              res.status(200).send({message: 'User found', data: userfavoriteItems});
            }
          } catch (error) {
            res.status(500).send({ message: 'Server error', data: error });
        }
    });

    // Add Item to User's favorite List:
    // Endpoint: POST http://localhost:5173/api/users/{userId}/favorite/{itemId}

    var Route = router.route('/users/:userId/favorite/:itemId');
    
    Route.post(async (req, res) => {
        try {
            const userId = req.params.userId;
            const itemId = req.params.itemId;
        
            // Find the user info based on the provided userId
            const userInfo = await User.findOne({ _id: userId });
        
            if (!userInfo) {
              res.status(404).send({ message: 'User info not found', data: [] });
            } else {
              // Add the itemId to the user's favorite list
              userInfo.favorite.push(itemId);
              await userInfo.save();
        
              res.status(201).send({ message: 'Item added to favorite list successfully', data:userInfo });
            }
          } catch (error) {
            res.status(500).send({ message: 'Server error', data: error });
        }
    });

    // Remove Item from User's favorite List:
    // Endpoint: DELETE http://localhost:5173/api/users/{userId}/favorite/{itemId}
    
    Route.delete(async (req, res) => {
        try {
            const userId = req.params.userId;
            const itemId = req.params.itemId;
        
            const userInfo = await User.findOne({ _id: userId });
        
            if (!userInfo) {
              res.status(404).send({ message: 'User info not found', data: [] });
            } else {
              // Remove the itemId from the user's favorite list
              userInfo.favorite.pull(itemId);
              await userInfo.save();
        
              res.status(200).send({ message: 'Item removed from favorite list successfully', data: userInfo });
            }
          } catch (error) {
            res.status(500).send({ message: 'Server error', data: error });
        }
    });

    return router;
}