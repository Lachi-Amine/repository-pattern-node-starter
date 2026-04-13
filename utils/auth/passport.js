import passport from "passport";
import "./local.strategy.js";
import { userRepository } from "../../repositories/user.repository.js";


passport.serializeUser((user, done) => {
  const id = user._id ?? user.id;
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userRepository.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;