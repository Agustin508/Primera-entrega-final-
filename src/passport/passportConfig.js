const usersMongoDB = require("../daos/users/UsersDaoMongoDb")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const users = new usersMongoDB();

passport.use("local-signup", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {

    let user = await users.getByUser(username)

    const hash = bcrypt.hashSync(password, saltRounds);

    if (user) {
        console.log("El usuario ya existe")
        return done(null, false)
    }
    let userNew = await users.save({
        email: username,
        password: hash
    })
    return done(null, userNew)
}))


passport.use("local-login", new LocalStrategy(async (username, password, done) => {

    let user = await users.getByUser(username);

    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
        }
    }
    return done(null, false)
}))


passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser(async (id, done) => {

    let user = await users.getById(id)
    done(null, user)
})


module.exports = passport;