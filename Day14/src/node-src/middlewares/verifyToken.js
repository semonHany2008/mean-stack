import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token;
  if (req.headers.token) token = req.headers.token;
  else token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(400).json({ message: "error: token is required!" });
  jwt.verify(token, "key", (err, decoded) => {
    if (err)
      return res.status(400).json({ message: "error: token is not valid!" });
    else {
      req.user = decoded; //user here isn't a predefined property in req object, it created manual here.
      next();
    }
  });
};
