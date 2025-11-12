// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import clusterData from "../data/clusterdata.json"; // ✅ clusterData import

// const SlumMasterPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [slums, setSlums] = useState([]);

//   // ✅ clusterData.json मधून cluster numbers घेणे
//   const clusterOptions = clusterData.map((item) => item.cluster_number);

//   const formik = useFormik({
//     initialValues: {
//       clusterNumber: "",
//       slumId: "",
//       slumName: "",
//     },
//     validationSchema: Yup.object({
//       clusterNumber: Yup.string().required("Cluster Number is required"),
//       slumId: Yup.string()
//         .required("Slum ID is required")
//         .matches(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
//       slumName: Yup.string().required("Slum Name is required"),
//     }),
//     onSubmit: (values, { resetForm }) => {
//       const newSlum = {
//         id: slums.length + 1,
//         clusterNumber: values.clusterNumber,
//         slumId: values.slumId,
//         slumName: values.slumName,
//       };
//       setSlums([...slums, newSlum]);
//       resetForm();
//       setShowForm(false);
//     },
//   });

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">SLUM MASTER</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//         >
//           {showForm ? "X" : "+ Add Slum"}
//         </button>
//       </div>

//       {/* Form Section */}
//       {showForm && (
//         <form
//           onSubmit={formik.handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Cluster Number Dropdown */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Cluster Number
//               </label>
//               <select
//                 name="clusterNumber"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.clusterNumber}
//                 className={`w-full border ${
//                   formik.touched.clusterNumber && formik.errors.clusterNumber
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//               >
//                 <option value="">Select Cluster</option>
//                 {/* ✅ JSON मधून dynamic cluster numbers */}
//                 {clusterOptions.map((cluster, index) => (
//                   <option key={index} value={cluster}>
//                     {cluster}
//                   </option>
//                 ))}
//               </select>
//               {formik.touched.clusterNumber && formik.errors.clusterNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.clusterNumber}
//                 </p>
//               )}
//             </div>

//             {/* Slum ID */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Slum ID
//               </label>
//               <input
//                 type="text"
//                 name="slumId"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.slumId}
//                 placeholder="Enter Slum ID"
//                 className={`w-full border ${
//                   formik.touched.slumId && formik.errors.slumId
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//               />
//               {formik.touched.slumId && formik.errors.slumId && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.slumId}
//                 </p>
//               )}
//             </div>

