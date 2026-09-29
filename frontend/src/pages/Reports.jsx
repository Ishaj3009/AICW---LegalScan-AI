// import React, { useEffect, useState } from 'react';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import { FileText, Download, Calendar, X, Settings2, Image as ImageIcon } from 'lucide-react';
// import { reportsAPI, inspectionsAPI } from '../services/api';

// const Reports = () => {
//   const [reports, setReports] = useState([]);
//   const [inspections, setInspections] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({ 
//     name: 'Compliance Report', 
//     template: 'Detailed', 
//     format: 'TXT', 
//     urgency: 'Normal', 
//     topic: 'All Activity',
//     addressedTo: '',
//     companyDetails: '',
//     customContent: ''
//   });

//   useEffect(() => {
//   loadReports();
//   loadInspections();
// }, []);

// const loadInspections = async () => {
//   try {
//     const response = await inspectionsAPI.getAll({
//       limit: 100,
//       sort: '-createdAt'
//     });

//     if (response.data?.success) {
//       setInspections(response.data.data || []);
//     }
//   } catch (error) {
//     console.error('❌ Failed to load inspections:', error);
//   }
// };

// const loadReports = async () => {
//   try {
//     const response = await reportsAPI.getAll();

//     if (response.data?.success) {
//       setReports(response.data.data || []);
//     }
//   } catch (error) {
//     console.error('❌ Failed to load reports:', error);
//   }
// };

//   const handleGenerateReport =async (e) => {
//     e.preventDefault();
//     if (!formData.name) return;
    
//     const newReport = {
//       id: `RPT-${Math.floor(Math.random() * 10000)}`,
//       name: formData.name,
//       date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
//       type: formData.template,
//       format: formData.format,
//       topic: formData.topic,
//       urgency: formData.urgency,
//       addressedTo: formData.addressedTo,
//       companyDetails: formData.companyDetails,
//       customContent: formData.customContent,
//       size: '1.2 MB' // Mock size
//     };
//     try {
//   // Report generation requires an inspection ID.
//   // For now, use the latest available inspection from the backend.
//   const response = await reportsAPI.getAll();

//   if (!response.data?.success) {
//     throw new Error('Unable to load inspections for report generation.');
//   }

//   const existingReports = response.data.data || [];

//   if (existingReports.length === 0) {
//     alert('Please complete at least one inspection before generating a report.');
//     return;
//   }

//   const inspectionId =
//     existingReports[0].inspectionId?._id ||
//     existingReports[0].inspectionId;

//   if (!inspectionId) {
//     alert('No valid inspection is available for report generation.');
//     return;
//   }

//   const generatedResponse =
//     await reportsAPI.generate(inspectionId);

//   if (!generatedResponse.data?.success) {
//     throw new Error(
//       generatedResponse.data?.message ||
//       'Failed to generate report.'
//     );
//   }

//   await loadReports();

//   setShowModal(false);

//   setFormData({
//     name: 'Compliance Report',
//     template: 'Detailed',
//     format: 'TXT',
//     urgency: 'Normal',
//     topic: 'All Activity',
//     addressedTo: '',
//     companyDetails: '',
//     customContent: ''
//   });

// } catch (error) {
//   console.error('❌ Report generation failed:', error);

//   alert(
//     error.response?.data?.message ||
//     error.message ||
//     'Failed to generate report.'
//   );
// }
//     setShowModal(false);
//   };

//   const handleDownload = (report) => {
//     const inspections = getInspectionsWithDetails();
//     const violations = getViolationsWithDetails();
    
//     let content = '';
//     const isCSV = report.format === 'CSV';

