// // const express = require('express');
// // const cors = require('cors');
// // const helmet = require('helmet');
// // const dotenv = require('dotenv');
// // const connectDB = require('./src/config/db');
// // const routes = require('./src/routes');

// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Middleware
// // app.use(helmet());
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Database connection
// // connectDB();

// // // API Routes
// // app.use('/api', routes);

// // // Error Handling Middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({
// //     success: false,
// //     message: err.message || 'Internal Server Error',
// //     error: process.env.NODE_ENV === 'development' ? err : {}
// //   });
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
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

// const app = express();


// // ============================================================
// // SERVER INFORMATION
// // ============================================================

// console.log('');
// console.log('================================================');
// console.log('🚀 STARTING LEGALSCAN AI BACKEND');
// console.log('================================================');
// console.log('SERVER FILE:', __filename);
// console.log('SERVER DIR :', __dirname);
// console.log('WORKING DIR:', process.cwd());
// console.log('================================================');
// console.log('');


// // ============================================================
// // UPLOAD DIRECTORY LOCATIONS
// // ============================================================
// //
// // We intentionally check multiple possible locations.
// //
// // This prevents the image-serving problem caused by the
// // backend being started from different folders.
// //
// // ============================================================

// const UPLOAD_DIRECTORIES = [
//   path.resolve(__dirname, '../../uploads'),
//   path.resolve(__dirname, '../uploads'),
//   path.resolve(process.cwd(), 'uploads'),
//   path.resolve(process.cwd(), '../uploads'),
//   path.resolve(process.cwd(), '../../uploads')
// ];


// // Remove duplicates
// const UNIQUE_UPLOAD_DIRECTORIES = [
//   ...new Set(UPLOAD_DIRECTORIES)
// ];


// // ============================================================
// // SHOW ALL POSSIBLE UPLOAD DIRECTORIES
// // ============================================================

// console.log('📂 POSSIBLE UPLOAD DIRECTORIES');

// UNIQUE_UPLOAD_DIRECTORIES.forEach((dir, index) => {

//   console.log(
//     `${index + 1}. ${dir}`
//   );

//   console.log(
//     `   Exists: ${fs.existsSync(dir)}`
//   );

// });

// console.log('');


// // ============================================================
// // FIND IMAGE FILE
// // ============================================================
// //
// // This is the important part.
// //
// // Instead of assuming one uploads folder, we search all
// // possible locations for the actual filename.
// //
// // ============================================================

// const findUploadedFile = (filename) => {

//   if (!filename) {
//     return null;
//   }

//   // Prevent path traversal
//   const safeFilename = path.basename(filename);

//   for (const directory of UNIQUE_UPLOAD_DIRECTORIES) {

//     const filePath = path.join(
//       directory,
//       safeFilename
//     );

//     if (
//       fs.existsSync(filePath) &&
//       fs.statSync(filePath).isFile()
//     ) {

//       return filePath;

//     }

//   }

//   return null;
// };


// // ============================================================
// // CREATE DEFAULT UPLOAD DIRECTORY
// // ============================================================
// //
// // Use the project-level uploads folder as the default.
// //
// // ============================================================

// const DEFAULT_UPLOADS_DIR =
//   path.resolve(process.cwd(), 'uploads');

// if (!fs.existsSync(DEFAULT_UPLOADS_DIR)) {

//   fs.mkdirSync(
//     DEFAULT_UPLOADS_DIR,
//     {
//       recursive: true
//     }
//   );

//   console.log(
//     '📁 Created default uploads directory:',
//     DEFAULT_UPLOADS_DIR
//   );

// }


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

// app.use(
//   express.json()
// );

// app.use(
//   express.urlencoded({
//     extended: true
//   })
// );


// // ============================================================
// // STATIC FILE SERVING
// // ============================================================
// //
// // Keep normal static serving for all possible upload folders.
// //
// // ============================================================

// UNIQUE_UPLOAD_DIRECTORIES.forEach((directory) => {

//   if (fs.existsSync(directory)) {

//     console.log(
//       '📂 Serving static uploads:',
//       directory
//     );

//     app.use(
//       '/uploads',
//       express.static(directory, {
//         fallthrough: true,
//         maxAge: '1h'
//       })
//     );

//   }

// });


// // ============================================================
// // IMPORTANT CUSTOM IMAGE ROUTE
// // ============================================================
// //
// // This route searches EVERY possible uploads directory.
// //
// // Therefore:
// //
// // http://localhost:5000/uploads/image-123.png
// //
// // will work even if the actual file is in:
// //
// // uploads/
// // backend/uploads/
// // backend/src/uploads/
// // etc.
// //
// // ============================================================

// app.get(
//   '/uploads/:filename',
//   (req, res) => {

