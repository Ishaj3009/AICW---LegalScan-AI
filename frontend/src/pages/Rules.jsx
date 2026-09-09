// // // import React, { useState } from 'react';
// // // import Card from '../components/Card';
// // // import Button from '../components/Button';
// // // import { BookOpen, CheckCircle2, Search, X, ShieldCheck, Loader2 } from 'lucide-react';
// // // import { useSeedData } from '../context/SeedDataContext';

// // // const Rules = () => {
// // //   const { rules, addRule } = useSeedData();
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [formData, setFormData] = useState({ rule: '', section: '', act: 'Legal Metrology Act, 2009' });
// // //   const [isVerifying, setIsVerifying] = useState(false);
// // //   const [isVerified, setIsVerified] = useState(false);

// // //   const handleVerify = () => {
// // //     setIsVerifying(true);
// // //     // Simulate API call to government DB
// // //     setTimeout(() => {
// // //       setIsVerifying(false);
// // //       setIsVerified(true);
// // //     }, 1500);
// // //   };

// // //   const handleAddRule = (e) => {
// // //     e.preventDefault();
// // //     if (!isVerified) return;
    
// // //     const newRule = {
// // //       id: `CUST-${Math.floor(Math.random() * 1000)}`,
// // //       rule: formData.rule,
// // //       section: `${formData.section} of ${formData.act}`,
// // //       status: 'Active'
// // //     };
// // //     addRule(newRule);
// // //     setShowModal(false);
// // //     resetForm();
// // //   };

// // //   const resetForm = () => {
// // //     setFormData({ rule: '', section: '', act: 'Legal Metrology Act, 2009' });
// // //     setIsVerified(false);
// // //     setIsVerifying(false);
// // //   };

// // //   const handleConfigure = (ruleName) => {
// // //     alert(`Configuration for ${ruleName} would open here.`);
// // //   };

// // //   const filteredRules = rules.filter(r => 
// // //     r.rule.toLowerCase().includes(searchTerm.toLowerCase()) || 
// // //     r.section.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   return (
// // //     <div className="space-y-8 max-w-6xl mx-auto p-4 relative">
// // //       {showModal && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
// // //           <div className="bg-bg-base w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-border">
// // //             <div className="p-4 border-b border-border flex justify-between items-center bg-white">
// // //               <div className="flex items-center gap-2">
// // //                 <ShieldCheck className="text-green-600" />
// // //                 <h2 className="text-xl font-editorial font-bold text-primary">Add Custom Rule</h2>
// // //               </div>
// // //               <button onClick={() => {setShowModal(false); resetForm();}} className="text-gray-500 hover:text-red-500 transition-colors"><X size={20}/></button>
// // //             </div>
            
// // //             <form onSubmit={handleAddRule} className="p-6 space-y-4 bg-white">
// // //               <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 border border-blue-100 mb-4">
// // //                 All custom rules must be verified against the official government act or scheme database before activation.
// // //               </div>

// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">Rule/Amendment Name</label>
// // //                 <input required disabled={isVerified} type="text" className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50" value={formData.rule} onChange={e => setFormData({...formData, rule: e.target.value})} placeholder="e.g. Revised MRP Guidelines" />
// // //               </div>
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">Act / Scheme</label>
// // //                   <select disabled={isVerified} className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50" value={formData.act} onChange={e => setFormData({...formData, act: e.target.value})}>
// // //                     <option>Legal Metrology Act, 2009</option>
// // //                     <option>FSSAI Act, 2006</option>
// // //                     <option>BIS Act, 2016</option>
// // //                     <option>Consumer Protection Act, 2019</option>
// // //                   </select>
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">Section / Clause</label>
// // //                   <input required disabled={isVerified} type="text" className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} placeholder="e.g. Rule 6(1)(e)" />
// // //                 </div>
// // //               </div>
              
// // //               <div className="pt-4 flex items-center justify-between border-t border-border mt-4">
// // //                 {!isVerified ? (
// // //                   <Button type="button" onClick={handleVerify} disabled={isVerifying || !formData.rule || !formData.section} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900">
// // //                     {isVerifying ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
// // //                     {isVerifying ? 'Verifying with Govt DB...' : 'Verify Rule'}
// // //                   </Button>
// // //                 ) : (
// // //                   <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-3 py-2 rounded-lg border border-green-200">
// // //                     <CheckCircle2 size={18} /> Verified Officially
// // //                   </div>
// // //                 )}
                
// // //                 <div className="flex gap-3">
// // //                   <Button type="button" variant="outline" onClick={() => {setShowModal(false); resetForm();}}>Cancel</Button>
// // //                   <Button type="submit" disabled={!isVerified} className="disabled:opacity-50">Add Rule</Button>
// // //                 </div>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="flex justify-between items-center">
// // //         <div>
// // //           <h1 className="text-3xl font-bold tracking-tight text-primary">Rule Engine</h1>
// // //           <p className="text-gray-500 mt-1">Manage validation rules and compliance standards.</p>
// // //         </div>
// // //         <div className="flex gap-4">
// // //           <div className="relative">
// // //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// // //             <input 
// // //               type="text" 
// // //               placeholder="Search rules..." 
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //               className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
// // //             />
// // //           </div>
// // //           <Button onClick={() => setShowModal(true)}>Add Custom Rule</Button>
// // //         </div>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //         {filteredRules.map((item, idx) => (
// // //           <Card key={idx}>
// // //             <div className="flex items-start gap-4">
// // //               <div className="mt-1 text-accent">
// // //                 <BookOpen size={24} />
// // //               </div>
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-start mb-2">
// // //                   <h3 className="font-bold text-primary">{item.rule}</h3>
// // //                   <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
// // //                     <CheckCircle2 size={12} /> {item.status}
// // //                   </span>
// // //                 </div>
// // //                 <p className="text-sm text-gray-500 mb-3">{item.section}</p>
// // //                 <div className="flex justify-between items-center text-xs">
// // //                   <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{item.id}</span>
// // //                   <Button variant="outline" className="text-xs py-1" onClick={() => handleConfigure(item.rule)}>Configure</Button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </Card>
// // //         ))}
// // //         {filteredRules.length === 0 && <p className="text-gray-500">No rules found.</p>}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Rules;


// // import React, { useState } from 'react';
// // import Card from '../components/Card';
// // import Button from '../components/Button';
// // import {
// //   BookOpen,
// //   CheckCircle2,
// //   Search,
// //   X,
// //   ShieldCheck,
// //   Loader2,
// //   Settings2
// // } from 'lucide-react';
// // import { useSeedData } from '../context/SeedDataContext';

// // const Rules = () => {
// //   const { rules, addRule } = useSeedData();

// //   const [searchTerm, setSearchTerm] = useState('');

// //   // Add Rule Modal
// //   const [showModal, setShowModal] = useState(false);
// //   const [formData, setFormData] = useState({
// //     rule: '',
// //     section: '',
// //     act: 'Legal Metrology Act, 2009'
// //   });
// //   const [isVerifying, setIsVerifying] = useState(false);
// //   const [isVerified, setIsVerified] = useState(false);

// //   // Configure Rule Modal
// //   const [showConfigureModal, setShowConfigureModal] = useState(false);
// //   const [selectedRule, setSelectedRule] = useState(null);
// //   const [ruleConfigurations, setRuleConfigurations] = useState({});
// //   const [configData, setConfigData] = useState({
// //     status: 'Active',
// //     requirement: '',
// //     validation: 'Presence',
// //     minimumFontSize: '10',
// //     readabilityCheck: true,
// //     ocrVerification: true
// //   });

