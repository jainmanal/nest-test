import { Controller, Post, Body, Get, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from '../Auth/local-auth.gaurd';
import { AuthService } from '../Auth/auth.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.gaurd';

@Controller('user')
export class UserController {
  constructor(
    public readonly userService: UserService,
    private authService: AuthService
  ) {}

  @Get("list")
  findUserData(){
    return  this.userService.getUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get("detail")
  async get(@Req() req){
    const { id } = req.body;
    return await this.userService.getUserDetailById(id) ?? { message: "User does not exist!"}
  }
  
  @Post("signup")
  async addUserData(@Body() body){
    const user = await this.userService.findUserByEmail(body.email)
    if(user?.username === body.username){
        return {
            "error" : "username already exist!"
        }
    }else if(user?.email === body.email){
        return {
            "error" : "email already registered with different username!"
        }
    }else{
        const hashedPassword = await bcrypt.hash(body.password, 12);
        body.password = hashedPassword;
        const message = await this.userService.addUser(body);
        return message;
    }
  }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put("update")
  async update(@Body() body){
    const { id } = body;
      if(body.password){
          const hashedPassword = await bcrypt.hash(body.password, 12);
          body.password = hashedPassword;
      }
      delete body.id;
      const res = await this.userService.update(body, id)
      return res.affected ? { message: "Account Updated!" } : { message: "No record found!" }
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete("delete")
  async delete(@Req() req){
    const { id } = req.body;
    const res = await this.userService.delete(id)
    return res.affected ? { message: "Account deleted!" } : { message: "No record found!" }
  }

}
