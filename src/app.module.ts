import { Module } from '@nestjs/common'
import { CommonModule } from './common'

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: []
})
export class AppModule {}
