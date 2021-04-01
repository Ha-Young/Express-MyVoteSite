const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  if (!this.isModified("password")) return next(); // 고치기..

  if (this.password.length > 9) {
    const password = this.password;
    this.password = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    
    next();
  } else {
    throw new Error("Password should be longer then 10"); // error throw하기.. 이건 여기서 던지면 안돼..!
  }
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
      cb(null, false); // 이유 고시해주기... 너 어디로 가니..?
    }
  } catch (error) {
    cb(error);
  }
};

module.exports = mongoose.model("User", userSchema);