//     const filename =
//       path.basename(
//         req.params.filename
//       );

//     console.log('');
//     console.log('================================================');
//     console.log('🖼️ IMAGE REQUEST');
//     console.log('================================================');
//     console.log('Filename:', filename);

//     const filePath =
//       findUploadedFile(filename);

//     if (!filePath) {

//       console.log(
//         '❌ IMAGE NOT FOUND IN ANY UPLOAD DIRECTORY'
//       );

//       console.log(
//         'Checked directories:'
//       );

//       UNIQUE_UPLOAD_DIRECTORIES.forEach(
//         (directory) => {
//           console.log(
//             ' -',
//             path.join(
//               directory,
//               filename
//             )
//           );
//         }
//       );

//       console.log('================================================');
//       console.log('');

//       return res.status(404).json({

//         success: false,

//         message: 'Image file not found',

//         filename,

//         checkedDirectories:
//           UNIQUE_UPLOAD_DIRECTORIES

//       });

//     }


//     console.log(
//       '✅ IMAGE FOUND'
//     );

//     console.log(
//       '📁 Actual file:',
//       filePath
//     );

//     try {

//       const stats =
//         fs.statSync(filePath);

//       console.log(
//         '📦 File size:',
//         stats.size,
//         'bytes'
//       );

//       console.log(
//         '================================================'
//       );

//       console.log('');

//       return res.sendFile(
//         filePath
//       );

//     } catch (error) {

//       console.error(
//         '❌ Error sending image:',
//         error
//       );

//       return res.status(500).json({

//         success: false,

//         message: 'Unable to send image',

//         error: error.message

//       });

//     }

//   }
// );


// // ============================================================
// // DEBUG - LIST UPLOAD DIRECTORIES
// // ============================================================

// app.get(
//   '/api/debug/uploads',
//   (req, res) => {

//     const result =
//       UNIQUE_UPLOAD_DIRECTORIES.map(
//         (directory) => {

//           let files = [];

//           if (fs.existsSync(directory)) {

//             try {

//               files =
//                 fs.readdirSync(
//                   directory
//                 );

//             } catch (error) {

//               files = [];

//             }

//           }

//           return {

//             directory,

//             exists:
//               fs.existsSync(
//                 directory
//               ),

//             fileCount:
//               files.length,

//             files

//           };

//         }
//       );

//     res.json({

//       success: true,

//       directories: result

//     });

//   }
// );


// // ============================================================
// // DEBUG - FIND AND SERVE SINGLE IMAGE
// // ============================================================

// app.get(
//   '/api/debug/image/:filename',
//   (req, res) => {

//     const filename =
//       path.basename(
//         req.params.filename
//       );

//     console.log('');
//     console.log(
//       '🔍 DEBUG IMAGE:',
//       filename
//     );

//     const filePath =
//       findUploadedFile(filename);

//     if (!filePath) {

//       return res.status(404).json({

//         success: false,

//         message:
//           'Image not found',

//         filename,

//         checkedDirectories:
//           UNIQUE_UPLOAD_DIRECTORIES

//       });

//     }

//     console.log(
//       '✅ DEBUG IMAGE FOUND:',
//       filePath
//     );

//     return res.sendFile(
//       filePath
//     );

//   }
// );


// // ============================================================
// // HEALTH CHECK
// // ============================================================

// app.get(
//   '/api/health',
//   (req, res) => {

//     res.status(200).json({

//       success: true,

//       message:
//         'LegalScan AI backend is running',

//       serverFile:
//         __filename,

//       serverDirectory:
//         __dirname,

//       workingDirectory:
//         process.cwd(),

//       uploadDirectories:
//         UNIQUE_UPLOAD_DIRECTORIES.map(
//           (directory) => ({

//             directory,

//             exists:
//               fs.existsSync(
//                 directory
//               )

//           })
//         ),

//       timestamp:
//         new Date().toISOString()

//     });

//   }
// );


// // ============================================================
// // MONGODB
// // ============================================================
// //
// // Keep your MongoDB connection string in .env:
// //
// // MONGO_URI=...
// //
// // ============================================================

// const MONGO_URI =
//   process.env.MONGO_URI;

// if (!MONGO_URI) {

//   console.error('');
//   console.error(
//     '❌ MONGO_URI is missing from .env'
//   );
//   console.error('');

// } else {

//   mongoose
//     .connect(MONGO_URI)
//     .then(() => {

//       console.log(
//         '✅ MongoDB connected'
//       );

//     })
//     .catch((error) => {

//       console.error(
//         '❌ MongoDB connection error:',
//         error.message
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


// // ============================================================
// // 404 HANDLER
// // ============================================================

// app.use(
//   notFound
// );


