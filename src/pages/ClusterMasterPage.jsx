// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import './ClusterMasterPage.css';
// const ClusterMasterPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [clusters, setClusters] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       clusterNumber: "",
//       clusterName: "",
//     },
//     validationSchema: Yup.object({
//       clusterNumber: Yup.string()
//         .required("Cluster Number is required")
//         .matches(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscore allowed"),
//       clusterName: Yup.string().required("Cluster Name is required"),
//     }),
//     onSubmit: (values, { resetForm }) => {
//       const newCluster = {
//         id: clusters.length + 1,
//         clusterNumber: values.clusterNumber,
//         clusterName: values.clusterName,
//       };
//       setClusters([...clusters, newCluster]);
//       resetForm();
//       setShowForm(false);
//     },
//   });

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">CLUSTER MASTER</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//         >
//           {showForm ? "X" : "+ Add Cluster"}
//         </button>
//       </div>

//       {/* Form Section */}
//       {showForm && (
//         <form
//           onSubmit={formik.handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Cluster Number */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Cluster Number
//               </label>
//               <input
//                 type="text"
//                 name="clusterNumber"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.clusterNumber}
//                 className={`w-full border ${
//                   formik.touched.clusterNumber && formik.errors.clusterNumber
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                 placeholder="Enter Cluster Number"
//               />
//               {formik.touched.clusterNumber && formik.errors.clusterNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.clusterNumber}
//                 </p>
//               )}
//             </div>

//             {/* Cluster Name */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1 clusterLabel">
//                 Cluster Name
//               </label>
//               <input
//                 type="text"
//                 name="clusterName"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.clusterName}
//                 className={`w-full border ${
//                   formik.touched.clusterName && formik.errors.clusterName
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
//                 placeholder="Enter Cluster Name"
//               />
//               {formik.touched.clusterName && formik.errors.clusterName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.clusterName}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"

