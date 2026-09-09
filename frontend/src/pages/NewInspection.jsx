// // // import React, { useState, useRef } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { Camera, Upload, X, Check, ChevronRight, Package, FileText, Image as ImageIcon } from 'lucide-react';

// // // const STEPS = [
// // //   { id: 1, name: 'Inspection Details', icon: FileText },
// // //   { id: 2, name: 'Product Info', icon: Package },
// // //   { id: 3, name: 'Capture Angles', icon: Camera },
// // // ];

// // // const ANGLE_SLOTS = ['FRONT', 'BACK', 'LEFT', 'RIGHT', 'TOP', 'BOTTOM'];

// // // const ImageSlot = ({ angle, file, onUpload, onRemove }) => {
// // //   const fileInputRef = useRef(null);
// // //   const [isDragging, setIsDragging] = useState(false);

// // //   const handleDrag = (e) => {
// // //     e.preventDefault();
// // //     e.stopPropagation();
// // //     if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
// // //     else if (e.type === 'dragleave') setIsDragging(false);
// // //   };

// // //   const handleDrop = (e) => {
// // //     e.preventDefault();
// // //     e.stopPropagation();
// // //     setIsDragging(false);
// // //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// // //       onUpload(angle, e.dataTransfer.files[0]);
// // //     }
// // //   };

// // //   return (
// // //     <div 
// // //       className={`relative rounded-2xl border-2 border-dashed h-48 flex flex-col items-center justify-center overflow-hidden transition-all ${
// // //         file ? 'border-border' : isDragging ? 'border-accent bg-accent/5' : 'border-border hover:border-gray-400 bg-bg-soft hover:bg-gray-100'
// // //       }`}
// // //       onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
// // //     >
// // //       {file ? (
// // //         <>
// // //           <img src={URL.createObjectURL(file)} alt={angle} className="w-full h-full object-cover" />
// // //           <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
// // //             <button onClick={() => fileInputRef.current.click()} className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium mb-2">Replace</button>
// // //             <button onClick={() => onRemove(angle)} className="bg-error text-white px-4 py-2 rounded-lg text-sm font-medium">Remove</button>
// // //           </div>
// // //           <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase">
// // //             {angle}
// // //           </div>
// // //         </>
// // //       ) : (
// // //         <div className="text-center p-4 cursor-pointer" onClick={() => fileInputRef.current.click()}>
// // //           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-soft text-gray-400">
// // //             <Upload size={20} />
// // //           </div>
// // //           <p className="font-bold tracking-widest text-[11px] text-gray-500 uppercase">{angle}</p>
// // //           <p className="text-xs text-gray-400 mt-1">Drag or click</p>
// // //         </div>
// // //       )}
// // //       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
// // //         if (e.target.files[0]) onUpload(angle, e.target.files[0]);
// // //       }} />
// // //     </div>
// // //   );
// // // };

// // // const NewInspection = () => {
// // //   const navigate = useNavigate();
// // //   const [currentStep, setCurrentStep] = useState(1);
// // //   const [images, setImages] = useState({});

// // //   const handleNext = () => {
// // //     if (currentStep === 3) {
// // //       // Simulate submission and go to processing
// // //       navigate('/processing');
// // //     } else {
// // //       setCurrentStep(curr => curr + 1);
// // //     }
// // //   };

// // //   const handleUpload = (angle, file) => {
// // //     setImages(prev => ({ ...prev, [angle]: file }));
// // //   };

// // //   const handleRemove = (angle) => {
// // //     setImages(prev => {
// // //       const copy = { ...prev };
// // //       delete copy[angle];
// // //       return copy;
// // //     });
// // //   };

// // //   return (
// // //     <div className="max-w-4xl mx-auto pb-20">
      
// // //       {/* Wizard Header */}
// // //       <div className="mb-10 flex items-center justify-between relative">
// // //         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-border -z-10"></div>
// // //         {STEPS.map((step, index) => {
// // //           const Icon = step.icon;
// // //           const isActive = currentStep === step.id;
// // //           const isCompleted = currentStep > step.id;
// // //           return (
// // //             <div key={step.id} className="flex flex-col items-center bg-bg-base px-4">
// // //               <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
// // //                 isActive ? 'bg-primary text-white shadow-lg ring-4 ring-primary/20' :
// // //                 isCompleted ? 'bg-success text-white' :
// // //                 'bg-bg-soft text-gray-400 border border-border'
// // //               }`}>
// // //                 {isCompleted ? <Check size={20} /> : <Icon size={20} />}
// // //               </div>
// // //               <span className={`mt-3 text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-500'}`}>{step.name}</span>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>

// // //       <div className="bg-bg-card border border-border shadow-soft rounded-2xl p-8">
        
// // //         {currentStep === 1 && (
// // //           <div className="space-y-6 animation-fade-in">
// // //             <h2 className="text-2xl font-editorial font-bold mb-6">Inspection Details</h2>
// // //             <div className="grid grid-cols-2 gap-6">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Location / Store Name</label>
// // //                 <input type="text" className="w-full bg-bg-soft border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent" placeholder="e.g. SuperMart Downtown" />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Inspection Type</label>
// // //                 <select className="w-full bg-bg-soft border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent">
// // //                   <option>Routine Check</option>
// // //                   <option>Consumer Complaint</option>
// // //                   <option>Surprise Raid</option>
// // //                 </select>
// // //               </div>
// // //               <div className="col-span-2">
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (Optional)</label>
// // //                 <textarea className="w-full bg-bg-soft border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent h-24" placeholder="Any initial observations..."></textarea>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {currentStep === 2 && (
// // //           <div className="space-y-6 animation-fade-in">
// // //             <h2 className="text-2xl font-editorial font-bold mb-6">Product Information</h2>
// // //             <div className="grid grid-cols-2 gap-6">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
// // //                 <select className="w-full bg-bg-soft border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent">
// // //                   <option>Food & Beverages</option>
// // //                   <option>Electronics</option>
// // //                   <option>Cosmetics</option>
// // //                   <option>FMCG / Household</option>
// // //                 </select>
// // //               </div>
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Commodity Name (If known)</label>
// // //                 <input type="text" className="w-full bg-bg-soft border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent" placeholder="Leave blank if unknown" />
// // //               </div>
// // //             </div>
// // //             <div className="p-4 bg-blue-50 text-blue-800 rounded-xl flex gap-3 text-sm">
// // //               <ImageIcon className="shrink-0" />
// // //               <p>The AI will automatically extract the exact brand, manufacturer, and declarations from the images in the next step.</p>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {currentStep === 3 && (
// // //           <div className="space-y-6 animation-fade-in">
// // //             <div className="flex justify-between items-end mb-6">
// // //               <div>
// // //                 <h2 className="text-2xl font-editorial font-bold">Capture Package Angles</h2>
// // //                 <p className="text-gray-500 mt-1">Upload clear images of the product packaging to ensure accurate OCR extraction.</p>
// // //               </div>
// // //               <div className="text-sm font-medium px-3 py-1.5 bg-bg-soft rounded-lg text-primary">
// // //                 {Object.keys(images).length} / 6 Captured
// // //               </div>
// // //             </div>
            
