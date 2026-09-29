// import React from 'react';
// import Card from '../components/Card';
// import { BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';
// import { useSeedData } from '../context/SeedDataContext';

// const Analytics = () => {
//   const { inspections, violations, getViolationsWithDetails, scheduledInspections } = useSeedData();
  
//   const totalInspections = inspections.length;
//   const compliantInspections = inspections.filter(i => i.status === 'Compliant').length;
//   const complianceRate = totalInspections === 0 ? 0 : ((compliantInspections / totalInspections) * 100).toFixed(1);
//   const criticalViolations = violations.filter(v => v.severity === 'HIGH').length;

//   const violationsWithDetails = getViolationsWithDetails();
  
//   // Calculate violation categories dynamically
//   const categoryCounts = {};
//   violationsWithDetails.forEach(v => {
//     const name = v.ruleDetails?.rule || 'Other';
//     categoryCounts[name] = (categoryCounts[name] || 0) + 1;
//   });

//   const totalViolations = violationsWithDetails.length;
//   const categoryStats = Object.entries(categoryCounts).map(([name, count]) => ({
//     name,
//     count,
//     percentage: totalViolations === 0 ? 0 : Math.round((count / totalViolations) * 100)
//   })).sort((a, b) => b.percentage - a.percentage).slice(0, 4);

//   // Compute monthly chart data dynamically
//   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const monthlyCounts = {};
//   inspections.forEach(i => {
//     const d = new Date(i.date);
//     if (!isNaN(d.getTime())) {
//       const month = monthNames[d.getMonth()];
//       monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
//     }
//   });
  
//   // Get last 6 months present in data or just all available
//   const maxMonthlyCount = Math.max(...Object.values(monthlyCounts), 1);
//   const chartData = Object.entries(monthlyCounts).map(([month, count]) => ({
//     month,
//     count,
//     percentage: Math.max((count / maxMonthlyCount) * 100, 10) // minimum 10% for visibility
//   }));

//   // Pre-defined colors for dynamic bars
//   const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-gray-500'];

//   return (
//     <div className="space-y-8 max-w-6xl mx-auto p-4">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight text-primary">Analytics & Insights</h1>
//         <p className="text-gray-500 mt-1">System-wide compliance trends and performance metrics.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card className="bg-blue-50 border-none shadow-sm">
//           <div className="flex gap-4 items-center">
//             <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><BarChart2 /></div>
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Total Inspections</p>
//               <h2 className="text-3xl font-bold text-primary">{totalInspections}</h2>
//             </div>
//           </div>
//         </Card>
        
//         <Card className="bg-green-50 border-none shadow-sm">
//           <div className="flex gap-4 items-center">
//             <div className="p-3 bg-green-100 text-green-600 rounded-lg"><TrendingUp /></div>
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Compliance Rate</p>
//               <h2 className="text-3xl font-bold text-primary">{complianceRate}%</h2>
//             </div>
//           </div>
//         </Card>

//         <Card className="bg-red-50 border-none shadow-sm">
//           <div className="flex gap-4 items-center">
//             <div className="p-3 bg-red-100 text-red-600 rounded-lg"><AlertTriangle /></div>
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Critical Violations</p>
//               <h2 className="text-3xl font-bold text-primary">{criticalViolations}</h2>
//             </div>
//           </div>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card title="Violations by Category">
//           <div className="space-y-4 mt-4">
//             {categoryStats.map((stat, idx) => (
//               <div key={idx}>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="truncate pr-4">{stat.name}</span>
//                   <span className="font-bold">{stat.percentage}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div className={`${colors[idx % colors.length]} h-2 rounded-full`} style={{ width: `${stat.percentage}%` }}></div>
//                 </div>
//               </div>
//             ))}
//             {categoryStats.length === 0 && <p className="text-sm text-gray-500">No violations recorded yet.</p>}
//           </div>
//         </Card>

