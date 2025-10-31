import { injectable } from 'inversify';
// import * as jwt from 'jsonwebtoken';
// import bcryptjs from 'bcryptjs';
// import { User, UserDocument, UserModel } from '../../models/user/user.model';
// import { newUserPayload } from '../../models/user/user.payload';
// import { JwtUtil } from '../../utils/jwt/jwt.util';
// import { EmailVerificationToken } from '../../constants/key.constants';
// import { StatusCodes } from 'http-status-codes/build/cjs';
// import { getCurrentTimestamps } from '../../utils/common.util';
// import { sendVerifyUserEmail } from '../../utils/email/sendVerifyUserEmail';

@injectable()
export class UserService {
  public jwt_secret: string;
  public jwt_expire: string;
  public createhash_key: string;
  public password_encrypt_level: number;

  constructor() {
    this.jwt_secret = process.env.JWT_SECRET;
    this.jwt_expire = process.env.JWT_EXPIRES_IN;
    this.createhash_key = process.env.CREATEHASH_KEY;
    this.password_encrypt_level = Number(process.env.PASSWORD_ENCRYPT_LEVEL);
  }
}
