// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const User = require('./src/models/User');
// const Product = require('./src/models/Product');
// const Inspection = require('./src/models/Inspection');
// const Violation = require('./src/models/Violation');

// dotenv.config();

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://ishajadhav3005_db_user:LegalScanAI1230@cluster0.f136nrs.mongodb.net/?appName=Cluster0');
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(`Error connecting to MongoDB: ${err.message}`);
//     process.exit(1);
//   }
// };

// const importData = async () => {
//   try {
//     await connectDB();

//     console.log('Clearing old data...');
//     await User.deleteMany();
//     await Product.deleteMany();
//     await Inspection.deleteMany();
//     await Violation.deleteMany();

//     console.log('Inserting seed data...');

//     // 1. Create User
//     const officer = await User.create({
//       name: 'John Doe',
//       email: 'officer@legalscan.gov',
//       password: 'password123',
//       role: 'OFFICER',
//       employeeId: 'EMP-1001',
//       department: 'Enforcement Division'
//     });

//     // 2. Create Products
//     const products = await Product.insertMany([
//       {
//         productName: 'Premium Wheat Flour 1kg',
//         category: 'Food',
//         brand: 'AgroPlus',
//         mrp: '₹55',
//         netQuantity: '1 kg',
//         manufacturer: 'AgroPlus Foods Pvt Ltd'
//       },
//       {
//         productName: 'Organic Honey 500g',
//         category: 'Food',
//         brand: 'NatureSweet',
//         mrp: '₹120',
//         netQuantity: '500 g',
//         manufacturer: 'Nature Farm Organics'
//       },
//       {
//         productName: 'Alkaline Water 1L',
//         category: 'Beverage',
//         brand: 'AquaLife',
//         mrp: '₹60',
//         netQuantity: '1 L',
//         manufacturer: 'AquaLife Beverages'
//       },
//       {
//         productName: 'Bath Soap 100g',
//         category: 'Cosmetics',
//         brand: 'GlowSkin',
//         mrp: '₹40',
//         netQuantity: '100 g',
//         manufacturer: 'Glow Care India'
//       },
//       {
//         productName: 'Basmati Rice 5kg',
//         category: 'Food',
//         brand: 'RoyalGrain',
//         mrp: '₹850',
//         netQuantity: '5 kg',
//         manufacturer: 'Royal Grains Ltd'
//       }
//     ]);

//     // 3. Create Inspections
//     const d1 = new Date(); d1.setDate(d1.getDate() - 5);
//     const d2 = new Date(); d2.setDate(d2.getDate() - 4);
//     const d3 = new Date(); d3.setDate(d3.getDate() - 2);
//     const d4 = new Date(); d4.setDate(d4.getDate() - 1);
    
//     const inspections = await Inspection.insertMany([
//       {
//         inspectionId: 'INS-A1B2',
//         officerId: officer._id,
//         productId: products[0]._id,
//         location: 'Mumbai Central Market',
//         status: 'COMPLETED',
//         complianceStatus: 'COMPLIANT',
//         inspectionDate: d1,
//         overallConfidence: 96.5,
//         officerRemarks: 'All declarations found in order.'
//       },
//       {
//         inspectionId: 'INS-C3D4',
//         officerId: officer._id,
//         productId: products[1]._id,
//         location: 'Delhi Supermart',
//         status: 'REQUIRES_REVIEW',
//         complianceStatus: 'POTENTIAL_VIOLATIONS',
//         inspectionDate: d2,
//         overallConfidence: 78.2
//       },
//       {
//         inspectionId: 'INS-E5F6',
//         officerId: officer._id,
//         productId: products[2]._id,
//         location: 'Bangalore Metro Store',
//         status: 'COMPLETED',
//         complianceStatus: 'NON_COMPLIANT',
//         inspectionDate: d3,
//         overallConfidence: 94.1,
//         officerRemarks: 'MRP deliberately obfuscated.'
//       },
//       {
//         inspectionId: 'INS-G7H8',
//         officerId: officer._id,
//         productId: products[3]._id,
//         location: 'Chennai Retail Hub',
//         status: 'COMPLETED',
//         complianceStatus: 'COMPLIANT',
//         inspectionDate: d4,
//         overallConfidence: 98.9
//       },
//       {
//         inspectionId: 'INS-I9J0',
//         officerId: officer._id,
//         productId: products[4]._id,
//         location: 'Pune Fresh Mart',
//         status: 'PROCESSING',
//         complianceStatus: 'UNKNOWN',
//         inspectionDate: new Date(),
//         overallConfidence: null
//       }
//     ]);

