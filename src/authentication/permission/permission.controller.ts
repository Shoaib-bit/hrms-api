import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { CreatePermissionDto } from '../dto'
import { AuthenticationService } from './../authentication.service'

@Controller('permission')
export class PermissionController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post()
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    try {
      const permission = await this.authenticationService.createPermission(
        createPermissionDto.name
      )
      return {
        message: 'Permission created successfully',
        data: permission
      }
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw new ConflictException(error.message)
      }

      if (error.message.includes('Failed to create permission')) {
        throw new InternalServerErrorException(
          'Unable to create permission. Please try again.'
        )
      }

      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  @Get()
  @ApiQuery({ name: 'query', required: false, type: String })
  async getPermissions(@Query('query') query?: string) {
    try {
      const permissions = await this.authenticationService.getPermissions(query)
      return {
        message: 'Permissions retrieved successfully',
        data: permissions
      }
    } catch (error) {
      if (error.message.includes('Failed to create permission')) {
        throw new InternalServerErrorException(
          'Unable to create permission. Please try again.'
        )
      }

      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  @Delete(':id')
  deletePermission() {
    return 'This action deletes a permission'
  }

  @Patch(':id')
  updatePermission() {
    return 'This action updates a permission'
  }
}
