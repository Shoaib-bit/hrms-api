import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ConfigService } from './common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  // Set global API prefix
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('API for managing tasks')
    .setVersion('1.0')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, documentFactory)

  await app.listen(configService.getPort())
}
bootstrap()
