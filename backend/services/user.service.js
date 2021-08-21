const User = require("../models/User");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

exports.createUser = async (decoded, adminRights) => {
  let existingUser = await User.findOne({ sub: decoded.sub });
  //If user is not in DB yet
  if (!existingUser) {
    //Confirmation email after first login of new user before adding them to DB
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: "The ELTforYOU team",
      to: decoded.email,
      subject: "Signup",
      html: `<h3>Hello ${decoded.name}!<h3/>
      <p>Welcome to the team. Feel free to submit authentic materials as well as relevant activities.<p/>
      `,
    };

    
    try {
      //sends email to new user

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
//saves new user to DB
    return user.save();
  }
};

//Deletes account from DB at user's request
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

//Finds user data in DB at user's request
exports.listUser = (id) => {
  return User.findOne({ sub: id }).then((result) => {
    return result;
  });
};
