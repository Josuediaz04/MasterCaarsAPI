const UserService = require('../services/user.service');

const router = require('express').Router();

const service = new UserService;

router.get('/', 
    async(req, res, next) => {
        try {
            const users = await service.readAll();
            res.status(200).json({
                statusCode: 200,
                message: 'users fetched',
                data: users
            });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
);

router.get('/:id', 
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const user = await service.readByPk(id);
            res.status(302).json({
                statusCode: 302,
                message: 'user found',
                data: user
            });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
);

router.post('/', 
    async(req, res, next)=> {
        try {
            const user = await service.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'user created',
                data: user
            });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
);

router.patch('/', 
    async(req, res, next)=> {
        try {
            const { id } = req.params;
            const user = await service.update(id, req.body);
            res.status(202).json({
                statusCode: 202,
                message: 'user updated',
                data: user
            });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
);

router.delete('/', 
    async(req, res, next)=> {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(202).json({
                statusCode: 202,
                message: 'user deleted',
                data: id
            });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
);


module.exports = router;
