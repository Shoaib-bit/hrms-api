import { Controller, Get, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    return 'This action logs in a user'
  }

  @Get('sign-up')
  signUp() {
    return 'This action signs up a user'
  }
}
