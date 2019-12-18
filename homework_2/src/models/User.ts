class User {
  constructor(
    public id: string,
    public login: string,
    public password: string,
    public age: number,
    public isDeleted: boolean = false
  ) {}
}

export default User;