//             >
//               Save Cluster
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
//                 CLUSTER NAME
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {clusters.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="3"
//                   className="text-center py-6 text-gray-500 italic"
//                 >
//                   No clusters added yet
//                 </td>
//               </tr>
//             ) : (
//               clusters.map((cluster, index) => (
//                 <tr
//                   key={cluster.id}
//                   className="hover:bg-blue-50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-3 text-sm text-gray-700">
//                     {index + 1}
//                   </td>
//                   <td className="px-6 py-3 text-sm font-medium text-gray-800">
//                     {cluster.clusterNumber}
//                   </td>
//                   <td className="px-6 py-3 text-sm text-gray-700">
//                     {cluster.clusterName}
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

// export default ClusterMasterPage;

// -------------------------------------------------------

// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import './ClusterMasterPage.css';

// const ClusterMasterPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [clusters, setClusters] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       clusterNumber: "",
//       clusterName: "",
//     },
//     validationSchema: Yup.object({
//       clusterNumber: Yup.string()
//         .required("Cluster Number is required")
//         .matches(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscore allowed"),
//       clusterName: Yup.string().required("Cluster Name is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4200";

//         const response = await fetch(`${BASE_URL}/api/clusters/add`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             cluster_number: values.clusterNumber,
//             cluster_name: values.clusterName,
//           }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to add cluster");
//         }

//         // Success: Table update locally
//         const newCluster = {
//           id: clusters.length + 1,
//           clusterNumber: values.clusterNumber,
//           clusterName: values.clusterName,
//         };
//         setClusters([...clusters, newCluster]);

//         resetForm();
//         setShowForm(false);
//         alert("Cluster added successfully!");
//       } catch (error) {
//         console.error("Error adding cluster:", error);
//         alert(error.message || "Something went wrong while adding cluster.");
//       }
//     },
//   });

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">CLUSTER MASTER</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//         >
//           {showForm ? "X" : "+ Add Cluster"}
//         </button>
//       </div>

//       {/* Form Section */}
//       {showForm && (
//         <form
//           onSubmit={formik.handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Cluster Number */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Cluster Number
//               </label>
//               <input
//                 type="text"
//                 name="clusterNumber"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.clusterNumber}
//                 className={`w-full border ${
//                   formik.touched.clusterNumber && formik.errors.clusterNumber
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                 placeholder="Enter Cluster Number"
//               />
//               {formik.touched.clusterNumber && formik.errors.clusterNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.clusterNumber}
//                 </p>
//               )}
//             </div>

//             {/* Cluster Name */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1 clusterLabel">
//                 Cluster Name
//               </label>
//               <input
//                 type="text"
//                 name="clusterName"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.clusterName}
//                 className={`w-full border ${
//                   formik.touched.clusterName && formik.errors.clusterName
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
//                 placeholder="Enter Cluster Name"
//               />
//               {formik.touched.clusterName && formik.errors.clusterName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.clusterName}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//             >
//               Save Cluster
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
//                 CLUSTER NAME
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {clusters.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="3"
//                   className="text-center py-6 text-gray-500 italic"
//                 >
//                   No clusters added yet
//                 </td>
//               </tr>
//             ) : (
//               clusters.map((cluster, index) => (
//                 <tr
//                   key={cluster.id}
//                   className="hover:bg-blue-50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-3 text-sm text-gray-700">
//                     {index + 1}
//                   </td>
//                   <td className="px-6 py-3 text-sm font-medium text-gray-800">
//                     {cluster.clusterNumber}
//                   </td>
//                   <td className="px-6 py-3 text-sm text-gray-700">
//                     {cluster.clusterName}
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

// export default ClusterMasterPage;

// -------------------------------------------------------
// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import './ClusterMasterPage.css';

// const ClusterMasterPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [clusters, setClusters] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       clusterNumber: "",
//       clusterName: "",
//     },
//     validationSchema: Yup.object({
//       clusterNumber: Yup.string()
//         .required("Cluster Number is required")
//         .matches(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscore allowed"),
//       clusterName: Yup.string().required("Cluster Name is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4200";

//         // Get token from localStorage
//         const token = localStorage.getItem("token");
//         if (!token) {
//           alert("Access token missing. Please login first.");
//           return;
//         }

//         const response = await fetch(`${BASE_URL}/api/clusters/add`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`, // <-- Send token
//           },
//           body: JSON.stringify({
//             cluster_number: values.clusterNumber,
//             cluster_name: values.clusterName,
//           }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to add cluster");
//         }

//         // Success: Update table locally
//         const newCluster = {
//           id: clusters.length + 1,
//           clusterNumber: values.clusterNumber,
//           clusterName: values.clusterName,
//         };
//         setClusters([...clusters, newCluster]);

//         resetForm();
//         setShowForm(false);
//         alert("Cluster added successfully!");
//       } catch (error) {
//         console.error("Error adding cluster:", error);
//         alert(error.message || "Something went wrong while adding cluster.");
//       }
//     },
//   });

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">CLUSTER MASTER</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//         >
//           {showForm ? "X" : "+ Add Cluster"}
//         </button>
//       </div>

//       {/* Form Section */}
//       {showForm && (
//         <form
//           onSubmit={formik.handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Cluster Number */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Cluster Number
//               </label>
//               <input
//                 type="text"
//                 name="clusterNumber"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.clusterNumber}
//                 className={`w-full border ${
//                   formik.touched.clusterNumber && formik.errors.clusterNumber
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                 placeholder="Enter Cluster Number"
//               />
//               {formik.touched.clusterNumber && formik.errors.clusterNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.clusterNumber}
//                 </p>
//               )}
//             </div>

//             {/* Cluster Name */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1 clusterLabel">
//                 Cluster Name
//               </label>
//               <input
//                 type="text"
//                 name="clusterName"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.clusterName}
//                 className={`w-full border ${
//                   formik.touched.clusterName && formik.errors.clusterName
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
//                 placeholder="Enter Cluster Name"
//               />
//               {formik.touched.clusterName && formik.errors.clusterName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.clusterName}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//             >
//               Save Cluster
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
//                 CLUSTER NAME
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {clusters.length === 0 ? (
//               <tr>
//                 <td colSpan="3" className="text-center py-6 text-gray-500 italic">
//                   No clusters added yet
//                 </td>
//               </tr>
//             ) : (
//               clusters.map((cluster, index) => (
//                 <tr
//                   key={cluster.id}
//                   className="hover:bg-blue-50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
//                   <td className="px-6 py-3 text-sm font-medium text-gray-800">
//                     {cluster.clusterNumber}
//                   </td>
//                   <td className="px-6 py-3 text-sm text-gray-700">{cluster.clusterName}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ClusterMasterPage;

// -------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import './ClusterMasterPage.css';

// const ClusterMasterPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [clusters, setClusters] = useState([]);

//   const token = localStorage.getItem("token"); // your auth token

//   const formik = useFormik({
//     initialValues: {
//       clusterNumber: "",
//       clusterName: "",
//     },
//     validationSchema: Yup.object({
//       clusterNumber: Yup.string()
//         .required("Cluster Number is required")
//         .matches(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscore allowed"),
//       clusterName: Yup.string().required("Cluster Name is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       if (!token) {
//         alert("Access token missing! Login first.");
//         return;
//       }

//       try {
//         const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4200";

//         const response = await fetch(`${BASE_URL}/api/clusters/add`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // send token in header
//           },
//           body: JSON.stringify({
//             cluster_number: values.clusterNumber,
//             cluster_name: values.clusterName,
//           }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to add cluster");
//         }

//         // Success: update table
//         setClusters([
//           ...clusters,
//           {
//             id: clusters.length + 1,
//             cluster_number: values.clusterNumber,
//             cluster_name: values.clusterName,
//           },
//         ]);

//         resetForm();
//         setShowForm(false);
//         alert(data.message || "Cluster added successfully!");
//       } catch (error) {
//         console.error("Error adding cluster:", error);
//         alert(error.message || "Something went wrong while adding cluster.");
//       }
//     },
//   });

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">CLUSTER MASTER</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//         >
//           {showForm ? "X" : "+ Add Cluster"}
//         </button>
//       </div>

//       {/* Form Section */}
//       {showForm && (
//         <form
//           onSubmit={formik.handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Cluster Number */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Cluster Number
//               </label>
//               <input
//                 type="text"
//                 name="clusterNumber"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.clusterNumber}
//                 className={`w-full border ${
//                   formik.touched.clusterNumber && formik.errors.clusterNumber
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                 placeholder="Enter Cluster Number"
//               />
//               {formik.touched.clusterNumber && formik.errors.clusterNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.clusterNumber}
//                 </p>
//               )}
//             </div>

//             {/* Cluster Name */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Cluster Name
//               </label>
//               <input
//                 type="text"
//                 name="clusterName"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.clusterName}
//                 className={`w-full border ${
//                   formik.touched.clusterName && formik.errors.clusterName
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
//                 placeholder="Enter Cluster Name"
//               />
//               {formik.touched.clusterName && formik.errors.clusterName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.clusterName}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//             >
//               Save Cluster
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
//                 CLUSTER NAME
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {clusters.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="3"
//                   className="text-center py-6 text-gray-500 italic"
//                 >
//                   No clusters added yet
//                 </td>
//               </tr>
//             ) : (
//               clusters.map((cluster, index) => (
//                 <tr
//                   key={cluster.id}
//                   className="hover:bg-blue-50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
//                   <td className="px-6 py-3 text-sm font-medium text-gray-800">
//                     {cluster.cluster_number}
//                   </td>
//                   <td className="px-6 py-3 text-sm text-gray-700">
//                     {cluster.cluster_name}
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

// export default ClusterMasterPage;

// ----------------------------------------

// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import './ClusterMasterPage.css';
// const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4200";

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("authToken");
// };

// const ClusterMasterPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [clusters, setClusters] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchClusters();
//   }, []);


//   const fetchClusters = async () => {
//     const token = getAuthToken();
//     if (!token) {
//       setError("Please login to view clusters");
//       return;
//     }

//     try {
//       setLoading(true);
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
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching clusters:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
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
//       cluster_number: "",
//       cluster_name: "",
//       district:"",
//       taluka:"",       
//        ward:"",
//       municipal_corporation:""    
//     },
//     validationSchema: Yup.object({
//       cluster_number: Yup.string()
//         .required("Cluster Number is required")
//         .matches(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscore allowed"),
//       cluster_name: Yup.string().required("Cluster Name is required"),
//        district: Yup.string().required("District is required"),
//         taluka: Yup.string().required("Taluka is required"),
//          ward: Yup.string().required("Ward is required"),
//         municipal_corporation: Yup.string().required("Municipal Corporation is required"),

         
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       const token = getAuthToken();

//       if (!token) {
//         alert("Access token missing! Please login first.");
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await fetch(`${API_BASE_URL}/api/clusters/add`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             cluster_number: values.cluster_number,
//             cluster_name: values.cluster_name,
//            district: values.district,
//            taluka: values.taluka,
//            ward: values.ward,
//            municipal_corporation:values.municipal_corporation
//           }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to add cluster");
//         }

//         alert(data.message || "Cluster added successfully!");
//         resetForm();
//         setShowForm(false);
//         fetchClusters();
//         setError(null);
//       } catch (err) {
//         console.error("Error adding cluster:", err);
//         alert(err.message || "Something went wrong while adding cluster.");
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">CLUSTER MASTER</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//         >
//           {showForm ? "X" : "+ Add Cluster"}
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
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Cluster Number
//               </label>
//               <input
//                 type="text"
//                 name="clusterNumber"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.cluster_number}
//                 className={`w-full border ${
//                   formik.touched.cluster_number && formik.errors.cluster_number
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                 placeholder="Enter Cluster Number"
//               />
//               {formik.touched.cluster_number && formik.errors.cluster_number && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.cluster_number}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Cluster Name
//               </label>
//               <input
//                 type="text"
//                 name="cluster_name"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.cluster_name}
//                 className={`w-full border ${
//                   formik.touched.cluster_name && formik.errors.cluster_name
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
//                 placeholder="Enter Cluster Name"
//               />
//               {formik.touched.cluster_name && formik.errors.cluster_name && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.cluster_name}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow disabled:opacity-50"
//             >
//               {loading ? "Saving..." : "Save Cluster"}
//             </button>
//           </div>
//         </form>
//       )}

//       <div className="bg-white rounded-lg shadow-md border border-gray-100">
//         {loading && clusters.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="text-gray-500 mt-2">Loading clusters...</p>
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
//                   CLUSTER NAME
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {clusters.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="3"
//                     className="text-center py-6 text-gray-500 italic"
//                   >
//                     No clusters added yet
//                   </td>
//                 </tr>
//               ) : (
//                 clusters.map((cluster, index) => (
//                   <tr
//                     key={cluster.id}
//                     className="hover:bg-blue-50 transition-colors duration-200"
//                   >
//                     <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
//                     <td className="px-6 py-3 text-sm font-medium text-gray-800">
//                       {cluster.cluster_number}
//                     </td>
//                     <td className="px-6 py-3 text-sm text-gray-700">
//                       {cluster.cluster_name}
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

// export default ClusterMasterPage;


// ----------------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast"
import './ClusterMasterPage.css';
import wardsData from "../data/wardsData.json";
import mumbaiDistrict from "../data/mumbaiDistrict.json";
import mumbaiTalukas from "../data/mumbaiTalukas.json";
const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4200";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

const ClusterMasterPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClusters();
  }, []);

  const fetchClusters = async () => {
    const token = getAuthToken();
    if (!token) {
      setError("Please login to view clusters");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/clusters/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch clusters");
      }

      const data = await response.json();
      setClusters(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching clusters:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      cluster_number: "",
      cluster_name: "",
      district: "",
      taluka: "",
      ward: "",
      municipal_corporation: "BMC", // default BMC
    },
    validationSchema: Yup.object({
      cluster_number: Yup.string()
        .required("Cluster Number is required")
        .matches(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscore allowed"),
      cluster_name: Yup.string().required("Cluster Name is required"),
      district: Yup.string().required("District is required"),
      taluka: Yup.string().required("Taluka is required"),
      ward: Yup.string().required("Ward is required"),
      municipal_corporation: Yup.string().required("Municipal Corporation is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const token = getAuthToken();

      if (!token) {
        alert("Access token missing! Please login first.");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/clusters/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to add cluster");
        }

        // alert(data.message || "Cluster added successfully!");
        toast.success(data.message || "Cluster added successfully!"); // replaced alert
        resetForm();
        setShowForm(false);
        fetchClusters();
        setError(null);
      } catch (err) {
        console.error("Error adding cluster:", err);
        alert(err.message || "Something went wrong while adding cluster.");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="p-6">
       <Toaster position="top-right" reverseOrder={false} />  {/* Add this once at the top */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">CLUSTER MASTER</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
        >
          {showForm ? "X" : "+ Add Cluster"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cluster Number */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Cluster Number
              </label>
              <input
                type="text"
                name="cluster_number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cluster_number}
                className={`w-full border ${
                  formik.touched.cluster_number && formik.errors.cluster_number
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder="Enter Cluster Number"
              />
              {formik.touched.cluster_number && formik.errors.cluster_number && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.cluster_number}
                </p>
              )}
            </div>

            {/* Cluster Name */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Cluster Name
              </label>
              <input
                type="text"
                name="cluster_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cluster_name}
                className={`w-full border ${
                  formik.touched.cluster_name && formik.errors.cluster_name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
                placeholder="Enter Cluster Name"
              />
              {formik.touched.cluster_name && formik.errors.cluster_name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.cluster_name}
                </p>
              )}
            </div>

            {/* District */}
            {/* <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                type="text"
                name="district"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.district}
                className={`w-full border ${
                  formik.touched.district && formik.errors.district
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder="Enter District"
              />
              {formik.touched.district && formik.errors.district && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.district}
                </p>
              )}
            </div> */}

{/* District */}
<div>
  <label className="block text-medium font-medium text-gray-700 mb-1">
    District
  </label>
  <select
    name="district"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.district}
    className={`w-full border ${
      formik.touched.district && formik.errors.district
        ? "border-red-500"
        : "border-gray-300"
    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
  >
    <option value="">Select District</option>
    {mumbaiDistrict.map((district, index) => (
      <option key={index} value={district.districtName}>
        {district.districtName}
      </option>
    ))}
  </select>

  {formik.touched.district && formik.errors.district && (
    <p className="text-red-500 text-sm mt-1">{formik.errors.district}</p>
  )}
</div>


            {/* Taluka */}
            {/* <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Taluka
              </label>
              <input
                type="text"
                name="taluka"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.taluka}
                className={`w-full border ${
                  formik.touched.taluka && formik.errors.taluka
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder="Enter Taluka"
              />
              {formik.touched.taluka && formik.errors.taluka && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.taluka}
                </p>
              )}
            </div> */}
            
            {/* ------------------------------------------------ */}

            {/* Taluka */}
<div>
  <label className="block text-medium font-medium text-gray-700 mb-1">
    Taluka
  </label>

  <select
    name="taluka"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.taluka}
    disabled={!formik.values.district} // disable until district selected
    className={`w-full border ${
      formik.touched.taluka && formik.errors.taluka
        ? "border-red-500"
        : "border-gray-300"
    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
  >
    <option value="">Select Taluka</option>
    {mumbaiTalukas
      .find((d) => d.districtName === formik.values.district)
      ?.talukas.map((taluka, index) => (
        <option key={index} value={taluka}>
          {taluka}
        </option>
      ))}
  </select>

  {formik.touched.taluka && formik.errors.taluka && (
    <p className="text-red-500 text-sm mt-1">{formik.errors.taluka}</p>
  )}
</div>


            {/* Ward */}




            {/* <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Ward
              </label>
              <input
                type="text"
                name="ward"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ward}
                className={`w-full border ${
                  formik.touched.ward && formik.errors.ward
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder="Enter Ward"
              />
              {formik.touched.ward && formik.errors.ward && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.ward}
                </p>
              )}
            </div> */}

{/* ------------------------------------------------------------------------------------ */}

<div>
  <label className="block text-medium font-medium text-gray-700 mb-1">
    Ward
  </label>

  <select
    name="ward"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.ward}
    className={`w-full border ${
      formik.touched.ward && formik.errors.ward
        ? "border-red-500"
        : "border-gray-300"
    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
  >
    <option value="">Select Ward</option>
    {wardsData.map((ward, index) => (
      <option key={index} value={ward.wardName}>
        {ward.wardName}
      </option>
    ))}
  </select>

  {formik.touched.ward && formik.errors.ward && (
    <p className="text-red-500 text-sm mt-1">{formik.errors.ward}</p>
  )}
</div>





            {/* Municipal Corporation */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Municipal Corporation
              </label>
              <input
                type="text"
                name="municipal_corporation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.municipal_corporation}
                className={`w-full border ${
                  formik.touched.municipal_corporation &&
                  formik.errors.municipal_corporation
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder="Enter Municipal Corporation"
              />
              {formik.touched.municipal_corporation &&
                formik.errors.municipal_corporation && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.municipal_corporation}
                  </p>
                )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Cluster"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        {loading && clusters.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading clusters...</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SR. NO.</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">CLUSTER NUMBER</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">CLUSTER NAME</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">DISTRICT</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">TALUKA</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">WARD</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">MUNICIPAL CORPORATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clusters.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                    No clusters added yet
                  </td>
                </tr>
              ) : (
                clusters.map((cluster, index) => (
                  <tr key={cluster.id} className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-800">{cluster.cluster_number ? cluster.cluster_number : "-"}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{cluster.cluster_name ? cluster.cluster_name:"-"}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{cluster.district ? cluster.district:"-"}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{cluster.taluka ? cluster.taluka:"-"}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{cluster.ward?cluster.ward:"-"}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{cluster.municipal_corporation?cluster.municipal_corporation:"-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClusterMasterPage;


