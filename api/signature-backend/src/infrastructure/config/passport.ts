import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      // Aquí puedes buscar o guardar el usuario en tu base de datos
      const user = {
        name: profile.displayName,
        email: profile.emails?.[0].value,
        oauthId: profile.id,
        avatarUrl: profile.photos?.[0].value,
      };
      done(null, user);
    }
  )
);
