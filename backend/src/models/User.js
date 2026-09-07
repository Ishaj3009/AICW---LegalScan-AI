// // const mongoose = require('mongoose');
// // const bcrypt = require('bcrypt');

// // const userSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   role: { type: String, enum: ['OFFICER', 'SUPERVISOR', 'ADMIN'], default: 'OFFICER' },
// //   employeeId: { type: String, required: true, unique: true },
// //   department: { type: String, required: true }
// // }, { timestamps: true });

// // userSchema.pre('save', async function (next) {
// //   if (!this.isModified('password')) return next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // userSchema.methods.matchPassword = async function (enteredPassword) {
// //   return await bcrypt.compare(enteredPassword, this.password);
// // };

// // // Exclude password hash from object representation
// // userSchema.methods.toJSON = function() {
// //   const obj = this.toObject();
// //   delete obj.password;
// //   return obj;
// // };

// // module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 6
//     },

//     role: {
//       type: String,
//       enum: ['OFFICER', 'SUPERVISOR', 'ADMIN'],
//       default: 'OFFICER'
//     },

//     employeeId: {
//       type: String,
//       required: true,
//       unique: true
//     },

//     department: {
//       type: String,
//       required: true
//     }
//   },
//   {
//     timestamps: true
//   }
// );


// // ============================================================
// // HASH PASSWORD BEFORE SAVING
// // ============================================================

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true
//     },

//     password: {
//       type: String,
//       required: true
//     },

//     role: {
//       type: String,
//       enum: ['OFFICER', 'SUPERVISOR', 'ADMIN'],
//       default: 'OFFICER'
//     },

//     employeeId: {
//       type: String,
//       required: true,
//       unique: true
//     },

//     department: {
//       type: String,
//       required: true
//     }
//   },
//   {
//     timestamps: true
//   }
// );


// // 🔐 Hash password before saving
// userSchema.pre('save', async function () {

//   // Don't hash password if it hasn't changed
//   if (!this.isModified('password')) {
//     return;
//   }

//   try {
//     console.log('🔐 Hashing password...');

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);

//     console.log('✅ Password hashed successfully');

//   } catch (error) {
//     console.error('❌ Password hashing error:', error);
//     throw error;
//   }
// });


// // 🔑 Compare entered password with hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };


// // 🚫 Never return password in API response
// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };


// module.exports = mongoose.model('User', userSchema);


// // ============================================================
// // COMPARE PASSWORD
// // ============================================================

// // 🔑 Compare entered password with hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };


// // 🚫 Never return password in API response
// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };


// // ============================================================
// // HIDE PASSWORD FROM JSON
// // ============================================================

// // userSchema.methods.toJSON = function () {
// //   const obj = this.toObject();

// //   delete obj.password;

// //   return obj;
// // };


// module.exports = mongoose.model(
//   'User',
//   userSchema
// );

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: true,
      trim: true
    },

    // Login email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // Hashed password
    password: {
      type: String,
      required: true
    },

    // User role
    role: {
      type: String,
      enum: ['OFFICER', 'SUPERVISOR', 'ADMIN'],
      default: 'OFFICER'
    },

    // Employee ID
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    // Department
    department: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);


// ======================================================
// PASSWORD HASHING
// ======================================================

userSchema.pre('save', async function () {

  // If password has not changed, don't hash again
  if (!this.isModified('password')) {
    return;
  }

  console.log('🔐 Hashing password...');

  try {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(
      this.password,
      salt
    );

    console.log('✅ Password hashed successfully');

  } catch (error) {
    console.error('❌ Password hashing error:', error);
    throw error;
  }
});


// ======================================================
// PASSWORD COMPARISON
// ======================================================

userSchema.methods.matchPassword = async function (enteredPassword) {

  return await bcrypt.compare(
    enteredPassword,
    this.password
  );

};


// ======================================================
// REMOVE PASSWORD FROM JSON RESPONSE
// ======================================================

userSchema.methods.toJSON = function () {

  const obj = this.toObject();

  delete obj.password;

  return obj;

};


// ======================================================
// EXPORT MODEL
// ======================================================

module.exports = mongoose.model('User', userSchema);