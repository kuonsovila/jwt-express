const jwt = require("jsonwebtoken");
const express = require("express");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config();

const jwtVerify = (req, res, next) => {
  const token = req.header(process.env.TOKEN_HEADER_KEY);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.json({ message: "Somethong went wrong!!" });
    }
    req.user = user;
    next();
  });
};

app.get("/user", jwtVerify, (req, res) => {
  res.json({ message: "can access" });
});

app.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({ message: "Username and password is required!" });
  }
  if (
    req.body.username == user.username &&
    req.body.password == user.password
  ) {
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
    return res.json({ token });
  }
  res.json({ message: "Unauthorization!" });
});
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});

const user = {
  username: "vila",
  password: "12345",
};