// // //             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
// // //               {ANGLE_SLOTS.map(angle => (
// // //                 <ImageSlot key={angle} angle={angle} file={images[angle]} onUpload={handleUpload} onRemove={handleRemove} />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         <div className="mt-10 pt-6 border-t border-border flex justify-between">
// // //           <button 
// // //             onClick={() => setCurrentStep(curr => curr - 1)} 
// // //             disabled={currentStep === 1}
// // //             className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${currentStep === 1 ? 'opacity-0 cursor-default' : 'bg-bg-soft text-gray-600 hover:bg-gray-200'}`}
// // //           >
// // //             Back
// // //           </button>
// // //           <button 
// // //             onClick={handleNext}
// // //             className="flex items-center gap-2 bg-primary hover:bg-gray-800 text-white px-8 py-2.5 rounded-xl font-medium transition-colors shadow-md"
// // //           >
// // //             {currentStep === 3 ? 'Analyze with AI' : 'Continue'} 
// // //             {currentStep !== 3 && <ChevronRight size={18} />}
// // //           </button>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NewInspection;

// // import { inspectionsAPI } from '../services/api';
// // import React, { useState, useRef, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   Camera,
// //   Upload,
// //   X,
// //   Check,
// //   ChevronRight,
// //   Package,
// //   FileText,
// //   Image as ImageIcon,
// //   Loader2,
// //   AlertCircle,
// // } from 'lucide-react';



// // const STEPS = [
// //   { id: 1, name: 'Inspection Details', icon: FileText },
// //   { id: 2, name: 'Product Info', icon: Package },
// //   { id: 3, name: 'Capture Angles', icon: Camera },
// // ];

// // const ANGLE_SLOTS = ['FRONT', 'BACK', 'LEFT', 'RIGHT', 'TOP', 'BOTTOM'];

// // const ImageSlot = ({ angle, file, onUpload, onRemove }) => {
// //   const fileInputRef = useRef(null);
// //   const [isDragging, setIsDragging] = useState(false);

// //   const handleDrag = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();

// //     if (e.type === 'dragenter' || e.type === 'dragover') {
// //       setIsDragging(true);
// //     } else if (e.type === 'dragleave') {
// //       setIsDragging(false);
// //     }
// //   };

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setIsDragging(false);

// //     const droppedFile = e.dataTransfer.files?.[0];

// //     if (droppedFile && droppedFile.type.startsWith('image/')) {
// //       onUpload(angle, droppedFile);
// //     }
// //   };

// //   const handleFileChange = (e) => {
// //     const selectedFile = e.target.files?.[0];

// //     if (selectedFile) {
// //       onUpload(angle, selectedFile);
// //     }

// //     e.target.value = '';
// //   };

// //   return (
// //     <div
// //       className={`relative rounded-2xl border-2 border-dashed h-48 flex flex-col items-center justify-center overflow-hidden transition-all ${
// //         file
// //           ? 'border-border'
// //           : isDragging
// //           ? 'border-accent bg-accent/5'
// //           : 'border-border hover:border-gray-400 bg-bg-soft hover:bg-gray-100'
// //       }`}
// //       onDragEnter={handleDrag}
// //       onDragLeave={handleDrag}
// //       onDragOver={handleDrag}
// //       onDrop={handleDrop}
// //     >
// //       {file ? (
// //         <>
// //           <img
// //             src={URL.createObjectURL(file)}
// //             alt={angle}
// //             className="w-full h-full object-cover"
// //           />

// //           <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
// //             <button
// //               type="button"
// //               onClick={() => fileInputRef.current?.click()}
// //               className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium mb-2"
// //             >
// //               Replace
// //             </button>

// //             <button
// //               type="button"
// //               onClick={() => onRemove(angle)}
// //               className="bg-error text-white px-4 py-2 rounded-lg text-sm font-medium"
// //             >
// //               Remove
// //             </button>
// //           </div>

// //           <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase">
// //             {angle}
// //           </div>

// //           <div className="absolute bottom-3 right-3 bg-green-600 text-white p-1.5 rounded-full">
// //             <Check size={14} />
// //           </div>
// //         </>
// //       ) : (
// //         <div
// //           className="text-center p-4 cursor-pointer"
// //           onClick={() => fileInputRef.current?.click()}
// //         >
// //           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-soft text-gray-400">
// //             <Upload size={20} />
// //           </div>

// //           <p className="font-bold tracking-widest text-[11px] text-gray-500 uppercase">
// //             {angle}
// //           </p>

// //           <p className="text-xs text-gray-400 mt-1">
// //             Drag or click
// //           </p>
// //         </div>
// //       )}

// //       <input
// //         type="file"
// //         ref={fileInputRef}
// //         className="hidden"
// //         accept="image/*"
// //         onChange={handleFileChange}
// //       />
// //     </div>
// //   );
// // };

// // const NewInspection = () => {
// //   const navigate = useNavigate();

// //   const [currentStep, setCurrentStep] = useState(1);

// //   const [formData, setFormData] = useState({
// //     location: '',
// //     inspectionType: 'Routine Check',
// //     remarks: '',
// //     productCategory: 'Food & Beverages',
// //     commodityName: '',
// //   });

// //   const [images, setImages] = useState({});

// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [error, setError] = useState('');

// //   // Clean up object URLs when component is unmounted
// //   useEffect(() => {
// //     return () => {
// //       Object.values(images).forEach((file) => {
// //         if (file) {
// //           // Browser will clean these automatically, but this keeps
// //           // the component lifecycle clean.
// //         }
// //       });
// //     };
// //   }, []);

// //   const updateField = (field, value) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [field]: value,
// //     }));
// //   };

// //   const handleUpload = (angle, file) => {
// //     if (!file.type.startsWith('image/')) {
// //       setError('Please upload only image files.');
// //       return;
// //     }

// //     // Optional size restriction: 10 MB
// //     if (file.size > 10 * 1024 * 1024) {
// //       setError(`${angle} image must be smaller than 10 MB.`);
// //       return;
// //     }

    

