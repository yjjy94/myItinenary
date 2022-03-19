const db = require("../database/database");
const bcrypt = require("bcryptjs");
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async newSignUp() {
    const securePassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: securePassword,
    });
  }

  checkEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  checkPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword); // check raw password with hashed password
  }
}

module.exports = User;
