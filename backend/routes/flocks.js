const router = require('express').Router();
let Flock = require('../models/flocks.model');

router.route('/').get((req, res) => {
    Flock.find()
        .then(flocks => res.json(flocks))
        .catch(err => res.status(400).json('Error '+err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const tagNo = Number(req.body.tagNo);
    const group = req.body.group;

    const  newFlock = new Flock({
        username,
        description,
        tagNo,
        group,
    });
    newFlock.save()
        .then(() => res.json('Flock added!'))
        .catch(err => res.status(400).json('Error '+err));
});

router.route('/:id').get((req, res)=>{
    Flock.findById(req.params.id)
        .then(flocks => res.json(flocks))
        .catch(err => res.status(400).json('Error '+err));
});

router.route('/:id').delete((req, res)=>{
    Flock.findByIdAndDelete(req.params.id)
        .then(() => res.json('Flock deleted'))
        .catch(err => res.status(400).json('Error '+err));
});

router.route('/update/:id').post((req, res)=>{
    Flock.findById(req.params.id)
        .then(flocks => {
            flocks.username = req.body.username;
            flocks.description = req.body.description;
            flocks.tagNo = Number(req.body.tagNo);
            flocks.group = req.body.group;

            flocks.save()
                .then(() => res.json('Exercise update'))
                .catch(err => res.status(400).json('Error: ' + err));
            
        })
        .catch(err => res.status(400).json('Error '+err));
});

module.exports = router;