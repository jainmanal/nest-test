import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from "./app.gatway";
import { User } from './User/user.entity';
import { UserModule } from './User/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "postgres.cufjjjezfhb3.ap-south-1.rds.amazonaws.com",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      entities: [User]
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppGateway ,AppService],
}) 
export class AppModule {}


