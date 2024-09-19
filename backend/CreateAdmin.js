const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const adminEmail = 'umeshkumarrai7763@gmail.com'; // Set admin email here
    const adminPassword = 'Golu@1234'; // Set admin password here

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = new User({
      username: 'admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin' // Ensure the admin role is set here
    });

    await admin.save();
    console.log('Admin user created');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));