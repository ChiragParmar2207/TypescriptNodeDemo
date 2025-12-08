import mongoose, { Model, Schema } from 'mongoose';
import { GENDER, ROLES, USER_STATUS } from '../../constants/key.constants';

export interface UserDocument extends Document {
  name: String;
  gender: GENDER;
  dob: Date;
  address: String;
  latitude: Number;
  longitude: Number;
  location: any;
  profileImage: any;
  phone: Number;
  email: String;
  password: String;
  role: ROLES;
  status: USER_STATUS;
  passwordChangedAt: Date;
  lastLoginDate: Date;
  loginCount: Number;
  stripeCustomerId: String;
  isActive: Boolean;
  isDeleted: Boolean;
  deletedReason: String;
  deletedBy: String;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const userSchema: Schema<UserDocument> = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: GENDER,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  latitude: {
    type: String,
    default: null,
  },
  longitude: {
    type: String,
    default: null,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: false,
    },
    default: {
      type: 'Point',
      coordinates: [0, 0],
    },
  },
  profileImage: {
    type: Object,
    required: false,
    default: null,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ROLES,
    default: ROLES.USER,
  },
  status: {
    type: String,
    required: true,
    enum: USER_STATUS,
    default: USER_STATUS.ACTIVE,
  },
  passwordChangedAt: {
    type: Date,
    required: false,
  },
  lastLoginDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  loginCount: {
    type: Number,
    required: true,
    default: 0,
  },
  stripeCustomerId: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  deletedReason: {
    type: String,
    required: false,
  },
  deletedBy: {
    type: String,
    required: false,
    default: null,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  deletedAt: {
    type: Date,
    required: false,
  },
});

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('user', userSchema);
