const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/home`);
  }
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
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  res.json(req.user);
});


// ✅ Test route to check if auth routes are working
router.get("/test", (req, res) => {
  res.send("Auth route is working");
});

module.exports = router;
