import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class CreatePermissionDto {
  @ApiProperty({
    description: 'The name of the permission',
    example: 'manage-users',
    minLength: 2,
    maxLength: 50,
    pattern: '^[a-zA-Z0-9\\-_\\s]+$'
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50, {
    message: 'Permission name must be between 2 and 50 characters'
  })
  @Matches(/^[a-zA-Z0-9\-_\s]+$/, {
    message:
      'Permission name can only contain letters, numbers, hyphens, underscores, and spaces'
  })
  name: string
}
