import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../common/services/database.service'

@Injectable()
export class AuthenticationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createPermission(name: string) {
    try {
      const permission = await this.databaseService.permissions.create({
        data: {
          name
        }
      })
      return permission
    } catch (error) {
      throw new Error(`Failed to create permission: ${error.message}`)
    }
  }

  async getPermissions() {
    try {
      const permissions = await this.databaseService.permissions.findMany({
        where: {
          status: 'active'
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return permissions
    } catch (error) {
      throw new Error(`Failed to get permissions: ${error.message}`)
    }
  }
}
