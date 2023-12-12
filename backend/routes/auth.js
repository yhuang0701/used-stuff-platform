const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');

module.exports = function (router) {
    router.post('/signup', registerUser);
    router.post('/signin', loginUser);
    router.get('/all', getAllUsers);
    return router
}