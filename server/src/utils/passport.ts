import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { findUniqueUserById } from "../services/User"; // Import your Prisma User model

const secretKey = process.env.SECRET_KEY;
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey || "secret", // Change this to your JWT secret key
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await findUniqueUserById(payload.id); // Assuming you have a User model
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    // Add other user data if needed
  };

  return jwt.sign(payload, "your_secret_key", { expiresIn: "1h" }); // Change this to your JWT secret key and expiration time
};

export const authenticateUser = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
