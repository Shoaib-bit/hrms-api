import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common'
import { AuthController } from './auth'
import { AuthenticationService } from './authentication.service'
import { PermissionController } from './permission'
import { RoleController } from './role'

@Module({
  imports: [CommonModule],
  controllers: [RoleController, PermissionController, AuthController],
  providers: [AuthenticationService],
  exports: []
})
export class AuthenticationModule {}