// //     setError('');

// //     setImages((prev) => ({
// //       ...prev,
// //       [angle]: file,
// //     }));
// //   };

// //   const handleRemove = (angle) => {
// //     setImages((prev) => {
// //       const copy = { ...prev };
// //       delete copy[angle];
// //       return copy;
// //     });
// //   };

// //   const validateStep = () => {
// //     setError('');

// //     if (currentStep === 1) {
// //       if (!formData.location.trim()) {
// //         setError('Please enter the inspection location / store name.');
// //         return false;
// //       }
// //     }

// //     if (currentStep === 2) {
// //       if (!formData.commodityName.trim()) {
// //         setError(
// //           'Commodity name is required. You can enter "Unknown" if it is not available.'
// //         );
// //         return false;
// //       }
// //     }

// //     if (currentStep === 3) {
// //       if (Object.keys(images).length === 0) {
// //         setError('Please upload at least one product image.');
// //         return false;
// //       }
// //     }

// //     return true;
// //   };

// //   const handleNext = async () => {
// //     if (!validateStep()) return;

// //     if (currentStep < 3) {
// //       setCurrentStep((curr) => curr + 1);
// //       return;
// //     }

// //     await createInspection();
// //   };

// //   const createInspection = async () => {
// //   try {
// //     setIsSubmitting(true);
// //     setError('');

// //     // =====================================================
// //     // STEP 1: CREATE INSPECTION
// //     // =====================================================

// //     const inspectionPayload = {
// //       location: formData.location,
// //       officerRemarks: formData.remarks,
// //       inspectionType: formData.inspectionType,
// //       productCategory: formData.productCategory,
// //       commodityName: formData.commodityName
// //     };

// //     console.log(
// //       '📋 Creating inspection:',
// //       inspectionPayload
// //     );

// //     const response = await inspectionsAPI.create(
// //       inspectionPayload
// //     );

// //     console.log(
// //       '✅ Inspection created:',
// //       response.data
// //     );

// //     // =====================================================
// //     // GET REAL INSPECTION ID
// //     // =====================================================

// //     const inspectionId =
// //       response.data?.data?.inspectionId ||
// //       response.data?.data?._id ||
// //       response.data?.inspectionId ||
// //       response.data?._id;

// //     if (!inspectionId) {
// //       throw new Error(
// //         'Inspection created, but no inspection ID was returned by the server.'
// //       );
// //     }

// //     console.log(
// //       '🆔 Inspection ID:',
// //       inspectionId
// //     );

// //     // =====================================================
// //     // STEP 2: UPLOAD IMAGES
// //     // =====================================================

// //     const uploadedAngles = Object.entries(images);

// //     console.log(
// //       `📷 Uploading ${uploadedAngles.length} image(s)...`
// //     );

// //     for (const [angle, file] of uploadedAngles) {

// //       if (!file) {
// //         continue;
// //       }

// //       const imageFormData = new FormData();

// //       // Backend currently expects field name: "image"
// //       imageFormData.append('image', file);

// //       // Send angle as additional information
// //       imageFormData.append(
// //         'angle',
// //         angle
// //       );

// //       console.log(
// //         `📤 Uploading ${angle} image...`
// //       );

// //       await inspectionsAPI.uploadImages(
// //         inspectionId,
// //         imageFormData
// //       );

// //       console.log(
// //         `✅ ${angle} image uploaded`
// //       );
// //     }

// //     // =====================================================
// //     // STEP 3: MOVE TO AI PROCESSING
// //     // =====================================================

// //     console.log(
// //       '🚀 Starting AI processing for:',
// //       inspectionId
// //     );

// //     navigate(
// //       `/processing/${inspectionId}`
// //     );

// //   } catch (err) {

// //     console.error(
// //       '❌ Inspection creation failed:',
// //       err.response?.data || err
// //     );

// //     setError(
// //       err.response?.data?.message ||
// //       err.message ||
// //       'Failed to create inspection.'
// //     );

// //   } finally {

// //     setIsSubmitting(false);

// //   }
// // };
// //   const handleBack = () => {
// //     if (currentStep > 1) {
// //       setError('');
// //       setCurrentStep((curr) => curr - 1);
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto pb-20">

// //       {/* Wizard Header */}
// //       <div className="mb-10 flex items-center justify-between relative">

// //         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-border -z-10" />

// //         {STEPS.map((step) => {
// //           const Icon = step.icon;

// //           const isActive = currentStep === step.id;
// //           const isCompleted = currentStep > step.id;

// //           return (
// //             <div
// //               key={step.id}
// //               className="flex flex-col items-center bg-bg-base px-4"
// //             >
// //               <div
// //                 className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
// //                   isActive
// //                     ? 'bg-primary text-white shadow-lg ring-4 ring-primary/20'
// //                     : isCompleted
// //                     ? 'bg-success text-white'
// //                     : 'bg-bg-soft text-gray-400 border border-border'
// //                 }`}
// //               >
// //                 {isCompleted ? (
// //                   <Check size={20} />
// //                 ) : (
// //                   <Icon size={20} />
// //                 )}
// //               </div>

// //               <span
// //                 className={`mt-3 text-sm font-medium ${
// //                   isActive
// //                     ? 'text-primary'
// //                     : 'text-gray-500'
// //                 }`}
// //               >
// //                 {step.name}
// //               </span>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* Main Card */}
// //       <div className="bg-bg-card border border-border shadow-soft rounded-2xl p-8">

// //         {/* STEP 1 */}
// //         {currentStep === 1 && (
// //           <div className="space-y-6 animation-fade-in">

// //             <h2 className="text-2xl font-editorial font-bold mb-6">
// //               Inspection Details
// //             </h2>

// //             <div className="grid grid-cols-2 gap-6">

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Location / Store Name
// //                 </label>

// //                 <input
// //                   type="text"
// //                   value={formData.location}
// //                   onChange={(e) =>
// //                     updateField('location', e.target.value)
// //                   }
// //                   className="w-full bg-bg-soft border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent"
// //                   placeholder="e.g. SuperMart Downtown"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Inspection Type
// //                 </label>

// //                 <select
// //                   value={formData.inspectionType}
// //                   onChange={(e) =>
// //                     updateField(
// //                       'inspectionType',
// //                       e.target.value
// //                     )
// //                   }
// //                   className="w-full bg-bg-soft border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent"
// //                 >
// //                   <option>Routine Check</option>
// //                   <option>Consumer Complaint</option>
// //                   <option>Surprise Raid</option>
// //                 </select>
// //               </div>

