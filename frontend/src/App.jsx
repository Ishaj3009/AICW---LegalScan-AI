// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import Layout from './components/Layout';
// // import Dashboard from './pages/Dashboard';
// // import NewInspection from './pages/NewInspection';
// // import Processing from './pages/Processing';
// // import InspectionResult from './pages/InspectionResult';

// // import History from './pages/History';
// // import Violations from './pages/Violations';
// // import Products from './pages/Products';
// // import Manufacturers from './pages/Manufacturers';
// // import Analytics from './pages/Analytics';
// // import Reports from './pages/Reports';
// // import Rules from './pages/Rules';
// // import Settings from './pages/Settings';
// // import { SeedDataProvider } from './context/SeedDataContext';

// // function App() {
// //   return (
// //     <SeedDataProvider>
// //       <Router>
// //         <Routes>
// //         <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
// //         {/* Core App Layout */}
// //         <Route element={<Layout />}>
// //           <Route path="/dashboard" element={<Dashboard />} />
// //           <Route path="/inspect" element={<NewInspection />} />
// //           <Route path="/processing" element={<Processing />} />
// //           <Route path="/results/:id" element={<InspectionResult />} />
// //           <Route path="/history" element={<History />} />
// //           <Route path="/violations" element={<Violations />} />
// //           <Route path="/products" element={<Products />} />
// //           <Route path="/manufacturers" element={<Manufacturers />} />
// //           <Route path="/analytics" element={<Analytics />} />
// //           <Route path="/reports" element={<Reports />} />
// //           <Route path="/rules" element={<Rules />} />
// //           <Route path="/settings" element={<Settings />} />
// //         </Route>
        
// //         <Route path="*" element={<div className="h-screen flex items-center justify-center flex-col"><h1 className="text-4xl font-editorial font-bold text-primary">404</h1><p className="text-gray-500 mt-2">Page Not Found</p></div>} />
// //         </Routes>
// //       </Router>
// //     </SeedDataProvider>
// //   );
// // }

// // export default App;


// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate
// } from 'react-router-dom';

// import Layout from './components/Layout';

// import Dashboard from './pages/Dashboard';
// import NewInspection from './pages/NewInspection';
// import Processing from './pages/Processing';
// import InspectionResult from './pages/InspectionResult';

// import History from './pages/History';
// import Violations from './pages/Violations';
// import Products from './pages/Products';
// import Manufacturers from './pages/Manufacturers';
// import Analytics from './pages/Analytics';
// import Reports from './pages/Reports';
// import Rules from './pages/Rules';
// import Settings from './pages/Settings';

// import Login from './pages/Login';
// import Signup from './pages/Signup';

// import { SeedDataProvider } from './context/SeedDataContext';


// // ============================================================
// // AUTHENTICATION CHECK
// // ============================================================

// const isAuthenticated = () => {
//   return !!localStorage.getItem('token');
// };


// // ============================================================
// // PROTECTED ROUTE
// // ============================================================

// const ProtectedRoute = ({ children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };


// // ============================================================
// // PUBLIC ROUTE
// // ============================================================

// const PublicRoute = ({ children }) => {
//   if (isAuthenticated()) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };


// // ============================================================
// // APP
// // ============================================================

// function App() {
//   return (
//     <SeedDataProvider>
//       <Router>

//         <Routes>

//           {/* ==================================================
//               PUBLIC ROUTES
//           ================================================== */}

//           <Route
//             path="/login"
//             element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             }
//           />

//           <Route
//   path="/signup"
//   element={
//     <PublicRoute>
//       <Signup />
//     </PublicRoute>
//   }
// />


//           {/* ==================================================
//               PROTECTED APPLICATION ROUTES
//           ================================================== */}

//           <Route
//             element={
//               <ProtectedRoute>
//                 <Layout />
//               </ProtectedRoute>
//             }
//           >

//             <Route
//               path="/dashboard"
//               element={<Dashboard />}
//             />

//             <Route
//               path="/inspect"
//               element={<NewInspection />}
//             />

//             <Route
//   path="/processing"
//   element={<Processing />}
// />

// <Route
//   path="/processing/:inspectionId"
//   element={<Processing />}
// />

//             <Route
//               path="/results/:id"
//               element={<InspectionResult />}
//             />

//             <Route
//               path="/history"
//               element={<History />}
//             />

//             <Route
//               path="/violations"
//               element={<Violations />}
//             />

//             <Route
//               path="/products"
//               element={<Products />}
//             />

