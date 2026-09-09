// // // // import React, { useState, useEffect } from 'react';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import { ShieldCheck, ShieldAlert, Check, X, Maximize2, AlertTriangle, Scale, Focus } from 'lucide-react';
// // // // import { useSeedData } from '../context/SeedDataContext';

// // // // const initialMockResult = {
// // // //   inspectionId: "INS-2026-8902",
// // // //   date: new Date().toLocaleDateString(),
// // // //   officer: "Jane Doe",
// // // //   product: "Premium Basmati Rice 5kg",
// // // //   overallStatus: "REQUIRES_REVIEW",
// // // //   confidence: 84,
// // // //   declarations: [
// // // //     { id: 1, field: 'MRP', detected: '₹245', expected: '₹245', confidence: 98, status: 'AI_DETECTED' },
// // // //     { id: 2, field: 'Net Quantity', detected: '5kg', expected: '5kg', confidence: 96, status: 'AI_DETECTED' },
// // // //     { id: 3, field: 'Manufacturer', detected: 'AgroFarms Ltd.', expected: 'AgroFarms Ltd.', confidence: 92, status: 'AI_DETECTED' }
// // // //   ],
// // // //   violations: [
// // // //     {
// // // //       id: 1,
// // // //       rule: 'LM-PC-MRP-002',
// // // //       field: 'MRP',
// // // //       requirement: 'MRP must be unambiguous and non-conflicting',
// // // //       detected: 'Front: ₹245, Back: ₹220',
// // // //       severity: 'HIGH',
// // // //       confidence: 94
// // // //     }
// // // //   ],
// // // //   images: [
// // // //     { url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80', angle: 'FRONT' },
// // // //     { url: 'https://images.unsplash.com/photo-1621415174092-2374b3d172e9?w=500&q=80', angle: 'BACK' }
// // // //   ]
// // // // };

// // // // const InspectionResult = () => {
// // // //   const { id } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const { getInspectionsWithDetails, getViolationsWithDetails } = useSeedData();
  
// // // //   const [mockResult, setMockResult] = useState(initialMockResult);
// // // //   const [activeImage, setActiveImage] = useState(initialMockResult.images[0]);
// // // //   const [showEvidence, setShowEvidence] = useState(false);

// // // //   useEffect(() => {
// // // //     if (id) {
// // // //       const allInspections = getInspectionsWithDetails();
// // // //       const allViolations = getViolationsWithDetails();
      
// // // //       const found = allInspections.find(ins => ins.id === id);
// // // //       if (found) {
// // // //         const foundViolations = allViolations.filter(v => v.inspectionId?.inspectionId === id).map(v => ({
// // // //           id: v._id,
// // // //           rule: v.ruleDetails?.rule || v.ruleId,
// // // //           field: v.requirement,
// // // //           requirement: v.requirement,
// // // //           detected: v.detectedValue,
// // // //           severity: v.severity,
// // // //           confidence: v.confidence
// // // //         }));

// // // //         setMockResult(prev => ({
// // // //           ...prev,
// // // //           inspectionId: found.id,
// // // //           product: found.productName,
// // // //           date: found.date,
// // // //           officer: found.officer || "Officer Default",
// // // //           overallStatus: found.status === 'Compliant' ? 'COMPLIANT' : found.status === 'Violations Found' ? 'VIOLATIONS_FOUND' : 'REQUIRES_REVIEW',
// // // //           violations: foundViolations.length > 0 ? foundViolations : prev.violations // fallback if empty
// // // //         }));
// // // //       }
// // // //     }
// // // //   }, [id, getInspectionsWithDetails, getViolationsWithDetails]);

// // // //   return (
// // // //     <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
// // // //       {/* Header Section */}
// // // //       <div className="flex justify-between items-end bg-bg-card p-8 rounded-2xl shadow-soft border border-border">
// // // //         <div>
// // // //           <div className="flex items-center gap-3 mb-2">
// // // //             <h1 className="text-3xl font-editorial font-bold text-primary">{mockResult.inspectionId}</h1>
// // // //             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
// // // //               mockResult.overallStatus === 'COMPLIANT' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
// // // //             }`}>
// // // //               {mockResult.overallStatus.replace('_', ' ')}
// // // //             </span>
// // // //           </div>
// // // //           <div className="flex gap-6 text-sm text-gray-500">
// // // //             <p><span className="font-medium text-gray-700">Product:</span> {mockResult.product}</p>
// // // //             <p><span className="font-medium text-gray-700">Date:</span> {mockResult.date}</p>
// // // //             <p><span className="font-medium text-gray-700">Officer:</span> {mockResult.officer}</p>
// // // //           </div>
// // // //         </div>
        
// // // //         <div className="flex gap-4">
// // // //           <button className="px-5 py-2.5 bg-bg-soft border border-border rounded-xl font-medium text-gray-700 hover:bg-gray-200 transition-colors">
// // // //             Download PDF
// // // //           </button>
// // // //           <button onClick={() => setShowEvidence(true)} className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium flex items-center gap-2 shadow-md hover:bg-gray-800 transition-colors">
// // // //             <Focus size={18} /> Evidence Viewer
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
// // // //         {/* Left Column: Declarations & Violations */}
// // // //         <div className="lg:col-span-2 space-y-8">
          
// // // //           {/* Violations Card */}
// // // //           {mockResult.violations.length > 0 && (
// // // //             <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
// // // //               <h2 className="text-lg font-editorial font-bold text-red-900 mb-4 flex items-center gap-2">
// // // //                 <AlertTriangle size={20} className="text-red-500" />
// // // //                 Detected Violations
// // // //               </h2>
// // // //               <div className="space-y-4">
// // // //                 {mockResult.violations.map(v => (
// // // //                   <div key={v.id} className="bg-white rounded-xl p-5 shadow-sm border border-red-100">
// // // //                     <div className="flex justify-between items-start mb-3">
// // // //                       <div>
// // // //                         <span className="text-[10px] font-bold tracking-widest uppercase text-red-500 bg-red-50 px-2 py-1 rounded-md">{v.severity} SEVERITY</span>
// // // //                         <h3 className="font-bold text-gray-900 mt-2">{v.requirement}</h3>
// // // //                       </div>
// // // //                       <div className="flex gap-2">
// // // //                         <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"><Check size={18} /></button>
// // // //                         <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"><X size={18} /></button>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="grid grid-cols-2 gap-4 text-sm mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
// // // //                       <div>
// // // //                         <p className="text-gray-500 mb-1">Detected Value</p>
// // // //                         <p className="font-medium text-red-600">{v.detected}</p>
// // // //                       </div>
// // // //                       <div>
// // // //                         <p className="text-gray-500 mb-1">Rule ID</p>
// // // //                         <p className="font-medium text-gray-900">{v.rule}</p>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {/* Declarations Table */}
// // // //           <div className="bg-bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
// // // //             <div className="p-6 border-b border-border">
// // // //               <h2 className="text-lg font-editorial font-bold text-primary">Extracted Declarations</h2>
// // // //             </div>
// // // //             <table className="w-full text-left text-sm">
// // // //               <thead className="bg-bg-soft text-gray-500">
// // // //                 <tr>
// // // //                   <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Field</th>
// // // //                   <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Detected Value</th>
// // // //                   <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Confidence</th>
// // // //                   <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Status</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody className="divide-y divide-border">
// // // //                 {mockResult.declarations.map(dec => (
// // // //                   <tr key={dec.id} className="hover:bg-gray-50 transition-colors">
// // // //                     <td className="px-6 py-4 font-medium text-gray-900">{dec.field}</td>
// // // //                     <td className="px-6 py-4">{dec.detected}</td>
// // // //                     <td className="px-6 py-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
// // // //                           <div className="h-full bg-green-500" style={{ width: `${dec.confidence}%` }}></div>
// // // //                         </div>
// // // //                         <span className="text-xs text-gray-500">{dec.confidence}%</span>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="px-6 py-4">
// // // //                       <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
// // // //                         {dec.status.replace('_', ' ')}
// // // //                       </span>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         </div>

// // // //         {/* Right Column: Image Preview */}
// // // //         <div className="bg-bg-card rounded-2xl border border-border shadow-soft p-6 h-fit">
// // // //           <h2 className="text-lg font-editorial font-bold text-primary mb-4">Analyzed Packages</h2>
// // // //           <div className="space-y-4">
// // // //             <div className="relative rounded-xl overflow-hidden border border-border group cursor-pointer" onClick={() => setShowEvidence(true)}>
// // // //               <img src={activeImage.url} alt="Product" className="w-full h-64 object-cover" />
// // // //               <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
// // // //                 <Maximize2 className="text-white" size={32} />
// // // //               </div>
// // // //               <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{activeImage.angle}</div>
// // // //             </div>
// // // //             <div className="grid grid-cols-4 gap-2">
// // // //               {mockResult.images.map((img, idx) => (
// // // //                 <button 
// // // //                   key={idx} 
// // // //                   onClick={() => setActiveImage(img)}
// // // //                   className={`rounded-lg overflow-hidden border-2 transition-all ${activeImage.url === img.url ? 'border-accent ring-2 ring-accent/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
// // // //                 >
// // // //                   <img src={img.url} className="w-full h-16 object-cover" alt={img.angle} />
// // // //                 </button>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Evidence Viewer Overlay */}
// // // //       {showEvidence && (
// // // //         <div className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-50 flex">
// // // //           <div className="flex-1 p-8 flex items-center justify-center relative">
// // // //             <button onClick={() => setShowEvidence(false)} className="absolute top-6 left-6 text-white hover:text-accent transition-colors bg-white/10 p-3 rounded-xl backdrop-blur-md">
// // // //               <X size={24} />
// // // //             </button>
// // // //             <div className="relative max-w-3xl w-full h-full flex items-center justify-center">
// // // //               <img src={activeImage.url} alt="Evidence" className="max-h-full rounded-2xl shadow-2xl object-contain" />
// // // //               {/* Mock Bounding Box */}
// // // //               <div className="absolute top-[30%] left-[40%] w-32 h-16 border-2 border-accent bg-accent/20 rounded cursor-pointer group">
// // // //                 <div className="absolute -top-8 left-0 bg-white text-primary text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
// // // //                   MRP: ₹245 (98%)
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="w-96 bg-bg-base h-full border-l border-border/20 shadow-2xl flex flex-col">
// // // //             <div className="p-6 border-b border-border bg-white">
// // // //               <h2 className="text-xl font-editorial font-bold text-primary">Evidence Review</h2>
// // // //               <p className="text-sm text-gray-500 mt-1">Verify AI extractions manually.</p>
// // // //             </div>
            
// // // //             <div className="flex-1 overflow-y-auto p-6 space-y-6">
// // // //               {mockResult.declarations.map(dec => (
// // // //                 <div key={dec.id} className="bg-white border border-border p-5 rounded-xl shadow-sm hover:border-accent/50 transition-colors cursor-pointer group">
// // // //                   <div className="flex justify-between items-start mb-2">
// // // //                     <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{dec.field}</span>
// // // //                     <span className="text-xs font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded">{dec.confidence}%</span>
// // // //                   </div>
// // // //                   <p className="text-lg font-bold text-primary mb-4">{dec.detected}</p>
// // // //                   <div className="flex gap-2">
// // // //                     <button className="flex-1 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-200 text-gray-600 hover:text-green-700 py-2 rounded-lg text-sm font-medium transition-all flex justify-center items-center gap-1">
// // // //                       <Check size={16} /> Confirm
// // // //                     </button>
// // // //                     <button className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium transition-all">
// // // //                       Edit
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //     </div>
// // // //   );
// // // // };

// // // // export default InspectionResult;


// // // import React, { useState, useEffect } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import {
// // //   Check,
// // //   X,
// // //   Maximize2,
// // //   AlertTriangle,
// // //   Focus,
// // //   Loader2
// // // } from 'lucide-react';

// // // import { inspectionsAPI } from '../services/api';


// // // // ============================================================
// // // // BACKEND URL
// // // // ============================================================

// // // const BACKEND_URL = 'http://localhost:5000';


// // // // ============================================================
// // // // HELPER - IMAGE URL
// // // // ============================================================

// // // const getImageUrl = (imageUrl) => {
// // //   if (!imageUrl) return '';

// // //   if (
// // //     imageUrl.startsWith('http://') ||
// // //     imageUrl.startsWith('https://')
// // //   ) {
// // //     return imageUrl;
// // //   }

// // //   return `${BACKEND_URL}${imageUrl}`;
// // // };


// // // // ============================================================
// // // // INSPECTION RESULT
// // // // ============================================================

// // // const InspectionResult = () => {

// // //   const { id } = useParams();

// // //   const [inspection, setInspection] = useState(null);

// // //   const [activeImage, setActiveImage] = useState(null);

// // //   const [showEvidence, setShowEvidence] = useState(false);

// // //   const [isLoading, setIsLoading] = useState(true);

// // //   const [error, setError] = useState('');


// // //   // ==========================================================
// // //   // LOAD REAL INSPECTION
// // //   // ==========================================================

// // //   useEffect(() => {

// // //     const loadInspection = async () => {

// // //       if (!id) {
// // //         setError('Inspection ID is missing.');
// // //         setIsLoading(false);
// // //         return;
// // //       }

// // //       try {

// // //         console.log(
// // //           '🔍 Loading real inspection:',
// // //           id
// // //         );

// // //         setIsLoading(true);
// // //         setError('');

// // //         const response =
// // //           await inspectionsAPI.getById(id);

// // //         console.log(
// // //           '✅ Inspection result received:',
// // //           response.data
// // //         );

// // //         const inspectionData =
// // //           response.data?.data ||
// // //           response.data?.inspection ||
// // //           response.data;

// // //         if (!inspectionData) {
// // //           throw new Error(
// // //             'Inspection data was not returned by the server.'
// // //           );
// // //         }

// // //         setInspection(inspectionData);


// // //         // Set first uploaded image as active image
// // //         if (
// // //           Array.isArray(inspectionData.images) &&
// // //           inspectionData.images.length > 0
// // //         ) {

// // //           const firstImage =
// // //             inspectionData.images[0];

// // //           setActiveImage({
// // //             ...firstImage,
// // //             url: getImageUrl(
// // //               firstImage.imageUrl ||
// // //               firstImage.url
// // //             ),
// // //             angle:
// // //               firstImage.angle ||
// // //               'UNKNOWN'
// // //           });

// // //         }

// // //       } catch (err) {

// // //         console.error(
// // //           '❌ Failed to load inspection:',
// // //           err.response?.data || err
// // //         );

// // //         setError(
// // //           err.response?.data?.message ||
// // //           err.message ||
// // //           'Failed to load inspection results.'
// // //         );

// // //       } finally {

// // //         setIsLoading(false);

// // //       }

// // //     };


// // //     loadInspection();

// // //   }, [id]);


// // //   // ==========================================================
// // //   // LOADING
// // //   // ==========================================================

// // //   if (isLoading) {

// // //     return (
// // //       <div className="min-h-[60vh] flex items-center justify-center">

// // //         <div className="text-center">

// // //           <Loader2
// // //             size={40}
// // //             className="animate-spin mx-auto text-primary"
// // //           />

// // //           <p className="mt-4 text-gray-500">
// // //             Loading inspection results...
// // //           </p>

// // //         </div>

// // //       </div>
// // //     );

// // //   }


// // //   // ==========================================================
// // //   // ERROR
// // //   // ==========================================================

// // //   if (error) {

// // //     return (
// // //       <div className="max-w-4xl mx-auto mt-10">

// // //         <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">

// // //           <div className="flex items-center gap-3">

// // //             <AlertTriangle size={22} />

// // //             <div>

// // //               <h2 className="font-bold">
// // //                 Unable to load inspection
// // //               </h2>

// // //               <p className="text-sm mt-1">
// // //                 {error}
// // //               </p>

// // //             </div>

// // //           </div>

// // //         </div>

// // //       </div>
// // //     );

// // //   }


// // //   if (!inspection) {
// // //     return null;
// // //   }


// // //   // ==========================================================
// // //   // PREPARE DATA
// // //   // ==========================================================

// // //   const inspectionId =
// // //     inspection.inspectionId ||
// // //     inspection._id ||
// // //     id;


// // //   const productName =
// // //     inspection.productId?.productName ||
// // //     inspection.commodityName ||
// // //     'Product';


// // //   const officerName =
// // //     inspection.officerId?.name ||
// // //     'Officer';


// // //   const date = inspection.inspectionDate
// // //     ? new Date(
// // //         inspection.inspectionDate
// // //       ).toLocaleDateString('en-IN')
// // //     : inspection.createdAt
// // //       ? new Date(
// // //           inspection.createdAt
// // //         ).toLocaleDateString('en-IN')
// // //       : '-';