// //               <div className="col-span-2">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Remarks (Optional)
// //                 </label>

// //                 <textarea
// //                   value={formData.remarks}
// //                   onChange={(e) =>
// //                     updateField('remarks', e.target.value)
// //                   }
// //                   className="w-full bg-bg-soft border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent h-24"
// //                   placeholder="Any initial observations..."
// //                 />
// //               </div>

// //             </div>
// //           </div>
// //         )}

// //         {/* STEP 2 */}
// //         {currentStep === 2 && (
// //           <div className="space-y-6 animation-fade-in">

// //             <h2 className="text-2xl font-editorial font-bold mb-6">
// //               Product Information
// //             </h2>

// //             <div className="grid grid-cols-2 gap-6">

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Product Category
// //                 </label>

// //                 <select
// //                   value={formData.productCategory}
// //                   onChange={(e) =>
// //                     updateField(
// //                       'productCategory',
// //                       e.target.value
// //                     )
// //                   }
// //                   className="w-full bg-bg-soft border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent"
// //                 >
// //                   <option>Food & Beverages</option>
// //                   <option>Electronics</option>
// //                   <option>Cosmetics</option>
// //                   <option>FMCG / Household</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Commodity Name
// //                 </label>

// //                 <input
// //                   type="text"
// //                   value={formData.commodityName}
// //                   onChange={(e) =>
// //                     updateField(
// //                       'commodityName',
// //                       e.target.value
// //                     )
// //                   }
// //                   className="w-full bg-bg-soft border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent"
// //                   placeholder="e.g. Packaged Biscuits"
// //                 />
// //               </div>

// //             </div>

// //             <div className="p-4 bg-blue-50 text-blue-800 rounded-xl flex gap-3 text-sm">
// //               <ImageIcon className="shrink-0" />

// //               <p>
// //                 LegalScan AI will automatically extract the
// //                 brand, manufacturer, MRP, net quantity,
// //                 dates, consumer-care details and other
// //                 declarations from the uploaded packaging.
// //               </p>
// //             </div>

// //           </div>
// //         )}

// //         {/* STEP 3 */}
// //         {currentStep === 3 && (
// //           <div className="space-y-6 animation-fade-in">

// //             <div className="flex justify-between items-end mb-6">

// //               <div>
// //                 <h2 className="text-2xl font-editorial font-bold">
// //                   Capture Package Angles
// //                 </h2>

// //                 <p className="text-gray-500 mt-1">
// //                   Upload clear images of the product packaging
// //                   to ensure accurate OCR extraction.
// //                 </p>
// //               </div>

// //               <div className="text-sm font-medium px-3 py-1.5 bg-bg-soft rounded-lg text-primary">
// //                 {Object.keys(images).length} / 6 Captured
// //               </div>

// //             </div>

// //             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

// //               {ANGLE_SLOTS.map((angle) => (
// //                 <ImageSlot
// //                   key={angle}
// //                   angle={angle}
// //                   file={images[angle]}
// //                   onUpload={handleUpload}
// //                   onRemove={handleRemove}
// //                 />
// //               ))}

// //             </div>

// //           </div>
// //         )}

// //         {/* Error */}
// //         {error && (
// //           <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
// //             <AlertCircle
// //               size={20}
// //               className="shrink-0 mt-0.5"
// //             />

// //             <p>{error}</p>
// //           </div>
// //         )}

// //         {/* Footer */}
// //         <div className="mt-10 pt-6 border-t border-border flex justify-between">

// //           <button
// //             type="button"
// //             onClick={handleBack}
// //             disabled={currentStep === 1 || isSubmitting}
// //             className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
// //               currentStep === 1
// //                 ? 'opacity-0 cursor-default'
// //                 : 'bg-bg-soft text-gray-600 hover:bg-gray-200'
// //             }`}
// //           >
// //             Back
// //           </button>

// //           <button
// //             type="button"
// //             onClick={handleNext}
// //             disabled={isSubmitting}
// //             className="flex items-center gap-2 bg-primary hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-xl font-medium transition-colors shadow-md"
// //           >

// //             {isSubmitting ? (
// //               <>
// //                 <Loader2
// //                   size={18}
// //                   className="animate-spin"
// //                 />
// //                 Creating Inspection...
// //               </>
// //             ) : (
// //               <>
// //                 {currentStep === 3
// //                   ? 'Analyze with AI'
// //                   : 'Continue'}

// //                 {currentStep !== 3 && (
// //                   <ChevronRight size={18} />
// //                 )}
// //               </>
// //             )}

// //           </button>

// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default NewInspection;

// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   ArrowLeft,
//   Camera,
//   Upload,
//   X,
//   CheckCircle,
//   AlertCircle,
//   MapPin,
//   FileText,
//   Package,
//   Image as ImageIcon,
//   Loader2
// } from 'lucide-react';
// import { inspectionsAPI } from '../services/api';

// const ANGLE_SLOTS = [
//   {
//     id: 'FRONT',
//     label: 'Front',
//     description: 'Front side of package',
//     required: true
//   },
//   {
//     id: 'BACK',
//     label: 'Back',
//     description: 'Back side with declarations',
//     required: false
//   },
//   {
//     id: 'LEFT',
//     label: 'Left',
//     description: 'Left side',
//     required: false
//   },
//   {
//     id: 'RIGHT',
//     label: 'Right',
//     description: 'Right side',
//     required: false
//   },
//   {
//     id: 'TOP',
//     label: 'Top',
//     description: 'Top of package',
//     required: false
//   },
//   {
//     id: 'BOTTOM',
//     label: 'Bottom',
//     description: 'Bottom of package',
//     required: false
//   }
// ];

// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
// const MIN_IMAGE_DIMENSION = 800;

// const ImageSlot = ({ slot, file, onUpload, onRemove, disabled }) => {
//   const inputRef = useRef(null);
//   const [preview, setPreview] = useState(null);

//   React.useEffect(() => {
//     if (!file) {
//       setPreview(null);
//       return;
//     }

//     const objectUrl = URL.createObjectURL(file);
//     setPreview(objectUrl);

//     return () => URL.revokeObjectURL(objectUrl);
//   }, [file]);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files?.[0];

//     if (selectedFile) {
//       onUpload(slot.id, selectedFile);
//     }

//     event.target.value = '';
//   };

//   const handleClick = () => {
//     if (!disabled) {
//       inputRef.current?.click();
//     }
//   };