//     if (isCSV) {
//       content += `Report Name,${report.name}\nDate,${report.date}\nTopic,${report.topic}\nAddressed To,${report.addressedTo || 'N/A'}\nCompany Details,${report.companyDetails || 'N/A'}\n\n`;
//       content += `ID,Product,Status,Manufacturer\n`;
//       inspections.forEach(i => {
//         content += `${i.id},${i.productName},${i.status},${i.manufacturerName}\n`;
//       });
//       content += `\nRule,Severity,Product,Detected\n`;
//       violations.forEach(v => {
//         content += `${v.ruleDetails?.rule || v.ruleId},${v.severity},${v.productName},${v.detectedValue}\n`;
//       });
//     } else {
//       content += `======================================\n`;
//       content += `        ${report.name.toUpperCase()}\n`;
//       content += `        Date: ${report.date}\n`;
//       content += `======================================\n\n`;

//       if (report.addressedTo) content += `To: ${report.addressedTo}\n`;
//       if (report.companyDetails) content += `Company/Subject: ${report.companyDetails}\n`;
      
//       content += `Topic: ${report.topic}\n`;
//       content += `Urgency: ${report.urgency}\n\n`;

//       if (report.customContent) {
//         content += `MESSAGE / CONTENT\n`;
//         content += `-----------------\n`;
//         content += `${report.customContent}\n\n`;
//       }
      
//       content += `SUMMARY STATISTICS\n`;
//       content += `------------------\n`;
//       content += `Total Inspections: ${inspections.length}\n`;
//       content += `Total Violations: ${violations.length}\n\n`;
      
//       if (report.type === 'Detailed') {
//         content += `RECENT INSPECTIONS\n`;
//         content += `------------------\n`;
//         inspections.forEach(i => {
//           content += `ID: ${i.id} | Product: ${i.productName} | Status: ${i.status}\n`;
//         });
        
//         content += `\nACTIVE VIOLATIONS\n`;
//         content += `-----------------\n`;
//         violations.forEach(v => {
//           content += `Rule: ${v.ruleDetails?.rule || v.ruleId} | Severity: ${v.severity} | Product: ${v.productName}\n`;
//           content += `Expected: ${v.expectedValue} | Detected: ${v.detectedValue}\n\n`;
//         });
//       } else {
//         content += `(Standard Template - Detail section omitted for brevity)\n`;
//       }
//     }
    
//     const blob = new Blob([content], { type: isCSV ? 'text/csv' : 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${report.name.replace(/\s+/g, '_')}.${isCSV ? 'csv' : 'txt'}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="space-y-8 max-w-6xl mx-auto p-4 relative">
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto pt-10 pb-10">
//           <div className="bg-bg-base w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-border my-auto">
//             <div className="p-4 border-b border-border flex justify-between items-center bg-white sticky top-0 z-10">
//               <div className="flex items-center gap-2">
//                 <Settings2 className="text-accent" />
//                 <h2 className="text-xl font-editorial font-bold text-primary">Report Configuration</h2>
//               </div>
//               <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500 transition-colors"><X size={20}/></button>
//             </div>
//             <form onSubmit={handleGenerateReport} className="p-6 space-y-5 bg-white">
              
//               <div className="grid grid-cols-2 gap-4 border-b border-border pb-5">
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
//                   <input required type="text" className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent bg-gray-50" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Addressed To</label>
//                   <input type="text" placeholder="e.g. Chief Inspector, Dept of Consumer Affairs" className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent" value={formData.addressedTo} onChange={e => setFormData({...formData, addressedTo: e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Company / Target Details</label>
//                   <input type="text" placeholder="e.g. Acme Corp (FSSAI-12345)" className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent" value={formData.companyDetails} onChange={e => setFormData({...formData, companyDetails: e.target.value})} />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
//                   <select className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent" value={formData.template} onChange={e => setFormData({...formData, template: e.target.value})}>
//                     <option>Detailed</option>
//                     <option>Standard Summary</option>
//                     <option>Executive Brief</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Output Format</label>
//                   <select className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent" value={formData.format} onChange={e => setFormData({...formData, format: e.target.value})}>
//                     <option>TXT</option>
//                     <option>CSV</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Focus</label>
//                   <select className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})}>
//                     <option>All Activity</option>
//                     <option>Violations Only</option>
//                     <option>Compliant Only</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
//                   <select className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent" value={formData.urgency} onChange={e => setFormData({...formData, urgency: e.target.value})}>
//                     <option>Normal</option>
//                     <option>High (Immediate Review)</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="pt-2 border-t border-border mt-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">Custom Content / Remarks</label>
//                 <textarea rows={3} placeholder="Add any specific observations or official remarks here..." className="w-full p-2 border border-border rounded-lg focus:outline-none focus:border-accent resize-none" value={formData.customContent} onChange={e => setFormData({...formData, customContent: e.target.value})}></textarea>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Attach Supporting Images (Optional)</label>
//                 <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center gap-2">
//                   <ImageIcon className="text-gray-400" size={24} />
//                   <span className="text-sm text-gray-500">Select files to embed in report</span>
//                   <input type="file" multiple className="hidden" />
//                 </div>
//               </div>

