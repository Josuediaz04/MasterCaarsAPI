const router = require('express').Router();
const { query } = require('../../libs/sequelize');

router.get('/', async(req, res, next) => {
    try {
        const users = await query('select * from users;');
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
