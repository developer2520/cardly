const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect(`${process.env.FRONTEND_URL}/home`)
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("sessionId");
      res.redirect(process.env.FRONTEND_URL);
    });
  });
});

router.get("/user", (req, res) => {
  res.json(req.isAuthenticated() ? req.user : { error: "User not authenticated" });
});

module.exports = router;
