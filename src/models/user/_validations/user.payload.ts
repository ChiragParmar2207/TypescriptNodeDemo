import { GENDER } from '../../../constants/key.constants';

export interface signupPayload {
  name: String;
  gender: GENDER;
  dob: Date;
  address: String;
  latitude?: Number;
  longitude?: Number;
  profileImage?: any;
  phone: number;
  email: String;
  password: String;
  role: String;
}

export interface updateUserPayload {
  name?: String;
  gender?: GENDER;
  dob?: Date;
  address: String;
  latitude?: Number;
  longitude?: Number;
  profileImage?: any;
  phone?: Number;
  email?: String;
}

export interface signinPayload {
  email: String;
  password: String;
}

export interface resetPasswordPayload {
  otp: Number;
  password: String;
}

export interface updatePasswordPayload {
  oldPassword: String;
  newPassword: String;
  confirmNewPassword: String;
}
