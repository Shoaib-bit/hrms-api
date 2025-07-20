import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/common'
import { CreateUserDto } from './dto'

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async createUser(user: CreateUserDto) {
    try {
      const userExists = await this.databaseService.user.findFirst({
        where: {
          email: user.email
        }
      })

      if (userExists) {
        throw new Error('User with this email already exists')
      }

      const roleExists = await this.databaseService.roles.findFirst({
        where: {
          id: user.roleId
        }
      })

      if (!roleExists) {
        throw new Error('Role does not exist')
      }
      const newUser = await this.databaseService.user.create({
        data: user
      })
      return newUser
    } catch (error) {
      throw new Error('Failed to create user')
    }
  }
}