// // ============================================================
// // ERROR HANDLER
// // ============================================================

// app.use(
//   errorHandler
// );


// // ============================================================
// // START SERVER
// // ============================================================

// const PORT =
//   process.env.PORT || 5000;

// app.listen(
//   PORT,
//   () => {

//     console.log('');
//     console.log(
//       '================================================'
//     );

//     console.log(
//       '🚀 LEGALSCAN AI BACKEND RUNNING'
//     );

//     console.log(
//       '================================================'
//     );

//     console.log(
//       `🌐 API       : http://localhost:${PORT}`
//     );

//     console.log(
//       `❤️ Health    : http://localhost:${PORT}/api/health`
//     );

//     console.log(
//       `📂 Uploads   : http://localhost:${PORT}/uploads/`
//     );

//     console.log(
//       `🔍 Debug     : http://localhost:${PORT}/api/debug/uploads`
//     );

//     console.log(
//       `🖼️ Image     : http://localhost:${PORT}/uploads/<filename>`
//     );

//     console.log(
//       '================================================'
//     );

//     console.log('');

//   }
// );

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { errorHandler, notFound } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const ruleRoutes = require('./routes/ruleRoutes');
const violationRoutes = require('./routes/violationRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');

const app = express();


// ============================================================
// SERVER INFORMATION
// ============================================================

console.log('');
console.log('================================================');
console.log('🚀 STARTING LEGALSCAN AI BACKEND');
console.log('================================================');
console.log('SERVER FILE:', __filename);
console.log('SERVER DIR :', __dirname);
console.log('WORKING DIR:', process.cwd());
console.log('================================================');
console.log('');


// ============================================================
// UPLOAD DIRECTORY LOCATIONS
// ============================================================
//
// We intentionally check multiple possible locations.
//
// This prevents the image-serving problem caused by the
// backend being started from different folders.
//
// ============================================================

const UPLOAD_DIRECTORIES = [
  path.resolve(__dirname, '../../uploads'),
  path.resolve(__dirname, '../uploads'),
  path.resolve(process.cwd(), 'uploads'),
  path.resolve(process.cwd(), '../uploads'),
  path.resolve(process.cwd(), '../../uploads')
];


// Remove duplicates
const UNIQUE_UPLOAD_DIRECTORIES = [
  ...new Set(UPLOAD_DIRECTORIES)
];


// ============================================================
// SHOW ALL POSSIBLE UPLOAD DIRECTORIES
// ============================================================

console.log('📂 POSSIBLE UPLOAD DIRECTORIES');

UNIQUE_UPLOAD_DIRECTORIES.forEach((dir, index) => {

  console.log(
    `${index + 1}. ${dir}`
  );

  console.log(
    `   Exists: ${fs.existsSync(dir)}`
  );

});

console.log('');


// ============================================================
// FIND IMAGE FILE
// ============================================================
//
// This is the important part.
//
// Instead of assuming one uploads folder, we search all
// possible locations for the actual filename.
//
// ============================================================

const findUploadedFile = (filename) => {

  if (!filename) {
    return null;
  }

  // Prevent path traversal
  const safeFilename = path.basename(filename);

  for (const directory of UNIQUE_UPLOAD_DIRECTORIES) {

    const filePath = path.join(
      directory,
      safeFilename
    );

    if (
      fs.existsSync(filePath) &&
      fs.statSync(filePath).isFile()
    ) {

      return filePath;

    }

  }

  return null;
};


// ============================================================
// CREATE DEFAULT UPLOAD DIRECTORY
// ============================================================
//
// Use the project-level uploads folder as the default.
//
// ============================================================

const DEFAULT_UPLOADS_DIR =
  path.resolve(process.cwd(), 'uploads');

if (!fs.existsSync(DEFAULT_UPLOADS_DIR)) {

  fs.mkdirSync(
    DEFAULT_UPLOADS_DIR,
    {
      recursive: true
    }
  );

  console.log(
    '📁 Created default uploads directory:',
    DEFAULT_UPLOADS_DIR
  );

}


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
  express.json()
);

app.use(
  express.urlencoded({
    extended: true
  })
);


// ============================================================
// STATIC FILE SERVING
// ============================================================
//
// Keep normal static serving for all possible upload folders.
//
// ============================================================

UNIQUE_UPLOAD_DIRECTORIES.forEach((directory) => {

  if (fs.existsSync(directory)) {

    console.log(
      '📂 Serving static uploads:',
      directory
    );

    app.use(
      '/uploads',
      express.static(directory, {
        fallthrough: true,
        maxAge: '1h'
      })
    );

  }

});


