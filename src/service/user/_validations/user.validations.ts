import Joi from 'joi';
import { GENDER, GLOBAL } from '../../../constants/key.constants';

export const createUserSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
  }),
  gender: Joi.string()
    .valid(...Object.values(GENDER))
    .required()
    .messages({
      'string.base': 'Gender must be a string',
      'any.only': 'Gender must be one of the allowed values. (Male, Female)',
      'any.required': 'Gender is required',
    }),
  dob: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'any.required': 'Date of birth is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  phone: Joi.number().required().messages({
    'number.base': 'Phone must be a number',
    'any.required': 'Phone number is required',
  }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/)
    .required()
    .messages({
      'string.pattern.base': GLOBAL.PASSWORD_NOT_MATCH,
      'string.base': 'Password must be a string',
      'any.required': 'Password is required',
    }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': GLOBAL.CONFIRM_PASSWORD_NOT_SAME,
    'any.required': 'Confirm password is required',
  }),
});

export const userLoginSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/)
    .required()
    .messages({
      'string.pattern.base': GLOBAL.PASSWORD_NOT_MATCH,
      'string.base': 'Password must be a string',
      'any.required': 'Password is required',
    }),
});

export const resendEmailVerificationTokenSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
});

export const verifyUserEmailSchema = Joi.object().keys({
  token: Joi.string().required().messages({
    'string.base': 'Token must be a string',
    'any.required': 'Token is required',
  }),
});

export const userForgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
});
