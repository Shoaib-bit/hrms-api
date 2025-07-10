import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpExceptionFilter } from './filters'
import { TransformResponseInterceptor } from './interceptors'
import { ConfigService, DatabaseService } from './services'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env', '.env.local']
    })
  ],
  providers: [
    ConfigService,
    DatabaseService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    }
  ],
  exports: [ConfigService, DatabaseService]
})
export class CommonModule {}
