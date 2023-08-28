import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
  email: string;
  password: string;
  fullname: string;
  provider: string;
  image: string;
  googleId: string;
  githubId: string;
}

interface Profile {
  id: string;
  email: string;
  fullname: string;
}

interface UserMethods {
  matchPassword(password: string): Promise<boolean>;
  auth(): Profile;
}

type UserModel = Model<User, object, UserMethods>;

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    fullname: { type: String, required: true },
    provider: { type: String },
    image: { type: String },
    googleId: { type: String },
    githubId: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.auth = function () {
  return {
    id: this._id,
    email: this.email,
    fullname: this.fullname,
  };
};

const UserModel = model<User, UserModel>('User', userSchema);

export default UserModel;
