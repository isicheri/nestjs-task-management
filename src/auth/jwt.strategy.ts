import {PassportStrategy} from '@nestjs/passport'
import {Strategy,ExtractJwt} from 'passport-jwt'
import { JwtPayload } from './jwt-payload-interface'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entity/user.entity'
import { Repository } from 'typeorm'
import { UnauthorizedException } from '@nestjs/common'
import * as config from 'config'
const jwtConfig: {secret: any} = config.get('jwt');

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
      const {username} = payload;
      const user = await this.userRepository.findOne({
        where : {
            username
        }
      })
      if(!user) {
      throw new UnauthorizedException()
      }
      return user;
    }

}