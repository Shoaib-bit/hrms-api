import { Module } from '@nestjs/common'
import { AuthenticationModule } from './authentication'
import { CommonModule } from './common'

@Module({
  imports: [CommonModule, AuthenticationModule],
  controllers: [],
  providers: []
})
export class AppModule {}