//     // 4. Create Violations
//     const v1 = await Violation.create({
//       ruleId: 'LM-PC-MRP-001',
//       inspectionId: inspections[1]._id,
//       field: 'mrp',
//       requirement: 'MRP declaration should be present',
//       detectedValue: 'None',
//       expectedValue: 'Valid MRP format',
//       severity: 'HIGH',
//       confidence: 82.5,
//       status: 'AI_DETECTED',
//       explanation: 'No valid MRP text detected on the front or back panels.'
//     });
    
//     const v2 = await Violation.create({
//       ruleId: 'LM-PC-NETQTY-002',
//       inspectionId: inspections[2]._id,
//       field: 'net_quantity',
//       requirement: 'Net quantity must use standard unit formats',
//       detectedValue: '1000',
//       expectedValue: '1 kg or 1000 g',
//       severity: 'MEDIUM',
//       confidence: 91.0,
//       status: 'CONFIRMED',
//       explanation: 'Unit missing from quantity declaration.',
//       officerRemark: 'Verified manually. Confirmed missing unit.'
//     });

//     // Update inspections with violations
//     inspections[1].violations.push(v1._id);
//     await inspections[1].save();

//     inspections[2].violations.push(v2._id);
//     await inspections[2].save();

//     console.log('Seed data imported successfully!');
//     process.exit();
//   } catch (error) {
//     console.error(`Error with seed data: ${error.message}`);
//     process.exit(1);
//   }
// };

// importData();


const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Inspection = require('./src/models/Inspection');
const Violation = require('./src/models/Violation');

dotenv.config();


// ============================================================
// DATABASE CONNECTION
// ============================================================

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        'MONGO_URI is not defined in your .env file'
      );
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

  } catch (error) {
    console.error(
      `❌ MongoDB connection error: ${error.message}`
    );

    process.exit(1);
  }
};


// ============================================================
// IMPORT SEED DATA
// ============================================================