// // //   const violations =
// // //     Array.isArray(inspection.violations)
// // //       ? inspection.violations
// // //       : [];


// // //   const declarations =
// // //     Array.isArray(inspection.declarations)
// // //       ? inspection.declarations
// // //       : [];


// // //   const images =
// // //     Array.isArray(inspection.images)
// // //       ? inspection.images.map((image) => ({
// // //           ...image,
// // //           url: getImageUrl(
// // //             image.imageUrl ||
// // //             image.url
// // //           ),
// // //           angle:
// // //             image.angle ||
// // //             'UNKNOWN'
// // //         }))
// // //       : [];


// // //   const overallStatus =
// // //     inspection.complianceStatus ||
// // //     'REQUIRES_REVIEW';


// // //   const statusLabel =
// // //     overallStatus
// // //       .replaceAll('_', ' ');


// // //   // ==========================================================
// // //   // IMAGE SELECTION
// // //   // ==========================================================

// // //   const selectImage = (image) => {
// // //     setActiveImage(image);
// // //   };


// // //   // ==========================================================
// // //   // RENDER
// // //   // ==========================================================

// // //   return (

// // //     <div className="max-w-7xl mx-auto space-y-8 pb-10">


// // //       {/* ======================================================
// // //           HEADER
// // //       ====================================================== */}

// // //       <div className="flex justify-between items-end bg-bg-card p-8 rounded-2xl shadow-soft border border-border">

// // //         <div>

// // //           <div className="flex items-center gap-3 mb-2">

// // //             <h1 className="text-3xl font-editorial font-bold text-primary">
// // //               {inspectionId}
// // //             </h1>

// // //             <span
// // //               className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
// // //                 overallStatus === 'COMPLIANT'
// // //                   ? 'bg-green-100 text-green-700'
// // //                   : overallStatus === 'POTENTIAL_VIOLATION'
// // //                     ? 'bg-red-100 text-red-700'
// // //                     : 'bg-orange-100 text-orange-700'
// // //               }`}
// // //             >
// // //               {statusLabel}
// // //             </span>

// // //           </div>


// // //           <div className="flex gap-6 text-sm text-gray-500">

// // //             <p>
// // //               <span className="font-medium text-gray-700">
// // //                 Product:
// // //               </span>{' '}
// // //               {productName}
// // //             </p>

// // //             <p>
// // //               <span className="font-medium text-gray-700">
// // //                 Date:
// // //               </span>{' '}
// // //               {date}
// // //             </p>

// // //             <p>
// // //               <span className="font-medium text-gray-700">
// // //                 Officer:
// // //               </span>{' '}
// // //               {officerName}
// // //             </p>

// // //           </div>

// // //         </div>


// // //         <div className="flex gap-4">

// // //           <button
// // //             type="button"
// // //             className="px-5 py-2.5 bg-bg-soft border border-border rounded-xl font-medium text-gray-700 hover:bg-gray-200 transition-colors"
// // //           >
// // //             Download PDF
// // //           </button>


// // //           {activeImage && (

// // //             <button
// // //               type="button"
// // //               onClick={() =>
// // //                 setShowEvidence(true)
// // //               }
// // //               className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium flex items-center gap-2 shadow-md hover:bg-gray-800"
// // //             >
// // //               <Focus size={18} />
// // //               Evidence Viewer
// // //             </button>

// // //           )}

// // //         </div>

// // //       </div>


// // //       {/* ======================================================
// // //           MAIN CONTENT
// // //       ====================================================== */}

// // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


// // //         {/* ====================================================
// // //             LEFT
// // //         ==================================================== */}

// // //         <div className="lg:col-span-2 space-y-8">


// // //           {/* ==================================================
// // //               VIOLATIONS
// // //           ================================================== */}

// // //           {violations.length > 0 ? (

// // //             <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">

// // //               <h2 className="text-lg font-editorial font-bold text-red-900 mb-4 flex items-center gap-2">

// // //                 <AlertTriangle
// // //                   size={20}
// // //                   className="text-red-500"
// // //                 />

// // //                 Detected Violations

// // //               </h2>


// // //               <div className="space-y-4">

// // //                 {violations.map(
// // //                   (violation, index) => (

// // //                     <div
// // //                       key={
// // //                         violation._id ||
// // //                         violation.id ||
// // //                         index
// // //                       }
// // //                       className="bg-white rounded-xl p-5 shadow-sm border border-red-100"
// // //                     >

// // //                       <div className="flex justify-between items-start mb-3">

// // //                         <div>

// // //                           <span className="text-[10px] font-bold tracking-widest uppercase text-red-500 bg-red-50 px-2 py-1 rounded-md">

// // //                             {String(
// // //                               violation.severity ||
// // //                               'MEDIUM'
// // //                             ).toUpperCase()}{' '}
// // //                             SEVERITY

// // //                           </span>


// // //                           <h3 className="font-bold text-gray-900 mt-2">

// // //                             {violation.requirement ||
// // //                               violation.field ||
// // //                               'Compliance violation'}

// // //                           </h3>

// // //                         </div>


// // //                         <div className="flex gap-2">

// // //                           <button
// // //                             type="button"
// // //                             className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
// // //                           >
// // //                             <Check size={18} />
// // //                           </button>

// // //                           <button
// // //                             type="button"
// // //                             className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
// // //                           >
// // //                             <X size={18} />
// // //                           </button>

// // //                         </div>

// // //                       </div>


// // //                       <div className="grid grid-cols-2 gap-4 text-sm mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">

// // //                         <div>

// // //                           <p className="text-gray-500 mb-1">
// // //                             Detected Value
// // //                           </p>

// // //                           <p className="font-medium text-red-600">

// // //                             {violation.detectedValue ||
// // //                               violation.detected ||
// // //                               'Not available'}

// // //                           </p>

// // //                         </div>


// // //                         <div>

// // //                           <p className="text-gray-500 mb-1">
// // //                             Rule ID
// // //                           </p>

// // //                           <p className="font-medium text-gray-900">

// // //                             {violation.ruleId ||
// // //                               violation.rule ||
// // //                               'UNKNOWN'}

// // //                           </p>

// // //                         </div>

// // //                       </div>

// // //                     </div>

// // //                   )
// // //                 )}

// // //               </div>

// // //             </div>

// // //           ) : (

// // //             <div className="bg-green-50 border border-green-200 rounded-2xl p-6">

// // //               <div className="flex items-center gap-3">

// // //                 <Check
// // //                   size={22}
// // //                   className="text-green-600"
// // //                 />

// // //                 <div>

// // //                   <h2 className="font-bold text-green-800">
// // //                     No violations detected
// // //                   </h2>

// // //                   <p className="text-sm text-green-700 mt-1">
// // //                     The AI analysis did not identify any
// // //                     violations in the uploaded package.
// // //                   </p>

// // //                 </div>

// // //               </div>

// // //             </div>

// // //           )}


// // //           {/* ==================================================
// // //               DECLARATIONS
// // //           ================================================== */}

// // //           <div className="bg-bg-card rounded-2xl border border-border shadow-soft overflow-hidden">

// // //             <div className="p-6 border-b border-border">

// // //               <h2 className="text-lg font-editorial font-bold text-primary">
// // //                 Extracted Declarations
// // //               </h2>

// // //             </div>


// // //             {declarations.length > 0 ? (

// // //               <table className="w-full text-left text-sm">

// // //                 <thead className="bg-bg-soft text-gray-500">

// // //                   <tr>

// // //                     <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
// // //                       Field
// // //                     </th>

// // //                     <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
// // //                       Detected Value
// // //                     </th>

// // //                     <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
// // //                       Confidence
// // //                     </th>

// // //                     <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
// // //                       Status
// // //                     </th>

// // //                   </tr>

// // //                 </thead>


// // //                 <tbody className="divide-y divide-border">

// // //                   {declarations.map(
// // //                     (dec, index) => {

// // //                       const confidence =
// // //                         Number(
// // //                           dec.confidence || 0
// // //                         );

// // //                       return (

// // //                         <tr
// // //                           key={
// // //                             dec._id ||
// // //                             dec.id ||
// // //                             index
// // //                           }
// // //                           className="hover:bg-gray-50"
// // //                         >

// // //                           <td className="px-6 py-4 font-medium text-gray-900">
// // //                             {dec.field || '-'}
// // //                           </td>

// // //                           <td className="px-6 py-4">
// // //                             {dec.value || '-'}
// // //                           </td>

// // //                           <td className="px-6 py-4">

// // //                             <div className="flex items-center gap-2">

// // //                               <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">

// // //                                 <div
// // //                                   className="h-full bg-green-500"
// // //                                   style={{
// // //                                     width: `${Math.min(
// // //                                       confidence,
// // //                                       100
// // //                                     )}%`
// // //                                   }}
// // //                                 />

// // //                               </div>

// // //                               <span className="text-xs text-gray-500">
// // //                                 {confidence}%
// // //                               </span>

// // //                             </div>

// // //                           </td>

// // //                           <td className="px-6 py-4">

// // //                             <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">

// // //                               {String(
// // //                                 dec.verificationStatus ||
// // //                                 'AI_DETECTED'
// // //                               ).replaceAll(
// // //                                 '_',
// // //                                 ' '
// // //                               )}

// // //                             </span>

// // //                           </td>

// // //                         </tr>

// // //                       );

// // //                     }
// // //                   )}

// // //                 </tbody>

// // //               </table>

// // //             ) : (

// // //               <div className="p-8 text-center text-gray-400">

// // //                 No declarations extracted yet.

// // //               </div>

// // //             )}

// // //           </div>

// // //         </div>


// // //         {/* ====================================================
// // //             RIGHT - IMAGES
// // //         ==================================================== */}

// // //         <div className="bg-bg-card rounded-2xl border border-border shadow-soft p-6 h-fit">

// // //           <h2 className="text-lg font-editorial font-bold text-primary mb-4">
// // //             Analyzed Packages
// // //           </h2>


// // //           {images.length > 0 ? (

// // //             <div className="space-y-4">

// // //               {activeImage && (

// // //                 <div
// // //                   className="relative rounded-xl overflow-hidden border border-border group cursor-pointer"
// // //                   onClick={() =>
// // //                     setShowEvidence(true)
// // //                   }
// // //                 >

// // //                   <img
// // //                     src={activeImage.url}
// // //                     alt={
// // //                       activeImage.angle ||
// // //                       'Product'
// // //                     }
// // //                     className="w-full h-64 object-cover"
// // //                   />

// // //                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

// // //                     <Maximize2
// // //                       className="text-white"
// // //                       size={32}
// // //                     />

// // //                   </div>


// // //                   <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">

// // //                     {activeImage.angle}

// // //                   </div>

// // //                 </div>

// // //               )}


// // //               <div className="grid grid-cols-4 gap-2">

// // //                 {images.map(
// // //                   (image, index) => (

// // //                     <button
// // //                       type="button"
// // //                       key={
// // //                         image._id ||
// // //                         index
// // //                       }
// // //                       onClick={() =>
// // //                         selectImage(image)
// // //                       }
// // //                       className={`rounded-lg overflow-hidden border-2 transition-all ${
// // //                         activeImage?.url ===
// // //                         image.url
// // //                           ? 'border-accent ring-2 ring-accent/20'
// // //                           : 'border-transparent opacity-60 hover:opacity-100'
// // //                       }`}
// // //                     >

// // //                       <img
// // //                         src={image.url}
// // //                         className="w-full h-16 object-cover"
// // //                         alt={
// // //                           image.angle ||
// // //                           'Product'
// // //                         }
// // //                       />

// // //                     </button>

// // //                   )
// // //                 )}

// // //               </div>

// // //             </div>

// // //           ) : (

// // //             <div className="h-64 flex items-center justify-center text-sm text-gray-400">

// // //               No images uploaded for this inspection.

// // //             </div>

// // //           )}

// // //         </div>

// // //       </div>


// // //       {/* ======================================================
// // //           EVIDENCE VIEWER
// // //       ====================================================== */}

// // //       {showEvidence && activeImage && (

// // //         <div className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-50 flex">

// // //           <div className="flex-1 p-8 flex items-center justify-center relative">

// // //             <button
// // //               type="button"
// // //               onClick={() =>
// // //                 setShowEvidence(false)
// // //               }
// // //               className="absolute top-6 left-6 text-white hover:text-accent bg-white/10 p-3 rounded-xl"
// // //             >
// // //               <X size={24} />
// // //             </button>


// // //             <div className="relative max-w-4xl w-full h-full flex items-center justify-center">

// // //               <img
// // //                 src={activeImage.url}
// // //                 alt="Evidence"
// // //                 className="max-h-full max-w-full rounded-2xl shadow-2xl object-contain"
// // //               />

// // //             </div>

// // //           </div>


// // //           <div className="w-96 bg-bg-base h-full border-l border-border/20 shadow-2xl flex flex-col">

// // //             <div className="p-6 border-b border-border bg-white">

// // //               <h2 className="text-xl font-editorial font-bold text-primary">
// // //                 Evidence Review
// // //               </h2>

// // //               <p className="text-sm text-gray-500 mt-1">
// // //                 Review uploaded package evidence.
// // //               </p>

// // //             </div>


// // //             <div className="p-6">

// // //               <div className="bg-white border border-border p-5 rounded-xl">

// // //                 <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
// // //                   Image Angle
// // //                 </span>

// // //                 <p className="text-lg font-bold text-primary mt-2">
// // //                   {activeImage.angle}
// // //                 </p>

// // //               </div>

// // //             </div>

// // //           </div>

// // //         </div>

// // //       )}

// // //     </div>

// // //   );
// // // };


// // // export default InspectionResult;

// // import React, { useEffect, useMemo, useState } from 'react';
// // import { useParams } from 'react-router-dom';

// // import {
// //   Check,
// //   X,
// //   Maximize2,
// //   AlertTriangle,
// //   Focus,
// //   Loader2,
// //   FileText,
// //   ShieldCheck,
// //   ShieldAlert,
// //   Eye,
// //   ChevronLeft,
// //   ChevronRight,
// //   Info,
// // } from 'lucide-react';

// // import { inspectionsAPI } from '../services/api';

// // // ============================================================
// // // BACKEND URL
// // // ============================================================

// // const BACKEND_URL = 'http://localhost:5000';

// // // ============================================================
// // // IMAGE URL HELPER
// // // ============================================================

// // const getImageUrl = (imageUrl) => {
// //   if (!imageUrl) return '';

// //   if (
// //     imageUrl.startsWith('http://') ||
// //     imageUrl.startsWith('https://')
// //   ) {
// //     return imageUrl;
// //   }

// //   if (imageUrl.startsWith('/')) {
// //     return `${BACKEND_URL}${imageUrl}`;
// //   }

// //   return `${BACKEND_URL}/uploads/${imageUrl}`;
// // };

// // // ============================================================
// // // STATUS HELPERS
// // // ============================================================

// // const getStatusConfig = (status) => {
// //   switch (status) {
// //     case 'COMPLIANT':
// //       return {
// //         label: 'COMPLIANT',
// //         className: 'bg-green-100 text-green-700 border-green-200',
// //         icon: ShieldCheck,
// //       };

// //     case 'POTENTIAL_VIOLATION':
// //       return {
// //         label: 'POTENTIAL VIOLATION',
// //         className: 'bg-red-100 text-red-700 border-red-200',
// //         icon: ShieldAlert,
// //       };

// //     case 'REQUIRES_REVIEW':
// //     case 'UNDER_REVIEW':
// //     default:
// //       return {
// //         label: 'REQUIRES REVIEW',
// //         className: 'bg-orange-100 text-orange-700 border-orange-200',
// //         icon: Info,
// //       };
// //   }
// // };

// // // ============================================================
// // // SEVERITY HELPERS
// // // ============================================================

// // const getSeverityConfig = (severity) => {
// //   const value = String(severity || 'MEDIUM').toUpperCase();

// //   if (value === 'HIGH') {
// //     return {
// //       label: 'HIGH SEVERITY',
// //       className: 'bg-red-50 text-red-600 border-red-100',
// //       dot: 'bg-red-500',
// //     };
// //   }

// //   if (value === 'LOW') {
// //     return {
// //       label: 'LOW SEVERITY',
// //       className: 'bg-blue-50 text-blue-600 border-blue-100',
// //       dot: 'bg-blue-500',
// //     };
// //   }

// //   return {
// //     label: 'MEDIUM SEVERITY',
// //     className: 'bg-orange-50 text-orange-600 border-orange-100',
// //     dot: 'bg-orange-500',
// //   };
// // };

