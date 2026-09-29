// // // require('dotenv').config();
// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const cors = require('cors');
// // // const { errorHandler, notFound } = require('./middleware/errorHandler');

// // // const authRoutes = require('./routes/authRoutes');
// // // const inspectionRoutes = require('./routes/inspectionRoutes');
// // // const analyticsRoutes = require('./routes/analyticsRoutes');
// // // const ruleRoutes = require('./routes/ruleRoutes');
// // // const violationRoutes = require('./routes/violationRoutes');
// // // const manufacturerRoutes = require('./routes/manufacturerRoutes');

// // // const app = express();
// // // const path = require('path');
// // // console.log('SERVER DIR:', __dirname);
// // // console.log('UPLOADS DIR:', path.join(__dirname, '../../uploads'));
// // // console.log(
// // //   'UPLOADS EXISTS:',
// // //   require('fs').existsSync(path.join(__dirname, '../../uploads'))
// // // );

// // // app.use(
// // //   '/uploads',
// // //   express.static(path.join(__dirname, '../../uploads'))
// // // );

// // // app.use(cors());
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://ishajadhav3005_db_user:LegalScanAI123@cluster0.f136nrs.mongodb.net/?appName=Cluster0', {
// // //   useNewUrlParser: true,
// // //   useUnifiedTopology: true,
// // // }).then(() => console.log('MongoDB connected'))
// // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // Routes
// // // app.use('/api/auth', authRoutes);
// // // app.use('/api/inspections', inspectionRoutes);
// // // app.use('/api/analytics', analyticsRoutes);
// // // app.use('/api/rules', ruleRoutes);
// // // app.use('/api/violations', violationRoutes);
// // // app.use('/api/manufacturers', manufacturerRoutes);

// // // // Error Handling
// // // app.use(notFound);
// // // app.use(errorHandler);

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   console.log(`Node.js API running on port ${PORT}`);
// // // });


// // require('dotenv').config();

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const path = require('path');
// // const fs = require('fs');

// // const { errorHandler, notFound } = require('./middleware/errorHandler');

// // const authRoutes = require('./routes/authRoutes');
// // const inspectionRoutes = require('./routes/inspectionRoutes');
// // const analyticsRoutes = require('./routes/analyticsRoutes');
// // const ruleRoutes = require('./routes/ruleRoutes');
// // const violationRoutes = require('./routes/violationRoutes');
// // const manufacturerRoutes = require('./routes/manufacturerRoutes');

// // const app = express();


// // // ============================================================
// // // SERVER INFORMATION
// // // ============================================================

// // console.log('==============================================');
// // console.log('🚀 Starting LegalScan AI Backend');
// // console.log('==============================================');

// // console.log('SERVER DIR:', __dirname);
// // console.log('CURRENT WORKING DIR:', process.cwd());


// // // ============================================================
// // // UPLOADS DIRECTORY
// // // ============================================================
// // //
// // // The project may have server.js in:
// // //   backend/
// // // or:
// // //   backend/src/
// // //
// // // Therefore we check multiple possible locations.
// // //
// // // ============================================================

// // const uploadCandidates = [
// //   path.resolve(__dirname, '../../uploads'),
// //   path.resolve(__dirname, '../uploads'),
// //   path.resolve(process.cwd(), 'uploads'),
// //   path.resolve(process.cwd(), '../uploads')
// // ];

// // let UPLOADS_DIR = null;

// // for (const candidate of uploadCandidates) {
// //   console.log('Checking uploads directory:', candidate);

// //   if (fs.existsSync(candidate)) {
// //     UPLOADS_DIR = candidate;
// //     break;
// //   }
// // }


// // // ============================================================
// // // CREATE UPLOADS DIRECTORY IF NEEDED
// // // ============================================================

// // if (!UPLOADS_DIR) {
// //   UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');

// //   fs.mkdirSync(UPLOADS_DIR, {
// //     recursive: true
// //   });

// //   console.log('📁 Uploads directory did not exist.');
// //   console.log('📁 Created:', UPLOADS_DIR);
// // }