// //   // ============================================================
// //   // ADD CUSTOM RULE
// //   // ============================================================

// //   const handleVerify = () => {
// //     setIsVerifying(true);

// //     setTimeout(() => {
// //       setIsVerifying(false);
// //       setIsVerified(true);
// //     }, 1500);
// //   };

// //   const handleAddRule = (e) => {
// //     e.preventDefault();

// //     if (!isVerified) return;

// //     const newRule = {
// //       id: `CUST-${Math.floor(Math.random() * 1000)}`,
// //       rule: formData.rule,
// //       section: `${formData.section} of ${formData.act}`,
// //       status: 'Active'
// //     };

// //     addRule(newRule);

// //     setShowModal(false);
// //     resetForm();
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       rule: '',
// //       section: '',
// //       act: 'Legal Metrology Act, 2009'
// //     });

// //     setIsVerified(false);
// //     setIsVerifying(false);
// //   };

// //   // ============================================================
// //   // CONFIGURE RULE
// //   // ============================================================

// //   const getRuleConfiguration = (rule) => {
// //     const name = rule.rule.toLowerCase();

// //     if (name.includes('manufacturer')) {
// //       return {
// //         requirement:
// //           'Manufacturer name and complete address must be declared on the package.',
// //         validation: 'Presence',
// //         minimumFontSize: '10'
// //       };
// //     }

// //     if (name.includes('generic')) {
// //       return {
// //         requirement:
// //           'Generic or common name of the commodity must be declared clearly.',
// //         validation: 'Presence',
// //         minimumFontSize: '10'
// //       };
// //     }

// //     if (name.includes('net quantity')) {
// //       return {
// //         requirement:
// //           'Net quantity of the commodity must be declared using the prescribed unit.',
// //         validation: 'Presence + Unit',
// //         minimumFontSize: '10'
// //       };
// //     }

// //     if (name.includes('month') || name.includes('year')) {
// //       return {
// //         requirement:
// //           'Month and year of manufacture, packing or import must be declared.',
// //         validation: 'Presence + Date Format',
// //         minimumFontSize: '10'
// //       };
// //     }

// //     if (name.includes('mrp')) {
// //       return {
// //         requirement:
// //           'Maximum Retail Price inclusive of all taxes must be declared on the package.',
// //         validation: 'Presence + MRP Format',
// //         minimumFontSize: '10'
// //       };
// //     }

// //     if (name.includes('consumer care')) {
// //       return {
// //         requirement:
// //           'Consumer care details including required contact information must be declared.',
// //         validation: 'Presence + Contact',
// //         minimumFontSize: '10'
// //       };
// //     }

// //     if (name.includes('veg') || name.includes('non-veg')) {
// //       return {
// //         requirement:
// //           'Applicable vegetarian or non-vegetarian declaration/logo must be displayed.',
// //         validation: 'Presence',
// //         minimumFontSize: '10'
// //       };
// //     }

// //     if (name.includes('nutritional')) {
// //       return {
// //         requirement:
// //           'Applicable nutritional information must be declared according to the relevant requirements.',
// //         validation: 'Presence + Format',
// //         minimumFontSize: '10'
// //       };
// //     }

// //     return {
// //       requirement:
// //         'The required declaration must be present, readable and clearly identifiable.',
// //       validation: 'Presence',
// //       minimumFontSize: '10'
// //     };
// //   };

// //  const handleConfigure = (rule) => {
// //   const defaults = getRuleConfiguration(rule);

// //   const savedConfig = ruleConfigurations[rule.id];

// //   setSelectedRule(rule);

// //   setConfigData(
// //     savedConfig || {
// //       status: rule.status || 'Active',
// //       requirement: defaults.requirement,
// //       validation: defaults.validation,
// //       minimumFontSize: defaults.minimumFontSize,
// //       readabilityCheck: true,
// //       ocrVerification: true
// //     }
// //   );

// //   setShowConfigureModal(true);
// // };
// //   const closeConfigureModal = () => {
// //     setShowConfigureModal(false);
// //     setSelectedRule(null);
// //   };
// // const handleSaveConfiguration = () => {
// //   if (!selectedRule) return;

// //   setRuleConfigurations((prev) => ({
// //     ...prev,
// //     [selectedRule.id]: {
// //       ...configData
// //     }
// //   }));

// //   setShowConfigureModal(false);
// //   setSelectedRule(null);
// // };
// //   };

// //   // ============================================================
// //   // SEARCH
// //   // ============================================================

// //   const filteredRules = rules.filter(
// //     (r) =>
// //       r.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       r.section.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div className="space-y-8 max-w-6xl mx-auto p-4 relative">

// //       {/* ======================================================
// //           ADD CUSTOM RULE MODAL
// //       ======================================================= */}

// //       {showModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

// //           <div className="bg-bg-base w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-border">

// //             <div className="p-4 border-b border-border flex justify-between items-center bg-white">

// //               <div className="flex items-center gap-2">
// //                 <ShieldCheck className="text-green-600" />

// //                 <h2 className="text-xl font-editorial font-bold text-primary">
// //                   Add Custom Rule
// //                 </h2>
// //               </div>

// //               <button
// //                 onClick={() => {
// //                   setShowModal(false);
// //                   resetForm();
// //                 }}
// //                 className="text-gray-500 hover:text-red-500 transition-colors"
// //               >
// //                 <X size={20} />
// //               </button>

// //             </div>

// //             <form
// //               onSubmit={handleAddRule}
// //               className="p-6 space-y-4 bg-white"
// //             >

// //               <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 border border-blue-100 mb-4">
// //                 All custom rules must be verified against the official
// //                 government act or scheme database before activation.
// //               </div>

// //               <div>

// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Rule/Amendment Name
// //                 </label>

// //                 <input
// //                   required
// //                   disabled={isVerified}
// //                   type="text"
// //                   className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50"
// //                   value={formData.rule}
// //                   onChange={(e) =>
// //                     setFormData({
// //                       ...formData,
// //                       rule: e.target.value
// //                     })
// //                   }
// //                   placeholder="e.g. Revised MRP Guidelines"
// //                 />

// //               </div>

// //               <div className="grid grid-cols-2 gap-4">

// //                 <div>

// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Act / Scheme
// //                   </label>

// //                   <select
// //                     disabled={isVerified}
// //                     className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50"
// //                     value={formData.act}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         act: e.target.value
// //                       })
// //                     }
// //                   >
// //                     <option>
// //                       Legal Metrology Act, 2009
// //                     </option>

// //                     <option>
// //                       FSSAI Act, 2006
// //                     </option>

// //                     <option>
// //                       BIS Act, 2016
// //                     </option>

// //                     <option>
// //                       Consumer Protection Act, 2019
// //                     </option>
// //                   </select>

// //                 </div>

// //                 <div>

// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Section / Clause
// //                   </label>

// //                   <input
// //                     required
// //                     disabled={isVerified}
// //                     type="text"
// //                     className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50"
// //                     value={formData.section}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         section: e.target.value
// //                       })
// //                     }
// //                     placeholder="e.g. Rule 6(1)(e)"
// //                   />

// //                 </div>

// //               </div>

// //               <div className="pt-4 flex items-center justify-between border-t border-border mt-4">

// //                 {!isVerified ? (

