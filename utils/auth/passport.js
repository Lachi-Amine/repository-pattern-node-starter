import passport from "passport";
import "./local.strategy.js";
import User from "../../models/user.js";

passport.serializeUser((user, done) => {
  const id = user._id ?? user.id;
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;