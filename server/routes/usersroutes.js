//import express from "express";
//import { create, getUsersData } from "";
const express = require("express");
const { signUp, login } = require("../controller/usersapi.js");
const route = express.Router();

route.post("/signup", signUp);
route.post("/login", login);

/*route.get("/user/:id", getOneUsersData);
route.put("/updateuser/:id", updateUserData);
route.delete("/deleteuser/:id", deleteUserData);
*/

module.exports = route;
//export default route;;