// //                   <Button
// //                     type="button"
// //                     onClick={handleVerify}
// //                     disabled={
// //                       isVerifying ||
// //                       !formData.rule ||
// //                       !formData.section
// //                     }
// //                     className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900"
// //                   >

// //                     {isVerifying ? (
// //                       <Loader2
// //                         size={16}
// //                         className="animate-spin"
// //                       />
// //                     ) : (
// //                       <ShieldCheck size={16} />
// //                     )}

// //                     {isVerifying
// //                       ? 'Verifying with Govt DB...'
// //                       : 'Verify Rule'}

// //                   </Button>

// //                 ) : (

// //                   <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-3 py-2 rounded-lg border border-green-200">

// //                     <CheckCircle2 size={18} />

// //                     Verified Officially

// //                   </div>

// //                 )}

// //                 <div className="flex gap-3">

// //                   <Button
// //                     type="button"
// //                     variant="outline"
// //                     onClick={() => {
// //                       setShowModal(false);
// //                       resetForm();
// //                     }}
// //                   >
// //                     Cancel
// //                   </Button>

// //                   <Button
// //                     type="submit"
// //                     disabled={!isVerified}
// //                     className="disabled:opacity-50"
// //                   >
// //                     Add Rule
// //                   </Button>

// //                 </div>

// //               </div>

// //             </form>

// //           </div>

// //         </div>
// //       )}

// //       {/* ======================================================
// //           CONFIGURE RULE MODAL
// //       ======================================================= */}

// //       {showConfigureModal && selectedRule && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

// //           <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-border">

// //             {/* Header */}

// //             <div className="p-5 border-b border-border flex justify-between items-center">

// //               <div className="flex items-center gap-3">

// //                 <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
// //                   <Settings2
// //                     size={21}
// //                     className="text-accent"
// //                   />
// //                 </div>

// //                 <div>

// //                   <h2 className="text-xl font-bold text-primary">
// //                     Configure Rule
// //                   </h2>

// //                   <p className="text-sm text-gray-500">
// //                     Configure validation parameters
// //                   </p>

// //                 </div>

// //               </div>

// //               <button
// //                 onClick={closeConfigureModal}
// //                 className="text-gray-400 hover:text-red-500 transition-colors"
// //               >
// //                 <X size={22} />
// //               </button>

// //             </div>

// //             {/* Rule Information */}

// //             <div className="p-6 space-y-5">

// //               <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">

// //                 <div className="flex justify-between items-start gap-4">

// //                   <div>

// //                     <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
// //                       Rule
// //                     </p>

// //                     <h3 className="font-bold text-primary text-lg">
// //                       {selectedRule.rule}
// //                     </h3>

// //                     <p className="text-sm text-gray-500 mt-1">
// //                       {selectedRule.section}
// //                     </p>

// //                   </div>

// //                   <span className="font-mono text-xs bg-white border border-gray-200 px-2 py-1 rounded">
// //                     {selectedRule.id}
// //                   </span>

// //                 </div>

// //               </div>

// //               {/* Status */}

// //               <div>

// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Rule Status
// //                 </label>

// //                 <div className="flex gap-3">

// //                   <button
// //                     type="button"
// //                     onClick={() =>
// //                       setConfigData({
// //                         ...configData,
// //                         status: 'Active'
// //                       })
// //                     }
// //                     className={`flex-1 py-2.5 rounded-lg border font-medium transition ${
// //                       configData.status === 'Active'
// //                         ? 'bg-green-50 border-green-300 text-green-700'
// //                         : 'border-gray-200 text-gray-500'
// //                     }`}
// //                   >
// //                     <CheckCircle2
// //                       size={16}
// //                       className="inline mr-2"
// //                     />
// //                     Active
// //                   </button>

// //                   <button
// //                     type="button"
// //                     onClick={() =>
// //                       setConfigData({
// //                         ...configData,
// //                         status: 'Inactive'
// //                       })
// //                     }
// //                     className={`flex-1 py-2.5 rounded-lg border font-medium transition ${
// //                       configData.status === 'Inactive'
// //                         ? 'bg-red-50 border-red-300 text-red-700'
// //                         : 'border-gray-200 text-gray-500'
// //                     }`}
// //                   >
// //                     Inactive
// //                   </button>

// //                 </div>

// //               </div>

// //               {/* Requirement */}

// //               <div>

// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Compliance Requirement
// //                 </label>

// //                 <textarea
// //                   rows={3}
// //                   value={configData.requirement}
// //                   onChange={(e) =>
// //                     setConfigData({
// //                       ...configData,
// //                       requirement: e.target.value
// //                     })
// //                   }
// //                   className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent resize-none"
// //                 />

// //               </div>

// //               {/* Validation */}

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// //                 <div>

// //                   <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                     Validation Type
// //                   </label>

// //                   <select
// //                     value={configData.validation}
// //                     onChange={(e) =>
// //                       setConfigData({
// //                         ...configData,
// //                         validation: e.target.value
// //                       })
// //                     }
// //                     className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
// //                   >

// //                     <option>Presence</option>
// //                     <option>Presence + Unit</option>
// //                     <option>Presence + Contact</option>
// //                     <option>Presence + MRP Format</option>
// //                     <option>Presence + Date Format</option>
// //                     <option>Presence + Format</option>

// //                   </select>

// //                 </div>

// //                 <div>

// //                   <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                     Minimum Font Size
// //                   </label>

// //                   <div className="relative">

// //                     <input
// //                       type="number"
// //                       min="1"
// //                       max="100"
// //                       value={configData.minimumFontSize}
// //                       onChange={(e) =>
// //                         setConfigData({
// //                           ...configData,
// //                           minimumFontSize: e.target.value
// //                         })
// //                       }
// //                       className="w-full p-2.5 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
// //                     />

// //                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
// //                       pt
// //                     </span>

// //                   </div>

// //                 </div>

// //               </div>

// //               {/* Automated Checks */}

// //               <div>

// //                 <label className="block text-sm font-semibold text-gray-700 mb-3">
// //                   Automated Checks
// //                 </label>

// //                 <div className="space-y-2">

// //                   <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer">

// //                     <div>

// //                       <p className="text-sm font-medium text-gray-700">
// //                         Readability Check
// //                       </p>

// //                       <p className="text-xs text-gray-500">
// //                         Verify that declaration text is readable.
// //                       </p>

// //                     </div>

// //                     <input
// //                       type="checkbox"
// //                       checked={configData.readabilityCheck}
// //                       onChange={(e) =>
// //                         setConfigData({
// //                           ...configData,
// //                           readabilityCheck: e.target.checked
// //                         })
// //                       }
// //                       className="w-5 h-5 accent-green-600"
// //                     />

// //                   </label>

// //                   <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer">

// //                     <div>

// //                       <p className="text-sm font-medium text-gray-700">
// //                         OCR Verification
// //                       </p>

// //                       <p className="text-xs text-gray-500">
// //                         Verify the declaration using OCR extraction.
// //                       </p>

// //                     </div>

// //                     <input
// //                       type="checkbox"
// //                       checked={configData.ocrVerification}
// //                       onChange={(e) =>
// //                         setConfigData({
// //                           ...configData,
// //                           ocrVerification: e.target.checked
// //                         })
// //                       }
// //                       className="w-5 h-5 accent-green-600"
// //                     />

// //                   </label>

// //                 </div>

// //               </div>

// //             </div>

// //             {/* Footer */}

// //             <div className="px-6 py-4 border-t border-border bg-gray-50 flex justify-end gap-3">

// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 onClick={closeConfigureModal}
// //               >
// //                 Cancel
// //               </Button>

// //               <Button
// //                 type="button"
// //                 onClick={handleSaveConfiguration}
// //                 className="flex items-center gap-2"
// //               >
// //                 <ShieldCheck size={16} />
// //                 Save Changes
// //               </Button>

// //             </div>

// //           </div>

// //         </div>
// //       )}

// //       {/* ======================================================
// //           PAGE HEADER
// //       ======================================================= */}

// //       <div className="flex justify-between items-center">

// //         <div>

// //           <h1 className="text-3xl font-bold tracking-tight text-primary">
// //             Rule Engine
// //           </h1>

// //           <p className="text-gray-500 mt-1">
// //             Manage validation rules and compliance standards.
// //           </p>

// //         </div>

// //         <div className="flex gap-4">

// //           <div className="relative">

// //             <Search
// //               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
// //               size={18}
// //             />

// //             <input
// //               type="text"
// //               placeholder="Search rules..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
// //             />

// //           </div>

// //           <Button onClick={() => setShowModal(true)}>
// //             Add Custom Rule
// //           </Button>

// //         </div>

// //       </div>

// //       {/* ======================================================
// //           RULE CARDS
// //       ======================================================= */}

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// //         {filteredRules.map((item, idx) => (

// //           <Card key={idx}>

// //             <div className="flex items-start gap-4">

// //               <div className="mt-1 text-accent">
// //                 <BookOpen size={24} />
// //               </div>

// //               <div className="flex-1">

// //                 <div className="flex justify-between items-start mb-2">

// //                   <h3 className="font-bold text-primary">
// //                     {item.rule}
// //                   </h3>

// //                   <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">

// //                     <CheckCircle2 size={12} />

// //                     {item.status}

// //                   </span>

// //                 </div>

// //                 <p className="text-sm text-gray-500 mb-3">
// //                   {item.section}
// //                 </p>

// //                 <div className="flex justify-between items-center text-xs">

// //                   <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
// //                     {item.id}
// //                   </span>

// //                   <Button
// //                     variant="outline"
// //                     className="text-xs py-1"
// //                     onClick={() => handleConfigure(item)}
// //                   >
// //                     Configure
// //                   </Button>

// //                 </div>

// //               </div>

// //             </div>

// //           </Card>

// //         ))}

// //         {filteredRules.length === 0 && (
// //           <p className="text-gray-500">
// //             No rules found.
// //           </p>
// //         )}

// //       </div>

// //     </div>
// //   );
// // };

// // export default Rules;


// import React, { useState } from 'react';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import {
//   BookOpen,
//   CheckCircle2,
//   Search,
//   X,
//   ShieldCheck,
//   Loader2,
//   Settings2
// } from 'lucide-react';
// import { useSeedData } from '../context/SeedDataContext';

// const Rules = () => {
//   const { rules, addRule } = useSeedData();

//   const [searchTerm, setSearchTerm] = useState('');

//   // ============================================================
//   // ADD CUSTOM RULE MODAL
//   // ============================================================

//   const [showModal, setShowModal] = useState(false);

//   const [formData, setFormData] = useState({
//     rule: '',
//     section: '',
//     act: 'Legal Metrology Act, 2009'
//   });

//   const [isVerifying, setIsVerifying] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);

//   // ============================================================
//   // CONFIGURE RULE MODAL
//   // ============================================================

//   const [showConfigureModal, setShowConfigureModal] = useState(false);
//   const [selectedRule, setSelectedRule] = useState(null);

//   // Stores configuration changes for each rule
//   const [ruleConfigurations, setRuleConfigurations] = useState({});

//   const [configData, setConfigData] = useState({
//     status: 'Active',
//     requirement: '',
//     validation: 'Presence',
//     minimumFontSize: '10',
//     readabilityCheck: true,
//     ocrVerification: true
//   });

//   // ============================================================
//   // VERIFY CUSTOM RULE
//   // ============================================================

//   const handleVerify = () => {
//     setIsVerifying(true);

//     // Simulated government database verification
//     setTimeout(() => {
//       setIsVerifying(false);
//       setIsVerified(true);
//     }, 1500);
//   };

//   // ============================================================
//   // ADD CUSTOM RULE
//   // ============================================================

//   const handleAddRule = (e) => {
//     e.preventDefault();

//     if (!isVerified) return;

//     const newRule = {
//       id: `CUST-${Math.floor(Math.random() * 1000)}`,
//       rule: formData.rule,
//       section: `${formData.section} of ${formData.act}`,
//       status: 'Active'
//     };

//     addRule(newRule);

//     setShowModal(false);
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       rule: '',
//       section: '',
//       act: 'Legal Metrology Act, 2009'
//     });

//     setIsVerified(false);
//     setIsVerifying(false);
//   };

//   // ============================================================
//   // DEFAULT CONFIGURATION BASED ON RULE
//   // ============================================================

//   const getRuleConfiguration = (rule) => {
//     const name = rule.rule.toLowerCase();

//     if (name.includes('manufacturer')) {
//       return {
//         requirement:
//           'Manufacturer name and complete address must be declared on the package.',
//         validation: 'Presence',
//         minimumFontSize: '10'
//       };
//     }

//     if (name.includes('generic')) {
//       return {
//         requirement:
//           'Generic or common name of the commodity must be declared clearly.',
//         validation: 'Presence',
//         minimumFontSize: '10'
//       };
//     }

//     if (name.includes('net quantity')) {
//       return {
//         requirement:
//           'Net quantity of the commodity must be declared using the prescribed unit.',
//         validation: 'Presence + Unit',
//         minimumFontSize: '10'
//       };
//     }

//     if (name.includes('month') || name.includes('year')) {
//       return {
//         requirement:
//           'Month and year of manufacture, packing or import must be declared.',
//         validation: 'Presence + Date Format',
//         minimumFontSize: '10'
//       };
//     }

//     if (name.includes('mrp')) {
//       return {
//         requirement:
//           'Maximum Retail Price inclusive of all taxes must be declared on the package.',
//         validation: 'Presence + MRP Format',
//         minimumFontSize: '10'
//       };
//     }

//     if (name.includes('consumer care')) {
//       return {
//         requirement:
//           'Consumer care details including required contact information must be declared.',
//         validation: 'Presence + Contact',
//         minimumFontSize: '10'
//       };
//     }

//     if (name.includes('veg') || name.includes('non-veg')) {
//       return {
//         requirement:
//           'Applicable vegetarian or non-vegetarian declaration/logo must be displayed.',
//         validation: 'Presence',
//         minimumFontSize: '10'
//       };
//     }

//     if (name.includes('nutritional')) {
//       return {
//         requirement:
//           'Applicable nutritional information must be declared according to the relevant requirements.',
//         validation: 'Presence + Format',
//         minimumFontSize: '10'
//       };
//     }

//     return {
//       requirement:
//         'The required declaration must be present, readable and clearly identifiable.',
//       validation: 'Presence',
//       minimumFontSize: '10'
//     };
//   };

//   // ============================================================
//   // OPEN CONFIGURE MODAL
//   // ============================================================

//   const handleConfigure = (rule) => {
//     const defaults = getRuleConfiguration(rule);

//     // If this rule was previously configured,
//     // load the saved configuration.
//     const savedConfig = ruleConfigurations[rule.id];

//     setSelectedRule(rule);

