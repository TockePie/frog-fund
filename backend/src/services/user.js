export class UserService {
  constructor() {
    this.users = [{ name: 'RulerChen', description: 'Author of this project' }]
  }

  getUsers() {
    return this.users
  }
}
