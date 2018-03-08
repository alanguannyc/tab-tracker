const Promise = require('bluebird')
// const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const bcrypt = require('bcrypt')
function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

//   return bcrypt
//     .genSaltAsync(SALT_FACTOR)
//     .then(salt => bcrypt.hashAsync(user.password, salt, null))
//     .then(hash => {
//       user.setDataValue('password', hash)
//     })

    return bcrypt.hash(user.password, 8).then(function(hash) {
        user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => { 
   const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: { type: DataTypes.STRING }
    },  
    { hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    }
)
    User.prototype.comparePassword = function (password) {
        return bcrypt.compare(password, this.password)
    }

    return User
}