//         <Card title="Monthly Inspection Volume">
//           <div className="h-48 flex items-end justify-between mt-4 gap-2">
//             {chartData.map((data, i) => (
//               <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group h-full flex flex-col justify-end">
//                 <div className="w-full bg-accent rounded-t-sm transition-all" style={{ height: `${data.percentage}%` }}></div>
//                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//                   {data.count}
//                 </div>
//               </div>
//             ))}
//             {chartData.length === 0 && <p className="text-gray-500 m-auto">No data</p>}
//           </div>
//           <div className="flex justify-between mt-2 text-xs text-gray-400">
//             {chartData.map((data, i) => (
//               <span key={i} className="truncate px-1">{data.month}</span>
//             ))}
//           </div>
//         </Card>
//       </div>

//       <Card title="Schedule Manager Tableau">
//         <div className="overflow-x-auto mt-4">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-border text-sm text-gray-500">
//                 <th className="py-3 px-4 font-medium">Schedule ID</th>
//                 <th className="py-3 px-4 font-medium">Target / Manufacturer</th>
//                 <th className="py-3 px-4 font-medium">Date</th>
//                 <th className="py-3 px-4 font-medium">Assigned Officer</th>
//                 <th className="py-3 px-4 font-medium">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {scheduledInspections.map((sch, idx) => (
//                 <tr key={idx} className="border-b border-border/50 hover:bg-bg-soft transition-colors">
//                   <td className="py-3 px-4 font-medium text-primary">{sch.id}</td>
//                   <td className="py-3 px-4 text-gray-700">{sch.target}</td>
//                   <td className="py-3 px-4 text-gray-600">{sch.date}</td>
//                   <td className="py-3 px-4 text-gray-600">{sch.officer}</td>
//                   <td className="py-3 px-4">
//                     <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                       sch.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
//                       'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {sch.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//               {scheduledInspections.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="py-4 text-center text-gray-500">No scheduled inspections.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Analytics;


import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/Card';
import {
  BarChart2,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Loader2,
  ShieldCheck,
  FileWarning,
  CalendarDays,
  Database
} from 'lucide-react';
import { analyticsAPI } from '../services/api';