// // // ============================================================
// // // VALUE HELPERS
// // // ============================================================

// // const formatFieldName = (field) => {
// //   if (!field) return '-';

// //   return String(field)
// //     .replaceAll('_', ' ')
// //     .replace(/\b\w/g, (char) => char.toUpperCase());
// // };

// // const formatStatus = (value) => {
// //   if (!value) return 'AI DETECTED';

// //   return String(value)
// //     .replaceAll('_', ' ')
// //     .toUpperCase();
// // };

// // // ============================================================
// // // INSPECTION RESULT
// // // ============================================================

// // const InspectionResult = () => {
// //   const { id } = useParams();

// //   const [inspection, setInspection] = useState(null);
// //   const [activeImageIndex, setActiveImageIndex] = useState(0);

// //   const [showEvidence, setShowEvidence] = useState(false);

// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   // ==========================================================
// //   // LOAD INSPECTION
// //   // ==========================================================

// //   useEffect(() => {
// //     let mounted = true;

// //     const loadInspection = async () => {
// //       if (!id) {
// //         setError('Inspection ID is missing.');
// //         setIsLoading(false);
// //         return;
// //       }

// //       try {
// //         console.log('🔍 Loading inspection result:', id);

// //         setIsLoading(true);
// //         setError('');

// //         const response = await inspectionsAPI.getById(id);

// //         console.log('✅ Inspection result received:', response.data);

// //         const inspectionData =
// //           response.data?.data ||
// //           response.data?.inspection ||
// //           response.data;

// //         if (!inspectionData) {
// //           throw new Error(
// //             'Inspection data was not returned by the server.'
// //           );
// //         }

// //         if (!mounted) return;

// //         setInspection(inspectionData);

// //         if (
// //           Array.isArray(inspectionData.images) &&
// //           inspectionData.images.length > 0
// //         ) {
// //           setActiveImageIndex(0);
// //         }
// //       } catch (err) {
// //         console.error(
// //           '❌ Failed to load inspection:',
// //           err.response?.data || err
// //         );

// //         if (!mounted) return;

// //         setError(
// //           err.response?.data?.message ||
// //             err.message ||
// //             'Failed to load inspection results.'
// //         );
// //       } finally {
// //         if (mounted) {
// //           setIsLoading(false);
// //         }
// //       }
// //     };

// //     loadInspection();

// //     return () => {
// //       mounted = false;
// //     };
// //   }, [id]);

// //   // ==========================================================
// //   // LOADING
// //   // ==========================================================

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-[65vh] flex items-center justify-center">
// //         <div className="text-center">
// //           <Loader2
// //             size={42}
// //             className="animate-spin mx-auto text-primary"
// //           />

// //           <p className="mt-4 text-gray-500 font-medium">
// //             Loading inspection results...
// //           </p>

// //           <p className="text-xs text-gray-400 mt-1">
// //             Preparing AI compliance findings
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ==========================================================
// //   // ERROR
// //   // ==========================================================

// //   if (error) {
// //     return (
// //       <div className="max-w-4xl mx-auto mt-10 px-4">
// //         <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">
// //           <div className="flex items-start gap-4">
// //             <div className="p-2 bg-red-100 rounded-xl">
// //               <AlertTriangle size={22} />
// //             </div>

// //             <div>
// //               <h2 className="font-bold text-lg">
// //                 Unable to load inspection
// //               </h2>

// //               <p className="text-sm mt-1">
// //                 {error}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!inspection) {
// //     return null;
// //   }

// //   // ==========================================================
// //   // PREPARE DATA
// //   // ==========================================================

// //   const inspectionId =
// //     inspection.inspectionId ||
// //     inspection._id ||
// //     id;

// //   const productName =
// //     inspection.commodityName ||
// //     inspection.productId?.productName ||
// //     inspection.productId?.name ||
// //     inspection.productName ||
// //     'Product';

// //   const category =
// //     inspection.productCategory ||
// //     inspection.productId?.category ||
// //     '';

// //   const officerName =
// //     inspection.officerId?.name ||
// //     inspection.officer?.name ||
// //     inspection.officerName ||
// //     'Officer';

// //   const date = inspection.inspectionDate
// //     ? new Date(
// //         inspection.inspectionDate
// //       ).toLocaleDateString('en-IN')
// //     : inspection.createdAt
// //       ? new Date(
// //           inspection.createdAt
// //         ).toLocaleDateString('en-IN')
// //       : '-';

// //   const violations = Array.isArray(inspection.violations)
// //     ? inspection.violations
// //     : [];

// //   const declarations = Array.isArray(
// //     inspection.declarations
// //   )
// //     ? inspection.declarations
// //     : [];

// //   const images = Array.isArray(inspection.images)
// //     ? inspection.images.map((image) => ({
// //         ...image,
// //         url: getImageUrl(
// //           image.imageUrl ||
// //             image.url ||
// //             image.filename
// //         ),
// //         angle:
// //           image.angle ||
// //           'UNKNOWN',
// //       }))
// //     : [];

// //   const activeImage =
// //     images[activeImageIndex] || images[0] || null;

// //   const overallStatus =
// //     inspection.complianceStatus ||
// //     'REQUIRES_REVIEW';

// //   const statusConfig =
// //     getStatusConfig(overallStatus);

// //   const StatusIcon = statusConfig.icon;

// //   // ==========================================================
// //   // REVIEW STATUS
// //   // ==========================================================

// //   const hasReviewViolations = violations.some(
// //     (violation) => {
// //       const ruleId = String(
// //         violation.ruleId ||
// //           violation.rule ||
// //           ''
// //       ).toUpperCase();

// //       const detectedValue = String(
// //         violation.detectedValue ||
// //           violation.detected ||
// //           ''
// //       ).toLowerCase();

// //       return (
// //         ruleId.includes('REVIEW') ||
// //         detectedValue.includes(
// //           'not clearly detectable'
// //         )
// //       );
// //     }
// //   );

// //   // ==========================================================
// //   // IMAGE NAVIGATION
// //   // ==========================================================

// //   const selectImage = (index) => {
// //     if (index < 0 || index >= images.length) {
// //       return;
// //     }

// //     setActiveImageIndex(index);
// //   };

// //   const previousImage = () => {
// //     if (!images.length) return;

// //     setActiveImageIndex((current) =>
// //       current === 0
// //         ? images.length - 1
// //         : current - 1
// //     );
// //   };

// //   const nextImage = () => {
// //     if (!images.length) return;

// //     setActiveImageIndex((current) =>
// //       current === images.length - 1
// //         ? 0
// //         : current + 1
// //     );
// //   };

// //   // ==========================================================
// //   // DOWNLOAD IMAGE
// //   // ==========================================================

// //   const downloadEvidence = () => {
// //     if (!activeImage?.url) return;

// //     const link = document.createElement('a');

// //     link.href = activeImage.url;
// //     link.target = '_blank';
// //     link.rel = 'noopener noreferrer';

// //     link.click();
// //   };

// //   // ==========================================================
// //   // RENDER
// //   // ==========================================================

// //   return (
// //     <div className="max-w-7xl mx-auto space-y-7 pb-12">

// //       {/* ======================================================
// //           HEADER
// //       ====================================================== */}

// //       <div className="bg-bg-card rounded-2xl shadow-soft border border-border overflow-hidden">

// //         <div className="p-6 md:p-8">

// //           <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

// //             {/* LEFT HEADER */}

// //             <div>

// //               <div className="flex flex-wrap items-center gap-3 mb-3">

// //                 <h1 className="text-2xl md:text-3xl font-editorial font-bold text-primary">
// //                   {inspectionId}
// //                 </h1>

// //                 <span
// //                   className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${statusConfig.className}`}
// //                 >
// //                   <StatusIcon size={14} />
// //                   {statusConfig.label}
// //                 </span>

// //               </div>

// //               <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-gray-500">

// //                 <p>
// //                   <span className="font-semibold text-gray-700">
// //                     Product:
// //                   </span>{' '}
// //                   {productName}
// //                 </p>

// //                 {category && (
// //                   <p>
// //                     <span className="font-semibold text-gray-700">
// //                       Category:
// //                     </span>{' '}
// //                     {category}
// //                   </p>
// //                 )}

// //                 <p>
// //                   <span className="font-semibold text-gray-700">
// //                     Date:
// //                   </span>{' '}
// //                   {date}
// //                 </p>

// //                 <p>
// //                   <span className="font-semibold text-gray-700">
// //                     Officer:
// //                   </span>{' '}
// //                   {officerName}
// //                 </p>

// //               </div>

// //             </div>

// //             {/* HEADER ACTIONS */}

// //             <div className="flex flex-wrap gap-3">

// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   window.print()
// //                 }
// //                 className="px-4 py-2.5 bg-bg-soft border border-border rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
// //               >
// //                 <FileText size={17} />
// //                 Download PDF
// //               </button>

// //               {activeImage && (
// //                 <button
// //                   type="button"
// //                   onClick={() =>
// //                     setShowEvidence(true)
// //                   }
// //                   className="px-4 py-2.5 bg-primary text-white rounded-xl font-medium flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
// //                 >
// //                   <Focus size={17} />
// //                   Evidence Viewer
// //                 </button>
// //               )}

// //             </div>

// //           </div>

// //         </div>

// //         {/* REVIEW NOTICE */}

// //         {hasReviewViolations && (
// //           <div className="px-6 md:px-8 py-3 bg-orange-50 border-t border-orange-100">

// //             <div className="flex items-center gap-2 text-orange-700 text-sm">

// //               <Info size={17} />

// //               <span>
// //                 Some declarations could not be confidently
// //                 detected. Officer review is recommended.
// //               </span>

// //             </div>

// //           </div>
// //         )}

// //       </div>

// //       {/* ======================================================
// //           SUMMARY CARDS
// //       ====================================================== */}

// //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

// //         <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-soft">

// //           <div className="flex items-center justify-between">

// //             <div>
// //               <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
// //                 Inspection Status
// //               </p>

// //               <p className="text-lg font-bold text-primary mt-1">
// //                 {statusConfig.label}
// //               </p>
// //             </div>

// //             <div className="p-3 bg-orange-50 rounded-xl">
// //               <ShieldAlert
// //                 size={22}
// //                 className="text-orange-600"
// //               />
// //             </div>

// //           </div>

// //         </div>

// //         <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-soft">

// //           <div className="flex items-center justify-between">

// //             <div>
// //               <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
// //                 Findings
// //               </p>

// //               <p className="text-lg font-bold text-primary mt-1">
// //                 {violations.length}
// //               </p>
// //             </div>

// //             <div className="p-3 bg-red-50 rounded-xl">
// //               <AlertTriangle
// //                 size={22}
// //                 className="text-red-500"
// //               />
// //             </div>

// //           </div>

// //         </div>

// //         <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-soft">

// //           <div className="flex items-center justify-between">

// //             <div>
// //               <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
// //                 Evidence Images
// //               </p>

// //               <p className="text-lg font-bold text-primary mt-1">
// //                 {images.length}
// //               </p>
// //             </div>

// //             <div className="p-3 bg-blue-50 rounded-xl">
// //               <Eye
// //                 size={22}
// //                 className="text-blue-600"
// //               />
// //             </div>

// //           </div>

// //         </div>

// //       </div>

// //       {/* ======================================================
// //           MAIN CONTENT
// //       ====================================================== */}

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

// //         {/* ====================================================
// //             LEFT - FINDINGS
// //         ==================================================== */}

// //         <div className="lg:col-span-2 space-y-7">

// //           {/* ==================================================
// //               VIOLATIONS
// //           ================================================== */}

// //           {violations.length > 0 ? (

// //             <div className="bg-red-50/40 border border-red-100 rounded-2xl p-6">

// //               <div className="flex items-center justify-between gap-4 mb-5">

// //                 <div className="flex items-center gap-3">

// //                   <div className="p-2 bg-red-100 rounded-xl">
// //                     <AlertTriangle
// //                       size={20}
// //                       className="text-red-600"
// //                     />
// //                   </div>

// //                   <div>
// //                     <h2 className="text-lg font-editorial font-bold text-red-900">
// //                       Detected Violations
// //                     </h2>

// //                     <p className="text-xs text-red-600 mt-0.5">
// //                       AI compliance findings requiring attention
// //                     </p>
// //                   </div>

// //                 </div>

// //                 <span className="px-3 py-1.5 bg-white border border-red-100 rounded-full text-xs font-bold text-red-600">
// //                   {violations.length}{' '}
// //                   {violations.length === 1
// //                     ? 'Finding'
// //                     : 'Findings'}
// //                 </span>

// //               </div>

// //               <div className="space-y-4">

// //                 {violations.map(
// //                   (violation, index) => {

// //                     const severity =
// //                       getSeverityConfig(
// //                         violation.severity
// //                       );

// //                     const detectedValue =
// //                       violation.detectedValue ||
// //                       violation.detected ||
// //                       violation.value ||
// //                       'Not available';

// //                     const ruleId =
// //                       violation.ruleId ||
// //                       violation.rule ||
// //                       'UNKNOWN';

// //                     const requirement =
// //                       violation.requirement ||
// //                       violation.description ||
// //                       violation.field ||
// //                       'Compliance requirement';

// //                     const isReview =
// //                       String(ruleId)
// //                         .toUpperCase()
// //                         .includes('REVIEW') ||
// //                       String(detectedValue)
// //                         .toLowerCase()
// //                         .includes(
// //                           'not clearly detectable'
// //                         );

// //                     return (

// //                       <div
// //                         key={
// //                           violation._id ||
// //                           violation.id ||
// //                           `${ruleId}-${index}`
// //                         }
// //                         className={`bg-white rounded-2xl p-5 border shadow-sm ${
// //                           isReview
// //                             ? 'border-orange-200'
// //                             : 'border-red-100'
// //                         }`}
// //                       >

// //                         {/* FINDING HEADER */}

// //                         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

// //                           <div className="flex-1">

// //                             <span
// //                               className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-md border ${severity.className}`}
// //                             >
// //                               <span
// //                                 className={`w-1.5 h-1.5 rounded-full ${severity.dot}`}
// //                               />

// //                               {severity.label}
// //                             </span>

// //                             <h3 className="font-bold text-gray-900 text-base md:text-lg mt-3 leading-snug">
// //                               {requirement}
// //                             </h3>

// //                           </div>

// //                           {/* REVIEW ICONS */}

// //                           <div className="flex items-center gap-2">

// //                             <button
// //                               type="button"
// //                               title="Mark as compliant"
// //                               className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
// //                             >
// //                               <Check size={18} />
// //                             </button>

// //                             <button
// //                               type="button"
// //                               title="Keep as violation"
// //                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// //                             >
// //                               <X size={18} />
// //                             </button>

// //                           </div>

// //                         </div>

// //                         {/* FINDING DETAILS */}

// //                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-5">

// //                           <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">

// //                             <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
// //                               Detected Value
// //                             </p>

// //                             <p
// //                               className={`font-semibold ${
// //                                 isReview
// //                                   ? 'text-orange-600'
// //                                   : 'text-red-600'
// //                               }`}
// //                             >
// //                               {detectedValue}
// //                             </p>

// //                           </div>

// //                           <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">

// //                             <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
// //                               Rule ID
// //                             </p>

// //                             <p className="font-semibold text-gray-900">
// //                               {ruleId}
// //                             </p>

// //                           </div>

// //                         </div>

// //                         {/* REVIEW MESSAGE */}

// //                         {isReview && (
// //                           <div className="mt-4 flex items-start gap-2 bg-orange-50 border border-orange-100 rounded-xl p-3 text-xs text-orange-700">

// //                             <Info
// //                               size={15}
// //                               className="mt-0.5 shrink-0"
// //                             />

// //                             <p>
// //                               The declaration could not be
// //                               confidently detected from the
// //                               available image evidence.
// //                               Officer verification is recommended.
// //                             </p>

// //                           </div>
// //                         )}

// //                       </div>

// //                     );
// //                   }
// //                 )}

// //               </div>

// //             </div>

// //           ) : (

// //             <div className="bg-green-50 border border-green-200 rounded-2xl p-7">

// //               <div className="flex items-start gap-4">

// //                 <div className="p-2 bg-green-100 rounded-xl">
// //                   <Check
// //                     size={24}
// //                     className="text-green-600"
// //                   />
// //                 </div>

// //                 <div>

// //                   <h2 className="font-bold text-green-800 text-lg">
// //                     No violations detected
// //                   </h2>

// //                   <p className="text-sm text-green-700 mt-1">
// //                     The AI analysis did not identify any
// //                     compliance violations in the uploaded
// //                     package evidence.
// //                   </p>

