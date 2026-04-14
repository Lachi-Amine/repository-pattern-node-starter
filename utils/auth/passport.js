import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import "./local.strategy.js";
import { userRepository } from "../../repositories/user.repository.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await userRepository.findById(payload.sub);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;