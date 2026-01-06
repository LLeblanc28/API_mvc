class User {
    static users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
    ];

    static nextId = 3;

    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static getAll() {
        return this.users;
    }

    static getById(id) {
        return this.users.find(user => user.id === id);
    }

    static create(data) {
        const newUser = {
            id: this.nextId++,
            name: data.name,
            email: data.email
        };
        this.users.push(newUser);
        return newUser;
    }

    static update(id, data) {
        const user = this.users.find(user => user.id === id);
        if (user) {
            if (data.name) user.name = data.name;
            if (data.email) user.email = data.email;
        }
        return user;
    }

    static delete(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = User;
