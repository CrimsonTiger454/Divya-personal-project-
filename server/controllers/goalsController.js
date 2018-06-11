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
                res.status(200).send('Calorie goal updated sucessfully'))
                .catch( (error) => console.log('ERR::: goalsController: updateCalories ', error))
            } else {
                dbInstance.setUserCalories([req.user.id, req.body.calorieInput]).then (() => 
                res.status(200).send('Calorie goal set sucessfully'))
                .catch( (error) => console.log('ERR:::  goalsController: setCalories ', error))
            }
        })
    },

    getGoalInfo: (req, res, next) => {
        if (!req.user) {
            res.sendStatus(401);
            return;
        }

        const dbInstance = req.app.get('db');
        dbInstance.getUserGoalInfo([req.user.googleid]).then( (goalInfo) => {
            res.status(200).send(goalInfo)
        }).catch( (error) => console.log('ERR:::  goalController: 35', error))
    },

    setMacroGoals: (req,res, next) => {
        if (!req.user) {
            res.sendStatus(401);
            return;
        }


        const dbInstance = req.app.get('db');
        dbInstance.searchGoalsForUser([req.user.id]).then( (userarr) => {
            let {fat, carbs, protein} = req.body;
            if(userarr.length > 0) {
                dbInstance.updateMacroGoals([fat, carbs, protein, req.user.id]).then( () => {
                    res.status(200).send('Macro goals updated sucessfully')
                }).catch( (error) => console.log('ERR:::  goalsController: updateMacros ', error))
            } else {
                dbInstance.setMacroGoals([req.user.id, fat, protein, carb]).then( () => {
                    res.status(200).send('Calorie goal updated sucessfully')
                }).catch( (error) => console.log('ERR:::  goalsController: setMacros ', error))
            }
        })
    }
}