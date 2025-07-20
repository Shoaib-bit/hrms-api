import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Patch,
  Post
} from '@nestjs/common'
import { CreateUserDto } from './dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto)
      return {
        message: 'User created successfully',
        data: user
      }
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message)
      }
      throw new InternalServerErrorException('An unexpected error occurred')
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
