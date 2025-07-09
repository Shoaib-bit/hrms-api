class PermissionDto {
  id: number
  name: string
  status: 'active' | 'inactive'
  createdAt?: Date
  updatedAt?: Date

  constructor(partial: Partial<PermissionDto>) {
    Object.assign(this, partial)
  }
}
