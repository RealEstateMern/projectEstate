import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log(hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    // console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Failed to create User" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  //   console.log(username);
  try {
    // checkuser exist
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    // check credentials
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid Credentials" });

    // generate cookie
    const age = 1000 * 60 * 60 * 24; // cookie expires after a day

    const token = jwt.sign(
      { id: user.id, isAdmin: true },
      process.env.JSON_SECRET_KEY,
      {
        expiresIn: age,
      }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true // use in production
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Failed to login User" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successfully" });
};
