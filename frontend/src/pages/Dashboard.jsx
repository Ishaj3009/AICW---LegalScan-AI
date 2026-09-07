// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Activity, AlertTriangle, CheckCircle, Clock, ShieldCheck, Database, Cpu, Search } from 'lucide-react';
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// // import { MOCK_DASHBOARD_STATS, MOCK_RECENT_INSPECTIONS, MOCK_CHART_DATA } from '../services/mockData';

// // const MetricCard = ({ title, value, icon: Icon, colorClass, subtitle }) => (
// //   <div className="bg-bg-card rounded-2xl p-6 shadow-soft border border-border">
// //     <div className="flex justify-between items-start">
// //       <div>
// //         <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
// //         <h3 className="text-3xl font-bold font-editorial text-primary">{value}</h3>
// //         {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
// //       </div>
// //       <div className={`p-3 rounded-xl ${colorClass}`}>
// //         <Icon size={24} />
// //       </div>
// //     </div>
// //   </div>
// // );

// // const Dashboard = () => {
// //   const navigate = useNavigate();
// //   const [stats, setStats] = useState(MOCK_DASHBOARD_STATS);
// //   const [inspections, setInspections] = useState(MOCK_RECENT_INSPECTIONS);

// //   return (
// //     <div className="space-y-8 max-w-7xl mx-auto">
      
// //       {/* Metrics Row */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         <MetricCard 
// //           title="Total Inspections" 
// //           value={stats.totalInspections.toLocaleString()} 
// //           icon={Activity} 
// //           colorClass="bg-gray-100 text-gray-700"
// //           subtitle="+12% from last month"
// //         />
// //         <MetricCard 
// //           title="Compliant" 
// //           value={stats.compliantCount.toLocaleString()} 
// //           icon={CheckCircle} 
// //           colorClass="bg-green-50 text-green-600"
// //           subtitle="89.9% compliance rate"
// //         />
// //         <MetricCard 
// //           title="Potential Violations" 
// //           value={stats.potentialViolationsCount.toLocaleString()} 
// //           icon={AlertTriangle} 
// //           colorClass="bg-red-50 text-red-500"
// //           subtitle="Requires officer review"
// //         />
// //         <MetricCard 
// //           title="Pending Review" 
// //           value={stats.pendingReviewsCount.toLocaleString()} 
// //           icon={Clock} 
// //           colorClass="bg-orange-50 text-accent"
// //           subtitle="In processing queue"
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
// //         {/* Main Chart */}
// //         <div className="lg:col-span-2 bg-bg-card rounded-2xl shadow-soft border border-border p-6">
// //           <div className="flex justify-between items-center mb-6">
// //             <h3 className="text-lg font-bold font-editorial">Weekly Enforcement Trends</h3>
// //             <select className="bg-bg-soft border-none text-sm font-medium rounded-lg px-3 py-1.5 focus:ring-0">
// //               <option>Last 7 Days</option>
// //               <option>Last 30 Days</option>
// //             </select>
// //           </div>
// //           <div className="h-72">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <BarChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
// //                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
// //                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
// //                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
// //                 <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)' }} />
// //                 <Bar dataKey="compliant" name="Compliant" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={32} />
// //                 <Bar dataKey="violations" name="Violations" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={32} />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* AI System Status */}
// //         <div className="bg-bg-card rounded-2xl shadow-soft border border-border p-6 flex flex-col">
// //           <h3 className="text-lg font-bold font-editorial mb-6">System Status</h3>
// //           <div className="space-y-5 flex-1">
            
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-3">
// //                 <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Cpu size={18} /></div>
// //                 <div>
// //                   <p className="text-sm font-medium">CNN Vision Model</p>
// //                   <p className="text-xs text-gray-500">v2.4.1 (MobileNetV2)</p>
// //                 </div>
// //               </div>
// //               <span className="flex h-2.5 w-2.5 rounded-full bg-success"></span>
// //             </div>
            
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-3">
// //                 <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Search size={18} /></div>
// //                 <div>
// //                   <p className="text-sm font-medium">OCR Extraction</p>
// //                   <p className="text-xs text-gray-500">EasyOCR Engine</p>
// //                 </div>
// //               </div>
// //               <span className="flex h-2.5 w-2.5 rounded-full bg-success"></span>
// //             </div>

// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-3">
// //                 <div className="p-2 bg-amber-50 text-accent rounded-lg"><Database size={18} /></div>
// //                 <div>
// //                   <p className="text-sm font-medium">Rule Engine</p>
// //                   <p className="text-xs text-gray-500">2011 Metrology Act Rules</p>
// //                 </div>
// //               </div>
// //               <span className="flex h-2.5 w-2.5 rounded-full bg-success"></span>
// //             </div>

// //           </div>
          
// //           <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs text-gray-500">
// //             <ShieldCheck size={14} className="text-success" />
// //             All systems operational. Last sync: 2 mins ago.
// //           </div>
// //         </div>

// //       </div>

