import { injectable } from 'inversify';
// import * as jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import envVars from '../../config/environmentVariables';
import responseMessages from '../../constants/responseMessages';
import { UserDocument } from '../../models/user/user.model';
import UserRepository from '../../repositories/user/user.repository';
import { signupPayload, signinPayload } from '../../models/user/_validations/user.payload';

// import { JwtUtil } from '../../utils/jwt/jwt.util';
// import { EmailVerificationToken } from '../../constants/key.constants';
// import { getCurrentTimestamps } from '../../utils/common.util';
// import { sendVerifyUserEmail } from '../../utils/email/sendVerifyUserEmail';

@injectable()
export class UserService {
  public jwt_secret: string;
  public jwt_expire: string;
  public createhash_key: string;
  public password_encrypt_level: number;

  constructor() {
    this.jwt_secret = envVars.JWT_SECRET;
    this.jwt_expire = envVars.JWT_EXPIRES_IN;
    this.createhash_key = envVars.CREATEHASH_KEY;
    this.password_encrypt_level = Number(envVars.PASSWORD_ENCRYPT_LEVEL);
  }

  /**
   * Compares the given candidatePassword with the user's stored password.
   *
   * @param candidatePassword The plain text password provided by the user for signin.
   * @param userPassword The hashed password stored in the database for the user.
   * @returns A Promise that resolves to a boolean value indicating whether the passwords match.
   * @throws An error if the password comparison fails.
   */
  public async comparePassword(candidatePassword: string, userPassword: string): Promise<Boolean> {
    const response = await bcryptjs.compare(candidatePassword, userPassword);
    if (response) {
      return true;
    } else {
      throw new Error('Email or Password incorrect. Check your signin credentials.');
    }
  }

  public async signup(payload: signupPayload): Promise<UserDocument> {
    // Checks whether a user with the provided email already exists.
    const existingUser = await UserRepository.getUser({ email: payload.email });
    if (existingUser) {
      throw new Error(responseMessages.USER_ALREADY_EXISTS);
    }

    const password = await bcryptjs.hash(payload.password as string, this.password_encrypt_level);
    const user = UserRepository.createUser({ ...payload, password });

    return user;
  }

  public async signin(payload: signinPayload): Promise<UserDocument> {
    const user = await UserRepository.getUser({ email: payload.email });

    return user;
  }
}
