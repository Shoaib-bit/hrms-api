import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
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
      if (error.message) {
        throw new BadRequestException(error.message)
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
      if (error.message) {
        throw new BadRequestException(error.message)
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: number) {
    try {
      const deletedPermission =
        await this.authenticationService.deletePermission(id)
      return {
        message: 'Permission deleted successfully',
        data: null
      }
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message)
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  @Get(':id')
  async getPermission(@Param('id') id: number) {
    try {
      const permission = await this.authenticationService.getPermission(id)
      return {
        message: 'Permission retrieved successfully',
        data: permission
      }
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message)
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }
}
