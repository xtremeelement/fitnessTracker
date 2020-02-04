const Workout = require("../models/Workout");

module.exports = function(app) {
  app.get("/api/workouts", (req, res) => {
    Workout.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      });
  });

  app.post("/api/workouts/", ({ body }, res) => {
    Workout.create(body)
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    Workout.update(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        $push: {
          exercises: {
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets,
            distance: req.body.distance
          }
        }
      }
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    Workout.find({})
      .limit(7)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });
};
