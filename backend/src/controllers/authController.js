// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
//     expiresIn: '30d',
//   });
// };

// exports.registerUser = async (req, res, next) => {
//   try {
//     const { name, email, password, role, employeeId, department } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       res.status(400);
//       throw new Error('User already exists');
//     }

//     const user = await User.create({
//       name, email, password, role, employeeId, department
//     });

//     if (user) {
//       res.status(201).json({
//         success: true,
//         message: 'User registered successfully',
//         data: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           token: generateToken(user._id)
//         }
//       });
//     } else {
//       res.status(400);
//       throw new Error('Invalid user data');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// exports.loginUser = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         success: true,
//         message: 'Login successful',
//         data: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           token: generateToken(user._id)
//         }
//       });
//     } else {
//       res.status(401);
//       throw new Error('Invalid email or password');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getMe = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       res.json({
//         success: true,
//         message: 'User profile retrieved',
//         data: user
//       });
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     next(error);
//   }
// };


const User = require('../models/User');
const jwt = require('jsonwebtoken');


// ============================================================
// GENERATE JWT TOKEN
// ============================================================

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'fallback_secret',
    {
      expiresIn: '30d'
    }
  );
};


// ============================================================
// REGISTER USER
// ============================================================

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public

exports.registerUser = async (req, res, next) => {
  try {
    console.log('📝 Register request received');

    const {
      name,
      email,
      password,
      role,
      employeeId,
      department
    } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

    // Check existing user
    const userExists = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || 'OFFICER',
      employeeId,
      department
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user data'
      });
    }

    const token = generateToken(user._id);

    console.log('✅ User registered:', user.email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId,
        department: user.department,
        token
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    next(error);
  }
};


// ============================================================
// LOGIN USER
// ============================================================

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

exports.loginUser = async (req, res, next) => {
  try {
    console.log('🔐 Login request received');

    const {
      email,
      password
    } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    console.log('🔍 Looking for user:', cleanEmail);

    // Find user
    const user = await User.findOne({
      email: cleanEmail
    });

    if (!user) {
      console.log('❌ User not found:', cleanEmail);

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const passwordMatches = await user.matchPassword(password);

    if (!passwordMatches) {
      console.log('❌ Incorrect password for:', cleanEmail);

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    console.log('✅ Login successful:', user.email);
    console.log('✅ JWT token generated');

    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId,
        department: user.department,
        token
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    next(error);
  }
};


// ============================================================
// GET CURRENT USER
// ============================================================

// @desc    Get logged in user
// @route   GET /api/auth/me
// @access  Private

exports.getMe = async (req, res, next) => {
  try {
    console.log('👤 Getting current user');

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const user = await User.findById(req.user._id)
      .select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User profile retrieved',
      data: user
    });

  } catch (error) {
    console.error('❌ Get current user error:', error);
    next(error);
  }
};