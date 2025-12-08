import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'class-validator';
import TYPES from '../../constants/types.constants';
import { signupSchema } from '../../models/user/_validations/user.validations';
import { signupPayload } from '../../models/user/_validations/user.payload';
import { UserService } from '../../service/user/user.service';
import responseMessages from '../../constants/responseMessages';

@controller('/users')
export class UserController {
  private userService: UserService;
  constructor(@inject(TYPES.UserService) userService: UserService) {
    this.userService = userService;
  }

  @httpPost('/')
  public async signup(request: Request, response: Response): Promise<any> {
    try {
      const payload: signupPayload = await signupSchema.validateAsync(request.body);

      const user = this.userService.signup(payload);

      return response.status(StatusCodes.CREATED).json({
        status: 'success',
        message: responseMessages.SIGNUP_SUCCESS,
        data: user,
      });
    } catch (error: any) {
      // Handle duplicate value error
      if (error?.code === 11000) {
        const key = Object.keys(error.keyPattern)[0];

        return response.status(StatusCodes.CONFLICT).json({
          data: {},
          status: 'failed',
          message: `User with this ${key} already exists`,
        });
      }

      // Handle validation error
      if (error instanceof ValidationError) {
        return response.status(StatusCodes.BAD_REQUEST).json({
          data: {},
          status: 'failed',
          message: error['details'].map((detail: any) => detail.message).join(', '),
        });
      }

      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: {},
        status: 'failed',
        message: error?.message || 'Error occurs while creating user.',
      });
    }
  }
}
