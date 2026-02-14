// import { useEffect, useState } from "react"
// import { Eye, Pencil, Trash2 } from "lucide-react"
// import { initDB } from "../utils/draftDB"

// const DraftPage = ({ navigateToEdit }) => {
//   const [drafts, setDrafts] = useState([])

//   useEffect(() => {
//     loadDrafts()
//   }, [])

//   const loadDrafts = async () => {
//     const db = await initDB()
//     const allDrafts = await db.getAll("drafts")
//     setDrafts(allDrafts)
//   }

//   const deleteDraft = async (id) => {
//     const db = await initDB()
//     await db.delete("drafts", id)
//     loadDrafts()
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">

//         <div className="bg-white rounded-xl shadow-xl p-8">

//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">
//               Draft Applications
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//               Saved offline applications
//             </p>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm rounded-lg overflow-hidden">

//               <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//                 <tr>
//                   <th className="px-6 py-3 text-left">Applicant</th>
//                   <th className="px-6 py-3 text-left">Hut No</th>
//                   <th className="px-6 py-3 text-left">Cluster</th>
//                   <th className="px-6 py-3 text-left">Saved Date</th>
//                   <th className="px-6 py-3 text-left">Files</th>
//                   <th className="px-6 py-3 text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody className="bg-white divide-y divide-gray-200">

//                 {drafts.length === 0 && (
//                   <tr>
//                     <td colSpan="6" className="text-center py-12 text-gray-500">
//                       No Drafts Found
//                     </td>
//                   </tr>
//                 )}

//                 {drafts.map((draft) => (
//                   <tr key={draft.id} className="hover:bg-blue-50 transition">

//                     <td className="px-6 py-4 font-medium">
//                       {draft.data.first_name || "-"} {draft.data.last_name || ""}
//                     </td>

//                     <td className="px-6 py-4">
//                       {draft.data.hut_id || "-"}
//                     </td>

//                     <td className="px-6 py-4">
//                       {draft.data.cluster_number || "-"}
//                     </td>

//                     <td className="px-6 py-4">
//                       {new Date(draft.savedAt).toLocaleString()}
//                     </td>

//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
//                         {draft.fileCount || 0} Files
//                       </span>
//                     </td>

//                     <td className="px-6 py-4 text-center space-x-4">

//                       <button
//                         onClick={() => navigateToEdit(draft.id)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         <Eye size={18} />
//                       </button>

//                       <button
//                         onClick={() => navigateToEdit(draft.id)}
//                         className="text-orange-600 hover:text-orange-800"
//                       >
//                         <Pencil size={18} />
//                       </button>

//                       <button
//                         onClick={() => deleteDraft(draft.id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <Trash2 size={18} />
//                       </button>

//                     </td>
//                   </tr>
//                 ))}

//               </tbody>
//             </table>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default DraftPage


// ------------------------------------------

import { useEffect, useState } from "react"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { initDB } from "../utils/draftDB"

const DraftPage = ({ navigateToEdit }) => {
  const [drafts, setDrafts] = useState([])

  useEffect(() => {
    loadDrafts()
  }, [])

  const loadDrafts = async () => {
    const db = await initDB()
    const allDrafts = await db.getAll("drafts")
    setDrafts(allDrafts)
  }

  const deleteDraft = async (id) => {
    const db = await initDB()
    await db.delete("drafts", id)
    loadDrafts()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-8">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Draft Applications
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Saved offline applications
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm rounded-lg overflow-hidden">

              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Applicant</th>
                  <th className="px-6 py-3 text-left">Hut No</th>
                  <th className="px-6 py-3 text-left">Cluster</th>
                  <th className="px-6 py-3 text-left">Saved Date</th>
                  <th className="px-6 py-3 text-left">Files</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">

                {drafts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-500">
                      No Drafts Found
                    </td>
                  </tr>
                )}

                {drafts.map((draft) => (
                  <tr key={draft.id} className="hover:bg-blue-50 transition">

                    {/* Applicant Name */}
                    <td className="px-6 py-4 font-medium">
                      {draft.formData?.first_name || "-"}{" "}
                      {draft.formData?.last_name || ""}
                    </td>

                    {/* Hut ID */}
                    <td className="px-6 py-4">
                      {draft.formData?.hut_id || "-"}
                    </td>

                    {/* Cluster */}
                    <td className="px-6 py-4">
                      {draft.formData?.cluster_number || "-"}
                    </td>

                    {/* Saved Date */}
                    <td className="px-6 py-4">
                      {draft.savedAt
                        ? new Date(draft.savedAt).toLocaleString()
                        : "-"}
                    </td>

                    {/* File Count */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        {draft.fileData
                          ? Object.keys(draft.fileData).length
                          : 0}{" "}
                        Files
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center space-x-4">
<button
  onClick={() => navigateToEdit?.("edit-draft", draft.id)}
  className="text-orange-600 hover:text-orange-800"
>
  <Pencil size={18} />
</button>


                      <button
                        onClick={() => navigateToEdit?.(draft.id)}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteDraft(draft.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DraftPage

