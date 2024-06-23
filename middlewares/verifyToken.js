const jwt = require("jsonwebtoken");
function verifyToken_(req, res, next) {

  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  }
  else {
    res.status(401).json({ message: "NO token provided" });
  }


}
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken_(req, res, () => {
    if (req.params.id === req.user.id ||req.user.isAdmin) {
        next();
    }
    else return res.status(403).json({ message: "you are not allowed" });

  })



}
function verifyAdmin(req, res, next) {
  verifyToken_(req, res, () => {
    if (req.user.isAdmin) {
        next();
    }
    else return res.status(403).json({ message: "only Admin Allowed to Do this action" });

  });


}
module.exports = { verifyToken_, verifyTokenAndAuthorization,verifyAdmin };