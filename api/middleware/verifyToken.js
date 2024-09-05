import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JSON_SECRET_KEY, (err, payload) => {
    // console.log("JWT : ", err);
    if (err) return res.status(403).json({ message: err });
    req.userID = payload.id;

    next();
  });
};