const importData = async () => {
  try {

    await connectDB();

    console.log('');
    console.log('🧹 Clearing old data...');

    // Clear collections
    await Violation.deleteMany({});
    await Inspection.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log('✅ Old data cleared');

    console.log('');
    console.log('🌱 Inserting seed data...');


    // ========================================================
    // 1. CREATE OFFICER
    // ========================================================

    const officer = await User.create({
      name: 'John Doe',
      email: 'officer@legalscan.gov',
      password: 'password123',
      role: 'OFFICER',
      employeeId: 'EMP-1001',
      department: 'Enforcement Division'
    });

    console.log(
      `✅ Officer created: ${officer.email}`
    );


    // ========================================================
    // 2. CREATE PRODUCTS
    // ========================================================

    const products = await Product.insertMany([

      {
        productName: 'Premium Wheat Flour 1kg',
        category: 'Food',
        brand: 'AgroPlus',
        mrp: '₹55',
        netQuantity: '1 kg',
        manufacturer: 'AgroPlus Foods Pvt Ltd'
      },

      {
        productName: 'Organic Honey 500g',
        category: 'Food',
        brand: 'NatureSweet',
        mrp: '₹120',
        netQuantity: '500 g',
        manufacturer: 'Nature Farm Organics'
      },

      {
        productName: 'Alkaline Water 1L',
        category: 'Beverage',
        brand: 'AquaLife',
        mrp: '₹60',
        netQuantity: '1 L',
        manufacturer: 'AquaLife Beverages'
      },

      {
        productName: 'Bath Soap 100g',
        category: 'Cosmetics',
        brand: 'GlowSkin',
        mrp: '₹40',
        netQuantity: '100 g',
        manufacturer: 'Glow Care India'
      },

      {
        productName: 'Basmati Rice 5kg',
        category: 'Food',
        brand: 'RoyalGrain',
        mrp: '₹850',
        netQuantity: '5 kg',
        manufacturer: 'Royal Grains Ltd'
      }

    ]);

    console.log(
      `✅ ${products.length} products created`
    );


    // ========================================================
    // 3. CREATE INSPECTIONS
    // ========================================================

    const d1 = new Date();
    d1.setDate(d1.getDate() - 5);

    const d2 = new Date();
    d2.setDate(d2.getDate() - 4);

    const d3 = new Date();
    d3.setDate(d3.getDate() - 2);

    const d4 = new Date();
    d4.setDate(d4.getDate() - 1);


    const inspections = await Inspection.insertMany([

      // ------------------------------------------------------
      // INSPECTION 1 - COMPLIANT
      // ------------------------------------------------------

      {
        inspectionId: 'INS-A1B2',
        officerId: officer._id,
        productId: products[0]._id,

        location: 'Mumbai Central Market',

        status: 'COMPLETED',

        complianceStatus: 'COMPLIANT',

        inspectionDate: d1,

        officerRemarks:
          'All declarations found in order.'
      },


      // ------------------------------------------------------
      // INSPECTION 2 - POTENTIAL VIOLATION
      // ------------------------------------------------------

      {
        inspectionId: 'INS-C3D4',
        officerId: officer._id,
        productId: products[1]._id,

        location: 'Delhi Supermart',

        status: 'UNDER_REVIEW',

        complianceStatus: 'POTENTIAL_VIOLATION',

        inspectionDate: d2,

        officerRemarks:
          'MRP declaration requires verification.'
      },


      // ------------------------------------------------------
      // INSPECTION 3 - REQUIRES REVIEW
      // ------------------------------------------------------

      {
        inspectionId: 'INS-E5F6',
        officerId: officer._id,
        productId: products[2]._id,

        location: 'Bangalore Metro Store',

        status: 'UNDER_REVIEW',

        complianceStatus: 'REQUIRES_REVIEW',

        inspectionDate: d3,

        officerRemarks:
          'MRP appears deliberately obfuscated.'
      },


      // ------------------------------------------------------
      // INSPECTION 4 - COMPLIANT
      // ------------------------------------------------------

      {
        inspectionId: 'INS-G7H8',
        officerId: officer._id,
        productId: products[3]._id,

        location: 'Chennai Retail Hub',

        status: 'COMPLETED',

        complianceStatus: 'COMPLIANT',

        inspectionDate: d4,

        officerRemarks:
          'All mandatory declarations detected.'
      },


      // ------------------------------------------------------
      // INSPECTION 5 - PROCESSING
      // ------------------------------------------------------

      {
        inspectionId: 'INS-I9J0',
        officerId: officer._id,
        productId: products[4]._id,

        location: 'Pune Fresh Mart',

        status: 'PROCESSING',

        complianceStatus: 'REQUIRES_REVIEW',

        inspectionDate: new Date(),

        officerRemarks:
          'AI analysis currently in progress.'
      }

    ]);

    console.log(
      `✅ ${inspections.length} inspections created`
    );


    // ========================================================
    // 4. CREATE VIOLATIONS
    // ========================================================

    const v1 = await Violation.create({

      ruleId: 'LM-PC-MRP-001',

      inspectionId: inspections[1]._id,

      field: 'mrp',

      requirement:
        'MRP declaration should be present',

      detectedValue: 'None',

      expectedValue:
        'Valid MRP format',

      severity: 'HIGH',

      confidence: 82.5,

      status: 'AI_DETECTED',

      explanation:
        'No valid MRP text detected on the front or back panels.'

    });


    const v2 = await Violation.create({

      ruleId: 'LM-PC-NETQTY-002',

      inspectionId: inspections[2]._id,

      field: 'net_quantity',

      requirement:
        'Net quantity must use standard unit formats',

      detectedValue: '1000',

      expectedValue:
        '1 kg or 1000 g',

      severity: 'MEDIUM',

      confidence: 91.0,

      status: 'CONFIRMED',

      explanation:
        'Unit missing from quantity declaration.',

      officerRemark:
        'Verified manually. Confirmed missing unit.'

    });


    console.log('✅ Violations created');


    // ========================================================
    // 5. LINK VIOLATIONS TO INSPECTIONS
    // ========================================================

    inspections[1].violations.push(v1._id);

    await inspections[1].save();


    inspections[2].violations.push(v2._id);

    await inspections[2].save();


    console.log(
      '✅ Violations linked to inspections'
    );


    // ========================================================
    // COMPLETE
    // ========================================================

    console.log('');
    console.log('==============================================');
    console.log('       LEGALSCAN AI SEED DATA READY');
    console.log('==============================================');
    console.log('');
    console.log('Login credentials:');
    console.log('Email:    officer@legalscan.gov');
    console.log('Password: password123');
    console.log('');
    console.log('Demo data:');
    console.log(`Users:       1`);
    console.log(`Products:    ${products.length}`);
    console.log(`Inspections: ${inspections.length}`);
    console.log(`Violations:  2`);
    console.log('');
    console.log('==============================================');

    await mongoose.connection.close();

    console.log('🔌 MongoDB connection closed');

    process.exit(0);

  } catch (error) {

    console.error('');
    console.error('❌ ERROR IMPORTING SEED DATA');
    console.error('----------------------------------------------');
    console.error(error);
    console.error('----------------------------------------------');

    await mongoose.connection.close();

    process.exit(1);
  }
};


// ============================================================
// RUN
// ============================================================

importData();