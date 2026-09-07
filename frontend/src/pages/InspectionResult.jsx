// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShieldCheck, ShieldAlert, Check, X, Maximize2, AlertTriangle, Scale, Focus } from 'lucide-react';
// import { useSeedData } from '../context/SeedDataContext';

// const initialMockResult = {
//   inspectionId: "INS-2026-8902",
//   date: new Date().toLocaleDateString(),
//   officer: "Jane Doe",
//   product: "Premium Basmati Rice 5kg",
//   overallStatus: "REQUIRES_REVIEW",
//   confidence: 84,
//   declarations: [
//     { id: 1, field: 'MRP', detected: '₹245', expected: '₹245', confidence: 98, status: 'AI_DETECTED' },
//     { id: 2, field: 'Net Quantity', detected: '5kg', expected: '5kg', confidence: 96, status: 'AI_DETECTED' },
//     { id: 3, field: 'Manufacturer', detected: 'AgroFarms Ltd.', expected: 'AgroFarms Ltd.', confidence: 92, status: 'AI_DETECTED' }
//   ],
//   violations: [
//     {
//       id: 1,
//       rule: 'LM-PC-MRP-002',
//       field: 'MRP',
//       requirement: 'MRP must be unambiguous and non-conflicting',
//       detected: 'Front: ₹245, Back: ₹220',
//       severity: 'HIGH',
//       confidence: 94
//     }
//   ],
//   images: [
//     { url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80', angle: 'FRONT' },
//     { url: 'https://images.unsplash.com/photo-1621415174092-2374b3d172e9?w=500&q=80', angle: 'BACK' }
//   ]
// };

// const InspectionResult = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { getInspectionsWithDetails, getViolationsWithDetails } = useSeedData();
  
//   const [mockResult, setMockResult] = useState(initialMockResult);
//   const [activeImage, setActiveImage] = useState(initialMockResult.images[0]);
//   const [showEvidence, setShowEvidence] = useState(false);

//   useEffect(() => {
//     if (id) {
//       const allInspections = getInspectionsWithDetails();
//       const allViolations = getViolationsWithDetails();
      
//       const found = allInspections.find(ins => ins.id === id);
//       if (found) {
//         const foundViolations = allViolations.filter(v => v.inspectionId?.inspectionId === id).map(v => ({
//           id: v._id,
//           rule: v.ruleDetails?.rule || v.ruleId,
//           field: v.requirement,
//           requirement: v.requirement,
//           detected: v.detectedValue,
//           severity: v.severity,
//           confidence: v.confidence
//         }));

//         setMockResult(prev => ({
//           ...prev,
//           inspectionId: found.id,
//           product: found.productName,
//           date: found.date,
//           officer: found.officer || "Officer Default",
//           overallStatus: found.status === 'Compliant' ? 'COMPLIANT' : found.status === 'Violations Found' ? 'VIOLATIONS_FOUND' : 'REQUIRES_REVIEW',
//           violations: foundViolations.length > 0 ? foundViolations : prev.violations // fallback if empty
//         }));
//       }
//     }
//   }, [id, getInspectionsWithDetails, getViolationsWithDetails]);

//   return (
//     <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
//       {/* Header Section */}
//       <div className="flex justify-between items-end bg-bg-card p-8 rounded-2xl shadow-soft border border-border">
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//             <h1 className="text-3xl font-editorial font-bold text-primary">{mockResult.inspectionId}</h1>
//             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
//               mockResult.overallStatus === 'COMPLIANT' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
//             }`}>
//               {mockResult.overallStatus.replace('_', ' ')}
//             </span>
//           </div>
//           <div className="flex gap-6 text-sm text-gray-500">
//             <p><span className="font-medium text-gray-700">Product:</span> {mockResult.product}</p>
//             <p><span className="font-medium text-gray-700">Date:</span> {mockResult.date}</p>
//             <p><span className="font-medium text-gray-700">Officer:</span> {mockResult.officer}</p>
//           </div>
//         </div>
        
//         <div className="flex gap-4">
//           <button className="px-5 py-2.5 bg-bg-soft border border-border rounded-xl font-medium text-gray-700 hover:bg-gray-200 transition-colors">
//             Download PDF
//           </button>
//           <button onClick={() => setShowEvidence(true)} className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium flex items-center gap-2 shadow-md hover:bg-gray-800 transition-colors">
//             <Focus size={18} /> Evidence Viewer
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Left Column: Declarations & Violations */}
//         <div className="lg:col-span-2 space-y-8">
          
