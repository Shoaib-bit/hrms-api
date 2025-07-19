import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min
} from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the permission',
    example: 'HR',
    minLength: 2,
    maxLength: 50,
    pattern: '^[a-zA-Z0-9\\-_\\s]+$'
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 80, {
    message: 'Permission name must be between 2 and 50 characters'
  })
  @Matches(/^[a-zA-Z0-9\-_\s]+$/, {
    message:
      'Permission name can only contain letters, numbers, hyphens, underscores, and spaces'
  })
  name: string

  @ApiProperty({
    description: 'The permissions associated with the role',
    example: [1, 2, 3],
    type: [Number]
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, {
    message: 'At least one permission is required'
  })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(item => {
        const num = Number(item)
        if (isNaN(num) || !Number.isInteger(num)) {
          throw new Error(
            `Permission ID must be a valid integer, received: ${item}`
          )
        }
        return num
      })
    }
    return value
  })
  @IsInt({ each: true, message: 'Each permission ID must be an integer' })
  permissions: number[]
}

export class GetRolesDto {
  @ApiProperty({
    description: 'Search query to filter roles by name',
    example: 'admin',
    required: false
  })
  @IsOptional()
  @IsString()
  query?: string

  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be greater than 0' })
  page?: number

  @ApiProperty({
    description: 'Number of roles per page for pagination',
    example: 10,
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be greater than 0' })
  limit?: number
}