// //       {/* Recent Inspections Table */}
// //       <div className="bg-bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
// //         <div className="px-6 py-5 border-b border-border flex justify-between items-center">
// //           <h3 className="text-lg font-bold font-editorial">Recent Inspections</h3>
// //           <button onClick={() => navigate('/history')} className="text-sm font-medium text-accent hover:text-accent-hover transition-colors">View All</button>
// //         </div>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-left text-sm">
// //             <thead className="bg-bg-soft text-gray-500">
// //               <tr>
// //                 <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">ID</th>
// //                 <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Product</th>
// //                 <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Date</th>
// //                 <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">Status</th>
// //                 <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">AI Confidence</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-border">
// //               {inspections.map((insp) => (
// //                 <tr key={insp._id} onClick={() => navigate(`/results/${insp._id}`)} className="hover:bg-gray-50 cursor-pointer transition-colors">
// //                   <td className="px-6 py-4 font-semibold text-primary">{insp.inspectionId}</td>
// //                   <td className="px-6 py-4">
// //                     <p className="font-medium">{insp.productId.productName}</p>
// //                     <p className="text-xs text-gray-500">{insp.productId.manufacturer}</p>
// //                   </td>
// //                   <td className="px-6 py-4 text-gray-600">{new Date(insp.inspectionDate).toLocaleDateString()}</td>
// //                   <td className="px-6 py-4">
// //                     <span className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide uppercase ${
// //                       insp.complianceStatus === 'COMPLIANT' ? 'bg-green-100 text-green-700' :
// //                       insp.complianceStatus === 'NON_COMPLIANT' ? 'bg-red-100 text-red-700' :
// //                       'bg-orange-100 text-orange-700'
// //                     }`}>
// //                       {insp.complianceStatus.replace('_', ' ')}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-full max-w-[80px] h-2 bg-gray-200 rounded-full overflow-hidden">
// //                         <div className="h-full bg-primary" style={{ width: `${insp.overallConfidence}%` }}></div>
// //                       </div>
// //                       <span className="font-medium">{insp.overallConfidence}%</span>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //     </div>
// //   );
// // };

// // export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import { analyticsAPI, inspectionsAPI } from '../services/api';
// import { useNavigate } from 'react-router-dom';
// import {
//   Activity,
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   ShieldCheck,
//   Database,
//   Cpu,
//   Search,
//   RefreshCw,
//   Wifi,
//   WifiOff
// } from 'lucide-react';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts';


// /* =========================================================
//    CONFIGURATION
// ========================================================= */

// // const API_URL = 'http://localhost:8000';

// // const WS_URL =
// //   window.location.protocol === 'https:'
// //     ? 'wss://localhost:8000/ws/dashboard'
// //     : 'ws://localhost:8000/ws/dashboard';


// /* =========================================================
//    METRIC CARD
// ========================================================= */

// const MetricCard = ({
//   title,
//   value,
//   icon: Icon,
//   colorClass,
//   subtitle
// }) => {
//   return (
//     <div className="bg-bg-card rounded-2xl p-6 shadow-soft border border-border">

//       <div className="flex justify-between items-start">

//         <div>
//           <p className="text-sm font-medium text-gray-500 mb-1">
//             {title}
//           </p>

//           <h3 className="text-3xl font-bold font-editorial text-primary">
//             {value}
//           </h3>

//           {subtitle && (
//             <p className="text-xs text-gray-400 mt-2">
//               {subtitle}
//             </p>
//           )}
//         </div>

//         <div className={`p-3 rounded-xl ${colorClass}`}>
//           <Icon size={24} />
//         </div>

//       </div>

//     </div>
//   );
// };


// /* =========================================================
//    MAIN DASHBOARD
// ========================================================= */

// const Dashboard = () => {

//   const navigate = useNavigate();

//   /* -------------------------------------------------------
//      STATE
//   ------------------------------------------------------- */

//   const [stats, setStats] = useState({
//     totalInspections: 0,
//     compliantCount: 0,
//     potentialViolationsCount: 0,
//     pendingReviewsCount: 0,
//     complianceRate: 0
//   });

//   const [inspections, setInspections] = useState([]);

//   const [chartData, setChartData] = useState([]);

//   const [isLive, setIsLive] = useState(false);

//   const [isLoading, setIsLoading] = useState(true);

//   const [error, setError] = useState(null);

//   const [lastUpdated, setLastUpdated] = useState(null);

//   // const [socket, setSocket] = useState(null);


//   /* =========================================================
//      LOAD DASHBOARD DATA
//   ========================================================= */

//   const loadDashboardData = async () => {
//   try {
//     setIsLoading(true);
//     setError(null);

//     const [dashboardResponse, inspectionsResponse] =
//       await Promise.all([
//         analyticsAPI.getDashboard(),
//         inspectionsAPI.getAll({
//           limit: 10,
//           sort: '-createdAt',
//         }),
//       ]);

//     console.log('Dashboard response:', dashboardResponse.data);
//     console.log('Inspections response:', inspectionsResponse.data);

//     const dashboardData =
//       dashboardResponse.data?.data ||
//       dashboardResponse.data ||
//       {};

//     const inspectionsData =
//       inspectionsResponse.data?.data ||
//       inspectionsResponse.data ||
//       {};

//     setStats({
//       totalInspections:
//         dashboardData.totalInspections || 0,

//       compliantCount:
//         dashboardData.compliantCount || 0,

//       potentialViolationsCount:
//         dashboardData.potentialViolationsCount || 0,

//       pendingReviewsCount:
//         dashboardData.pendingReviewsCount || 0,

//       complianceRate:
//         dashboardData.complianceRate || 0,
//     });

//     const recentList =
//       inspectionsData.inspections ||
//       inspectionsData.results ||
//       (Array.isArray(inspectionsData)
//         ? inspectionsData
//         : []);

//     setRecentInspections(recentList);

//     if (Array.isArray(dashboardData.trends)) {
//       setChartData(dashboardData.trends);
//     }

//   } catch (err) {
//     console.error(
//       'Dashboard loading error:',
//       err.response?.data || err
//     );

//     setError(
//       err.response?.data?.message ||
//       err.message ||
//       'Failed to load dashboard data'
//     );

//   } finally {
//     setIsLoading(false);
//   }
// };

//       /* -------------------------------------------------------
//          UPDATE STATE
//       ------------------------------------------------------- */

//       // setStats({
//       //   totalInspections:
//       //     statsData.totalInspections ?? 0,

//       //   compliantCount:
//       //     statsData.compliantCount ?? 0,

//       //   potentialViolationsCount:
//       //     statsData.potentialViolationsCount ?? 0,

//       //   pendingReviewsCount:
//       //     statsData.pendingReviewsCount ?? 0,

