import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../common/services/database.service'

@Injectable()
export class AuthenticationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createPermission(name: string) {
    try {
      // Check if permission already exists
      const existingPermission =
        await this.databaseService.permissions.findFirst({
          where: {
            name: {
              equals: name,
              mode: 'insensitive'
            }
          }
        })

      if (existingPermission) {
        throw new Error(`Permission with name "${name}" already exists`)
      }

      const permission = await this.databaseService.permissions.create({
        data: {
          name: name.trim()
        }
      })
      return permission
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw error
      }
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