//     setConfigData(
//       savedConfig || {
//         status: rule.status || 'Active',
//         requirement: defaults.requirement,
//         validation: defaults.validation,
//         minimumFontSize: defaults.minimumFontSize,
//         readabilityCheck: true,
//         ocrVerification: true
//       }
//     );

//     setShowConfigureModal(true);
//   };

//   // ============================================================
//   // CLOSE CONFIGURE MODAL
//   // ============================================================

//   const closeConfigureModal = () => {
//     setShowConfigureModal(false);
//     setSelectedRule(null);
//   };

//   // ============================================================
//   // SAVE CONFIGURATION
//   // ============================================================

//   const handleSaveConfiguration = () => {
//     if (!selectedRule) return;

//     // Save configuration against the rule ID
//     setRuleConfigurations((prev) => ({
//       ...prev,
//       [selectedRule.id]: {
//         ...configData
//       }
//     }));

//     setShowConfigureModal(false);
//     setSelectedRule(null);
//   };

//   // ============================================================
//   // SEARCH
//   // ============================================================

//   const filteredRules = rules.filter(
//     (r) =>
//       r.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       r.section.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <div className="space-y-8 max-w-6xl mx-auto p-4 relative">

//       {/* ======================================================
//           ADD CUSTOM RULE MODAL
//       ======================================================= */}

//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

//           <div className="bg-bg-base w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-border">

//             {/* Header */}

//             <div className="p-4 border-b border-border flex justify-between items-center bg-white">

//               <div className="flex items-center gap-2">

//                 <ShieldCheck className="text-green-600" />

//                 <h2 className="text-xl font-editorial font-bold text-primary">
//                   Add Custom Rule
//                 </h2>

//               </div>

//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   resetForm();
//                 }}
//                 className="text-gray-500 hover:text-red-500 transition-colors"
//               >
//                 <X size={20} />
//               </button>

//             </div>

//             {/* Form */}

//             <form
//               onSubmit={handleAddRule}
//               className="p-6 space-y-4 bg-white"
//             >

//               <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 border border-blue-100 mb-4">

//                 All custom rules must be verified against the official
//                 government act or scheme database before activation.

//               </div>

//               {/* Rule Name */}

//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Rule/Amendment Name
//                 </label>

//                 <input
//                   required
//                   disabled={isVerified}
//                   type="text"
//                   className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50"
//                   value={formData.rule}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       rule: e.target.value
//                     })
//                   }
//                   placeholder="e.g. Revised MRP Guidelines"
//                 />

//               </div>

//               {/* Act + Section */}

//               <div className="grid grid-cols-2 gap-4">

//                 <div>

//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Act / Scheme
//                   </label>

//                   <select
//                     disabled={isVerified}
//                     className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50"
//                     value={formData.act}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         act: e.target.value
//                       })
//                     }
//                   >

//                     <option>
//                       Legal Metrology Act, 2009
//                     </option>

//                     <option>
//                       FSSAI Act, 2006
//                     </option>

//                     <option>
//                       BIS Act, 2016
//                     </option>

//                     <option>
//                       Consumer Protection Act, 2019
//                     </option>

//                   </select>

//                 </div>

//                 <div>

//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Section / Clause
//                   </label>

//                   <input
//                     required
//                     disabled={isVerified}
//                     type="text"
//                     className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50"
//                     value={formData.section}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         section: e.target.value
//                       })
//                     }
//                     placeholder="e.g. Rule 6(1)(e)"
//                   />

//                 </div>

//               </div>

//               {/* Footer */}

//               <div className="pt-4 flex items-center justify-between border-t border-border mt-4">

//                 {!isVerified ? (

//                   <Button
//                     type="button"
//                     onClick={handleVerify}
//                     disabled={
//                       isVerifying ||
//                       !formData.rule ||
//                       !formData.section
//                     }
//                     className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900"
//                   >

//                     {isVerifying ? (
//                       <Loader2
//                         size={16}
//                         className="animate-spin"
//                       />
//                     ) : (
//                       <ShieldCheck size={16} />
//                     )}

//                     {isVerifying
//                       ? 'Verifying with Govt DB...'
//                       : 'Verify Rule'}

//                   </Button>

//                 ) : (

//                   <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-3 py-2 rounded-lg border border-green-200">

//                     <CheckCircle2 size={18} />

//                     Verified Officially

//                   </div>

//                 )}

//                 <div className="flex gap-3">

//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => {
//                       setShowModal(false);
//                       resetForm();
//                     }}
//                   >
//                     Cancel
//                   </Button>

//                   <Button
//                     type="submit"
//                     disabled={!isVerified}
//                     className="disabled:opacity-50"
//                   >
//                     Add Rule
//                   </Button>

//                 </div>

//               </div>

//             </form>

//           </div>

//         </div>
//       )}

//       {/* ======================================================
//           CONFIGURE RULE MODAL
//       ======================================================= */}

//       {showConfigureModal && selectedRule && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

//           <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-border">

//             {/* ==================================================
//                 CONFIGURE HEADER
//             ================================================== */}

//             <div className="p-5 border-b border-border flex justify-between items-center">

//               <div className="flex items-center gap-3">

//                 <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">

//                   <Settings2
//                     size={21}
//                     className="text-accent"
//                   />

//                 </div>

//                 <div>

//                   <h2 className="text-xl font-bold text-primary">
//                     Configure Rule
//                   </h2>

//                   <p className="text-sm text-gray-500">
//                     Configure validation parameters
//                   </p>

//                 </div>

//               </div>

//               <button
//                 onClick={closeConfigureModal}
//                 className="text-gray-400 hover:text-red-500 transition-colors"
//               >
//                 <X size={22} />
//               </button>

//             </div>

//             {/* ==================================================
//                 CONFIGURATION BODY
//             ================================================== */}

//             <div className="p-6 space-y-5">

//               {/* Rule Information */}

//               <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">

//                 <div className="flex justify-between items-start gap-4">

//                   <div>

//                     <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
//                       Rule
//                     </p>

//                     <h3 className="font-bold text-primary text-lg">
//                       {selectedRule.rule}
//                     </h3>

//                     <p className="text-sm text-gray-500 mt-1">
//                       {selectedRule.section}
//                     </p>

//                   </div>

//                   <span className="font-mono text-xs bg-white border border-gray-200 px-2 py-1 rounded">
//                     {selectedRule.id}
//                   </span>

//                 </div>

//               </div>

//               {/* ==================================================
//                   RULE STATUS
//               ================================================== */}

//               <div>

//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Rule Status
//                 </label>

//                 <div className="grid grid-cols-2 gap-4">

