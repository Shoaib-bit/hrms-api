import { Module } from '@nestjs/common'
import { AuthenticationModule } from './authentication'
import { CommonModule } from './common'
import { UserModule } from './user/user.module'

@Module({
  imports: [CommonModule, AuthenticationModule, UserModule],
  controllers: [],
  providers: []
})
export class AppModule {}