// // console.log('==============================================');
// // console.log('📂 FINAL UPLOADS DIRECTORY:');
// // console.log(UPLOADS_DIR);
// // console.log('📂 UPLOADS EXISTS:', fs.existsSync(UPLOADS_DIR));
// // console.log('==============================================');


// // // ============================================================
// // // CORS
// // // ============================================================

// // app.use(
// //   cors({
// //     origin: true,
// //     credentials: true
// //   })
// // );


// // // ============================================================
// // // BODY PARSERS
// // // ============================================================

// // app.use(express.json());

// // app.use(
// //   express.urlencoded({
// //     extended: true
// //   })
// // );


// // // ============================================================
// // // STATIC UPLOAD FILES
// // // ============================================================
// // //
// // // Images will now be accessible as:
// // //
// // // http://localhost:5000/uploads/<filename>
// // //
// // // Example:
// // //
// // // http://localhost:5000/uploads/image-1788797596669.png
// // //
// // // ============================================================

// // app.use(
// //   '/uploads',
// //   express.static(UPLOADS_DIR, {
// //     fallthrough: true,
// //     maxAge: '1h'
// //   })
// // );


// // // ============================================================
// // // DEBUG UPLOAD ROUTE
// // // ============================================================
// // //
// // // This helps us confirm that the backend can actually find
// // // an uploaded image.
// // //
// // // ============================================================

// // app.get('/api/debug/uploads', (req, res) => {
// //   try {
// //     const files = fs.readdirSync(UPLOADS_DIR);

// //     res.status(200).json({
// //       success: true,
// //       uploadsDirectory: UPLOADS_DIR,
// //       exists: fs.existsSync(UPLOADS_DIR),
// //       fileCount: files.length,
// //       files
// //     });

// //   } catch (error) {
// //     console.error('❌ Upload directory read error:', error);

// //     res.status(500).json({
// //       success: false,
// //       message: 'Unable to read uploads directory',
// //       error: error.message
// //     });
// //   }
// // });


// // // ============================================================
// // // DEBUG SINGLE IMAGE
// // // ============================================================
// // //
// // // Example:
// // //
// // // GET
// // // /api/debug/image/image-1788797596669.png
// // //
// // // ============================================================

// // app.get('/api/debug/image/:filename', (req, res) => {

// //   const filename = path.basename(req.params.filename);

// //   const filePath = path.join(
// //     UPLOADS_DIR,
// //     filename
// //   );

// //   console.log('🔍 Debug image request:', filename);
// //   console.log('📁 Looking for:', filePath);

// //   if (!fs.existsSync(filePath)) {

// //     console.log('❌ Image NOT FOUND');

// //     return res.status(404).json({
// //       success: false,
// //       message: 'Image not found',
// //       filename,
// //       expectedPath: filePath
// //     });
// //   }

// //   console.log('✅ Image FOUND');

// //   res.status(200).json({
// //     success: true,
// //     filename,
// //     path: filePath,
// //     size: fs.statSync(filePath).size
// //   });
// // });


// // // ============================================================
// // // MONGODB CONNECTION
// // // ============================================================

// // mongoose
// //   .connect(
// //     process.env.MONGO_URI ||
// //       'mongodb+srv://ishajadhav3005_db_user:LegalScanAI123@cluster0.f136nrs.mongodb.net/?appName=Cluster0',
// //     {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true
// //     }
// //   )
// //   .then(() => {
// //     console.log('✅ MongoDB connected');
// //   })
// //   .catch((err) => {
// //     console.error(
// //       '❌ MongoDB connection error:',
// //       err
// //     );
// //   });


// // // ============================================================
// // // API ROUTES
// // // ============================================================

// // app.use(
// //   '/api/auth',
// //   authRoutes
// // );

// // app.use(
// //   '/api/inspections',
// //   inspectionRoutes
// // );

// // app.use(
// //   '/api/analytics',
// //   analyticsRoutes
// // );

// // app.use(
// //   '/api/rules',
// //   ruleRoutes
// // );

// // app.use(
// //   '/api/violations',
// //   violationRoutes
// // );

// // app.use(
// //   '/api/manufacturers',
// //   manufacturerRoutes
// // );


// // // ============================================================
// // // HEALTH CHECK
// // // ============================================================

