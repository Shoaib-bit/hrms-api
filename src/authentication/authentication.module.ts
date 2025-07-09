import { Module } from '@nestjs/common'
import { AuthController } from './auth'
import { AuthenticationService } from './authentication.service'
import { PermissionController } from './permission'
import { RoleController } from './role'

@Module({
  controllers: [RoleController, PermissionController, AuthController],
  providers: [AuthenticationService],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
