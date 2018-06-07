module.exports = {
    setCalorieGoal: (req, res, next) => {
        if (!req.user) {
            res.sendStatus(401);
            return;
        }

        console.log('req body',req.body);
        console.log('req user: ', req.user);
        const dbInstance = req.app.get('db');

        dbInstance.searchGoalsForUser([req.user.id]).then( (userarr) => {
            if(userarr.length > 0) {
                dbInstance.updateUserCalGoal([req.body.calorieInput, req.user.id]).then ((updateCalInfo) => 
                res.status(200).send(updateCalInfo))
                .catch( (error) => console.log('err', error))
            } else {
                dbInstance.setUserCalories([req.user.id, req.body.calorieInput]).then (() => 
                res.status(200).send('all good'))
                .catch( (error) => console.log('err', error))
            }
        })
    }
}