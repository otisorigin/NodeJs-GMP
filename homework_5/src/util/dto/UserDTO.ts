class UserDTO {
    constructor(
      public id: number,
      public login: string,
      public password: string,
      public age: number
    ) {}
}

export default UserDTO;