//                   {/* ACTIVE */}

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setConfigData((prev) => ({
//                         ...prev,
//                         status: 'Active'
//                       }))
//                     }
//                     className={`py-3 rounded-lg border font-medium transition-all ${
//                       configData.status === 'Active'
//                         ? 'bg-green-50 border-green-400 text-green-700 shadow-sm'
//                         : 'bg-white border-gray-200 text-gray-500 hover:border-green-300'
//                     }`}
//                   >

//                     <CheckCircle2
//                       size={17}
//                       className="inline mr-2"
//                     />

//                     Active

//                   </button>

//                   {/* INACTIVE */}

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setConfigData((prev) => ({
//                         ...prev,
//                         status: 'Inactive'
//                       }))
//                     }
//                     className={`py-3 rounded-lg border font-medium transition-all ${
//                       configData.status === 'Inactive'
//                         ? 'bg-red-50 border-red-400 text-red-700 shadow-sm'
//                         : 'bg-white border-gray-200 text-gray-500 hover:border-red-300'
//                     }`}
//                   >

//                     <X
//                       size={17}
//                       className="inline mr-2"
//                     />

//                     Inactive

//                   </button>

//                 </div>

//               </div>

//               {/* ==================================================
//                   COMPLIANCE REQUIREMENT
//               ================================================== */}

//               <div>

//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Compliance Requirement
//                 </label>

//                 <textarea
//                   rows={3}
//                   value={configData.requirement}
//                   onChange={(e) =>
//                     setConfigData((prev) => ({
//                       ...prev,
//                       requirement: e.target.value
//                     }))
//                   }
//                   className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent resize-none"
//                 />

//               </div>

//               {/* ==================================================
//                   VALIDATION + FONT SIZE
//               ================================================== */}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                 {/* Validation */}

//                 <div>

//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Validation Type
//                   </label>

//                   <select
//                     value={configData.validation}
//                     onChange={(e) =>
//                       setConfigData((prev) => ({
//                         ...prev,
//                         validation: e.target.value
//                       }))
//                     }
//                     className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
//                   >

//                     <option>Presence</option>

//                     <option>
//                       Presence + Unit
//                     </option>

//                     <option>
//                       Presence + Contact
//                     </option>

//                     <option>
//                       Presence + MRP Format
//                     </option>

//                     <option>
//                       Presence + Date Format
//                     </option>

//                     <option>
//                       Presence + Format
//                     </option>

//                   </select>

//                 </div>

//                 {/* Font Size */}

//                 <div>

//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Minimum Font Size
//                   </label>

//                   <div className="relative">

//                     <input
//                       type="number"
//                       min="1"
//                       max="100"
//                       value={configData.minimumFontSize}
//                       onChange={(e) =>
//                         setConfigData((prev) => ({
//                           ...prev,
//                           minimumFontSize: e.target.value
//                         }))
//                       }
//                       className="w-full p-2.5 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
//                     />

//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
//                       pt
//                     </span>

//                   </div>

//                 </div>

//               </div>

//               {/* ==================================================
//                   AUTOMATED CHECKS
//               ================================================== */}

//               <div>

//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   Automated Checks
//                 </label>

//                 <div className="space-y-2">

//                   {/* READABILITY */}

//                   <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer">

//                     <div>

//                       <p className="text-sm font-medium text-gray-700">
//                         Readability Check
//                       </p>

//                       <p className="text-xs text-gray-500">
//                         Verify that declaration text is readable.
//                       </p>

//                     </div>

//                     <input
//                       type="checkbox"
//                       checked={configData.readabilityCheck}
//                       onChange={(e) =>
//                         setConfigData((prev) => ({
//                           ...prev,
//                           readabilityCheck: e.target.checked
//                         }))
//                       }
//                       className="w-5 h-5 accent-green-600"
//                     />

//                   </label>

//                   {/* OCR */}

//                   <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer">

//                     <div>

//                       <p className="text-sm font-medium text-gray-700">
//                         OCR Verification
//                       </p>

//                       <p className="text-xs text-gray-500">
//                         Verify the declaration using OCR extraction.
//                       </p>

//                     </div>

//                     <input
//                       type="checkbox"
//                       checked={configData.ocrVerification}
//                       onChange={(e) =>
//                         setConfigData((prev) => ({
//                           ...prev,
//                           ocrVerification: e.target.checked
//                         }))
//                       }
//                       className="w-5 h-5 accent-green-600"
//                     />

//                   </label>

//                 </div>

//               </div>

//             </div>

//             {/* ==================================================
//                 CONFIGURATION FOOTER
//             ================================================== */}

//             <div className="px-6 py-4 border-t border-border bg-gray-50 flex justify-end gap-3">

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={closeConfigureModal}
//               >
//                 Cancel
//               </Button>

//               <Button
//                 type="button"
//                 onClick={handleSaveConfiguration}
//                 className="flex items-center gap-2"
//               >

//                 <ShieldCheck size={16} />

//                 Save Changes

//               </Button>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* ======================================================
//           PAGE HEADER
//       ======================================================= */}

//       <div className="flex justify-between items-center">

//         <div>

//           <h1 className="text-3xl font-bold tracking-tight text-primary">
//             Rule Engine
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Manage validation rules and compliance standards.
//           </p>

//         </div>

//         <div className="flex gap-4">

//           {/* Search */}

//           <div className="relative">

//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               size={18}
//             />

//             <input
//               type="text"
//               placeholder="Search rules..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
//             />

//           </div>

//           {/* Add Rule */}

//           <Button onClick={() => setShowModal(true)}>
//             Add Custom Rule
//           </Button>

//         </div>

//       </div>

//       {/* ======================================================
//           RULE CARDS
//       ======================================================= */}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {filteredRules.map((item, idx) => {

//           // Use saved configuration status if available.
//           // Otherwise use original rule status.
//           const currentStatus =
//             ruleConfigurations[item.id]?.status ||
//             item.status ||
//             'Active';

//           return (

//             <Card key={item.id || idx}>

//               <div className="flex items-start gap-4">

//                 {/* Icon */}

//                 <div className="mt-1 text-accent">

//                   <BookOpen size={24} />

//                 </div>

//                 <div className="flex-1">

//                   {/* Rule Title + Status */}

//                   <div className="flex justify-between items-start mb-2 gap-3">

//                     <h3 className="font-bold text-primary">
//                       {item.rule}
//                     </h3>

//                     <span
//                       className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap ${
//                         currentStatus === 'Active'
//                           ? 'bg-green-100 text-green-700'
//                           : 'bg-red-100 text-red-700'
//                       }`}
//                     >

//                       {currentStatus === 'Active' ? (
//                         <CheckCircle2 size={12} />
//                       ) : (
//                         <X size={12} />
//                       )}

//                       {currentStatus}

//                     </span>

//                   </div>

//                   {/* Section */}

//                   <p className="text-sm text-gray-500 mb-3">
//                     {item.section}
//                   </p>

//                   {/* Bottom */}

//                   <div className="flex justify-between items-center text-xs">

//                     <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
//                       {item.id}
//                     </span>

//                     <Button
//                       variant="outline"
//                       className="text-xs py-1"
//                       onClick={() => handleConfigure(item)}
//                     >
//                       Configure
//                     </Button>

//                   </div>

//                 </div>

//               </div>

//             </Card>

//           );
//         })}

//         {/* No Rules */}

//         {filteredRules.length === 0 && (
//           <p className="text-gray-500">
//             No rules found.
//           </p>
//         )}

//       </div>

//     </div>
//   );
// };

// export default Rules;

import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import {
  BookOpen,
  CheckCircle2,
  Search,
  X,
  ShieldCheck,
  Loader2,
  Settings2
} from 'lucide-react';
import { useSeedData } from '../context/SeedDataContext';

const Rules = () => {
  const { rules, addRule } = useSeedData();

  const [searchTerm, setSearchTerm] = useState('');

  // ============================================================
  // ADD CUSTOM RULE MODAL
  // ============================================================

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    rule: '',
    section: '',
    act: 'Legal Metrology Act, 2009'
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // ============================================================
  // CONFIGURE RULE MODAL
  // ============================================================

  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  // Store saved configuration for each rule
  const [ruleConfigurations, setRuleConfigurations] = useState({});

  const [configData, setConfigData] = useState({
    status: 'Active',
    requirement: '',
    validation: 'Presence',
    minimumFontSize: '10',
    readabilityCheck: true,
    ocrVerification: true
  });

  // ============================================================
  // VERIFY CUSTOM RULE
  // ============================================================

  const handleVerify = () => {
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  // ============================================================
  // ADD CUSTOM RULE
  // ============================================================

  const handleAddRule = (e) => {
    e.preventDefault();

    if (!isVerified) return;

    const newRule = {
      id: `CUST-${Math.floor(Math.random() * 1000)}`,
      rule: formData.rule,
      section: `${formData.section} of ${formData.act}`,
      status: 'Active'
    };

    addRule(newRule);

    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      rule: '',
      section: '',
      act: 'Legal Metrology Act, 2009'
    });

    setIsVerified(false);
    setIsVerifying(false);
  };

  // ============================================================
  // DEFAULT RULE CONFIGURATION
  // ============================================================

  const getRuleConfiguration = (rule) => {
    const name = rule.rule.toLowerCase();

    if (name.includes('manufacturer')) {
      return {
        requirement:
          'Manufacturer name and complete address must be declared on the package.',
        validation: 'Presence',
        minimumFontSize: '10'
      };
    }

    if (name.includes('generic')) {
      return {
        requirement:
          'Generic or common name of the commodity must be declared clearly.',
        validation: 'Presence',
        minimumFontSize: '10'
      };
    }

    if (name.includes('net quantity')) {
      return {
        requirement:
          'Net quantity of the commodity must be declared using the prescribed unit.',
        validation: 'Presence + Unit',
        minimumFontSize: '10'
      };
    }

    if (name.includes('month') || name.includes('year')) {
      return {
        requirement:
          'Month and year of manufacture, packing or import must be declared.',
        validation: 'Presence + Date Format',
        minimumFontSize: '10'
      };
    }

    if (name.includes('mrp')) {
      return {
        requirement:
          'Maximum Retail Price inclusive of all taxes must be declared on the package.',
        validation: 'Presence + MRP Format',
        minimumFontSize: '10'
      };
    }

    if (name.includes('consumer care')) {
      return {
        requirement:
          'Consumer care details including required contact information must be declared.',
        validation: 'Presence + Contact',
        minimumFontSize: '10'
      };
    }

    if (name.includes('veg') || name.includes('non-veg')) {
      return {
        requirement:
          'Applicable vegetarian or non-vegetarian declaration/logo must be displayed.',
        validation: 'Presence',
        minimumFontSize: '10'
      };
    }

    if (name.includes('nutritional')) {
      return {
        requirement:
          'Applicable nutritional information must be declared according to the relevant requirements.',
        validation: 'Presence + Format',
        minimumFontSize: '10'
      };
    }

    return {
      requirement:
        'The required declaration must be present, readable and clearly identifiable.',
      validation: 'Presence',
      minimumFontSize: '10'
    };
  };

  // ============================================================
  // OPEN CONFIGURE MODAL
  // ============================================================

  const handleConfigure = (rule) => {
    const defaults = getRuleConfiguration(rule);

    // Check whether this rule was already configured
    const savedConfig = ruleConfigurations[rule.id];

    setSelectedRule(rule);

    if (savedConfig) {
      setConfigData(savedConfig);
    } else {
      setConfigData({
        status: rule.status || 'Active',
        requirement: defaults.requirement,
        validation: defaults.validation,
        minimumFontSize: defaults.minimumFontSize,
        readabilityCheck: true,
        ocrVerification: true
      });
    }

    setShowConfigureModal(true);
  };

  // ============================================================
  // CLOSE CONFIGURE MODAL
  // ============================================================

  const closeConfigureModal = () => {
    setShowConfigureModal(false);
    setSelectedRule(null);
  };

  // ============================================================
  // SAVE CONFIGURATION
  // ============================================================

  const handleSaveConfiguration = () => {
    if (!selectedRule) return;

    setRuleConfigurations((prev) => ({
      ...prev,
      [selectedRule.id]: {
        ...configData
      }
    }));

    setShowConfigureModal(false);
    setSelectedRule(null);
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredRules = rules.filter(
    (r) =>
      r.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 relative">

      {/* ======================================================
          ADD CUSTOM RULE MODAL
      ======================================================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">

          <div className="w-full max-w-lg my-4">

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">

              {/* HEADER */}

              <div className="p-4 border-b border-border flex justify-between items-center">

                <div className="flex items-center gap-2">

                  <ShieldCheck className="text-green-600" />

                  <h2 className="text-xl font-bold text-primary">
                    Add Custom Rule
                  </h2>

                </div>

                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>

              </div>

              {/* BODY */}

              <form
                onSubmit={handleAddRule}
                className="p-6 space-y-4"
              >

                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 border border-blue-100">
                  All custom rules must be verified against the official
                  government act or scheme database before activation.
                </div>

                {/* RULE NAME */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rule/Amendment Name
                  </label>

                  <input
                    required
                    disabled={isVerified}
                    type="text"
                    value={formData.rule}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rule: e.target.value
                      })
                    }
                    placeholder="e.g. Revised MRP Guidelines"
                    className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50"
                  />

                </div>

                {/* ACT + SECTION */}

                <div className="grid grid-cols-2 gap-4">

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Act / Scheme
                    </label>

                    <select
                      disabled={isVerified}
                      value={formData.act}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          act: e.target.value
                        })
                      }
                      className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50"
                    >

                      <option>
                        Legal Metrology Act, 2009
                      </option>

                      <option>
                        FSSAI Act, 2006
                      </option>

                      <option>
                        BIS Act, 2016
                      </option>

                      <option>
                        Consumer Protection Act, 2019
                      </option>

                    </select>

                  </div>

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section / Clause
                    </label>

                    <input
                      required
                      disabled={isVerified}
                      type="text"
                      value={formData.section}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          section: e.target.value
                        })
                      }
                      placeholder="e.g. Rule 6(1)(e)"
                      className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent disabled:bg-gray-50"
                    />

                  </div>

                </div>

                {/* FOOTER */}

                <div className="pt-4 flex items-center justify-between border-t border-border">

                  {!isVerified ? (

                    <Button
                      type="button"
                      onClick={handleVerify}
                      disabled={
                        isVerifying ||
                        !formData.rule ||
                        !formData.section
                      }
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900"
                    >

                      {isVerifying ? (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <ShieldCheck size={16} />
                      )}

                      {isVerifying
                        ? 'Verifying with Govt DB...'
                        : 'Verify Rule'}

                    </Button>

                  ) : (

                    <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-3 py-2 rounded-lg border border-green-200">

                      <CheckCircle2 size={18} />

                      Verified Officially

                    </div>

                  )}

                  <div className="flex gap-3">

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      disabled={!isVerified}
                      className="disabled:opacity-50"
                    >
                      Add Rule
                    </Button>

                  </div>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}

      {/* ======================================================
          CONFIGURE RULE MODAL
      ======================================================= */}

      {showConfigureModal && selectedRule && (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">

          {/* CENTER CONTAINER */}

          <div className="min-h-full flex items-center justify-center">

            {/* MODAL */}

            <div className="bg-white w-full max-w-2xl max-h-[calc(100vh-2rem)] rounded-2xl shadow-2xl border border-border flex flex-col">

              {/* ==================================================
                  HEADER - ALWAYS VISIBLE
              ================================================== */}

              <div className="p-5 border-b border-border flex justify-between items-center shrink-0 bg-white">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">

                    <Settings2
                      size={21}
                      className="text-accent"
                    />

                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-primary">
                      Configure Rule
                    </h2>

                    <p className="text-sm text-gray-500">
                      Configure validation parameters
                    </p>

                  </div>

                </div>

                <button
                  onClick={closeConfigureModal}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={22} />
                </button>

              </div>

              {/* ==================================================
                  SCROLLABLE BODY
              ================================================== */}

              <div className="p-6 space-y-5 overflow-y-auto flex-1">

                {/* RULE INFORMATION */}

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">

                  <div className="flex justify-between items-start gap-4">

                    <div>

                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                        Rule
                      </p>

                      <h3 className="font-bold text-primary text-lg">
                        {selectedRule.rule}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {selectedRule.section}
                      </p>

                    </div>

                    <span className="font-mono text-xs bg-white border border-gray-200 px-2 py-1 rounded">
                      {selectedRule.id}
                    </span>

                  </div>

                </div>

                {/* ==================================================
                    RULE STATUS
                ================================================== */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rule Status
                  </label>

                  <div className="grid grid-cols-2 gap-4">

                    {/* ACTIVE */}

                    <button
                      type="button"
                      onClick={() =>
                        setConfigData((prev) => ({
                          ...prev,
                          status: 'Active'
                        }))
                      }
                      className={`py-3 rounded-lg border font-medium transition-all ${
                        configData.status === 'Active'
                          ? 'bg-green-50 border-green-400 text-green-700 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-green-300'
                      }`}
                    >

                      <CheckCircle2
                        size={17}
                        className="inline mr-2"
                      />

                      Active

                    </button>

                    {/* INACTIVE */}

                    <button
                      type="button"
                      onClick={() =>
                        setConfigData((prev) => ({
                          ...prev,
                          status: 'Inactive'
                        }))
                      }
                      className={`py-3 rounded-lg border font-medium transition-all ${
                        configData.status === 'Inactive'
                          ? 'bg-red-50 border-red-400 text-red-700 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-red-300'
                      }`}
                    >

                      <X
                        size={17}
                        className="inline mr-2"
                      />

                      Inactive

                    </button>

                  </div>

                </div>

                {/* ==================================================
                    COMPLIANCE REQUIREMENT
                ================================================== */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Compliance Requirement
                  </label>

                  <textarea
                    rows={4}
                    value={configData.requirement}
                    onChange={(e) =>
                      setConfigData((prev) => ({
                        ...prev,
                        requirement: e.target.value
                      }))
                    }
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent resize-none"
                  />

                </div>

                {/* ==================================================
                    VALIDATION + FONT SIZE
                ================================================== */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* VALIDATION */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Validation Type
                    </label>

                    <select
                      value={configData.validation}
                      onChange={(e) =>
                        setConfigData((prev) => ({
                          ...prev,
                          validation: e.target.value
                        }))
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                    >

                      <option>
                        Presence
                      </option>

                      <option>
                        Presence + Unit
                      </option>

                      <option>
                        Presence + Contact
                      </option>

                      <option>
                        Presence + MRP Format
                      </option>

                      <option>
                        Presence + Date Format
                      </option>

                      <option>
                        Presence + Format
                      </option>

                    </select>

                  </div>

                  {/* FONT SIZE */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minimum Font Size
                    </label>

                    <div className="relative">

                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={configData.minimumFontSize}
                        onChange={(e) =>
                          setConfigData((prev) => ({
                            ...prev,
                            minimumFontSize: e.target.value
                          }))
                        }
                        className="w-full p-2.5 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                      />

                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        pt
                      </span>

                    </div>

                  </div>

                </div>

                {/* ==================================================
                    AUTOMATED CHECKS
                ================================================== */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Automated Checks
                  </label>

                  <div className="space-y-2">

                    {/* READABILITY */}

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-100 transition">

                      <div>

                        <p className="text-sm font-medium text-gray-700">
                          Readability Check
                        </p>

                        <p className="text-xs text-gray-500">
                          Verify that declaration text is readable.
                        </p>

                      </div>

                      <input
                        type="checkbox"
                        checked={configData.readabilityCheck}
                        onChange={(e) =>
                          setConfigData((prev) => ({
                            ...prev,
                            readabilityCheck: e.target.checked
                          }))
                        }
                        className="w-5 h-5 accent-green-600"
                      />

                    </label>

                    {/* OCR */}

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-100 transition">

                      <div>

                        <p className="text-sm font-medium text-gray-700">
                          OCR Verification
                        </p>

                        <p className="text-xs text-gray-500">
                          Verify the declaration using OCR extraction.
                        </p>

                      </div>

                      <input
                        type="checkbox"
                        checked={configData.ocrVerification}
                        onChange={(e) =>
                          setConfigData((prev) => ({
                            ...prev,
                            ocrVerification: e.target.checked
                          }))
                        }
                        className="w-5 h-5 accent-green-600"
                      />

                    </label>

                  </div>

                </div>

                {/* EXTRA SPACE FOR SCROLLING */}

                <div className="h-2" />

              </div>

              {/* ==================================================
                  FOOTER - ALWAYS VISIBLE
              ================================================== */}

              <div className="px-6 py-4 border-t border-border bg-gray-50 flex justify-end gap-3 shrink-0">

                <Button
                  type="button"
                  variant="outline"
                  onClick={closeConfigureModal}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={handleSaveConfiguration}
                  className="flex items-center gap-2"
                >

                  <ShieldCheck size={16} />

                  Save Changes

                </Button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ======================================================
          PAGE HEADER
      ======================================================= */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Rule Engine
          </h1>

          <p className="text-gray-500 mt-1">
            Manage validation rules and compliance standards.
          </p>

        </div>

        <div className="flex gap-4">

          {/* SEARCH */}

          <div className="relative">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            />

          </div>

          {/* ADD CUSTOM RULE */}

          <Button onClick={() => setShowModal(true)}>
            Add Custom Rule
          </Button>

        </div>

      </div>

      {/* ======================================================
          RULE CARDS
      ======================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {filteredRules.map((item, idx) => {

          const currentStatus =
            ruleConfigurations[item.id]?.status ||
            item.status ||
            'Active';

          return (

            <Card key={item.id || idx}>

              <div className="flex items-start gap-4">

                {/* ICON */}

                <div className="mt-1 text-accent">

                  <BookOpen size={24} />

                </div>

                <div className="flex-1">

                  {/* TITLE + STATUS */}

                  <div className="flex justify-between items-start mb-2 gap-3">

                    <h3 className="font-bold text-primary">
                      {item.rule}
                    </h3>

                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap ${
                        currentStatus === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >

                      {currentStatus === 'Active' ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <X size={12} />
                      )}

                      {currentStatus}

                    </span>

                  </div>

                  {/* SECTION */}

                  <p className="text-sm text-gray-500 mb-3">
                    {item.section}
                  </p>

                  {/* CARD FOOTER */}

                  <div className="flex justify-between items-center text-xs">

                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {item.id}
                    </span>

                    <Button
                      variant="outline"
                      className="text-xs py-1"
                      onClick={() => handleConfigure(item)}
                    >
                      Configure
                    </Button>

                  </div>

                </div>

              </div>

            </Card>

          );
        })}

        {filteredRules.length === 0 && (
          <p className="text-gray-500">
            No rules found.
          </p>
        )}

      </div>

    </div>
  );
};

export default Rules;