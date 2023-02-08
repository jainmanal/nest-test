import { Injectable } from '@nestjs/common';
import { UserService } from '../User/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOneUser(username);
        if (user &&  await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        const token = this.jwtService.sign(payload,{ secret : jwtConstants.secret, expiresIn: "1d"});
        return {
            "username" : user.username,
            "email": user.email,
            "jwt_token": token
        };
    }
}
