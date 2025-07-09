import { Module } from '@nestjs/common'
import { CommonModule } from '../common/common.module'
import { AuthController } from './auth/auth.controller'
import { AuthenticationService } from './authentication.service'
import { PermissionController } from './permission/permission.controller'
import { RoleController } from './role/role.controller'

@Module({
  imports: [CommonModule],
  controllers: [RoleController, PermissionController, AuthController],
  providers: [AuthenticationService],
  exports: []
})
export class AuthenticationModule {}
