import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/common'

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  getUserById(id: number) {
    //
  }
}
