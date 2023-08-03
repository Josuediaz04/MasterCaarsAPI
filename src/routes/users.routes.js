const router = require('express').Router();
const sequelize = require('../../libs/sequelize');

router.get('/', async(req, res, next) => {
    try {
        const users = await sequelize.query('select * from users;');
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
