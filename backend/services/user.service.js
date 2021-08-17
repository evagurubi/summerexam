const User = require("../models/User");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

exports.createUser = async (decoded, adminRights) => {
  let existingUser = await User.findOne({ sub: decoded.sub });
  if (!existingUser) {
    //Confirmation email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: "",
      to: decoded.email,
      subject: "Signup",
      html: `<h3>Hello ${decoded.name}!<h3/>
      <p>Welcome to the team.<p/>
      `,
    };

    /* transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });*/

    try {
      //send

      const result = await transporter.sendMail(mailOptions);

      console.log("Email sent successfully");
    } catch (e) {
      console.error(e);
    }

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
