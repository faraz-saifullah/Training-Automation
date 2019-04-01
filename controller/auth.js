const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/signin');
    } else {
        next();
    }
}

const adminRole = (req, res, next) => {
    console.log(req.session);
    if (req.session.type == "admin" && req.session.userId) {
        next();
    } else {
        res.status(401).send('Unauthorized access!');
    }
}

const trainerRole = (req, res, next) => {
    console.log(req.session);
    if (req.session.type == "trainer" && req.session.userId) {
        next();
    } else {
        res.status(401).send('Unauthorized access!');
    }
}

const traineeRole = (req, res, next) => {
    console.log(req.session);
    if (req.session.type == "trainee" && req.session.userId) {
        next();
    } else {
        res.status(401).send('Unauthorized access!');
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId && req.session.type == "admin") {
        res.redirect('/home');   
    } else if(req.session.userId && req.session.type == "trainer") {
        res.redirect('/trainerDash');
    } else if(req.session.userId && req.session.type == "trainee") {
        res.redirect('/traineeDash');
    } else {
        next();
    }
}

const traineeTrainerRole = (req, res, next) => {
    console.log(req.session);
    if ((req.session.type == "trainee" || req.session.type == "trainer") && req.session.userId) {
        next();
    } else {
        res.status(401).send('Unauthorized access!');
    }
}

const adminTrainerRole = (req, res, next) => {
    console.log(req.session);
    if ((req.session.type == "admin" || req.session.type == "trainer") && req.session.userId) {
        next();
    } else {
        res.status(401).send('Unauthorized access!');
    }
}

module.exports = {
    redirectLogin,
    redirectHome,
    trainerRole,
    traineeRole,
    adminRole,
    traineeTrainerRole,
    adminTrainerRole    
}