//             {/* Slum Name */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Slum Name
//               </label>
//               <input
//                 type="text"
//                 name="slumName"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.slumName}
//                 placeholder="Enter Slum Name"
//                 className={`w-full border ${
//                   formik.touched.slumName && formik.errors.slumName
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
//               />
//               {formik.touched.slumName && formik.errors.slumName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.slumName}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Save Button */}
//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//             >
//               Save Slum
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Table Section */}
//       <div className="bg-white rounded-lg shadow-md border border-gray-100">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                 SR. NO.
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                 CLUSTER NUMBER
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                 SLUM ID
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                 SLUM NAME
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {slums.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center py-6 text-gray-500 italic">
//                   No slums added yet
//                 </td>
//               </tr>
//             ) : (
//               slums.map((slum, index) => (
//                 <tr
//                   key={slum.id}
//                   className="hover:bg-blue-50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-3 text-sm text-gray-700">
//                     {index + 1}
//                   </td>
//                   <td className="px-6 py-3 text-sm font-medium text-gray-800">
//                     {slum.clusterNumber}
//                   </td>
//                   <td className="px-6 py-3 text-sm text-gray-700">
//                     {slum.slumId}
//                   </td>
//                   <td className="px-6 py-3 text-sm text-gray-700">
//                     {slum.slumName}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SlumMasterPage;


// =========================================================================================


// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4200";

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("authToken");
// };

// const SlumMasterPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [slums, setSlums] = useState([]);
//   const [clusters, setClusters] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [allSlums, setAllSlums] = useState([]); // all slums from API


//   useEffect(() => {
//     fetchClusters();
//     fetchSlums();
//   }, []);

//   const fetchClusters = async () => {
//     const token = getAuthToken();
//     if (!token) {
//       setError("Please login to view clusters");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/clusters/all`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch clusters");
//       }

//       const data = await response.json();
//       setClusters(data || []);
//     } catch (err) {
//       console.error("Error fetching clusters:", err);
//       setError(err.message);
//     }
//   };

//   const fetchSlums = async () => {
//     const token = getAuthToken();
//     if (!token) {
//       setError("Please login to view slums");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/api/slums/all`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch slums");
//       }

//       const data = await response.json();
//       setSlums(data || []);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching slums:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       clusterNumber: "",
//       slumId: "",
//       slumName: "",
//     },
//     validationSchema: Yup.object({
//       clusterNumber: Yup.string().required("Cluster Number is required"),
//       slumId: Yup.string()
//         .required("Slum ID is required")
//         .matches(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
//       slumName: Yup.string().required("Slum Name is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       const token = getAuthToken();

//       if (!token) {
//         alert("Access token missing! Please login first.");
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await fetch(`${API_BASE_URL}/api/slums/add`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             slum_id: values.slumId,
//             slum_name: values.slumName,
//             cluster_number: values.clusterNumber,
//           }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to add slum");
//         }

//         alert(data.message || "Slum added successfully!");
//         resetForm();
//         setShowForm(false);
//         fetchSlums();
//         setError(null);
//       } catch (err) {
//         console.error("Error adding slum:", err);
//         alert(err.message || "Something went wrong while adding slum.");
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">SLUM MASTER</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//         >
//           {showForm ? "X" : "+ Add Slum"}
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4">
//           {error}
//         </div>
//       )}

//       {showForm && (
//         <form
//           onSubmit={formik.handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Cluster Number
//               </label>
//               <select
//                 name="clusterNumber"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.clusterNumber}
//                 className={`w-full border ${
//                   formik.touched.clusterNumber && formik.errors.clusterNumber
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//               >
//                 <option value="">Select Cluster</option>
//                 {clusters.map((cluster) => (
//                   <option key={cluster.id} value={cluster.cluster_number}>
//                     {cluster.cluster_number} - {cluster.cluster_name}
//                   </option>
//                 ))}
//               </select>
//               {formik.touched.clusterNumber && formik.errors.clusterNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.clusterNumber}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Slum ID
//               </label>
//               <input
//                 type="text"
//                 name="slumId"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.slumId}
//                 placeholder="Enter Slum ID"
//                 className={`w-full border ${
//                   formik.touched.slumId && formik.errors.slumId
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//               />
//               {formik.touched.slumId && formik.errors.slumId && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.slumId}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Slum Name
//               </label>
//               <input
//                 type="text"
//                 name="slumName"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.slumName}
//                 placeholder="Enter Slum Name"
//                 className={`w-full border ${
//                   formik.touched.slumName && formik.errors.slumName
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
//               />
//               {formik.touched.slumName && formik.errors.slumName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.slumName}
//                 </p>
//               )}
//             </div>

//              <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Ward Name
//               </label>
//               <input
//                 type="text"
//                 name="ward"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.ward}
//                 placeholder="Enter ward Name"
               
//               />
          
//             </div>
//               <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 District Name
//               </label>
//               <input
//                 type="text"
//                 name="district"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.district}
//                 placeholder="Enter district Name"
//               />
//             </div>
//               <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Taluka Name
//               </label>
//               <input
//                 type="text"
//                 name="taluka"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.taluka}
//                 placeholder="Enter taluka Name"
//               />
//             </div>
//              <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//               Municipal Corporation
//               </label>
//               <input
//                 type="text"
//                 name="municipal_corporation"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.municipal_corporation}
//                 placeholder="Enter Municipal Corporation"
//               />
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow disabled:opacity-50"
//             >
//               {loading ? "Saving..." : "Save Slum"}
//             </button>
//           </div>
//         </form>
//       )}

//       <div className="bg-white rounded-lg shadow-md border border-gray-100">
//         {loading && slums.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="text-gray-500 mt-2">Loading slums...</p>
//           </div>
//         ) : (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   SR. NO.
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   CLUSTER NUMBER
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   SLUM ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   SLUM NAME
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {slums.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="text-center py-6 text-gray-500 italic">
//                     No slums added yet
//                   </td>
//                 </tr>
//               ) : (
//                 slums.map((slum, index) => (
//                   <tr
//                     key={slum.id}
//                     className="hover:bg-blue-50 transition-colors duration-200"
//                   >
//                     <td className="px-6 py-3 text-sm text-gray-700">
//                       {index + 1}
//                     </td>
//                     <td className="px-6 py-3 text-sm font-medium text-gray-800">
//                       {slum.cluster_number}
//                     </td>
//                     <td className="px-6 py-3 text-sm text-gray-700">
//                       {slum.slum_id}
//                     </td>
//                     <td className="px-6 py-3 text-sm text-gray-700">
//                       {slum.slum_name}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SlumMasterPage;

// ==================================================================================


// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import mumbaiDistrict from "../data/mumbaiDistrict.json"; // <-- [{ "districtName": "Mumbai City" }, { "districtName": "Mumbai Suburban" }]
// import toast, { Toaster } from "react-hot-toast"
// import { Eye, Search, Download,X,ChevronLeft,ChevronRight,Plus,Edit } from "lucide-react"

// const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4200";

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("authToken");
// };

// const SlumMasterPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [slums, setSlums] = useState([]);
//   const [clusters, setClusters] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // 👉 Taluka list based on district
//   const talukaOptions = {
//     "Mumbai City": ["Fort", "Colaba", "Byculla", "Malabar Hill", "Tardeo"],
//     "Mumbai Suburban": ["Andheri", "Bandra", "Borivali", "Kurla", "Chembur"],
//   };

//   useEffect(() => {
//     fetchClusters();
//     fetchSlums();
//   }, []);

//   const fetchClusters = async () => {
//     const token = getAuthToken();
//     if (!token) {
//       setError("Please login to view clusters");
//       return;
//     }
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/clusters/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error("Failed to fetch clusters");
//       const data = await response.json();
//       setClusters(data || []);
//     } catch (err) {
//       console.error("Error fetching clusters:", err);
//       setError(err.message);
//     }
//   };

//   const fetchSlums = async () => {
//     const token = getAuthToken();
//     if (!token) {
//       setError("Please login to view slums");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/api/slums/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error("Failed to fetch slums");
//       const data = await response.json();
//       setSlums(data || []);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching slums:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch cluster details by cluster_number
//   const fetchClusterDetails = async (cluster_number) => {
//     if (!cluster_number) return;
//     const token = getAuthToken();
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/clusters/${cluster_number}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error("Failed to fetch cluster details");
//       const data = await response.json();

//       formik.setFieldValue("district", data.district || "");
//       formik.setFieldValue("taluka", data.taluka || "");
//       formik.setFieldValue("ward", data.ward || "");
//       formik.setFieldValue("municipal_corporation", data.municipal_corporation || "BMC");
//     } catch (err) {
//       console.error("Error fetching cluster details:", err);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       cluster_number: "",
//       slum_id: "",
//       slum_name: "",
//       district: "",
//       taluka: "",
//       ward: "",
//       municipal_corporation: "BMC", // default
//     },
//     validationSchema: Yup.object({
//       cluster_number: Yup.string().required("Cluster Number is required"),
//       slum_id: Yup.string().required("Slum ID is required"),
//       slum_name: Yup.string().required("Slum Name is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       const token = getAuthToken();
//       if (!token) {
//         alert("Access token missing! Please login first.");
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await fetch(`${API_BASE_URL}/api/slums/add`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(values),
//         });

//         const data = await response.json();
//         if (!response.ok) throw new Error(data.message || "Failed to add slum");

//         // alert(data.message || "Slum added successfully!");
//                 toast.success(data.message || "Slum added successfully!"); // replaced alert
        
//         resetForm();
//         setShowForm(false);
//         fetchSlums();
//       } catch (err) {
//         console.error("Error adding slum:", err);
//         alert(err.message || "Something went wrong while adding slum.");
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="p-6">
//            <Toaster position="top-right" reverseOrder={false} />  {/* Add this once at the top */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">SLUM MASTER</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//         >
//           {showForm ? "X" : "+ Add Slum"}
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4">
//           {error}
//         </div>
//       )}

//       {showForm && (
//         <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//             {/* Cluster Number */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">Cluster Number</label>
//               <select
//                 name="cluster_number"
//                 onChange={(e) => {
//                   formik.handleChange(e);
//                   fetchClusterDetails(e.target.value);
//                 }}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.cluster_number}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               >
//                 <option value="">Select Cluster</option>
//                 {clusters.map((cluster) => (
//                   <option key={cluster.id} value={cluster.cluster_number}>
//                     {cluster.cluster_number} - {cluster.cluster_name}
//                   </option>
//                 ))}
//               </select>
//               {formik.touched.cluster_number && formik.errors.cluster_number && (
//                 <p className="text-red-500 text-sm mt-1">{formik.errors.cluster_number}</p>
//               )}
//             </div>

//             {/* Slum ID */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">Slum ID</label>
//               <input
//                 type="text"
//                 name="slum_id"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.slum_id}
//                 placeholder="Enter Slum ID"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               />
//               {formik.touched.slum_id && formik.errors.slum_id && (
//                 <p className="text-red-500 text-sm mt-1">{formik.errors.slum_id}</p>
//               )}
//             </div>

//             {/* Slum Name */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">Slum Name</label>
//               <input
//                 type="text"
//                 name="slum_name"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.slum_name}
//                 placeholder="Enter Slum Name"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               />
//               {formik.touched.slum_name && formik.errors.slum_name && (
//                 <p className="text-red-500 text-sm mt-1">{formik.errors.slum_name}</p>
//               )}
//             </div>

//             {/* Ward */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">Ward</label>
//               <input
//                 type="text"
//                 name="ward"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.ward}
//                 placeholder="Enter Ward Name"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               />
//             </div>

//             {/* District Dropdown */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">District</label>
//               <select
//                 name="district"
//                 onChange={(e) => {
//                   formik.handleChange(e);
//                   formik.setFieldValue("taluka", ""); // reset taluka when district changes
//                 }}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.district}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               >
//                 <option value="">Select District</option>
//                 {mumbaiDistrict.map((d, i) => (
//                   <option key={i} value={d.districtName}>
//                     {d.districtName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Taluka Dropdown (depends on district) */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">Taluka</label>
//               <select
//                 name="taluka"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.taluka}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               >
//                 <option value="">Select Taluka</option>
//                 {formik.values.district &&
//                   talukaOptions[formik.values.district]?.map((t, i) => (
//                     <option key={i} value={t}>
//                       {t}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             {/* Municipal Corporation - auto BMC */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Municipal Corporation
//               </label>
//               <input
//                 type="text"
//                 name="municipal_corporation"
//                 value={formik.values.municipal_corporation}
//                 readOnly
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700"
//               />
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow disabled:opacity-50"
//             >
//               {loading ? "Saving..." : "Save Slum"}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Existing Table (unchanged) */}
//       <div className="bg-white rounded-lg shadow-md border border-gray-100">
//         {loading && slums.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="text-gray-500 mt-2">Loading slums...</p>
//           </div>
//         ) : (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SR. NO.</th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">CLUSTER NUMBER</th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SLUM ID</th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SLUM NAME</th>
//                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ACTION</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {slums.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="text-center py-6 text-gray-500 italic">
//                     No slums added yet
//                   </td>
//                 </tr>
//               ) : (
//                 slums.map((slum, index) => (
//                   <tr key={slum.id} className="hover:bg-blue-50 transition-colors duration-200">
//                     <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
//                     <td className="px-6 py-3 text-sm font-medium text-gray-800">{slum.cluster_number}</td>
//                     <td className="px-6 py-3 text-sm text-gray-700">{slum.slum_id}</td>
//                     <td className="px-6 py-3 text-sm text-gray-700">{slum.slum_name}</td>
//                     <td><button
//                       // onClick={() => {
//                       //   setEditingApplication(app)
//                       //   setShowEditForm(true)
//                       // }}
//                       className="text-orange-600 hover:text-orange-900 transition-colors"
//                       title="Edit Application"
//                     >
//                       <Edit size={20} />
//                     </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SlumMasterPage;


// ==============================================================================

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import mumbaiDistrict from "../data/mumbaiDistrict.json";
import toast, { Toaster } from "react-hot-toast";
import {
  Eye, Search, Download, X, ChevronLeft, ChevronRight,
  Plus, Edit, Loader2
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4200";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

const SlumMasterPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSlum, setEditingSlum] = useState(null);
  const [slums, setSlums] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Taluka list based on district
  const talukaOptions = {
    "Mumbai City": ["Fort", "Colaba", "Byculla", "Malabar Hill", "Tardeo"],
    "Mumbai Suburban": ["Andheri", "Bandra", "Borivali", "Kurla", "Chembur"],
  };

  useEffect(() => {
    fetchClusters();
    fetchSlums();
  }, []);

  const fetchClusters = async () => {
    const token = getAuthToken();
    if (!token) {
      setError("Please login to view clusters");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/clusters/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch clusters");
      const data = await response.json();
      setClusters(data || []);
    } catch (err) {
      console.error("Error fetching clusters:", err);
      setError(err.message);
    }
  };

  const fetchSlums = async () => {
    const token = getAuthToken();
    if (!token) {
      setError("Please login to view slums");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/slums/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch slums");
      const data = await response.json();
      setSlums(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching slums:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cluster details by cluster_number
  const fetchClusterDetails = async (cluster_number) => {
    if (!cluster_number) return;
    const token = getAuthToken();
    try {
      const response = await fetch(`${API_BASE_URL}/api/clusters/${cluster_number}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch cluster details");
      const data = await response.json();

      formik.setFieldValue("district", data.district || "");
      formik.setFieldValue("taluka", data.taluka || "");
      formik.setFieldValue("ward", data.ward || "");
      formik.setFieldValue("municipal_corporation", data.municipal_corporation || "BMC");
    } catch (err) {
      console.error("Error fetching cluster details:", err);
    }
  };

  // Fetch single slum by ID
  const fetchSlumById = async (id) => {
    const token = getAuthToken();
    if (!token) return toast.error("Authentication required");

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/slums/slum/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch slum");
      const data = await response.json();
      setEditingSlum(data);
      setShowEditModal(true);

      // Pre-fill edit form
      editFormik.setValues({
        cluster_number: data.cluster_number || "",
        slum_id: data.slum_id || "",
        slum_name: data.slum_name || "",
        district: data.district || "",
        taluka: data.taluka || "",
        ward: data.ward || "",
        municipal_corporation: data.municipal_corporation || "BMC",
      });
    } catch (err) {
      toast.error(err.message || "Failed to load slum data");
    } finally {
      setLoading(false);
    }
  };

  // Add Slum Formik
  const formik = useFormik({
    initialValues: {
      cluster_number: "",
      slum_id: "",
      slum_name: "",
      district: "",
      taluka: "",
      ward: "",
      municipal_corporation: "BMC",
    },
    validationSchema: Yup.object({
      cluster_number: Yup.string().required("Cluster Number is required"),
      slum_id: Yup.string().required("Slum ID is required"),
      slum_name: Yup.string().required("Slum Name is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const token = getAuthToken();
      if (!token) return toast.error("Access token missing! Please login first.");

      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/slums/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to add slum");

        toast.success(data.message || "Slum added successfully!");
        resetForm();
        setShowForm(false);
        fetchSlums();
      } catch (err) {
        toast.error(err.message || "Something went wrong while adding slum.");
      } finally {
        setLoading(false);
      }
    },
  });

  // Edit Slum Formik
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cluster_number: "",
      slum_id: "",
      slum_name: "",
      district: "",
      taluka: "",
      ward: "",
      municipal_corporation: "BMC",
    },
    validationSchema: Yup.object({
      cluster_number: Yup.string().required("Cluster Number is required"),
      slum_id: Yup.string().required("Slum ID is required"),
      slum_name: Yup.string().required("Slum Name is required"),
    }),
    onSubmit: async (values) => {
      const token = getAuthToken();
      if (!token) return toast.error("Authentication required");

      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/slums/update-slum/${editingSlum.id}`, {
          method: "PUT", // or "PATCH" if your backend supports partial updates
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to update slum");

        toast.success(data.message || "Slum updated successfully!");
        setShowEditModal(false);
        setEditingSlum(null);
        fetchSlums();
      } catch (err) {
        toast.error(err.message || "Failed to update slum");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">SLUM MASTER</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow flex items-center gap-2"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel" : "Add Slum"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Add Slum Form */}
      {/* {showForm && (
        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
         
        </form>
      )} */}

            {showForm && (
        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Cluster Number */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">Cluster Number</label>
              <select
                name="cluster_number"
                onChange={(e) => {
                  formik.handleChange(e);
                  fetchClusterDetails(e.target.value);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.cluster_number}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Cluster</option>
                {clusters.map((cluster) => (
                  <option key={cluster.id} value={cluster.cluster_number}>
                    {cluster.cluster_number} - {cluster.cluster_name}
                  </option>
                ))}
              </select>
              {formik.touched.cluster_number && formik.errors.cluster_number && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.cluster_number}</p>
              )}
            </div>

            {/* Slum ID */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">Slum ID</label>
              <input
                type="text"
                name="slum_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.slum_id}
                placeholder="Enter Slum ID"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {formik.touched.slum_id && formik.errors.slum_id && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.slum_id}</p>
              )}
            </div>

            {/* Slum Name */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">Slum Name</label>
              <input
                type="text"
                name="slum_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.slum_name}
                placeholder="Enter Slum Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {formik.touched.slum_name && formik.errors.slum_name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.slum_name}</p>
              )}
            </div>

            {/* Ward */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">Ward</label>
              <input
                type="text"
                name="ward"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ward}
                placeholder="Enter Ward Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* District Dropdown */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">District</label>
              <select
                name="district"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue("taluka", ""); // reset taluka when district changes
                }}
                onBlur={formik.handleBlur}
                value={formik.values.district}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select District</option>
                {mumbaiDistrict.map((d, i) => (
                  <option key={i} value={d.districtName}>
                    {d.districtName}
                  </option>
                ))}
              </select>
            </div>

            {/* Taluka Dropdown (depends on district) */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">Taluka</label>
              <select
                name="taluka"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.taluka}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Taluka</option>
                {formik.values.district &&
                  talukaOptions[formik.values.district]?.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
              </select>
            </div>

            {/* Municipal Corporation - auto BMC */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Municipal Corporation
              </label>
              <input
                type="text"
                name="municipal_corporation"
                value={formik.values.municipal_corporation}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Slum"}
            </button>
          </div>
        </form>
      )}

      {/* Slums Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        {loading && slums.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading slums...</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SR. NO.</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">CLUSTER NUMBER</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SLUM ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SLUM NAME</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {slums.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                    No slums added yet
                  </td>
                </tr>
              ) : (
                slums.map((slum, index) => (
                  <tr key={slum.id} className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-800">{slum.cluster_number}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{slum.slum_id}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{slum.slum_name}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => fetchSlumById(slum.id)}
                        className="text-orange-600 hover:text-orange-900 transition-colors"
                        title="Edit Slum"
                        disabled={loading}
                      >
                        {loading && editingSlum?.id === slum.id ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <Edit size={20} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingSlum && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Edit Slum</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingSlum(null);
                    editFormik.resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={editFormik.handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Cluster Number */}
                <div>
                  <label className="block text-medium font-medium text-gray-700 mb-1">Cluster Number</label>
                  <select
                    name="cluster_number"
                    onChange={(e) => {
                      editFormik.handleChange(e);
                      fetchClusterDetails(e.target.value);
                    }}
                    onBlur={editFormik.handleBlur}
                    value={editFormik.values.cluster_number}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select Cluster</option>
                    {clusters.map((cluster) => (
                      <option key={cluster.id} value={cluster.cluster_number}>
                        {cluster.cluster_number} - {cluster.cluster_name}
                      </option>
                    ))}
                  </select>
                  {editFormik.touched.cluster_number && editFormik.errors.cluster_number && (
                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.cluster_number}</p>
                  )}
                </div>

                {/* Slum ID */}
                <div>
                  <label className="block text-medium font-medium text-gray-700 mb-1">Slum ID</label>
                  <input
                    type="text"
                    name="slum_id"
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    value={editFormik.values.slum_id}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {editFormik.touched.slum_id && editFormik.errors.slum_id && (
                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.slum_id}</p>
                  )}
                </div>

                {/* Slum Name */}
                <div>
                  <label className="block text-medium font-medium text-gray-700 mb-1">Slum Name</label>
                  <input
                    type="text"
                    name="slum_name"
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    value={editFormik.values.slum_name}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {editFormik.touched.slum_name && editFormik.errors.slum_name && (
                    <p className="text-red-500 text-sm mt-1">{editFormik.errors.slum_name}</p>
                  )}
                </div>

                {/* Ward */}
                <div>
                  <label className="block text-medium font-medium text-gray-700 mb-1">Ward</label>
                  <input
                    type="text"
                    name="ward"
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    value={editFormik.values.ward}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="block text-medium font-medium text-gray-700 mb-1">District</label>
                  <select
                    name="district"
                    onChange={(e) => {
                      editFormik.handleChange(e);
                      editFormik.setFieldValue("taluka", "");
                    }}
                    onBlur={editFormik.handleBlur}
                    value={editFormik.values.district}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select District</option>
                    {mumbaiDistrict.map((d, i) => (
                      <option key={i} value={d.districtName}>{d.districtName}</option>
                    ))}
                  </select>
                </div>

                {/* Taluka */}
                <div>
                  <label className="block text-medium font-medium text-gray-700 mb-1">Taluka</label>
                  <select
                    name="taluka"
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    value={editFormik.values.taluka}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select Taluka</option>
                    {editFormik.values.district &&
                      talukaOptions[editFormik.values.district]?.map((t, i) => (
                        <option key={i} value={t}>{t}</option>
                      ))}
                  </select>
                </div>

                {/* Municipal Corporation */}
                <div>
                  <label className="block text-medium font-medium text-gray-700 mb-1">
                    Municipal Corporation
                  </label>
                  <input
                    type="text"
                    name="municipal_corporation"
                    value={editFormik.values.municipal_corporation}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingSlum(null);
                    editFormik.resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Slum"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlumMasterPage;
