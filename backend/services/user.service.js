const User = require("../models/User");

exports.createUser = async (decoded, adminRights) => {
  let existingUser = await User.findOne({ sub: decoded.sub });
  if (!existingUser) {
    const user = new User({
      email: decoded.email,
      name: decoded.name,
      sub: decoded.sub,
      isAdmin: adminRights,
    });
    // console.log("user:", user);
    return user.save();
  }
};

exports.removeUser = (id) => {
  return new Promise((resolve, reject) => {
    User.deleteMany({ sub: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};

exports.listUser = (id) => {
  return User.findOne({ sub: id }).then((result) => {
    //result = result.toJSON();

    return result;
  });
};
