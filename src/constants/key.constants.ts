export enum ENVIRONMENT {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

export interface TokenData {
  id: string;
  email: string;
}
