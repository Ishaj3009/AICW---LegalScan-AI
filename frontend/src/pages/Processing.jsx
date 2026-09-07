// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Loader2, CheckCircle2, Image, BrainCircuit, FileText, Scale, Database, Search } from 'lucide-react';
// import { motion } from 'framer-motion';

// const STAGES = [
//   { id: 1, name: 'Image Preprocessing & Quality Check', icon: Image },
//   { id: 2, name: 'CNN Visual Classification', icon: BrainCircuit },
//   { id: 3, name: 'OCR Text Extraction', icon: Search },
//   { id: 4, name: 'NLP Field Extraction', icon: FileText },
//   { id: 5, name: 'Rule Engine Validation', icon: Scale },
//   { id: 6, name: 'Evidence Generation', icon: Database },
// ];

// const Processing = () => {
//   const navigate = useNavigate();
//   const [activeStage, setActiveStage] = useState(1);

//   useEffect(() => {
//     // Simulate AI pipeline progressing
//     const intervals = [];
    
//     let current = 1;
//     const timer = setInterval(() => {
//       current++;
//       if (current > 6) {
//         clearInterval(timer);
//         // Add slight delay before redirecting to results
//         setTimeout(() => navigate('/results/INS-2026-8902'), 1000); 
//       } else {
//         setActiveStage(current);
//       }
//     }, 1200);

//     return () => clearInterval(timer);
//   }, [navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto">
//       <div className="text-center mb-10">
//         <div className="relative w-24 h-24 mx-auto mb-6">
//           <motion.div 
//             animate={{ rotate: 360 }}
//             transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
//             className="absolute inset-0 rounded-full border-4 border-dashed border-accent/30"
//           />
//           <motion.div 
//             animate={{ rotate: -360 }}
//             transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
//             className="absolute inset-2 rounded-full border-4 border-dotted border-primary/20"
//           />
//           <div className="absolute inset-0 flex items-center justify-center text-primary">
//             <BrainCircuit size={40} />
//           </div>
//         </div>
//         <h2 className="text-3xl font-editorial font-bold text-primary mb-2">Analyzing Packaging...</h2>
//         <p className="text-gray-500">LegalScan AI is inspecting the uploaded multi-angle images.</p>
//       </div>

//       <div className="w-full bg-bg-card border border-border rounded-2xl p-6 shadow-soft">
//         <div className="space-y-4">
//           {STAGES.map((stage) => {
//             const Icon = stage.icon;
//             const isCompleted = activeStage > stage.id;
//             const isProcessing = activeStage === stage.id;
//             const isPending = activeStage < stage.id;
            
//             return (
//               <div key={stage.id} className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
//                 isProcessing ? 'bg-bg-soft ring-1 ring-border shadow-inner scale-[1.02]' : 
//                 isCompleted ? 'opacity-70' : 'opacity-40'
//               }`}>
//                 <div className={`p-2 rounded-lg mr-4 ${
//                   isCompleted ? 'bg-green-100 text-green-600' :
//                   isProcessing ? 'bg-accent/10 text-accent' :
//                   'bg-gray-100 text-gray-400'
//                 }`}>
//                   {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={20} />}
//                 </div>
                
//                 <div className="flex-1">
//                   <p className={`font-medium ${isProcessing ? 'text-primary' : 'text-gray-700'}`}>{stage.name}</p>
//                 </div>

//                 <div className="text-sm font-medium">
//                   {isCompleted && <span className="text-green-600">Completed</span>}
//                   {isProcessing && (
//                     <span className="text-accent flex items-center gap-2">
//                       <Loader2 size={14} className="animate-spin" /> Processing
//                     </span>
//                   )}
//                   {isPending && <span className="text-gray-400">Pending</span>}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Processing;


import React, { useEffect, useState } from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  Loader2,
  CheckCircle2,
  Image,
  BrainCircuit,
  FileText,
  Scale,
  Database,
  Search,
  AlertCircle
} from 'lucide-react';

import { motion } from 'framer-motion';

import { inspectionsAPI } from '../services/api';


// ============================================================
// PROCESSING STAGES
// ============================================================

const STAGES = [
  {
    id: 1,
    name: 'Image Preprocessing & Quality Check',
    icon: Image
  },
  {
    id: 2,
    name: 'CNN Visual Classification',
    icon: BrainCircuit
  },
  {
    id: 3,
    name: 'OCR Text Extraction',
    icon: Search
  },
  {
    id: 4,
    name: 'NLP Field Extraction',
    icon: FileText
  },
  {
    id: 5,
    name: 'Rule Engine Validation',
    icon: Scale
  },
  {
    id: 6,
    name: 'Evidence Generation',
    icon: Database
  }
];


// ============================================================
// PROCESSING COMPONENT
// ============================================================

