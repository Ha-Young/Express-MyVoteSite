const argon2 = require("argon2");
const jwt = require('jsonwebtoken');
const { randomBytes } = require("crypto");

const User = require("../models/User");
const { jwtSecret } = require("../config");

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

    /**
     * @TODO This is not the best way to deal with this
     * There should exist a 'Mapper' layer
     * that transforms data from layer to layer
     * but that's too over-engineering for now
     */
    const user = userRecord.toObject();

    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');

    return { user, token };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
};

function generateToken(user) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
      name: user.name,
      exp: exp.getTime() / 1000,
    },
    jwtSecret
  );
}
