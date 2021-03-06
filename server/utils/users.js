
class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        // var users = this.users.filter((user) => {
        //     return user.id != id;
        // });
        // this.users = users;
        // return users;
        var user = this.getUser(id);

        if(user) {
            this.users = this.users.filter((user) => {
                user.id !== id;
            });
        }
        return user;
    }
    getUser (id) {
        var users = this.users.filter((user) => {
            return user.id === id;
        });

        return users[0];
    }
    getUserList (room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });

        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

module.exports = {Users};

// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} years old`;
//     }
// }

// var me = new Person('Siddharth', 20);
// var description = me.getUserDescription();
// console.log(description);
