import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated !" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid !" });
  });
  res.status(200).json({ message: "You are Authenticated !" });
};

export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated !" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid !" });
    if (!payload.isAdmin)
      return res.status(403).json({ message: "You are not an Admin !" });
  });
  res.status(200).json({ message: "You are Authenticated !" });
};
