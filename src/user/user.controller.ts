import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async addUser() {
    // Logic to add a user
    return {
      message: 'User added successfully'
    }
  }

  @Get()
  async getUser() {
    // Logic to get a user
    return {
      message: 'User retrieved successfully'
    }
  }

  @Get(':id')
  async getUserById(id: number) {
    return {
      message: `User with ID ${id} retrieved successfully`
    }
  }

  @Patch(':id')
  async updateUser(id: number) {
    // Logic to update a user
    return {
      message: `User with ID ${id} updated successfully`
    }
  }

  @Delete(':id')
  async deleteUser(id: number) {
    // Logic to delete a user
    return {
      message: `User with ID ${id} deleted successfully`
    }
  }
}
