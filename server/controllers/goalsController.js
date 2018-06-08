module.exports = {
    setCalorieGoal: (req, res, next) => {
        if (!req.user) {
            res.sendStatus(401);
            return;
        }

        // console.log('req body',req.body);
        // console.log('req user: ', req.user);
        const dbInstance = req.app.get('db');

        dbInstance.searchGoalsForUser([req.user.id]).then( (userarr) => {
            if(userarr.length > 0) {
                dbInstance.updateUserCalGoal([req.body.calorieInput, req.user.id]).then (() => 
                res.sendStatus(200))
                .catch( (error) => console.log('ERR::: ', error))
            } else {
                dbInstance.setUserCalories([req.user.id, req.body.calorieInput]).then (() => 
                res.sendStatus(200))
                .catch( (error) => console.log('ERR:::  goalsController: 20 ', error))
            }
        })
    },

    getCalorieGoal: (req, res, next) => {
        if (!req.user) {
            res.sendStatus(401);
            return;
        }

        const dbInstance = req.app.get('db');
        dbInstance.getUserGoalInfo([req.user.googleid]).then( (goalInfo) => {
            res.status(200).send(goalInfo)
        }).catch( (error) => console.log('ERR:::  goalController: 35', error))
    }
}