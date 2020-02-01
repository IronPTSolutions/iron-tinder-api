const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const GENDER = ['male','female','both']

const userSchema = new mongoose.Schema (
    {
        name: {type: String, required: true},
        email: {
            type: String,
            required: true,
            match: [EMAIL_PATTERN, 'Email is invalid']
        },
        age: {type: Number, required: true, min: 18 },  //  >= 18
        location: {
            type: {
              type: String,
              enum: ['Point'],
              required: true,
              default: 'Point'
            },
            coordinates: {
              type: [Number],
              required: true
            }
        },
        gender: {type: boolean, required: true}, // true - mujer 
        interest: {type: String, enum: GENDER, required: true }, 
        ageRange: {
                    minAge: {type: Number},
                    maxAge: {type: Number}
                },
        image: {type: String, default: '/img/undefined.png' }, //(url cloudinary)
        password: {type: String, required: true}, //bcrypt
        description: {type: String, default: ''}
    }
)

userSchema.pre('save', function (next) {
    const user = this;
  
    if (user.isModified('password')) {
      bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          return bcrypt.hash(user.password, salt)
            .then(hash => {
              user.password = hash;
              next();
            });
        })
        .catch(error => next(error));
    } else {
      next();
    }
  });

  userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  }

const User = new mongoose.model('User', userSchema)

module.exports = User