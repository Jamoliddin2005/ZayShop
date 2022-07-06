const router = require("express").Router();
const passport = require('passport')

// Google Authenticated
const {
  loginSuccess,
  loginFailed,
  logout,
  Google,
  GoogleCallBack,
} = require("../controllers/auth.google");
router.route("/login/success").get(loginSuccess);
router.route("/login/failed").get(loginFailed);
router.route("/login/logout").get(logout);
router.route("/google").get(Google);
router.route("/google/callback").get(GoogleCallBack);

// Github Authenticated

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// Facebook Authenticated 

router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/login/failed",
}))


// Phone Number Authenticated
const { NumberAuth } = require('../controllers/auth.phone')

router.route("/registerNumber").post(NumberAuth)

module.exports = router;