// // app.get('/api/health', (req, res) => {

// //   res.status(200).json({
// //     success: true,
// //     message: 'LegalScan AI backend is running',
// //     uploadsDirectory: UPLOADS_DIR,
// //     uploadsAvailable: fs.existsSync(UPLOADS_DIR),
// //     timestamp: new Date().toISOString()
// //   });

// // });


// // // ============================================================
// // // ERROR HANDLING
// // // ============================================================

// // app.use(notFound);

// // app.use(errorHandler);


// // // ============================================================
// // // START SERVER
// // // ============================================================

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {

// //   console.log('');
// //   console.log('==============================================');
// //   console.log(`🚀 Node.js API running on port ${PORT}`);
// //   console.log(`🌐 API: http://localhost:${PORT}`);
// //   console.log(`🖼️ Uploads: http://localhost:${PORT}/uploads/`);
// //   console.log('==============================================');
// //   console.log('');

// // });

// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const { errorHandler, notFound } = require('./middleware/errorHandler');

// const authRoutes = require('./routes/authRoutes');
// const inspectionRoutes = require('./routes/inspectionRoutes');
// const analyticsRoutes = require('./routes/analyticsRoutes');
// const ruleRoutes = require('./routes/ruleRoutes');
// const violationRoutes = require('./routes/violationRoutes');
// const manufacturerRoutes = require('./routes/manufacturerRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const app = express();


// // ============================================================
// // SERVER INFORMATION
// // ============================================================

// console.log('');
// console.log('==============================================');
// console.log('🚀 Starting LegalScan AI Backend');
// console.log('==============================================');

// console.log('📁 SERVER DIR:', __dirname);
// console.log('📁 CURRENT WORKING DIR:', process.cwd());


// // ============================================================
// // FIND UPLOADS DIRECTORY
// // ============================================================
// //
// // We check multiple possible locations because the project
// // structure may differ depending on where server.js is running.
// //
// // ============================================================

// const uploadCandidates = [
//   path.resolve(__dirname, '../../uploads'),
//   path.resolve(__dirname, '../uploads'),
//   path.resolve(process.cwd(), 'uploads'),
//   path.resolve(process.cwd(), '../uploads')
// ];

// let UPLOADS_DIR = null;

// console.log('');
// console.log('🔎 Searching for uploads directory...');

// for (const candidate of uploadCandidates) {

//   console.log('Checking:', candidate);

//   if (fs.existsSync(candidate)) {

//     UPLOADS_DIR = candidate;

//     console.log('✅ Found uploads directory!');
//     break;
//   }
// }


// // ============================================================
// // CREATE UPLOADS DIRECTORY IF NOT FOUND
// // ============================================================

// if (!UPLOADS_DIR) {

//   UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');

//   fs.mkdirSync(UPLOADS_DIR, {
//     recursive: true
//   });

//   console.log('');
//   console.log('📁 Uploads directory did not exist.');
//   console.log('📁 Created new directory:', UPLOADS_DIR);
// }


// // ============================================================
// // UPLOAD DIRECTORY INFORMATION
// // ============================================================

// console.log('');
// console.log('==============================================');
// console.log('📂 UPLOAD CONFIGURATION');
// console.log('==============================================');

// console.log('Uploads directory:', UPLOADS_DIR);
// console.log('Directory exists:', fs.existsSync(UPLOADS_DIR));

// try {

//   const uploadFiles = fs.readdirSync(UPLOADS_DIR);

//   console.log('Files currently available:', uploadFiles.length);

//   if (uploadFiles.length > 0) {
//     console.log('Files:', uploadFiles);
//   } else {
//     console.log('⚠️ Uploads directory is empty.');
//   }

// } catch (error) {

//   console.error(
//     '❌ Could not read uploads directory:',
//     error.message
//   );
// }

// console.log('==============================================');
// console.log('');


// // ============================================================
// // CORS
// // ============================================================

// app.use(
//   cors({
//     origin: true,
//     credentials: true
//   })
// );


// // ============================================================
// // BODY PARSERS
// // ============================================================

// app.use(express.json());

// app.use(
//   express.urlencoded({
//     extended: true
//   })
// );


// // ============================================================
// // STATIC REPORT FILE SERVING
// // ============================================================
// //
// // Generated PDF reports are stored in:
// // project-root/reports
// //
// // They can be accessed using:
// // http://localhost:5000/reports/<filename>
// //
// // ============================================================

// const REPORTS_DIR = path.resolve(
//   __dirname,
//   '../../reports'
// );

// // Create reports directory if it does not exist
// if (!fs.existsSync(REPORTS_DIR)) {

//   fs.mkdirSync(
//     REPORTS_DIR,
//     {
//       recursive: true
//     }
//   );

//   console.log(
//     '📁 Created reports directory:',
//     REPORTS_DIR
//   );
// }

// console.log(
//   '📄 Reports directory:',
//   REPORTS_DIR
// );

// console.log(
//   '📄 Reports directory exists:',
//   fs.existsSync(REPORTS_DIR)
// );


// // Serve generated PDF reports
// app.use(
//   '/reports',
//   express.static(
//     REPORTS_DIR,
//     {
//       fallthrough: true,
//       maxAge: '1h'
//     }
//   )
// );

// // ============================================================
// // STATIC UPLOAD FILE SERVING
// // ============================================================
// //
// // Images can be accessed using:
// //
// // http://localhost:5000/uploads/<filename>
// //
// // Example:
// //
// // http://localhost:5000/uploads/image-123456.png
// //
// // ============================================================

// app.use(
//   '/uploads',
//   express.static(UPLOADS_DIR, {
//     fallthrough: true,
//     maxAge: '1h'
//   })
// );


// // ============================================================
// // DEBUG - LIST ALL UPLOADED FILES
// // ============================================================
// //
// // Open in browser:
// //
// // http://localhost:5000/api/debug/uploads
// //
// // ============================================================

// app.get('/api/debug/uploads', (req, res) => {

//   try {

//     const files = fs.readdirSync(UPLOADS_DIR);

//     const fileDetails = files.map((filename) => {

//       const filePath = path.join(
//         UPLOADS_DIR,
//         filename
//       );

//       let stats = null;

//       try {
//         stats = fs.statSync(filePath);
//       } catch (error) {
//         stats = null;
//       }

//       return {
//         filename,
//         size: stats ? stats.size : 0,
//         url: `/uploads/${encodeURIComponent(filename)}`,
//         exists: fs.existsSync(filePath)
//       };
//     });

//     res.status(200).json({

//       success: true,

//       uploadsDirectory: UPLOADS_DIR,

//       exists: fs.existsSync(UPLOADS_DIR),

//       fileCount: files.length,

//       files: fileDetails

//     });

//   } catch (error) {

//     console.error(
//       '❌ Upload directory read error:',
//       error
//     );

//     res.status(500).json({

//       success: false,

//       message: 'Unable to read uploads directory',

//       error: error.message

//     });
//   }
// });


// // ============================================================
// // DEBUG - CHECK / SERVE SINGLE IMAGE
// // ============================================================
// //
// // Example:
// //
// // http://localhost:5000/api/debug/image/image-123.png
// //
// // IMPORTANT:
// // This endpoint actually sends the image to the browser.
// // ============================================================

// app.get('/api/debug/image/:filename', (req, res) => {

//   const filename = path.basename(
//     req.params.filename
//   );

//   const filePath = path.join(
//     UPLOADS_DIR,
//     filename
//   );

//   console.log('');
//   console.log('==============================================');
//   console.log('🖼️ IMAGE REQUEST');
//   console.log('==============================================');

//   console.log('Filename:', filename);
//   console.log('Looking for:', filePath);
//   console.log('Exists:', fs.existsSync(filePath));

//   if (!fs.existsSync(filePath)) {

//     console.log('❌ IMAGE NOT FOUND');

//     console.log('==============================================');
//     console.log('');

//     return res.status(404).json({

//       success: false,

//       message: 'Image not found',

//       filename,

//       expectedPath: filePath

//     });
//   }


//   try {

//     const stats = fs.statSync(filePath);

//     console.log('✅ IMAGE FOUND');

//     console.log(
//       '📦 File size:',
//       stats.size,
//       'bytes'
//     );

//     console.log('==============================================');
//     console.log('');

//     // Send actual image to browser
//     return res.sendFile(filePath);

//   } catch (error) {

//     console.error(
//       '❌ Error sending image:',
//       error
//     );

//     return res.status(500).json({

//       success: false,

//       message: 'Unable to send image',

//       error: error.message

//     });
//   }
// });


// // ============================================================
// // HEALTH CHECK
// // ============================================================
// //
// // Open:
// //
// // http://localhost:5000/api/health
// //
// // ============================================================

// app.get('/api/health', (req, res) => {

//   res.status(200).json({

//     success: true,

//     message: 'LegalScan AI backend is running',

//     server: {
//       port: PORT,
//       environment: process.env.NODE_ENV || 'development'
//     },

//     uploads: {

//       directory: UPLOADS_DIR,

//       available: fs.existsSync(UPLOADS_DIR),

//       fileCount: (() => {

//         try {

//           return fs.readdirSync(
//             UPLOADS_DIR
//           ).length;

//         } catch (error) {

//           return 0;
//         }

//       })()

//     },

//     timestamp: new Date().toISOString()

//   });
// });


// // ============================================================
// // MONGODB CONNECTION
// // ============================================================
// //
// // IMPORTANT:
// // Put your MongoDB URI in .env as:
// //
// // MONGO_URI=your_mongodb_connection_string
// //
// // Do NOT commit credentials into source code.
// // ============================================================

// const MONGO_URI = process.env.MONGO_URI;

// if (!MONGO_URI) {

//   console.error('');
//   console.error('❌ MONGO_URI is missing from .env');
//   console.error('');
//   console.error(
//     'Please add MONGO_URI to your backend .env file.'
//   );
//   console.error('');

// } else {

//   mongoose
//     .connect(MONGO_URI)
//     .then(() => {

//       console.log('✅ MongoDB connected');

//     })
//     .catch((err) => {

//       console.error(
//         '❌ MongoDB connection error:',
//         err.message
//       );

//     });
// }


// // ============================================================
// // API ROUTES
// // ============================================================

// app.use(
//   '/api/auth',
//   authRoutes
// );

// app.use(
//   '/api/inspections',
//   inspectionRoutes
// );

// app.use(
//   '/api/analytics',
//   analyticsRoutes
// );

// app.use(
//   '/api/rules',
//   ruleRoutes
// );

// app.use(
//   '/api/violations',
//   violationRoutes
// );

// app.use(
//   '/api/manufacturers',
//   manufacturerRoutes
// );

// app.use(
//   '/api/reports',
//   reportRoutes
// );
// // ============================================================
// // 404 HANDLER
// // ============================================================

// app.use(notFound);


// // ============================================================
// // GLOBAL ERROR HANDLER
// // ============================================================

// app.use(errorHandler);


// // ============================================================
// // START SERVER
// // ============================================================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {

//   console.log('');
//   console.log('==============================================');
//   console.log('🚀 LEGALSCAN AI BACKEND RUNNING');
//   console.log('==============================================');

//   console.log(
//     `🌐 API:       http://localhost:${PORT}`
//   );

//   console.log(
//     `❤️ Health:    http://localhost:${PORT}/api/health`
//   );

//   console.log(
//     `📂 Uploads:   http://localhost:${PORT}/uploads/`
//   );

//   console.log(
//     `🔍 Debug:     http://localhost:${PORT}/api/debug/uploads`
//   );

//   console.log(
//     `🖼️ Image:     http://localhost:${PORT}/api/debug/image/<filename>`
//   );

//   console.log('==============================================');
//   console.log('');

// });


require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const {
  errorHandler,
  notFound
} = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const ruleRoutes = require('./routes/ruleRoutes');
const violationRoutes = require('./routes/violationRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();


// ============================================================
// SERVER INFORMATION
// ============================================================

console.log('');
console.log('==============================================');
console.log('🚀 Starting LegalScan AI Backend');
console.log('==============================================');

console.log(
  '📁 SERVER DIR:',
  __dirname
);

console.log(
  '📁 CURRENT WORKING DIR:',
  process.cwd()
);


// ============================================================
// PORT
// ============================================================

const PORT =
  process.env.PORT || 5000;


// ============================================================
// FIND UPLOADS DIRECTORY
// ============================================================

const uploadCandidates = [
  path.resolve(
    __dirname,
    '../../uploads'
  ),

  path.resolve(
    __dirname,
    '../uploads'
  ),

  path.resolve(
    process.cwd(),
    'uploads'
  ),

  path.resolve(
    process.cwd(),
    '../uploads'
  )
];

let UPLOADS_DIR = null;

console.log('');
console.log(
  '🔎 Searching for uploads directory...'
);

for (
  const candidate of uploadCandidates
) {

  console.log(
    'Checking:',
    candidate
  );

  if (
    fs.existsSync(candidate)
  ) {

    UPLOADS_DIR = candidate;

    console.log(
      '✅ Found uploads directory!'
    );

    break;
  }
}


// ============================================================
// CREATE UPLOADS DIRECTORY IF NOT FOUND
// ============================================================

if (!UPLOADS_DIR) {

  UPLOADS_DIR =
    path.resolve(
      process.cwd(),
      'uploads'
    );

  fs.mkdirSync(
    UPLOADS_DIR,
    {
      recursive: true
    }
  );

  console.log('');
  console.log(
    '📁 Uploads directory did not exist.'
  );

  console.log(
    '📁 Created new directory:',
    UPLOADS_DIR
  );
}


// ============================================================
// UPLOAD DIRECTORY INFORMATION
// ============================================================

console.log('');
console.log('==============================================');
console.log('📂 UPLOAD CONFIGURATION');
console.log('==============================================');

console.log(
  'Uploads directory:',
  UPLOADS_DIR
);

console.log(
  'Directory exists:',
  fs.existsSync(UPLOADS_DIR)
);

try {

  const uploadFiles =
    fs.readdirSync(
      UPLOADS_DIR
    );

  console.log(
    'Files currently available:',
    uploadFiles.length
  );

  if (
    uploadFiles.length > 0
  ) {

    console.log(
      'Files:',
      uploadFiles
    );

  } else {

    console.log(
      '⚠️ Uploads directory is empty.'
    );

  }

} catch (error) {

  console.error(
    '❌ Could not read uploads directory:',
    error.message
  );

}

console.log(
  '=============================================='
);

console.log('');


// ============================================================
// REPORTS DIRECTORY
// ============================================================
//
// Generated PDF reports are stored in:
//
// project-root/reports
//
// Example:
//
// AICW---LegalScan-AI/
// ├── backend/
// │   └── src/
// │       └── server.js
// └── reports/
//     └── Report-INS-2026-XXXX.pdf
//
// Browser URL:
//
// http://localhost:5000/reports/<filename>
//
// ============================================================

const REPORTS_DIR =
  path.resolve(
    __dirname,
    '../../reports'
  );


// ============================================================
// CREATE REPORTS DIRECTORY IF NOT FOUND
// ============================================================

if (
  !fs.existsSync(REPORTS_DIR)
) {

  fs.mkdirSync(
    REPORTS_DIR,
    {
      recursive: true
    }
  );

  console.log(
    '📁 Created reports directory:',
    REPORTS_DIR
  );
}

console.log(
  '📄 Reports directory:',
  REPORTS_DIR
);

console.log(
  '📄 Reports directory exists:',
  fs.existsSync(
    REPORTS_DIR
  )
);


// ============================================================
// CORS
// ============================================================

app.use(
  cors({
    origin: true,
    credentials: true
  })
);


// ============================================================
// BODY PARSERS
// ============================================================

app.use(
  express.json({
    limit: '20mb'
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '20mb'
  })
);


// ============================================================
// STATIC PDF REPORT SERVING
// ============================================================
//
// This is required for the Download button.
//
// Example:
//
// http://localhost:5000/reports/Report-INS-2026-2622.pdf
//
// ============================================================

app.use(
  '/reports',
  express.static(
    REPORTS_DIR,
    {
      fallthrough: true,
      maxAge: '1h'
    }
  )
);


// ============================================================
// STATIC UPLOAD FILE SERVING
// ============================================================
//
// Example:
//
// http://localhost:5000/uploads/image-123.png
//
// ============================================================

app.use(
  '/uploads',
  express.static(
    UPLOADS_DIR,
    {
      fallthrough: true,
      maxAge: '1h'
    }
  )
);


// ============================================================
// DEBUG - LIST ALL UPLOADED FILES
// ============================================================

app.get(
  '/api/debug/uploads',
  (req, res) => {

    try {

      const files =
        fs.readdirSync(
          UPLOADS_DIR
        );

      const fileDetails =
        files.map(
          (filename) => {

            const filePath =
              path.join(
                UPLOADS_DIR,
                filename
              );

            let stats = null;

            try {

              stats =
                fs.statSync(
                  filePath
                );

            } catch (error) {

              stats = null;

            }

            return {
              filename,

              size:
                stats
                  ? stats.size
                  : 0,

              url:
                `/uploads/${encodeURIComponent(
                  filename
                )}`,

              exists:
                fs.existsSync(
                  filePath
                )
            };
          }
        );

      return res.status(200).json({

        success: true,

        uploadsDirectory:
          UPLOADS_DIR,

        exists:
          fs.existsSync(
            UPLOADS_DIR
          ),

        fileCount:
          files.length,

        files:
          fileDetails

      });

    } catch (error) {

      console.error(
        '❌ Upload directory read error:',
        error
      );

      return res.status(500).json({

        success: false,

        message:
          'Unable to read uploads directory',

        error:
          error.message

      });

    }

  }
);


// ============================================================
// DEBUG - CHECK / SERVE SINGLE IMAGE
// ============================================================

app.get(
  '/api/debug/image/:filename',
  (req, res) => {

    const filename =
      path.basename(
        req.params.filename
      );

    const filePath =
      path.join(
        UPLOADS_DIR,
        filename
      );

    console.log('');
    console.log(
      '=============================================='
    );

    console.log(
      '🖼️ IMAGE REQUEST'
    );

    console.log(
      '=============================================='
    );

    console.log(
      'Filename:',
      filename
    );

    console.log(
      'Looking for:',
      filePath
    );

    console.log(
      'Exists:',
      fs.existsSync(
        filePath
      )
    );


    if (
      !fs.existsSync(
        filePath
      )
    ) {

      console.log(
        '❌ IMAGE NOT FOUND'
      );

      console.log(
        '=============================================='
      );

      console.log('');

      return res.status(404).json({

        success: false,

        message:
          'Image not found',

        filename,

        expectedPath:
          filePath

      });

    }


    try {

      const stats =
        fs.statSync(
          filePath
        );

      console.log(
        '✅ IMAGE FOUND'
      );

      console.log(
        '📦 File size:',
        stats.size,
        'bytes'
      );

      console.log(
        '=============================================='
      );

      console.log('');

      return res.sendFile(
        filePath
      );

    } catch (error) {

      console.error(
        '❌ Error sending image:',
        error
      );

      return res.status(500).json({

        success: false,

        message:
          'Unable to send image',

        error:
          error.message

      });

    }

  }
);


// ============================================================
// DEBUG - LIST GENERATED REPORTS
// ============================================================
//
// Useful for checking whether PDFs actually exist.
//
// URL:
//
// http://localhost:5000/api/debug/reports
//
// ============================================================

app.get(
  '/api/debug/reports',
  (req, res) => {

    try {

      const files =
        fs.readdirSync(
          REPORTS_DIR
        );

      const pdfFiles =
        files.filter(
          (file) =>
            path.extname(
              file
            ).toLowerCase() === '.pdf'
        );

      const reports =
        pdfFiles.map(
          (filename) => {

            const filePath =
              path.join(
                REPORTS_DIR,
                filename
              );

            let stats = null;

            try {

              stats =
                fs.statSync(
                  filePath
                );

            } catch (error) {

              stats = null;

            }

            return {

              filename,

              size:
                stats
                  ? stats.size
                  : 0,

              exists:
                fs.existsSync(
                  filePath
                ),

              url:
                `/reports/${encodeURIComponent(
                  filename
                )}`,

              fullPath:
                filePath

            };

          }
        );

      return res.status(200).json({

        success: true,

        reportsDirectory:
          REPORTS_DIR,

        exists:
          fs.existsSync(
            REPORTS_DIR
          ),

        fileCount:
          pdfFiles.length,

        reports

      });

    } catch (error) {

      console.error(
        '❌ Report directory read error:',
        error
      );

      return res.status(500).json({

        success: false,

        message:
          'Unable to read reports directory',

        error:
          error.message

      });

    }

  }
);


// ============================================================
// HEALTH CHECK
// ============================================================

app.get(
  '/api/health',
  (req, res) => {

    res.status(200).json({

      success: true,

      message:
        'LegalScan AI backend is running',

      server: {

        port:
          PORT,

        environment:
          process.env.NODE_ENV ||
          'development'

      },

      uploads: {

        directory:
          UPLOADS_DIR,

        available:
          fs.existsSync(
            UPLOADS_DIR
          ),

        fileCount:
          (() => {

            try {

              return fs
                .readdirSync(
                  UPLOADS_DIR
                )
                .length;

            } catch (error) {

              return 0;

            }

          })()

      },

      reports: {

        directory:
          REPORTS_DIR,

        available:
          fs.existsSync(
            REPORTS_DIR
          ),

        fileCount:
          (() => {

            try {

              return fs
                .readdirSync(
                  REPORTS_DIR
                )
                .filter(
                  (file) =>
                    path
                      .extname(
                        file
                      )
                      .toLowerCase() ===
                    '.pdf'
                )
                .length;

            } catch (error) {

              return 0;

            }

          })()

      },

      timestamp:
        new Date().toISOString()

    });

  }
);


// ============================================================
// MONGODB CONNECTION
// ============================================================

const MONGO_URI =
  process.env.MONGO_URI;

if (!MONGO_URI) {

  console.error('');
  console.error(
    '❌ MONGO_URI is missing from .env'
  );
  console.error('');

} else {

  mongoose
    .connect(
      MONGO_URI
    )
    .then(() => {

      console.log(
        '✅ MongoDB connected'
      );

    })
    .catch(
      (error) => {

        console.error(
          '❌ MongoDB connection error:',
          error.message
        );

      }
    );

}


// ============================================================
// API ROUTES
// ============================================================

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/inspections',
  inspectionRoutes
);

app.use(
  '/api/analytics',
  analyticsRoutes
);

app.use(
  '/api/rules',
  ruleRoutes
);

app.use(
  '/api/violations',
  violationRoutes
);

app.use(
  '/api/manufacturers',
  manufacturerRoutes
);


// ============================================================
// REPORT ROUTES
// ============================================================
//
// GET  /api/reports
// GET  /api/reports/:reportId
// GET  /api/reports/inspection/:inspectionId
// POST /api/reports/:inspectionId/generate
//
// ============================================================

app.use(
  '/api/reports',
  reportRoutes
);


// ============================================================
// 404 HANDLER
// ============================================================
//
// IMPORTANT:
// Keep this AFTER all API/static routes.
//
// ============================================================

app.use(
  notFound
);


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(
  errorHandler
);


// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  () => {

    console.log('');
    console.log(
      '=============================================='
    );

    console.log(
      '🚀 LEGALSCAN AI BACKEND RUNNING'
    );

    console.log(
      '=============================================='
    );

    console.log(
      `🌐 API:       http://localhost:${PORT}`
    );

    console.log(
      `❤️ Health:    http://localhost:${PORT}/api/health`
    );

    console.log(
      `📂 Uploads:   http://localhost:${PORT}/uploads/`
    );

    console.log(
      `📄 Reports:   http://localhost:${PORT}/reports/`
    );

    console.log(
      `🔍 Debug:     http://localhost:${PORT}/api/debug/uploads`
    );

    console.log(
      `📄 Reports Debug: http://localhost:${PORT}/api/debug/reports`
    );

    console.log(
      `🖼️ Image:     http://localhost:${PORT}/api/debug/image/<filename>`
    );

    console.log(
      '=============================================='
    );

    console.log('');

  }
);