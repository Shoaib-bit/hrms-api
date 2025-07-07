import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get<T = string>(key: string, defaultValue?: T): T | undefined {
    return this.configService.get<T>(key) ?? defaultValue
  }

  getRequired<T = string>(key: string): T {
    const value = this.configService.get<T>(key)
    if (value === undefined || value === null) {
      throw new Error(`Configuration key "${key}" is required but not found`)
    }
    return value
  }

  getString(key: string, defaultValue: string = ''): string {
    return this.configService.get<string>(key, defaultValue)
  }

  getNumber(key: string, defaultValue: number = 0): number {
    const value = this.configService.get<string>(key)
    if (value === undefined) {
      return defaultValue
    }
    const parsed = parseInt(value, 10)
    if (isNaN(parsed)) {
      throw new Error(`Configuration key "${key}" is not a valid number`)
    }
    return parsed
  }

  getBoolean(key: string, defaultValue: boolean = false): boolean {
    const value = this.configService.get<string>(key)
    if (value === undefined) {
      return defaultValue
    }
    return value.toLowerCase() === 'true'
  }

  getPort(): number {
    const port = this.getNumber('PORT', 3000)
    if (port < 1 || port > 65535) {
      throw new Error(`Invalid port number: ${port}`)
    }
    return port
  }

  getNodeEnv(): string {
    return this.getString('NODE_ENV', 'development')
  }

  isDevelopment(): boolean {
    return this.getNodeEnv() === 'development'
  }

  isProduction(): boolean {
    return this.getNodeEnv() === 'production'
  }

  isTest(): boolean {
    return this.getNodeEnv() === 'test'
  }

  getAll(): Record<string, any> {
    return process.env
  }

  has(key: string): boolean {
    return this.configService.get(key) !== undefined
  }
}