//           {/* Violations Card */}
//           {mockResult.violations.length > 0 && (
//             <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
//               <h2 className="text-lg font-editorial font-bold text-red-900 mb-4 flex items-center gap-2">
//                 <AlertTriangle size={20} className="text-red-500" />
//                 Detected Violations
//               </h2>
//               <div className="space-y-4">
//                 {mockResult.violations.map(v => (
//                   <div key={v.id} className="bg-white rounded-xl p-5 shadow-sm border border-red-100">
//                     <div className="flex justify-between items-start mb-3">
//                       <div>
//                         <span className="text-[10px] font-bold tracking-widest uppercase text-red-500 bg-red-50 px-2 py-1 rounded-md">{v.severity} SEVERITY</span>
//                         <h3 className="font-bold text-gray-900 mt-2">{v.requirement}</h3>
//                       </div>
//                       <div className="flex gap-2">
//                         <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"><Check size={18} /></button>
//                         <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"><X size={18} /></button>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 text-sm mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
//                       <div>
//                         <p className="text-gray-500 mb-1">Detected Value</p>
//                         <p className="font-medium text-red-600">{v.detected}</p>
//                       </div>
//                       <div>
//                         <p className="text-gray-500 mb-1">Rule ID</p>
//                         <p className="font-medium text-gray-900">{v.rule}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Declarations Table */}
//           <div className="bg-bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
//             <div className="p-6 border-b border-border">
//               <h2 className="text-lg font-editorial font-bold text-primary">Extracted Declarations</h2>
//             </div>
//             <table className="w-full text-left text-sm">
//               <thead className="bg-bg-soft text-gray-500">
//                 <tr>
//                   <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Field</th>
//                   <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Detected Value</th>
//                   <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Confidence</th>
//                   <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-border">
//                 {mockResult.declarations.map(dec => (
//                   <tr key={dec.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 font-medium text-gray-900">{dec.field}</td>
//                     <td className="px-6 py-4">{dec.detected}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                           <div className="h-full bg-green-500" style={{ width: `${dec.confidence}%` }}></div>
//                         </div>
//                         <span className="text-xs text-gray-500">{dec.confidence}%</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
//                         {dec.status.replace('_', ' ')}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Right Column: Image Preview */}
//         <div className="bg-bg-card rounded-2xl border border-border shadow-soft p-6 h-fit">
//           <h2 className="text-lg font-editorial font-bold text-primary mb-4">Analyzed Packages</h2>
//           <div className="space-y-4">
//             <div className="relative rounded-xl overflow-hidden border border-border group cursor-pointer" onClick={() => setShowEvidence(true)}>
//               <img src={activeImage.url} alt="Product" className="w-full h-64 object-cover" />
//               <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                 <Maximize2 className="text-white" size={32} />
//               </div>
//               <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{activeImage.angle}</div>
//             </div>
//             <div className="grid grid-cols-4 gap-2">
//               {mockResult.images.map((img, idx) => (
//                 <button 
//                   key={idx} 
//                   onClick={() => setActiveImage(img)}
//                   className={`rounded-lg overflow-hidden border-2 transition-all ${activeImage.url === img.url ? 'border-accent ring-2 ring-accent/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
//                 >
//                   <img src={img.url} className="w-full h-16 object-cover" alt={img.angle} />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Evidence Viewer Overlay */}
//       {showEvidence && (
//         <div className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-50 flex">
//           <div className="flex-1 p-8 flex items-center justify-center relative">
//             <button onClick={() => setShowEvidence(false)} className="absolute top-6 left-6 text-white hover:text-accent transition-colors bg-white/10 p-3 rounded-xl backdrop-blur-md">
//               <X size={24} />
//             </button>
//             <div className="relative max-w-3xl w-full h-full flex items-center justify-center">
//               <img src={activeImage.url} alt="Evidence" className="max-h-full rounded-2xl shadow-2xl object-contain" />
//               {/* Mock Bounding Box */}
//               <div className="absolute top-[30%] left-[40%] w-32 h-16 border-2 border-accent bg-accent/20 rounded cursor-pointer group">
//                 <div className="absolute -top-8 left-0 bg-white text-primary text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
//                   MRP: ₹245 (98%)
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="w-96 bg-bg-base h-full border-l border-border/20 shadow-2xl flex flex-col">
//             <div className="p-6 border-b border-border bg-white">
//               <h2 className="text-xl font-editorial font-bold text-primary">Evidence Review</h2>
//               <p className="text-sm text-gray-500 mt-1">Verify AI extractions manually.</p>
//             </div>
            
