import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github';

import UserModel from '../models/user.model';
import { BadRequestException, NotFoundException } from '../exceptions';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: { id: string }, done) => {
  //fetch
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email }).select('_id password');

        if (!user) {
          return done(new NotFoundException('User not found'));
        }

        if (!user.matchPassword(password))
          return done(new BadRequestException('Incorrect password'));

        return done(null, { id: user.id });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:1337/api/v1/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });
        const userEmail = profile.emails?.find((email) => email.verified && email.value)?.value;
        const userPhoto = profile.photos?.find((photo) => photo.value)?.value;

        if (!user) {
          user = await UserModel.create({
            email: userEmail,
            googleId: profile.id,
            fullname: profile.displayName,
            image: userPhoto,
            provider: profile.provider,
          });
        }

        return done(null, user.auth());
      } catch (error) {
        console.log(error);
        done();
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:1337/api/v1/auth/github/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ githubId: profile.id });

        const userEmail = profile.emails?.find((email) => email.value)?.value;
        const userPhoto = profile.photos?.find((photo) => photo.value)?.value;

        if (!user) {
          user = await UserModel.create({
            email: userEmail,
            githubId: profile.id,
            fullname: profile.displayName,
            image: userPhoto,
            provider: profile.provider,
          });
        }

        return done(null, user.auth());
      } catch (error) {
        console.log(error);
        done();
      }
    }
  )
);

export default passport;
