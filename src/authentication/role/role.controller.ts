import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'

@Controller('role')
export class RoleController {
  @Post()
  createRole() {
    return 'This action creates a new role'
  }

  @Get()
  getRoles() {
    return 'This action returns all roles'
  }

  @Get(':id')
  getRole() {
    return 'This action returns a specific role'
  }

  @Patch(':id')
  updateRole() {
    return 'This action updates a role'
  }

  @Delete(':id')
  deleteRole() {
    return 'This action deletes a role'
  }
}
