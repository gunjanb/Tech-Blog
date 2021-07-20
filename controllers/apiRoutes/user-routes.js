const router = require("express").Router();
const { User } = require("../../models");

// user logs in and sets loggedIn to true
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.name;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//logout
router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// create a user on signup
router.post("/", async (req, res) => {
  try {
    //check for unique user
    const dbUserData = await User.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (dbUserData) {
      console.log("Username already used");
      //flash the message
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    // if user name is available, create new user
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.name;
      req.session.logged_in = true;
      //flash message
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
