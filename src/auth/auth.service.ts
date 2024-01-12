import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential-dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userReository: Repository<User>,
        
    ) {}

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username,password} = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const user = this.userReository.create({username: username,password: await this.hashPassword(password,salt),salt: salt})

        try {
        await user.save()
            
        } catch (error) {
            // console.log(error.code);
            if(error.code === '23505') {// duplicate user name
                 throw new ConflictException('username already exist');
            }else {
                throw new InternalServerErrorException()
            }
        }
    }


    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {username,password} = authCredentialsDto;
        const user = await this.userReository.findOne({
            where : {
                username
            }
        })

        if(user && await user.validatePassword(password)) {
            return user.username;
        }else {
            return null;
        }
    }


    private async hashPassword(password: string, salt: string): Promise<string> {
       const hashPassword = await bcrypt.hash(password,salt);
        return hashPassword
    }
}
