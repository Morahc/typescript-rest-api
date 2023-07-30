import MongoStore from 'connect-mongo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { COOKIE_SECRET, MONGO_URI }:Record<string, any> = process.env

const options = {
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: MONGO_URI, collectionName: 'sessions' }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  },
};

export default options;