//               <div className="pt-4 flex justify-end gap-3 border-t border-border mt-4">
//                 <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
//                 <Button type="submit">Formulate & Generate</Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-primary">Reports</h1>
//           <p className="text-gray-500 mt-1">Generate and download official compliance reports.</p>
//         </div>
//         <Button onClick={() => setShowModal(true)}>Generate New Report</Button>
//       </div>

//       <Card>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-border text-sm text-gray-500">
//                 <th className="py-3 px-4 font-medium">Report Name</th>
//                 <th className="py-3 px-4 font-medium">Period</th>
//                 <th className="py-3 px-4 font-medium">Type</th>
//                 <th className="py-3 px-4 font-medium">Size</th>
//                 <th className="py-3 px-4 font-medium">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reports.map((item, idx) => (
//                 <tr key={idx} className="border-b border-border/50 hover:bg-bg-soft transition-colors">
//                   <td className="py-3 px-4">
//                     <div className="flex items-center gap-3">
//                       <FileText size={18} className="text-accent" />
//                       <span className="font-medium text-primary">{item.name}</span>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4 text-gray-600">
//                     <div className="flex items-center gap-2">
//                       <Calendar size={14} className="text-gray-400" />
//                       {item.date}
//                     </div>
//                   </td>
//                   <td className="py-3 px-4">
//                     <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
//                       {item.type}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-500">{item.size}</td>
//                   <td className="py-3 px-4">
//                     <Button variant="outline" className="text-xs py-1 flex items-center gap-2" onClick={() => handleDownload(item)}>
//                       <Download size={14} /> Download
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {reports.length === 0 && <div className="p-4 text-center text-gray-500">No reports found.</div>}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Reports;



import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

