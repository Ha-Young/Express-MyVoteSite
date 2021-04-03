const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");

const User = require("../models/User");
const { jwtSecret } = require("../config").jwt;
const ERR_MSG = require("../config/errMsg");

exports.SignUp = async userInputDTO => {
  try {
    const salt = randomBytes(32);

    const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
    const userRecord = await User.create({
      ...userInputDTO,
      salt: salt.toString("hex"),
      password: hashedPassword,
    });

    const token = generateToken(userRecord);

    if (!userRecord) {
      throw new Error("user was not created");
    }

    const user = userRecord.toObject();

    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "salt");

    return { user, token };
  } catch (err) {
    return { error: { global: ERR_MSG.AUTH.LOCAL_SIGNUP_GLOBAL } };
  }
};

exports.SignIn = async (email, password) => {
  try {
    const userRecord = await User.findOne({ email });
    if (!userRecord) {
      return { error: { email: ERR_MSG.AUTH.LOCAL_LOGIN_EMAIL } };
    }

    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      const token = generateToken(userRecord);

      const user = userRecord.toObject();

      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");

      return { user, token };
    } else {
      return { error: { password: ERR_MSG.AUTH.LOCAL_LOGIN_PASSWORD } };
    }
  } catch (err) {
    return { error: { global: ERR_MSG.AUTH.LOCAL_LOGIN_GLOBAL } };
  }
};

exports.SocialLogin = async userInputDTO => {
  try {
    let userRecord = await User.findOne({ email: userInputDTO.email });

    if (!userRecord) {
      userRecord = await User.create({ ...userInputDTO });
    }

    const token = generateToken(userRecord);

    if (!userRecord) {
      throw new Error("user was not created");
    }

    const user = userRecord.toObject();

    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "salt");

    return { user, token };
  } catch (e) {
    return { error: { global: ERR_MSG.AUTH.SOCIAL_LOGIN_GLOBAL } };
  }
};

function generateToken(user) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      exp: exp.getTime() / 1000,
    },
    jwtSecret
  );
}
