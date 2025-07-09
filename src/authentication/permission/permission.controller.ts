import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'

@Controller('permission')
export class PermissionController {
  @Post()
  createPermission() {
    return 'This action creates a new permission'
  }

  @Get()
  getPermissions() {
    return 'This action returns all permissions'
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
