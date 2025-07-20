import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
