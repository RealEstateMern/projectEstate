import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userID);
  return res.status(200).json({ message: "You are Authenticated" });
};

export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JSON_SECRET_KEY, (err, payload) => {
    if (err) return res.status(403).json({ message: err });

    if (!payload.isAdmin) {
      return res.status(403).json({ message: "You are not an Admin!" });
    }

    // If the user is an admin, send the response here and return to prevent further execution.
    return res.status(200).json({ message: "You are Authenticated" });
  });
};
