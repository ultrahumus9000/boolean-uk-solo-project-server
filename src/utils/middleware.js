const { validateToken } = require("./authgenerator");

const middleware = (req, res, next) => {
  const { token } = req.cookies;

  let userData = token && validateToken(token);

  if (userData) {
    req.currentUser = userData;
    console.log("line 12 userdata ", userData);
    next();
  } else {
    res.status(401).json("You need to be logged in to access this data");
  }
};

module.exports = middleware;