// //                 </div>

// //               </div>

// //             </div>

// //           )}

// //           {/* ==================================================
// //               DECLARATIONS
// //           ================================================== */}

// //           <div className="bg-bg-card rounded-2xl border border-border shadow-soft overflow-hidden">

// //             <div className="p-6 border-b border-border flex items-center justify-between">

// //               <div>

// //                 <h2 className="text-lg font-editorial font-bold text-primary">
// //                   Extracted Declarations
// //                 </h2>

// //                 <p className="text-xs text-gray-400 mt-1">
// //                   Information detected from package labels
// //                 </p>

// //               </div>

// //               <span className="px-3 py-1.5 bg-bg-soft rounded-full text-xs font-bold text-gray-500">
// //                 {declarations.length} detected
// //               </span>

// //             </div>

// //             {declarations.length > 0 ? (

// //               <div className="overflow-x-auto">

// //                 <table className="w-full text-left text-sm">

// //                   <thead className="bg-bg-soft text-gray-500">

// //                     <tr>

// //                       <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
// //                         Field
// //                       </th>

// //                       <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
// //                         Detected Value
// //                       </th>

// //                       <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
// //                         Confidence
// //                       </th>

// //                       <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
// //                         Status
// //                       </th>

// //                     </tr>

// //                   </thead>

// //                   <tbody className="divide-y divide-border">

// //                     {declarations.map(
// //                       (dec, index) => {

// //                         const confidence = Math.max(
// //                           0,
// //                           Math.min(
// //                             100,
// //                             Number(
// //                               dec.confidence || 0
// //                             )
// //                           )
// //                         );

// //                         return (

// //                           <tr
// //                             key={
// //                               dec._id ||
// //                               dec.id ||
// //                               index
// //                             }
// //                             className="hover:bg-gray-50 transition-colors"
// //                           >

// //                             <td className="px-6 py-4 font-semibold text-gray-900">
// //                               {formatFieldName(
// //                                 dec.field
// //                               )}
// //                             </td>

// //                             <td className="px-6 py-4 text-gray-700 max-w-md">
// //                               <div className="break-words">
// //                                 {dec.value || '-'}
// //                               </div>
// //                             </td>

// //                             <td className="px-6 py-4">

// //                               <div className="flex items-center gap-2">

// //                                 <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">

// //                                   <div
// //                                     className="h-full bg-green-500 rounded-full transition-all"
// //                                     style={{
// //                                       width: `${confidence}%`,
// //                                     }}
// //                                   />

// //                                 </div>

// //                                 <span className="text-xs font-medium text-gray-500">
// //                                   {Math.round(
// //                                     confidence
// //                                   )}
// //                                   %
// //                                 </span>

// //                               </div>

// //                             </td>

// //                             <td className="px-6 py-4">

// //                               <span className="inline-flex text-[10px] font-bold tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-md border border-blue-100">
// //                                 {formatStatus(
// //                                   dec.verificationStatus
// //                                 )}
// //                               </span>

// //                             </td>

// //                           </tr>

// //                         );
// //                       }
// //                     )}

// //                   </tbody>

// //                 </table>

// //               </div>

// //             ) : (

// //               <div className="p-10 text-center">

// //                 <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
// //                   <FileText
// //                     size={22}
// //                     className="text-gray-400"
// //                   />
// //                 </div>

// //                 <p className="mt-4 font-semibold text-gray-500">
// //                   No declarations extracted yet
// //                 </p>

// //                 <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
// //                   The AI could not confidently extract
// //                   declaration text from the available package
// //                   image.
// //                 </p>

// //               </div>

// //             )}

// //           </div>

// //         </div>

// //         {/* ====================================================
// //             RIGHT - EVIDENCE
// //         ==================================================== */}

// //         <div className="bg-bg-card rounded-2xl border border-border shadow-soft p-6 h-fit lg:sticky lg:top-6">

// //           <div className="flex items-center justify-between mb-4">

// //             <div>

// //               <h2 className="text-lg font-editorial font-bold text-primary">
// //                 Analyzed Packages
// //               </h2>

// //               <p className="text-xs text-gray-400 mt-1">
// //                 Uploaded inspection evidence
// //               </p>

// //             </div>

// //             {images.length > 0 && (
// //               <span className="text-xs font-bold text-gray-400">
// //                 {activeImageIndex + 1} / {images.length}
// //               </span>
// //             )}

// //           </div>

// //           {images.length > 0 && activeImage ? (

// //             <div className="space-y-4">

// //               {/* MAIN IMAGE */}

// //               <div
// //                 className="relative rounded-2xl overflow-hidden border border-border bg-gray-100 group cursor-pointer"
// //                 onClick={() =>
// //                   setShowEvidence(true)
// //                 }
// //               >

// //                 <img
// //                   src={activeImage.url}
// //                   alt={
// //                     activeImage.angle ||
// //                     'Package evidence'
// //                   }
// //                   className="w-full h-72 object-contain bg-gray-100"
// //                   onError={(event) => {
// //                     event.currentTarget.style.display =
// //                       'none';
// //                   }}
// //                 />

// //                 {/* HOVER */}

// //                 <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

// //                   <div className="bg-white/90 p-3 rounded-full">

// //                     <Maximize2
// //                       size={25}
// //                       className="text-gray-800"
// //                     />

// //                   </div>

// //                 </div>

// //                 {/* ANGLE */}

// //                 <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm">
// //                   {activeImage.angle}
// //                 </div>

// //                 {/* IMAGE NUMBER */}

// //                 <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
// //                   {activeImageIndex + 1} / {images.length}
// //                 </div>

// //               </div>

// //               {/* NAVIGATION */}

// //               {images.length > 1 && (
// //                 <div className="flex items-center justify-between">

// //                   <button
// //                     type="button"
// //                     onClick={previousImage}
// //                     className="p-2 bg-bg-soft border border-border rounded-lg hover:bg-gray-100 transition-colors"
// //                     title="Previous image"
// //                   >
// //                     <ChevronLeft size={18} />
// //                   </button>

// //                   <span className="text-xs text-gray-400 font-medium">
// //                     {activeImage.angle}
// //                   </span>

// //                   <button
// //                     type="button"
// //                     onClick={nextImage}
// //                     className="p-2 bg-bg-soft border border-border rounded-lg hover:bg-gray-100 transition-colors"
// //                     title="Next image"
// //                   >
// //                     <ChevronRight size={18} />
// //                   </button>

// //                 </div>
// //               )}

// //               {/* THUMBNAILS */}

// //               <div className="grid grid-cols-4 gap-2">

// //                 {images.map(
// //                   (image, index) => (

// //                     <button
// //                       type="button"
// //                       key={
// //                         image._id ||
// //                         image.id ||
// //                         index
// //                       }
// //                       onClick={() =>
// //                         selectImage(index)
// //                       }
// //                       className={`relative rounded-lg overflow-hidden border-2 transition-all ${
// //                         activeImageIndex === index
// //                           ? 'border-accent ring-2 ring-accent/20'
// //                           : 'border-transparent opacity-60 hover:opacity-100'
// //                       }`}
// //                     >

// //                       <img
// //                         src={image.url}
// //                         className="w-full h-16 object-cover bg-gray-100"
// //                         alt={
// //                           image.angle ||
// //                           'Package'
// //                         }
// //                       />

// //                       <span className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[8px] font-bold uppercase tracking-wide py-0.5 rounded">
// //                         {image.angle}
// //                       </span>

// //                     </button>

// //                   )
// //                 )}

// //               </div>

// //               {/* IMAGE DETAILS */}

// //               <div className="bg-bg-soft border border-border rounded-xl p-4">

// //                 <div className="flex items-center justify-between">

// //                   <div>

// //                     <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
// //                       Detected Angle
// //                     </p>

// //                     <p className="text-sm font-bold text-primary mt-1">
// //                       {activeImage.angle}
// //                     </p>

// //                   </div>

// //                   <div className="p-2 bg-white rounded-lg border border-border">
// //                     <Focus
// //                       size={18}
// //                       className="text-primary"
// //                     />
// //                   </div>

// //                 </div>

// //               </div>

// //               {/* OPEN EVIDENCE */}

// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   setShowEvidence(true)
// //                 }
// //                 className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
// //               >
// //                 <Focus size={16} />
// //                 Open Evidence Viewer
// //               </button>

// //             </div>

// //           ) : (

// //             <div className="h-64 flex flex-col items-center justify-center text-sm text-gray-400">

// //               <Eye
// //                 size={30}
// //                 className="mb-3 text-gray-300"
// //               />

// //               <p>
// //                 No images uploaded for this inspection.
// //               </p>

// //             </div>

// //           )}

// //         </div>

// //       </div>

// //       {/* ======================================================
// //           EVIDENCE VIEWER MODAL
// //       ====================================================== */}

// //       {showEvidence && activeImage && (

// //         <div
// //           className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col lg:flex-row"
// //           onClick={() =>
// //             setShowEvidence(false)
// //           }
// //         >

// //           {/* IMAGE AREA */}

// //           <div
// //             className="flex-1 min-h-[65vh] lg:min-h-0 p-6 md:p-10 flex items-center justify-center relative"
// //             onClick={(event) =>
// //               event.stopPropagation()
// //             }
// //           >

// //             {/* CLOSE */}

// //             <button
// //               type="button"
// //               onClick={() =>
// //                 setShowEvidence(false)
// //               }
// //               className="absolute top-5 left-5 text-white hover:bg-white/10 p-3 rounded-xl transition-colors"
// //               title="Close"
// //             >
// //               <X size={24} />
// //             </button>

// //             {/* PREVIOUS */}

// //             {images.length > 1 && (
// //               <button
// //                 type="button"
// //                 onClick={previousImage}
// //                 className="absolute left-5 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
// //                 title="Previous image"
// //               >
// //                 <ChevronLeft size={25} />
// //               </button>
// //             )}

// //             {/* IMAGE */}

// //             <div className="relative max-w-6xl w-full h-full flex items-center justify-center">

// //               <img
// //                 src={activeImage.url}
// //                 alt="Package evidence"
// //                 className="max-h-[80vh] max-w-full rounded-xl shadow-2xl object-contain"
// //               />

// //               <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
// //                 {activeImage.angle}
// //               </div>

// //             </div>

// //             {/* NEXT */}

// //             {images.length > 1 && (
// //               <button
// //                 type="button"
// //                 onClick={nextImage}
// //                 className="absolute right-5 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
// //                 title="Next image"
// //               >
// //                 <ChevronRight size={25} />
// //               </button>
// //             )}

// //           </div>

// //           {/* SIDE PANEL */}

// //           <div
// //             className="w-full lg:w-96 bg-bg-base border-t lg:border-t-0 lg:border-l border-border flex flex-col"
// //             onClick={(event) =>
// //               event.stopPropagation()
// //             }
// //           >

// //             <div className="p-6 border-b border-border bg-white">

// //               <div className="flex items-center gap-3">

// //                 <div className="p-2 bg-primary rounded-xl">
// //                   <Focus
// //                     size={19}
// //                     className="text-white"
// //                   />
// //                 </div>

// //                 <div>

// //                   <h2 className="text-xl font-editorial font-bold text-primary">
// //                     Evidence Review
// //                   </h2>

// //                   <p className="text-xs text-gray-500 mt-1">
// //                     Review uploaded package evidence
// //                   </p>

// //                 </div>

// //               </div>

// //             </div>

// //             <div className="p-6 space-y-4">

// //               {/* IMAGE INFO */}

// //               <div className="bg-white border border-border p-5 rounded-xl">

// //                 <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
// //                   Image Angle
// //                 </span>

// //                 <p className="text-lg font-bold text-primary mt-2">
// //                   {activeImage.angle}
// //                 </p>

// //               </div>

// //               {/* IMAGE COUNT */}

// //               <div className="bg-white border border-border p-5 rounded-xl">

// //                 <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
// //                   Evidence Image
// //                 </span>

// //                 <p className="text-lg font-bold text-primary mt-2">
// //                   {activeImageIndex + 1}{' '}
// //                   <span className="text-gray-400 font-normal">
// //                     of {images.length}
// //                   </span>
// //                 </p>

// //               </div>

// //               {/* FILE */}

// //               {activeImage.filename && (
// //                 <div className="bg-white border border-border p-5 rounded-xl">

// //                   <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
// //                     Evidence File
// //                   </span>

// //                   <p className="text-sm font-medium text-gray-700 mt-2 break-all">
// //                     {activeImage.filename}
// //                   </p>

// //                 </div>
// //               )}

// //               {/* DOWNLOAD */}

// //               <button
// //                 type="button"
// //                 onClick={downloadEvidence}
// //                 className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
// //               >
// //                 Open Original Evidence
// //               </button>

// //             </div>

// //           </div>

// //         </div>

// //       )}

// //     </div>
// //   );
// // };

// // export default InspectionResult;

// import React, { useEffect, useMemo, useState } from 'react';
// import { useParams } from 'react-router-dom';

// import {
//   Check,
//   X,
//   Maximize2,
//   AlertTriangle,
//   Focus,
//   Loader2,
//   FileText,
//   ShieldCheck,
//   ShieldAlert,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   Info,
// } from 'lucide-react';

// import { inspectionsAPI } from '../services/api';

// // ============================================================
// // BACKEND URL
// // ============================================================

// const BACKEND_URL = 'http://localhost:5000';

// // ============================================================
// // IMAGE URL HELPER
// // ============================================================

// const getImageUrl = (imageOrUrl) => {
//   if (!imageOrUrl) return '';

//   const imageUrl =
//     typeof imageOrUrl === 'string'
//       ? imageOrUrl
//       : imageOrUrl.imageUrl ||
//         imageOrUrl.url ||
//         imageOrUrl.path ||
//         imageOrUrl.filename ||
//         '';

//   if (!imageUrl) return '';

//   const value = String(imageUrl).trim();

//   if (
//     value.startsWith('http://') ||
//     value.startsWith('https://') ||
//     value.startsWith('data:')
//   ) {
//     return value;
//   }

//   const normalized = value.replace(/\\/g, '/');

//   if (normalized.startsWith('/uploads/')) {
//     return `${BACKEND_URL}${normalized}`;
//   }

//   if (normalized.startsWith('uploads/')) {
//     return `${BACKEND_URL}/${normalized}`;
//   }

//   if (normalized.startsWith('/')) {
//     return `${BACKEND_URL}${normalized}`;
//   }

//   const filename = normalized.split('/').pop();

//   return `${BACKEND_URL}/uploads/${encodeURIComponent(
//     filename || value
//   )}`;
// };

// // ============================================================
// // STATUS HELPERS
// // ============================================================

// const getStatusConfig = (status) => {
//   switch (status) {
//     case 'COMPLIANT':
//       return {
//         label: 'COMPLIANT',
//         className: 'bg-green-100 text-green-700 border-green-200',
//         icon: ShieldCheck,
//       };

//     case 'POTENTIAL_VIOLATION':
//       return {
//         label: 'POTENTIAL VIOLATION',
//         className: 'bg-red-100 text-red-700 border-red-200',
//         icon: ShieldAlert,
//       };

//     case 'REQUIRES_REVIEW':
//     case 'UNDER_REVIEW':
//     default:
//       return {
//         label: 'REQUIRES REVIEW',
//         className: 'bg-orange-100 text-orange-700 border-orange-200',
//         icon: Info,
//       };
//   }
// };

// // ============================================================
// // SEVERITY HELPERS
// // ============================================================

// const getSeverityConfig = (severity) => {
//   const value = String(severity || 'MEDIUM').toUpperCase();

//   if (value === 'HIGH') {
//     return {
//       label: 'HIGH SEVERITY',
//       className: 'bg-red-50 text-red-600 border-red-100',
//       dot: 'bg-red-500',
//     };
//   }

//   if (value === 'LOW') {
//     return {
//       label: 'LOW SEVERITY',
//       className: 'bg-blue-50 text-blue-600 border-blue-100',
//       dot: 'bg-blue-500',
//     };
//   }

//   return {
//     label: 'MEDIUM SEVERITY',
//     className: 'bg-orange-50 text-orange-600 border-orange-100',
//     dot: 'bg-orange-500',
//   };
// };

// // ============================================================
// // VALUE HELPERS
// // ============================================================

// const formatFieldName = (field) => {
//   if (!field) return '-';

//   return String(field)
//     .replaceAll('_', ' ')
//     .replace(/\b\w/g, (char) => char.toUpperCase());
// };

// const formatStatus = (value) => {
//   if (!value) return 'AI DETECTED';

//   return String(value)
//     .replaceAll('_', ' ')
//     .toUpperCase();
// };

