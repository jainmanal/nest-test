import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser():Promise<User[]>{
    const userData = await this.userRepository.find();
    console.log(userData)
    const usersList = []
    await userData.map((user)=>{
      usersList.push(user.username)
    })
    return usersList;
  }

  async addUser(user : User):Promise<User>{
    const result = await this.userRepository.save(user);
    return result;
  }

  async findOneUser(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where : { username: username }});
    return user;
  }
  
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where : { email: email }});
    return user;
  }

  async update(user: User, id){
    const result = await this.userRepository.update(id,user)
    return result;
  }

  async delete(id):Promise<DeleteResult>{
    const result = await this.userRepository.delete(id);
    return result;
  }
}
