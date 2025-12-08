import Joi from 'joi';
import { GENDER, ROLES } from '../../../constants/key.constants';
import responseMessages from '../../../constants/responseMessages';
import regexConstants from '../../../constants/regex.constants';

export const signupSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
  }),
  gender: Joi.string()
    .valid(...Object.values(GENDER))
    .required()
    .messages({
      'string.base': 'Gender must be a string',
      'any.only': 'Gender must be one of the allowed values. (male, female)',
      'any.required': 'Gender is required',
    }),
  dob: Joi.string().pattern(regexConstants.dateRegex).required().messages({
    'string.pattern.base': 'DOB must be in YYYY-MM-DD format',
    'any.required': 'Date of birth is required',
  }),
  address: Joi.string().optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  profileImage: Joi.any().optional(),
  phone: Joi.number().required().messages({
    'number.base': 'Phone must be a number',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().pattern(regexConstants.passwordRegex).required().messages({
    'string.pattern.base': responseMessages.PASSWORD_NOT_MATCH,
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': responseMessages.CONFIRM_PASSWORD_NOT_SAME,
    'any.required': 'Confirm password is required',
  }),
  role: Joi.string()
    .valid(...Object.values(ROLES))
    .required()
    .messages({
      'string.base': 'Role must be a string',
      'any.only': 'Role must be one of the allowed values. (user, admin)',
      'any.required': 'Role is required',
    }),
});

export const signinSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().pattern(regexConstants.passwordRegex).required().messages({
    'string.pattern.base': responseMessages.PASSWORD_NOT_MATCH,
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
});
