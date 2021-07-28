const User = require("../models/User");

exports.createUser = async (decoded) => {
  let existingUser = await User.findOne({ sub: decoded.sub });
  if (!existingUser) {
    const user = new User({
      email: decoded.email,
      name: decoded.name,
      sub: decoded.sub,
    });
    return user.save();
  }
};