//             <div className="flex-1 overflow-y-auto p-6 space-y-6">
//               {mockResult.declarations.map(dec => (
//                 <div key={dec.id} className="bg-white border border-border p-5 rounded-xl shadow-sm hover:border-accent/50 transition-colors cursor-pointer group">
//                   <div className="flex justify-between items-start mb-2">
//                     <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{dec.field}</span>
//                     <span className="text-xs font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded">{dec.confidence}%</span>
//                   </div>
//                   <p className="text-lg font-bold text-primary mb-4">{dec.detected}</p>
//                   <div className="flex gap-2">
//                     <button className="flex-1 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-200 text-gray-600 hover:text-green-700 py-2 rounded-lg text-sm font-medium transition-all flex justify-center items-center gap-1">
//                       <Check size={16} /> Confirm
//                     </button>
//                     <button className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium transition-all">
//                       Edit
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default InspectionResult;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Check,
  X,
  Maximize2,
  AlertTriangle,
  Focus,
  Loader2
} from 'lucide-react';

import { inspectionsAPI } from '../services/api';


// ============================================================
// BACKEND URL
// ============================================================

const BACKEND_URL = 'http://localhost:5000';


// ============================================================
// HELPER - IMAGE URL
// ============================================================

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';

  if (
    imageUrl.startsWith('http://') ||
    imageUrl.startsWith('https://')
  ) {
    return imageUrl;
  }

  return `${BACKEND_URL}${imageUrl}`;
};


// ============================================================
// INSPECTION RESULT
// ============================================================

