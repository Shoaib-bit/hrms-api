import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ConfigService, DatabaseService } from './common'

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  try {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const databaseService = app.get(DatabaseService)

    // Set global API prefix
    app.setGlobalPrefix('api')

    // Set global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    )

    const config = new DocumentBuilder()
      .setTitle('HRMS API')
      .setDescription('API for managing Human Resource Management System')
      .setVersion('1.0')
      .build()

    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, documentFactory)

    const port = configService.getPort()
    await app.listen(port)

    logger.log(`Application is running on: http://localhost:${port}`)
    logger.log(`Swagger documentation: http://localhost:${port}/docs`)
  } catch (error) {
    logger.error('Failed to start application', error)
    process.exit(1)
  }
}

bootstrap().catch(error => {
  const logger = new Logger('Bootstrap')
  logger.error('Unhandled error during bootstrap', error)
  process.exit(1)
})
