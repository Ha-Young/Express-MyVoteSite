const jwt = require("jsonwebtoken");
const User = require("../../models/User");

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.cookies["jwt"];
		let decoded;

		if (token) {
			decoded = jwt.verify(
				token, 
				process.env.JWT_SECRET_KEY, 
				{ expiresIn: "1h" }
			);
		}
		
    res.locals.user = decoded?.email;

    next();
  } catch (error) {
		next(error);
  }
};

exports.getUserDataByToken = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: res.locals.user });

		if (user) {
			const userData = new User();

			userData.email = user.email;
			userData.name = user.name;
			userData._id = user._id;
			userData.votings = user.votings;
			userData.avatar = user.avatar;
			
			req.user = userData;
		}

		next();
	} catch (error) {
		next(error);
	}
};

exports.isAuthenticated = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: res.locals.user });

		if (!user) {
			throw new Error("Unauthorized");
		}
		
		const userData = new User();

		userData.email = user.email;
		userData.name = user.name;
		userData._id = user._id;
		userData.votings = user.votings;
		userData.avatar = user.avatar;
		
		req.user = userData;

		next();
	} catch (error) {
		next(error);
	}
};