//       //   complianceRate:
//       //     statsData.complianceRate ?? 0
//       // });


//       /*
//        Backend can either return:

//        [
//          {...},
//          {...}
//        ]

//        OR

//        {
//          inspections: [...]
//        }
//       */



//   /* =========================================================
//      WEBSOCKET CONNECTION
//   ========================================================= */

//   // const connectWebSocket = () => {

//   //   try {

//   //     const ws = new WebSocket(WS_URL);

//   //     setSocket(ws);


//   //     /* -------------------------------------------------------
//   //        CONNECTION OPEN
//   //     ------------------------------------------------------- */

//   //     ws.onopen = () => {

//   //       console.log(
//   //         'LegalScan AI dashboard connected'
//   //       );

//   //       setIsLive(true);

//   //       setError(null);

//   //     };


//       /* -------------------------------------------------------
//          RECEIVE LIVE DATA
//       ------------------------------------------------------- */

//       // ws.onmessage = (event) => {

//       //   try {

//       //     const data = JSON.parse(
//       //       event.data
//       //     );


//       //     console.log(
//       //       'Live dashboard update:',
//       //       data
//       //     );


//           /* =====================================================
//              COMPLETE DASHBOARD UPDATE
//           ===================================================== */

//           if (
//             data.type ===
//             'DASHBOARD_UPDATE'
//           ) {

//             if (data.stats) {

//               setStats({
//                 totalInspections:
//                   data.stats.totalInspections ?? 0,

//                 compliantCount:
//                   data.stats.compliantCount ?? 0,

//                 potentialViolationsCount:
//                   data.stats.potentialViolationsCount ?? 0,

//                 pendingReviewsCount:
//                   data.stats.pendingReviewsCount ?? 0,

//                 complianceRate:
//                   data.stats.complianceRate ?? 0
//               });

//             }


//             if (
//               Array.isArray(
//                 data.recentInspections
//               )
//             ) {

//               setInspections(
//                 data.recentInspections
//               );

//             }


//             if (
//               Array.isArray(
//                 data.chartData
//               )
//             ) {

//               setChartData(
//                 data.chartData
//               );

//             }


//             setLastUpdated(
//               new Date()
//             );

//           }


//           /* =====================================================
//              NEW INSPECTION
//           ===================================================== */

//           if (
//             data.type ===
//             'NEW_INSPECTION'
//           ) {

//             if (data.inspection) {

//               setInspections(
//                 previous => {

//                   /*
//                    Avoid duplicate inspection
//                   */

//                   const exists =
//                     previous.some(
//                       item =>
//                         item._id ===
//                         data.inspection._id
//                     );


//                   if (exists) {

//                     return previous;

//                   }


//                   return [
//                     data.inspection,
//                     ...previous
//                   ].slice(0, 10);

//                 }
//               );

//             }


//             if (data.stats) {

//               setStats({
//                 totalInspections:
//                   data.stats.totalInspections ?? 0,

//                 compliantCount:
//                   data.stats.compliantCount ?? 0,

//                 potentialViolationsCount:
//                   data.stats.potentialViolationsCount ?? 0,

//                 pendingReviewsCount:
//                   data.stats.pendingReviewsCount ?? 0,

//                 complianceRate:
//                   data.stats.complianceRate ?? 0
//               });

//             }


//             if (
//               Array.isArray(
//                 data.chartData
//               )
//             ) {

//               setChartData(
//                 data.chartData
//               );

//             }


//             setLastUpdated(
//               new Date()
//             );

//           }


//           /* =====================================================
//              INSPECTION UPDATED
//           ===================================================== */

//           if (
//             data.type ===
//             'INSPECTION_UPDATED'
//           ) {

//             if (data.inspection) {

//               setInspections(
//                 previous =>
//                   previous.map(
//                     item =>
//                       item._id ===
//                       data.inspection._id
//                         ? data.inspection
//                         : item
//                   )
//               );

//             }


//             if (data.stats) {

//               setStats(
//                 previous => ({
//                   ...previous,
//                   ...data.stats
//                 })
//               );

//             }


//             setLastUpdated(
//               new Date()
//             );

//           }


//           /* =====================================================
//              INSPECTION REVIEWED
//           ===================================================== */

//       //     if (
//       //       data.type ===
//       //       'INSPECTION_REVIEWED'
//       //     ) {

//       //       if (data.inspection) {

//       //         setInspections(
//       //           previous =>
//       //             previous.map(
//       //               item =>
//       //                 item._id ===
//       //                 data.inspection._id
//       //                   ? data.inspection
//       //                   : item
//       //             )
//       //         );

//       //       }


//       //       if (data.stats) {

//       //         setStats(
//       //           previous => ({
//       //             ...previous,
//       //             ...data.stats
//       //           })
//       //         );

//       //       }


//       //       setLastUpdated(
//       //         new Date()
//       //       );

//       //     }

//       //   } catch (err) {

//       //     console.error(
//       //       'WebSocket message error:',
//       //       err
//       //     );

//       //   }

//       // };


//       /* -------------------------------------------------------
//          WEBSOCKET ERROR
//       ------------------------------------------------------- */

//       // ws.onerror = (error) => {

//       //   console.error(
//       //     'WebSocket error:',
//       //     error
//       //   );

//       //   setIsLive(false);

//       // };


//       /* -------------------------------------------------------
//          WEBSOCKET CLOSED
//       ------------------------------------------------------- */

//       // ws.onclose = () => {

//       //   console.log(
//       //     'Dashboard WebSocket disconnected'
//       //   );

//       //   setIsLive(false);

//       //   setSocket(null);

//       // };


//     // } catch (err) {

//     //   console.error(
//     //     'WebSocket connection failed:',
//     //     err
//     //   );

//   //     setIsLive(false);

//   //   }

//   // };


//   /* =========================================================
//      INITIAL LOAD + WEBSOCKET
//   ========================================================= */