import {
  FileText,
  Download,
  Calendar,
  Loader2,
  RefreshCw,
  FilePlus2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

import {
  reportsAPI,
  inspectionsAPI
} from '../services/api';

const BACKEND_URL = 'http://localhost:5000';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [latestInspection, setLatestInspection] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // ==========================================================
  // LOAD REPORTS
  // ==========================================================

  const loadReports = async () => {
    try {
      setError('');

      console.log('========================================');
      console.log('📄 LOADING REPORTS');
      console.log('========================================');

      const response = await reportsAPI.getAll();

      console.log('✅ Reports API response:', response?.data);

      if (response?.data?.success) {
        const reportData = response.data.data || [];

        console.log(
          '📊 Reports received:',
          reportData.length
        );

        setReports(
          Array.isArray(reportData)
            ? reportData
            : []
        );
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error(
        '❌ Failed to load reports:',
        err?.response?.data || err
      );

      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to load reports.'
      );

      setReports([]);
    }
  };

  // ==========================================================
  // LOAD LATEST INSPECTION
  // ==========================================================

  const loadLatestInspection = async () => {
    try {
      console.log('========================================');
      console.log('🔍 LOADING LATEST INSPECTION');
      console.log('========================================');

      const response = await inspectionsAPI.getAll({
        limit: 100,
        sort: '-createdAt'
      });

      console.log(
        '✅ Inspections API response:',
        response?.data
      );

      if (!response?.data?.success) {
        setLatestInspection(null);
        return;
      }

      const inspectionList =
        response.data.data || [];

      console.log(
        '📊 Inspections received:',
        inspectionList.length
      );

      if (
        Array.isArray(inspectionList) &&
        inspectionList.length > 0
      ) {
        const latest = inspectionList[0];

        console.log(
          '🆕 Latest inspection:',
          latest?.inspectionId
        );

        setLatestInspection(latest);
      } else {
        console.log(
          'ℹ️ No inspections found.'
        );

        setLatestInspection(null);
      }
    } catch (err) {
      console.error(
        '❌ Failed to load inspections:',
        err?.response?.data || err
      );

      setLatestInspection(null);
    }
  };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);

      await Promise.all([
        loadReports(),
        loadLatestInspection()
      ]);

      setIsLoading(false);
    };

    initialize();
  }, []);

  // ==========================================================
  // GENERATE NEW REPORT
  // ==========================================================

  const handleGenerateReport = async () => {
    try {
      setError('');
      setMessage('');
      setIsGenerating(true);

      console.log('========================================');
      console.log('📄 GENERATING NEW REPORT');
      console.log('========================================');

      // ------------------------------------------------------
      // GET FRESH INSPECTION LIST
      // ------------------------------------------------------

      const inspectionResponse =
        await inspectionsAPI.getAll({
          limit: 100,
          sort: '-createdAt'
        });

      console.log(
        '🔍 Inspection response:',
        inspectionResponse?.data
      );

      if (
        !inspectionResponse?.data?.success
      ) {
        throw new Error(
          'Unable to load inspections.'
        );
      }

      const inspectionList =
        inspectionResponse.data.data || [];

      // ------------------------------------------------------
      // CHECK INSPECTIONS
      // ------------------------------------------------------

      if (
        !Array.isArray(inspectionList) ||
        inspectionList.length === 0
      ) {
        throw new Error(
          'No inspection is available. Please create and analyze an inspection first.'
        );
      }

      // ------------------------------------------------------
      // SELECT LATEST INSPECTION
      // ------------------------------------------------------

      const inspection =
        inspectionList[0];

      const inspectionNumber =
        inspection?.inspectionId;

      console.log(
        '🆕 Selected latest inspection:',
        inspectionNumber
      );

      // ------------------------------------------------------
      // VALIDATE INSPECTION ID
      // ------------------------------------------------------

      if (!inspectionNumber) {
        throw new Error(
          'Latest inspection does not have a valid inspection ID.'
        );
      }

      // ------------------------------------------------------
      // GENERATE REPORT
      //
      // Backend expects:
      //
      // POST /api/reports/:inspectionId/generate
      //
      // ------------------------------------------------------

      console.log(
        '📄 Calling:',
        `/api/reports/${inspectionNumber}/generate`
      );

      const generatedResponse =
        await reportsAPI.generate(
          inspectionNumber
        );

      console.log(
        '✅ Generate response:',
        generatedResponse?.data
      );

      if (
        !generatedResponse?.data?.success
      ) {
        throw new Error(
          generatedResponse?.data?.message ||
          'Failed to generate report.'
        );
      }

      const generatedReport =
        generatedResponse?.data?.data;

      console.log(
        '📄 Generated report:',
        generatedReport
      );

      // ------------------------------------------------------
      // SUCCESS MESSAGE
      // ------------------------------------------------------

      setMessage(
        `Report ${
          generatedReport?.reportId || ''
        } generated successfully for ${
          inspectionNumber
        }.`
      );

      // ------------------------------------------------------
      // REFRESH REPORT LIST
      // ------------------------------------------------------

      await loadReports();
      await loadLatestInspection();

    } catch (err) {
      console.error(
        '❌ REPORT GENERATION FAILED'
      );

      console.error(
        err?.response?.data || err
      );

      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to generate report.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // ==========================================================
  // DOWNLOAD / OPEN PDF
  // ==========================================================

  const handleDownload = (report) => {
    try {
      setError('');

      console.log('========================================');
      console.log('📥 DOWNLOADING REPORT');
      console.log('========================================');

      console.log(
        'Report object:',
        report
      );

      // ------------------------------------------------------
      // GET PDF URL FROM DATABASE
      // ------------------------------------------------------

      let pdfUrl =
        report?.pdfUrl;

      // ------------------------------------------------------
      // FALLBACK TO PDF FILE NAME
      // ------------------------------------------------------

      if (
        !pdfUrl &&
        report?.pdfFileName
      ) {
        pdfUrl =
          `/reports/${report.pdfFileName}`;
      }

      // ------------------------------------------------------
      // NO PDF
      // ------------------------------------------------------

      if (!pdfUrl) {
        setError(
          'PDF file is not available for this report.'
        );

        return;
      }

      // ------------------------------------------------------
      // BUILD FULL BACKEND URL
      // ------------------------------------------------------

      const fullPdfUrl =
        pdfUrl.startsWith('http')
          ? pdfUrl
          : `${BACKEND_URL}${pdfUrl}`;

      console.log(
        '📄 PDF URL:',
        fullPdfUrl
      );

      // ------------------------------------------------------
      // OPEN PDF
      // ------------------------------------------------------

      window.open(
        fullPdfUrl,
        '_blank',
        'noopener,noreferrer'
      );

    } catch (err) {
      console.error(
        '❌ PDF download/open failed:',
        err
      );

      setError(
        'Unable to open PDF report.'
      );
    }
  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) {
      return '-';
    }

    try {
      return new Date(date).toLocaleString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
      );
    } catch {
      return '-';
    }
  };

  // ==========================================================
  // STATUS BADGE
  // ==========================================================

  const renderStatus = (status) => {
    if (
      status === 'COMPLIANT'
    ) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
          <CheckCircle2 size={12} />
          Compliant
        </span>
      );
    }

    if (
      status === 'POTENTIAL_VIOLATION'
    ) {
      return (
        <span className="inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-700">
          Potential Violation
        </span>
      );
    }

    return (
      <span className="inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
        Review Required
      </span>
    );
  };

  // ==========================================================
  // LOADING SCREEN
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
            Loading reports...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Reports
          </h1>

          <p className="text-gray-500 mt-1">
            Generate and download official compliance reports.
          </p>
        </div>

        <Button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2
                size={16}
                className="animate-spin"
              />

              Generating...
            </>
          ) : (
            <>
              <FilePlus2 size={16} />

              Generate New Report
            </>
          )}
        </Button>

      </div>


      {/* ======================================================
          LATEST INSPECTION
      ====================================================== */}

      {latestInspection && (
        <Card>
          <div className="p-4 flex items-center gap-4">

            <div className="p-3 rounded-lg bg-orange-50">
              <FileText
                size={22}
                className="text-accent"
              />
            </div>

            <div>

              <p className="text-xs text-gray-500">
                Latest Inspection
              </p>

              <p className="font-semibold text-primary">
                {latestInspection.inspectionId}
              </p>

              {latestInspection.commodityName && (
                <p className="text-sm text-gray-500">
                  {latestInspection.commodityName}
                </p>
              )}

            </div>

          </div>
        </Card>
      )}


      {/* ======================================================
          SUCCESS MESSAGE
      ====================================================== */}

      {message && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

          <CheckCircle2 size={18} />

          <span>
            {message}
          </span>

        </div>
      )}


      {/* ======================================================
          ERROR MESSAGE
      ====================================================== */}

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

          <AlertCircle
            size={18}
            className="mt-0.5 flex-shrink-0"
          />

          <div className="flex-1">

            <p className="font-semibold">
              Report Error
            </p>

            <p className="mt-1">
              {error}
            </p>

          </div>

          <button
            type="button"
            onClick={() => setError('')}
            className="text-red-500 hover:text-red-700 text-lg"
          >
            ×
          </button>

        </div>
      )}


      {/* ======================================================
          REPORT TABLE
      ====================================================== */}

      <Card>

        <div className="overflow-x-auto">

          <table className="w-full text-left border-collapse">

            <thead>

              <tr className="border-b border-border text-sm text-gray-500">

                <th className="py-4 px-4 font-medium">
                  Report
                </th>

                <th className="py-4 px-4 font-medium">
                  Inspection
                </th>

                <th className="py-4 px-4 font-medium">
                  Generated
                </th>

                <th className="py-4 px-4 font-medium">
                  Type
                </th>

                <th className="py-4 px-4 font-medium">
                  Status
                </th>

                <th className="py-4 px-4 font-medium">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {reports.map((report) => {

                const inspectionNumber =
                  report?.inspectionNumber ||
                  report?.inspectionId?.inspectionId ||
                  '-';

                return (
                  <tr
                    key={
                      report?._id ||
                      report?.reportId
                    }
                    className="border-b border-border/50 hover:bg-bg-soft transition-colors"
                  >

                    {/* REPORT */}

                    <td className="py-4 px-4">

                      <div className="flex items-center gap-3">

                        <div className="p-2 rounded-lg bg-orange-50">
                          <FileText
                            size={18}
                            className="text-accent"
                          />
                        </div>

                        <div>

                          <p className="font-semibold text-primary">
                            {report?.reportId ||
                              'Inspection Report'}
                          </p>

                          {report?.pdfFileName && (
                            <p className="text-xs text-gray-400 mt-1">
                              {report.pdfFileName}
                            </p>
                          )}

                        </div>

                      </div>

                    </td>


                    {/* INSPECTION */}

                    <td className="py-4 px-4">

                      <span className="font-medium text-gray-700">
                        {inspectionNumber}
                      </span>

                    </td>


                    {/* GENERATED */}

                    <td className="py-4 px-4 text-sm text-gray-600">

                      <div className="flex items-center gap-2">

                        <Calendar
                          size={14}
                          className="text-gray-400"
                        />

                        {formatDate(
                          report?.generatedAt ||
                          report?.createdAt
                        )}

                      </div>

                    </td>


                    {/* TYPE */}

                    <td className="py-4 px-4">

                      <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">

                        {report?.reportType ||
                          'INSPECTION'}

                      </span>

                    </td>


                    {/* STATUS */}

                    <td className="py-4 px-4">

                      {renderStatus(
                        report?.complianceStatus
                      )}

                    </td>


                    {/* DOWNLOAD */}

                    <td className="py-4 px-4">

                      <Button
                        variant="outline"
                        className="text-xs py-1 flex items-center gap-2"
                        onClick={() =>
                          handleDownload(report)
                        }
                      >

                        <Download size={14} />

                        Download

                      </Button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>


          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {reports.length === 0 && (
            <div className="p-12 text-center">

              <FileText
                size={42}
                className="mx-auto text-gray-300"
              />

              <p className="mt-4 font-medium text-gray-600">
                No reports generated yet
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Create and analyze an inspection first, then generate a report.
              </p>

            </div>
          )}

        </div>

      </Card>


      {/* ======================================================
          REFRESH
      ====================================================== */}

      <div className="flex justify-end">

        <Button
          variant="outline"
          onClick={async () => {

            setError('');
            setMessage('');

            setIsLoading(true);

            await Promise.all([
              loadReports(),
              loadLatestInspection()
            ]);

            setIsLoading(false);

          }}
          className="flex items-center gap-2"
        >

          <RefreshCw size={15} />

          Refresh Reports

        </Button>

      </div>

    </div>
  );
};

export default Reports;