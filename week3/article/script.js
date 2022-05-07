let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)

let user2 = {
  name: "Davi",
  age: 30,

  sayHi2() {
    // "this" is the "current object"
    alert(this.name);
  }

};

user2.sayHi2(); // John