//   useEffect(() => {

//     /*
//      Load current dashboard
//      */

//     loadDashboardData();


//     /*
//      Connect to live updates
//      */

//     // connectWebSocket();


//     /*
//      Cleanup WebSocket
//      */

//     return () => {

//       if (socket) {

//         socket.close();

//       }

//     };

//   }, []);


//   /* =========================================================
//      MANUAL REFRESH
//   ========================================================= */

//   const handleRefresh = async () => {

//     await loadDashboardData();

//   };


//   /* =========================================================
//      FORMAT DATE
//   ========================================================= */

//   const formatDate = (date) => {

//     if (!date) {
//       return '-';
//     }

//     try {

//       return new Date(
//         date
//       ).toLocaleDateString(
//         'en-IN',
//         {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric'
//         }
//       );

//     } catch {

//       return '-';

//     }

//   };


//   /* =========================================================
//      STATUS CLASS
//   ========================================================= */

//   const getStatusClass = (
//     status
//   ) => {

//     switch (status) {

//       case 'COMPLIANT':

//         return 'bg-green-100 text-green-700';


//       case 'NON_COMPLIANT':

//         return 'bg-red-100 text-red-700';


//       case 'PENDING_REVIEW':

//         return 'bg-orange-100 text-orange-700';


//       default:

//         return 'bg-gray-100 text-gray-700';

//     }

//   };


//   /* =========================================================
//      STATUS TEXT
//   ========================================================= */

//   const getStatusText = (
//     status
//   ) => {

//     if (!status) {
//       return 'UNKNOWN';
//     }

//     return status
//       .replaceAll('_', ' ');

//   };


//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (

//     <div className="space-y-8 max-w-7xl mx-auto">


//       {/* =====================================================
//           HEADER / LIVE STATUS
//       ===================================================== */}

//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

//         <div>

//           <h2 className="text-2xl font-bold font-editorial text-primary">
//             LegalScan AI Dashboard
//           </h2>

//           <p className="text-sm text-gray-500 mt-1">
//             Legal Metrology inspection overview
//           </p>

//         </div>


//         <div className="flex items-center gap-3">


//           {/* LIVE STATUS */}

//           <div
//             className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
//               isLive
//                 ? 'bg-green-50 text-green-700'
//                 : 'bg-gray-100 text-gray-500'
//             }`}
//           >

//             {isLive ? (

//               <>
//                 <Wifi
//                   size={15}
//                   className="text-green-600"
//                 />

//                 <span>
//                   LIVE
//                 </span>

//                 <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
//               </>

//             ) : (

//               <>
//                 <WifiOff
//                   size={15}
//                 />

//                 <span>
//                   OFFLINE
//                 </span>
//               </>

//             )}

//           </div>


//           {/* REFRESH BUTTON */}

//           <button
//             onClick={handleRefresh}
//             disabled={isLoading}
//             className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-lg text-sm font-medium hover:bg-bg-soft transition-colors disabled:opacity-50"
//           >

//             <RefreshCw
//               size={15}
//               className={
//                 isLoading
//                   ? 'animate-spin'
//                   : ''
//               }
//             />

//             Refresh

//           </button>

//         </div>

//       </div>


//       {/* =====================================================
//           ERROR MESSAGE
//       ===================================================== */}

//       {error && (

//         <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">

//           <AlertTriangle
//             size={20}
//           />

//           <div>

//             <p className="font-semibold">
//               Dashboard connection issue
//             </p>

//             <p className="text-sm mt-1">
//               {error}
//             </p>

//           </div>

//         </div>

//       )}


//       {/* =====================================================
//           METRICS
//       ===================================================== */}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


//         <MetricCard

//           title="Total Inspections"

//           value={
//             isLoading
//               ? '...'
//               : stats.totalInspections
//                   .toLocaleString()
//           }

//           icon={Activity}

//           colorClass="bg-gray-100 text-gray-700"

//           subtitle="All recorded inspections"

//         />


//         <MetricCard

//           title="Compliant"

//           value={
//             isLoading
//               ? '...'
//               : stats.compliantCount
//                   .toLocaleString()
//           }

//           icon={CheckCircle}

//           colorClass="bg-green-50 text-green-600"

//           subtitle={
//             `${stats.complianceRate}% compliance rate`
//           }

//         />


//         <MetricCard

//           title="Potential Violations"

//           value={
//             isLoading
//               ? '...'
//               : stats
//                   .potentialViolationsCount
//                   .toLocaleString()
//           }

//           icon={AlertTriangle}

//           colorClass="bg-red-50 text-red-500"

//           subtitle="Requires officer review"

//         />


//         <MetricCard

//           title="Pending Review"

//           value={
//             isLoading
//               ? '...'
//               : stats
//                   .pendingReviewsCount
//                   .toLocaleString()
//           }

//           icon={Clock}

//           colorClass="bg-orange-50 text-accent"

//           subtitle="In processing queue"

//         />

//       </div>


//       {/* =====================================================
//           CHART + SYSTEM STATUS
//       ===================================================== */}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


//         {/* ===================================================
//             ENFORCEMENT CHART
//         =================================================== */}

//         <div className="lg:col-span-2 bg-bg-card rounded-2xl shadow-soft border border-border p-6">


//           <div className="flex justify-between items-center mb-6">

//             <div>

//               <h3 className="text-lg font-bold font-editorial">
//                 Weekly Enforcement Trends
//               </h3>

//               <p className="text-xs text-gray-500 mt-1">
//                 Live inspection activity
//               </p>

//             </div>


//             <select
//               className="bg-bg-soft border-none text-sm font-medium rounded-lg px-3 py-1.5 focus:ring-0"
//               defaultValue="7"
//               onChange={() => {}}
//             >

//               <option value="7">
//                 Last 7 Days
//               </option>

//               <option value="30">
//                 Last 30 Days
//               </option>