// // ============================================================
// // INSPECTION RESULT
// // ============================================================

// const InspectionResult = () => {
//   const { id } = useParams();

//   const [inspection, setInspection] = useState(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   const [showEvidence, setShowEvidence] = useState(false);

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');

//   // ==========================================================
//   // LOAD INSPECTION
//   // ==========================================================

//   useEffect(() => {
//     let mounted = true;

//     const loadInspection = async () => {
//       if (!id) {
//         setError('Inspection ID is missing.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log('🔍 Loading inspection result:', id);

//         setIsLoading(true);
//         setError('');

//         const response = await inspectionsAPI.getById(id);

//         console.log('✅ Inspection result received:', response.data);

//         const inspectionData =
//           response.data?.data ||
//           response.data?.inspection ||
//           response.data;

//         if (!inspectionData) {
//           throw new Error(
//             'Inspection data was not returned by the server.'
//           );
//         }

//         if (!mounted) return;

//         setInspection(inspectionData);

//         if (
//           Array.isArray(inspectionData.images) &&
//           inspectionData.images.length > 0
//         ) {
//           setActiveImageIndex(0);
//         }
//       } catch (err) {
//         console.error(
//           '❌ Failed to load inspection:',
//           err.response?.data || err
//         );

//         if (!mounted) return;

//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             'Failed to load inspection results.'
//         );
//       } finally {
//         if (mounted) {
//           setIsLoading(false);
//         }
//       }
//     };

//     loadInspection();

//     return () => {
//       mounted = false;
//     };
//   }, [id]);

//   // ==========================================================
//   // LOADING
//   // ==========================================================

//   if (isLoading) {
//     return (
//       <div className="min-h-[65vh] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2
//             size={42}
//             className="animate-spin mx-auto text-primary"
//           />

//           <p className="mt-4 text-gray-500 font-medium">
//             Loading inspection results...
//           </p>

//           <p className="text-xs text-gray-400 mt-1">
//             Preparing AI compliance findings
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ==========================================================
//   // ERROR
//   // ==========================================================

//   if (error) {
//     return (
//       <div className="max-w-4xl mx-auto mt-10 px-4">
//         <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">
//           <div className="flex items-start gap-4">
//             <div className="p-2 bg-red-100 rounded-xl">
//               <AlertTriangle size={22} />
//             </div>

//             <div>
//               <h2 className="font-bold text-lg">
//                 Unable to load inspection
//               </h2>

//               <p className="text-sm mt-1">
//                 {error}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!inspection) {
//     return null;
//   }

//   // ==========================================================
//   // PREPARE DATA
//   // ==========================================================

//   const inspectionId =
//     inspection.inspectionId ||
//     inspection._id ||
//     id;

//   const productName =
//     inspection.commodityName ||
//     inspection.productId?.productName ||
//     inspection.productId?.name ||
//     inspection.productName ||
//     'Product';

//   const category =
//     inspection.productCategory ||
//     inspection.productId?.category ||
//     '';

//   const officerName =
//     inspection.officerId?.name ||
//     inspection.officer?.name ||
//     inspection.officerName ||
//     'Officer';

//   const date = inspection.inspectionDate
//     ? new Date(
//         inspection.inspectionDate
//       ).toLocaleDateString('en-IN')
//     : inspection.createdAt
//       ? new Date(
//           inspection.createdAt
//         ).toLocaleDateString('en-IN')
//       : '-';

//   const violations = Array.isArray(inspection.violations)
//     ? inspection.violations
//     : [];

//   const declarations = Array.isArray(
//     inspection.declarations
//   )
//     ? inspection.declarations
//     : [];

//   const images = Array.isArray(inspection.images)
//     ? inspection.images.map((image) => {
//         const resolvedUrl = getImageUrl(image);

//         console.log('🖼️ RESOLVED EVIDENCE IMAGE:', {
//           filename: image?.filename,
//           imageUrl: image?.imageUrl,
//           resolvedUrl,
//           angle: image?.angle,
//         });

//         return {
//           ...image,
//           url: resolvedUrl,
//           angle: image.angle || 'UNKNOWN',
//         };
//       })
//     : [];

//   const activeImage =
//     images[activeImageIndex] || images[0] || null;

//   const overallStatus =
//     inspection.complianceStatus ||
//     'REQUIRES_REVIEW';

//   const statusConfig =
//     getStatusConfig(overallStatus);

//   const StatusIcon = statusConfig.icon;

//   // ==========================================================
//   // REVIEW STATUS
//   // ==========================================================

//   const hasReviewViolations = violations.some(
//     (violation) => {
//       const ruleId = String(
//         violation.ruleId ||
//           violation.rule ||
//           ''
//       ).toUpperCase();

//       const detectedValue = String(
//         violation.detectedValue ||
//           violation.detected ||
//           ''
//       ).toLowerCase();

//       return (
//         ruleId.includes('REVIEW') ||
//         detectedValue.includes(
//           'not clearly detectable'
//         )
//       );
//     }
//   );

//   // ==========================================================
//   // IMAGE NAVIGATION
//   // ==========================================================

//   const selectImage = (index) => {
//     if (index < 0 || index >= images.length) {
//       return;
//     }

//     setActiveImageIndex(index);
//   };

//   const previousImage = () => {
//     if (!images.length) return;

//     setActiveImageIndex((current) =>
//       current === 0
//         ? images.length - 1
//         : current - 1
//     );
//   };

//   const nextImage = () => {
//     if (!images.length) return;

//     setActiveImageIndex((current) =>
//       current === images.length - 1
//         ? 0
//         : current + 1
//     );
//   };

//   // ==========================================================
//   // DOWNLOAD IMAGE
//   // ==========================================================

//   const downloadEvidence = () => {
//     if (!activeImage?.url) return;

//     const link = document.createElement('a');

//     link.href = activeImage.url;
//     link.target = '_blank';
//     link.rel = 'noopener noreferrer';

//     link.click();
//   };

//   // ==========================================================
//   // RENDER
//   // ==========================================================

//   return (
//     <div className="max-w-7xl mx-auto space-y-7 pb-12">

//       {/* ======================================================
//           HEADER
//       ====================================================== */}

//       <div className="bg-bg-card rounded-2xl shadow-soft border border-border overflow-hidden">

//         <div className="p-6 md:p-8">

//           <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

//             {/* LEFT HEADER */}

//             <div>

//               <div className="flex flex-wrap items-center gap-3 mb-3">

//                 <h1 className="text-2xl md:text-3xl font-editorial font-bold text-primary">
//                   {inspectionId}
//                 </h1>

//                 <span
//                   className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${statusConfig.className}`}
//                 >
//                   <StatusIcon size={14} />
//                   {statusConfig.label}
//                 </span>

//               </div>

//               <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-gray-500">

//                 <p>
//                   <span className="font-semibold text-gray-700">
//                     Product:
//                   </span>{' '}
//                   {productName}
//                 </p>

//                 {category && (
//                   <p>
//                     <span className="font-semibold text-gray-700">
//                       Category:
//                     </span>{' '}
//                     {category}
//                   </p>
//                 )}

//                 <p>
//                   <span className="font-semibold text-gray-700">
//                     Date:
//                   </span>{' '}
//                   {date}
//                 </p>

//                 <p>
//                   <span className="font-semibold text-gray-700">
//                     Officer:
//                   </span>{' '}
//                   {officerName}
//                 </p>

//               </div>

//             </div>

//             {/* HEADER ACTIONS */}

//             <div className="flex flex-wrap gap-3">

//               <button
//                 type="button"
//                 onClick={() =>
//                   window.print()
//                 }
//                 className="px-4 py-2.5 bg-bg-soft border border-border rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
//               >
//                 <FileText size={17} />
//                 Download PDF
//               </button>

//               {activeImage && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowEvidence(true)
//                   }
//                   className="px-4 py-2.5 bg-primary text-white rounded-xl font-medium flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
//                 >
//                   <Focus size={17} />
//                   Evidence Viewer
//                 </button>
//               )}

//             </div>

//           </div>

//         </div>

//         {/* REVIEW NOTICE */}

//         {hasReviewViolations && (
//           <div className="px-6 md:px-8 py-3 bg-orange-50 border-t border-orange-100">

//             <div className="flex items-center gap-2 text-orange-700 text-sm">

//               <Info size={17} />

//               <span>
//                 Some declarations could not be confidently
//                 detected. Officer review is recommended.
//               </span>

//             </div>

//           </div>
//         )}

//       </div>

//       {/* ======================================================
//           SUMMARY CARDS
//       ====================================================== */}

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//         <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-soft">

//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
//                 Inspection Status
//               </p>

//               <p className="text-lg font-bold text-primary mt-1">
//                 {statusConfig.label}
//               </p>
//             </div>

//             <div className="p-3 bg-orange-50 rounded-xl">
//               <ShieldAlert
//                 size={22}
//                 className="text-orange-600"
//               />
//             </div>

//           </div>

//         </div>

//         <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-soft">

//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
//                 Findings
//               </p>

//               <p className="text-lg font-bold text-primary mt-1">
//                 {violations.length}
//               </p>
//             </div>

//             <div className="p-3 bg-red-50 rounded-xl">
//               <AlertTriangle
//                 size={22}
//                 className="text-red-500"
//               />
//             </div>

//           </div>

//         </div>

//         <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-soft">

//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
//                 Evidence Images
//               </p>

//               <p className="text-lg font-bold text-primary mt-1">
//                 {images.length}
//               </p>
//             </div>

//             <div className="p-3 bg-blue-50 rounded-xl">
//               <Eye
//                 size={22}
//                 className="text-blue-600"
//               />
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* ======================================================
//           MAIN CONTENT
//       ====================================================== */}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

//         {/* ====================================================
//             LEFT - FINDINGS
//         ==================================================== */}

//         <div className="lg:col-span-2 space-y-7">

//           {/* ==================================================
//               VIOLATIONS
//           ================================================== */}

//           {violations.length > 0 ? (

//             <div className="bg-red-50/40 border border-red-100 rounded-2xl p-6">

//               <div className="flex items-center justify-between gap-4 mb-5">

//                 <div className="flex items-center gap-3">

//                   <div className="p-2 bg-red-100 rounded-xl">
//                     <AlertTriangle
//                       size={20}
//                       className="text-red-600"
//                     />
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-editorial font-bold text-red-900">
//                       Detected Violations
//                     </h2>

//                     <p className="text-xs text-red-600 mt-0.5">
//                       AI compliance findings requiring attention
//                     </p>
//                   </div>

//                 </div>

//                 <span className="px-3 py-1.5 bg-white border border-red-100 rounded-full text-xs font-bold text-red-600">
//                   {violations.length}{' '}
//                   {violations.length === 1
//                     ? 'Finding'
//                     : 'Findings'}
//                 </span>

//               </div>

//               <div className="space-y-4">

//                 {violations.map(
//                   (violation, index) => {

//                     const severity =
//                       getSeverityConfig(
//                         violation.severity
//                       );

//                     const detectedValue =
//                       violation.detectedValue ||
//                       violation.detected ||
//                       violation.value ||
//                       'Not available';

//                     const ruleId =
//                       violation.ruleId ||
//                       violation.rule ||
//                       'UNKNOWN';

//                     const requirement =
//                       violation.requirement ||
//                       violation.description ||
//                       violation.field ||
//                       'Compliance requirement';

//                     const isReview =
//                       String(ruleId)
//                         .toUpperCase()
//                         .includes('REVIEW') ||
//                       String(detectedValue)
//                         .toLowerCase()
//                         .includes(
//                           'not clearly detectable'
//                         );

//                     return (

//                       <div
//                         key={
//                           violation._id ||
//                           violation.id ||
//                           `${ruleId}-${index}`
//                         }
//                         className={`bg-white rounded-2xl p-5 border shadow-sm ${
//                           isReview
//                             ? 'border-orange-200'
//                             : 'border-red-100'
//                         }`}
//                       >

//                         {/* FINDING HEADER */}

//                         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

//                           <div className="flex-1">

//                             <span
//                               className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-md border ${severity.className}`}
//                             >
//                               <span
//                                 className={`w-1.5 h-1.5 rounded-full ${severity.dot}`}
//                               />

//                               {severity.label}
//                             </span>

//                             <h3 className="font-bold text-gray-900 text-base md:text-lg mt-3 leading-snug">
//                               {requirement}
//                             </h3>

//                           </div>

//                           {/* REVIEW ICONS */}

//                           <div className="flex items-center gap-2">

//                             <button
//                               type="button"
//                               title="Mark as compliant"
//                               className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                             >
//                               <Check size={18} />
//                             </button>

//                             <button
//                               type="button"
//                               title="Keep as violation"
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             >
//                               <X size={18} />
//                             </button>

//                           </div>

//                         </div>

//                         {/* FINDING DETAILS */}

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-5">

//                           <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">

//                             <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
//                               Detected Value
//                             </p>

//                             <p
//                               className={`font-semibold ${
//                                 isReview
//                                   ? 'text-orange-600'
//                                   : 'text-red-600'
//                               }`}
//                             >
//                               {detectedValue}
//                             </p>

//                           </div>

//                           <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">

//                             <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
//                               Rule ID
//                             </p>

//                             <p className="font-semibold text-gray-900">
//                               {ruleId}
//                             </p>

//                           </div>

//                         </div>

//                         {/* REVIEW MESSAGE */}

//                         {isReview && (
//                           <div className="mt-4 flex items-start gap-2 bg-orange-50 border border-orange-100 rounded-xl p-3 text-xs text-orange-700">

//                             <Info
//                               size={15}
//                               className="mt-0.5 shrink-0"
//                             />

//                             <p>
//                               The declaration could not be
//                               confidently detected from the
//                               available image evidence.
//                               Officer verification is recommended.
//                             </p>

//                           </div>
//                         )}

//                       </div>

//                     );
//                   }
//                 )}

//               </div>

//             </div>

//           ) : (

//             <div className="bg-green-50 border border-green-200 rounded-2xl p-7">

//               <div className="flex items-start gap-4">

//                 <div className="p-2 bg-green-100 rounded-xl">
//                   <Check
//                     size={24}
//                     className="text-green-600"
//                   />
//                 </div>

//                 <div>

//                   <h2 className="font-bold text-green-800 text-lg">
//                     No violations detected
//                   </h2>

//                   <p className="text-sm text-green-700 mt-1">
//                     The AI analysis did not identify any
//                     compliance violations in the uploaded
//                     package evidence.
//                   </p>

//                 </div>

//               </div>

//             </div>

//           )}

//           {/* ==================================================
//               DECLARATIONS
//           ================================================== */}

//           <div className="bg-bg-card rounded-2xl border border-border shadow-soft overflow-hidden">

//             <div className="p-6 border-b border-border flex items-center justify-between">

//               <div>

//                 <h2 className="text-lg font-editorial font-bold text-primary">
//                   Extracted Declarations
//                 </h2>

//                 <p className="text-xs text-gray-400 mt-1">
//                   Information detected from package labels
//                 </p>

//               </div>

//               <span className="px-3 py-1.5 bg-bg-soft rounded-full text-xs font-bold text-gray-500">
//                 {declarations.length} detected
//               </span>

//             </div>

//             {declarations.length > 0 ? (

//               <div className="overflow-x-auto">

//                 <table className="w-full text-left text-sm">

//                   <thead className="bg-bg-soft text-gray-500">

//                     <tr>

//                       <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
//                         Field
//                       </th>

//                       <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
//                         Detected Value
//                       </th>

//                       <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
//                         Confidence
//                       </th>

//                       <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
//                         Status
//                       </th>

//                     </tr>

//                   </thead>

//                   <tbody className="divide-y divide-border">

//                     {declarations.map(
//                       (dec, index) => {

//                         const confidence = Math.max(
//                           0,
//                           Math.min(
//                             100,
//                             Number(
//                               dec.confidence || 0
//                             )
//                           )
//                         );

//                         return (

//                           <tr
//                             key={
//                               dec._id ||
//                               dec.id ||
//                               index
//                             }
//                             className="hover:bg-gray-50 transition-colors"
//                           >

//                             <td className="px-6 py-4 font-semibold text-gray-900">
//                               {formatFieldName(
//                                 dec.field
//                               )}
//                             </td>

//                             <td className="px-6 py-4 text-gray-700 max-w-md">
//                               <div className="break-words">
//                                 {dec.value || '-'}
//                               </div>
//                             </td>

//                             <td className="px-6 py-4">

//                               <div className="flex items-center gap-2">

//                                 <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">

//                                   <div
//                                     className="h-full bg-green-500 rounded-full transition-all"
//                                     style={{
//                                       width: `${confidence}%`,
//                                     }}
//                                   />

