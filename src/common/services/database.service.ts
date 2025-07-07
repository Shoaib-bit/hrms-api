import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { PrismaClient } from '../../../generated/prisma'
import { ConfigService } from './config.service'

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(DatabaseService.name)

  constructor(private readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.getRequired<string>('DATABASE_URL')
        }
      },
      log: configService.isDevelopment()
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
      errorFormat: 'pretty'
    })

    this.setupLogging()
  }

  async onModuleInit() {
    try {
      this.logger.log('Attempting to connect to database...')
      await this.$connect()
      this.logger.log('Successfully connected to database')

      // Test the connection with a simple query
      await this.testConnection()
      this.logger.log('Database connection test passed')
    } catch (error) {
      this.logger.error('Failed to connect to database', error)
      throw error
    }
  }

  async onModuleDestroy() {
    try {
      this.logger.log('Disconnecting from database...')
      await this.$disconnect()
      this.logger.log('Successfully disconnected from database')
    } catch (error) {
      this.logger.error('Error during database disconnection', error)
    }
  }

  private setupLogging() {
    // Logging is now handled by Prisma's built-in logging
    // Based on the log configuration in the constructor
  }

  private async testConnection() {
    try {
      // Simple query to test connection
      await this.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      this.logger.error('Database connection test failed', error)
      throw new Error('Database connection test failed')
    }
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      this.logger.error('Database connection check failed', error)
      return false
    }
  }

  async getConnectionInfo(): Promise<{
    database: string
    host: string
    port: number
    user: string
    ssl: boolean
  }> {
    try {
      const result = await this.$queryRaw<
        Array<{
          current_database: string
          inet_server_addr: string
          inet_server_port: number
          current_user: string
          ssl_is_used: boolean
        }>
      >`
        SELECT 
          current_database(),
          inet_server_addr(),
          inet_server_port(),
          current_user(),
          CASE WHEN ssl_is_used() THEN true ELSE false END as ssl_is_used
      `

      const info = result[0]
      return {
        database: info.current_database,
        host: info.inet_server_addr,
        port: info.inet_server_port,
        user: info.current_user,
        ssl: info.ssl_is_used
      }
    } catch (error) {
      this.logger.error('Failed to get connection info', error)
      throw new Error('Failed to get database connection info')
    }
  }
}
