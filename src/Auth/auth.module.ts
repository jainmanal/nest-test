import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../User/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    forwardRef(()=>UserModule),
    PassportModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtService,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
