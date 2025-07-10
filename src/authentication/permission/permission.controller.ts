import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { AuthenticationService } from './../authentication.service'

@Controller('permission')
export class PermissionController {
  constructor(private authenticationService: AuthenticationService) {}
  @Post()
  createPermission() {
    this.authenticationService.createPermission('new-permission')
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