//   return (
//     <div className="relative">
//       <div
//         onClick={handleClick}
//         className={`
//           relative min-h-[230px] rounded-xl border-2 border-dashed
//           transition-all cursor-pointer overflow-hidden
//           ${
//             file
//               ? 'border-green-500 bg-green-50'
//               : 'border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50'
//           }
//           ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
//         `}
//       >
//         {preview ? (
//           <>
//             <img
//               src={preview}
//               alt={`${slot.label} package view`}
//               className="absolute inset-0 w-full h-full object-contain bg-white"
//             />

//             <div className="absolute top-3 left-3">
//               <div className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow">
//                 <CheckCircle size={14} />
//                 Uploaded
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onRemove(slot.id);
//               }}
//               className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow"
//             >
//               <X size={16} />
//             </button>

//             <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-3 py-2">
//               <p className="text-sm font-medium truncate">{file.name}</p>
//               <p className="text-xs opacity-80">
//                 {(file.size / 1024 / 1024).toFixed(2)} MB
//               </p>
//             </div>
//           </>
//         ) : (
//           <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
//             <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
//               <Camera className="text-green-600" size={28} />
//             </div>

//             <h3 className="font-semibold text-gray-800 text-lg">
//               {slot.label} View
//             </h3>

//             <p className="text-sm text-gray-500 mt-1">
//               {slot.description}
//             </p>

//             {slot.required && (
//               <span className="mt-2 text-xs font-semibold text-red-500">
//                 Required
//               </span>
//             )}

//             <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">
//               <Upload size={16} />
//               Choose Image
//             </div>

//             <p className="text-xs text-gray-400 mt-3">
//               Min. {MIN_IMAGE_DIMENSION}px on shortest side
//             </p>
//           </div>
//         )}
//       </div>

//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/jpeg,image/jpg,image/png,image/webp"
//         onChange={handleFileChange}
//         className="hidden"
//         disabled={disabled}
//       />
//     </div>
//   );
// };

// const NewInspection = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     location: '',
//     inspectionType: 'ROUTINE',
//     remarks: '',
//     productCategory: '',
//     commodityName: ''
//   });

//   const [images, setImages] = useState({});
//   const [errors, setErrors] = useState({});
//   const [uploadError, setUploadError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: ''
//     }));
//   };

//   /**
//    * Get actual dimensions of selected image.
//    *
//    * This is important because file size alone cannot guarantee
//    * that the image has enough resolution for OCR.
//    */
//   const getImageDimensions = (file) => {
//     return new Promise((resolve, reject) => {
//       const objectUrl = URL.createObjectURL(file);
//       const img = new window.Image();

//       img.onload = () => {
//         const dimensions = {
//           width: img.naturalWidth,
//           height: img.naturalHeight
//         };

//         URL.revokeObjectURL(objectUrl);
//         resolve(dimensions);
//       };

//       img.onerror = () => {
//         URL.revokeObjectURL(objectUrl);
//         reject(new Error('Unable to read image dimensions.'));
//       };

//       img.src = objectUrl;
//     });
//   };

//   /**
//    * Validate and store image.
//    *
//    * Important:
//    * - Reject unsupported formats
//    * - Reject files above 10 MB
//    * - Reject very low-resolution images
//    *
//    * OCR needs the actual image resolution, not just a large file size.
//    */
//   const handleUpload = async (angle, file) => {
//     setUploadError('');

//     if (!file) {
//       return;
//     }

