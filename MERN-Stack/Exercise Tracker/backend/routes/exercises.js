const router = require("express").Router();
const Exercise = require("../models/exercise.models");

router.route("/").get((req, res) => {
    Exercise.find()
        .then(exers => res.json(exers))
        .catch(err => res.status(400).json("Error : "+err));
});

router.route("/add").post((req, res) => {
    const {username} = req.body;
    const {description} = req.body;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({ username, description, duration, date });

    newExercise.save()
        .then(() => res.json("Exercise Added!"))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/:id").get((req, res) => {
    Exercise.findById(req.params.id)
        .then(excer => res.json(excer))
        .catch(err => res.status(400).json("Error: "+err));
});

router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise Deleted"))
        .catch(err => res.status(400).json("Error: "+err));
});

router.route("/update/:id").post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json("Exercise Updated!"))
                .catch(err => res.status(400).json("Error: "+err));
        })
        .catch(err => res.status(400).json("Error: "+err));
});

module.exports = router;