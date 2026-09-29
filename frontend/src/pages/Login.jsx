// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { authAPI } from '../services/api';

// // const Login = () => {
// //   const [email, setEmail] = useState('officer@legalscan.gov');
// //   const [password, setPassword] = useState('password123');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);
    
// //     try {
// //       const res = await authAPI.login({ email, password });
// //       if (res.data.success) {
// //         authAPI.setToken(res.data.data.token);
// //         localStorage.setItem('user', JSON.stringify(res.data.data));
// //         navigate('/dashboard');
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Failed to log in');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-4">
// //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
// //         <div className="text-center mb-8">
// //           <h1 className="text-2xl font-bold text-gray-900">LEGALSCAN AI</h1>
// //           <p className="text-gray-500 mt-2">Officer Enforcement Portal</p>
// //         </div>
        
// //         {error && (
// //           <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
// //             {error}
// //           </div>
// //         )}
        
// //         <form onSubmit={handleLogin} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
// //             <input 
// //               type="email" 
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97706] focus:border-transparent outline-none"
// //               required
// //             />
// //           </div>
          
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
// //             <input 
// //               type="password" 
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97706] focus:border-transparent outline-none"
// //               required
// //             />
// //           </div>
          
// //           <button 
// //             type="submit" 
// //             disabled={loading}
// //             className="w-full bg-[#1a1a1a] text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
// //           >
// //             {loading ? 'Authenticating...' : 'Sign In'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { authAPI } from '../services/api';

// const Login = () => {
//   const [email, setEmail] = useState('officer@legalscan.gov');
//   const [password, setPassword] = useState('password123');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setError('');
//     setLoading(true);

//     try {
//       console.log('🔐 Attempting login...');

//       const res = await authAPI.login({
//         email: email.trim(),
//         password
//       });

//       console.log('Login response:', res.data);

//       // Check API response
//       if (!res.data?.success) {
//         throw new Error(
//           res.data?.message || 'Login failed'
//         );
//       }

//       // Get token from response
//       const token = res.data?.data?.token;

//       if (!token) {
//         throw new Error(
//           'Login successful, but no authentication token was returned by the server.'
//         );
//       }

//       // Save JWT token
//       authAPI.setToken(token);

//       // Save user information
//       if (res.data?.data) {
//         localStorage.setItem(
//           'user',
//           JSON.stringify(res.data.data)
//         );
//       }

//       // Verify token was actually saved
//       const savedToken = localStorage.getItem('token');

//       if (!savedToken) {
//         throw new Error(
//           'Authentication token could not be saved.'
//         );
//       }

//       console.log('✅ Login successful');
//       console.log('✅ JWT token saved');
//       console.log('➡️ Redirecting to dashboard...');

//       navigate('/dashboard', {
//         replace: true
//       });

//     } catch (err) {
//       console.error('❌ Login error:', err);

//       const message =
//         err.response?.data?.message ||
//         err.message ||
//         'Failed to log in. Please check your credentials.';

//       setError(message);

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-4">

//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

//         {/* Header */}
//         <div className="text-center mb-8">

//           <h1 className="text-2xl font-bold text-gray-900">
//             LEGALSCAN AI
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Officer Enforcement Portal
//           </p>

//         </div>


//         {/* Error */}
//         {error && (
//           <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg mb-6 text-sm">
//             {error}
//           </div>
//         )}


//         {/* Login Form */}
//         <form
//           onSubmit={handleLogin}
//           className="space-y-4"
//         >
          

//           {/* Email */}
//           <div>

//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>

//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter officer email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97706] focus:border-transparent outline-none"
//               autoComplete="email"
//               required
//             />

//           </div>


//           {/* Password */}
//           <div>

//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>

//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97706] focus:border-transparent outline-none"
//               autoComplete="current-password"
//               required
//             />

//           </div>


//           {/* Login Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#1a1a1a] text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >

//             {loading
//               ? 'Authenticating...'
//               : 'Sign In'}

//           </button>

//         </form>

//       </div>

//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('officer@legalscan.gov');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      console.log('🔐 Attempting login...');

      const res = await authAPI.login({
        email: email.trim(),
        password
      });

      console.log('Login response:', res.data);

      // Check API response
      if (!res.data?.success) {
        throw new Error(
          res.data?.message || 'Login failed'
        );
      }

      // Get token from response
      const token = res.data?.data?.token;

      if (!token) {
        throw new Error(
          'Login successful, but no authentication token was returned by the server.'
        );
      }

      // Save JWT token
      authAPI.setToken(token);

      // Save user information
      if (res.data?.data) {
        localStorage.setItem(
          'user',
          JSON.stringify(res.data.data)
        );
      }

      // Verify token was actually saved
      const savedToken = localStorage.getItem('token');

      if (!savedToken) {
        throw new Error(
          'Authentication token could not be saved.'
        );
      }

      console.log('✅ Login successful');
      console.log('✅ JWT token saved');
      console.log('➡️ Redirecting to dashboard...');

      navigate('/dashboard', {
        replace: true
      });

    } catch (err) {
      console.error('❌ Login error:', err);

      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to log in. Please check your credentials.';

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-2xl font-bold text-gray-900">
            LEGALSCAN AI
          </h1>

          <p className="text-gray-500 mt-2">
            Officer Enforcement Portal
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter officer email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97706] focus:border-transparent outline-none"
              autoComplete="email"
              required
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97706] focus:border-transparent outline-none"
              autoComplete="current-password"
              required
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a1a1a] text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? 'Authenticating...'
              : 'Sign In'}
          </button>

        </form>

        {/* Signup Link */}
        <div className="text-center mt-5">

          <p className="text-sm text-gray-500">
            Don't have an account?{' '}

            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="font-medium text-[#d97706] hover:underline"
            >
              Create Account
            </button>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;