//     // Validate file type
//     const allowedTypes = [
//       'image/jpeg',
//       'image/jpg',
//       'image/png',
//       'image/webp'
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       setUploadError(
//         `${angle}: Please upload JPG, JPEG, PNG or WEBP image only.`
//       );
//       return;
//     }

//     // Validate file size
//     if (file.size > MAX_FILE_SIZE) {
//       setUploadError(
//         `${angle}: Image size must be less than 10 MB.`
//       );
//       return;
//     }

//     try {
//       // Check actual image resolution
//       const { width, height } = await getImageDimensions(file);

//       console.log(
//         `📷 ${angle} image resolution: ${width} x ${height}`
//       );

//       // We check the shortest side so portrait/landscape images are supported.
//       const shortestSide = Math.min(width, height);

//       if (shortestSide < MIN_IMAGE_DIMENSION) {
//         setUploadError(
//           `${angle}: Image resolution is too low (${width} × ${height}). ` +
//           `Please upload a clear camera photo with at least ` +
//           `${MIN_IMAGE_DIMENSION}px on the shortest side.`
//         );
//         return;
//       }

//       // Extra warning for very small images
//       if (width < 1200 && height < 1200) {
//         console.warn(
//           `⚠️ ${angle} image is accepted but resolution is relatively low: ${width}x${height}`
//         );
//       }

//       setImages((prev) => ({
//         ...prev,
//         [angle]: file
//       }));

//       setErrors((prev) => ({
//         ...prev,
//         images: ''
//       }));
//     } catch (error) {
//       console.error('Image validation error:', error);

//       setUploadError(
//         `${angle}: Unable to read this image. Please select another image.`
//       );
//     }
//   };

//   const handleRemove = (angle) => {
//     setImages((prev) => {
//       const updated = { ...prev };
//       delete updated[angle];
//       return updated;
//     });

//     setUploadError('');
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.location.trim()) {
//       newErrors.location = 'Inspection location is required.';
//     }

//     if (!formData.commodityName.trim()) {
//       newErrors.commodityName = 'Commodity name is required.';
//     }

//     if (!Object.keys(images).length) {
//       newErrors.images = 'Please upload at least one package image.';
//     }

//     if (!images.FRONT) {
//       newErrors.images =
//         'Front image is required. Please upload the front side of the package.';
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setUploadError('');

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       console.log('🚀 Creating new inspection...');

//       /**
//        * STEP 1:
//        * Create inspection record.
//        */
//       const inspectionResponse = await inspectionsAPI.create({
//         location: formData.location.trim(),
//         officerRemarks: formData.remarks.trim(),
//         inspectionType: formData.inspectionType,
//         productCategory: formData.productCategory.trim(),
//         commodityName: formData.commodityName.trim()
//       });

//       console.log(
//         '✅ Inspection created:',
//         inspectionResponse.data
//       );

//       const inspectionId =
//         inspectionResponse.data?.data?.inspectionId ||
//         inspectionResponse.data?.inspectionId ||
//         inspectionResponse.data?.data?._id ||
//         inspectionResponse.data?._id;

//       if (!inspectionId) {
//         throw new Error(
//           'Inspection was created but inspection ID was not returned by server.'
//         );
//       }

//       console.log('🆔 Inspection ID:', inspectionId);

//       /**
//        * STEP 2:
//        * Upload images one by one.
//        *
//        * The original high-resolution File is sent.
//        * We do NOT compress or resize it here.
//        */
//       for (const slot of ANGLE_SLOTS) {
//         const file = images[slot.id];

//         if (!file) {
//           continue;
//         }

//         console.log(
//           `📤 Uploading ${slot.id}: ${file.name} (${(
//             file.size /
//             1024 /
//             1024
//           ).toFixed(2)} MB)`
//         );

//         const imageFormData = new FormData();

//         imageFormData.append('image', file);
//         imageFormData.append('angle', slot.id);

//         await inspectionsAPI.uploadImages(
//           inspectionId,
//           imageFormData
//         );

//         console.log(`✅ ${slot.id} uploaded successfully`);
//       }

//       /**
//        * STEP 3:
//        * Go to processing page.
//        *
//        * Processing page will call the backend AI analysis.
//        */
//       console.log(
//         `➡️ Starting processing for ${inspectionId}`
//       );

//       navigate(`/processing/${inspectionId}`);
//     } catch (error) {
//       console.error(
//         '❌ Inspection creation/upload failed:',
//         error
//       );

//       const message =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         error?.message ||
//         'Something went wrong while creating the inspection.';

//       setUploadError(message);
//       setIsSubmitting(false);
//     }
//   };

//   const uploadedCount = Object.keys(images).length;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-5">
//           <div className="flex items-center gap-4">
//             <button
//               type="button"
//               onClick={() => navigate('/dashboard')}
//               className="p-2 rounded-lg hover:bg-gray-100 transition"
//             >
//               <ArrowLeft size={22} />
//             </button>

//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 New Inspection
//               </h1>

//               <p className="text-sm text-gray-500 mt-1">
//                 Scan product packaging for Legal Metrology compliance
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         <form onSubmit={handleSubmit}>
//           {/* Inspection Details */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
//                 <FileText
//                   size={21}
//                   className="text-green-600"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   Inspection Details
//                 </h2>

//                 <p className="text-sm text-gray-500">
//                   Enter basic information about the inspection
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Commodity */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Commodity Name
//                   <span className="text-red-500 ml-1">*</span>
//                 </label>

//                 <div className="relative">
//                   <Package
//                     size={18}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   />

//                   <input
//                     type="text"
//                     name="commodityName"
//                     value={formData.commodityName}
//                     onChange={handleChange}
//                     placeholder="e.g. Packaged Basmati Rice"
//                     className={`
//                       w-full pl-10 pr-4 py-3 rounded-lg border
//                       focus:outline-none focus:ring-2 focus:ring-green-500
//                       ${
//                         errors.commodityName
//                           ? 'border-red-400'
//                           : 'border-gray-300'
//                       }
//                     `}
//                   />
//                 </div>

//                 {errors.commodityName && (
//                   <p className="text-sm text-red-500 mt-1">
//                     {errors.commodityName}
//                   </p>
//                 )}
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Product Category
//                 </label>

//                 <select
//                   name="productCategory"
//                   value={formData.productCategory}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="">
//                     Select category
//                   </option>

//                   <option value="FOOD">
//                     Food & Beverages
//                   </option>

//                   <option value="COSMETICS">
//                     Cosmetics
//                   </option>

//                   <option value="HOUSEHOLD">
//                     Household Products
//                   </option>

//                   <option value="ELECTRONICS">
//                     Electronics
//                   </option>

//                   <option value="CLOTHING">
//                     Clothing & Textiles
//                   </option>

//                   <option value="OTHER">
//                     Other
//                   </option>
//                 </select>
//               </div>

//               {/* Location */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Inspection Location
//                   <span className="text-red-500 ml-1">*</span>
//                 </label>

//                 <div className="relative">
//                   <MapPin
//                     size={18}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   />

//                   <input
//                     type="text"
//                     name="location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     placeholder="e.g. Mumbai Retail Market"
//                     className={`
//                       w-full pl-10 pr-4 py-3 rounded-lg border
//                       focus:outline-none focus:ring-2 focus:ring-green-500
//                       ${
//                         errors.location
//                           ? 'border-red-400'
//                           : 'border-gray-300'
//                       }
//                     `}
//                   />
//                 </div>

//                 {errors.location && (
//                   <p className="text-sm text-red-500 mt-1">
//                     {errors.location}
//                   </p>
//                 )}
//               </div>

//               {/* Inspection Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Inspection Type
//                 </label>

//                 <select
//                   name="inspectionType"
//                   value={formData.inspectionType}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="ROUTINE">
//                     Routine Inspection
//                   </option>

//                   <option value="COMPLAINT">
//                     Complaint Based
//                   </option>

//                   <option value="TARGETED">
//                     Targeted Inspection
//                   </option>

//                   <option value="FOLLOW_UP">
//                     Follow-up Inspection
//                   </option>
//                 </select>
//               </div>

//               {/* Remarks */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Officer Remarks
//                 </label>

//                 <textarea
//                   name="remarks"
//                   value={formData.remarks}
//                   onChange={handleChange}
//                   rows={3}
//                   placeholder="Add any observations or remarks..."
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Image Upload Section */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
//                   <ImageIcon
//                     size={21}
//                     className="text-blue-600"
//                   />
//                 </div>

//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-900">
//                     Package Images
//                   </h2>

//                   <p className="text-sm text-gray-500">
//                     Upload clear, high-resolution images of the package
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-500">
//                   {uploadedCount} / {ANGLE_SLOTS.length} uploaded
//                 </span>

//                 <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-green-500 transition-all"
//                     style={{
//                       width: `${
//                         (uploadedCount / ANGLE_SLOTS.length) *
//                         100
//                       }%`
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Important image guidance */}
//             <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
//               <div className="flex gap-3">
//                 <AlertCircle
//                   size={20}
//                   className="text-blue-600 flex-shrink-0 mt-0.5"
//                 />

//                 <div>
//                   <h3 className="font-semibold text-blue-900">
//                     For accurate OCR
//                   </h3>

//                   <ul className="mt-1 text-sm text-blue-800 space-y-1">
//                     <li>
//                       • Use the original camera photo, not a
//                       thumbnail or screenshot.
//                     </li>

//                     <li>
//                       • Keep the package declaration text clearly
//                       visible.
//                     </li>

//                     <li>
//                       • Minimum resolution: 800px on the shortest
//                       side.
//                     </li>

//                     <li>
//                       • Avoid blur, glare and extreme shadows.
//                     </li>