const Processing = () => {

  const navigate = useNavigate();

  const { inspectionId } = useParams();
  console.log('🔥 Processing inspectionId:', inspectionId);


  const [activeStage, setActiveStage] =
    useState(1);

  const [error, setError] =
    useState('');

  const [isAnalyzing, setIsAnalyzing] =
    useState(true);


  // ==========================================================
  // REAL AI ANALYSIS
  // ==========================================================

  useEffect(() => {

    let stageTimer;

    let mounted = true;


    const startAnalysis = async () => {

      // ------------------------------------------------------
      // Validate inspection ID
      // ------------------------------------------------------

      if (!inspectionId) {

        setError(
          'Inspection ID is missing.'
        );

        setIsAnalyzing(false);

        return;
      }


      console.log(
        '🤖 Starting analysis for:',
        inspectionId
      );


      try {

        // ----------------------------------------------------
        // Visual progress animation
        // ----------------------------------------------------

        let currentStage = 1;

        stageTimer = setInterval(() => {

          if (!mounted) {
            return;
          }

          if (currentStage < 5) {

            currentStage += 1;

            setActiveStage(
              currentStage
            );

          }

        }, 1000);


        // ----------------------------------------------------
        // CALL REAL BACKEND AI ANALYSIS
        // ----------------------------------------------------

        const response =
          await inspectionsAPI.analyze(
            inspectionId
          );


        console.log(
          '✅ AI analysis response:',
          response.data
        );


        // ----------------------------------------------------
        // Finish all stages
        // ----------------------------------------------------

        if (mounted) {

          clearInterval(stageTimer);

          setActiveStage(6);

        }


        // ----------------------------------------------------
        // Give UI a moment to show completion
        // ----------------------------------------------------

        setTimeout(() => {

          if (!mounted) {
            return;
          }

          console.log(
            '➡️ Opening results:',
            inspectionId
          );


          navigate(
            `/results/${inspectionId}`,
            { replace: true }
          );

        }, 1200);


      } catch (err) {

        if (!mounted) {
          return;
        }

        clearInterval(stageTimer);

        console.error(
          '❌ AI analysis failed:',
          err.response?.data || err
        );


        setError(
          err.response?.data?.message ||
          err.message ||
          'AI analysis failed. Please try again.'
        );


        setIsAnalyzing(false);

      }

    };


    startAnalysis();


    // --------------------------------------------------------
    // Cleanup
    // --------------------------------------------------------

    return () => {

      mounted = false;

      if (stageTimer) {
        clearInterval(stageTimer);
      }

    };

  }, [inspectionId, navigate]);


  // ==========================================================
  // RETRY
  // ==========================================================

  const handleRetry = () => {

    window.location.reload();

  };


  // ==========================================================
  // ERROR SCREEN
  // ==========================================================

  if (error) {

    return (

      <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto px-6">

        <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-8 text-center">

          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5">

            <AlertCircle size={32} />

          </div>


          <h2 className="text-2xl font-editorial font-bold text-red-900 mb-2">

            AI Analysis Failed

          </h2>


          <p className="text-red-700 mb-2">

            Inspection:

            <span className="font-semibold ml-1">
              {inspectionId || 'Unknown'}
            </span>

          </p>


          <p className="text-sm text-red-600 mb-6">

            {error}

          </p>


          <button
            type="button"
            onClick={handleRetry}
            className="bg-primary hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-medium"
          >
            Retry Analysis
          </button>

        </div>

      </div>

    );

  }


  // ==========================================================
  // MAIN PROCESSING SCREEN
  // ==========================================================

  return (

    <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="text-center mb-10">

        <div className="relative w-24 h-24 mx-auto mb-6">

          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: 'linear'
            }}
            className="absolute inset-0 rounded-full border-4 border-dashed border-accent/30"
          />


          <motion.div
            animate={{
              rotate: -360
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: 'linear'
            }}
            className="absolute inset-2 rounded-full border-4 border-dotted border-primary/20"
          />


          <div className="absolute inset-0 flex items-center justify-center text-primary">

            {isAnalyzing ? (
              <BrainCircuit size={40} />
            ) : (
              <CheckCircle2
                size={40}
                className="text-green-600"
              />
            )}

          </div>

        </div>


        <h2 className="text-3xl font-editorial font-bold text-primary mb-2">

          Analyzing Packaging...

        </h2>


        <p className="text-gray-500">

          LegalScan AI is inspecting the uploaded
          multi-angle images.

        </p>


        {inspectionId && (

          <div className="mt-3 inline-flex items-center px-3 py-1.5 bg-bg-soft rounded-lg text-xs font-medium text-gray-500">

            Inspection:

            <span className="ml-1 text-primary font-semibold">
              {inspectionId}
            </span>

          </div>

        )}

      </div>


      {/* ====================================================
          PROCESSING CARD
      ==================================================== */}

      <div className="w-full bg-bg-card border border-border rounded-2xl p-6 shadow-soft">

        <div className="space-y-4">

          {STAGES.map((stage) => {

            const Icon = stage.icon;

            const isCompleted =
              activeStage > stage.id;

            const isProcessing =
              activeStage === stage.id;

            const isPending =
              activeStage < stage.id;


            return (

              <div
                key={stage.id}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
                  isProcessing
                    ? 'bg-bg-soft ring-1 ring-border shadow-inner scale-[1.02]'
                    : isCompleted
                      ? 'opacity-70'
                      : 'opacity-40'
                }`}
              >

                {/* ICON */}

                <div
                  className={`p-2 rounded-lg mr-4 ${
                    isCompleted
                      ? 'bg-green-100 text-green-600'
                      : isProcessing
                        ? 'bg-accent/10 text-accent'
                        : 'bg-gray-100 text-gray-400'
                  }`}
                >

                  {isCompleted ? (

                    <CheckCircle2 size={20} />

                  ) : (

                    <Icon size={20} />

                  )}

                </div>


                {/* STAGE NAME */}

                <div className="flex-1">

                  <p
                    className={`font-medium ${
                      isProcessing
                        ? 'text-primary'
                        : 'text-gray-700'
                    }`}
                  >

                    {stage.name}

                  </p>

                </div>


                {/* STATUS */}

                <div className="text-sm font-medium">

                  {isCompleted && (

                    <span className="text-green-600">
                      Completed
                    </span>

                  )}


                  {isProcessing && (

                    <span className="text-accent flex items-center gap-2">

                      <Loader2
                        size={14}
                        className="animate-spin"
                      />

                      Processing

                    </span>

                  )}


                  {isPending && (

                    <span className="text-gray-400">
                      Pending
                    </span>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

};


export default Processing;