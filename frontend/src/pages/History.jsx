// import React, { useState } from 'react';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import { Search } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useSeedData } from '../context/SeedDataContext';

// const History = () => {
//   const navigate = useNavigate();
//   const { getInspectionsWithDetails } = useSeedData();
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const historyData = getInspectionsWithDetails();

//   const filteredHistory = historyData.filter(item => 
//     item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-8 max-w-6xl mx-auto p-4">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-primary">Inspection History</h1>
//           <p className="text-gray-500 mt-1">Review past inspections and their outcomes.</p>
//         </div>
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search inspections..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
//           />
//         </div>
//       </div>

//       <Card>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-border text-sm text-gray-500">
//                 <th className="py-3 px-4 font-medium">Inspection ID</th>
//                 <th className="py-3 px-4 font-medium">Date</th>
//                 <th className="py-3 px-4 font-medium">Product</th>
//                 <th className="py-3 px-4 font-medium">Manufacturer</th>
//                 <th className="py-3 px-4 font-medium">Status</th>
//                 <th className="py-3 px-4 font-medium">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredHistory.map((item, idx) => (
//                 <tr key={idx} className="border-b border-border/50 hover:bg-bg-soft transition-colors">
//                   <td className="py-3 px-4 font-medium text-primary">{item.id}</td>
//                   <td className="py-3 px-4 text-gray-600">{item.date}</td>
//                   <td className="py-3 px-4 text-gray-600">{item.productName}</td>
//                   <td className="py-3 px-4 text-gray-600">{item.manufacturerName}</td>
//                   <td className="py-3 px-4">
//                     <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                       item.status === 'Compliant' ? 'bg-green-100 text-green-700' :
//                       item.status === 'Violations Found' ? 'bg-red-100 text-red-700' :
//                       'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <Button variant="outline" className="text-xs py-1" onClick={() => navigate(`/results/${item.id}`)}>View</Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {filteredHistory.length === 0 && <div className="p-4 text-center text-gray-500">No inspections found.</div>}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default History;


import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { inspectionsAPI } from '../services/api';

const History = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await inspectionsAPI.getAll({
        limit: 100,
        sort: '-createdAt'
      });

      const inspections = response.data?.data || [];

      const formattedData = inspections.map((inspection) => ({
        id: inspection.inspectionId,
        date: inspection.inspectionDate
          ? new Date(inspection.inspectionDate).toLocaleDateString('en-IN')
          : inspection.createdAt
            ? new Date(inspection.createdAt).toLocaleDateString('en-IN')
            : '-',

        productName:
          inspection.commodityName ||
          inspection.productId?.name ||
          inspection.productId?.productName ||
          'Product',

        manufacturerName:
          inspection.productId?.manufacturer?.name ||
          inspection.productId?.manufacturerName ||
          '—',

        status:
          inspection.complianceStatus === 'COMPLIANT'
            ? 'Compliant'
            : inspection.complianceStatus === 'POTENTIAL_VIOLATION'
              ? 'Violations Found'
              : 'Pending Review'
      }));

      setHistoryData(formattedData);
    } catch (err) {
      console.error('❌ Failed to load inspection history:', err);
      setError(
        err.response?.data?.message ||
        'Failed to load inspection history.'
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = historyData.filter((item) => {
    const search = searchTerm.toLowerCase();

    return (
      item.id?.toLowerCase().includes(search) ||
      item.productName?.toLowerCase().includes(search) ||
      item.manufacturerName?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Inspection History
          </h1>

          <p className="text-gray-500 mt-1">
            Review past inspections and their outcomes.
          </p>
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search inspections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">

          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading inspection history...
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">
              {error}
            </div>
          ) : (
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="border-b border-border text-sm text-gray-500">
                  <th className="py-3 px-4 font-medium">
                    Inspection ID
                  </th>

                  <th className="py-3 px-4 font-medium">
                    Date
                  </th>

                  <th className="py-3 px-4 font-medium">
                    Product
                  </th>

                  <th className="py-3 px-4 font-medium">
                    Manufacturer
                  </th>

                  <th className="py-3 px-4 font-medium">
                    Status
                  </th>

                  <th className="py-3 px-4 font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border/50 hover:bg-bg-soft transition-colors"
                  >

                    {/* Inspection ID */}
                    <td className="py-3 px-4 font-medium text-primary">
                      {item.id}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-gray-600">
                      {item.date}
                    </td>

                    {/* Product */}
                    <td className="py-3 px-4 text-gray-600">
                      {item.productName}
                    </td>

                    {/* Manufacturer */}
                    <td className="py-3 px-4 text-gray-600">
                      {item.manufacturerName}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          item.status === 'Compliant'
                            ? 'bg-green-100 text-green-700'
                            : item.status === 'Violations Found'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        className="text-xs py-1"
                        onClick={() =>
                          navigate(`/results/${item.id}`)
                        }
                      >
                        View
                      </Button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          )}

          {!loading &&
            !error &&
            filteredHistory.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No inspections found.
              </div>
            )}

        </div>
      </Card>
    </div>
  );
};

export default History;