//             </select>

//           </div>


//           <div className="h-72">

//             {chartData.length === 0 ? (

//               <div className="h-full flex items-center justify-center text-sm text-gray-400">

//                 No enforcement data available

//               </div>

//             ) : (

//               <ResponsiveContainer
//                 width="100%"
//                 height="100%"
//               >

//                 <BarChart
//                   data={chartData}
//                   margin={{
//                     top: 10,
//                     right: 10,
//                     left: -20,
//                     bottom: 0
//                   }}
//                 >

//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     vertical={false}
//                     stroke="#E5E7EB"
//                   />


//                   <XAxis
//                     dataKey="name"
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{
//                       fill: '#6B7280',
//                       fontSize: 12
//                     }}
//                     dy={10}
//                   />


//                   <YAxis
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{
//                       fill: '#6B7280',
//                       fontSize: 12
//                     }}
//                   />


//                   <Tooltip
//                     cursor={{
//                       fill: '#F3F4F6'
//                     }}
//                     contentStyle={{
//                       borderRadius: '12px',
//                       border: 'none',
//                       boxShadow:
//                         '0 4px 20px -2px rgba(0, 0, 0, 0.1)'
//                     }}
//                   />


//                   <Bar
//                     dataKey="compliant"
//                     name="Compliant"
//                     stackId="a"
//                     fill="#10B981"
//                     radius={[
//                       0,
//                       0,
//                       4,
//                       4
//                     ]}
//                     barSize={32}
//                   />


//                   <Bar
//                     dataKey="violations"
//                     name="Violations"
//                     stackId="a"
//                     fill="#EF4444"
//                     radius={[
//                       4,
//                       4,
//                       0,
//                       0
//                     ]}
//                     barSize={32}
//                   />

//                 </BarChart>

//               </ResponsiveContainer>

//             )}

//           </div>

//         </div>


//         {/* ===================================================
//             SYSTEM STATUS
//         =================================================== */}

//         <div className="bg-bg-card rounded-2xl shadow-soft border border-border p-6 flex flex-col">


//           <div className="flex justify-between items-center mb-6">

//             <h3 className="text-lg font-bold font-editorial">
//               System Status
//             </h3>


//             <span
//               className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
//                 isLive
//                   ? 'bg-green-100 text-green-700'
//                   : 'bg-gray-100 text-gray-500'
//               }`}
//             >

//               {isLive
//                 ? 'OPERATIONAL'
//                 : 'OFFLINE'}

//             </span>

//           </div>


//           <div className="space-y-5 flex-1">


//             {/* CNN */}

//             <div className="flex items-center justify-between">

//               <div className="flex items-center gap-3">

//                 <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">

//                   <Cpu size={18} />

//                 </div>


//                 <div>

//                   <p className="text-sm font-medium">
//                     CNN Vision Model
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     AI Vision Service
//                   </p>

//                 </div>

//               </div>


//               <span
//                 className={`flex h-2.5 w-2.5 rounded-full ${
//                   isLive
//                     ? 'bg-success'
//                     : 'bg-gray-400'
//                 }`}
//               />

//             </div>


//             {/* OCR */}

//             <div className="flex items-center justify-between">

//               <div className="flex items-center gap-3">

//                 <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">

//                   <Search size={18} />

//                 </div>


//                 <div>

//                   <p className="text-sm font-medium">
//                     OCR Extraction
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     OCR Processing Engine
//                   </p>

//                 </div>

//               </div>


//               <span
//                 className={`flex h-2.5 w-2.5 rounded-full ${
//                   isLive
//                     ? 'bg-success'
//                     : 'bg-gray-400'
//                 }`}
//               />

//             </div>


//             {/* RULE ENGINE */}

//             <div className="flex items-center justify-between">

//               <div className="flex items-center gap-3">

//                 <div className="p-2 bg-amber-50 text-accent rounded-lg">

//                   <Database size={18} />

//                 </div>


//                 <div>

//                   <p className="text-sm font-medium">
//                     Legal Metrology Rule Engine
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     Packaged Commodities Rules
//                   </p>

//                 </div>

//               </div>


//               <span
//                 className={`flex h-2.5 w-2.5 rounded-full ${
//                   isLive
//                     ? 'bg-success'
//                     : 'bg-gray-400'
//                 }`}
//               />

//             </div>

//           </div>


//           {/* LAST SYNC */}

//           <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs text-gray-500">

//             <ShieldCheck
//               size={14}
//               className={
//                 isLive
//                   ? 'text-success'
//                   : 'text-gray-400'
//               }
//             />

//             <span>

//               {isLive
//                 ? 'Live connection active'
//                 : 'Waiting for connection'}

//               {lastUpdated && (
//                 <>
//                   {' • '}
//                   Last update:{' '}
//                   {lastUpdated.toLocaleTimeString(
//                     'en-IN'
//                   )}
//                 </>
//               )}

//             </span>

//           </div>

//         </div>

//       </div>


//       {/* =====================================================
//           RECENT INSPECTIONS
//       ===================================================== */}

//       <div className="bg-bg-card rounded-2xl shadow-soft border border-border overflow-hidden">


//         {/* TABLE HEADER */}

//         <div className="px-6 py-5 border-b border-border flex justify-between items-center">

//           <div>

//             <h3 className="text-lg font-bold font-editorial">
//               Recent Inspections
//             </h3>

//             <p className="text-xs text-gray-500 mt-1">
//               Automatically updated in real time
//             </p>

//           </div>


//           <button
//             onClick={() =>
//               navigate('/history')
//             }
//             className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
//           >

//             View All

//           </button>

//         </div>


//         {/* ===================================================
//             TABLE
//         =================================================== */}

//         <div className="overflow-x-auto">

//           <table className="w-full text-left text-sm">


//             <thead className="bg-bg-soft text-gray-500">

//               <tr>

//                 <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
//                   ID
//                 </th>

//                 <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
//                   Product
//                 </th>

//                 <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
//                   Date
//                 </th>

//                 <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
//                   AI Confidence
//                 </th>

//               </tr>

//             </thead>


//             <tbody className="divide-y divide-border">


//               {isLoading ? (

//                 <tr>

//                   <td
//                     colSpan="5"
//                     className="px-6 py-12 text-center text-gray-400"
//                   >

//                     <div className="flex justify-center items-center gap-2">

//                       <RefreshCw
//                         size={18}
//                         className="animate-spin"
//                       />

//                       Loading inspections...

//                     </div>

//                   </td>

//                 </tr>

//               ) : inspections.length === 0 ? (

//                 <tr>

//                   <td
//                     colSpan="5"
//                     className="px-6 py-12 text-center text-gray-400"
//                   >

//                     No inspections found.

//                   </td>

//                 </tr>

//               ) : (

//                 inspections.map(
//                   (insp) => (

//                     <tr
//                       key={insp._id || insp.inspectionId}
//                       onClick={() =>
//                         navigate(
//                           `/results/${
//                             insp._id ||
//                             insp.inspectionId
//                           }`
//                         )
//                       }
//                       className="hover:bg-gray-50 cursor-pointer transition-colors"
//                     >


//                       {/* ID */}

//                       <td className="px-6 py-4 font-semibold text-primary">

//                         {insp.inspectionId ||
//                           insp._id ||
//                           '-'}

//                       </td>


//                       {/* PRODUCT */}

//                       <td className="px-6 py-4">

//                         <p className="font-medium">

//                           {insp.productId?.productName ||
//                             insp.productName ||
//                             'Unknown Product'}

//                         </p>


//                         <p className="text-xs text-gray-500">

//                           {insp.productId?.manufacturer ||
//                             insp.manufacturer ||
//                             'Unknown Manufacturer'}

//                         </p>

//                       </td>


//                       {/* DATE */}

//                       <td className="px-6 py-4 text-gray-600">

//                         {formatDate(
//                           insp.inspectionDate ||
//                           insp.createdAt
//                         )}

//                       </td>


//                       {/* STATUS */}

//                       <td className="px-6 py-4">

//                         <span
//                           className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide uppercase ${getStatusClass(
//                             insp.complianceStatus
//                           )}`}
//                         >

//                           {getStatusText(
//                             insp.complianceStatus
//                           )}

//                         </span>

//                       </td>


//                       {/* CONFIDENCE */}

//                       <td className="px-6 py-4">

//                         <div className="flex items-center gap-3">

//                           <div className="w-full max-w-[80px] h-2 bg-gray-200 rounded-full overflow-hidden">

//                             <div
//                               className="h-full bg-primary transition-all duration-500"
//                               style={{
//                                 width: `${
//                                   Math.min(
//                                     Math.max(
//                                       Number(
//                                         insp.overallConfidence ||
//                                         0
//                                       ),
//                                       0
//                                     ),
//                                     100
//                                   )
//                                 }%`
//                               }}
//                             />

//                           </div>


//                           <span className="font-medium">

//                             {Number(
//                               insp.overallConfidence ||
//                               0
//                             )}

//                             %

//                           </span>

//                         </div>

//                       </td>

//                     </tr>

//                   )
//                 )

//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>


//     </div>

//   );

// };


// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { analyticsAPI, inspectionsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShieldCheck,
  Database,
  Cpu,
  Search,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


/* =========================================================
   CONFIGURATION
========================================================= */

// const API_URL = 'http://localhost:8000';

// const WS_URL =
//   window.location.protocol === 'https:'
//     ? 'wss://localhost:8000/ws/dashboard'
//     : 'ws://localhost:8000/ws/dashboard';


/* =========================================================
   METRIC CARD
========================================================= */

const MetricCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
  subtitle
}) => {
  return (
    <div className="bg-bg-card rounded-2xl p-6 shadow-soft border border-border">

      <div className="flex justify-between items-start">

        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            {title}
          </p>

          <h3 className="text-3xl font-bold font-editorial text-primary">
            {value}
          </h3>

          {subtitle && (
            <p className="text-xs text-gray-400 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon size={24} />
        </div>

      </div>

    </div>
  );
};


/* =========================================================
   MAIN DASHBOARD
========================================================= */

const Dashboard = () => {

  const navigate = useNavigate();

  /* -------------------------------------------------------
     STATE
  ------------------------------------------------------- */

  const [stats, setStats] = useState({
    totalInspections: 0,
    compliantCount: 0,
    potentialViolationsCount: 0,
    pendingReviewsCount: 0,
    complianceRate: 0
  });

  const [inspections, setInspections] = useState([]);

  const [chartData, setChartData] = useState([]);

  const [isLive, setIsLive] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const [lastUpdated, setLastUpdated] = useState(null);



  /* =========================================================
     LOAD DASHBOARD DATA
  ========================================================= */

  const loadDashboardData = async () => {
  try {
    setIsLoading(true);
    setError(null);

    const [dashboardResponse, inspectionsResponse] =
      await Promise.all([
        analyticsAPI.getDashboard(),
        inspectionsAPI.getAll({
          limit: 10,
          sort: '-createdAt',
        }),
      ]);

    console.log('Dashboard response:', dashboardResponse.data);
    console.log('Inspections response:', inspectionsResponse.data);

    const dashboardData =
      dashboardResponse.data?.data ||
      dashboardResponse.data ||
      {};

    const inspectionsData =
      inspectionsResponse.data?.data ||
      inspectionsResponse.data ||
      {};

    setStats({
      totalInspections:
        dashboardData.totalInspections || 0,

      compliantCount:
        dashboardData.compliantCount || 0,

      potentialViolationsCount:
        dashboardData.potentialViolationsCount || 0,

      pendingReviewsCount:
        dashboardData.pendingReviewsCount || 0,

      complianceRate:
        dashboardData.complianceRate || 0,
    });

    const recentList =
      inspectionsData.inspections ||
      inspectionsData.results ||
      (Array.isArray(inspectionsData)
        ? inspectionsData
        : []);

    setInspections(recentList);

    if (Array.isArray(dashboardData.trends)) {
      setChartData(dashboardData.trends);
    }

    setIsLive(true);
    setLastUpdated(new Date());
  } catch (err) {
    setIsLive(false);
    console.error(
      'Dashboard loading error:',
      err.response?.data || err
    );

    setError(
      err.response?.data?.message ||
      err.message ||
      'Failed to load dashboard data'
    );

  } finally {
    setIsLoading(false);
  }
};


  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadDashboardData();
  }, []);

  /* =========================================================
     MANUAL REFRESH
  ========================================================= */

  const handleRefresh = async () => {
    await loadDashboardData();
  };

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {

    if (!date) {
      return '-';
    }

    try {

      return new Date(
        date
      ).toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      );

    } catch {

      return '-';

    }

  };


  /* =========================================================
     STATUS CLASS
  ========================================================= */

  const getStatusClass = (
    status
  ) => {

    switch (status) {

      case 'COMPLIANT':

        return 'bg-green-100 text-green-700';


      case 'NON_COMPLIANT':

        return 'bg-red-100 text-red-700';


      case 'PENDING_REVIEW':

        return 'bg-orange-100 text-orange-700';


      default:

        return 'bg-gray-100 text-gray-700';

    }

  };


  /* =========================================================
     STATUS TEXT
  ========================================================= */

  const getStatusText = (
    status
  ) => {

    if (!status) {
      return 'UNKNOWN';
    }

    return status
      .replaceAll('_', ' ');

  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="space-y-8 max-w-7xl mx-auto">


      {/* =====================================================
          HEADER / LIVE STATUS
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h2 className="text-2xl font-bold font-editorial text-primary">
            LegalScan AI Dashboard
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Legal Metrology inspection overview
          </p>

        </div>


        <div className="flex items-center gap-3">


          {/* LIVE STATUS */}

          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
              isLive
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >

            {isLive ? (

              <>
                <Wifi
                  size={15}
                  className="text-green-600"
                />

                <span>
                  LIVE
                </span>

                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </>

            ) : (

              <>
                <WifiOff
                  size={15}
                />

                <span>
                  OFFLINE
                </span>
              </>

            )}

          </div>


          {/* REFRESH BUTTON */}

          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-lg text-sm font-medium hover:bg-bg-soft transition-colors disabled:opacity-50"
          >

            <RefreshCw
              size={15}
              className={
                isLoading
                  ? 'animate-spin'
                  : ''
              }
            />

            Refresh

          </button>

        </div>

      </div>


      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {error && (

        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">

          <AlertTriangle
            size={20}
          />

          <div>

            <p className="font-semibold">
              Dashboard connection issue
            </p>

            <p className="text-sm mt-1">
              {error}
            </p>

          </div>

        </div>

      )}


      {/* =====================================================
          METRICS
      ===================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


        <MetricCard

          title="Total Inspections"

          value={
            isLoading
              ? '...'
              : stats.totalInspections
                  .toLocaleString()
          }

          icon={Activity}

          colorClass="bg-gray-100 text-gray-700"

          subtitle="All recorded inspections"

        />


        <MetricCard
  title="Compliant"
  value={
    isLoading
      ? '...'
      : stats.compliantCount.toLocaleString()
  }
  icon={CheckCircle}
  colorClass="bg-green-50 text-green-600"
  subtitle={
    `${stats.totalInspections > 0
      ? Math.round(
          (stats.compliantCount / stats.totalInspections) * 100
        )
      : 0}% compliance rate`
  }
/>


        <MetricCard

          title="Potential Violations"

          value={
            isLoading
              ? '...'
              : stats
                  .potentialViolationsCount
                  .toLocaleString()
          }

          icon={AlertTriangle}

          colorClass="bg-red-50 text-red-500"

          subtitle="Requires officer review"

        />


        <MetricCard

          title="Pending Review"

          value={
            isLoading
              ? '...'
              : stats
                  .pendingReviewsCount
                  .toLocaleString()
          }

          icon={Clock}

          colorClass="bg-orange-50 text-accent"

          subtitle="In processing queue"

        />

      </div>


      {/* =====================================================
          CHART + SYSTEM STATUS
      ===================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


        {/* ===================================================
            ENFORCEMENT CHART
        =================================================== */}

        <div className="lg:col-span-2 bg-bg-card rounded-2xl shadow-soft border border-border p-6">


          <div className="flex justify-between items-center mb-6">

            <div>

              <h3 className="text-lg font-bold font-editorial">
                Weekly Enforcement Trends
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Live inspection activity
              </p>

            </div>


            <select
              className="bg-bg-soft border-none text-sm font-medium rounded-lg px-3 py-1.5 focus:ring-0"
              defaultValue="7"
              onChange={() => {}}
            >

              <option value="7">
                Last 7 Days
              </option>

              <option value="30">
                Last 30 Days
              </option>

            </select>

          </div>


          <div className="h-72">

            {chartData.length === 0 ? (

              <div className="h-full flex items-center justify-center text-sm text-gray-400">

                No enforcement data available

              </div>

            ) : (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />


                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#6B7280',
                      fontSize: 12
                    }}
                    dy={10}
                  />


                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#6B7280',
                      fontSize: 12
                    }}
                  />


                  <Tooltip
                    cursor={{
                      fill: '#F3F4F6'
                    }}
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow:
                        '0 4px 20px -2px rgba(0, 0, 0, 0.1)'
                    }}
                  />


                  <Bar
                    dataKey="compliant"
                    name="Compliant"
                    stackId="a"
                    fill="#10B981"
                    radius={[
                      0,
                      0,
                      4,
                      4
                    ]}
                    barSize={32}
                  />


                  <Bar
                    dataKey="violations"
                    name="Violations"
                    stackId="a"
                    fill="#EF4444"
                    radius={[
                      4,
                      4,
                      0,
                      0
                    ]}
                    barSize={32}
                  />

                </BarChart>

              </ResponsiveContainer>

            )}

          </div>

        </div>


        {/* ===================================================
            SYSTEM STATUS
        =================================================== */}

        <div className="bg-bg-card rounded-2xl shadow-soft border border-border p-6 flex flex-col">


          <div className="flex justify-between items-center mb-6">

            <h3 className="text-lg font-bold font-editorial">
              System Status
            </h3>


            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                isLive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >

              {isLive
                ? 'OPERATIONAL'
                : 'OFFLINE'}

            </span>

          </div>


          <div className="space-y-5 flex-1">


            {/* CNN */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">

                  <Cpu size={18} />

                </div>


                <div>

                  <p className="text-sm font-medium">
                    CNN Vision Model
                  </p>

                  <p className="text-xs text-gray-500">
                    AI Vision Service
                  </p>

                </div>

              </div>


              <span
                className={`flex h-2.5 w-2.5 rounded-full ${
                  isLive
                    ? 'bg-success'
                    : 'bg-gray-400'
                }`}
              />

            </div>


            {/* OCR */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">

                  <Search size={18} />

                </div>


                <div>

                  <p className="text-sm font-medium">
                    OCR Extraction
                  </p>

                  <p className="text-xs text-gray-500">
                    OCR Processing Engine
                  </p>

                </div>

              </div>


              <span
                className={`flex h-2.5 w-2.5 rounded-full ${
                  isLive
                    ? 'bg-success'
                    : 'bg-gray-400'
                }`}
              />

            </div>


            {/* RULE ENGINE */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="p-2 bg-amber-50 text-accent rounded-lg">

                  <Database size={18} />

                </div>


                <div>

                  <p className="text-sm font-medium">
                    Legal Metrology Rule Engine
                  </p>

                  <p className="text-xs text-gray-500">
                    Packaged Commodities Rules
                  </p>

                </div>

              </div>


              <span
                className={`flex h-2.5 w-2.5 rounded-full ${
                  isLive
                    ? 'bg-success'
                    : 'bg-gray-400'
                }`}
              />

            </div>

          </div>


          {/* LAST SYNC */}

          <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs text-gray-500">

            <ShieldCheck
              size={14}
              className={
                isLive
                  ? 'text-success'
                  : 'text-gray-400'
              }
            />

            <span>

              {isLive
                ? 'Live connection active'
                : 'Waiting for connection'}

              {lastUpdated && (
                <>
                  {' • '}
                  Last update:{' '}
                  {lastUpdated.toLocaleTimeString(
                    'en-IN'
                  )}
                </>
              )}

            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          RECENT INSPECTIONS
      ===================================================== */}

      <div className="bg-bg-card rounded-2xl shadow-soft border border-border overflow-hidden">


        {/* TABLE HEADER */}

        <div className="px-6 py-5 border-b border-border flex justify-between items-center">

          <div>

            <h3 className="text-lg font-bold font-editorial">
              Recent Inspections
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Automatically updated in real time
            </p>

          </div>


          <button
            onClick={() =>
              navigate('/history')
            }
            className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >

            View All

          </button>

        </div>


        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">


            <thead className="bg-bg-soft text-gray-500">

              <tr>

                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                  ID
                </th>

                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                  Product
                </th>

                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                  Date
                </th>

                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                  Status
                </th>

                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                  AI Confidence
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-border">


              {isLoading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-400"
                  >

                    <div className="flex justify-center items-center gap-2">

                      <RefreshCw
                        size={18}
                        className="animate-spin"
                      />

                      Loading inspections...

                    </div>

                  </td>

                </tr>

              ) : inspections.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-400"
                  >

                    No inspections found.

                  </td>

                </tr>

              ) : (

                inspections.map(
                  (insp) => (

                    <tr
                      key={insp._id || insp.inspectionId}
                      onClick={() =>
  navigate(
    `/results/${
      insp._id ||
      insp.inspectionId
    }`
  )
}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >


                      {/* ID */}

                      <td className="px-6 py-4 font-semibold text-primary">

                        {insp.inspectionId ||
                          insp._id ||
                          '-'}

                      </td>


                      {/* PRODUCT */}

                      <td className="px-6 py-4">

                        <p className="font-medium">

                          {insp.productId?.productName ||
                            insp.productName ||
                            'Unknown Product'}

                        </p>


                        <p className="text-xs text-gray-500">

                          {insp.productId?.manufacturer ||
                            insp.manufacturer ||
                            'Unknown Manufacturer'}

                        </p>

                      </td>


                      {/* DATE */}

                      <td className="px-6 py-4 text-gray-600">

                        {formatDate(
                          insp.inspectionDate ||
                          insp.createdAt
                        )}

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide uppercase ${getStatusClass(
                            insp.complianceStatus
                          )}`}
                        >

                          {getStatusText(
                            insp.complianceStatus
                          )}

                        </span>

                      </td>


                      {/* CONFIDENCE */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-full max-w-[80px] h-2 bg-gray-200 rounded-full overflow-hidden">

                            <div
                              className="h-full bg-primary transition-all duration-500"
                              style={{
                                width: `${
                                  Math.min(
                                    Math.max(
                                      Number(
                                        insp.overallConfidence ||
                                        0
                                      ),
                                      0
                                    ),
                                    100
                                  )
                                }%`
                              }}
                            />

                          </div>


                          <span className="font-medium">

                            {Number(
                              insp.overallConfidence ||
                              0
                            )}

                            %

                          </span>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


    </div>

  );

};


export default Dashboard;