const InspectionResult = () => {

  const { id } = useParams();

  const [inspection, setInspection] = useState(null);

  const [activeImage, setActiveImage] = useState(null);

  const [showEvidence, setShowEvidence] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState('');


  // ==========================================================
  // LOAD REAL INSPECTION
  // ==========================================================

  useEffect(() => {

    const loadInspection = async () => {

      if (!id) {
        setError('Inspection ID is missing.');
        setIsLoading(false);
        return;
      }

      try {

        console.log(
          '🔍 Loading real inspection:',
          id
        );

        setIsLoading(true);
        setError('');

        const response =
          await inspectionsAPI.getById(id);

        console.log(
          '✅ Inspection result received:',
          response.data
        );

        const inspectionData =
          response.data?.data ||
          response.data?.inspection ||
          response.data;

        if (!inspectionData) {
          throw new Error(
            'Inspection data was not returned by the server.'
          );
        }

        setInspection(inspectionData);


        // Set first uploaded image as active image
        if (
          Array.isArray(inspectionData.images) &&
          inspectionData.images.length > 0
        ) {

          const firstImage =
            inspectionData.images[0];

          setActiveImage({
            ...firstImage,
            url: getImageUrl(
              firstImage.imageUrl ||
              firstImage.url
            ),
            angle:
              firstImage.angle ||
              'UNKNOWN'
          });

        }

      } catch (err) {

        console.error(
          '❌ Failed to load inspection:',
          err.response?.data || err
        );

        setError(
          err.response?.data?.message ||
          err.message ||
          'Failed to load inspection results.'
        );

      } finally {

        setIsLoading(false);

      }

    };


    loadInspection();

  }, [id]);


  // ==========================================================
  // LOADING
  // ==========================================================

  if (isLoading) {

    return (
      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="text-center">

          <Loader2
            size={40}
            className="animate-spin mx-auto text-primary"
          />

          <p className="mt-4 text-gray-500">
            Loading inspection results...
          </p>

        </div>

      </div>
    );

  }


  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {

    return (
      <div className="max-w-4xl mx-auto mt-10">

        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">

          <div className="flex items-center gap-3">

            <AlertTriangle size={22} />

            <div>

              <h2 className="font-bold">
                Unable to load inspection
              </h2>

              <p className="text-sm mt-1">
                {error}
              </p>

            </div>

          </div>

        </div>

      </div>
    );

  }


  if (!inspection) {
    return null;
  }


  // ==========================================================
  // PREPARE DATA
  // ==========================================================

  const inspectionId =
    inspection.inspectionId ||
    inspection._id ||
    id;


  const productName =
    inspection.productId?.productName ||
    inspection.commodityName ||
    'Product';


  const officerName =
    inspection.officerId?.name ||
    'Officer';


  const date = inspection.inspectionDate
    ? new Date(
        inspection.inspectionDate
      ).toLocaleDateString('en-IN')
    : inspection.createdAt
      ? new Date(
          inspection.createdAt
        ).toLocaleDateString('en-IN')
      : '-';


  const violations =
    Array.isArray(inspection.violations)
      ? inspection.violations
      : [];


  const declarations =
    Array.isArray(inspection.declarations)
      ? inspection.declarations
      : [];


  const images =
    Array.isArray(inspection.images)
      ? inspection.images.map((image) => ({
          ...image,
          url: getImageUrl(
            image.imageUrl ||
            image.url
          ),
          angle:
            image.angle ||
            'UNKNOWN'
        }))
      : [];


  const overallStatus =
    inspection.complianceStatus ||
    'REQUIRES_REVIEW';


  const statusLabel =
    overallStatus
      .replaceAll('_', ' ');


  // ==========================================================
  // IMAGE SELECTION
  // ==========================================================

  const selectImage = (image) => {
    setActiveImage(image);
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="max-w-7xl mx-auto space-y-8 pb-10">


      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex justify-between items-end bg-bg-card p-8 rounded-2xl shadow-soft border border-border">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <h1 className="text-3xl font-editorial font-bold text-primary">
              {inspectionId}
            </h1>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                overallStatus === 'COMPLIANT'
                  ? 'bg-green-100 text-green-700'
                  : overallStatus === 'POTENTIAL_VIOLATION'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-orange-100 text-orange-700'
              }`}
            >
              {statusLabel}
            </span>

          </div>


          <div className="flex gap-6 text-sm text-gray-500">

            <p>
              <span className="font-medium text-gray-700">
                Product:
              </span>{' '}
              {productName}
            </p>

            <p>
              <span className="font-medium text-gray-700">
                Date:
              </span>{' '}
              {date}
            </p>

            <p>
              <span className="font-medium text-gray-700">
                Officer:
              </span>{' '}
              {officerName}
            </p>

          </div>

        </div>


        <div className="flex gap-4">

          <button
            type="button"
            className="px-5 py-2.5 bg-bg-soft border border-border rounded-xl font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Download PDF
          </button>


          {activeImage && (

            <button
              type="button"
              onClick={() =>
                setShowEvidence(true)
              }
              className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium flex items-center gap-2 shadow-md hover:bg-gray-800"
            >
              <Focus size={18} />
              Evidence Viewer
            </button>

          )}

        </div>

      </div>


      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


        {/* ====================================================
            LEFT
        ==================================================== */}

        <div className="lg:col-span-2 space-y-8">


          {/* ==================================================
              VIOLATIONS
          ================================================== */}

          {violations.length > 0 ? (

            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">

              <h2 className="text-lg font-editorial font-bold text-red-900 mb-4 flex items-center gap-2">

                <AlertTriangle
                  size={20}
                  className="text-red-500"
                />

                Detected Violations

              </h2>


              <div className="space-y-4">

                {violations.map(
                  (violation, index) => (

                    <div
                      key={
                        violation._id ||
                        violation.id ||
                        index
                      }
                      className="bg-white rounded-xl p-5 shadow-sm border border-red-100"
                    >

                      <div className="flex justify-between items-start mb-3">

                        <div>

                          <span className="text-[10px] font-bold tracking-widest uppercase text-red-500 bg-red-50 px-2 py-1 rounded-md">

                            {String(
                              violation.severity ||
                              'MEDIUM'
                            ).toUpperCase()}{' '}
                            SEVERITY

                          </span>


                          <h3 className="font-bold text-gray-900 mt-2">

                            {violation.requirement ||
                              violation.field ||
                              'Compliance violation'}

                          </h3>

                        </div>


                        <div className="flex gap-2">

                          <button
                            type="button"
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <Check size={18} />
                          </button>

                          <button
                            type="button"
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X size={18} />
                          </button>

                        </div>

                      </div>


                      <div className="grid grid-cols-2 gap-4 text-sm mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">

                        <div>

                          <p className="text-gray-500 mb-1">
                            Detected Value
                          </p>

                          <p className="font-medium text-red-600">

                            {violation.detectedValue ||
                              violation.detected ||
                              'Not available'}

                          </p>

                        </div>


                        <div>

                          <p className="text-gray-500 mb-1">
                            Rule ID
                          </p>

                          <p className="font-medium text-gray-900">

                            {violation.ruleId ||
                              violation.rule ||
                              'UNKNOWN'}

                          </p>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          ) : (

            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">

              <div className="flex items-center gap-3">

                <Check
                  size={22}
                  className="text-green-600"
                />

                <div>

                  <h2 className="font-bold text-green-800">
                    No violations detected
                  </h2>

                  <p className="text-sm text-green-700 mt-1">
                    The AI analysis did not identify any
                    violations in the uploaded package.
                  </p>

                </div>

              </div>

            </div>

          )}


          {/* ==================================================
              DECLARATIONS
          ================================================== */}

          <div className="bg-bg-card rounded-2xl border border-border shadow-soft overflow-hidden">

            <div className="p-6 border-b border-border">

              <h2 className="text-lg font-editorial font-bold text-primary">
                Extracted Declarations
              </h2>

            </div>


            {declarations.length > 0 ? (

              <table className="w-full text-left text-sm">

                <thead className="bg-bg-soft text-gray-500">

                  <tr>

                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                      Field
                    </th>

                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                      Detected Value
                    </th>

                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                      Confidence
                    </th>

                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-border">

                  {declarations.map(
                    (dec, index) => {

                      const confidence =
                        Number(
                          dec.confidence || 0
                        );

                      return (

                        <tr
                          key={
                            dec._id ||
                            dec.id ||
                            index
                          }
                          className="hover:bg-gray-50"
                        >

                          <td className="px-6 py-4 font-medium text-gray-900">
                            {dec.field || '-'}
                          </td>

                          <td className="px-6 py-4">
                            {dec.value || '-'}
                          </td>

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-2">

                              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">

                                <div
                                  className="h-full bg-green-500"
                                  style={{
                                    width: `${Math.min(
                                      confidence,
                                      100
                                    )}%`
                                  }}
                                />

                              </div>

                              <span className="text-xs text-gray-500">
                                {confidence}%
                              </span>

                            </div>

                          </td>

                          <td className="px-6 py-4">

                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">

                              {String(
                                dec.verificationStatus ||
                                'AI_DETECTED'
                              ).replaceAll(
                                '_',
                                ' '
                              )}

                            </span>

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            ) : (

              <div className="p-8 text-center text-gray-400">

                No declarations extracted yet.

              </div>

            )}

          </div>

        </div>


        {/* ====================================================
            RIGHT - IMAGES
        ==================================================== */}

        <div className="bg-bg-card rounded-2xl border border-border shadow-soft p-6 h-fit">

          <h2 className="text-lg font-editorial font-bold text-primary mb-4">
            Analyzed Packages
          </h2>


          {images.length > 0 ? (

            <div className="space-y-4">

              {activeImage && (

                <div
                  className="relative rounded-xl overflow-hidden border border-border group cursor-pointer"
                  onClick={() =>
                    setShowEvidence(true)
                  }
                >

                  <img
                    src={activeImage.url}
                    alt={
                      activeImage.angle ||
                      'Product'
                    }
                    className="w-full h-64 object-cover"
                  />

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

                    <Maximize2
                      className="text-white"
                      size={32}
                    />

                  </div>


                  <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">

                    {activeImage.angle}

                  </div>

                </div>

              )}


              <div className="grid grid-cols-4 gap-2">

                {images.map(
                  (image, index) => (

                    <button
                      type="button"
                      key={
                        image._id ||
                        index
                      }
                      onClick={() =>
                        selectImage(image)
                      }
                      className={`rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage?.url ===
                        image.url
                          ? 'border-accent ring-2 ring-accent/20'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >

                      <img
                        src={image.url}
                        className="w-full h-16 object-cover"
                        alt={
                          image.angle ||
                          'Product'
                        }
                      />

                    </button>

                  )
                )}

              </div>

            </div>

          ) : (

            <div className="h-64 flex items-center justify-center text-sm text-gray-400">

              No images uploaded for this inspection.

            </div>

          )}

        </div>

      </div>


      {/* ======================================================
          EVIDENCE VIEWER
      ====================================================== */}

      {showEvidence && activeImage && (

        <div className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-50 flex">

          <div className="flex-1 p-8 flex items-center justify-center relative">

            <button
              type="button"
              onClick={() =>
                setShowEvidence(false)
              }
              className="absolute top-6 left-6 text-white hover:text-accent bg-white/10 p-3 rounded-xl"
            >
              <X size={24} />
            </button>


            <div className="relative max-w-4xl w-full h-full flex items-center justify-center">

              <img
                src={activeImage.url}
                alt="Evidence"
                className="max-h-full max-w-full rounded-2xl shadow-2xl object-contain"
              />

            </div>

          </div>


          <div className="w-96 bg-bg-base h-full border-l border-border/20 shadow-2xl flex flex-col">

            <div className="p-6 border-b border-border bg-white">

              <h2 className="text-xl font-editorial font-bold text-primary">
                Evidence Review
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Review uploaded package evidence.
              </p>

            </div>


            <div className="p-6">

              <div className="bg-white border border-border p-5 rounded-xl">

                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Image Angle
                </span>

                <p className="text-lg font-bold text-primary mt-2">
                  {activeImage.angle}
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );
};


export default InspectionResult;