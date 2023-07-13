const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// router.get("/", (req, res) => {
//   console.log("connect");
// });

//Register User
router.post("/register", async (req, res) => {
  //   console.log(req.body);
  const { name, email, phonenumber } = req.body;

  if (!name || !email || !phonenumber) {
    res.status(422).json("plz fill the data");
  }

  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(422).json("this user is alreay register");
    } else {
      const adduser = new users({
        name,
        email,
        phonenumber,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

//get Userdata

router.get("/getdata", async (req, res) => {
  try {
    const userData = await users.find();
    res.status(201).json(userData);
    console.log(userData);
  } catch (error) {
    res.status(422).json(error);
  }
});

//get indivisual data
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindivisual = await users.findById({ _id: id });

    console.log(userindivisual);
    res.status(201).json(userindivisual);
  } catch (error) {
    res.status(422).json(error);
  }
});

//update user data

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletuser = await users.findByIdAndDelete({ _id: id });
    console.log(deletuser);
    res.status(201).json(deletuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