//                     <li>
//                       • Front and back images are especially useful
//                       for compliance detection.
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Upload Error */}
//             {uploadError && (
//               <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
//                 <div className="flex gap-3">
//                   <AlertCircle
//                     size={20}
//                     className="text-red-600 flex-shrink-0"
//                   />

//                   <div>
//                     <p className="font-semibold text-red-800">
//                       Image Upload Error
//                     </p>

//                     <p className="text-sm text-red-700 mt-1">
//                       {uploadError}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Validation Error */}
//             {errors.images && (
//               <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
//                 <div className="flex items-center gap-2">
//                   <AlertCircle
//                     size={18}
//                     className="text-red-600"
//                   />

//                   <p className="text-sm text-red-700">
//                     {errors.images}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Image Slots */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//               {ANGLE_SLOTS.map((slot) => (
//                 <ImageSlot
//                   key={slot.id}
//                   slot={slot}
//                   file={images[slot.id]}
//                   onUpload={handleUpload}
//                   onRemove={handleRemove}
//                   disabled={isSubmitting}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* AI Pipeline Information */}
//           <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200 p-6 mb-8">
//             <div className="flex items-start gap-4">
//               <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
//                 <CheckCircle
//                   size={23}
//                   className="text-white"
//                 />
//               </div>

//               <div>
//                 <h3 className="font-semibold text-gray-900">
//                   AI Compliance Analysis
//                 </h3>

//                 <p className="text-sm text-gray-600 mt-1">
//                   After submission, LegalScan AI will process the
//                   uploaded package images using:
//                 </p>

//                 <div className="flex flex-wrap gap-2 mt-3">
//                   <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
//                     Image Quality
//                   </span>

//                   <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
//                     Computer Vision
//                   </span>

//                   <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
//                     OCR
//                   </span>

//                   <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
//                     NLP Extraction
//                   </span>

//                   <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
//                     Legal Metrology Rules
//                   </span>

//                   <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
//                     Evidence Generation
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Actions */}
//           <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
//             <button
//               type="button"
//               onClick={() => navigate('/dashboard')}
//               disabled={isSubmitting}
//               className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2
//                     size={19}
//                     className="animate-spin"
//                   />
//                   Creating Inspection...
//                 </>
//               ) : (
//                 <>
//                   <Camera size={19} />
//                   Start AI Inspection
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default NewInspection;


import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  MapPin,
  FileText,
  Package,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { inspectionsAPI } from '../services/api';

