import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { AuthenticationService } from '../authentication.service'
import { CreateRoleDto, GetRolesDto } from '../dto'

@Controller('role')
export class RoleController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    try {
      await this.authenticationService.checkPermissionExists(
        createRoleDto.permissions
      )

      const role = await this.authenticationService.createRole(
        createRoleDto.name
      )

      const permissions =
        await this.authenticationService.insertRolePermissions(
          role.id,
          createRoleDto.permissions
        )

      return {
        message: 'Role created successfully',
        data: {
          ...role,
          permissions
        }
      }
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message)
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  @Get()
  async getRoles(@Query() query: GetRolesDto) {
    try {
      const page = query?.page ?? 1
      const limit = query?.limit ?? 10
      const search = query?.query ?? undefined

      const roles = await this.authenticationService.getRoles(
        search,
        page,
        limit
      )

      return {
        message: 'Roles retrieved successfully',
        data: roles
      }
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message)
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  @Get(':id')
  async getRole(@Param('id') id: string) {
    try {
      const roleId = parseInt(id, 10)
      if (isNaN(roleId)) {
        throw new BadRequestException('Invalid role ID')
      }

      const role = await this.authenticationService.getRole(roleId)

      return {
        message: 'Role retrieved successfully',
        data: role
      }
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message)
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  @Patch(':id')
  async updateRole(
    @Param('id') id: number,
    @Body() updateRoleDto: CreateRoleDto
  ) {
    try {
      await this.authenticationService.checkPermissionExists(
        updateRoleDto.permissions
      )

      const data = await this.authenticationService.updateRole(
        id,
        updateRoleDto.name,
        updateRoleDto.permissions
      )

      return {
        message: 'Role updated successfully',
        data
      }
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message)
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    try {
      const roleId = parseInt(id, 10)
      if (isNaN(roleId)) {
        throw new BadRequestException('Invalid role ID')
      }

      const deletedRole = await this.authenticationService.deleteRole(roleId)

      return {
        message: 'Role deleted successfully',
        data: deletedRole
      }
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message)
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }
}
