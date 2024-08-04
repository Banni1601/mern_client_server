//import usersData from "../model/users.js";
const usersData = require("../model/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");

const signUp = async (req, res) => {
  try {
    //get all data from the body
    const { name, email, password } = req.body;
    //all data should exists????
    if (!(name && email && password)) {
      res.status(202).json({ message: "All fields are compulsory" });
      return res.status;
    }

    //check if user is already exists - email
    const existingUser = await usersData.findOne({ email });
    if (existingUser) {
      res.status(201).json({ message: " User already exist with this mail" });
      return res.status;
    } else {
      //encrypt the password
      const myEncryptedPassword = await bcrypt.hash(password, 10);
      // save the user in DB
      const newUser = await new usersData({
        name: name,
        email: email,
        password: myEncryptedPassword
      });
      //generate a token for user and send it
      const JWT_SECRET = crypto.randomBytes(32).toString("hex");
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
        expiresIn: "2h"
      });

      newUser.token = token;

      await newUser.save();
      res.status(200).json(newUser);
      return res.status;
    }

    /* const userData = new usersData(req.body);
    if (!userData) {
      return res.status(404).json({ message: "MailId was already used" });
    }
    const saveData = await userData.save();
    res.status(200).json(saveData); */
  } catch (error) {
    res.status(203).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    //get all data from frontend
    const { email, password } = req.body;
    //validation
    if (!(email && password)) {
      res.status(203).json({ message: "Give all data" });
      console.log(res.status);
      return res.status;
    } else {
      //find the user in DB
      const user = await usersData.findOne({ email });

      //if user is not there
      if (!user) {
        res.status(202).json({ message: "no user found" });
        console.log(res.status);
        return res.status;
      } else if (user && (await bcrypt.compare(password, user.password))) {
        //if user mail and password is matched then generate the token
        const JWT_SECRET = crypto.randomBytes(32).toString("hex");
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
          expiresIn: "2h"
        });
        user.token = token;
        //cookie section
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true
        };

        res.status(200).cookie("token", token, options).json(user);
        console.log(res.status);
        return res.status;
      } else {
        res.status(201).json({ message: "password is incorrect" });
        console.log(res.status);
        return res.status;
      }
    }
  } catch (error) {
    res.status(204).json({ message: error.message });
    console.log(res.status);
    return res.status;
  }
};

module.exports = { signUp, login };
/*
export const getOneUsersData = async (req, res) => {
  try {
    const id = req.params.id;
    const usersData = await userdetails.findById(id);
    if (!usersData) {
      return res.status(404).json({ message: "data was not found" });
    }

    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const usersData = await userdetails.findById(id);
    if (!usersData) {
      return res.status(401).json({ message: "user was not found" });
    }
    const updatedUserData = await userdetails.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.status(200).json(updatedUserData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const usersData = await userdetails.findByIdAndDelete(id);
    if (!usersData) {
      return res.status(404).json({ message: "user was not found" });
    }

    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


*/
