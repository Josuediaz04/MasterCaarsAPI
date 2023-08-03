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

router.post('/', async(req, res, nex)=> {
    try {
        console.log(req.body);
        const query = 'INSERT INTO users (name, lastname, email, password, id_role, created_at) VALUES (?, ?, ?, ?, ?, ?);';

        const result = await sequelize.query(query, {
            replacements: [req.body.name, req.body.lastname, req.body.email, req.body.password, req.body.idRole, req.body.created_at],
            type: sequelize.QueryTypes.INSERT,
        });
        console.log(result);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