//                                 </div>

//                                 <span className="text-xs font-medium text-gray-500">
//                                   {Math.round(
//                                     confidence
//                                   )}
//                                   %
//                                 </span>

//                               </div>

//                             </td>

//                             <td className="px-6 py-4">

//                               <span className="inline-flex text-[10px] font-bold tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-md border border-blue-100">
//                                 {formatStatus(
//                                   dec.verificationStatus
//                                 )}
//                               </span>

//                             </td>

//                           </tr>

//                         );
//                       }
//                     )}

//                   </tbody>

//                 </table>

//               </div>

//             ) : (

//               <div className="p-10 text-center">

//                 <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
//                   <FileText
//                     size={22}
//                     className="text-gray-400"
//                   />
//                 </div>

//                 <p className="mt-4 font-semibold text-gray-500">
//                   No declarations extracted yet
//                 </p>

//                 <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
//                   The AI could not confidently extract
//                   declaration text from the available package
//                   image.
//                 </p>

//               </div>

//             )}

//           </div>

//         </div>

//         {/* ====================================================
//             RIGHT - EVIDENCE
//         ==================================================== */}

//         <div className="bg-bg-card rounded-2xl border border-border shadow-soft p-6 h-fit lg:sticky lg:top-6">

//           <div className="flex items-center justify-between mb-4">

//             <div>

//               <h2 className="text-lg font-editorial font-bold text-primary">
//                 Analyzed Packages
//               </h2>

//               <p className="text-xs text-gray-400 mt-1">
//                 Uploaded inspection evidence
//               </p>

//             </div>

//             {images.length > 0 && (
//               <span className="text-xs font-bold text-gray-400">
//                 {activeImageIndex + 1} / {images.length}
//               </span>
//             )}

//           </div>

//           {images.length > 0 && activeImage ? (

//             <div className="space-y-4">

//               {/* MAIN IMAGE */}

//               <div
//                 className="relative rounded-2xl overflow-hidden border border-border bg-gray-100 group cursor-pointer"
//                 onClick={() =>
//                   setShowEvidence(true)
//                 }
//               >

//                 <img
//                   src={activeImage.url}
//                   alt={
//                     activeImage.angle ||
//                     'Package evidence'
//                   }
//                   className="w-full h-72 object-contain bg-gray-100"
//                   onLoad={() => {
//                     console.log(
//                       '✅ EVIDENCE IMAGE LOADED:',
//                       activeImage.url
//                     );
//                   }}
//                   onError={(event) => {
//                     console.error(
//                       '❌ EVIDENCE IMAGE FAILED:',
//                       activeImage.url
//                     );

//                     if (
//                       activeImage.filename &&
//                       !event.currentTarget.dataset.fallback
//                     ) {
//                       event.currentTarget.dataset.fallback = 'true';
//                       event.currentTarget.src =
//                         `${BACKEND_URL}/api/debug/image/${encodeURIComponent(
//                           activeImage.filename
//                         )}`;
//                     } else {
//                       event.currentTarget.style.display = 'none';
//                     }
//                   }}
//                 />

//                 {/* HOVER */}

//                 <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

//                   <div className="bg-white/90 p-3 rounded-full">

//                     <Maximize2
//                       size={25}
//                       className="text-gray-800"
//                     />

//                   </div>

//                 </div>

//                 {/* ANGLE */}

//                 <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm">
//                   {activeImage.angle}
//                 </div>

//                 {/* IMAGE NUMBER */}

//                 <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
//                   {activeImageIndex + 1} / {images.length}
//                 </div>

//               </div>

//               {/* NAVIGATION */}

//               {images.length > 1 && (
//                 <div className="flex items-center justify-between">

//                   <button
//                     type="button"
//                     onClick={previousImage}
//                     className="p-2 bg-bg-soft border border-border rounded-lg hover:bg-gray-100 transition-colors"
//                     title="Previous image"
//                   >
//                     <ChevronLeft size={18} />
//                   </button>

//                   <span className="text-xs text-gray-400 font-medium">
//                     {activeImage.angle}
//                   </span>

//                   <button
//                     type="button"
//                     onClick={nextImage}
//                     className="p-2 bg-bg-soft border border-border rounded-lg hover:bg-gray-100 transition-colors"
//                     title="Next image"
//                   >
//                     <ChevronRight size={18} />
//                   </button>

//                 </div>
//               )}

//               {/* THUMBNAILS */}

//               <div className="grid grid-cols-4 gap-2">

//                 {images.map(
//                   (image, index) => (

//                     <button
//                       type="button"
//                       key={
//                         image._id ||
//                         image.id ||
//                         index
//                       }
//                       onClick={() =>
//                         selectImage(index)
//                       }
//                       className={`relative rounded-lg overflow-hidden border-2 transition-all ${
//                         activeImageIndex === index
//                           ? 'border-accent ring-2 ring-accent/20'
//                           : 'border-transparent opacity-60 hover:opacity-100'
//                       }`}
//                     >

//                       <img
//                         src={image.url}
//                         className="w-full h-16 object-cover bg-gray-100"
//                         alt={
//                           image.angle ||
//                           'Package'
//                         }
//                         onError={(event) => {
//                           console.error(
//                             '❌ THUMBNAIL FAILED:',
//                             image.url
//                           );

//                           if (
//                             image.filename &&
//                             !event.currentTarget.dataset.fallback
//                           ) {
//                             event.currentTarget.dataset.fallback = 'true';
//                             event.currentTarget.src =
//                               `${BACKEND_URL}/api/debug/image/${encodeURIComponent(
//                                 image.filename
//                               )}`;
//                           }
//                         }}
//                       />

//                       <span className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[8px] font-bold uppercase tracking-wide py-0.5 rounded">
//                         {image.angle}
//                       </span>

//                     </button>

//                   )
//                 )}

//               </div>

//               {/* IMAGE DETAILS */}

//               <div className="bg-bg-soft border border-border rounded-xl p-4">

//                 <div className="flex items-center justify-between">

//                   <div>

//                     <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
//                       Detected Angle
//                     </p>

//                     <p className="text-sm font-bold text-primary mt-1">
//                       {activeImage.angle}
//                     </p>

//                   </div>

//                   <div className="p-2 bg-white rounded-lg border border-border">
//                     <Focus
//                       size={18}
//                       className="text-primary"
//                     />
//                   </div>

//                 </div>

//               </div>

//               {/* OPEN EVIDENCE */}

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowEvidence(true)
//                 }
//                 className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
//               >
//                 <Focus size={16} />
//                 Open Evidence Viewer
//               </button>

//             </div>

//           ) : (

//             <div className="h-64 flex flex-col items-center justify-center text-sm text-gray-400">

//               <Eye
//                 size={30}
//                 className="mb-3 text-gray-300"
//               />

//               <p>
//                 No images uploaded for this inspection.
//               </p>

//             </div>

//           )}

//         </div>

//       </div>

//       {/* ======================================================
//           EVIDENCE VIEWER MODAL
//       ====================================================== */}

//       {showEvidence && activeImage && (

//         <div
//           className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col lg:flex-row"
//           onClick={() =>
//             setShowEvidence(false)
//           }
//         >

//           {/* IMAGE AREA */}

//           <div
//             className="flex-1 min-h-[65vh] lg:min-h-0 p-6 md:p-10 flex items-center justify-center relative"
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//           >

//             {/* CLOSE */}

//             <button
//               type="button"
//               onClick={() =>
//                 setShowEvidence(false)
//               }
//               className="absolute top-5 left-5 text-white hover:bg-white/10 p-3 rounded-xl transition-colors"
//               title="Close"
//             >
//               <X size={24} />
//             </button>

//             {/* PREVIOUS */}

//             {images.length > 1 && (
//               <button
//                 type="button"
//                 onClick={previousImage}
//                 className="absolute left-5 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
//                 title="Previous image"
//               >
//                 <ChevronLeft size={25} />
//               </button>
//             )}

//             {/* IMAGE */}

//             <div className="relative max-w-6xl w-full h-full flex items-center justify-center">

//               <img
//                 src={activeImage.url}
//                 alt="Package evidence"
//                 className="max-h-[80vh] max-w-full rounded-xl shadow-2xl object-contain"
//                 onLoad={() => {
//                   console.log(
//                     '✅ MODAL IMAGE LOADED:',
//                     activeImage.url
//                   );
//                 }}
//                 onError={(event) => {
//                   console.error(
//                     '❌ MODAL IMAGE FAILED:',
//                     activeImage.url
//                   );

//                   if (
//                     activeImage.filename &&
//                     !event.currentTarget.dataset.fallback
//                   ) {
//                     event.currentTarget.dataset.fallback = 'true';
//                     event.currentTarget.src =
//                       `${BACKEND_URL}/api/debug/image/${encodeURIComponent(
//                         activeImage.filename
//                       )}`;
//                   }
//                 }}
//               />

//               <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
//                 {activeImage.angle}
//               </div>

//             </div>

//             {/* NEXT */}

//             {images.length > 1 && (
//               <button
//                 type="button"
//                 onClick={nextImage}
//                 className="absolute right-5 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
//                 title="Next image"
//               >
//                 <ChevronRight size={25} />
//               </button>
//             )}

//           </div>

//           {/* SIDE PANEL */}

//           <div
//             className="w-full lg:w-96 bg-bg-base border-t lg:border-t-0 lg:border-l border-border flex flex-col"
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//           >

//             <div className="p-6 border-b border-border bg-white">

//               <div className="flex items-center gap-3">

//                 <div className="p-2 bg-primary rounded-xl">
//                   <Focus
//                     size={19}
//                     className="text-white"
//                   />
//                 </div>

//                 <div>

//                   <h2 className="text-xl font-editorial font-bold text-primary">
//                     Evidence Review
//                   </h2>

//                   <p className="text-xs text-gray-500 mt-1">
//                     Review uploaded package evidence
//                   </p>

//                 </div>

//               </div>

//             </div>

//             <div className="p-6 space-y-4">

//               {/* IMAGE INFO */}

//               <div className="bg-white border border-border p-5 rounded-xl">

//                 <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                   Image Angle
//                 </span>

//                 <p className="text-lg font-bold text-primary mt-2">
//                   {activeImage.angle}
//                 </p>

//               </div>

//               {/* IMAGE COUNT */}

//               <div className="bg-white border border-border p-5 rounded-xl">

//                 <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                   Evidence Image
//                 </span>

//                 <p className="text-lg font-bold text-primary mt-2">
//                   {activeImageIndex + 1}{' '}
//                   <span className="text-gray-400 font-normal">
//                     of {images.length}
//                   </span>
//                 </p>

//               </div>

//               {/* FILE */}

//               {activeImage.filename && (
//                 <div className="bg-white border border-border p-5 rounded-xl">

//                   <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                     Evidence File
//                   </span>

//                   <p className="text-sm font-medium text-gray-700 mt-2 break-all">
//                     {activeImage.filename}
//                   </p>

//                 </div>
//               )}

//               {/* DOWNLOAD */}

//               <button
//                 type="button"
//                 onClick={downloadEvidence}
//                 className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
//               >
//                 Open Original Evidence
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// };

// export default InspectionResult;

import React, {
  useEffect,
  useMemo,
  useState
} from 'react';

import { useParams } from 'react-router-dom';

import {
  Check,
  X,
  Maximize2,
  AlertTriangle,
  Focus,
  Loader2,
  FileText,
  ShieldCheck,
  ShieldAlert,
  Eye,
  ChevronLeft,
  ChevronRight,
  Info,
  Bot,
  Factory,
  Package,
  IndianRupee,
  Scale,
  RefreshCw
} from 'lucide-react';

import { inspectionsAPI } from '../services/api';


// ============================================================
// BACKEND URL
// ============================================================

const BACKEND_URL =
  'http://localhost:5000';


// ============================================================
// IMAGE URL HELPER
// ============================================================

const getImageUrl = (
  imageOrUrl
) => {
  if (!imageOrUrl) {
    return '';
  }


  const imageUrl =
    typeof imageOrUrl === 'string'
      ? imageOrUrl
      : imageOrUrl.imageUrl ||
        imageOrUrl.url ||
        imageOrUrl.path ||
        imageOrUrl.filename ||
        '';


  if (!imageUrl) {
    return '';
  }


  const value =
    String(imageUrl).trim();


  if (
    value.startsWith(
      'http://'
    ) ||
    value.startsWith(
      'https://'
    ) ||
    value.startsWith(
      'data:'
    )
  ) {
    return value;
  }


  const normalized =
    value.replace(
      /\\/g,
      '/'
    );


  if (
    normalized.startsWith(
      '/uploads/'
    )
  ) {
    return `${BACKEND_URL}${normalized}`;
  }


  if (
    normalized.startsWith(
      'uploads/'
    )
  ) {
    return `${BACKEND_URL}/${normalized}`;
  }


  if (
    normalized.startsWith('/')
  ) {
    return `${BACKEND_URL}${normalized}`;
  }


  const filename =
    normalized.split('/').pop();


  return `${BACKEND_URL}/uploads/${encodeURIComponent(
    filename || value
  )}`;
};


// ============================================================
// STATUS HELPERS
// ============================================================

const getStatusConfig = (
  status
) => {
  switch (status) {
    case 'COMPLIANT':
      return {
        label: 'COMPLIANT',
        className:
          'bg-green-100 text-green-700 border-green-200',
        icon: ShieldCheck
      };


    case 'POTENTIAL_VIOLATION':
      return {
        label:
          'POTENTIAL VIOLATION',
        className:
          'bg-red-100 text-red-700 border-red-200',
        icon: ShieldAlert
      };


    case 'REQUIRES_REVIEW':
    case 'UNDER_REVIEW':
    default:
      return {
        label:
          'REQUIRES REVIEW',
        className:
          'bg-orange-100 text-orange-700 border-orange-200',
        icon: Info
      };
  }
};


// ============================================================
// SEVERITY HELPERS
// ============================================================

const getSeverityConfig = (
  severity
) => {
  const value =
    String(
      severity || 'MEDIUM'
    ).toUpperCase();


  if (value === 'CRITICAL') {
    return {
      label:
        'CRITICAL SEVERITY',
      className:
        'bg-red-100 text-red-700 border-red-200',
      dot: 'bg-red-700'
    };
  }


  if (value === 'HIGH') {
    return {
      label:
        'HIGH SEVERITY',
      className:
        'bg-red-50 text-red-600 border-red-100',
      dot: 'bg-red-500'
    };
  }


  if (value === 'LOW') {
    return {
      label:
        'LOW SEVERITY',
      className:
        'bg-blue-50 text-blue-600 border-blue-100',
      dot: 'bg-blue-500'
    };
  }


  return {
    label:
      'MEDIUM SEVERITY',
    className:
      'bg-orange-50 text-orange-600 border-orange-100',
    dot: 'bg-orange-500'
  };
};


// ============================================================
// VALUE HELPERS
// ============================================================

const formatFieldName = (
  field
) => {
  if (!field) {
    return '-';
  }


  return String(field)
    .replaceAll(
      '_',
      ' '
    )
    .replace(
      /\b\w/g,
      (char) =>
        char.toUpperCase()
    );
};


const formatStatus = (
  value
) => {
  if (!value) {
    return 'AI DETECTED';
  }


  return String(value)
    .replaceAll(
      '_',
      ' '
    )
    .toUpperCase();
};


// ============================================================
// CONFIDENCE HELPERS
// ============================================================

const normalizeConfidence = (
  value
) => {
  const number =
    Number(value);


  if (!Number.isFinite(number)) {
    return 0;
  }


  if (number <= 1) {
    return Math.max(
      0,
      Math.min(
        100,
        number * 100
      )
    );
  }


  return Math.max(
    0,
    Math.min(
      100,
      number
    )
  );
};


const getConfidenceStyle = (
  confidence
) => {
  if (confidence >= 80) {
    return {
      text:
        'text-green-700',
      bg:
        'bg-green-50',
      border:
        'border-green-200',
      bar:
        'bg-green-500',
      label:
        'HIGH CONFIDENCE'
    };
  }


  if (confidence >= 60) {
    return {
      text:
        'text-blue-700',
      bg:
        'bg-blue-50',
      border:
        'border-blue-200',
      bar:
        'bg-blue-500',
      label:
        'MEDIUM CONFIDENCE'
    };
  }


  if (confidence > 0) {
    return {
      text:
        'text-orange-700',
      bg:
        'bg-orange-50',
      border:
        'border-orange-200',
      bar:
        'bg-orange-500',
      label:
        'LOW CONFIDENCE'
    };
  }


  return {
    text:
      'text-gray-600',
    bg:
      'bg-gray-50',
    border:
      'border-gray-200',
    bar:
      'bg-gray-400',
    label:
      'NOT AVAILABLE'
  };
};


