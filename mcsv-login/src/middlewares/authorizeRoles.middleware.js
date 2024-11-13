// middleware/roleMiddleware.js
export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const token =
      req.cookies.token || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid" });
      }

      const { role } = decoded;
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = decoded;
      next();
    });
  };
}
