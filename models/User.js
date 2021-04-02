const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { ErrorHandeler, ErrorHandler } = require("../util/error");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  email: {
    type: String,
    unique: true,
    minlength: 4,
  },
  password: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  voting: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voting",
  }],
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  const password = this.password;
  this.password = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

  next();
});

userSchema.virtual("id").get(function() {
  return this._id.toString();
});

userSchema.methods.comparePassword = async function(pw ,cb) {
  try {
    const comparedPasswordResult = await bcrypt.compare(pw, this.password);
    
    if (comparedPasswordResult) {
      const user = { email: this.email, name: this.name };

      cb(null, user);
    } else {
      cb(null, false);
    }
  } catch (error) {
    cb(error);
  }
};

module.exports = mongoose.model("User", userSchema);
