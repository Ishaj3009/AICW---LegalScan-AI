// const axios = require('axios');
// const path = require('path');
// const fs = require('fs');
// const FormData = require('form-data');
// const Image = require('../models/Image');

// /**
//  * AI Service Integration
//  * Communicates with the Python FastAPI ML microservice.
//  */
// exports.analyzeImages = async (inspection) => {
//   const AI_URL = process.env.PYTHON_AI_URL || 'http://127.0.0.1:8000';
//   const form = new FormData();
  
//   form.append('inspection_id', inspection.inspectionId);

//   // Retrieve actual image documents mapped to the inspection
//   const images = await Image.find({ inspectionId: inspection._id });
  
//   for (let img of images) {
//     const filePath = path.join(__dirname, '../../../uploads/', img.filename);
//     if (fs.existsSync(filePath)) {
//       form.append('images', fs.createReadStream(filePath), img.filename);
//     } else {
//       console.warn(`File not found for AI analysis: ${filePath}`);
//     }
//   }

//   try {
//     const response = await axios.post(`${AI_URL}/api/analyze/full-pipeline`, form, {
//       headers: {
//         ...form.getHeaders()
//       }
//     });
    
//     return response.data;
//   } catch (error) {
//     console.error("AI Service Error:", error.message);
//     if (error.response) {
//       console.error("AI Response Data:", error.response.data);
//     }
//     throw new Error('AI analysis failed to complete successfully.');
//   }
// };


const axios = require('axios');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');

const Image = require('../models/Image');


/**
 * ============================================================
 * AI SERVICE INTEGRATION
 * ============================================================
 *
 * Sends the ACTUAL uploaded inspection images to the
 * Python FastAPI AI microservice.
 *
 * Flow:
 *
 * MongoDB Inspection
 *       ↓
 * MongoDB Image records
 *       ↓
 * Local uploaded image files
 *       ↓
 * Python FastAPI
 *       ↓
 * OCR + CV + NLP + Rule Engine
 *       ↓
 * AI result
 *
 * ============================================================
 */

exports.analyzeImages = async (inspection) => {

  try {

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!inspection) {
      throw new Error(
        'Inspection information is missing.'
      );
    }

    if (!inspection.inspectionId) {
      throw new Error(
        'Inspection ID is missing.'
      );
    }


    // ========================================================
    // PYTHON AI SERVICE URL
    // ========================================================

    const AI_URL =
      process.env.PYTHON_AI_URL ||
      'http://127.0.0.1:8000';


    console.log('');
    console.log('==============================================');
    console.log('🤖 LEGALSCAN AI ANALYSIS');
    console.log('==============================================');

    console.log(
      '🆔 Inspection:',
      inspection.inspectionId
    );

    console.log(
      '🌐 AI Service:',
      AI_URL
    );


    // ========================================================
    // CREATE MULTIPART FORM
    // ========================================================

    const form = new FormData();

    form.append(
      'inspection_id',
      inspection.inspectionId
    );


    // ========================================================
    // GET ACTUAL IMAGE DOCUMENTS
    // ========================================================

    const images = await Image.find({
      inspectionId: inspection._id
    });


    console.log(
      `📷 Image records found: ${images.length}`
    );


    if (!images.length) {

      throw new Error(
        'No uploaded images found for this inspection.'
      );

    }


    // ========================================================
    // LOCATE AND ATTACH REAL IMAGE FILES
    // ========================================================

    let attachedImages = 0;


    for (const img of images) {

      if (!img.filename) {

        console.warn(
          '⚠️ Image record has no filename:',
          img._id
        );

        continue;
      }


      // IMPORTANT:
      // aiService.js is located at:
      //
      // backend/src/services/
      //
      // Therefore:
      //
      // ../../uploads/
      //
      // points to:
      //
      // backend/uploads/
      //

      const filePath = path.join(
        __dirname,
        '../../../uploads',
        img.filename
      );


      console.log(
        '🔎 Checking image:',
        filePath
      );


      if (!fs.existsSync(filePath)) {

        console.error(
          '❌ Image file NOT found:',
          filePath
        );

        continue;
      }


      const stats =
        fs.statSync(filePath);


      console.log(
        `✅ Image found: ${img.filename} (${stats.size} bytes)`
      );


      // Send image to Python AI service
      form.append(
        'images',
        fs.createReadStream(filePath),
        {
          filename: img.filename,
          contentType:
            img.mimeType ||
            'image/jpeg'
        }
      );


      attachedImages++;


      console.log(
        `📤 Attached image ${attachedImages}:`,
        img.filename
      );

    }


    // ========================================================
    // MAKE SURE AT LEAST ONE IMAGE WAS ATTACHED
    // ========================================================

    if (attachedImages === 0) {

      throw new Error(
        'No image files could be found for AI analysis. Check the upload directory.'
      );

    }


    console.log(
      `📤 Sending ${attachedImages} real image(s) to AI service...`
    );


    // ========================================================
    // CALL PYTHON FASTAPI
    // ========================================================

    const response = await axios.post(
      `${AI_URL}/api/analyze/full-pipeline`,
      form,
      {
        headers: {
          ...form.getHeaders()
        },

        maxContentLength:
          Infinity,

        maxBodyLength:
          Infinity,

        timeout:
          120000
      }
    );


    // ========================================================
    // VALIDATE RESPONSE
    // ========================================================

    console.log(
      '✅ AI service responded successfully'
    );

    console.log(
      '🤖 AI response:',
      JSON.stringify(
        response.data,
        null,
        2
      )
    );


    if (!response.data) {

      throw new Error(
        'AI service returned an empty response.'
      );

    }


    console.log(
      '=============================================='
    );


    return response.data;


  } catch (error) {

    console.error('');
    console.error(
      '❌ AI SERVICE ERROR'
    );
    console.error(
      '----------------------------------------------'
    );

    console.error(
      error.message
    );


    if (error.response) {

      console.error(
        'HTTP Status:',
        error.response.status
      );

      console.error(
        'AI Response:',
        error.response.data
      );

    }


    console.error(
      '=============================================='
    );


    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'AI analysis failed to complete successfully.'
    );

  }

};