// ============================================================
// IMPORTANT CUSTOM IMAGE ROUTE
// ============================================================
//
// This route searches EVERY possible uploads directory.
//
// Therefore:
//
// http://localhost:5000/uploads/image-123.png
//
// will work even if the actual file is in:
//
// uploads/
// backend/uploads/
// backend/src/uploads/
// etc.
//
// ============================================================

app.get(
  '/uploads/:filename',
  (req, res) => {

    const filename =
      path.basename(
        req.params.filename
      );

    console.log('');
    console.log('================================================');
    console.log('🖼️ IMAGE REQUEST');
    console.log('================================================');
    console.log('Filename:', filename);

    const filePath =
      findUploadedFile(filename);

    if (!filePath) {

      console.log(
        '❌ IMAGE NOT FOUND IN ANY UPLOAD DIRECTORY'
      );

      console.log(
        'Checked directories:'
      );

      UNIQUE_UPLOAD_DIRECTORIES.forEach(
        (directory) => {
          console.log(
            ' -',
            path.join(
              directory,
              filename
            )
          );
        }
      );

      console.log('================================================');
      console.log('');

      return res.status(404).json({

        success: false,

        message: 'Image file not found',

        filename,

        checkedDirectories:
          UNIQUE_UPLOAD_DIRECTORIES

      });

    }


    console.log(
      '✅ IMAGE FOUND'
    );

    console.log(
      '📁 Actual file:',
      filePath
    );

    try {

      const stats =
        fs.statSync(filePath);

      console.log(
        '📦 File size:',
        stats.size,
        'bytes'
      );

      console.log(
        '================================================'
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

        message: 'Unable to send image',

        error: error.message

      });

    }

  }
);


// ============================================================
// DEBUG - LIST UPLOAD DIRECTORIES
// ============================================================

app.get(
  '/api/debug/uploads',
  (req, res) => {

    const result =
      UNIQUE_UPLOAD_DIRECTORIES.map(
        (directory) => {

          let files = [];

          if (fs.existsSync(directory)) {

            try {

              files =
                fs.readdirSync(
                  directory
                );

            } catch (error) {

              files = [];

            }

          }

          return {

            directory,

            exists:
              fs.existsSync(
                directory
              ),

            fileCount:
              files.length,

            files

          };

        }
      );

    res.json({

      success: true,

      directories: result

    });

  }
);


// ============================================================
// DEBUG - FIND AND SERVE SINGLE IMAGE
// ============================================================

app.get(
  '/api/debug/image/:filename',
  (req, res) => {

    const filename =
      path.basename(
        req.params.filename
      );

    console.log('');
    console.log(
      '🔍 DEBUG IMAGE:',
      filename
    );

    const filePath =
      findUploadedFile(filename);

    if (!filePath) {

      return res.status(404).json({

        success: false,

        message:
          'Image not found',

        filename,

        checkedDirectories:
          UNIQUE_UPLOAD_DIRECTORIES

      });

    }

    console.log(
      '✅ DEBUG IMAGE FOUND:',
      filePath
    );

    return res.sendFile(
      filePath
    );

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

      serverFile:
        __filename,

      serverDirectory:
        __dirname,

      workingDirectory:
        process.cwd(),

      uploadDirectories:
        UNIQUE_UPLOAD_DIRECTORIES.map(
          (directory) => ({

            directory,

            exists:
              fs.existsSync(
                directory
              )

          })
        ),

      timestamp:
        new Date().toISOString()

    });

  }
);


// ============================================================
// MONGODB
// ============================================================
//
// Keep your MongoDB connection string in .env:
//
// MONGO_URI=...
//
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
    .connect(MONGO_URI)
    .then(() => {

      console.log(
        '✅ MongoDB connected'
      );

    })
    .catch((error) => {

      console.error(
        '❌ MongoDB connection error:',
        error.message
      );

    });

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
// 404 HANDLER
// ============================================================

app.use(
  notFound
);


// ============================================================
// ERROR HANDLER
// ============================================================

app.use(
  errorHandler
);


// ============================================================
// START SERVER
// ============================================================

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log('');
    console.log(
      '================================================'
    );

    console.log(
      '🚀 LEGALSCAN AI BACKEND RUNNING'
    );

    console.log(
      '================================================'
    );

    console.log(
      `🌐 API       : http://localhost:${PORT}`
    );

    console.log(
      `❤️ Health    : http://localhost:${PORT}/api/health`
    );

    console.log(
      `📂 Uploads   : http://localhost:${PORT}/uploads/`
    );

    console.log(
      `🔍 Debug     : http://localhost:${PORT}/api/debug/uploads`
    );

    console.log(
      `🖼️ Image     : http://localhost:${PORT}/uploads/<filename>`
    );

    console.log(
      '================================================'
    );

    console.log('');

  }
);