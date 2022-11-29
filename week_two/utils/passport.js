"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { getUserLogin } = require("../models/userModel");

// local strategy for username password login
passport.use(
  new Strategy(async (username, password, done) => {
    const params = [username];
    try {
      const [user] = await getUserLogin(params);
      console.log("Local strategy", user); // result is binary row
      if (user === undefined) {
        return done(null, false, { message: "Incorrect email." });
      }
      //Hash login password and compare with the password in database

      const passwordOK = await bcrypt.compare(password, user.password);
      if (!passwordOK) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user, { message: "Logged In Successfully" });
    } catch (err) {
      return done(err);
    }

    //TO access through the unhashed password
    /*   if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, { ...user }, { message: "Logged In Successfully" }); // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) {
      return done(err);
    } */
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  )
);

module.exports = passport;
