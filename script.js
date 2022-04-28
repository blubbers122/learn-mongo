const mongoose = require('mongoose');
const User = require('./user');

mongoose.connect('mongodb://localhost/testdb');

const run = async () => {
  try {
    // const user = await new User({
    //   name: 'Kyle',
    //   age: 26,
    //   email: 'emAIl@mail.com',
    //   hobbies: ['Weight Lifting', 'Bowling'],
    //   address: {
    //     street: '123 Main St',
    //   },
    // }).save();
    // user.name = 'Sally';

    // user.save();

    // console.log(user);

    // const user = await User.find({ name: 'Kyle' });
    const user = await User.where('name')
      .equals('Kyle')
      .populate('bestFriend')
      .findOne();
    // user.bestFriend = '6269e4d5459378f877d48ba0';
    // user.email = 'abc@email.com';
    // user.age = 12;
    // await user.save();
    // const user2 = await User.where('age').gt('12').limit(2);

    user.sayHi();
		// user.findByName('kyle');
		console.log(user.namedEmail);
    console.log(user);
    // console.log(user2);
  } catch (e) {
    console.log(e);
  }
};
run();
