const mongodb = require('mongodb');
const { default: mongoose } = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (v) => v % 2 === 0,
      message: 'Age must be an even number',
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  hobbies: [String],
  address: addressSchema,
});

userSchema.methods.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
};

userSchema.virtual('namedEmail').get(function () {
  return `${this.name} <${this.email}>`;
});

userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

userSchema.post('save', function (doc, next) {
  console.log(`${doc.name} has been saved`);
  next();
});

module.exports = mongoose.model('User', userSchema);
