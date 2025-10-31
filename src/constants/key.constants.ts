export enum ENVIRONMENT {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export enum GENDER {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum ROLES {
  ADMIN = 'Admin',
  USER = 'User',
}

export enum USER_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DELETED = 'Deleted',
}

export interface TokenData {
  id: string;
  email: string;
}

export interface EmailVerificationToken {
  id: string;
  email: string;
}

export interface ForgotPasswordToken {
  id: string;
  email: string;
}

export const DB_CONNECTION = {
  SUCCESS: 'Database connected successfully',
  FAIL: 'Database connection failed.',
};

export const LOGIN = {
  INVALID_CREDENTIALS: 'Invalid login credentials.',
  USER_NOT_FOUND: 'User not found with given credentials.',
  SUCCESS: 'Welcome, login successfully!',
  LOGOUT: "You've been logged out, fare thee well.",
  NOT_ACTIVE_USER: 'Account with given email is not active yet.',
  USER_BLOCK: 'Your account is suspended. Please contact to administrator.',
  PERMISSION_DENIED: 'You are not allowed to access this route',
};

export const GLOBAL = {
  PASSWORD_NOT_MATCH:
    'Password must be strong. At least one upper case alphabet, one lower case alphabet, one digit, one special character, and be between 6 to 12 characters long.',
  CONFIRM_PASSWORD_NOT_SAME: 'Password and confirm password should be the same',
};

export const REGISTER = {
  SUCCESS: 'User created successfully! Please verify your email address.',
  ALREADY_EXISTS: 'User with provided email address already exists.',
  FAILED: 'Error occurs while creating user. ',
  PASSWORD_UPDATE: 'Password updated successfully',
  PASSWORD_UPDATE_FAIL: 'No User Found with connected email.',
  PASSWORD_CHANGE: 'Password changed successfully',
  MOBILE_SUCCESS: 'OTP sent to the registered mobile number.',
  EMAIL_OTP_SUCCESS: 'OTP sent to the registered email.',
  USER_EXIST: 'Account already exists with the given email, please provide another email.',
  USER_NOT_REGISTERED: 'No user registered with these credentials found.',
  EMAIL_FAIL: 'We fumbled; email send failed, please try again later.',
  EMAIL_SENDED_RECENTLY: 'Email just sent, please try again later.',
  EMAIL_UNVERIFIED: 'Email not verified. Please verify email to continue.',
  EMAIL_OR_USER_UNVERIFIED: 'Email not verified or No user registered. Please verify email to continue.',
  EMAIL_SENT_SUCCESS: 'Please check your inbox to get activation link.',
  INVALID_VERIFICATION_LINK: 'Invalid activation link.',
  EMAIL_VERIFICATION_SUCCESS: "Success!  You've verified your account.",
  EMAIL_VERIFICATION_EXPIRED: 'Account activation link expired. Please resend activation email.',
  EMAIL_ALREADY_VERIFIED: 'Email has been already verified.',
  EMAIL_VERIFICATION_INVALID_TOKEN: 'Invalid email verification token.',
  EMAIL_SENT: 'Email has been sent to registered email.',
  USER_BLOCK: 'Employee is blocked.',
  PROFILE_UPDATE: 'Profile updated successfully',
};

export const RESET_PASSWORD = {
  INVALID_LINK: 'Invalid reset password link.',
  LINK_EXPIRED: 'Reset Password link expired.',
  SUCCESS: 'Your password has been reset.',
  EMAIL_SENT_SUCCESS: 'Password reset link sent, please check your inbox.',
};

export const FORGOT_PASSWORD = {
  INVALID_EMAIL: 'Requested email not found.',
  EMAIL_SENT_SUCCESS: 'Forgot password link sent, please check your inbox.',
  EMAIL_SENT_FAIL: 'Something went wrong to send email, Please try again',
  VERIFY_TOKEN_FAIL: 'Token Expired',
  TOKEN_VERIFIED: 'Received token verified successfully',
  Old_PASSWORD: 'Old password is required.',
};

export const ERROR = {
  INTERNAL_SERVER_ERROR: 'Something went wrong, please try again later.',
  UNAUTHORIZED_ERROR: 'Please provide token.',
  UNAUTHORIZED_ROLE_ERROR: 'Unauthorized access. You are not authorized to perform this action.',
  TOKEN_EXPIRED_ERROR: 'Unauthorized access. token expired.',
  PASSWORD_VALIDATE:
    'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum six in length',
};

export const CHANGE_PASSWORD = {
  PASSWORD_REQUIRED: 'Password and confirm password is required',
  PASSWORD_VALIDATION: 'Password must be a combination of number, lowercase and uppercase and special character.',
  NEW_PASSWORD_VALIDATION:
    'New password must be a combination of number, lowercase and uppercase and special character.',
  PASSWORD_NOT_MATCH: 'New password and confirm new password must be the same.',
  NEW_PASSWORD_MATCH_CURRENT: 'Please choose a password that is different from your current password.',
  SUCCESS: 'Your password has been changed successfully.',
  INCORRECT_CURRENT_PASSWORD: 'Invalid current password.',
};

export const FILE_MESSAGE = {
  UPLOADED: 'File uploaded successfully.',
  FILE_VIEW: 'File retrieved successfully.',
  FILE_DELETED: 'File deleted successfully.',
  NOT_UPLOADED: 'File not uploaded. Something went wrong.',
  NOT_VALID: 'Not valid file formate.',
  FILE_URL_FOUND: 'File found..',
  FILE_URL_NOT_FOUND: 'File not found..',
  ATTACHMENT_FILE_ERROR: 'Please send attachment to upload.',
  FILE_SIZE_EXCEED: 'File size is too large.',
};