// ============================================================
// INSPECTION RESULT
// ============================================================

const InspectionResult = () => {
  const { id } =
    useParams();


  const [
    inspection,
    setInspection
  ] = useState(null);


  const [
    activeImageIndex,
    setActiveImageIndex
  ] = useState(0);


  const [
    showEvidence,
    setShowEvidence
  ] = useState(false);


  const [
    isLoading,
    setIsLoading
  ] = useState(true);


  const [
    isRefreshing,
    setIsRefreshing
  ] = useState(false);


  const [
    error,
    setError
  ] = useState('');


  // ==========================================================
  // LOAD INSPECTION
  // ==========================================================

  const loadInspection = async (
    showRefreshLoader = false
  ) => {
    if (!id) {
      setError(
        'Inspection ID is missing.'
      );

      setIsLoading(false);

      return;
    }


    try {
      if (showRefreshLoader) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }


      setError('');


      console.log(
        '🔍 Loading inspection result:',
        id
      );


      const response =
        await inspectionsAPI.getById(
          id
        );


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


      setInspection(
        inspectionData
      );


      if (
        Array.isArray(
          inspectionData.images
        ) &&
        inspectionData.images
          .length > 0
      ) {
        setActiveImageIndex(0);
      }
    } catch (err) {
      console.error(
        '❌ Failed to load inspection:',
        err.response?.data ||
          err
      );


      setError(
        err.response?.data
          ?.message ||
          err.message ||
          'Failed to load inspection results.'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };


  useEffect(() => {
    loadInspection();


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  // ==========================================================
  // LOADING
  // ==========================================================

  if (isLoading) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={42}
            className="animate-spin mx-auto text-primary"
          />

          <p className="mt-4 text-gray-500 font-medium">
            Loading inspection
            results...
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Preparing AI compliance
            findings
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
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-xl">
              <AlertTriangle
                size={22}
              />
            </div>

            <div>
              <h2 className="font-bold text-lg">
                Unable to load
                inspection
              </h2>

              <p className="text-sm mt-1">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  loadInspection(
                    true
                  )
                }
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
              >
                Retry
              </button>
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


  // ==========================================================
  // AI SUMMARY
  // ==========================================================

  const aiConfidence =
    normalizeConfidence(
      inspection.ai?.confidence ??
        inspection.aiConfidence ??
        inspection.overallConfidence ??
        inspection.overall_confidence ??
        0
    );


  const confidenceStyle =
    getConfidenceStyle(
      aiConfidence
    );


  const extractionCoverage =
    Math.max(
      0,
      Math.min(
        100,
        Number(
          inspection.ai
            ?.extractionCoverage ??
            inspection.extractionCoverage ??
            0
        )
      )
    );


  // ==========================================================
  // PRODUCT
  // ==========================================================

  const productName =
    inspection.ai
      ?.productName &&
    !String(
      inspection.ai.productName
    )
      .toLowerCase()
      .includes(
        'not clearly'
      )
      ? inspection.ai.productName
      : inspection.detectedProduct &&
        !String(
          inspection.detectedProduct
        )
          .toLowerCase()
          .includes(
            'not clearly'
          )
        ? inspection.detectedProduct
        : inspection.commodityName ||
          inspection.productId
            ?.productName ||
          inspection.productId
            ?.name ||
          'Not Clearly Detected';


  // ==========================================================
  // MANUFACTURER
  // ==========================================================

  const manufacturer =
    inspection.ai
      ?.manufacturer &&
    !String(
      inspection.ai.manufacturer
    )
      .toLowerCase()
      .includes(
        'not clearly'
      )
      ? inspection.ai.manufacturer
      : inspection.detectedManufacturer &&
        !String(
          inspection.detectedManufacturer
        )
          .toLowerCase()
          .includes(
            'not clearly'
          )
        ? inspection.detectedManufacturer
        : inspection.productId
            ?.manufacturer ||
          'Not Clearly Detected';


  // ==========================================================
  // MRP
  // ==========================================================

  const mrp =
    inspection.ai?.mrp ||
    inspection.detectedMRP ||
    'Not Clearly Detectable';


  // ==========================================================
  // NET QUANTITY
  // ==========================================================

  const netQuantity =
    inspection.ai
      ?.netQuantity ||
    inspection.detectedNetQuantity ||
    'Not Clearly Detectable';


  // ==========================================================
  // CATEGORY
  // ==========================================================

  const category =
    inspection.productCategory ||
    inspection.productId
      ?.category ||
    '';


  // ==========================================================
  // OFFICER
  // ==========================================================

  const officerName =
    inspection.officerId
      ?.name ||
    inspection.officer
      ?.name ||
    inspection.officerName ||
    'Officer';


  // ==========================================================
  // DATE
  // ==========================================================

  const date =
    inspection.inspectionDate
      ? new Date(
          inspection.inspectionDate
        ).toLocaleDateString(
          'en-IN'
        )
      : inspection.createdAt
        ? new Date(
            inspection.createdAt
          ).toLocaleDateString(
            'en-IN'
          )
        : '-';


  // ==========================================================
  // VIOLATIONS
  // ==========================================================

  const violations =
    Array.isArray(
      inspection.violations
    )
      ? inspection.violations
      : [];


  // ==========================================================
  // DECLARATIONS
  // ==========================================================

  const declarations =
    Array.isArray(
      inspection.declarations
    )
      ? inspection.declarations
      : [];


  // ==========================================================
  // IMAGES
  // ==========================================================

  const images =
    Array.isArray(
      inspection.images
    )
      ? inspection.images.map(
          (image) => {
            const resolvedUrl =
              getImageUrl(
                image
              );


            console.log(
              '🖼️ RESOLVED EVIDENCE IMAGE:',
              {
                filename:
                  image?.filename,

                imageUrl:
                  image?.imageUrl,

                resolvedUrl,

                angle:
                  image?.angle
              }
            );


            return {
              ...image,

              url:
                resolvedUrl,

              angle:
                image.angle ||
                'UNKNOWN'
            };
          }
        )
      : [];


  const activeImage =
    images[
      activeImageIndex
    ] ||
    images[0] ||
    null;


  // ==========================================================
  // STATUS
  // ==========================================================

  const overallStatus =
    inspection.complianceStatus ||
    'REQUIRES_REVIEW';


  const statusConfig =
    getStatusConfig(
      overallStatus
    );


  const StatusIcon =
    statusConfig.icon;


  // ==========================================================
  // REVIEW STATUS
  // ==========================================================

  const hasReviewViolations =
    violations.some(
      (violation) => {
        const ruleId =
          String(
            violation.ruleId ||
              violation.rule ||
              ''
          ).toUpperCase();


        const detectedValue =
          String(
            violation.detectedValue ||
              violation.detected ||
              ''
          ).toLowerCase();


        return (
          ruleId.includes(
            'REVIEW'
          ) ||
          detectedValue.includes(
            'not clearly detectable'
          )
        );
      }
    );


  // ==========================================================
  // IMAGE NAVIGATION
  // ==========================================================

  const selectImage = (
    index
  ) => {
    if (
      index < 0 ||
      index >= images.length
    ) {
      return;
    }


    setActiveImageIndex(
      index
    );
  };


  const previousImage = () => {
    if (!images.length) {
      return;
    }


    setActiveImageIndex(
      (current) =>
        current === 0
          ? images.length - 1
          : current - 1
    );
  };


  const nextImage = () => {
    if (!images.length) {
      return;
    }


    setActiveImageIndex(
      (current) =>
        current ===
        images.length - 1
          ? 0
          : current + 1
    );
  };


  // ==========================================================
  // DOWNLOAD IMAGE
  // ==========================================================

  const downloadEvidence =
    () => {
      if (
        !activeImage?.url
      ) {
        return;
      }


      const link =
        document.createElement(
          'a'
        );


      link.href =
        activeImage.url;


      link.target =
        '_blank';


      link.rel =
        'noopener noreferrer';


      link.click();
    };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="max-w-7xl mx-auto space-y-7 pb-12">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="bg-bg-card rounded-2xl shadow-soft border border-border overflow-hidden">

        <div className="p-6 md:p-8">

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

            {/* LEFT HEADER */}

            <div>

              <div className="flex flex-wrap items-center gap-3 mb-3">

                <h1 className="text-2xl md:text-3xl font-editorial font-bold text-primary">
                  {inspectionId}
                </h1>


                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${statusConfig.className}`}
                >
                  <StatusIcon
                    size={14}
                  />

                  {statusConfig.label}
                </span>

              </div>


              <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-gray-500">

                <p>
                  <span className="font-semibold text-gray-700">
                    Product:
                  </span>{' '}

                  {productName}
                </p>


                {category && (
                  <p>
                    <span className="font-semibold text-gray-700">
                      Category:
                    </span>{' '}

                    {category}
                  </p>
                )}


                <p>
                  <span className="font-semibold text-gray-700">
                    Date:
                  </span>{' '}

                  {date}
                </p>


                <p>
                  <span className="font-semibold text-gray-700">
                    Officer:
                  </span>{' '}

                  {officerName}
                </p>

              </div>

            </div>


            {/* HEADER ACTIONS */}

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() =>
                  window.print()
                }
                className="px-4 py-2.5 bg-bg-soft border border-border rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <FileText
                  size={17}
                />

                Download PDF
              </button>


              <button
                type="button"
                onClick={() =>
                  loadInspection(
                    true
                  )
                }
                className="px-4 py-2.5 bg-bg-soft border border-border rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <RefreshCw
                  size={17}
                  className={
                    isRefreshing
                      ? 'animate-spin'
                      : ''
                  }
                />

                Refresh
              </button>


              {activeImage && (
                <button
                  type="button"
                  onClick={() =>
                    setShowEvidence(
                      true
                    )
                  }
                  className="px-4 py-2.5 bg-primary text-white rounded-xl font-medium flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
                >
                  <Focus
                    size={17}
                  />

                  Evidence Viewer
                </button>
              )}

            </div>

          </div>

        </div>


        {/* REVIEW NOTICE */}

        {hasReviewViolations && (
          <div className="px-6 md:px-8 py-3 bg-orange-50 border-t border-orange-100">

            <div className="flex items-center gap-2 text-orange-700 text-sm">

              <Info
                size={17}
              />

              <span>
                Some declarations
                could not be
                confidently detected.
                Officer review is
                recommended.
              </span>

            </div>

          </div>
        )}

      </div>


      {/* ======================================================
          AI ANALYSIS SUMMARY
      ====================================================== */}

      <div className="bg-bg-card rounded-2xl border border-border shadow-soft overflow-hidden">

        <div className="p-6 border-b border-border">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-primary/10 rounded-xl">
                <Bot
                  size={23}
                  className="text-primary"
                />
              </div>

              <div>

                <h2 className="text-lg font-editorial font-bold text-primary">
                  AI Analysis Summary
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Automated package
                  analysis and field
                  extraction
                </p>

              </div>

            </div>


            <div
              className={`px-3 py-1.5 rounded-full border text-xs font-bold ${confidenceStyle.bg} ${confidenceStyle.text} ${confidenceStyle.border}`}
            >
              {confidenceStyle.label}
            </div>

          </div>

        </div>


        <div className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* AI CONFIDENCE */}

            <div className={`rounded-xl border p-5 ${confidenceStyle.bg} ${confidenceStyle.border}`}>

              <div className="flex items-center justify-between mb-3">

                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                    AI Confidence
                  </p>

                  <p className={`text-3xl font-bold mt-1 ${confidenceStyle.text}`}>
                    {Math.round(
                      aiConfidence
                    )}
                    %
                  </p>
                </div>

                <div className="p-2 bg-white/70 rounded-lg">
                  <Bot
                    size={20}
                    className={
                      confidenceStyle.text
                    }
                  />
                </div>

              </div>


              <div className="w-full h-2 bg-white/70 rounded-full overflow-hidden">

                <div
                  className={`h-full rounded-full transition-all ${confidenceStyle.bar}`}
                  style={{
                    width: `${aiConfidence}%`
                  }}
                />

              </div>


              <p className="text-[11px] text-gray-500 mt-2">
                Confidence in the
                available AI analysis
                evidence
              </p>

            </div>


            {/* EXTRACTION COVERAGE */}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-wider font-bold text-blue-600">
                    Extraction Coverage
                  </p>

                  <p className="text-3xl font-bold text-blue-700 mt-1">
                    {extractionCoverage}%
                  </p>

                </div>

                <div className="p-2 bg-white rounded-lg">
                  <Package
                    size={20}
                    className="text-blue-600"
                  />
                </div>

              </div>


              <p className="text-[11px] text-blue-600 mt-3">
                Product, manufacturer,
                MRP and quantity
                information detected
              </p>

            </div>


            {/* DECLARATIONS */}

            <div className="bg-green-50 border border-green-200 rounded-xl p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-wider font-bold text-green-600">
                    Declarations
                  </p>

                  <p className="text-3xl font-bold text-green-700 mt-1">
                    {declarations.length}
                  </p>

                </div>

                <div className="p-2 bg-white rounded-lg">
                  <FileText
                    size={20}
                    className="text-green-600"
                  />
                </div>

              </div>


              <p className="text-[11px] text-green-600 mt-3">
                Package declarations
                extracted by AI
              </p>

            </div>


            {/* FINDINGS */}

            <div className="bg-red-50 border border-red-200 rounded-xl p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-wider font-bold text-red-600">
                    Findings
                  </p>

                  <p className="text-3xl font-bold text-red-700 mt-1">
                    {violations.length}
                  </p>

                </div>

                <div className="p-2 bg-white rounded-lg">
                  <AlertTriangle
                    size={20}
                    className="text-red-600"
                  />
                </div>

              </div>


              <p className="text-[11px] text-red-600 mt-3">
                Compliance findings
                requiring attention
              </p>

            </div>

          </div>


          {/* LOW CONFIDENCE MESSAGE */}

          {aiConfidence <
            60 && (
            <div className="mt-5 flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">

              <Info
                size={18}
                className="text-orange-600 mt-0.5 shrink-0"
              />

              <div>

                <p className="text-sm font-semibold text-orange-800">
                  AI confidence is
                  limited
                </p>

                <p className="text-xs text-orange-700 mt-1">
                  Some package
                  information could not
                  be confidently
                  extracted from the
                  available evidence.
                  Officer verification
                  is recommended.
                </p>

              </div>

            </div>
          )}

        </div>

      </div>


      {/* ======================================================
          DETECTED PRODUCT INFORMATION
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* PRODUCT */}

        <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-soft">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                Product / Commodity
              </p>

              <p className="text-base font-bold text-primary mt-2 break-words">
                {productName}
              </p>

            </div>

            <div className="p-3 bg-blue-50 rounded-xl">
              <Package
                size={21}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>


        {/* MANUFACTURER */}

        <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-soft">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                Manufacturer
              </p>

              <p className="text-base font-bold text-primary mt-2 break-words">
                {manufacturer}
              </p>

            </div>

            <div className="p-3 bg-purple-50 rounded-xl">
              <Factory
                size={21}
                className="text-purple-600"
              />
            </div>

          </div>

        </div>


        {/* MRP */}

        <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-soft">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                Maximum Retail Price
              </p>

              <p className="text-base font-bold text-primary mt-2 break-words">
                {mrp}
              </p>

            </div>

            <div className="p-3 bg-green-50 rounded-xl">
              <IndianRupee
                size={21}
                className="text-green-600"
              />
            </div>

          </div>

        </div>


        {/* NET QUANTITY */}

        <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-soft">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                Net Quantity
              </p>

              <p className="text-base font-bold text-primary mt-2 break-words">
                {netQuantity}
              </p>

            </div>

            <div className="p-3 bg-orange-50 rounded-xl">
              <Scale
                size={21}
                className="text-orange-600"
              />
            </div>

          </div>

        </div>

      </div>


      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

        {/* ====================================================
            LEFT - FINDINGS
        ==================================================== */}

        <div className="lg:col-span-2 space-y-7">

          {/* ==================================================
              VIOLATIONS
          ================================================== */}

          {violations.length >
          0 ? (

            <div className="bg-red-50/40 border border-red-100 rounded-2xl p-6">

              <div className="flex items-center justify-between gap-4 mb-5">

                <div className="flex items-center gap-3">

                  <div className="p-2 bg-red-100 rounded-xl">
                    <AlertTriangle
                      size={20}
                      className="text-red-600"
                    />
                  </div>

                  <div>

                    <h2 className="text-lg font-editorial font-bold text-red-900">
                      Detected Violations
                    </h2>

                    <p className="text-xs text-red-600 mt-0.5">
                      AI compliance findings
                      requiring attention
                    </p>

                  </div>

                </div>


                <span className="px-3 py-1.5 bg-white border border-red-100 rounded-full text-xs font-bold text-red-600">
                  {violations.length}{' '}

                  {violations.length ===
                  1
                    ? 'Finding'
                    : 'Findings'}
                </span>

              </div>


              <div className="space-y-4">

                {violations.map(
                  (
                    violation,
                    index
                  ) => {

                    const severity =
                      getSeverityConfig(
                        violation.severity
                      );


                    const detectedValue =
                      violation.detectedValue ||
                      violation.detected ||
                      violation.value ||
                      'Not available';


                    const ruleId =
                      violation.ruleId ||
                      violation.rule ||
                      'UNKNOWN';


                    const requirement =
                      violation.requirement ||
                      violation.description ||
                      violation.field ||
                      'Compliance requirement';


                    const isReview =
                      String(
                        ruleId
                      )
                        .toUpperCase()
                        .includes(
                          'REVIEW'
                        ) ||
                      String(
                        detectedValue
                      )
                        .toLowerCase()
                        .includes(
                          'not clearly detectable'
                        );


                    return (
                      <div
                        key={
                          violation._id ||
                          violation.id ||
                          `${ruleId}-${index}`
                        }
                        className={`bg-white rounded-2xl p-5 border shadow-sm ${
                          isReview
                            ? 'border-orange-200'
                            : 'border-red-100'
                        }`}
                      >

                        {/* FINDING HEADER */}

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

                          <div className="flex-1">

                            <span
                              className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-md border ${severity.className}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${severity.dot}`}
                              />

                              {severity.label}
                            </span>


                            <h3 className="font-bold text-gray-900 text-base md:text-lg mt-3 leading-snug">
                              {requirement}
                            </h3>

                          </div>


                          {/* REVIEW ICONS */}

                          <div className="flex items-center gap-2">

                            <button
                              type="button"
                              title="Mark as compliant"
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <Check
                                size={18}
                              />
                            </button>


                            <button
                              type="button"
                              title="Keep as violation"
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X
                                size={18}
                              />
                            </button>

                          </div>

                        </div>


                        {/* FINDING DETAILS */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-5">

                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">

                            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
                              Detected Value
                            </p>

                            <p
                              className={`font-semibold ${
                                isReview
                                  ? 'text-orange-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {detectedValue}
                            </p>

                          </div>


                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">

                            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
                              Rule ID
                            </p>

                            <p className="font-semibold text-gray-900">
                              {ruleId}
                            </p>

                          </div>

                        </div>


                        {/* REVIEW MESSAGE */}

                        {isReview && (
                          <div className="mt-4 flex items-start gap-2 bg-orange-50 border border-orange-100 rounded-xl p-3 text-xs text-orange-700">

                            <Info
                              size={15}
                              className="mt-0.5 shrink-0"
                            />

                            <p>
                              The declaration
                              could not be
                              confidently
                              detected from
                              the available
                              image evidence.
                              Officer
                              verification
                              is recommended.
                            </p>

                          </div>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          ) : (

            <div className="bg-green-50 border border-green-200 rounded-2xl p-7">

              <div className="flex items-start gap-4">

                <div className="p-2 bg-green-100 rounded-xl">
                  <Check
                    size={24}
                    className="text-green-600"
                  />
                </div>

                <div>

                  <h2 className="font-bold text-green-800 text-lg">
                    No violations
                    detected
                  </h2>

                  <p className="text-sm text-green-700 mt-1">
                    The AI analysis did
                    not identify any
                    compliance violations
                    in the uploaded
                    package evidence.
                  </p>

                </div>

              </div>

            </div>

          )}


          {/* ==================================================
              DECLARATIONS
          ================================================== */}

          <div className="bg-bg-card rounded-2xl border border-border shadow-soft overflow-hidden">

            <div className="p-6 border-b border-border flex items-center justify-between">

              <div>

                <h2 className="text-lg font-editorial font-bold text-primary">
                  Extracted
                  Declarations
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Information detected
                  from package labels
                </p>

              </div>


              <span className="px-3 py-1.5 bg-bg-soft rounded-full text-xs font-bold text-gray-500">
                {declarations.length}{' '}
                detected
              </span>

            </div>


            {declarations.length >
            0 ? (

              <div className="overflow-x-auto">

                <table className="w-full text-left text-sm">

                  <thead className="bg-bg-soft text-gray-500">

                    <tr>

                      <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                        Field
                      </th>

                      <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                        Detected Value
                      </th>

                      <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                        Confidence
                      </th>

                      <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-border">

                    {declarations.map(
                      (
                        dec,
                        index
                      ) => {

                        const confidence =
                          normalizeConfidence(
                            dec.confidence
                          );


                        const decStyle =
                          getConfidenceStyle(
                            confidence
                          );


                        return (
                          <tr
                            key={
                              dec._id ||
                              dec.id ||
                              index
                            }
                            className="hover:bg-gray-50 transition-colors"
                          >

                            <td className="px-6 py-4 font-semibold text-gray-900">
                              {formatFieldName(
                                dec.field
                              )}
                            </td>


                            <td className="px-6 py-4 text-gray-700 max-w-md">

                              <div className="break-words">
                                {dec.value ||
                                  '-'}
                              </div>

                            </td>


                            <td className="px-6 py-4">

                              <div className="flex items-center gap-2">

                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">

                                  <div
                                    className={`h-full rounded-full transition-all ${decStyle.bar}`}
                                    style={{
                                      width: `${confidence}%`
                                    }}
                                  />

                                </div>


                                <span className="text-xs font-medium text-gray-500">
                                  {Math.round(
                                    confidence
                                  )}
                                  %
                                </span>

                              </div>

                            </td>


                            <td className="px-6 py-4">

                              <span className="inline-flex text-[10px] font-bold tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-md border border-blue-100">
                                {formatStatus(
                                  dec.verificationStatus
                                )}
                              </span>

                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="p-10 text-center">

                <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">

                  <FileText
                    size={22}
                    className="text-gray-400"
                  />

                </div>


                <p className="mt-4 font-semibold text-gray-500">
                  No declarations
                  extracted yet
                </p>


                <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                  The AI could not
                  confidently extract
                  declaration text from
                  the available package
                  image.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* ====================================================
            RIGHT - EVIDENCE
        ==================================================== */}

        <div className="bg-bg-card rounded-2xl border border-border shadow-soft p-6 h-fit lg:sticky lg:top-6">

          <div className="flex items-center justify-between mb-4">

            <div>

              <h2 className="text-lg font-editorial font-bold text-primary">
                Analyzed Packages
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Uploaded inspection
                evidence
              </p>

            </div>


            {images.length >
              0 && (
              <span className="text-xs font-bold text-gray-400">
                {activeImageIndex +
                  1}{' '}
                / {images.length}
              </span>
            )}

          </div>


          {images.length >
            0 &&
          activeImage ? (

            <div className="space-y-4">

              {/* MAIN IMAGE */}

              <div
                className="relative rounded-2xl overflow-hidden border border-border bg-gray-100 group cursor-pointer"
                onClick={() =>
                  setShowEvidence(
                    true
                  )
                }
              >

                <img
                  src={
                    activeImage.url
                  }
                  alt={
                    activeImage.angle ||
                    'Package evidence'
                  }
                  className="w-full h-72 object-contain bg-gray-100"
                  onLoad={() => {
                    console.log(
                      '✅ EVIDENCE IMAGE LOADED:',
                      activeImage.url
                    );
                  }}
                  onError={(
                    event
                  ) => {
                    console.error(
                      '❌ EVIDENCE IMAGE FAILED:',
                      activeImage.url
                    );


                    if (
                      activeImage.filename &&
                      !event
                        .currentTarget
                        .dataset
                        .fallback
                    ) {
                      event.currentTarget.dataset.fallback =
                        'true';


                      event.currentTarget.src =
                        `${BACKEND_URL}/api/debug/image/${encodeURIComponent(
                          activeImage.filename
                        )}`;
                    } else {
                      event.currentTarget.style.display =
                        'none';
                    }
                  }}
                />


                {/* HOVER */}

                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

                  <div className="bg-white/90 p-3 rounded-full">

                    <Maximize2
                      size={25}
                      className="text-gray-800"
                    />

                  </div>

                </div>


                {/* ANGLE */}

                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  {activeImage.angle}
                </div>


                {/* IMAGE NUMBER */}

                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
                  {activeImageIndex +
                    1}{' '}
                  / {images.length}
                </div>

              </div>


              {/* NAVIGATION */}

              {images.length >
                1 && (
                <div className="flex items-center justify-between">

                  <button
                    type="button"
                    onClick={
                      previousImage
                    }
                    className="p-2 bg-bg-soft border border-border rounded-lg hover:bg-gray-100 transition-colors"
                    title="Previous image"
                  >
                    <ChevronLeft
                      size={18}
                    />
                  </button>


                  <span className="text-xs text-gray-400 font-medium">
                    {
                      activeImage.angle
                    }
                  </span>


                  <button
                    type="button"
                    onClick={
                      nextImage
                    }
                    className="p-2 bg-bg-soft border border-border rounded-lg hover:bg-gray-100 transition-colors"
                    title="Next image"
                  >
                    <ChevronRight
                      size={18}
                    />
                  </button>

                </div>
              )}


              {/* THUMBNAILS */}

              <div className="grid grid-cols-4 gap-2">

                {images.map(
                  (
                    image,
                    index
                  ) => (

                    <button
                      type="button"
                      key={
                        image._id ||
                        image.id ||
                        index
                      }
                      onClick={() =>
                        selectImage(
                          index
                        )
                      }
                      className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex ===
                        index
                          ? 'border-accent ring-2 ring-accent/20'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >

                      <img
                        src={
                          image.url
                        }
                        className="w-full h-16 object-cover bg-gray-100"
                        alt={
                          image.angle ||
                          'Package'
                        }
                        onError={(
                          event
                        ) => {
                          console.error(
                            '❌ THUMBNAIL FAILED:',
                            image.url
                          );


                          if (
                            image.filename &&
                            !event
                              .currentTarget
                              .dataset
                              .fallback
                          ) {
                            event.currentTarget.dataset.fallback =
                              'true';


                            event.currentTarget.src =
                              `${BACKEND_URL}/api/debug/image/${encodeURIComponent(
                                image.filename
                              )}`;
                          }
                        }}
                      />


                      <span className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[8px] font-bold uppercase tracking-wide py-0.5 rounded">
                        {image.angle}
                      </span>

                    </button>

                  )
                )}

              </div>


              {/* IMAGE DETAILS */}

              <div className="bg-bg-soft border border-border rounded-xl p-4">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                      Detected Angle
                    </p>

                    <p className="text-sm font-bold text-primary mt-1">
                      {
                        activeImage.angle
                      }
                    </p>

                  </div>


                  <div className="p-2 bg-white rounded-lg border border-border">

                    <Focus
                      size={18}
                      className="text-primary"
                    />

                  </div>

                </div>

              </div>


              {/* OPEN EVIDENCE */}

              <button
                type="button"
                onClick={() =>
                  setShowEvidence(
                    true
                  )
                }
                className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Focus
                  size={16}
                />

                Open Evidence
                Viewer
              </button>

            </div>

          ) : (

            <div className="h-64 flex flex-col items-center justify-center text-sm text-gray-400">

              <Eye
                size={30}
                className="mb-3 text-gray-300"
              />

              <p>
                No images uploaded
                for this inspection.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* ======================================================
          EVIDENCE VIEWER MODAL
      ====================================================== */}

      {showEvidence &&
        activeImage && (

          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col lg:flex-row"
            onClick={() =>
              setShowEvidence(
                false
              )
            }
          >

            {/* IMAGE AREA */}

            <div
              className="flex-1 min-h-[65vh] lg:min-h-0 p-6 md:p-10 flex items-center justify-center relative"
              onClick={(
                event
              ) =>
                event.stopPropagation()
              }
            >

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setShowEvidence(
                    false
                  )
                }
                className="absolute top-5 left-5 text-white hover:bg-white/10 p-3 rounded-xl transition-colors"
                title="Close"
              >
                <X
                  size={24}
                />
              </button>


              {/* PREVIOUS */}

              {images.length >
                1 && (
                <button
                  type="button"
                  onClick={
                    previousImage
                  }
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                  title="Previous image"
                >
                  <ChevronLeft
                    size={25}
                  />
                </button>
              )}


              {/* IMAGE */}

              <div className="relative max-w-6xl w-full h-full flex items-center justify-center">

                <img
                  src={
                    activeImage.url
                  }
                  alt="Package evidence"
                  className="max-h-[80vh] max-w-full rounded-xl shadow-2xl object-contain"
                  onLoad={() => {
                    console.log(
                      '✅ MODAL IMAGE LOADED:',
                      activeImage.url
                    );
                  }}
                  onError={(
                    event
                  ) => {
                    console.error(
                      '❌ MODAL IMAGE FAILED:',
                      activeImage.url
                    );


                    if (
                      activeImage.filename &&
                      !event
                        .currentTarget
                        .dataset
                        .fallback
                    ) {
                      event.currentTarget.dataset.fallback =
                        'true';


                      event.currentTarget.src =
                        `${BACKEND_URL}/api/debug/image/${encodeURIComponent(
                          activeImage.filename
                        )}`;
                    }
                  }}
                />


                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {
                    activeImage.angle
                  }
                </div>

              </div>


              {/* NEXT */}

              {images.length >
                1 && (
                <button
                  type="button"
                  onClick={
                    nextImage
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                  title="Next image"
                >
                  <ChevronRight
                    size={25}
                  />
                </button>
              )}

            </div>


            {/* SIDE PANEL */}

            <div
              className="w-full lg:w-96 bg-bg-base border-t lg:border-t-0 lg:border-l border-border flex flex-col overflow-y-auto"
              onClick={(
                event
              ) =>
                event.stopPropagation()
              }
            >

              <div className="p-6 border-b border-border bg-white">

                <div className="flex items-center gap-3">

                  <div className="p-2 bg-primary rounded-xl">

                    <Focus
                      size={19}
                      className="text-white"
                    />

                  </div>


                  <div>

                    <h2 className="text-xl font-editorial font-bold text-primary">
                      Evidence Review
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Review uploaded
                      package evidence
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-6 space-y-4">

                {/* AI CONFIDENCE */}

                <div className={`border p-5 rounded-xl ${confidenceStyle.bg} ${confidenceStyle.border}`}>

                  <div className="flex items-center justify-between">

                    <div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        AI Confidence
                      </span>

                      <p className={`text-2xl font-bold mt-2 ${confidenceStyle.text}`}>
                        {Math.round(
                          aiConfidence
                        )}
                        %
                      </p>

                    </div>

                    <Bot
                      size={22}
                      className={
                        confidenceStyle.text
                      }
                    />

                  </div>

                </div>


                {/* IMAGE INFO */}

                <div className="bg-white border border-border p-5 rounded-xl">

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Image Angle
                  </span>

                  <p className="text-lg font-bold text-primary mt-2">
                    {
                      activeImage.angle
                    }
                  </p>

                </div>


                {/* IMAGE COUNT */}

                <div className="bg-white border border-border p-5 rounded-xl">

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Evidence Image
                  </span>

                  <p className="text-lg font-bold text-primary mt-2">
                    {activeImageIndex +
                      1}{' '}

                    <span className="text-gray-400 font-normal">
                      of{' '}
                      {
                        images.length
                      }
                    </span>
                  </p>

                </div>


                {/* PRODUCT */}

                <div className="bg-white border border-border p-5 rounded-xl">

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Product
                  </span>

                  <p className="text-sm font-semibold text-gray-800 mt-2 break-words">
                    {productName}
                  </p>

                </div>


                {/* MANUFACTURER */}

                <div className="bg-white border border-border p-5 rounded-xl">

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Manufacturer
                  </span>

                  <p className="text-sm font-semibold text-gray-800 mt-2 break-words">
                    {manufacturer}
                  </p>

                </div>


                {/* FILE */}

                {activeImage.filename && (
                  <div className="bg-white border border-border p-5 rounded-xl">

                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Evidence File
                    </span>

                    <p className="text-sm font-medium text-gray-700 mt-2 break-all">
                      {
                        activeImage.filename
                      }
                    </p>

                  </div>
                )}


                {/* DOWNLOAD */}

                <button
                  type="button"
                  onClick={
                    downloadEvidence
                  }
                  className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Open Original
                  Evidence
                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
};


export default InspectionResult;