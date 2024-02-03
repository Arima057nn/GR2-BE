const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const RoleModel = require("../models/roleModel");

const getAllUser = async (req, res, next) => {
  try {
    const data = await UserModel.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  try {
    const user = req.body;
    const existingUser = await UserModel.findOne({ email: user.email });

    if (!existingUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      existingUser.password
    );

    const role = await RoleModel.findOne({ _id: existingUser.roleId });

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const account = {
      email: existingUser.email,
      role: role.value,
    };
    const accessToken = jwt.sign(account, "your-secret-key", {
      expiresIn: "3000s",
    });

    res.status(200).json({
      message: "Login successful",
      email: existingUser.email,
      role: role.value,
      userId: existingUser._id,
      accessToken: accessToken,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const register = async (req, res, next) => {
  try {
    const user = req.body;
    const existingUser = await UserModel.findOne({ user: user.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({
      email: user.email,
      password: hashedPassword,
      departmentId: user.departmentId,
      roleId: user.roleId,
      status: user.status,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const authenTokenUser = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  // `Beaer [token]`
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  jwt.verify(token, "your-secret-key", (err, data) => {
    if (err) return res.status(403).send("Invalid token.");

    req.user = data;
    console.log("User", req.user);
    if (req.user.role !== 3)
      return res.status(403).send("Unauthorized access. Not User");
    next();
  });
};

const authenTokenManager = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  // `Beaer [token]`
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  jwt.verify(token, "your-secret-key", (err, data) => {
    if (err) return res.status(403).send("Invalid token.");

    req.user = data;
    console.log("User", req.user);
    if (req.user.role !== 2)
      return res.status(403).send("Unauthorized access. Not Manager");
    next();
  });
};

const authenTokenAdmin = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  // `Beaer [token]`
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  jwt.verify(token, "your-secret-key", (err, data) => {
    if (err) return res.status(403).send("Invalid token.");

    req.user = data;
    console.log("User", req.user);
    if (req.user.role !== 1)
      return res.status(403).send("Unauthorized access. Not Admin");
    next();
  });
};

module.exports = {
  getAllUser,
  register,
  login,
  authenTokenUser,
  authenTokenManager,
  authenTokenAdmin,
};
