

module.exports = {
    addNewFood: (req, res, next) => {
        if (!req.user) {
            res.sendStatus(401);
            return;
        }

        const dbInstance = req.app.get('db');
        let {label, carbs, protein, calories, fats} = req.body;
        dbInstance.addNewFood([req.user.id, label, fats, protein, carbs, calories]).then( () => {
            res.status(200).send('Food logged sucessfully');
            console.log('food logged');
        }).catch( (error) => console.log('ERR::: homeController: addNewFood ', error))
    }, 

    getLoggedFood: (req, res, next) => {
        if (!req.user) {
            res.sendStatus(401);
            return;
        }

        const dbInstance = req.app.get('db');
        if (req.query.foodtime === 'today') {
            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate()+1);
            let todayStr = today.getYear()+ '-' + today.getMonth() + '-' + today.getDate();
            let tomorrowStr = tomorrow.getYear() + '-' + tomorrow.getMonth() +'-' + tomorrow.getDate(); 

            dbInstance.getTodaysFood([req.user.id, today, tomorrow]).then( (userFood) => {
                res.status(200).send(userFood);
            }).catch( (error) => console.log('ERR::: homeController: getLoggedFood', error))
        }
    },

    removeFood: (req, res, next) => {
        if (!req.user) {
            res.sendStatus(401);
            return;
        }

        const dbInstance = req.app.get('db');
        dbInstance.removeFood([req.params.id]).then( () => {
            console.log('item removed');
            res.sendStatus(200);
        }).catch( (error) => console.log('ERR::: homeController: removeFood', error))
    }
}