import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigService, DatabaseService } from './services'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env', '.env.local']
    })
  ],
  providers: [ConfigService, DatabaseService],
  exports: [ConfigService, DatabaseService]
})
export class CommonModule {}
