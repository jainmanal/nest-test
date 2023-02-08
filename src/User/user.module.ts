import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { AuthService } from "../Auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "../Auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        AuthModule
    ],
    providers: [
        UserService,
        AuthService,
        JwtService
    ],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule{}