//             <Route
//               path="/manufacturers"
//               element={<Manufacturers />}
//             />

//             <Route
//               path="/analytics"
//               element={<Analytics />}
//             />

//             <Route
//               path="/reports"
//               element={<Reports />}
//             />

//             <Route
//               path="/rules"
//               element={<Rules />}
//             />

//             <Route
//               path="/settings"
//               element={<Settings />}
//             />

//           </Route>


//           {/* ==================================================
//               ROOT
//           ================================================== */}

//           <Route
//             path="/"
//             element={
//               <Navigate
//                 to={
//                   isAuthenticated()
//                     ? "/dashboard"
//                     : "/login"
//                 }
//                 replace
//               />
//             }
//           />


//           {/* ==================================================
//               404
//           ================================================== */}

//           <Route
//             path="*"
//             element={
//               <div className="h-screen flex items-center justify-center flex-col">
//                 <h1 className="text-4xl font-editorial font-bold text-primary">
//                   404
//                 </h1>

//                 <p className="text-gray-500 mt-2">
//                   Page Not Found
//                 </p>
//               </div>
//             }
//           />

//         </Routes>

//       </Router>
//     </SeedDataProvider>
//   );
// }

// export default App;


import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import NewInspection from './pages/NewInspection';
import Processing from './pages/Processing';
import InspectionResult from './pages/InspectionResult';

import History from './pages/History';
import Violations from './pages/Violations';
import Products from './pages/Products';
import Manufacturers from './pages/Manufacturers';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Rules from './pages/Rules';
import Settings from './pages/Settings';

import Login from './pages/Login';
import Signup from './pages/Signup';

import { SeedDataProvider } from './context/SeedDataContext';


// ============================================================
// AUTHENTICATION CHECK
// ============================================================

const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  return Boolean(
    token &&
    token.trim() !== ''
  );
};


// ============================================================
// PROTECTED ROUTE
// ============================================================

const ProtectedRoute = ({ children }) => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};


// ============================================================
// PUBLIC ROUTE
// ============================================================

const PublicRoute = ({ children }) => {
  const authenticated = isAuthenticated();

  if (authenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};


// ============================================================
// APP
// ============================================================

function App() {
  return (
    <SeedDataProvider>

      <Router>

        <Routes>

          {/* ==================================================
              PUBLIC ROUTES
          ================================================== */}

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />


          {/* ==================================================
              PROTECTED APPLICATION ROUTES
          ================================================== */}

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* New Inspection */}
            <Route
              path="/inspect"
              element={<NewInspection />}
            />

            {/* Processing */}
            <Route
              path="/processing"
              element={<Processing />}
            />

            <Route
              path="/processing/:inspectionId"
              element={<Processing />}
            />

            {/* Inspection Result */}
            <Route
              path="/results/:id"
              element={<InspectionResult />}
            />

            {/* Inspection History */}
            <Route
              path="/history"
              element={<History />}
            />

            {/* Violations */}
            <Route
              path="/violations"
              element={<Violations />}
            />

            {/* Products */}
            <Route
              path="/products"
              element={<Products />}
            />

            {/* Manufacturers */}
            <Route
              path="/manufacturers"
              element={<Manufacturers />}
            />

            {/* Analytics */}
            <Route
              path="/analytics"
              element={<Analytics />}
            />

            {/* Reports */}
            <Route
              path="/reports"
              element={<Reports />}
            />

            {/* Rules */}
            <Route
              path="/rules"
              element={<Rules />}
            />

            {/* Settings */}
            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>


          {/* ==================================================
              ROOT ROUTE
          ================================================== */}

          <Route
            path="/"
            element={
              <Navigate
                to={
                  isAuthenticated()
                    ? "/dashboard"
                    : "/login"
                }
                replace
              />
            }
          />


          {/* ==================================================
              404
          ================================================== */}

          <Route
            path="*"
            element={
              <div className="h-screen flex items-center justify-center flex-col">

                <h1 className="text-4xl font-editorial font-bold text-primary">
                  404
                </h1>

                <p className="text-gray-500 mt-2">
                  Page Not Found
                </p>

                <button
                  onClick={() => {
                    window.location.href = '/dashboard';
                  }}
                  className="mt-6 px-5 py-2 bg-[#1a1a1a] text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  Go to Dashboard
                </button>

              </div>
            }
          />

        </Routes>

      </Router>

    </SeedDataProvider>
  );
}

export default App;