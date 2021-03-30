const argon2 = require("argon2");
const jwt = require('jsonwebtoken');
const { randomBytes } = require("crypto");

const User = require("../models/User");
const { jwtSecret } = require("../config").jwt;

exports.SignUp = async userInputDTO => {
  try {
    const salt = randomBytes(32);

    const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
    const userRecord = await User.create({
      ...userInputDTO,
      salt: salt.toString('hex'),
      password: hashedPassword,
    });

    const token = generateToken(userRecord);

    if (!userRecord) {
      throw new Error('User cannot be created');
    }

    const user = userRecord.toObject();

    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');

    return { user, token };
  } catch (err) {
    throw new Error(err);
  }
};

exports.SignIn = async (email, password) => {
  try {
    const userRecord = await User.findOne({ email });
    if (!userRecord) {
      throw new Error('User not registered');
    }

    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      const token = generateToken(userRecord);

      const user = userRecord.toObject();

      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  } catch (err) {
    throw new Error(err);
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
      throw new Error('User can not be created');
    }

    const user = userRecord.toObject();

    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');

    return { user, token };
  } catch (e) {
    throw new Error(e);
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