const ANGLE_SLOTS = [
  {
    id: 'FRONT',
    label: 'Front',
    description: 'Front side of package',
    required: true
  },
  {
    id: 'BACK',
    label: 'Back',
    description: 'Back side with declarations',
    required: false
  },
  {
    id: 'LEFT',
    label: 'Left',
    description: 'Left side',
    required: false
  },
  {
    id: 'RIGHT',
    label: 'Right',
    description: 'Right side',
    required: false
  },
  {
    id: 'TOP',
    label: 'Top',
    description: 'Top of package',
    required: false
  },
  {
    id: 'BOTTOM',
    label: 'Bottom',
    description: 'Bottom of package',
    required: false
  }
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ImageSlot = ({
  slot,
  file,
  onUpload,
  onRemove,
  disabled
}) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  React.useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      onUpload(slot.id, selectedFile);
    }

    // Allows selecting the same file again
    event.target.value = '';
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className={`
          relative min-h-[230px] rounded-xl border-2 border-dashed
          transition-all cursor-pointer overflow-hidden
          ${
            file
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50'
          }
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt={`${slot.label} package view`}
              className="absolute inset-0 w-full h-full object-contain bg-white"
            />

            <div className="absolute top-3 left-3">
              <div className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow">
                <CheckCircle size={14} />
                Uploaded
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(slot.id);
              }}
              className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow"
            >
              <X size={16} />
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-3 py-2">
              <p className="text-sm font-medium truncate">
                {file.name}
              </p>

              <p className="text-xs opacity-80">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Camera
                className="text-green-600"
                size={28}
              />
            </div>

            <h3 className="font-semibold text-gray-800 text-lg">
              {slot.label} View
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {slot.description}
            </p>

            {slot.required && (
              <span className="mt-2 text-xs font-semibold text-red-500">
                Required
              </span>
            )}

            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">
              <Upload size={16} />
              Choose Image
            </div>

            <p className="text-xs text-gray-400 mt-3">
              JPG, PNG, WEBP • Max 10 MB
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

const NewInspection = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: '',
    inspectionType: 'ROUTINE',
    remarks: '',
    productCategory: '',
    commodityName: ''
  });

  const [images, setImages] = useState({});
  const [errors, setErrors] = useState({});
  const [uploadError, setUploadError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  /*
   * Image upload validation
   *
   * We intentionally DO NOT check image dimensions here.
   *
   * The officer should not have to worry about:
   *  - 800px
   *  - 1200px
   *  - resolution
   *  - OCR requirements
   *
   * The AI quality pipeline handles image quality.
   */
  const handleUpload = (angle, file) => {
    setUploadError('');

    if (!file) {
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];

    // File type validation
    if (!allowedTypes.includes(file.type)) {
      setUploadError(
        `${angle}: Please upload a JPG, JPEG, PNG or WEBP image.`
      );
      return;
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(
        `${angle}: Image size must be less than 10 MB.`
      );
      return;
    }

    /*
     * Accept the image.
     *
     * No resolution rejection.
     * No resizing.
     * No compression.
     *
     * Original image is preserved for evidence.
     */
    setImages((prev) => ({
      ...prev,
      [angle]: file
    }));

    setErrors((prev) => ({
      ...prev,
      images: ''
    }));

    console.log(
      `📷 ${angle} image selected: ${file.name} (${(
        file.size /
        1024 /
        1024
      ).toFixed(2)} MB)`
    );
  };

  const handleRemove = (angle) => {
    setImages((prev) => {
      const updated = { ...prev };
      delete updated[angle];
      return updated;
    });

    setUploadError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.location.trim()) {
      newErrors.location =
        'Inspection location is required.';
    }

    if (!formData.commodityName.trim()) {
      newErrors.commodityName =
        'Commodity name is required.';
    }

    if (!Object.keys(images).length) {
      newErrors.images =
        'Please upload at least one package image.';
    }

    if (!images.FRONT) {
      newErrors.images =
        'Front image is required. Please upload the front side of the package.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUploadError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🚀 Creating new inspection...');

      /*
       * STEP 1
       * Create inspection
       */
      const inspectionResponse =
        await inspectionsAPI.create({
          location: formData.location.trim(),
          officerRemarks: formData.remarks.trim(),
          inspectionType: formData.inspectionType,
          productCategory:
            formData.productCategory.trim(),
          commodityName:
            formData.commodityName.trim()
        });

      console.log(
        '✅ Inspection created:',
        inspectionResponse.data
      );

      /*
       * Get backend-generated inspection ID
       */
      const inspectionId =
        inspectionResponse.data?.data?.inspectionId ||
        inspectionResponse.data?.inspectionId ||
        inspectionResponse.data?.data?._id ||
        inspectionResponse.data?._id;

      if (!inspectionId) {
        throw new Error(
          'Inspection was created but inspection ID was not returned by server.'
        );
      }

      console.log(
        '🆔 Inspection ID:',
        inspectionId
      );

      /*
       * STEP 2
       * Upload every selected image.
       *
       * Original file is sent.
       * No frontend resizing/compression.
       */
      for (const slot of ANGLE_SLOTS) {
        const file = images[slot.id];

        if (!file) {
          continue;
        }

        console.log(
          `📤 Uploading ${slot.id}: ${file.name}`
        );

        const imageFormData = new FormData();

        imageFormData.append(
          'image',
          file
        );

        imageFormData.append(
          'angle',
          slot.id
        );

        await inspectionsAPI.uploadImages(
          inspectionId,
          imageFormData
        );

        console.log(
          `✅ ${slot.id} uploaded successfully`
        );
      }

      /*
       * STEP 3
       * Navigate to AI processing.
       */
      console.log(
        `🤖 Starting AI processing: ${inspectionId}`
      );

      navigate(
        `/processing/${inspectionId}`
      );
    } catch (error) {
      console.error(
        '❌ Inspection creation/upload failed:',
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Something went wrong while creating the inspection.';

      setUploadError(message);
      setIsSubmitting(false);
    }
  };

  const uploadedCount =
    Object.keys(images).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                navigate('/dashboard')
              }
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <ArrowLeft size={22} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                New Inspection
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Scan product packaging for Legal
                Metrology compliance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit}>
          {/* Inspection Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <FileText
                  size={21}
                  className="text-green-600"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Inspection Details
                </h2>

                <p className="text-sm text-gray-500">
                  Enter basic information about the inspection
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Commodity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commodity Name
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="commodityName"
                    value={
                      formData.commodityName
                    }
                    onChange={handleChange}
                    placeholder="e.g. Packaged Basmati Rice"
                    className={`
                      w-full pl-10 pr-4 py-3 rounded-lg border
                      focus:outline-none focus:ring-2 focus:ring-green-500
                      ${
                        errors.commodityName
                          ? 'border-red-400'
                          : 'border-gray-300'
                      }
                    `}
                  />
                </div>

                {errors.commodityName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.commodityName}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Category
                </label>

                <select
                  name="productCategory"
                  value={
                    formData.productCategory
                  }
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="FOOD">
                    Food & Beverages
                  </option>

                  <option value="COSMETICS">
                    Cosmetics
                  </option>

                  <option value="HOUSEHOLD">
                    Household Products
                  </option>

                  <option value="ELECTRONICS">
                    Electronics
                  </option>

                  <option value="CLOTHING">
                    Clothing & Textiles
                  </option>

                  <option value="OTHER">
                    Other
                  </option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inspection Location
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai Retail Market"
                    className={`
                      w-full pl-10 pr-4 py-3 rounded-lg border
                      focus:outline-none focus:ring-2 focus:ring-green-500
                      ${
                        errors.location
                          ? 'border-red-400'
                          : 'border-gray-300'
                      }
                    `}
                  />
                </div>

                {errors.location && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Inspection Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inspection Type
                </label>

                <select
                  name="inspectionType"
                  value={
                    formData.inspectionType
                  }
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="ROUTINE">
                    Routine Inspection
                  </option>

                  <option value="COMPLAINT">
                    Complaint Based
                  </option>

                  <option value="TARGETED">
                    Targeted Inspection
                  </option>

                  <option value="FOLLOW_UP">
                    Follow-up Inspection
                  </option>
                </select>
              </div>

              {/* Remarks */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Officer Remarks
                </label>

                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Add any observations or remarks..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Package Images */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ImageIcon
                    size={21}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Package Images
                  </h2>

                  <p className="text-sm text-gray-500">
                    Upload clear images of the package
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {uploadedCount} /{' '}
                  {ANGLE_SLOTS.length} uploaded
                </span>

                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{
                      width: `${
                        (uploadedCount /
                          ANGLE_SLOTS.length) *
                        100
                      }%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Guidance */}
            <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex gap-3">
                <AlertCircle
                  size={20}
                  className="text-blue-600 flex-shrink-0 mt-0.5"
                />

                <div>
                  <h3 className="font-semibold text-blue-900">
                    AI-powered image analysis
                  </h3>

                  <p className="text-sm text-blue-800 mt-1">
                    Upload the package images normally.
                    LegalScan AI will automatically
                    evaluate image quality before OCR
                    and compliance analysis.
                  </p>

                  <p className="text-xs text-blue-700 mt-2">
                    For best results, capture the package
                    clearly and keep mandatory declarations
                    visible.
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Error */}
            {uploadError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="flex gap-3">
                  <AlertCircle
                    size={20}
                    className="text-red-600 flex-shrink-0"
                  />

                  <div>
                    <p className="font-semibold text-red-800">
                      Image Upload Error
                    </p>

                    <p className="text-sm text-red-700 mt-1">
                      {uploadError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Validation Error */}
            {errors.images && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2">
                  <AlertCircle
                    size={18}
                    className="text-red-600"
                  />

                  <p className="text-sm text-red-700">
                    {errors.images}
                  </p>
                </div>
              </div>
            )}

            {/* Image Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ANGLE_SLOTS.map((slot) => (
                <ImageSlot
                  key={slot.id}
                  slot={slot}
                  file={images[slot.id]}
                  onUpload={handleUpload}
                  onRemove={handleRemove}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          </div>

          {/* AI Pipeline */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle
                  size={23}
                  className="text-white"
                />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  AI Compliance Analysis
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  After submission, LegalScan AI will
                  automatically process the package images
                  through:
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
                    Image Quality
                  </span>

                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
                    Computer Vision
                  </span>

                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
                    OCR
                  </span>

                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
                    NLP Extraction
                  </span>

                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
                    Legal Metrology Rules
                  </span>

                  <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
                    Evidence Generation
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/dashboard')
              }
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />
                  Creating Inspection...
                </>
              ) : (
                <>
                  <Camera size={19} />
                  Start AI Inspection
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewInspection;