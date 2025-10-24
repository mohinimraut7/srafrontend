// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import slumData from "../data/clusterdata.json"; // ✅ Optional - जर slum_id JSON मधून घ्यायचा असेल

// const HutMasterPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [huts, setHuts] = useState([]);

//   // ✅ slumData.json मधून slum IDs घ्यायचे असल्यास
// const slumOptions = slumData.flatMap(cluster =>
//   cluster.slums.map(slum => slum.slum_id)
// );
//   const formik = useFormik({
//     initialValues: {
//       hutId: "",
//       hutName: "",
//       hutUse: "",
//       hutFloor: "",
//       ownershipOfHutLand: "",
//       slumId: "",
//     },
//     validationSchema: Yup.object({
//       hutId: Yup.string()
//         .required("Hut ID is required")
//         .matches(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
//       hutName: Yup.string().required("Hut Name is required"),
//       hutUse: Yup.string().required("Hut Use is required"),
//       hutFloor: Yup.string().required("Hut Floor is required"),
//       ownershipOfHutLand: Yup.string().required("Ownership of Hut Land is required"),
//       slumId: Yup.string().required("Slum ID is required"),
//     }),
//     onSubmit: (values, { resetForm }) => {
//       const newHut = {
//         id: huts.length + 1,
//         hutId: values.hutId,
//         hutName: values.hutName,
//         hutUse: values.hutUse,
//         hutFloor: values.hutFloor,
//         ownershipOfHutLand: values.ownershipOfHutLand,
//         slumId: values.slumId,
//       };
//       setHuts([...huts, newHut]);
//       resetForm();
//       setShowForm(false);
//     },
//   });

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">HUT MASTER</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
//         >
//           {showForm ? "X" : "+ Add Hut"}
//         </button>
//       </div>

//       {/* Form Section */}
//       {showForm && (
//         <form
//           onSubmit={formik.handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Hut ID */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Hut ID
//               </label>
//               <input
//                 type="text"
//                 name="hutId"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.hutId}
//                 placeholder="Enter Hut ID"
//                 className={`w-full border ${
//                   formik.touched.hutId && formik.errors.hutId
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//               />
//               {formik.touched.hutId && formik.errors.hutId && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.hutId}
//                 </p>
//               )}
//             </div>

//             {/* Hut Name */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Hut Name
//               </label>
//               <input
//                 type="text"
//                 name="hutName"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.hutName}
//                 placeholder="Enter Hut Name"
//                 className={`w-full border ${
//                   formik.touched.hutName && formik.errors.hutName
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
//               />
//               {formik.touched.hutName && formik.errors.hutName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.hutName}
//                 </p>
//               )}
//             </div>

//             {/* Hut Use */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Hut Use
//               </label>
//               <input
//                 type="text"
//                 name="hutUse"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.hutUse}
//                 placeholder="Enter Hut Use"
//                 className={`w-full border ${
//                   formik.touched.hutUse && formik.errors.hutUse
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//               />
//               {formik.touched.hutUse && formik.errors.hutUse && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.hutUse}
//                 </p>
//               )}
//             </div>

//             {/* Hut Floor */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Hut Floor
//               </label>
//               <input
//                 type="text"
//                 name="hutFloor"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.hutFloor}
//                 placeholder="Enter Hut Floor"
//                 className={`w-full border ${
//                   formik.touched.hutFloor && formik.errors.hutFloor
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//               />
//               {formik.touched.hutFloor && formik.errors.hutFloor && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.hutFloor}
//                 </p>
//               )}
//             </div>

//             {/* Ownership of Hut Land */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Ownership of Hut Land
//               </label>
//               <input
//                 type="text"
//                 name="ownershipOfHutLand"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.ownershipOfHutLand}
//                 placeholder="Enter Ownership"
//                 className={`w-full border ${
//                   formik.touched.ownershipOfHutLand && formik.errors.ownershipOfHutLand
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
//               />
//               {formik.touched.ownershipOfHutLand && formik.errors.ownershipOfHutLand && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.ownershipOfHutLand}
//                 </p>
//               )}
//             </div>

//             {/* Slum ID Dropdown */}
//             <div>
//               <label className="block text-medium font-medium text-gray-700 mb-1">
//                 Slum ID
//               </label>
//               <select
//                 name="slumId"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.slumId}
//                 className={`w-full border ${
//                   formik.touched.slumId && formik.errors.slumId
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
//               >
//                 <option value="">Select Slum</option>
//                 {slumOptions.map((slum, index) => (
//                   <option key={index} value={slum}>
//                     {slum}
//                   </option>
//                 ))}
//               </select>
//               {formik.touched.slumId && formik.errors.slumId && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.slumId}
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
//               Save Hut
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
//                 HUT ID
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                 HUT NAME
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                 HUT USE
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                 HUT FLOOR
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                 OWNERSHIP OF HUT LAND
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                 SLUM ID
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {huts.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center py-6 text-gray-500 italic">
//                   No huts added yet
//                 </td>
//               </tr>
//             ) : (
//               huts.map((hut, index) => (
//                 <tr key={hut.id} className="hover:bg-blue-50 transition-colors duration-200">
//                   <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
//                   <td className="px-6 py-3 text-sm text-gray-700">{hut.hutId}</td>
//                   <td className="px-6 py-3 text-sm text-gray-700">{hut.hutName}</td>
//                   <td className="px-6 py-3 text-sm text-gray-700">{hut.hutUse}</td>
//                   <td className="px-6 py-3 text-sm text-gray-700">{hut.hutFloor}</td>
//                   <td className="px-6 py-3 text-sm text-gray-700">{hut.ownershipOfHutLand}</td>
//                   <td className="px-6 py-3 text-sm text-gray-700">{hut.slumId}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default HutMasterPage;

// ==================================================================

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import slumData from "../data/clusterdata.json"; // Optional – can remove if not needed

const HutMasterPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [huts, setHuts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Optional: extract slum IDs from JSON
  const slumOptions = slumData.flatMap((cluster) =>
    cluster.slums.map((slum) => slum.slum_id)
  );

  // ✅ Fetch all huts from API
  const fetchHuts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4200/api/huts/all");
      setHuts(res.data);
    } catch (err) {
      console.error("Error fetching huts:", err);
      alert("Failed to fetch huts from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHuts();
  }, []);

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      hut_id: "",
      hut_name: "",
      hut_use: "",
      hut_floor: "",
      ownership_of_hut_land: "",
      slum_id: "",
    },
    validationSchema: Yup.object({
      hut_id: Yup.string()
        .required("Hut ID is required")
        .matches(/^[A-Za-z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
      hut_name: Yup.string().required("Hut Name is required"),
      hut_use: Yup.string().required("Hut Use is required"),
      hut_floor: Yup.string().required("Hut Floor is required"),
      ownership_of_hut_land: Yup.string().required("Ownership of Hut Land is required"),
      slum_id: Yup.string().required("Slum ID is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post("http://localhost:4200/api/huts/add", values);
        alert("✅ Hut added successfully!");
        resetForm();
        setShowForm(false);
        fetchHuts(); // refresh list
      } catch (err) {
        console.error("Error adding hut:", err);
        alert("❌ Failed to add hut. Please check console.");
      }
    },
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">HUT MASTER</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
        >
          {showForm ? "X" : "+ Add Hut"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hut ID */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Hut ID
              </label>
              <input
                type="text"
                name="hut_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hut_id}
                placeholder="Enter Hut ID"
                className={`w-full border ${
                  formik.touched.hut_id && formik.errors.hut_id
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
              />
              {formik.touched.hut_id && formik.errors.hut_id && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.hut_id}</p>
              )}
            </div>

            {/* Hut Name */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Hut Name
              </label>
              <input
                type="text"
                name="hut_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hut_name}
                placeholder="Enter Hut Name"
                className={`w-full border ${
                  formik.touched.hut_name && formik.errors.hut_name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
              />
              {formik.touched.hut_name && formik.errors.hut_name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.hut_name}</p>
              )}
            </div>

            {/* Hut Use */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Hut Use
              </label>
              <input
                type="text"
                name="hut_use"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hut_use}
                placeholder="Enter Hut Use"
                className={`w-full border ${
                  formik.touched.hut_use && formik.errors.hut_use
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
              />
              {formik.touched.hut_use && formik.errors.hut_use && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.hut_use}</p>
              )}
            </div>

            {/* Hut Floor */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Hut Floor
              </label>
              <input
                type="text"
                name="hut_floor"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hut_floor}
                placeholder="Enter Hut Floor"
                className={`w-full border ${
                  formik.touched.hut_floor && formik.errors.hut_floor
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
              />
              {formik.touched.hut_floor && formik.errors.hut_floor && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.hut_floor}</p>
              )}
            </div>

            {/* Ownership */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Ownership of Hut Land
              </label>
              <input
                type="text"
                name="ownership_of_hut_land"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ownership_of_hut_land}
                placeholder="Enter Ownership"
                className={`w-full border ${
                  formik.touched.ownership_of_hut_land && formik.errors.ownership_of_hut_land
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300`}
              />
              {formik.touched.ownership_of_hut_land &&
                formik.errors.ownership_of_hut_land && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.ownership_of_hut_land}
                  </p>
                )}
            </div>

            {/* Slum ID */}
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Slum ID
              </label>
              <select
                name="slum_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.slum_id}
                className={`w-full border ${
                  formik.touched.slum_id && formik.errors.slum_id
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
              >
                <option value="">Select Slum</option>
                {slumOptions.map((slum, index) => (
                  <option key={index} value={slum}>
                    {slum}
                  </option>
                ))}
              </select>
              {formik.touched.slum_id && formik.errors.slum_id && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.slum_id}
                </p>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
            >
              Save Hut
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SR. NO.</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">HUT ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">HUT NAME</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">HUT USE</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">HUT FLOOR</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                OWNERSHIP OF HUT LAND
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SLUM ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                  Loading huts...
                </td>
              </tr>
            ) : huts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                  No huts found
                </td>
              </tr>
            ) : (
              huts.map((hut, index) => (
                <tr key={hut.id} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{hut.hut_id}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{hut.hut_name}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{hut.hut_use}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{hut.hut_floor}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{hut.ownership_of_hut_land}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{hut.slum_id}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HutMasterPage;