const Analytics = () => {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadAnalytics = async (showRefreshLoader = false) => {
    try {
      setError('');

      if (showRefreshLoader) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const response = await analyticsAPI.getDashboard();

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || 'Failed to load analytics data.'
        );
      }

      setDashboard(response.data.data || {});
    } catch (err) {
      console.error('Analytics loading error:', err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Unable to load analytics data.'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  /*
   * Backend response can evolve slightly over time.
   * These helpers safely read common property names without
   * breaking the page if a particular statistic is missing.
   */
  const getValue = (object, keys, fallback = 0) => {
    if (!object || typeof object !== 'object') {
      return fallback;
    }

    for (const key of keys) {
      if (
        object[key] !== undefined &&
        object[key] !== null &&
        object[key] !== ''
      ) {
        return object[key];
      }
    }

    return fallback;
  };

  const totalInspections = Number(
    getValue(dashboard, ['totalInspections', 'inspectionCount'], 0)
  );

  const compliantInspections = Number(
    getValue(
      dashboard,
      ['compliantInspections', 'compliantCount', 'compliant'],
      0
    )
  );

  const potentialViolations = Number(
    getValue(
      dashboard,
      [
        'potentialViolations',
        'violationInspections',
        'nonCompliantInspections',
        'violations'
      ],
      0
    )
  );

  const criticalViolations = Number(
    getValue(
      dashboard,
      ['criticalViolations', 'highSeverityViolations', 'highViolations'],
      0
    )
  );

  const totalViolations = Number(
    getValue(
      dashboard,
      ['totalViolations', 'violationCount'],
      0
    )
  );

  /*
   * Prefer the backend compliance rate if it exists.
   * Otherwise calculate it from the backend inspection counts.
   */
  const backendComplianceRate = getValue(
    dashboard,
    ['complianceRate'],
    null
  );

  const complianceRate =
    backendComplianceRate !== null
      ? Number(backendComplianceRate)
      : totalInspections > 0
        ? (compliantInspections / totalInspections) * 100
        : 0;

  /*
   * Violation category data
   *
   * Expected backend possibilities:
   * [
   *   { name: 'MRP', count: 5 },
   *   { name: 'Net Quantity', count: 3 }
   * ]
   *
   * or:
   * {
   *   MRP: 5,
   *   'Net Quantity': 3
   * }
   */
  const categoryStats = useMemo(() => {
    const rawCategories = getValue(
      dashboard,
      [
        'violationCategories',
        'violationsByCategory',
        'categoryStats',
        'categories'
      ],
      []
    );

    let categories = [];

    if (Array.isArray(rawCategories)) {
      categories = rawCategories.map((item) => {
        const name =
          item?.name ||
          item?.category ||
          item?.rule ||
          item?.label ||
          'Other';

        const count = Number(
          item?.count ??
            item?.total ??
            item?.value ??
            0
        );

        return {
          name,
          count
        };
      });
    } else if (
      rawCategories &&
      typeof rawCategories === 'object'
    ) {
      categories = Object.entries(rawCategories).map(
        ([name, value]) => ({
          name,
          count: Number(
            typeof value === 'object'
              ? value?.count ?? value?.total ?? 0
              : value
          )
        })
      );
    }

    categories = categories
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const categoryTotal = categories.reduce(
      (sum, item) => sum + item.count,
      0
    );

    return categories.map((item) => ({
      ...item,
      percentage:
        categoryTotal > 0
          ? Math.round((item.count / categoryTotal) * 100)
          : 0
    }));
  }, [dashboard]);

  /*
   * Monthly inspection data
   *
   * Supports either:
   * [
   *   { month: 'Jan', count: 5 }
   * ]
   *
   * or:
   * {
   *   Jan: 5,
   *   Feb: 3
   * }
   */
  const monthlyStats = useMemo(() => {
    const rawMonthly = getValue(
      dashboard,
      [
        'monthlyInspections',
        'inspectionTrend',
        'monthlyData',
        'monthlyCounts',
        'inspectionVolume'
      ],
      []
    );

    let months = [];

    if (Array.isArray(rawMonthly)) {
      months = rawMonthly.map((item) => ({
        month:
          item?.month ||
          item?.label ||
          item?.name ||
          '-',
        count: Number(
          item?.count ??
            item?.total ??
            item?.value ??
            0
        )
      }));
    } else if (
      rawMonthly &&
      typeof rawMonthly === 'object'
    ) {
      months = Object.entries(rawMonthly).map(
        ([month, value]) => ({
          month,
          count: Number(
            typeof value === 'object'
              ? value?.count ?? value?.total ?? 0
              : value
          )
        })
      );
    }

    return months.slice(-12);
  }, [dashboard]);

  const maxMonthlyCount = Math.max(
    ...monthlyStats.map((item) => item.count),
    1
  );

  /*
   * Schedule data.
   *
   * This is read from the backend if the dashboard endpoint
   * provides it. If your current backend does not return
   * schedules, the table simply shows an empty state.
   */
  const scheduledInspections = useMemo(() => {
    const schedules = getValue(
      dashboard,
      [
        'scheduledInspections',
        'schedules',
        'scheduled',
        'inspectionSchedule'
      ],
      []
    );

    if (!Array.isArray(schedules)) {
      return [];
    }

    return schedules;
  }, [dashboard]);

  const getScheduleValue = (schedule, keys, fallback = '-') => {
    if (!schedule || typeof schedule !== 'object') {
      return fallback;
    }

    for (const key of keys) {
      if (
        schedule[key] !== undefined &&
        schedule[key] !== null &&
        schedule[key] !== ''
      ) {
        return schedule[key];
      }
    }

    return fallback;
  };

  const formatDate = (value) => {
    if (!value) {
      return '-';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getScheduleStatusClass = (status) => {
    const normalized = String(status || '').toLowerCase();

    if (
      normalized.includes('complete') ||
      normalized.includes('done')
    ) {
      return 'bg-green-100 text-green-700';
    }

    if (
      normalized.includes('progress') ||
      normalized.includes('ongoing')
    ) {
      return 'bg-yellow-100 text-yellow-700';
    }

    if (
      normalized.includes('cancel')
    ) {
      return 'bg-red-100 text-red-700';
    }

    return 'bg-blue-100 text-blue-700';
  };

  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-gray-500',
    'bg-purple-500'
  ];

  /*
   * Loading state
   */
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <p className="text-sm">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Error state
   */
  if (error && !dashboard) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <Card>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h2 className="text-lg font-semibold text-primary">
              Unable to load analytics
            </h2>

            <p className="text-sm text-gray-500 mt-2 max-w-md">
              {error}
            </p>

            <button
              type="button"
              onClick={() => loadAnalytics()}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Analytics & Insights
          </h1>

          <p className="text-gray-500 mt-1">
            Real-time compliance trends and performance metrics.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadAnalytics(true)}
          disabled={isRefreshing}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-white text-primary text-sm font-medium hover:bg-bg-soft transition disabled:opacity-60"
        >
          {isRefreshing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}

          {isRefreshing ? 'Refreshing...' : 'Refresh Analytics'}
        </button>
      </div>

      {/* ERROR MESSAGE */}
      {error && dashboard && (
        <div className="flex items-start gap-3 p-4 rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-800">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />

          <div>
            <p className="font-medium">
              Analytics refresh warning
            </p>

            <p className="text-sm mt-1">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* TOP STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* TOTAL INSPECTIONS */}
        <Card className="bg-blue-50 border-none shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <BarChart2 className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Inspections
              </p>

              <h2 className="text-3xl font-bold text-primary">
                {totalInspections}
              </h2>
            </div>
          </div>
        </Card>

        {/* COMPLIANCE RATE */}
        <Card className="bg-green-50 border-none shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Compliance Rate
              </p>

              <h2 className="text-3xl font-bold text-primary">
                {Math.min(
                  Math.max(complianceRate, 0),
                  100
                ).toFixed(1)}
                %
              </h2>
            </div>
          </div>
        </Card>

        {/* VIOLATIONS */}
        <Card className="bg-orange-50 border-none shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
              <FileWarning className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Violations
              </p>

              <h2 className="text-3xl font-bold text-primary">
                {totalViolations || potentialViolations}
              </h2>
            </div>
          </div>
        </Card>

        {/* CRITICAL */}
        <Card className="bg-red-50 border-none shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Critical Violations
              </p>

              <h2 className="text-3xl font-bold text-primary">
                {criticalViolations}
              </h2>
            </div>
          </div>
        </Card>
      </div>

      {/* SECONDARY SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Compliant Inspections
              </p>

              <p className="text-xl font-bold text-primary">
                {compliantInspections}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <FileWarning className="w-5 h-5" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Inspections Requiring Review
              </p>

              <p className="text-xl font-bold text-primary">
                {potentialViolations}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Database className="w-5 h-5" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Data Source
              </p>

              <p className="text-xl font-bold text-primary">
                Live API
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* VIOLATIONS BY CATEGORY */}
        <Card title="Violations by Category">
          <div className="space-y-5 mt-4">

            {categoryStats.map((stat, idx) => (
              <div key={`${stat.name}-${idx}`}>

                <div className="flex justify-between text-sm mb-1 gap-4">
                  <span
                    className="truncate pr-4 text-gray-700"
                    title={stat.name}
                  >
                    {stat.name}
                  </span>

                  <span className="font-bold whitespace-nowrap">
                    {stat.count} ({stat.percentage}%)
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${colors[idx % colors.length]} h-2.5 rounded-full transition-all duration-500`}
                    style={{
                      width: `${stat.percentage}%`
                    }}
                  />
                </div>
              </div>
            ))}

            {categoryStats.length === 0 && (
              <div className="py-8 text-center">
                <FileWarning className="w-8 h-8 text-gray-300 mx-auto mb-2" />

                <p className="text-sm text-gray-500">
                  No violation category data available.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* MONTHLY INSPECTION VOLUME */}
        <Card title="Monthly Inspection Volume">

          <div className="h-56 flex items-end justify-between mt-6 gap-2">

            {monthlyStats.map((data, index) => {
              const height =
                data.count === 0
                  ? 4
                  : Math.max(
                      (data.count / maxMonthlyCount) * 100,
                      8
                    );

              return (
                <div
                  key={`${data.month}-${index}`}
                  className="flex-1 h-full flex flex-col justify-end relative group"
                >
                  <div
                    className="w-full bg-accent rounded-t-md transition-all duration-500 hover:opacity-80"
                    style={{
                      height: `${height}%`
                    }}
                  />

                  <div className="absolute left-1/2 -translate-x-1/2 -top-9 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {data.count} inspection
                    {data.count !== 1 ? 's' : ''}
                  </div>
                </div>
              );
            })}

            {monthlyStats.length === 0 && (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-sm text-gray-500">
                  No monthly inspection data available.
                </p>
              </div>
            )}
          </div>

          {monthlyStats.length > 0 && (
            <div className="flex justify-between mt-3 text-xs text-gray-400 gap-2">
              {monthlyStats.map((data, index) => (
                <span
                  key={`${data.month}-label-${index}`}
                  className="flex-1 text-center truncate"
                  title={data.month}
                >
                  {data.month}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* COMPLIANCE SUMMARY */}
      <Card title="Compliance Overview">
        <div className="mt-4">

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Overall Compliance
            </span>

            <span className="text-sm font-bold text-primary">
              {Math.min(
                Math.max(complianceRate, 0),
                100
              ).toFixed(1)}
              %
            </span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(
                  Math.max(complianceRate, 0),
                  100
                )}%`
              }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">
                Inspections
              </p>
              <p className="text-xl font-bold text-primary mt-1">
                {totalInspections}
              </p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-500">
                Compliant
              </p>
              <p className="text-xl font-bold text-green-700 mt-1">
                {compliantInspections}
              </p>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-xs text-gray-500">
                Review Required
              </p>
              <p className="text-xl font-bold text-orange-700 mt-1">
                {potentialViolations}
              </p>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-xs text-gray-500">
                Critical
              </p>
              <p className="text-xl font-bold text-red-700 mt-1">
                {criticalViolations}
              </p>
            </div>

          </div>
        </div>
      </Card>

      {/* SCHEDULE MANAGER */}
      <Card title="Schedule Manager Tableau">
        <div className="overflow-x-auto mt-4">

          <table className="w-full text-left border-collapse">

            <thead>
              <tr className="border-b border-border text-sm text-gray-500">

                <th className="py-3 px-4 font-medium">
                  Schedule ID
                </th>

                <th className="py-3 px-4 font-medium">
                  Target / Manufacturer
                </th>

                <th className="py-3 px-4 font-medium">
                  Date
                </th>

                <th className="py-3 px-4 font-medium">
                  Assigned Officer
                </th>

                <th className="py-3 px-4 font-medium">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {scheduledInspections.map((schedule, index) => {

                const id = getScheduleValue(
                  schedule,
                  ['id', 'scheduleId', '_id']
                );

                const target = getScheduleValue(
                  schedule,
                  [
                    'target',
                    'manufacturer',
                    'targetManufacturer',
                    'product'
                  ]
                );

                const date = getScheduleValue(
                  schedule,
                  ['date', 'scheduledDate', 'inspectionDate']
                );

                const officer = getScheduleValue(
                  schedule,
                  [
                    'officer',
                    'assignedOfficer',
                    'officerName'
                  ]
                );

                const status = getScheduleValue(
                  schedule,
                  ['status'],
                  'Scheduled'
                );

                return (
                  <tr
                    key={id !== '-' ? id : index}
                    className="border-b border-border/50 hover:bg-bg-soft transition-colors"
                  >

                    <td className="py-3 px-4 font-medium text-primary">
                      {id}
                    </td>

                    <td className="py-3 px-4 text-gray-700">
                      {target}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      {formatDate(date)}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      {officer}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getScheduleStatusClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </td>

                  </tr>
                );
              })}

              {scheduledInspections.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-10 text-center"
                  >
                    <CalendarDays className="w-8 h-8 text-gray-300 mx-auto mb-2" />

                    <p className="text-sm text-gray-500">
                      No scheduled inspections available.
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Schedule data will appear here when provided by the backend.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </Card>

      {/* LAST UPDATED / DATA SOURCE */}
      <div className="flex items-center justify-between text-xs text-gray-400 pb-4">
        <span>
          Analytics are loaded from the LegalScan AI backend.
        </span>

        <span>
          {dashboard?.updatedAt
            ? `Updated ${formatDate(dashboard.updatedAt)}`
            : 'Live API data'}
        </span>
      </div>

    </div>
  );
};

export default Analytics;