var User = require('../models/UserInfo.js');
var Task = require('../models/ItemInfo.js');

module.exports = function (router) {
    var usersRoute = router.route('/users');

    usersRoute.get(async (req, res) =>{
        try {
            let query = User.find();
        
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
            } 
        
            if (req.query.count === 'true') {
              const count = await User.countDocuments(query);
              return res.status(200).send({ message: 'Count calculated', data: count });
            } else {
              const users = await query.exec();
              return res.status(200).send({message: 'Success', data: users});
            }
          } catch (error) {
            return res.status(500).send({ message: 'Server error', data: [] });
          }
    });
    return router;
}