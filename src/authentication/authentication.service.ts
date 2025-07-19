import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../common/services/database.service'

@Injectable()
export class AuthenticationService {
  constructor(private readonly databaseService: DatabaseService) {}

  //permission
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

  async getPermissions(query?: string) {
    try {
      const permissions = await this.databaseService.permissions.findMany({
        where: {
          ...(query && {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          })
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

  async deletePermission(id: number) {
    try {
      const permission = await this.databaseService.permissions.delete({
        where: { id }
      })
      return permission
    } catch (error) {
      throw new Error(`Failed to delete permission: ${error.message}`)
    }
  }

  async getPermission(id: number) {
    try {
      const permission = await this.databaseService.permissions.findUnique({
        where: { id }
      })
      if (!permission) {
        throw new Error(`Permission with ID ${id} not found`)
      }
      return permission
    } catch (error) {
      throw new Error(`Failed to get permission: ${error.message}`)
    }
  }

  async checkPermissionExists(permissionIds: number[]) {
    try {
      const permissions = await this.databaseService.permissions.findMany({
        where: {
          id: {
            in: permissionIds
          }
        }
      })

      const foundIds = permissions.map(p => p.id)
      const missingIds = permissionIds.filter(id => !foundIds.includes(id))

      if (missingIds.length > 0) {
        throw new Error(
          `Permission ID(s) ${missingIds.join(', ')} do not exist`
        )
      }

      return true
    } catch (error) {
      if (error.message.includes('do not exist')) {
        throw error
      }
      throw new Error(`Failed to check permissions: ${error.message}`)
    }
  }

  //roles
  async createRole(name: string) {
    try {
      // Check if permission already exists
      const existingPermission = await this.databaseService.roles.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive'
          }
        }
      })

      if (existingPermission) {
        throw new Error(`Role with name "${name}" already exists`)
      }

      const permission = await this.databaseService.roles.create({
        data: {
          name: name.trim()
        }
      })
      return permission
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw error
      }
      throw new Error(`Failed to create role: ${error.message}`)
    }
  }

  async insertRolePermissions(roleId: number, permissionIds: number[]) {
    try {
      const rolePermissions = permissionIds.map(permissionId => ({
        roleId,
        permissionId
      }))

      await this.databaseService.rolePermissions.createMany({
        data: rolePermissions,
        skipDuplicates: true
      })

      const permissions = await this.databaseService.permissions.findMany({
        where: {
          id: {
            in: permissionIds
          }
        }
      })
      return permissions
    } catch (error) {
      throw new Error(`Failed to insert role permissions: ${error.message}`)
    }
  }

  async updateRole(roleId: number, role: string, permissionsIds: number[]) {
    try {
      const existingRole = await this.databaseService.roles.findUnique({
        where: { id: roleId }
      })

      if (!existingRole) {
        throw new Error(`Role with ID ${roleId} not found`)
      }

      const updatedRole = await this.databaseService.roles.update({
        where: { id: roleId },
        data: {
          name: role.trim()
        }
      })

      // Update role permissions
      await this.databaseService.rolePermissions.deleteMany({
        where: { roleId }
      })

      const permissions = await this.insertRolePermissions(
        roleId,
        permissionsIds
      )

      const data = {
        ...updatedRole,
        permissions: permissions
      }
      return data
    } catch (error) {
      throw new Error(`Failed to update role: ${error.message}`)
    }
  }

  async getRoles(search?: string, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit
      const take = limit

      const roles = await this.databaseService.roles.findMany({
        where: {
          ...(search && {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          })
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc'
        }
      })

      const totalCount = await this.databaseService.roles.count({
        where: {
          ...(search && {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          })
        }
      })

      return {
        data: roles,
        pagination: {
          totalCount,
          page,
          limit
        }
      }
    } catch (error) {
      throw new Error(`Failed to get roles: ${error.message}`)
    }
  }

  async getRole(id: number) {
    try {
      const role = await this.databaseService.roles.findUnique({
        where: { id }
      })

      if (!role) {
        throw new Error(`Role with ID ${id} not found`)
      }

      const permissions = await this.databaseService.rolePermissions.findMany({
        where: { roleId: id },
        select: {
          permission: {
            select: {
              id: true,
              name: true,
              status: true,
              createdAt: true,
              updatedAt: true
            }
          }
        }
      })

      return {
        ...role,
        permissions: permissions.map(rp => rp.permission)
      }
    } catch (error) {
      if (error.message.includes('not found')) {
        throw error
      }
      throw new Error(`Failed to get role: ${error.message}`)
    }
  }

  async deleteRole(id: number) {
    try {
      const existingRole = await this.databaseService.roles.findUnique({
        where: { id }
      })

      if (!existingRole) {
        throw new Error(`Role with ID ${id} not found`)
      }

      // Delete role permissions first
      await this.databaseService.rolePermissions.deleteMany({
        where: { roleId: id }
      })

      // Delete the role
      const deletedRole = await this.databaseService.roles.delete({
        where: { id }
      })

      return deletedRole
    } catch (error) {
      if (error.message.includes('not found')) {
        throw error
      }
      throw new Error(`Failed to delete role: ${error.message}`)
    }
  }
}
