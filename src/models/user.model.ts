import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
  email: string;
  password: string;
  fullname: string;
  verified: boolean;
  verificationToken: string;
  isDeleted: boolean;
  DeletedAt?: Date;
}

interface Profile {
  _id: string;
  email: string;
  fullname: string;
}

interface UserMethods {
  matchPassword(password: string): Promise<boolean>;
  profile(): Profile;
  verifyAccount(): void;
  deleteAccount(): void;
}

type UserModel = Model<User, object, UserMethods>;

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    isDeleted: { type: Boolean, default: false },
    DeletedAt: { type: Date },
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

userSchema.methods.verifyAccount = async function () {
  this.verified = true;
  this.save();
};

userSchema.methods.deleteAccount = async function () {
  this.isDeleted = true;
  this.DeletedAt = new Date();
  this.save();
};

userSchema.methods.profile = function () {
  return {
    _id: this._id,
    email: this.email,
    fullname: this.fullname,
  };
};

const UserModel = model<User, UserModel>('User', userSchema);

export default UserModel;
