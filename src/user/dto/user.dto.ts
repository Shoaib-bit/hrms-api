import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100, {
    message: 'Name must be between 2 and 100 characters'
  })
  name: string

  @ApiProperty({
    description: 'User password',
    example: 'SecurePassword123!',
    minLength: 8,
    maxLength: 128
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 128, {
    message: 'Password must be between 8 and 128 characters'
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  })
  password: string

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@company.com'
  })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address'
    }
  )
  @IsNotEmpty()
  email: string

  @ApiPropertyOptional({
    description: 'Date of birth in YYYY-MM-DD format',
    example: '1990-01-15'
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of birth must be in YYYY-MM-DD format'
  })
  dateOfBirth?: string

  @ApiProperty({
    description: 'Role ID to assign to the user',
    example: 1,
    minimum: 1
  })
  @IsInt({
    message: 'Role ID must be an integer'
  })
  @Min(1, {
    message: 'Role ID must be greater than 0'
  })
  @Type(() => Number)
  roleId: number
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'The full name of the user',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @Length(2, 100, {
    message: 'Name must be between 2 and 100 characters'
  })
  name?: string

  @ApiPropertyOptional({
    description: 'User email address',
    example: 'john.doe@company.com'
  })
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address'
    }
  )
  email?: string

  @ApiPropertyOptional({
    description: 'Date of birth in YYYY-MM-DD format',
    example: '1990-01-15'
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of birth must be in YYYY-MM-DD format'
  })
  dateOfBirth?: string

  @ApiPropertyOptional({
    description: 'Role ID to assign to the user',
    example: 1,
    minimum: 1
  })
  @IsOptional()
  @IsInt({
    message: 'Role ID must be an integer'
  })
  @Min(1, {
    message: 'Role ID must be greater than 0'
  })
  @Type(() => Number)
  roleId?: number
}
