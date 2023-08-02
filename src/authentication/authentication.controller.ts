import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  me(@Req() request: RequestWithUser) {
    const user = request.user;
    // user.password = undefined;
    return user;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const user = request.user;
    const cookie = await this.authenticationService.getCookieWithJwtToken(
      user.id,
    );
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }
}
