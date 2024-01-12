import { Body, Controller, Post, UnauthorizedException, UseGuards, ValidationPipe,Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload-interface';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
// import { GetUser } from './get-user.decorator';
// import { User } from './entity/user.entity';

@Controller('auth')
export class AuthController {

constructor(
    private authService:AuthService,
    private jwtService: JwtService
) {}


@Post('/signup')
signUp(
    @Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto,
) : Promise<void>{
    return this.authService.signup(authCredentialsDto)
}

@Post('/signin') 
async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
) {
  const username = await this.authService.validateUserPassword(authCredentialsDto)
  if(!username) {
  throw new UnauthorizedException('Invalid credentials')
  }
  
  const payload: JwtPayload = { username }

  const accessToken =  this.jwtService.sign(payload);
 
  return {accessToken};
}


// @Post('/test')
// @UseGuards(AuthGuard())
// test(@Req() req) {
//     console.log(req.user);
    
// }

}