import passport from "passport";
import { Strategy as GoogleStrategy, Profile} from "passport-google-oauth20";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
      state: true,
    },
async (

      _accessToken: string,
      _refreshToken: string,
      params: any,
      profile: Profile,
      done: (error: any, user?: any) => void

) => {
      try {
        // 🔍 Verificar ID Token
        const ticket = await client.verifyIdToken({
          idToken: params.id_token, // viene en params
          audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
          return done(new Error("Token inválido"), null);
        }

        // 🔐 Usuario seguro
        const user = {
          name: profile.displayName,
          email: profile.emails?.[0].value,
          oauthId: profile.id,
          avatarUrl: profile.photos?.[0].value,
        };

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
