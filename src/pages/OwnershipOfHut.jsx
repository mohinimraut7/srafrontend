import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import "./OwnershipOfHut.css";

const OwnershipOfHut = () => {
  const [showForm, setShowForm] = useState(false);
  const [ownerships, setOwnerships] = useState([]);

  const formik = useFormik({
    initialValues: {
      ownershipName: "",
    },
    validationSchema: Yup.object({
      ownershipName: Yup.string().required("Name Of Ownership of Hut is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const newOwnership = {
        id: ownerships.length + 1,
        ownershipName: values.ownershipName,
      };
      setOwnerships([...ownerships, newOwnership]);
      resetForm();
      setShowForm(false);
    },
  });

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          OWNERSHIP OF HUT
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4A5565] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
        >
          {showForm ? "X" : "+ Add Ownership"}
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-medium font-medium text-gray-700 mb-1">
                Name Of Ownership of Hut
              </label>
              <input
                type="text"
                name="ownershipName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ownershipName}
                className={`w-full border ${
                  formik.touched.ownershipName && formik.errors.ownershipName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder="Enter Name Of Ownership of Hut"
              />
              {formik.touched.ownershipName && formik.errors.ownershipName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.ownershipName}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-[#018740] hover:opacity-80 text-white font-medium py-2 px-4 rounded-md shadow"
            >
              Save Ownership
            </button>
          </div>
        </form>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                SR. NO.
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                NAME OF OWNERSHIP OF HUT
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ownerships.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No ownerships added yet
                </td>
              </tr>
            ) : (
              ownerships.map((ownership, index) => (
                <tr
                  key={ownership.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-800">
                    {ownership.ownershipName}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnershipOfHut;
