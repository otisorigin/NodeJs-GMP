class User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean = false;
    constructor(id: string, login: string, password: string, age: number) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.age = age;
    }
}

export default User;