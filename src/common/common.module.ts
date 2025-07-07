import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from './services'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env', '.env.local']
    })
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class CommonModule {}
