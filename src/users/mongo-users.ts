import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserModel } from './schemas/user.schema';
import { UsersRepository } from './usersRepository';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }
}
