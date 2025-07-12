const jwt = require("jsonwebtoken");
// exports = {};

exports.getToken = async (email, user) => {
  const token = jwt.sign(
    { identifier: user._id, email: user.email },
    process.env.JWT_SECRET,
    {}
  );
  // console.log("Generated Token:", token);

  return token;
};

// module.exports = exports;
