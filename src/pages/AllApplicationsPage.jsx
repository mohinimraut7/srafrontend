//this 1wala commented code is original code
// "use client"
// import { useState, useEffect } from "react"

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
//     return (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString))
//     )
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const documentUrl = getDocumentUrl(app[field])
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           cleanPath: extractDocumentPath(app[field]),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(app[field]),
//           isImage: isImageFile(app[field]),
//           isVideo: isVideoFile(app[field]),
//           isPdf: isPdfFile(app[field]),
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     switch (status.toLowerCase()) {
//       case "ready for survey":
//         return "bg-green-100 text-green-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.url) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     if (document.isImage) {
//       console.log("document>>>>>>>>>>>",document)
//       return (
//         <div className="text-center">
//           {/* <img
//             src={document.originalPath || "/placeholder.svg"}
//             alt={document.name}
//             className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//             onError={(e) => {
//               e.target.style.display = "none"
//               e.target.nextSibling.style.display = "block"
//             }}
//           /> */}
//           <img
//   src={Array.isArray(document.originalPath) ? document.originalPath[0] : document.originalPath || "/placeholder.svg"}
//   alt={document.name}
//   className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//   onError={(e) => {
//     e.target.style.display = "none"
//     e.target.nextSibling.style.display = "block"
//   }}
// />

//           <div style={{ display: "none" }} className="text-red-500 p-4">
//             Failed to load image: {document.url}
//           </div>
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <video
//             controls
//             className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//             onError={(e) => {
//               e.target.style.display = "none"
//               e.target.nextSibling.style.display = "block"
//             }}
//           >
//             <source src={document.url} type={`video/${document.extension}`} />
//             Your browser does not support the video tag.
//           </video>
//           <div style={{ display: "none" }} className="text-red-500 p-4">
//             Failed to load video: {document.url}
//           </div>
//         </div>
//       )
//     }

//     // if (document.isPdf) {
//     //   return (
//     //     <div className="text-center">
//     //       <iframe
//     //         src={document.url}
//     //         className="w-full h-[70vh] rounded-lg shadow-lg"
//     //         title={document.name}
//     //         onError={(e) => {
//     //           e.target.style.display = "none"
//     //           e.target.nextSibling.style.display = "block"
//     //         }}
//     //       />
//     //       <div style={{ display: "none" }} className="text-red-500 p-4">
//     //         Failed to load PDF: {document.url}
//     //       </div>
//     //       <div className="mt-4">
//     //         <a
//     //           href={document.url}
//     //           target="_blank"
//     //           rel="noopener noreferrer"
//     //           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//     //         >
//     //           Open PDF in New Tab
//     //         </a>
//     //       </div>
//     //     </div>
//     //   )
//     // }
//     console.log("document testing in array",document)

//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         <a
//           href={document.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//         >
//           Download File
//         </a>
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA APPLICATION DOCUMENTS VIEWER</h1>
//         <p className="text-gray-600 text-lg">
//           Complete view of SRA applications with document preview functionality ({applications.length} total records)
//         </p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <span className="text-gray-400">🔍</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="space-y-8">
//         {filteredApplications.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-xl">No applications found matching your search criteria</p>
//           </div>
//         ) : (
//           filteredApplications.map((app) => (
//             <div key={app.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-3xl font-bold mb-2">
//                       {app.first_name} {app.middle_name} {app.last_name}
//                     </h2>
//                     <div className="space-y-1">
//                       <p className="text-orange-100 text-lg">
//                         <strong>Slum ID:</strong> {app.slum_id} | <strong>Area:</strong> {app.name_of_slum_area}
//                       </p>
//                       <p className="text-orange-100">
//                         <strong>Ward:</strong> {app.ward} | <strong>District:</strong> {app.district}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <button
//                       onClick={() => openModal(app)}
//                       className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 flex items-center gap-2 mb-3"
//                     >
//                       👁️ View All Details
//                     </button>
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.survey_status)}`}
//                     >
//                       {app.survey_status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   📄 Documents ({getDocuments(app).length} files)
//                 </h3>
//                 {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                   {getDocuments(app)
//                     .slice(0, 8)
//                     .map((doc, index) => (
//                       <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
//                         <div className="flex items-center justify-between mb-2">
//                           <h4 className="font-medium text-sm truncate">{doc.name}</h4>
//                           <span className="text-xs bg-gray-100 px-2 py-1 rounded">{doc.extension.toUpperCase()}</span>
//                         </div>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <img
//                               src={doc.originalPath|| "/placeholder.svg"}
//                               alt={doc.name}
//                               className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
//                               onClick={() => openDocumentModal(doc)}
//                               onError={(e) => {
//                                 e.target.src =
//                                   "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                               }}
//                             />
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-20 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-2xl">🎥</span>
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-20 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-2xl">📄</span>
//                             </div>
//                           )}
//                           {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                             <div
//                               className="w-full h-20 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-2xl">📁</span>
//                             </div>
//                           )}
//                         </div>

//                         <button
//                           onClick={() => openDocumentModal(doc)}
//                           className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
//                         >
//                           View Document
//                         </button>

//                         {doc.lat && doc.long && (
//                           <p className="text-xs text-gray-500 mt-2">
//                             📍 {doc.lat}, {doc.long}
//                           </p>
//                         )}
//                       </div>
//                     ))}
//                 </div> */}


//                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//   {getDocuments(app)
//     .slice(0, 8)
//     .map((doc, index) => {
//       console.log("Doc:", doc, "Index:", index); // ✅ console.log इथे

//       return (
//         <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-2">
//             <h4 className="font-medium text-sm truncate">{doc.name}</h4>
//             <span className="text-xs bg-gray-100 px-2 py-1 rounded">{doc.extension.toUpperCase()}</span>
//           </div>

//           <div className="mb-3">
//             {doc.isImage && (
//               <img
//                 src={doc.originalPath || "/placeholder.svg"}
//                 alt={doc.name}
//                 className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
//                 onClick={() => openDocumentModal(doc)}
//                 onError={(e) => {
//                   e.target.src =
//                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+";
//                 }}
//               />
//             )}
//             {doc.isVideo && (
//               <div
//                 className="w-full h-20 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
//                 onClick={() => openDocumentModal(doc)}
//               >
//                 <span className="text-2xl">🎥</span>
//               </div>
//             )}
//             {doc.isPdf && (
//               <div
//                 className="w-full h-20 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200"
//                 onClick={() => openDocumentModal(doc)}
//               >
//                 <span className="text-2xl">📄</span>
//               </div>
//             )}
//             {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//               <div
//                 className="w-full h-20 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200"
//                 onClick={() => openDocumentModal(doc)}
//               >
//                 <span className="text-2xl">📁</span>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => openDocumentModal(doc)}
//             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
//           >
//             View Document
//           </button>

//           {doc.lat && doc.long && (
//             <p className="text-xs text-gray-500 mt-2">
//               📍 {doc.lat}, {doc.long}
//             </p>
//           )}
//         </div>
//       );
//     })}
// </div>


//                 {getDocuments(app).length > 8 && (
//                   <button
//                     onClick={() => openModal(app)}
//                     className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
//                   >
//                     View All {getDocuments(app).length} Documents
//                   </button>
//                 )}
//               </div>

//               <div className="bg-gray-50 px-6 py-4">
//                 <div className="grid md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <strong>Contact:</strong> {app.current_mobile_number}
//                   </div>
//                   <div>
//                     <strong>Area:</strong> {app.area_sq_m} sq.m
//                   </div>
//                   <div>
//                     <strong>Family:</strong> {app.num_family_members} members
//                   </div>
//                   <div>
//                     <strong>Created:</strong> {app.created_date}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
//                 ×
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">
//                 ×
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              

//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => (
//                     <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                       <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                       <div className="mb-3">
//                         {doc.isImage && (
//                           <img
//                             src={doc.url || "/placeholder.svg"}
//                             alt={doc.name}
//                             className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                             onClick={() => openDocumentModal(doc)}
//                             onError={(e) => {
//                               e.target.src =
//                                 "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                             }}
//                           />
//                         )}
//                         {doc.isVideo && (
//                           <div
//                             className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
//                             onClick={() => openDocumentModal(doc)}
//                           >
//                             <span className="text-3xl">🎥</span>
//                           </div>
//                         )}
//                         {doc.isPdf && (
//                           <div
//                             className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200"
//                             onClick={() => openDocumentModal(doc)}
//                           >
//                             <span className="text-3xl">📄</span>
//                           </div>
//                         )}
//                       </div>

//                       <button
//                         onClick={() => openDocumentModal(doc)}
//                         className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 mb-2"
//                       >
//                         View {doc.extension.toUpperCase()}
//                       </button>

//                       <div className="space-y-2">
//                         <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                           <strong>Clean Path:</strong> {doc.cleanPath}
//                         </p>
//                         {doc.lat && doc.long && (
//                           <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                             <strong>GPS:</strong> {doc.lat}, {doc.long}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

             
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// -----------------------------------------------------------


// import { useState, useEffect } from "react"

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
//     return (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString))
//     )
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     switch (status.toLowerCase()) {
//       case "ready for survey":
//         return "bg-green-100 text-green-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❮
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❯
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❮
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❯
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}
//         </div>
//       )
//     }

//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <a
//                   key={index}
//                   href={path}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//                 >
//                   Download File {index + 1}
//                 </a>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <a
//             href={currentPath}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//           >
//             Download File
//           </a>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA APPLICATION DOCUMENTS VIEWER</h1>
//         <p className="text-gray-600 text-lg">
//           Complete view of SRA applications with document preview functionality ({applications.length} total records)
//         </p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <span className="text-gray-400">🔍</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="space-y-8">
//         {filteredApplications.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-xl">No applications found matching your search criteria</p>
//           </div>
//         ) : (
//           filteredApplications.map((app) => (
//             <div key={app.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-3xl font-bold mb-2">
//                       {app.first_name} {app.middle_name} {app.last_name}
//                     </h2>
//                     <div className="space-y-1">
//                       <p className="text-orange-100 text-lg">
//                         <strong>Slum ID:</strong> {app.slum_id} | <strong>Area:</strong> {app.name_of_slum_area}
//                       </p>
//                       <p className="text-orange-100">
//                         <strong>Ward:</strong> {app.ward} | <strong>District:</strong> {app.district}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <button
//                       onClick={() => openModal(app)}
//                       className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 flex items-center gap-2 mb-3"
//                     >
//                       👁️ View All Details
//                     </button>
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.survey_status)}`}
//                     >
//                       {app.survey_status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   📄 Documents ({getDocuments(app).length} files)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                   {getDocuments(app)
//                     .slice(0, 8)
//                     .map((doc, index) => {
//                       const firstImagePath = doc.parsedPaths[0]
                      
//                       return (
//                         <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
//                           <div className="flex items-center justify-between mb-2">
//                             <h4 className="font-medium text-sm truncate">{doc.name}</h4>
//                             <div className="flex items-center gap-1">
//                               <span className="text-xs bg-gray-100 px-2 py-1 rounded">{doc.extension.toUpperCase()}</span>
//                               {doc.hasMultiple && (
//                                 <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                                   {doc.parsedPaths.length}
//                                 </span>
//                               )}
//                             </div>
//                           </div>

//                           <div className="mb-3">
//                             {doc.isImage && (
//                               <div className="relative">
//                                 <img
//                                   src={firstImagePath}
//                                   alt={doc.name}
//                                   className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
//                                   onClick={() => openDocumentModal(doc)}
//                                   onError={(e) => {
//                                     e.target.src =
//                                       "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                   }}
//                                 />
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {doc.isVideo && (
//                               <div
//                                 className="w-full h-20 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">🎥</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {doc.isPdf && (
//                               <div
//                                 className="w-full h-20 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">📄</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                               <div
//                                 className="w-full h-20 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">📁</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                           </div>

//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
//                           >
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>

//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-500 mt-2">
//                               📍 {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       )
//                     })}
//                 </div>

//                 {getDocuments(app).length > 8 && (
//                   <button
//                     onClick={() => openModal(app)}
//                     className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
//                   >
//                     View All {getDocuments(app).length} Documents
//                   </button>
//                 )}
//               </div>

//               <div className="bg-gray-50 px-6 py-4">
//                 <div className="grid md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <strong>Contact:</strong> {app.current_mobile_number}
//                   </div>
//                   <div>
//                     <strong>Area:</strong> {app.area_sq_m} sq.m
//                   </div>
//                   <div>
//                     <strong>Family:</strong> {app.num_family_members} members
//                   </div>
//                   <div>
//                     <strong>Created:</strong> {app.created_date}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
//                 ×
//               </button>
//             </div>
//             {/* <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Total Files:</strong> {selectedDocument.parsedPaths.length}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <div className="mt-2">
//                   <strong>Parsed URLs:</strong>
//                   <div className="max-h-32 overflow-y-auto">
//                     {selectedDocument.parsedPaths.map((path, index) => (
//                       <p key={index} className="text-sm text-gray-600 break-all pl-2">
//                         {index + 1}. {path}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//               <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//              </div>
//           </div>
//         </div>
//       )}

//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">
//                 ×
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <button
//                           onClick={() => openDocumentModal(doc)}
//                           className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 mb-2"
//                         >
//                           View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                         </button>

//                         <div className="space-y-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// -------------------------------------------------------------------------------------------


// import { useState, useEffect } from "react"

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   // 🎯 Download function - screenshot मधील सारखा
//   const downloadFile = (url, filename) => {
//     if (!url) {
//       alert("File URL not available")
//       return
//     }
    
//     const link = document.createElement('a')
//     link.href = url
//     link.download = filename || 'document'
//     link.target = '_blank'
//     link.rel = 'noopener noreferrer'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
//     return (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString))
//     )
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     switch (status.toLowerCase()) {
//       case "ready for survey":
//         return "bg-green-100 text-green-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❮
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❯
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           {/* 🎯 Download button for images - screenshot सारखा */}

//           {/* This download button in preview page Download File */}
//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//             >
//               Download File
//             </button>
//           </div>

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❮
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❯
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           {/* 🎯 Download button for videos - screenshot सारखा */}
//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//             >
//               Download File
//             </button>
//           </div>
//         </div>
//       )
//     }

//     // 🎯 For other file types - screenshot सारखा exact design
//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <button
//                   key={index}
//                   onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
//                   className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//                 >
//                   Download File {index + 1} 
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//           >
//             Download File
//           </button>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA APPLICATION DOCUMENTS VIEWER</h1>
//         <p className="text-gray-600 text-lg">
//           Complete view of SRA applications with document preview functionality ({applications.length} total records)
//         </p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <span className="text-gray-400">🔍</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="space-y-8">
//         {filteredApplications.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-xl">No applications found matching your search criteria</p>
//           </div>
//         ) : (
//           filteredApplications.map((app) => (
//             <div key={app.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-3xl font-bold mb-2">
//                       {app.first_name} {app.middle_name} {app.last_name}
//                     </h2>
//                     <div className="space-y-1">
//                       <p className="text-orange-100 text-lg">
//                         <strong>Slum ID:</strong> {app.slum_id} | <strong>Area:</strong> {app.name_of_slum_area}
//                       </p>
//                       <p className="text-orange-100">
//                         <strong>Ward:</strong> {app.ward} | <strong>District:</strong> {app.district}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <button
//                       onClick={() => openModal(app)}
//                       className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 flex items-center gap-2 mb-3"
//                     >
//                       👁️ View All Details
//                     </button>
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.survey_status)}`}
//                     >
//                       {app.survey_status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   📄 Documents ({getDocuments(app).length} files)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                   {getDocuments(app)
//                     .slice(0, 8)
//                     .map((doc, index) => {
//                       const firstImagePath = doc.parsedPaths[0]
                      
//                       return (
//                         <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
//                           <div className="flex items-center justify-between mb-2">
//                             <h4 className="font-medium text-sm truncate">{doc.name}</h4>
//                             <div className="flex items-center gap-1">
//                               <span className="text-xs bg-gray-100 px-2 py-1 rounded">{doc.extension.toUpperCase()}</span>
//                               {doc.hasMultiple && (
//                                 <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                                   {doc.parsedPaths.length}
//                                 </span>
//                               )}
//                             </div>
//                           </div>

//                           <div className="mb-3">
//                             {doc.isImage && (
//                               <div className="relative">
//                                 <img
//                                   src={firstImagePath}
//                                   alt={doc.name}
//                                   className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
//                                   onClick={() => openDocumentModal(doc)}
//                                   onError={(e) => {
//                                     e.target.src =
//                                       "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                   }}
//                                 />
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {doc.isVideo && (
//                               <div
//                                 className="w-full h-20 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">🎥</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {doc.isPdf && (
//                               <div
//                                 className="w-full h-20 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">📄</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                               <div
//                                 className="w-full h-20 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">📁</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                           </div>

//                           {/* 🎯 Buttons - View आणि Download दोन्ही */}
//                           <div className="space-y-2">
//                             <button
//                               onClick={() => openDocumentModal(doc)}
//                               className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
//                             >
//                               View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                             </button>
//                              {/* This button in All Applications page download button */}
//                             <button
//                               onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                               className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700"
//                             >
//                               📥 Download File
//                             </button>
//                           </div>

//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-500 mt-2">
//                               📍 {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       )
//                     })}
//                 </div>

//                 {getDocuments(app).length > 8 && (
//                   <button
//                     onClick={() => openModal(app)}
//                     className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
//                   >
//                     View All {getDocuments(app).length} Documents
//                   </button>
//                 )}
//               </div>

//               <div className="bg-gray-50 px-6 py-4">
//                 <div className="grid md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <strong>Contact:</strong> {app.current_mobile_number}
//                   </div>
//                   <div>
//                     <strong>Area:</strong> {app.area_sq_m} sq.m
//                   </div>
//                   <div>
//                     <strong>Family:</strong> {app.num_family_members} members
//                   </div>
//                   <div>
//                     <strong>Created:</strong> {app.created_date}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
//                 ×
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">
//                 ×
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         {/* 🎯 Buttons - View आणि Download दोन्ही */}
//                         <div className="space-y-2">
//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700"
//                           >
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>
                          
//                           <button
//                             onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
//                           >
//                             📥 Download File
//                           </button>
//                         </div>

//                         <div className="space-y-2 mt-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage


// --------------------------------------------------------------------------


//this 1wala commented code is original code
// "use client"
// import { useState, useEffect } from "react"

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
//     return (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString))
//     )
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const documentUrl = getDocumentUrl(app[field])
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           cleanPath: extractDocumentPath(app[field]),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(app[field]),
//           isImage: isImageFile(app[field]),
//           isVideo: isVideoFile(app[field]),
//           isPdf: isPdfFile(app[field]),
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     switch (status.toLowerCase()) {
//       case "ready for survey":
//         return "bg-green-100 text-green-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.url) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     if (document.isImage) {
//       console.log("document>>>>>>>>>>>",document)
//       return (
//         <div className="text-center">
//           {/* <img
//             src={document.originalPath || "/placeholder.svg"}
//             alt={document.name}
//             className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//             onError={(e) => {
//               e.target.style.display = "none"
//               e.target.nextSibling.style.display = "block"
//             }}
//           /> */}
//           <img
//   src={Array.isArray(document.originalPath) ? document.originalPath[0] : document.originalPath || "/placeholder.svg"}
//   alt={document.name}
//   className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//   onError={(e) => {
//     e.target.style.display = "none"
//     e.target.nextSibling.style.display = "block"
//   }}
// />

//           <div style={{ display: "none" }} className="text-red-500 p-4">
//             Failed to load image: {document.url}
//           </div>
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <video
//             controls
//             className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//             onError={(e) => {
//               e.target.style.display = "none"
//               e.target.nextSibling.style.display = "block"
//             }}
//           >
//             <source src={document.url} type={`video/${document.extension}`} />
//             Your browser does not support the video tag.
//           </video>
//           <div style={{ display: "none" }} className="text-red-500 p-4">
//             Failed to load video: {document.url}
//           </div>
//         </div>
//       )
//     }

//     // if (document.isPdf) {
//     //   return (
//     //     <div className="text-center">
//     //       <iframe
//     //         src={document.url}
//     //         className="w-full h-[70vh] rounded-lg shadow-lg"
//     //         title={document.name}
//     //         onError={(e) => {
//     //           e.target.style.display = "none"
//     //           e.target.nextSibling.style.display = "block"
//     //         }}
//     //       />
//     //       <div style={{ display: "none" }} className="text-red-500 p-4">
//     //         Failed to load PDF: {document.url}
//     //       </div>
//     //       <div className="mt-4">
//     //         <a
//     //           href={document.url}
//     //           target="_blank"
//     //           rel="noopener noreferrer"
//     //           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//     //         >
//     //           Open PDF in New Tab
//     //         </a>
//     //       </div>
//     //     </div>
//     //   )
//     // }
//     console.log("document testing in array",document)

//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         <a
//           href={document.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//         >
//           Download File
//         </a>
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA APPLICATION DOCUMENTS VIEWER</h1>
//         <p className="text-gray-600 text-lg">
//           Complete view of SRA applications with document preview functionality ({applications.length} total records)
//         </p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <span className="text-gray-400">🔍</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="space-y-8">
//         {filteredApplications.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-xl">No applications found matching your search criteria</p>
//           </div>
//         ) : (
//           filteredApplications.map((app) => (
//             <div key={app.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-3xl font-bold mb-2">
//                       {app.first_name} {app.middle_name} {app.last_name}
//                     </h2>
//                     <div className="space-y-1">
//                       <p className="text-orange-100 text-lg">
//                         <strong>Slum ID:</strong> {app.slum_id} | <strong>Area:</strong> {app.name_of_slum_area}
//                       </p>
//                       <p className="text-orange-100">
//                         <strong>Ward:</strong> {app.ward} | <strong>District:</strong> {app.district}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <button
//                       onClick={() => openModal(app)}
//                       className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 flex items-center gap-2 mb-3"
//                     >
//                       👁️ View All Details
//                     </button>
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.survey_status)}`}
//                     >
//                       {app.survey_status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   📄 Documents ({getDocuments(app).length} files)
//                 </h3>
//                 {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                   {getDocuments(app)
//                     .slice(0, 8)
//                     .map((doc, index) => (
//                       <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
//                         <div className="flex items-center justify-between mb-2">
//                           <h4 className="font-medium text-sm truncate">{doc.name}</h4>
//                           <span className="text-xs bg-gray-100 px-2 py-1 rounded">{doc.extension.toUpperCase()}</span>
//                         </div>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <img
//                               src={doc.originalPath|| "/placeholder.svg"}
//                               alt={doc.name}
//                               className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
//                               onClick={() => openDocumentModal(doc)}
//                               onError={(e) => {
//                                 e.target.src =
//                                   "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                               }}
//                             />
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-20 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-2xl">🎥</span>
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-20 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-2xl">📄</span>
//                             </div>
//                           )}
//                           {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                             <div
//                               className="w-full h-20 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-2xl">📁</span>
//                             </div>
//                           )}
//                         </div>

//                         <button
//                           onClick={() => openDocumentModal(doc)}
//                           className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
//                         >
//                           View Document
//                         </button>

//                         {doc.lat && doc.long && (
//                           <p className="text-xs text-gray-500 mt-2">
//                             📍 {doc.lat}, {doc.long}
//                           </p>
//                         )}
//                       </div>
//                     ))}
//                 </div> */}


//                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//   {getDocuments(app)
//     .slice(0, 8)
//     .map((doc, index) => {
//       console.log("Doc:", doc, "Index:", index); // ✅ console.log इथे

//       return (
//         <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-2">
//             <h4 className="font-medium text-sm truncate">{doc.name}</h4>
//             <span className="text-xs bg-gray-100 px-2 py-1 rounded">{doc.extension.toUpperCase()}</span>
//           </div>

//           <div className="mb-3">
//             {doc.isImage && (
//               <img
//                 src={doc.originalPath || "/placeholder.svg"}
//                 alt={doc.name}
//                 className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
//                 onClick={() => openDocumentModal(doc)}
//                 onError={(e) => {
//                   e.target.src =
//                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+";
//                 }}
//               />
//             )}
//             {doc.isVideo && (
//               <div
//                 className="w-full h-20 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
//                 onClick={() => openDocumentModal(doc)}
//               >
//                 <span className="text-2xl">🎥</span>
//               </div>
//             )}
//             {doc.isPdf && (
//               <div
//                 className="w-full h-20 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200"
//                 onClick={() => openDocumentModal(doc)}
//               >
//                 <span className="text-2xl">📄</span>
//               </div>
//             )}
//             {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//               <div
//                 className="w-full h-20 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200"
//                 onClick={() => openDocumentModal(doc)}
//               >
//                 <span className="text-2xl">📁</span>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => openDocumentModal(doc)}
//             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
//           >
//             View Document
//           </button>

//           {doc.lat && doc.long && (
//             <p className="text-xs text-gray-500 mt-2">
//               📍 {doc.lat}, {doc.long}
//             </p>
//           )}
//         </div>
//       );
//     })}
// </div>


//                 {getDocuments(app).length > 8 && (
//                   <button
//                     onClick={() => openModal(app)}
//                     className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
//                   >
//                     View All {getDocuments(app).length} Documents
//                   </button>
//                 )}
//               </div>

//               <div className="bg-gray-50 px-6 py-4">
//                 <div className="grid md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <strong>Contact:</strong> {app.current_mobile_number}
//                   </div>
//                   <div>
//                     <strong>Area:</strong> {app.area_sq_m} sq.m
//                   </div>
//                   <div>
//                     <strong>Family:</strong> {app.num_family_members} members
//                   </div>
//                   <div>
//                     <strong>Created:</strong> {app.created_date}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
//                 ×
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">
//                 ×
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              

//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => (
//                     <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                       <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                       <div className="mb-3">
//                         {doc.isImage && (
//                           <img
//                             src={doc.url || "/placeholder.svg"}
//                             alt={doc.name}
//                             className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                             onClick={() => openDocumentModal(doc)}
//                             onError={(e) => {
//                               e.target.src =
//                                 "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                             }}
//                           />
//                         )}
//                         {doc.isVideo && (
//                           <div
//                             className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
//                             onClick={() => openDocumentModal(doc)}
//                           >
//                             <span className="text-3xl">🎥</span>
//                           </div>
//                         )}
//                         {doc.isPdf && (
//                           <div
//                             className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200"
//                             onClick={() => openDocumentModal(doc)}
//                           >
//                             <span className="text-3xl">📄</span>
//                           </div>
//                         )}
//                       </div>

//                       <button
//                         onClick={() => openDocumentModal(doc)}
//                         className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 mb-2"
//                       >
//                         View {doc.extension.toUpperCase()}
//                       </button>

//                       <div className="space-y-2">
//                         <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                           <strong>Clean Path:</strong> {doc.cleanPath}
//                         </p>
//                         {doc.lat && doc.long && (
//                           <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                             <strong>GPS:</strong> {doc.lat}, {doc.long}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

             
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// -----------------------------------------------------------


// import { useState, useEffect } from "react"

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
//     return (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString))
//     )
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     switch (status.toLowerCase()) {
//       case "ready for survey":
//         return "bg-green-100 text-green-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❮
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❯
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❮
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❯
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}
//         </div>
//       )
//     }

//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <a
//                   key={index}
//                   href={path}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//                 >
//                   Download File {index + 1}
//                 </a>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <a
//             href={currentPath}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//           >
//             Download File
//           </a>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA APPLICATION DOCUMENTS VIEWER</h1>
//         <p className="text-gray-600 text-lg">
//           Complete view of SRA applications with document preview functionality ({applications.length} total records)
//         </p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <span className="text-gray-400">🔍</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="space-y-8">
//         {filteredApplications.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-xl">No applications found matching your search criteria</p>
//           </div>
//         ) : (
//           filteredApplications.map((app) => (
//             <div key={app.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-3xl font-bold mb-2">
//                       {app.first_name} {app.middle_name} {app.last_name}
//                     </h2>
//                     <div className="space-y-1">
//                       <p className="text-orange-100 text-lg">
//                         <strong>Slum ID:</strong> {app.slum_id} | <strong>Area:</strong> {app.name_of_slum_area}
//                       </p>
//                       <p className="text-orange-100">
//                         <strong>Ward:</strong> {app.ward} | <strong>District:</strong> {app.district}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <button
//                       onClick={() => openModal(app)}
//                       className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 flex items-center gap-2 mb-3"
//                     >
//                       👁️ View All Details
//                     </button>
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.survey_status)}`}
//                     >
//                       {app.survey_status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   📄 Documents ({getDocuments(app).length} files)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                   {getDocuments(app)
//                     .slice(0, 8)
//                     .map((doc, index) => {
//                       const firstImagePath = doc.parsedPaths[0]
                      
//                       return (
//                         <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
//                           <div className="flex items-center justify-between mb-2">
//                             <h4 className="font-medium text-sm truncate">{doc.name}</h4>
//                             <div className="flex items-center gap-1">
//                               <span className="text-xs bg-gray-100 px-2 py-1 rounded">{doc.extension.toUpperCase()}</span>
//                               {doc.hasMultiple && (
//                                 <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                                   {doc.parsedPaths.length}
//                                 </span>
//                               )}
//                             </div>
//                           </div>

//                           <div className="mb-3">
//                             {doc.isImage && (
//                               <div className="relative">
//                                 <img
//                                   src={firstImagePath}
//                                   alt={doc.name}
//                                   className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
//                                   onClick={() => openDocumentModal(doc)}
//                                   onError={(e) => {
//                                     e.target.src =
//                                       "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                   }}
//                                 />
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {doc.isVideo && (
//                               <div
//                                 className="w-full h-20 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">🎥</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {doc.isPdf && (
//                               <div
//                                 className="w-full h-20 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">📄</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                               <div
//                                 className="w-full h-20 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">📁</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                           </div>

//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
//                           >
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>

//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-500 mt-2">
//                               📍 {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       )
//                     })}
//                 </div>

//                 {getDocuments(app).length > 8 && (
//                   <button
//                     onClick={() => openModal(app)}
//                     className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
//                   >
//                     View All {getDocuments(app).length} Documents
//                   </button>
//                 )}
//               </div>

//               <div className="bg-gray-50 px-6 py-4">
//                 <div className="grid md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <strong>Contact:</strong> {app.current_mobile_number}
//                   </div>
//                   <div>
//                     <strong>Area:</strong> {app.area_sq_m} sq.m
//                   </div>
//                   <div>
//                     <strong>Family:</strong> {app.num_family_members} members
//                   </div>
//                   <div>
//                     <strong>Created:</strong> {app.created_date}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
//                 ×
//               </button>
//             </div>
//             {/* <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Total Files:</strong> {selectedDocument.parsedPaths.length}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <div className="mt-2">
//                   <strong>Parsed URLs:</strong>
//                   <div className="max-h-32 overflow-y-auto">
//                     {selectedDocument.parsedPaths.map((path, index) => (
//                       <p key={index} className="text-sm text-gray-600 break-all pl-2">
//                         {index + 1}. {path}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//               <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//              </div>
//           </div>
//         </div>
//       )}

//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">
//                 ×
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <button
//                           onClick={() => openDocumentModal(doc)}
//                           className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 mb-2"
//                         >
//                           View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                         </button>

//                         <div className="space-y-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// -------------------------------------------------------------------------------------------


// import { useState, useEffect } from "react"

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   // 🎯 Download function - screenshot मधील सारखा
//   const downloadFile = (url, filename) => {
//     if (!url) {
//       alert("File URL not available")
//       return
//     }
    
//     const link = document.createElement('a')
//     link.href = url
//     link.download = filename || 'document'
//     link.target = '_blank'
//     link.rel = 'noopener noreferrer'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
//     return (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString))
//     )
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     switch (status.toLowerCase()) {
//       case "ready for survey":
//         return "bg-green-100 text-green-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❮
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❯
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           {/* 🎯 Download button for images - screenshot सारखा */}

//           {/* This download button in preview page Download File */}
//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//             >
//               Download File
//             </button>
//           </div>

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❮
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   ❯
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           {/* 🎯 Download button for videos - screenshot सारखा */}
//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//             >
//               Download File
//             </button>
//           </div>
//         </div>
//       )
//     }

//     // 🎯 For other file types - screenshot सारखा exact design
//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <button
//                   key={index}
//                   onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
//                   className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//                 >
//                   Download File {index + 1} 
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//           >
//             Download File
//           </button>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA APPLICATION DOCUMENTS VIEWER</h1>
//         <p className="text-gray-600 text-lg">
//           Complete view of SRA applications with document preview functionality ({applications.length} total records)
//         </p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <span className="text-gray-400">🔍</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="space-y-8">
//         {filteredApplications.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-xl">No applications found matching your search criteria</p>
//           </div>
//         ) : (
//           filteredApplications.map((app) => (
//             <div key={app.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-3xl font-bold mb-2">
//                       {app.first_name} {app.middle_name} {app.last_name}
//                     </h2>
//                     <div className="space-y-1">
//                       <p className="text-orange-100 text-lg">
//                         <strong>Slum ID:</strong> {app.slum_id} | <strong>Area:</strong> {app.name_of_slum_area}
//                       </p>
//                       <p className="text-orange-100">
//                         <strong>Ward:</strong> {app.ward} | <strong>District:</strong> {app.district}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <button
//                       onClick={() => openModal(app)}
//                       className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 flex items-center gap-2 mb-3"
//                     >
//                       👁️ View All Details
//                     </button>
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.survey_status)}`}
//                     >
//                       {app.survey_status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   📄 Documents ({getDocuments(app).length} files)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                   {getDocuments(app)
//                     .slice(0, 8)
//                     .map((doc, index) => {
//                       const firstImagePath = doc.parsedPaths[0]
                      
//                       return (
//                         <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
//                           <div className="flex items-center justify-between mb-2">
//                             <h4 className="font-medium text-sm truncate">{doc.name}</h4>
//                             <div className="flex items-center gap-1">
//                               <span className="text-xs bg-gray-100 px-2 py-1 rounded">{doc.extension.toUpperCase()}</span>
//                               {doc.hasMultiple && (
//                                 <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                                   {doc.parsedPaths.length}
//                                 </span>
//                               )}
//                             </div>
//                           </div>

//                           <div className="mb-3">
//                             {doc.isImage && (
//                               <div className="relative">
//                                 <img
//                                   src={firstImagePath}
//                                   alt={doc.name}
//                                   className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
//                                   onClick={() => openDocumentModal(doc)}
//                                   onError={(e) => {
//                                     e.target.src =
//                                       "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                   }}
//                                 />
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {doc.isVideo && (
//                               <div
//                                 className="w-full h-20 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">🎥</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {doc.isPdf && (
//                               <div
//                                 className="w-full h-20 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">📄</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                               <div
//                                 className="w-full h-20 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                                 onClick={() => openDocumentModal(doc)}
//                               >
//                                 <span className="text-2xl">📁</span>
//                                 {doc.hasMultiple && (
//                                   <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                     +{doc.parsedPaths.length - 1}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                           </div>

//                           {/* 🎯 Buttons - View आणि Download दोन्ही */}
//                           <div className="space-y-2">
//                             <button
//                               onClick={() => openDocumentModal(doc)}
//                               className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
//                             >
//                               View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                             </button>
//                              {/* This button in All Applications page download button */}
//                             <button
//                               onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                               className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700"
//                             >
//                               📥 Download File
//                             </button>
//                           </div>

//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-500 mt-2">
//                               📍 {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       )
//                     })}
//                 </div>

//                 {getDocuments(app).length > 8 && (
//                   <button
//                     onClick={() => openModal(app)}
//                     className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
//                   >
//                     View All {getDocuments(app).length} Documents
//                   </button>
//                 )}
//               </div>

//               <div className="bg-gray-50 px-6 py-4">
//                 <div className="grid md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <strong>Contact:</strong> {app.current_mobile_number}
//                   </div>
//                   <div>
//                     <strong>Area:</strong> {app.area_sq_m} sq.m
//                   </div>
//                   <div>
//                     <strong>Family:</strong> {app.num_family_members} members
//                   </div>
//                   <div>
//                     <strong>Created:</strong> {app.created_date}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
//                 ×
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">
//                 ×
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         {/* 🎯 Buttons - View आणि Download दोन्ही */}
//                         <div className="space-y-2">
//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700"
//                           >
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>
                          
//                           <button
//                             onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
//                           >
//                             📥 Download File
//                           </button>
//                         </div>

//                         <div className="space-y-2 mt-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// --------------------------------------------------------------------------------

// ========================================================================

// import { useState, useEffect } from "react"
// import { Eye, Search, Download, X, ChevronLeft, ChevronRight } from "lucide-react"

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   // Download function
//   const downloadFile = (url, filename) => {
//     if (!url) {
//       alert("File URL not available")
//       return
//     }
    
//     const link = document.createElement('a')
//     link.href = url
//     link.download = filename || 'document'
//     link.target = '_blank'
//     link.rel = 'noopener noreferrer'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const response = await fetch('https://sra.saavi.co.in/api/sra-logs/all-logs', {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const result = await response.json()
//         // The API returns {data: [...]} format
//         const data = result.data || result
//         setApplications(Array.isArray(data) ? data : [])
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
//     return (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString)) ||
//       (app.cluster_number && app.cluster_number.toLowerCase().includes(searchString))
//     )
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//       "document_upload"
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     switch (status.toLowerCase()) {
//       case "ready for survey":
//         return "bg-green-100 text-green-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>
//         </div>
//       )
//     }

//     // For other file types
//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <button
//                   key={index}
//                   onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
//                   className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
//                 >
//                   <Download size={16} />
//                   Download File {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//           >
//             <Download size={20} />
//             Download File
//           </button>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA Applications Table</h1>
//         <p className="text-gray-600 text-lg">
//           Complete view of SRA applications in table format ({applications.length} total records)
//         </p>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="text-gray-400" size={20} />
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, cluster number, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gradient-to-r from-orange-500 to-red-500">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Serial No.
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Cluster Number
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut ID
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Address
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Ground Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Use of Hut
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut Area (sq.m)
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Date of Survey
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Done By
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredApplications.length === 0 ? (
//                 <tr>
//                   <td colSpan="11" className="px-6 py-12 text-center text-gray-500">
//                     No applications found matching your search criteria
//                   </td>
//                 </tr>
//               ) : (
//                 filteredApplications.map((app, index) => (
//                   <tr key={app.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {app.id || index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.cluster_number || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_id || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">
//                         {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.gender} • {app.aadhaar_number}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
//                       <div className="truncate">
//                         {app.current_address || app.name_of_slum_area}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.current_pincode && `PIN: ${app.current_pincode}`}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.survey_status)}`}>
//                         {app.survey_status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_use || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">{app.area_sq_m}</div>
//                       <div className="text-gray-500 text-xs">
//                         {app.length && app.width && `${app.length}×${app.width}m`}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div>{app.created_date || "N/A"}</div>
//                       {app.created_time && (
//                         <div className="text-gray-500 text-xs">{app.created_time}</div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.person_providing_info || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <button
//                         onClick={() => openModal(app)}
//                         className="text-blue-600 hover:text-blue-900 transition-colors"
//                         title="View Details"
//                       >
//                         <Eye size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Document Modal */}
//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📁</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div className="space-y-2">
//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1"
//                           >
//                             <Eye size={16} />
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>
                          
//                           <button
//                             onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
//                           >
//                             <Download size={16} />
//                             Download File
//                           </button>
//                         </div>

//                         <div className="space-y-2 mt-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// ============================


// import { useState, useEffect } from "react"
// import { Eye, Search, Download, X, ChevronLeft, ChevronRight } from "lucide-react"
// import AddApplicationForm from './AddApplicationForm';

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   // Download function with token authorization
//   const downloadFile = (url, filename) => {
//     if (!url) {
//       alert("File URL not available")
//       return
//     }
    
//     const link = document.createElement('a')
//     link.href = url
//     link.download = filename || 'document'
//     link.target = '_blank'
//     link.rel = 'noopener noreferrer'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
//     return (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString)) ||
//       (app.cluster_number && app.cluster_number.toLowerCase().includes(searchString))
//     )
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//       "document_upload"
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     switch (status.toLowerCase()) {
//       case "ready for survey":
//         return "bg-green-100 text-green-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>
//         </div>
//       )
//     }

//     // For other file types
//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <button
//                   key={index}
//                   onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
//                   className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
//                 >
//                   <Download size={16} />
//                   Download File {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//           >
//             <Download size={20} />
//             Download File
//           </button>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA Applications Table</h1>
//         <p className="text-gray-600 text-lg">
//           Complete view of SRA applications in table format ({applications.length} total records)
//         </p>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="text-gray-400" size={20} />
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, cluster number, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gradient-to-r from-orange-500 to-red-500">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Serial No.
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Cluster Number
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut ID
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Address
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Ground Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Use of Hut
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut Area (sq.m)
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Date of Survey
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Done By
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredApplications.length === 0 ? (
//                 <tr>
//                   <td colSpan="11" className="px-6 py-12 text-center text-gray-500">
//                     No applications found matching your search criteria
//                   </td>
//                 </tr>
//               ) : (
//                 filteredApplications.map((app, index) => (
//                   <tr key={app.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {app.id || index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.cluster_number || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_id || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">
//                         {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.gender} • {app.aadhaar_number}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
//                       <div className="truncate">
//                         {app.current_address || app.name_of_slum_area}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.current_pincode && `PIN: ${app.current_pincode}`}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.survey_status)}`}>
//                         {app.survey_status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_use || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">{app.area_sq_m}</div>
//                       <div className="text-gray-500 text-xs">
//                         {app.length && app.width && `${app.length}×${app.width}m`}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div>{app.created_date || "N/A"}</div>
//                       {app.created_time && (
//                         <div className="text-gray-500 text-xs">{app.created_time}</div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.person_providing_info || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <button
//                         onClick={() => openModal(app)}
//                         className="text-blue-600 hover:text-blue-900 transition-colors"
//                         title="View Details"
//                       >
//                         <Eye size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Document Modal */}
//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📁</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div className="space-y-2">
//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1"
//                           >
//                             <Eye size={16} />
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>
                          
//                           <button
//                             onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
//                           >
//                             <Download size={16} />
//                             Download File
//                           </button>
//                         </div>

//                         <div className="space-y-2 mt-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//           {/* Add Application Form Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">Add New SRA Application</h2>
//               <button 
//                 onClick={() => setShowAddForm(false)} 
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={28} />
//               </button>
//             </div>
//             <div className="p-6">
//               <AddApplicationForm 
//                 onClose={() => setShowAddForm(false)}
//                 onSuccess={() => {
//                   setShowAddForm(false)
//                   window.location.reload()
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage


// ======================================================
// import { useState, useEffect } from "react"
// import { Eye, Search, Download, X, ChevronLeft, ChevronRight, Plus } from "lucide-react"
// import AddApplicationForm from './AddApplicationForm';
// import AllApplicationsCard from "../components/AllApplicationsCard";
// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [showAddForm, setShowAddForm] = useState(false)

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   // Download function with token authorization
//   const downloadFile = (url, filename) => {
//     if (!url) {
//       alert("File URL not available")
//       return
//     }
    
//     const link = document.createElement('a')
//     link.href = url
//     link.download = filename || 'document'
//     link.target = '_blank'
//     link.rel = 'noopener noreferrer'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
//     return (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString)) ||
//       (app.cluster_number && app.cluster_number.toLowerCase().includes(searchString))
//     )
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//       "document_upload"
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     switch (status.toLowerCase()) {
//       case "ready for survey":
//         return "bg-green-100 text-green-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>
//         </div>
//       )
//     }

//     // For other file types
//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <button
//                   key={index}
//                   onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
//                   className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
//                 >
//                   <Download size={16} />
//                   Download File {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//           >
//             <Download size={20} />
//             Download File
//           </button>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">📊 Survey Status</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="text-center p-4 bg-blue-50 rounded-lg">
//             <div className="text-2xl font-bold text-blue-600">{0}</div>
//             <div className="text-blue-800 text-sm font-medium">Completed</div>
//           </div>
//           <div className="text-center p-4 bg-green-50 rounded-lg">
//             <div className="text-2xl font-bold text-green-600">{0}</div>
//             <div className="text-green-800 text-sm font-medium">Pending</div>
//           </div>
//           <div className="text-center p-4 bg-orange-50 rounded-lg">
//             <div className="text-2xl font-bold text-orange-600">{0}</div>
//             <div className="text-orange-800 text-sm font-medium">Approved</div>
//           </div>
//           <div className="text-center p-4 bg-purple-50 rounded-lg">
//             <div className="text-2xl font-bold text-purple-600">{0}</div>
//             <div className="text-purple-800 text-sm font-medium">Rejected</div>
//           </div>
//         </div>
//       </div>
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA Applications Table</h1>
//           <p className="text-gray-600 text-lg">
//             Complete view of SRA applications in table format ({applications.length} total records)
//           </p>
//         </div>
        
//         {/* Add New Application Button */}
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 flex items-center gap-2 font-medium"
//         >
//           <Plus size={20} />
//           Add New Application
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="text-gray-400" size={20} />
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, cluster number, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gradient-to-r from-orange-500 to-red-500">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Serial No.
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Cluster Number
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut ID
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Address
//                 </th>
//                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Slum FLoor
//                 </th>
             
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Use of Hut
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut Area (sq.m)
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Date of Survey
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Done By
//                 </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Survey Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Action
//                 </th>
                 
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredApplications.length === 0 ? (
//                 <tr>
//                   <td colSpan="11" className="px-6 py-12 text-center text-gray-500">
//                     No applications found matching your search criteria
//                   </td>
//                 </tr>
//               ) : (
//                 filteredApplications.map((app, index) => (
//                   <tr key={app.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {app.id || index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.cluster_number || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_id || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">
//                         {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.gender} • {app.aadhaar_number}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
//                       <div className="truncate">
//                         {app.current_address || app.name_of_slum_area}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.current_pincode && `PIN: ${app.current_pincode}`}
//                       </div>
//                     </td>

//                     {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_floor || "N/A"}
//                     </td> */}

//                     <td
//                     className={`px-6 py-4 whitespace-nowrap text-sm ${
//                     app.slum_floor === "G" ? "text-green-600 font-semibold" : "text-gray-700"
//                     }`}
//                     >
//                    {app.slum_floor || "N/A"}
//                    </td>
                 
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_use || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">{app.area_sq_m}</div>
//                       <div className="text-gray-500 text-xs">
//                         {app.length && app.width && `${app.length}×${app.width}m`}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div>{app.created_date || "N/A"}</div>
//                       {app.created_time && (
//                         <div className="text-gray-500 text-xs">{app.created_time}</div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.person_providing_info || "N/A"}
//                     </td>
//                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.survey_status)}`}>
//                         {app.survey_status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <button
//                         onClick={() => openModal(app)}
//                         className="text-blue-600 hover:text-blue-900 transition-colors"
//                         title="View Details"
//                       >
//                         <Eye size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Document Modal */}
//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📁</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div className="space-y-2">
//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1"
//                           >
//                             <Eye size={16} />
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>
                          
//                           <button
//                             onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
//                           >
//                             <Download size={16} />
//                             Download File
//                           </button>
//                         </div>

//                         <div className="space-y-2 mt-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Application Form Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">Add New SRA Application</h2>
//               <button 
//                 onClick={() => setShowAddForm(false)} 
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={28} />
//               </button>
//             </div>
//             <div className="p-6">
//               <AddApplicationForm 
//                 onClose={() => setShowAddForm(false)}
//                 onSuccess={() => {
//                   setShowAddForm(false)
//                   window.location.reload()
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// --------------------------------------------------------------------------------------------------------

// import { useState, useEffect } from "react"
// import { Eye, Search, Download, X, ChevronLeft, ChevronRight, Plus } from "lucide-react"
// import AddApplicationForm from './AddApplicationForm';
// import AllApplicationsCard from "../components/AllApplicationsCard";

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [showAddForm, setShowAddForm] = useState(false)
  
//   // Filter states
//   const [hutUseFilter, setHutUseFilter] = useState("")
//   const [surveyStatusFilter, setSurveyStatusFilter] = useState("")

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   // Download function with token authorization
//   const downloadFile = (url, filename) => {
//     if (!url) {
//       alert("File URL not available")
//       return
//     }
    
//     const link = document.createElement('a')
//     link.href = url
//     link.download = filename || 'document'
//     link.target = '_blank'
//     link.rel = 'noopener noreferrer'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
    
//     // Search filter
//     const matchesSearch = (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString)) ||
//       (app.cluster_number && app.cluster_number.toLowerCase().includes(searchString))
//     )

//     // Use of Hut filter
//     const matchesHutUse = hutUseFilter === "" || 
//       (app.slum_use && app.slum_use.toLowerCase() === hutUseFilter.toLowerCase())

//     // Survey Status filter
//     const matchesSurveyStatus = surveyStatusFilter === "" || 
//       (app.survey_status && app.survey_status.toLowerCase() === surveyStatusFilter.toLowerCase())

//     return matchesSearch && matchesHutUse && matchesSurveyStatus
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//       "document_upload"
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     switch (status.toLowerCase()) {
//       case "ready for survey":
//         return "bg-green-100 text-green-800"
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       case "hut appose":
//         return "bg-red-100 text-red-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>
//         </div>
//       )
//     }

//     // For other file types
//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <button
//                   key={index}
//                   onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
//                   className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
//                 >
//                   <Download size={16} />
//                   Download File {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//           >
//             <Download size={20} />
//             Download File
//           </button>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">📊 Survey Status</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="text-center p-4 bg-blue-50 rounded-lg">
//             <div className="text-2xl font-bold text-blue-600">{0}</div>
//             <div className="text-blue-800 text-sm font-medium">Completed</div>
//           </div>
//           <div className="text-center p-4 bg-green-50 rounded-lg">
//             <div className="text-2xl font-bold text-green-600">{0}</div>
//             <div className="text-green-800 text-sm font-medium">Pending</div>
//           </div>
//           <div className="text-center p-4 bg-orange-50 rounded-lg">
//             <div className="text-2xl font-bold text-orange-600">{0}</div>
//             <div className="text-orange-800 text-sm font-medium">Approved</div>
//           </div>
//           <div className="text-center p-4 bg-purple-50 rounded-lg">
//             <div className="text-2xl font-bold text-purple-600">{0}</div>
//             <div className="text-purple-800 text-sm font-medium">Rejected</div>
//           </div>
//         </div>
//       </div>
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA Applications Table</h1>
//           <p className="text-gray-600 text-lg">
//             Complete view of SRA applications in table format ({applications.length} total records)
//           </p>
//         </div>
        
//         {/* Add New Application Button */}
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 flex items-center gap-2 font-medium"
//         >
//           <Plus size={20} />
//           Add New Application
//         </button>
//       </div>

//       {/* Search Bar and Filters */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         {/* Search Bar */}
//         <div className="relative mb-4">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="text-gray-400" size={20} />
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, cluster number, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Filter Dropdowns */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Use of Hut Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Use of Hut
//             </label>
//             <select
//               value={hutUseFilter}
//               onChange={(e) => setHutUseFilter(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
//             >
//               <option value="">All Uses</option>
//               <option value="Social">Social</option>
//               <option value="Residential">Residential</option>
//               <option value="Commercial">Commercial</option>
//             </select>
//           </div>

//           {/* Survey Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Survey Status
//             </label>
//             <select
//               value={surveyStatusFilter}
//               onChange={(e) => setSurveyStatusFilter(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
//             >
//               <option value="">All Statuses</option>
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//               <option value="Ready For Survey">Ready For Survey</option>
//               <option value="Hut Appose">Hut Appose</option>
//             </select>
//           </div>

//           {/* Clear Filters Button */}
//           <div className="flex items-end">
//             <button
//               onClick={() => {
//                 setHutUseFilter("")
//                 setSurveyStatusFilter("")
//                 setSearchTerm("")
//               }}
//               className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         </div>

//         {/* Active Filters Display */}
//         {(hutUseFilter || surveyStatusFilter || searchTerm) && (
//           <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//             <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
//             <div className="flex flex-wrap gap-2">
//               {searchTerm && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
//                   Search: "{searchTerm}"
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="ml-1 text-blue-600 hover:text-blue-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//               {hutUseFilter && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
//                   Use: {hutUseFilter}
//                   <button
//                     onClick={() => setHutUseFilter("")}
//                     className="ml-1 text-green-600 hover:text-green-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//               {surveyStatusFilter && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
//                   Status: {surveyStatusFilter}
//                   <button
//                     onClick={() => setSurveyStatusFilter("")}
//                     className="ml-1 text-orange-600 hover:text-orange-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//             </div>
//             <p className="text-xs text-gray-600 mt-2">
//               Showing {filteredApplications.length} of {applications.length} applications
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gradient-to-r from-orange-500 to-red-500">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Serial No.
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Cluster Number
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut ID
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Address
//                 </th>
//                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Slum FLoor
//                 </th>
             
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Use of Hut
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut Area (sq.m)
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Date of Survey
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Done By
//                 </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Survey Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Action
//                 </th>
                 
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredApplications.length === 0 ? (
//                 <tr>
//                   <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
//                     No applications found matching your search criteria
//                   </td>
//                 </tr>
//               ) : (
//                 filteredApplications.map((app, index) => (
//                   <tr key={app.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {app.id || index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.cluster_number || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_id || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">
//                         {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.gender} • {app.aadhaar_number}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
//                       <div className="truncate">
//                         {app.current_address || app.name_of_slum_area}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.current_pincode && `PIN: ${app.current_pincode}`}
//                       </div>
//                     </td>

//                     {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_floor || "N/A"}
//                     </td> */}

//                     <td
//                     className={`px-6 py-4 whitespace-nowrap text-sm ${
//                     app.slum_floor === "G" ? "text-green-600 font-semibold" : "text-gray-700"
//                     }`}
//                     >
//                    {app.slum_floor || "N/A"}
//                    </td>
                 
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_use || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">{app.area_sq_m}</div>
//                       <div className="text-gray-500 text-xs">
//                         {app.length && app.width && `${app.length}×${app.width}m`}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div>{app.created_date || "N/A"}</div>
//                       {app.created_time && (
//                         <div className="text-gray-500 text-xs">{app.created_time}</div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.person_providing_info || "N/A"}
//                     </td>
//                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.survey_status)}`}>
//                         {app.survey_status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <button
//                         onClick={() => openModal(app)}
//                         className="text-blue-600 hover:text-blue-900 transition-colors"
//                         title="View Details"
//                       >
//                         <Eye size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Document Modal */}
//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📁</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div className="space-y-2">
//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1"
//                           >
//                             <Eye size={16} />
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>
                          
//                           <button
//                             onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
//                           >
//                             <Download size={16} />
//                             Download File
//                           </button>
//                         </div>

//                         <div className="space-y-2 mt-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Application Form Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">Add New SRA Application</h2>
//               <button 
//                 onClick={() => setShowAddForm(false)} 
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={28} />
//               </button>
//             </div>
//             <div className="p-6">
//               <AddApplicationForm 
//                 onClose={() => setShowAddForm(false)}
//                 onSuccess={() => {
//                   setShowAddForm(false)
//                   window.location.reload()
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// --------------------------------------------------------------------------------------------------------------

// import { useState, useEffect } from "react"
// import { Eye, Search, Download, X, ChevronLeft, ChevronRight, Plus } from "lucide-react"
// import AddApplicationForm from './AddApplicationForm';
// import AllApplicationsCard from "../components/AllApplicationsCard";

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [showAddForm, setShowAddForm] = useState(false)
  
//   // Filter states
//   const [hutUseFilter, setHutUseFilter] = useState("")
//   const [surveyStatusFilter, setSurveyStatusFilter] = useState("")

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   // Download function with token authorization
//   const downloadFile = (url, filename) => {
//     if (!url) {
//       alert("File URL not available")
//       return
//     }
    
//     const link = document.createElement('a')
//     link.href = url
//     link.download = filename || 'document'
//     link.target = '_blank'
//     link.rel = 'noopener noreferrer'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   // Enhanced case-insensitive filtering logic
//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
    
//     // Search filter - case insensitive
//     const matchesSearch = searchTerm === "" || (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString)) ||
//       (app.cluster_number && app.cluster_number.toLowerCase().includes(searchString))
//     )

//     // Use of Hut filter - case insensitive
//     const matchesHutUse = hutUseFilter === "" || (
//       app.slum_use && app.slum_use.toLowerCase().trim() === hutUseFilter.toLowerCase().trim()
//     )

//     // Survey Status filter - case insensitive with multiple variations
//     const matchesSurveyStatus = surveyStatusFilter === "" || (() => {
//       if (!app.survey_status) return false
      
//       const appStatus = app.survey_status.toLowerCase().trim()
//       const filterStatus = surveyStatusFilter.toLowerCase().trim()
      
//       // Direct match
//       if (appStatus === filterStatus) return true
      
//       // Handle common variations
//       const statusMappings = {
//         'pending': ['pending', 'pendding', 'panding'],
//         'completed': ['completed', 'complete', 'complated'],
//         'ready for survey': ['ready for survey', 'ready_for_survey', 'readyforsurvey', 'ready survey'],
//         'hut appose': ['hut appose', 'hut_appose', 'hutappose', 'hut oppose']
//       }
      
//       // Check if the filter status matches any variations
//       for (const [key, variations] of Object.entries(statusMappings)) {
//         if (variations.includes(filterStatus) && variations.includes(appStatus)) {
//           return true
//         }
//       }
      
//       return false
//     })()

//     return matchesSearch && matchesHutUse && matchesSurveyStatus
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//       "document_upload"
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   // Enhanced status color function with case-insensitive matching
//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
    
//     const statusLower = status.toLowerCase().trim()
    
//     if (statusLower.includes("ready") && statusLower.includes("survey")) {
//       return "bg-green-100 text-green-800"
//     }
//     if (statusLower.includes("pending")) {
//       return "bg-yellow-100 text-yellow-800"
//     }
//     if (statusLower.includes("completed") || statusLower.includes("complete")) {
//       return "bg-blue-100 text-blue-800"
//     }
//     if (statusLower.includes("appose") || statusLower.includes("oppose")) {
//       return "bg-red-100 text-red-800"
//     }
    
//     return "bg-gray-100 text-gray-800"
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>
//         </div>
//       )
//     }

//     // For other file types
//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <button
//                   key={index}
//                   onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
//                   className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
//                 >
//                   <Download size={16} />
//                   Download File {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//           >
//             <Download size={20} />
//             Download File
//           </button>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">📊 Survey Status</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="text-center p-4 bg-blue-50 rounded-lg">
//             <div className="text-2xl font-bold text-blue-600">{0}</div>
//             <div className="text-blue-800 text-sm font-medium">Completed</div>
//           </div>
//           <div className="text-center p-4 bg-green-50 rounded-lg">
//             <div className="text-2xl font-bold text-green-600">{0}</div>
//             <div className="text-green-800 text-sm font-medium">Pending</div>
//           </div>
//           <div className="text-center p-4 bg-orange-50 rounded-lg">
//             <div className="text-2xl font-bold text-orange-600">{0}</div>
//             <div className="text-orange-800 text-sm font-medium">Approved</div>
//           </div>
//           <div className="text-center p-4 bg-purple-50 rounded-lg">
//             <div className="text-2xl font-bold text-purple-600">{0}</div>
//             <div className="text-purple-800 text-sm font-medium">Rejected</div>
//           </div>
//         </div>
//       </div>
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">SRA Applications Table</h1>
//           <p className="text-gray-600 text-lg">
//             Complete view of SRA applications in table format ({applications.length} total records)
//           </p>
//         </div>
        
//         {/* Add New Application Button */}
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 flex items-center gap-2 font-medium"
//         >
//           <Plus size={20} />
//           Add New Application
//         </button>
//       </div>

//       {/* Search Bar and Filters */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         {/* Search Bar */}
//         <div className="relative mb-4">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="text-gray-400" size={20} />
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, cluster number, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Filter Dropdowns */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Use of Hut Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Use of Hut
//             </label>
//             <select
//               value={hutUseFilter}
//               onChange={(e) => setHutUseFilter(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
//             >
//               <option value="">All Uses</option>
//               <option value="Social">Social</option>
//               <option value="Residential">Residential</option>
//               <option value="Commercial">Commercial</option>
//             </select>
//           </div>

//           {/* Survey Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Survey Status
//             </label>
//             <select
//               value={surveyStatusFilter}
//               onChange={(e) => setSurveyStatusFilter(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
//             >
//               <option value="">All Statuses</option>
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//               <option value="Ready For Survey">Ready For Survey</option>
//               <option value="Hut Appose">Hut Appose</option>
//             </select>
//           </div>

//           {/* Clear Filters Button */}
//           <div className="flex items-end">
//             <button
//               onClick={() => {
//                 setHutUseFilter("")
//                 setSurveyStatusFilter("")
//                 setSearchTerm("")
//               }}
//               className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         </div>

//         {/* Active Filters Display */}
//         {(hutUseFilter || surveyStatusFilter || searchTerm) && (
//           <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//             <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
//             <div className="flex flex-wrap gap-2">
//               {searchTerm && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
//                   Search: "{searchTerm}"
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="ml-1 text-blue-600 hover:text-blue-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//               {hutUseFilter && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
//                   Use: {hutUseFilter}
//                   <button
//                     onClick={() => setHutUseFilter("")}
//                     className="ml-1 text-green-600 hover:text-green-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//               {surveyStatusFilter && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
//                   Status: {surveyStatusFilter}
//                   <button
//                     onClick={() => setSurveyStatusFilter("")}
//                     className="ml-1 text-orange-600 hover:text-orange-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//             </div>
//             <p className="text-xs text-gray-600 mt-2">
//               Showing {filteredApplications.length} of {applications.length} applications
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gradient-to-r from-orange-500 to-red-500">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Serial No.
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Cluster Number
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut ID
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Address
//                 </th>
//                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Slum FLoor
//                 </th>
             
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Use of Hut
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut Area (sq.m)
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Date of Survey
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Done By
//                 </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Survey Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Action
//                 </th>
                 
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredApplications.length === 0 ? (
//                 <tr>
//                   <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
//                     No applications found matching your search criteria
//                   </td>
//                 </tr>
//               ) : (
//                 filteredApplications.map((app, index) => (
//                   <tr key={app.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {app.id || index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.cluster_number || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_id || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">
//                         {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.gender} • {app.aadhaar_number}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
//                       <div className="truncate">
//                         {app.current_address || app.name_of_slum_area}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.current_pincode && `PIN: ${app.current_pincode}`}
//                       </div>
//                     </td>

//                     <td
//                     className={`px-6 py-4 whitespace-nowrap text-sm ${
//                     app.slum_floor === "G" ? "text-green-600 font-semibold" : "text-gray-700"
//                     }`}
//                     >
//                    {app.slum_floor || "N/A"}
//                    </td>
                 
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_use || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">{app.area_sq_m}</div>
//                       <div className="text-gray-500 text-xs">
//                         {app.length && app.width && `${app.length}×${app.width}m`}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div>{app.created_date || "N/A"}</div>
//                       {app.created_time && (
//                         <div className="text-gray-500 text-xs">{app.created_time}</div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.person_providing_info || "N/A"}
//                     </td>
//                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.survey_status)}`}>
//                         {app.survey_status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <button
//                         onClick={() => openModal(app)}
//                         className="text-blue-600 hover:text-blue-900 transition-colors"
//                         title="View Details"
//                       >
//                         <Eye size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Document Modal */}
//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📁</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div className="space-y-2">
//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1"
//                           >
//                             <Eye size={16} />
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>
                          
//                           <button
//                             onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
//                           >
//                             <Download size={16} />
//                             Download File
//                           </button>
//                         </div>

//                         <div className="space-y-2 mt-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Application Form Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">Add New SRA Application</h2>
//               <button 
//                 onClick={() => setShowAddForm(false)} 
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={28} />
//               </button>
//             </div>
//             <div className="p-6">
//               <AddApplicationForm 
//                 onClose={() => setShowAddForm(false)}
//                 onSuccess={() => {
//                   setShowAddForm(false)
//                   window.location.reload()
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// ==========================================================================

// import { useState, useEffect } from "react"
// import { Eye, Search, Download, X, ChevronLeft, ChevronRight, Plus } from "lucide-react"
// import AddApplicationForm from './AddApplicationForm';
// import AllApplicationsCard from "../components/AllApplicationsCard";

// const API_BASE_URL = "http://13.203.251.59:4200"
// const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 

// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [showAddForm, setShowAddForm] = useState(false)
  
//   // Filter states
//   const [hutUseFilter, setHutUseFilter] = useState("")
//   const [surveyStatusFilter, setSurveyStatusFilter] = useState("")

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   // Download function with token authorization
//   const downloadFile = (url, filename) => {
//     if (!url) {
//       alert("File URL not available")
//       return
//     }
    
//     const link = document.createElement('a')
//     link.href = url
//     link.download = filename || 'document'
//     link.target = '_blank'
//     link.rel = 'noopener noreferrer'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   // Enhanced case-insensitive filtering logic
//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
    
//     // Search filter - case insensitive
//     const matchesSearch = searchTerm === "" || (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString)) ||
//       (app.cluster_number && app.cluster_number.toLowerCase().includes(searchString))
//     )

//     // Use of Hut filter - case insensitive
//     const matchesHutUse = hutUseFilter === "" || (
//       app.slum_use && app.slum_use.toLowerCase().trim() === hutUseFilter.toLowerCase().trim()
//     )

//     // Survey Status filter - case insensitive with multiple variations
//     const matchesSurveyStatus = surveyStatusFilter === "" || (() => {
//       // Handle null or undefined survey_status
//       if (!app.survey_status || app.survey_status === null) {
//         // If filtering for "Pending" and survey_status is null, consider it as pending
//         return surveyStatusFilter.toLowerCase().trim() === "pending"
//       }
      
//       const appStatus = app.survey_status.toLowerCase().trim()
//       const filterStatus = surveyStatusFilter.toLowerCase().trim()
      
//       // Direct match
//       if (appStatus === filterStatus) return true
      
//       // Handle common variations
//       const statusMappings = {
//         'pending': ['pending', 'pendding', 'panding'],
//         'completed': ['completed', 'complete', 'complated'],
//         'ready for survey': ['ready for survey', 'ready_for_survey', 'readyforsurvey', 'ready survey'],
//         'hut appose': ['hut appose', 'hut_appose', 'hutappose', 'hut oppose']
//       }
      
//       // Check if the filter status matches any variations
//       for (const [key, variations] of Object.entries(statusMappings)) {
//         if (variations.includes(filterStatus) && variations.includes(appStatus)) {
//           return true
//         }
//       }
      
//       return false
//     })()

//     return matchesSearch && matchesHutUse && matchesSurveyStatus
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//       "document_upload"
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   // Enhanced status color function with case-insensitive matching
//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
    
//     const statusLower = status.toLowerCase().trim()
    
//     if (statusLower.includes("ready") && statusLower.includes("survey")) {
//       return "bg-green-100 text-green-800"
//     }
//     if (statusLower.includes("pending")) {
//       return "bg-yellow-100 text-yellow-800"
//     }
//     if (statusLower.includes("completed") || statusLower.includes("complete")) {
//       return "bg-blue-100 text-blue-800"
//     }
//     if (statusLower.includes("appose") || statusLower.includes("oppose")) {
//       return "bg-red-100 text-red-800"
//     }
    
//     return "bg-gray-100 text-gray-800"
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>
//         </div>
//       )
//     }

//     // For other file types
//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <button
//                   key={index}
//                   onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
//                   className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
//                 >
//                   <Download size={16} />
//                   Download File {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//           >
//             <Download size={20} />
//             Download File
//           </button>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">📊 Survey Status</h2> */}


//  <div className="flex items-center justify-center space-x-4 mb-6">
//   <img 
//     src="/images/logo.jpeg" 
//     alt="Logo" 
   
//     className="w-7 h-7 object-cover"
//   />
//   <h2 className="text-2xl font-semibold text-gray-800 text-center">Survey Status</h2>
// </div>




//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="text-center p-4 bg-blue-50 rounded-lg">
//             <div className="text-2xl font-bold text-blue-600">{0}</div>
//             <div className="text-blue-800 text-sm font-medium">Completed</div>
//           </div>
//           <div className="text-center p-4 bg-green-50 rounded-lg">
//             <div className="text-2xl font-bold text-green-600">{0}</div>
//             <div className="text-green-800 text-sm font-medium">Pending</div>
//           </div>
//           <div className="text-center p-4 bg-orange-50 rounded-lg">
//             <div className="text-2xl font-bold text-orange-600">{0}</div>
//             <div className="text-orange-800 text-sm font-medium">Hut Appose</div>
//           </div>
//           <div className="text-center p-4 bg-purple-50 rounded-lg">
//             <div className="text-2xl font-bold text-purple-600">{0}</div>
//             <div className="text-purple-800 text-sm font-medium">Hut Denied</div>
//           </div>
//         </div>
//       </div>
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">MHADA Applications</h1>
//           <p className="text-gray-600 text-lg">
//             Complete view of MHADA applications in table format ({applications.length} total records)
//           </p>
//         </div>
        
//         {/* Add New Application Button */}
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 flex items-center gap-2 font-medium"
//         >
//           <Plus size={20} />
//           Add New Application
//         </button>
//       </div>

//       {/* Search Bar and Filters */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         {/* Search Bar */}
//         <div className="relative mb-4">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="text-gray-400" size={20} />
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, cluster number, or Aadhaar number..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Filter Dropdowns */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Use of Hut Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Use of Hut
//             </label>
//             <select
//               value={hutUseFilter}
//               onChange={(e) => setHutUseFilter(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
//             >
//               <option value="">All Uses</option>
//               <option value="Social">Social</option>
//               <option value="Residential">Residential</option>
//               <option value="Commercial">Commercial</option>
//             </select>
//           </div>

//           {/* Survey Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Survey Status
//             </label>
//             <select
//               value={surveyStatusFilter}
//               onChange={(e) => setSurveyStatusFilter(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
//             >
//               <option value="">All Statuses</option>
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//               <option value="Ready For Survey">Ready For Survey</option>
//               <option value="Hut Appose">Hut Appose</option>
//             </select>
//           </div>

//           {/* Clear Filters Button */}
//           <div className="flex items-end">
//             <button
//               onClick={() => {
//                 setHutUseFilter("")
//                 setSurveyStatusFilter("")
//                 setSearchTerm("")
//               }}
//               className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         </div>

//         {/* Active Filters Display */}
//         {(hutUseFilter || surveyStatusFilter || searchTerm) && (
//           <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//             <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
//             <div className="flex flex-wrap gap-2">
//               {searchTerm && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
//                   Search: "{searchTerm}"
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="ml-1 text-blue-600 hover:text-blue-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//               {hutUseFilter && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
//                   Use: {hutUseFilter}
//                   <button
//                     onClick={() => setHutUseFilter("")}
//                     className="ml-1 text-green-600 hover:text-green-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//               {surveyStatusFilter && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
//                   Status: {surveyStatusFilter}
//                   <button
//                     onClick={() => setSurveyStatusFilter("")}
//                     className="ml-1 text-orange-600 hover:text-orange-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//             </div>
//             <p className="text-xs text-gray-600 mt-2">
//               Showing {filteredApplications.length} of {applications.length} applications
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gradient-to-r from-orange-500 to-red-500">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Serial No.
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Cluster Number
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut ID
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Address
//                 </th>
//                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Slum FLoor
//                 </th>
             
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Use of Hut
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Hut Area (sq.m)
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Date of Survey
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Done By
//                 </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Survey Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Action
//                 </th>
                 
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredApplications.length === 0 ? (
//                 <tr>
//                   <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
//                     No applications found matching your search criteria
//                   </td>
//                 </tr>
//               ) : (
//                 filteredApplications.map((app, index) => (
//                   <tr key={app.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {app.id || index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.cluster_number || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_id || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">
//                         {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.gender} • {app.aadhaar_number}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
//                       <div className="truncate">
//                         {app.current_address || app.name_of_slum_area}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.current_pincode && `PIN: ${app.current_pincode}`}
//                       </div>
//                     </td>

//                     <td
//                     className={`px-6 py-4 whitespace-nowrap text-sm ${
//                     app.slum_floor === "G" ? "text-green-600 font-semibold" : "text-gray-700"
//                     }`}
//                     >
//                    {app.slum_floor || "N/A"}
//                    </td>
                 
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.slum_use || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">{app.area_sq_m}</div>
//                       <div className="text-gray-500 text-xs">
//                         {app.length && app.width && `${app.length}×${app.width}m`}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div>{app.created_date || "N/A"}</div>
//                       {app.created_time && (
//                         <div className="text-gray-500 text-xs">{app.created_time}</div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.person_providing_info || "N/A"}
//                     </td>
//                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.survey_status)}`}>
//                         {app.survey_status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center">
//                       <button
//                         onClick={() => openModal(app)}
//                         className="text-blue-600 hover:text-blue-900 transition-colors"
//                         title="View Details"
//                       >
//                         <Eye size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Document Modal */}
//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📁</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div className="space-y-2">
//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1"
//                           >
//                             <Eye size={16} />
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>
                          
//                           <button
//                             onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
//                           >
//                             <Download size={16} />
//                             Download File
//                           </button>
//                         </div>

//                         <div className="space-y-2 mt-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Application Form Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">Add New SRA Application</h2>
//               <button 
//                 onClick={() => setShowAddForm(false)} 
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={28} />
//               </button>
//             </div>
//             <div className="p-6">
//               <AddApplicationForm 
//                 onClose={() => setShowAddForm(false)}
//                 onSuccess={() => {
//                   setShowAddForm(false)
//                   window.location.reload()
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// ===================================================================

// import { useState, useEffect } from "react"
// import { Eye, Search, Download, X, ChevronLeft, ChevronRight, Plus } from "lucide-react"
// import AddApplicationForm from './AddApplicationForm';
// import AllApplicationsCard from "../components/AllApplicationsCard";
// import './AllApplicationsPage.css';

// // const API_BASE_URL = "http://13.203.251.59:4200"
// // const DOCUMENT_BASE_URL = "http://13.203.251.59:4200" 
// const API_BASE_URL = "https://sra.saavi.co.in"
// const DOCUMENT_BASE_URL = "https://sra.saavi.co.in" 


// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [showAddForm, setShowAddForm] = useState(false)
//     const [generatingPdfs, setGeneratingPdfs] = useState(false)

//   // Filter states
//   const [hutUseFilter, setHutUseFilter] = useState("")
//   const [surveyStatusFilter, setSurveyStatusFilter] = useState("")

//     const [success, setSuccess] = useState(null)


//   // Function to count applications by status
//   const getStatusCounts = () => {
//     const statusMappings = {
//       'Pending': ['pending', 'pendding', 'panding'],
//       'Completed': ['completed', 'complete', 'complated'],
//       'Ready For Survey': ['ready for survey', 'ready_for_survey', 'readyforsurvey', 'ready survey'],
//       'Hut Appose': ['hut appose', 'hut_appose', 'hutappose', 'hut oppose'],
//       'Hut Denied': ['hut denied', 'hut_denied', 'hutdenied', 'hut deny', 'rejected', 'reject']
//     }

//     const counts = {
//       pending: 0,
//       completed: 0,
//       hutAppose: 0,
//       hutDenied: 0
//     }

//     applications.forEach(app => {
//       const status = app.survey_status || ''
//       const statusLower = status.toLowerCase().trim()

//       // Check for Pending
//       if (!status || statusMappings['Pending'].includes(statusLower)) {
//         counts.pending++
//       }
//       // Check for Completed
//       else if (statusMappings['Completed'].includes(statusLower)) {
//         counts.completed++
//       }
//       // Check for Hut Appose
//       else if (statusMappings['Hut Appose'].includes(statusLower)) {
//         counts.hutAppose++
//       }
//       // Check for Hut Denied
//       else if (statusMappings['Hut Denied'].includes(statusLower)) {
//         counts.hutDenied++
//       }
//       // If no match found, consider it as pending
//       else {
//         counts.pending++
//       }
//     })

//     return counts
//   }

//   // Get the actual counts
//   const statusCounts = getStatusCounts()

//   // Parse originalPath from stringified JSON array to actual array
//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       // If it's already an array, return as is
//       if (Array.isArray(originalPath)) return originalPath
      
//       // If it's a stringified JSON array, parse it
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
      
//       // If it's a simple string, return as single item array
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

//   const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   // Download function with token authorization
//   const downloadFile = (url, filename) => {
//     if (!url) {
//       alert("File URL not available")
//       return
//     }
    
//     const link = document.createElement('a')
//     link.href = url
//     link.download = filename || 'document'
//     link.target = '_blank'
//     link.rel = 'noopener noreferrer'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }


// //   // ✅ Jodpatra-3 PDF Generator
// //   const generateJodpatra3 = async (data) => {
// //     let imageUrls = [];

// //     if (data.side_photo_path) {
// //       try {
// //         const parsed = JSON.parse(data.side_photo_path);
// //         imageUrls = Array.isArray(parsed) ? parsed : [data.side_photo_path];
// //       } catch (e) {
// //         imageUrls = [data.side_photo_path];
// //       }
// //     }

// //     const firstImageUrl = imageUrls.length > 0
// //       ? imageUrls[0].trim().replace(/^["']+|["']+$/g, '')
// //       : null;

// //     return new Promise((resolve, reject) => {
// //       const pdfElement = document.createElement("div");
// //       pdfElement.style.width = "210mm";
// //       pdfElement.style.minHeight = "297mm";
// //       pdfElement.style.padding = "15mm";
// //       pdfElement.style.fontFamily = "Arial, sans-serif";
// //       pdfElement.style.fontSize = "12px";
// //       pdfElement.style.lineHeight = "1.4";
// //       pdfElement.style.backgroundColor = "white";
// //       pdfElement.style.position = "absolute";
// //       pdfElement.style.top = "-9999px";

// //       pdfElement.innerHTML = `
// //         <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
// //           <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
// //           <hr style="margin: 8px 0; border: 1px solid #000;">
// //           <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
// //           <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
// //           <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
// //         </div>

// //         <div style="margin-bottom: 20px;">
// //           <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${
// //                 data.slum_id || "N/A"
// //               }</td>
// //               <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString(
// //                 "en-GB"
// //               )}</td>
// //             </tr>
// //           </table>
// //         </div>

// //         <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
// //           ${
// //             firstImageUrl
// //               ? `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
// //               :  `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
// //           }
// //         </div>

// //         <div style="margin-bottom: 20px;">
// //           <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>

// //           <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; width: 35%; font-weight: bold;">१. अर्जदाराचे नाव:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${
// //                 data.first_name || ""
// //               } ${data.middle_name || ""} ${data.last_name || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${
// //                 data.gender || ""
// //               }</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${
// //                 data.aadhaar_number || ""
// //               }</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${
// //                 data.current_mobile_number || ""
// //               }</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${
// //                 data.name_of_slum_area || ""
// //               }</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${
// //                 data.ward || ""
// //               }</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${
// //                 data.current_address || ""
// //               }</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${
// //                 data.residency_since || ""
// //               }</td>
// //             </tr>
// //           </table>
// //         </div>

// //         <div style="margin-bottom: 20px;">
// //           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>

// //           <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
// //             <tr>
// //               <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
// //               <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
// //               <th style="border: 1px solid #000; padding: 4px;">वय</th>
// //               <th style="border: 1px solid #000; padding: 4px;">नातं</th>
// //               <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
// //               <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
// //             </tr>
// //             ${Array.from(
// //               { length: Math.min(parseInt(data.num_family_members) || 0, 6) },
// //               (_, i) => {
// //                 const memberNum = i + 1;
// //                 return `
// //                 <tr>
// //                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
// //                   <td style="border: 1px solid #000; padding: 4px;">${
// //                     data[`family_member${memberNum}_name`] || ""
// //                   }</td>
// //                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
// //                     data[`family_member${memberNum}_age`] || ""
// //                   }</td>
// //                   <td style="border: 1px solid #000; padding: 4px;">${
// //                     data[`family_member${memberNum}_relation`] || ""
// //                   }</td>
// //                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
// //                     data[`family_member${memberNum}_gender`] || ""
// //                   }</td>
// //                   <td style="border: 1px solid #000; padding: 4px;">${
// //                     data[`family_member${memberNum}_aadhaar`] || ""
// //                   }</td>
// //                 </tr>
// //               `;
// //               }
// //             ).join("")}
// //           </table>
// //         </div>

// //         <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
// //           <div style="text-align: center;">
// //             <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
// //              <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
// //             </div>
// //             <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
// //             <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
// //           </div>
// //         </div>
// //       `;

// //       document.body.appendChild(pdfElement);

// //       setTimeout(() => {
// //         html2canvas(pdfElement, { scale: 2, useCORS: true })
// //           .then((canvas) => {
// //             const imgData = canvas.toDataURL("image/png");
// //             const pdf = new jsPDF("p", "mm", "a4");
// //             const pdfWidth = pdf.internal.pageSize.getWidth();
// //             const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

// //             pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

// //             pdf.save(
// //               `Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`
// //             );

// //             document.body.removeChild(pdfElement);
// //             resolve(true);
// //           })
// //           .catch((err) => {
// //             document.body.removeChild(pdfElement);
// //             reject(err);
// //           });
// //       }, 500);
// //     });
// //   };

// //   // ✅ Jodpatra-4 PDF Generator
// //   const generateJodpatra4 = async (data) => {
// //     return new Promise((resolve, reject) => {
// //       const pdfElement = document.createElement('div');
// //       pdfElement.style.width = '210mm';
// //       pdfElement.style.minHeight = '297mm';
// //       pdfElement.style.padding = '15mm';
// //       pdfElement.style.fontFamily = 'Arial, sans-serif';
// //       pdfElement.style.fontSize = '12px';
// //       pdfElement.style.lineHeight = '1.4';
// //       pdfElement.style.backgroundColor = 'white';
// //       pdfElement.style.position = 'absolute';
// //       pdfElement.style.top = '-9999px';

// //       pdfElement.innerHTML = `
// //         <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
// //           <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
// //           <hr style="margin: 8px 0; border: 1px solid #000;">
// //           <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
// //           <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
// //           <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या  रहात असल्यास करावयाचा अर्ज</p>
// //         </div>

// //         <div style="margin-bottom: 20px;">
// //           <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.slum_id || "N/A"}</td>
// //               <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
// //             </tr>
// //           </table>
// //         </div>

// //         <div style="text-align: left; margin-bottom: 20px;">
// //           <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
// //             <img
// //               src="/user2.png"
// //               alt="Arjdaar Photo"
// //               style="width: 100%; height: 100%; object-fit: cover;"
// //             />
// //           </div>
// //           <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
// //         </div>

// //         <div style="margin-bottom: 20px;">
// //           <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">मी खालील नमूद केलेल्या माहितीची खात्री देतो:</p>

// //           <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">१. मुख्य अर्जदाराचे नाव:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${data.name_of_slum_area || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""} पासून</td>
// //             </tr>
// //           </table>
// //         </div>

// //         <div style="margin-bottom: 20px;">
// //           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
// //           <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
// //               <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${data.num_family_members || ""} सदस्य</td>
// //             </tr>
// //           </table>

// //           <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
// //             <tr">
// //               <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
// //               <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
// //               <th style="border: 1px solid #000; padding: 4px;">वय</th>
// //               <th style="border: 1px solid #000; padding: 4px;">नातं</th>
// //               <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
// //               <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
// //             </tr>
// //             ${Array.from({length: Math.min(parseInt(data.num_family_members) || 0, 6)}, (_, i) => {
// //               const memberNum = i + 1;
// //               return `
// //                 <tr>
// //                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
// //                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_name`] || ""}</td>
// //                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_age`] || ""}</td>
// //                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_relation`] || ""}</td>
// //                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_gender`] || ""}</td>
// //                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_aadhaar`] || ""}</td>
// //                 </tr>
// //               `;
// //             }).join('')}
// //           </table>
// //         </div>

// //         <div style="margin-bottom: 20px;">
// //           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
// //           <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">लांबी (मीटर):</td>
// //               <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.length || ""}</td>
// //               <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">रुंदी (मीटर):</td>
// //               <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.width || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
// //               <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
// //             </tr>
// //           </table>
// //         </div>

// //         <div style="margin-bottom: 20px;">
// //           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
// //           <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">बँकेचे नाव:</td>
// //               <td style="border: 1px solid #000; padding: 5px; width: 70%;">${data.bank_name || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td>
// //             </tr>
// //             <tr>
// //               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
// //               <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td>
// //             </tr>
// //           </table>
// //         </div>

// //         <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
// //           <div style="text-align: center;">
// //             <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
// //               <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
// //             </div>
// //             <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
// //             <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
// //           </div>
// //         </div>

// //         <div style="margin-top: 25px; text-align: center; padding-top: 15px; border-top: 1px solid #000;">
// //           <p style="font-size: 10px; font-weight: bold; margin: 3px 0;">संपर्क माहिती:</p>
// //           <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
// //           <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
// //         </div>

// //         <div style="margin-top: 15px; text-align: center; font-size: 9px; color: #666;">
// //           <p style="margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
// //           <p style="margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
// //         </div>
// //       `;

// //       document.body.appendChild(pdfElement);

// //       setTimeout(() => {
// //         html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
// //           const imgData = canvas.toDataURL('image/png');
// //           const pdf = new jsPDF('p', 'mm', 'a4');
// //           const pageWidth = pdf.internal.pageSize.getWidth();
// //           const pageHeight = pdf.internal.pageSize.getHeight();

// //           const canvasHeight = (canvas.height * pageWidth) / canvas.width;

// //           pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, canvasHeight);

// //           pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

// //           document.body.removeChild(pdfElement);
// //           resolve(true);
// //         }).catch((err) => {
// //           document.body.removeChild(pdfElement);
// //           reject(err);
// //         });
// //       }, 500);
// //     });
// //   };

// //   // Main PDF generation function
// //   const generateAndDownloadPdfs = async (formData) => {
// //     console.log("testing form data>>>>>>>>>>>", formData)
// //     setGeneratingPdfs(true);
// //     setError(null);

// //     try {
// //       const dateStr = formData.residency_since;
// //       console.log("Residency date string:", dateStr);

// //       let isJodpatra3 = false;

// //       if (dateStr === "00-00-0000") {
// //         isJodpatra3 = true;
// //       } else {
// //         const [day, month, year] = dateStr.split("-").map(Number);
// //         const selectedDate = new Date(year, month - 1, day);
// //         const cutoffDate = new Date(2000, 0, 1);

// //         if (selectedDate <= cutoffDate) {
// //           isJodpatra3 = true;
// //         }
// //       }

// //       if (isJodpatra3) {
// //         setSuccess("Generating Jodpatra-3 for residency 2000 or before...");
// //         console.log("Generating Jodpatra-3 for date:", dateStr);

// //         await generateJodpatra3(formData);
// //         setSuccess("✅ Successfully generated and downloaded Jodpatra-3!");
// //       } else {
// //         setSuccess("Generating Jodpatra-4 for residency after 2000...");
// //         console.log("Generating Jodpatra-4 for date:", dateStr);

// //         await generateJodpatra4(formData);
// //         setSuccess("✅ Successfully generated and downloaded Jodpatra-4!");
// //       }
// //     } catch (error) {
// //       console.error("Error generating PDFs:", error);
// //       setError("Error generating PDFs: " + error.message);
// //     } finally {
// //       setTimeout(() => {
// //         setGeneratingPdfs(false);
// //         setSuccess(null);
// //       }, 3000);
// //     }
// //   };

// // ✅ Jodpatra-3 PDF Generator
//   const generateJodpatra3 = async (data) => {
//     let imageUrls = [];

//     if (data.side_photo_path) {
//       try {
//         const parsed = JSON.parse(data.side_photo_path);
//         imageUrls = Array.isArray(parsed) ? parsed : [data.side_photo_path];
//       } catch (e) {
//         imageUrls = [data.side_photo_path];
//       }
//     }

//     const firstImageUrl = imageUrls.length > 0
//       ? imageUrls[0].trim().replace(/^["']+|["']+$/g, '')
//       : null;

//     return new Promise((resolve, reject) => {
//       const pdfElement = document.createElement("div");
//       pdfElement.style.width = "210mm";
//       pdfElement.style.minHeight = "297mm";
//       pdfElement.style.padding = "15mm";
//       pdfElement.style.fontFamily = "Arial, sans-serif";
//       pdfElement.style.fontSize = "12px";
//       pdfElement.style.lineHeight = "1.4";
//       pdfElement.style.backgroundColor = "white";
//       pdfElement.style.position = "absolute";
//       pdfElement.style.top = "-9999px";

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//           <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//           <hr style="margin: 8px 0; border: 1px solid #000;">
//           <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
//           <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//           <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${
//                 data.slum_id || "N/A"
//               }</td>
//               <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString(
//                 "en-GB"
//               )}</td>
//             </tr>
//           </table>
//         </div>

//         <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
//           ${
//             firstImageUrl
//               ? `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
//               :  `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
//           }
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>

//           <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 35%; font-weight: bold;">१. अर्जदाराचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.first_name || ""
//               } ${data.middle_name || ""} ${data.last_name || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.gender || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.aadhaar_number || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.current_mobile_number || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.name_of_slum_area || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.ward || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.current_address || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.residency_since || ""
//               }</td>
//             </tr>
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>

//           <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//             <tr>
//               <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//               <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//               <th style="border: 1px solid #000; padding: 4px;">वय</th>
//               <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//               <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//               <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//             </tr>
//             ${Array.from(
//               { length: Math.min(parseInt(data.num_family_members) || 0, 6) },
//               (_, i) => {
//                 const memberNum = i + 1;
//                 return `
//                 <tr>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${
//                     data[`family_member${memberNum}_name`] || ""
//                   }</td>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
//                     data[`family_member${memberNum}_age`] || ""
//                   }</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${
//                     data[`family_member${memberNum}_relation`] || ""
//                   }</td>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
//                     data[`family_member${memberNum}_gender`] || ""
//                   }</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${
//                     data[`family_member${memberNum}_aadhaar`] || ""
//                   }</td>
//                 </tr>
//               `;
//               }
//             ).join("")}
//           </table>
//         </div>

//         <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//           <div style="text-align: center;">
//             <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//              <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
//             </div>
//             <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//             <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
//           </div>
//         </div>
//       `;

//       document.body.appendChild(pdfElement);

//       setTimeout(() => {
//         html2canvas(pdfElement, { scale: 2, useCORS: true })
//           .then((canvas) => {
//             const imgData = canvas.toDataURL("image/png");
//             const pdf = new jsPDF("p", "mm", "a4");
//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//             pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

//             pdf.save(
//               `Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`
//             );

//             document.body.removeChild(pdfElement);
//             resolve(true);
//           })
//           .catch((err) => {
//             document.body.removeChild(pdfElement);
//             reject(err);
//           });
//       }, 500);
//     });
//   };

//   // ✅ Jodpatra-4 PDF Generator
//   const generateJodpatra4 = async (data) => {
//     return new Promise((resolve, reject) => {
//       const pdfElement = document.createElement('div');
//       pdfElement.style.width = '210mm';
//       pdfElement.style.minHeight = '297mm';
//       pdfElement.style.padding = '15mm';
//       pdfElement.style.fontFamily = 'Arial, sans-serif';
//       pdfElement.style.fontSize = '12px';
//       pdfElement.style.lineHeight = '1.4';
//       pdfElement.style.backgroundColor = 'white';
//       pdfElement.style.position = 'absolute';
//       pdfElement.style.top = '-9999px';

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//           <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//           <hr style="margin: 8px 0; border: 1px solid #000;">
//           <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
//           <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
//           <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या  रहात असल्यास करावयाचा अर्ज</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.slum_id || "N/A"}</td>
//               <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
//             </tr>
//           </table>
//         </div>

//         <div style="text-align: left; margin-bottom: 20px;">
//           <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
//             <img
//               src="/user2.png"
//               alt="Arjdaar Photo"
//               style="width: 100%; height: 100%; object-fit: cover;"
//             />
//           </div>
//           <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">मी खालील नमूद केलेल्या माहितीची खात्री देतो:</p>

//           <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">१. मुख्य अर्जदाराचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.name_of_slum_area || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""} पासून</td>
//             </tr>
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
//           <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
//               <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${data.num_family_members || ""} सदस्य</td>
//             </tr>
//           </table>

//           <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//             <tr">
//               <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//               <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//               <th style="border: 1px solid #000; padding: 4px;">वय</th>
//               <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//               <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//               <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//             </tr>
//             ${Array.from({length: Math.min(parseInt(data.num_family_members) || 0, 6)}, (_, i) => {
//               const memberNum = i + 1;
//               return `
//                 <tr>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_name`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_age`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_relation`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_gender`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_aadhaar`] || ""}</td>
//                 </tr>
//               `;
//             }).join('')}
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
//           <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">लांबी (मीटर):</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.length || ""}</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">रुंदी (मीटर):</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.width || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
//               <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
//             </tr>
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
//           <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">बँकेचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 70%;">${data.bank_name || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td>
//             </tr>
//           </table>
//         </div>

//         <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//           <div style="text-align: center;">
//             <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//               <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
//             </div>
//             <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//             <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
//           </div>
//         </div>

//         <div style="margin-top: 25px; text-align: center; padding-top: 15px; border-top: 1px solid #000;">
//           <p style="font-size: 10px; font-weight: bold; margin: 3px 0;">संपर्क माहिती:</p>
//           <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
//           <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
//         </div>

//         <div style="margin-top: 15px; text-align: center; font-size: 9px; color: #666;">
//           <p style="margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
//           <p style="margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
//         </div>
//       `;

//       document.body.appendChild(pdfElement);

//       setTimeout(() => {
//         html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//           const imgData = canvas.toDataURL('image/png');
//           const pdf = new jsPDF('p', 'mm', 'a4');
//           const pageWidth = pdf.internal.pageSize.getWidth();
//           const pageHeight = pdf.internal.pageSize.getHeight();

//           const canvasHeight = (canvas.height * pageWidth) / canvas.width;

//           pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, canvasHeight);

//           pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

//           document.body.removeChild(pdfElement);
//           resolve(true);
//         }).catch((err) => {
//           document.body.removeChild(pdfElement);
//           reject(err);
//         });
//       }, 500);
//     });
//   };

//   // Main PDF generation function
//   const generateAndDownloadPdfs = async (formData) => {
//     console.log("testing form data>>>>>>>>>>>", formData)
//     setGeneratingPdfs(true);
//     setError(null);

//     try {
//       const dateStr = formData.residency_since;
//       console.log("Residency date string:", dateStr);

//       let isJodpatra3 = false;

//       if (dateStr === "00-00-0000") {
//         isJodpatra3 = true;
//       } else {
//         const [day, month, year] = dateStr.split("-").map(Number);
//         const selectedDate = new Date(year, month - 1, day);
//         const cutoffDate = new Date(2000, 0, 1);

//         if (selectedDate <= cutoffDate) {
//           isJodpatra3 = true;
//         }
//       }

//       if (isJodpatra3) {
//         setSuccess("Generating Jodpatra-3 for residency 2000 or before...");
//         console.log("Generating Jodpatra-3 for date:", dateStr);

//         await generateJodpatra3(formData);
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-3!");
//       } else {
//         setSuccess("Generating Jodpatra-4 for residency after 2000...");
//         console.log("Generating Jodpatra-4 for date:", dateStr);

//         await generateJodpatra4(formData);
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-4!");
//       }
//     } catch (error) {
//       console.error("Error generating PDFs:", error);
//       setError("Error generating PDFs: " + error.message);
//     } finally {
//       setTimeout(() => {
//         setGeneratingPdfs(false);
//         setSuccess(null);
//       }, 3000);
//     }
//   };

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = getAuthToken()
//         if (!token) {
//           throw new Error("No authentication token found")
//         }

//         const response = await fetch(`${API_BASE_URL}/api/sra-logs/all-logs`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Authentication failed. Please login again.")
//           }
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()
//         setApplications(data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [])

//   // Enhanced case-insensitive filtering logic
//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()
    
//     // Search filter - case insensitive
//     const matchesSearch = searchTerm === "" || (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString)) ||
//       (app.cluster_number && app.cluster_number.toLowerCase().includes(searchString)) ||
//       (app.slum_use && app.slum_use.toLowerCase().includes(searchString)) 
//     )

//     // Use of Hut filter - case insensitive
//     const matchesHutUse = hutUseFilter === "" || (
//       app.slum_use && app.slum_use.toLowerCase().trim() === hutUseFilter.toLowerCase().trim()
//     )

//     // Survey Status filter - case insensitive with multiple variations
//     const matchesSurveyStatus = surveyStatusFilter === "" || (() => {
//       // Handle null or undefined survey_status
//       if (!app.survey_status || app.survey_status === null) {
//         // If filtering for "Pending" and survey_status is null, consider it as pending
//         return surveyStatusFilter.toLowerCase().trim() === "pending"
//       }
      
//       const appStatus = app.survey_status.toLowerCase().trim()
//       const filterStatus = surveyStatusFilter.toLowerCase().trim()
      
//       // Direct match
//       if (appStatus === filterStatus) return true
      
//       // Handle common variations
//       const statusMappings = {
//         'pending': ['pending', 'pendding', 'panding'],
//         'completed': ['completed', 'complete', 'complated'],
//         'ready for survey': ['ready for survey', 'ready_for_survey', 'readyforsurvey', 'ready survey'],
//         'hut appose': ['hut appose', 'hut_appose', 'hutappose', 'hut oppose']
//       }
      
//       // Check if the filter status matches any variations
//       for (const [key, variations] of Object.entries(statusMappings)) {
//         if (variations.includes(filterStatus) && variations.includes(appStatus)) {
//           return true
//         }
//       }
      
//       return false
//     })()

//     return matchesSearch && matchesHutUse && matchesSurveyStatus
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//       "document_upload"
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath // Direct S3 URL, no need for getDocumentUrl
        
//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   // Enhanced status color function with case-insensitive matching
//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
    
//     const statusLower = status.toLowerCase().trim()
    
//     if (statusLower.includes("ready") && statusLower.includes("survey")) {
//       return "bg-green-100 text-green-800"
//     }
//     if (statusLower.includes("pending")) {
//       return "bg-yellow-100 text-yellow-800"
//     }
//     if (statusLower.includes("completed") || statusLower.includes("complete")) {
//       return "bg-blue-100 text-blue-800"
//     }
//     if (statusLower.includes("appose") || statusLower.includes("oppose")) {
//       return "bg-red-100 text-red-800"
//     }
    
//     return "bg-gray-100 text-gray-800"
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) => 
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple images */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Image counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>

//           {/* Thumbnail navigation for multiple images */}
//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {/* Navigation buttons for multiple videos */}
//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Video counter */}
//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>
//         </div>
//       )
//     }

//     // For other file types
//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <button
//                   key={index}
//                   onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
//                   className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
//                 >
//                   <Download size={16} />
//                   Download File {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//           >
//             <Download size={20} />
//             Download File
//           </button>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div style={{backgroundColor:'#F9FAFB'}} className="min-h-screen bg-gray-50 p-4">
//        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//         {/* <div className="flex items-center justify-center space-x-4 mb-6">
//           <img 
//             src="/images/logo.jpeg" 
//             alt="Logo" 
//             className="w-7 h-7 object-cover"
//           />
//           <h2 style={{color:'#4A5565',textTransform:'uppercase'}} className="text-xl font-bold mb-2 text-center">Survey Status</h2>
//         </div> */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="text-center p-4 bg-blue-100 rounded-lg">
//             <div className="text-2xl font-bold text-blue-600">{statusCounts.completed}</div>
//             <div className="text-blue-800 text-sm font-medium">Completed</div>
//           </div>
//           <div className="text-center p-4 bg-green-100 rounded-lg">
//             <div className="text-2xl font-bold text-green-600">{statusCounts.pending}</div>
//             <div className="text-green-800 text-sm font-medium">Pending</div>
//           </div>
//           <div className="text-center p-4 bg-orange-100 rounded-lg">
//             <div className="text-2xl font-bold text-orange-600">{statusCounts.hutAppose}</div>
//             <div className="text-orange-800 text-sm font-medium">Hut Appose</div>
//           </div>
//           <div className="text-center p-4 bg-purple-100 rounded-lg">
//             <div className="text-2xl font-bold text-purple-600">{statusCounts.hutDenied}</div>
//             <div className="text-purple-800 text-sm font-medium">Hut Denied</div>
//           </div>
//         </div>
//       </div>
//       <div className="mb-9 flex justify-between items-center">
//         <div>
//           <h1 style={{color:'#4A5565',textTransform:'uppercase'}} className="text-xl font-bold mb-2">MHADA Applications</h1>
//           <p className="text-gray-600 text-lg">
//             Complete view of MHADA applications ({applications.length} total records)
//           </p>
//         </div>
        
//         {/* Add New Application Button */}
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="text-white px-2 py-1.5 rounded-lg hover:bg-orange-700 flex items-center gap-1.5 font-medium"
//           style={{backgroundColor:'#4A5565'}}
//         >
//           <Plus size={20} />
//           Add Application
//         </button>
//       </div>

//       {/* Search Bar and Filters */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-15">
//         {/* Search Bar */}
//         <div className="relative mb-4">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="text-gray-800" size={20} />
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name, slum ID, area, cluster number, or Aadhaar number..."
//             className="w-240 pl-10 pr-4 py-3 border border-[#4A5565] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Filter Dropdowns */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Use of Hut Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Use of Hut
//             </label>
//             <select
//               value={hutUseFilter}
//               onChange={(e) => setHutUseFilter(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
//             >
//               <option value="">All Uses</option>
//               <option value="Residential">Residential</option>
//                <option value="Commercial">Commercial</option>
//                <option value="combine">Combine</option>
//                <option value="Social">Social</option>
//                <option value="Devotional">Devotional</option>
//                <option value="Educational">Educational</option>
//               <option value="Residential / Commercial">Residential / Commercial</option>  
//             </select>
//           </div>

//           {/* Survey Status Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Survey Status
//             </label>
//             <select
//               value={surveyStatusFilter}
//               onChange={(e) => setSurveyStatusFilter(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
//             >
//               <option value="">All Statuses</option>
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//               <option value="Ready For Survey">Ready For Survey</option>
//               <option value="Hut Appose">Hut Appose</option>
//             </select>
//           </div>

          

//           {/* Clear Filters Button */}
//           {/* <div className="flex items-end">
//             <button
//               onClick={() => {
//                 setHutUseFilter("")
//                 setSurveyStatusFilter("")
//                 setSearchTerm("")
//               }}
//           className="text-white px-2 py-1.5 rounded-lg hover:bg-orange-700 flex items-center font-medium w-40 text-center"
//           style={{backgroundColor:'#4A5565'}} 
//             >
//               Clear All Filters
//             </button>
//           </div> */}
//           <div className="flex items-end">
//   <button
//     onClick={() => {
//       setHutUseFilter("")
//       setSurveyStatusFilter("")
//       setSearchTerm("")
//     }}
//     className="text-white px-2 py-1.5 rounded-lg hover:bg-orange-700 font-medium w-40 text-center"
//     style={{ backgroundColor: "#4A5565" }}
//   >
//     Clear Filters
//   </button>
// </div>

//         </div>

//         {/* Active Filters Display */}
//         {(hutUseFilter || surveyStatusFilter || searchTerm) && (
//           <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//             <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
//             <div className="flex flex-wrap gap-2">
//               {searchTerm && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
//                   Search: "{searchTerm}"
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="ml-1 text-blue-600 hover:text-blue-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//               {hutUseFilter && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
//                   Use: {hutUseFilter}
//                   <button
//                     onClick={() => setHutUseFilter("")}
//                     className="ml-1 text-green-600 hover:text-green-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//               {surveyStatusFilter && (
//                 <span className="inline-flex items-center px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
//                   Status: {surveyStatusFilter}
//                   <button
//                     onClick={() => setSurveyStatusFilter("")}
//                     className="ml-1 text-orange-600 hover:text-orange-800"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               )}
//             </div>
//             <p className="text-xs text-gray-600 mt-2">
//               Showing {filteredApplications.length} of {applications.length} applications
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table>
//             <thead className="Alp-thead">
//               <tr>
//                 <th className="Alp-th">
//                   Serial No.
//                 </th>
//                 <th className="Alp-th">
//                   Cluster Number
//                 </th>
//                 <th className="Alp-th">
//                   Hut ID
//                 </th>
//                 <th className="Alp-th">
//                   Name
//                 </th>
//                 <th className="Alp-th">
//                   Address
//                 </th>
//                  <th className="Alp-th">
//                   Slum FLoor
//                 </th>
             
//                 <th className="Alp-th">
//                   Use of Hut
//                 </th>
//                 <th className="Alp-th">
//                   Hut Area (sq.m)
//                 </th>
//                 <th className="Alp-th">
//                   Date of Survey
//                 </th>
//                 <th className="Alp-th">
//                   Done By
//                 </th>
//                   <th className="Alp-th">
//                   Survey Status
//                 </th>
//                 <th className="Alp-th">
//                   Action
//                 </th>
                 
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredApplications.length === 0 ? (
//                 <tr>
//                   <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
//                     No applications found matching your search criteria
//                   </td>
//                 </tr>
//               ) : (
//                 filteredApplications.map((app, index) => (
//                   <tr key={app.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="Alp-td">
//                       {app.id || index + 1}
//                     </td>
//                     <td className="Alp-td">
//                       {app.cluster_number || "N/A"}
//                     </td>
//                     <td className="Alp-td">
//                       {app.slum_id || "N/A"}
//                     </td>
//                     {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       <div className="font-medium">
//                         {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.gender} • {app.aadhaar_number}
//                       </div>
//                     </td> */}
//                     <td className="Alp-td">
//   <div className="truncate">
//     {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
//   </div>
//   <div className="text-gray-500 text-xs truncate">
//     {app.gender} • {app.aadhaar_number}
//   </div>
// </td>

//                     {/* <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
//                       <div className="truncate">
//                         {app.current_address || app.name_of_slum_area}
//                       </div>
//                       <div className="text-gray-500 text-xs">
//                         {app.current_pincode && `PIN: ${app.current_pincode}`}
//                       </div>
//                     </td> */}

//                     <td className="Alp-td">
//   <div className="truncate">
//     {app.current_address || app.name_of_slum_area}
//   </div>
//   <div className="text-gray-500 text-xs">
//     {app.current_pincode && `PIN: ${app.current_pincode}`}
//   </div>
// </td>

//                     {/* <td
//                     className={`Alp-td ${
//                     app.slum_floor === "G" ? "text-green-600 font-bold" : "text-gray-700"
//                     }`}
//                     >
//                    {app.slum_floor || "N/A"}
//                    </td> */}

//                    <td className="Alp-td text-center flex items-center justify-center">
//   {app.slum_floor === "G" ? (
//     <span className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-700">
//       {app.slum_floor}
//     </span>
//   ) : (
//     <span className="text-gray-700">{app.slum_floor || "N/A"}</span>
//   )}
// </td>

                 
//                     <td className="Alp-td">
//                       {app.slum_use || "N/A"}
//                     </td>
//                     <td className="Alp-td">
//                       <div className="font-medium">{app.area_sq_m}</div>
//                       <div className="text-gray-500 text-xs">
//                         {app.length && app.width && `${app.length}×${app.width}m`}
//                       </div>
//                     </td>
//                     <td className="Alp-td">
//                       <div>{app.created_date || "N/A"}</div>
//                       {app.created_time && (
//                         <div className="text-gray-500 text-xs">{app.created_time}</div>
//                       )}
//                     </td>
//                     {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                       {app.person_providing_info || "-"}
//                     </td> */}
//                     <td className="Alp-td">
//                       {app.submittedBy || "-"}
//                     </td>
//                        <td className="Alp-td">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.survey_status)}`}>
//                         {app.survey_status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="Alp-td">
//                           <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => openModal(app)}
//                         className="text-blue-600 hover:text-blue-900 transition-colors"
//                         title="View Details"
//                       >
//                         <Eye size={20} />
//                       </button>
//                       {/* **--** */}
//                       <button
//                           onClick={() => generateAndDownloadPdfs(app)}
//                           disabled={generatingPdfs}
//                           className="text-green-600 hover:text-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                           title="Download Jodpatra"
//                         >
//                           <Download size={20} />
//                         </button>
//                         </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>









      

//       {/* Document Modal */}
//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span>
//                       {" "}
//                       GPS: {selectedDocument.lat}, {selectedDocument.long}
//                     </span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm">
//                           <strong>Relation:</strong> {member.relation}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Gender:</strong> {member.gender}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Age:</strong> {member.age} years
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
                    
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src =
//                                     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div
//                               className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                             <div
//                               className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
//                               onClick={() => openDocumentModal(doc)}
//                             >
//                               <span className="text-3xl">📁</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div className="space-y-2">
//                           <button
//                             onClick={() => openDocumentModal(doc)}
//                             className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1"
//                           >
//                             <Eye size={16} />
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>
                          
//                           <button
//                             onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
//                             className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
//                           >
//                             <Download size={16} />
//                             Download File
//                           </button>
//                         </div>

//                         <div className="space-y-2 mt-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div
//                       key={key}
//                       className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Application Form Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">Add New SRA Application</h2>
//               <button 
//                 onClick={() => setShowAddForm(false)} 
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={28} />
//               </button>
//             </div>
//             <div className="p-6">
//               <AddApplicationForm 
//                 onClose={() => setShowAddForm(false)}
//                 onSuccess={() => {
//                   setShowAddForm(false)
//                 //   window.location.reload()
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage

// ***---------------***
// =====================================================================


import { useState, useEffect } from "react"
import { Eye, Search, Download,X,ChevronLeft,ChevronRight,Plus,Edit } from "lucide-react"
import AddApplicationForm from './AddApplicationForm';
import EditApplicationForm from './EditApplicationForm';
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from 'html2canvas'
import html2pdf from "html2pdf.js";

import './AllApplicationsPage.css';


  const BASE_URL = import.meta.env.VITE_BASE_URL;
//   const DOCUMENT_BASE_URL = import.meta.env.VITE_BASE_URL;
 const DOCUMENT_BASE_URL = import.meta.env.VITE_BASE_URL

    // const response = await fetch(`${BASE_URL}/auth/register`, {





// const API_BASE_URL = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in"

// const API_BASE_URL = "https://sra.saavi.co.in"
// const DOCUMENT_BASE_URL = "https://sra.saavi.co.in"

// const DOCUMENT_BASE_URL = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in"


const isAuthenticated = () => {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem("authToken")
  return !!token
}

const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}



const AllApplicationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAddForm, setShowAddForm] = useState(false)
  const [generatingPdfs, setGeneratingPdfs] = useState(false)
  const [success, setSuccess] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingApplication, setEditingApplication] = useState(null)

  // Filter states
  const [hutUseFilter, setHutUseFilter] = useState("")
  const [surveyStatusFilter, setSurveyStatusFilter] = useState("")


//  let role = null

// if (typeof window !== "undefined") {
//   const userData = localStorage.getItem("user")
//   if (userData) {
//     const parsedUser = JSON.parse(userData)
//     role = parsedUser?.role
//   }
// }


 let role = null;
let user_id = null;

if (typeof window !== "undefined") {
  const userData = localStorage.getItem("user");
  if (userData) {
    const parsedUser = JSON.parse(userData);
    role = parsedUser?.role;
    user_id = parsedUser?.id;   // ✅ ADD THIS
  }
}

  // Function to count applications by status
  const getStatusCounts = () => {
    const statusMappings = {
      'Pending': ['pending', 'pendding', 'panding'],
      'Completed': ['completed', 'complete', 'complated'],
      'Ready For Survey': ['ready for survey', 'ready_for_survey', 'readyforsurvey', 'ready survey'],
      'Hut Appose': ['hut appose', 'hut_appose', 'hutappose', 'hut oppose'],
      'Hut Denied': ['hut denied', 'hut_denied', 'hutdenied', 'hut deny', 'rejected', 'reject']
    }

    const counts = {
      pending: 0,
      completed: 0,
      hutAppose: 0,
      hutDenied: 0
    }

    applications.forEach(app => {
      const status = app.survey_status || ''
      const statusLower = status.toLowerCase().trim()

      if (!status || statusMappings['Pending'].includes(statusLower)) {
        counts.pending++
      }
      else if (statusMappings['Completed'].includes(statusLower)) {
        counts.completed++
      }
      else if (statusMappings['Hut Appose'].includes(statusLower)) {
        counts.hutAppose++
      }
      else if (statusMappings['Hut Denied'].includes(statusLower)) {
        counts.hutDenied++
      }
      else {
        counts.pending++
      }
    })

    return counts
  }

  const statusCounts = getStatusCounts()

  const parseOriginalPath = (originalPath) => {
    if (!originalPath) return []
    try {
      if (Array.isArray(originalPath)) return originalPath

      if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
        return JSON.parse(originalPath)
      }

      return [originalPath]
    } catch (e) {
      console.error('Error parsing originalPath:', e)
      return [originalPath]
    }
  }

  const extractDocumentPath = (fullPath) => {
    if (!fullPath) return null
    const uploadsIndex = fullPath.indexOf("/uploads")
    if (uploadsIndex !== -1) {
      return fullPath.substring(uploadsIndex)
    }
    return fullPath
  }

// const handleDownloadExcel = () => {

//   if (filteredApplications.length === 0) {
//     alert("No data available!");
//     return;
//   }

//   const excelData = filteredApplications.map((app, index) => ({
//     "Serial No": index + 1,
//     "Cluster Number": app.cluster_number || "",
//     "Hut ID": app.slum_id || "",
//     "Name": `${app.first_name || ""} ${app.last_name || ""}`,
//     "Use of Hut": app.slum_use || "",
//     "Area": app.area_sq_m || "",
//     "Status": app.survey_status || "Pending"
//   }));

//   const ws = XLSX.utils.json_to_sheet(excelData);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Applications");

//   XLSX.writeFile(wb, "BMC_Applications.xlsx");
// };


// const handleDownloadPDF = () => {

//   if (filteredApplications.length === 0) {
//     alert("No data available!");
//     return;
//   }

//   const doc = new jsPDF("landscape");

//   doc.text("BMC Applications Report", 14, 15);

//   const tableData = filteredApplications.map((app, i) => ([
//     i + 1,
//     app.cluster_number || "",
//     app.slum_id || "",
//     `${app.first_name || ""} ${app.last_name || ""}`,
//     app.slum_use || "",
//     app.area_sq_m || "",
//     app.survey_status || "Pending"
//   ]));

//   doc.autoTable({
//     head: [["Sr", "Cluster", "Hut ID", "Name", "Use", "Area", "Status"]],
//     body: tableData,
//     startY: 20
//   });

//   doc.save("BMC_Applications.pdf");
// };

const handleDownloadExcel = () => {

  if (filteredApplications.length === 0) {
    alert("No data available!");
    return;
  }

  const excelData = filteredApplications.map((app, index) => ({
    "Serial No": index + 1,
    "Cluster Number": app.cluster_number || "",
    "Hut ID": app.slum_id || "",
    "Name": `${app.first_name || ""} ${app.last_name || ""}`,
    "Use of Hut": app.slum_use || "",
    "Area": app.area_sq_m || "",
    "Status": app.survey_status || "Pending"
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData, { origin: "A4" });

  // Add Title (Row 1)
  XLSX.utils.sheet_add_aoa(ws, [
    ["BMC Applications Report"]
  ], { origin: "A1" });

  // Add Total Records (Row 2)
  XLSX.utils.sheet_add_aoa(ws, [
    [`Total Records: ${filteredApplications.length}`]
  ], { origin: "A2" });

  // Optional: blank row (Row 3 automatically skipped because table starts A4)

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Applications");

  XLSX.writeFile(wb, "BMC_Applications.xlsx");
};

const handleDownloadPDF = () => {

  if (filteredApplications.length === 0) {
    alert("No data available!");
    return;
  }

  const doc = new jsPDF("landscape");

  doc.setFontSize(16);
  doc.text("BMC Applications Report", 14, 15);

  doc.setFontSize(10);
  doc.text(`Total Records: ${filteredApplications.length}`, 14, 22);

  const tableData = filteredApplications.map((app, index) => ([
    index + 1,
    app.cluster_number || "",
    app.slum_id || "",
    `${app.first_name || ""} ${app.last_name || ""}`,
    app.slum_use || "",
    app.area_sq_m || "",
    app.survey_status || "Pending"
  ]));

  // ✅ Correct way in Vite
  autoTable(doc, {
    head: [["Sr", "Cluster", "Hut ID", "Name", "Use", "Area", "Status"]],
    body: tableData,
    startY: 28,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [249, 115, 22] }
  });

  doc.save("BMC_Applications.pdf");
};


const generateIndexPDF = (app) => {

  const fullName = `${app.first_name || ""} ${app.middle_name || ""} ${app.last_name || ""}`;

  const hutSurveyId =
    app.hut_id ||
    `${app.slum_id || "NA"}-${app.cluster_number || "NA"}-${app.id}`;

  // ===== ONLY ONE SIDE TICK RULE =====
  const hasBefore2000 = app.doc_before_2000 || app.submitted_docs_before_2000;
  const hasAfter2000 = app.after_2000_proof_submitted;

  const beforeTick = hasBefore2000 ? "✔" : "";
  const afterTick = !hasBefore2000 && hasAfter2000 ? "✔" : "";

  const htmlContent = `
  <div style="padding:30px;font-family:Georgia, serif;font-size:13px;color:#000;">

    <h2 style="text-align:center;margin-bottom:15px;
               letter-spacing:1px;
               border-bottom:2px solid #000;
               padding-bottom:6px;">
      INDEX
    </h2>

    <table style="width:100%;border-collapse:collapse;
                  font-size:13px;margin-top:10px;">
      ${createRow("Hut Survey ID", hutSurveyId)}
      ${createRow("RFS ID", app.id)}
      ${createRow("Cluster ID", app.cluster_number)}
      ${createRow("Scheme", app.municipal_corporation)}
      ${createRow("Use of Hut", app.slum_use)}
      ${createRow("Village", app.village)}
      ${createRow("Slum", app.slum_name)}
      ${createRow("Hut Owner", fullName)}
      ${createRow("Floor No", app.slum_floor)}
      ${createRow("Hut Area", app.area_sq_m)}
      ${createRow("UID No", app.aadhaar_number)}
      ${createRow("Address", app.current_address)}
    </table>

    <br/><br/>

    <table style="width:100%;border-collapse:collapse;font-size:12.5px;">
      <tr style="background:#f2f2f2;font-weight:bold;text-align:center;">
        <th style="border:1px solid #000;padding:6px;">Sr No</th>
        <th style="border:1px solid #000;padding:6px;">Document Name</th>
        <th style="border:1px solid #000;padding:6px;">
          Document<br/>proof<br/>Before<br/>1/1/2000
        </th>
        <th style="border:1px solid #000;padding:6px;">
          Document<br/>proof for<br/>current<br/>year
        </th>
        <th style="border:1px solid #000;padding:6px;">
          Document Proof for If<br/>
          user Residing<br/>
          After 2000
        </th>
        <th style="border:1px solid #000;padding:6px;">Page No</th>
      </tr>

      ${createDocRow("A", "Before 1/1/2000 Proof Document", beforeTick, "", "", "")}
      ${createDocRow("B", "After 2000 Proof Document", "", "", afterTick, "")}
      ${createDocRow("C", "Possession Document", "", "", "", "")}
      ${createDocRow("D", "Self Declaration", "", "", "", "")}
      ${createDocRow("E", "Ration Card", "", "", "", "")}
      ${createDocRow("F", "Sale Agreement", "", "", "", "")}

    </table>

    <div style="margin-top:70px;text-align:right;
                font-weight:bold;
                font-size:13px;">
      Scrutiny Cell Officer
    </div>

  </div>
  `;

  const opt = {
    margin: 0.4,
    filename: `INDEX_${hutSurveyId}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(htmlContent).save();
};


// ===== Row Helpers =====

const createRow = (label, value) => `
<tr>
  <td style="border:1px solid #000;
             padding:6px;
             width:40%;
             font-weight:bold;
             background:#fafafa;">
    ${label}
  </td>
  <td style="border:1px solid #000;padding:6px;">
    ${value || "-"}
  </td>
</tr>
`;

const createDocRow = (sr, name, before, current, after, page) => `
<tr>
  <td style="border:1px solid #000;padding:6px;text-align:center;">${sr}</td>
  <td style="border:1px solid #000;padding:6px;">${name}</td>
  <td style="border:1px solid #000;padding:6px;text-align:center;font-weight:bold;">${before}</td>
  <td style="border:1px solid #000;padding:6px;text-align:center;">${current}</td>
  <td style="border:1px solid #000;padding:6px;text-align:center;font-weight:bold;">${after}</td>
  <td style="border:1px solid #000;padding:6px;text-align:center;">${page}</td>
</tr>
`;




const getDocumentUrl = (documentPath) => {
    if (!documentPath) return null
    const cleanPath = extractDocumentPath(documentPath)
    return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
  }

  const getFileExtension = (filePath) => {
    if (!filePath) return ""
    return filePath.split(".").pop().toLowerCase()
  }

  const isImageFile = (filePath) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
    return imageExtensions.includes(getFileExtension(filePath))
  }

  const isVideoFile = (filePath) => {
    const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
    return videoExtensions.includes(getFileExtension(filePath))
  }

  const isPdfFile = (filePath) => {
    return getFileExtension(filePath) === "pdf"
  }

  const downloadFile = (url, filename) => {
    if (!url) {
      alert("File URL not available")
      return
    }

    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'document'
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // ✅ Jodpatra-3 PDF Generator
//   const generateJodpatra3 = async (data) => {
//     let imageUrls = [];

//     if (data.side_photo_path) {
//       try {
//         const parsed = JSON.parse(data.side_photo_path);
//         imageUrls = Array.isArray(parsed) ? parsed : [data.side_photo_path];
//       } catch (e) {
//         imageUrls = [data.side_photo_path];
//       }
//     }

//     const firstImageUrl = imageUrls.length > 0
//       ? imageUrls[0].trim().replace(/^["']+|["']+$/g, '')
//       : null;

//     return new Promise((resolve, reject) => {
//       const pdfElement = document.createElement("div");
//       pdfElement.style.width = "210mm";
//       pdfElement.style.minHeight = "297mm";
//       pdfElement.style.padding = "15mm";
//       pdfElement.style.fontFamily = "Arial, sans-serif";
//       pdfElement.style.fontSize = "12px";
//       pdfElement.style.lineHeight = "1.4";
//       pdfElement.style.backgroundColor = "white";
//       pdfElement.style.position = "absolute";
//       pdfElement.style.top = "-9999px";

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//           <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//           <hr style="margin: 8px 0; border: 1px solid #000;">
//           <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
//           <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//           <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${
//                 data.slum_id || "N/A"
//               }</td>
//               <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString(
//                 "en-GB"
//               )}</td>
//             </tr>
//           </table>
//         </div>

//         <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
//           ${
//             firstImageUrl
//               ? `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
//               :  `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
//           }
//         </div>
        

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>

//           <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 35%; font-weight: bold;">१. अर्जदाराचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.first_name || ""
//               } ${data.middle_name || ""} ${data.last_name || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.gender || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.aadhaar_number || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.current_mobile_number || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.hut_name || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.ward || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.current_address || ""
//               }</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${
//                 data.residency_since || ""
//               }</td>
//             </tr>
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>

//           <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//             <tr>
//               <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//               <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//               <th style="border: 1px solid #000; padding: 4px;">वय</th>
//               <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//               <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//               <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//             </tr>
//             ${Array.from(
//               { length: Math.min(parseInt(data.num_family_members) || 0, 6) },
//               (_, i) => {
//                 const memberNum = i + 1;
//                 return `
//                 <tr>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${
//                     data[`family_member${memberNum}_name`] || ""
//                   }</td>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
//                     data[`family_member${memberNum}_age`] || ""
//                   }</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${
//                     data[`family_member${memberNum}_relation`] || ""
//                   }</td>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
//                     data[`family_member${memberNum}_gender`] || ""
//                   }</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${
//                     data[`family_member${memberNum}_aadhaar`] || ""
//                   }</td>
//                 </tr>
//               `;
//               }
//             ).join("")}
//           </table>
//         </div>

//         <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//           <div style="text-align: center;">
//             <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//              <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
//             </div>
//             <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//             <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
//           </div>
//         </div>
//       `;

//       document.body.appendChild(pdfElement);

//       setTimeout(() => {
//         html2canvas(pdfElement, { scale: 2, useCORS: true })
//           .then((canvas) => {
//             const imgData = canvas.toDataURL("image/png");
//             const pdf = new jsPDF("p", "mm", "a4");
//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//             pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

//             pdf.save(
//               `Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`
//             );

//             document.body.removeChild(pdfElement);
//             resolve(true);
//           })
//           .catch((err) => {
//             document.body.removeChild(pdfElement);
//             reject(err);
//           });
//       }, 500);
//     });
//   };



// // ✅ Jodpatra-3 PDF Generator (with applicant photo support)
// const generateJodpatra3 = async (data) => {
//   return new Promise((resolve, reject) => {
//     const baseUrl = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in";

//     // ✅ Determine applicant image source
//     const imageSrc = data?.photo_self_path?.startsWith("http")
//       ? data.photo_self_path
//       : `${baseUrl}/${data?.photo_self_path || "user2.png"}`;

//     // ✅ Preload image (handles CORS)
//     const preloadImage = (src) =>
//       new Promise((resolve, reject) => {
//         const img = new Image();
//         img.crossOrigin = "Anonymous";
//         img.src = src;
//         img.onload = () => resolve(img);
//         img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
//       });

//     // ✅ Preload before generating
//     preloadImage(imageSrc)
//       .then(() => {
//         const pdfElement = document.createElement("div");
//         pdfElement.style.width = "210mm";
//         pdfElement.style.minHeight = "297mm";
//         pdfElement.style.padding = "15mm";
//         pdfElement.style.fontFamily = "Arial, sans-serif";
//         pdfElement.style.fontSize = "12px";
//         pdfElement.style.lineHeight = "1.4";
//         pdfElement.style.backgroundColor = "white";
//         pdfElement.style.position = "absolute";
//         pdfElement.style.top = "-9999px";

//         pdfElement.innerHTML = `
//           <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//             <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//             <hr style="margin: 8px 0; border: 1px solid #000;">
//             <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
//             <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//             <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
//           </div>

//           <div style="margin-bottom: 20px;">
//             <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//               <tr>
//                 <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.slum_id || "N/A"}</td>
//                 <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
//               </tr>
//             </table>
//           </div>

//           <!-- ✅ Applicant photo section (same logic as Jodpatra-4) -->
//           <div style="text-align: left; margin-bottom: 20px;">
//             <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
//               <img
//                 src="${imageSrc}"
//                 alt="Arjdaar Photo"
//                 style="width: 100%; height: 100%; object-fit: cover;"
//                 crossOrigin="Anonymous"
//               />
//             </div>
//             <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
//           </div>

//           <div style="margin-bottom: 20px;">
//             <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>
//             <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//               <tr>
//                 <td style="border: 1px solid #000; padding: 5px; width: 35%; font-weight: bold;">१. अर्जदाराचे नाव:</td>
//                 <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
//                 <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
//                 <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
//                 <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे नाव:</td>
//                 <td style="border: 1px solid #000; padding: 5px;">${data.hut_name || ""}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
//                 <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
//                 <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
//                 <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""}</td>
//               </tr>
//             </table>
//           </div>
//         `;

//         document.body.appendChild(pdfElement);

//         setTimeout(() => {
//           html2canvas(pdfElement, { scale: 2, useCORS: true })
//             .then((canvas) => {
//               const imgData = canvas.toDataURL("image/png");
//               const pdf = new jsPDF("p", "mm", "a4");
//               const pageWidth = pdf.internal.pageSize.getWidth();
//               const canvasHeight = (canvas.height * pageWidth) / canvas.width;

//               pdf.addImage(imgData, "PNG", 0, 0, pageWidth, canvasHeight);
//               pdf.save(`Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);
//               document.body.removeChild(pdfElement);
//               resolve(true);
//             })
//             .catch((err) => {
//               document.body.removeChild(pdfElement);
//               reject(err);
//             });
//         }, 500);
//       })
//       .catch((err) => {
//         console.error("Applicant image load failed:", err);
//         // ✅ Fallback to default image if preload fails
//         const fallbackImg = `${baseUrl}/user2.png`;
//         data.photo_self_path = fallbackImg;
//         generateJodpatra3(data); // re-run with fallback image
//       });
//   });
// };



const generateJodpatra3 = async (data) => {
  return new Promise((resolve, reject) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in";

    // ✅ Determine applicant image source
    const imageSrc = data?.photo_self_path?.startsWith("http")
      ? data.photo_self_path
      : `${baseUrl}/${data?.photo_self_path || "user2.png"}`;

 const totalMembers = [1, 2, 3, 4, 5, 6].filter((n) => {
  return data[`family_member${n}_name`] ||
         data[`family_member${n}_age`] ||
         data[`family_member${n}_relation`] ||
         data[`family_member${n}_gender`] ||
         data[`family_member${n}_aadhaar`];
}).length;
      

    // ✅ Preload image (handles CORS)
    const preloadImage = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });

    preloadImage(imageSrc)
      .then(() => {
        const pdfElement = document.createElement("div");
        pdfElement.style.width = "210mm";
        pdfElement.style.minHeight = "297mm";
        pdfElement.style.padding = "15mm";
        pdfElement.style.fontFamily = "Arial, sans-serif";
        pdfElement.style.fontSize = "12px";
        pdfElement.style.lineHeight = "1.4";
        pdfElement.style.backgroundColor = "white";
        pdfElement.style.position = "absolute";
        pdfElement.style.top = "-9999px";

        pdfElement.innerHTML = `
          <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
            <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
            <hr style="margin: 8px 0; border: 1px solid #000;">
            <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
            <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
            <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
          </div>

          <div style="margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr>
                <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.id || "N/A"}</td>
                <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
              </tr>
            </table>
          </div>

          <!-- ✅ Applicant photo -->
          <div style="text-align: left; margin-bottom: 20px;">
            <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
              <img src="${imageSrc}" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" crossOrigin="Anonymous" />
            </div>
            <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
          </div>

          <!-- ✅ Applicant info -->
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">१. अर्जदाराचे नाव:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td></tr>

              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे क्रमांक:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.hut_id || ""}</td></tr>

              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे नाव:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.hut_name || ""}</td></tr>

              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""}</td></tr>
            </table>
          </div>

          <!-- ✅ Family members -->
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
              <tr>
                <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
                <td style="border: 1px solid #000; padding: 4px;">${totalMembers || ""} सदस्य</td>
              </tr>
            </table>
            <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
              <tr>
                <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
                <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
                <th style="border: 1px solid #000; padding: 4px;">वय</th>
                <th style="border: 1px solid #000; padding: 4px;">नातं</th>
                <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
                <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
              </tr>
             ${[1, 2, 3, 4, 5, 6].map((n) => {
  const name = data[`family_member${n}_name`];
  const age = data[`family_member${n}_age`];
  const relation = data[`family_member${n}_relation`];
  const gender = data[`family_member${n}_gender`];
  const aadhaar = data[`family_member${n}_aadhaar`];

  // If no data found for this member, skip row
  if (!name && !age && !relation && !gender && !aadhaar) return "";

  return `
    <tr>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${n}</td>
      <td style="border: 1px solid #000; padding: 4px;">${name || ""}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${age || ""}</td>
      <td style="border: 1px solid #000; padding: 4px;">${relation || ""}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${gender || ""}</td>
      <td style="border: 1px solid #000; padding: 4px;">${aadhaar || ""}</td>
    </tr>`;
}).join("")}


            </table>
          </div>

          <!-- ✅ Hut details -->
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">लांबी (मीटर):</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.length || ""}</td>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">रुंदी (मीटर):</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.width || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
                <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
              </tr>
            </table>
          </div>

          <!-- ✅ Bank details -->
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">बँकेचे नाव:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.bank_name || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td></tr>
            </table>
          </div>

          <!-- ✅ Signature -->
          <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
            <div style="text-align: center;">
              <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="/thumb1.png" alt="Signature" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
            </div>
          </div>

          <!-- ✅ Footer -->
          <div style="text-align: center; border-top: 1px solid #000; padding-top: 10px;">
            <p style="font-size: 10px; margin: 2px 0;">संपर्क माहिती:</p>
            <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
            <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
            <p style="font-size: 9px; color: #777; margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
            <p style="font-size: 9px; color: #777; margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
          </div>
        `;

        document.body.appendChild(pdfElement);

        setTimeout(() => {
          html2canvas(pdfElement, { scale: 2, useCORS: true })
            .then((canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF("p", "mm", "a4");
              const pageWidth = pdf.internal.pageSize.getWidth();
              const canvasHeight = (canvas.height * pageWidth) / canvas.width;

              pdf.addImage(imgData, "PNG", 0, 0, pageWidth, canvasHeight);
              pdf.save(`Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);
              document.body.removeChild(pdfElement);
              resolve(true);
            })
            .catch((err) => {
              document.body.removeChild(pdfElement);
              reject(err);
            });
        }, 500);
      })
      .catch((err) => {
        console.error("Applicant image load failed:", err);
        const fallbackImg = `${baseUrl}/user2.png`;
        data.photo_self_path = fallbackImg;
        generateJodpatra3(data); // re-run with fallback
      });
  });
};









  // ✅ Jodpatra-4 PDF Generator
//   const generateJodpatra4 = async (data) => {
//     return new Promise((resolve, reject) => {
//       const pdfElement = document.createElement('div');
//       pdfElement.style.width = '210mm';
//       pdfElement.style.minHeight = '297mm';
//       pdfElement.style.padding = '15mm';
//       pdfElement.style.fontFamily = 'Arial, sans-serif';
//       pdfElement.style.fontSize = '12px';
//       pdfElement.style.lineHeight = '1.4';
//       pdfElement.style.backgroundColor = 'white';
//       pdfElement.style.position = 'absolute';
//       pdfElement.style.top = '-9999px';

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//           <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//           <hr style="margin: 8px 0; border: 1px solid #000;">
//           <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
//           <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
//           <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या  रहात असल्यास करावयाचा अर्ज</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.slum_id || "N/A"}</td>
//               <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
//             </tr>
//           </table>
//         </div>

//         <div style="text-align: left; margin-bottom: 20px;">
//           <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">

//            <img
//   src="${data?.photo_self_path?.startsWith('http')
//     ? data.photo_self_path
//     : `${baseUrl}/${data?.photo_self_path || 'user2.png'}`}"
//   alt="Arjdaar Photo"
//   style="width: 100%; height: 100%; object-fit: cover;"
// />


//           </div>
//           <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">मी खालील नमूद केलेल्या माहितीची खात्री देतो:</p>

//           <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">१. मुख्य अर्जदाराचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.name_of_slum_area || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""} पासून</td>
//             </tr>
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
//           <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
//               <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${data.num_family_members || ""} सदस्य</td>
//             </tr>
//           </table>

//           <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//             <tr">
//               <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//               <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//               <th style="border: 1px solid #000; padding: 4px;">वय</th>
//               <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//               <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//               <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//             </tr>
//             ${Array.from({length: Math.min(parseInt(data.num_family_members) || 0, 6)}, (_, i) => {
//               const memberNum = i + 1;
//               return `
//                 <tr>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_name`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_age`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_relation`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_gender`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_aadhaar`] || ""}</td>
//                 </tr>
//               `;
//             }).join('')}
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
//           <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">लांबी (मीटर):</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.length || ""}</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">रुंदी (मीटर):</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.width || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
//               <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
//             </tr>
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
//           <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">बँकेचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 70%;">${data.bank_name || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td>
//             </tr>
//           </table>
//         </div>

//         <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//           <div style="text-align: center;">
//             <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//               <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
//             </div>
//             <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//             <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
//           </div>
//         </div>

//         <div style="margin-top: 25px; text-align: center; padding-top: 15px; border-top: 1px solid #000;">
//           <p style="font-size: 10px; font-weight: bold; margin: 3px 0;">संपर्क माहिती:</p>
//           <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
//           <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
//         </div>

//         <div style="margin-top: 15px; text-align: center; font-size: 9px; color: #666;">
//           <p style="margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
//           <p style="margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
//         </div>
//       `;

//       document.body.appendChild(pdfElement);

//       setTimeout(() => {
//         html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//           const imgData = canvas.toDataURL('image/png');
//           const pdf = new jsPDF('p', 'mm', 'a4');
//           const pageWidth = pdf.internal.pageSize.getWidth();
//           const pageHeight = pdf.internal.pageSize.getHeight();

//           const canvasHeight = (canvas.height * pageWidth) / canvas.width;

//           pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, canvasHeight);

//           pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

//           document.body.removeChild(pdfElement);
//           resolve(true);
//         }).catch((err) => {
//           document.body.removeChild(pdfElement);
//           reject(err);
//         });
//       }, 500);
//     });
//   };


const generateJodpatra4 = async (data) => {
  return new Promise((resolve, reject) => {
    // Ensure baseUrl is defined
    const baseUrl = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in";

    // Function to preload image
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Handle CORS
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });
    };

    // Determine image source
    const imageSrc = data?.photo_self_path?.startsWith("http")
      ? data.photo_self_path
      : `${baseUrl}/${data?.photo_self_path || "user2.png"}`;

      const totalMembers = [1, 2, 3, 4, 5, 6].filter((n) => {
  return data[`family_member${n}_name`] ||
         data[`family_member${n}_age`] ||
         data[`family_member${n}_relation`] ||
         data[`family_member${n}_gender`] ||
         data[`family_member${n}_aadhaar`];
}).length;


    // Preload the image before generating the PDF
    preloadImage(imageSrc)
      .then(() => {
        const pdfElement = document.createElement("div");
        pdfElement.style.width = "210mm";
        pdfElement.style.minHeight = "297mm";
        pdfElement.style.padding = "15mm";
        pdfElement.style.fontFamily = "Arial, sans-serif";
        pdfElement.style.fontSize = "12px";
        pdfElement.style.lineHeight = "1.4";
        pdfElement.style.backgroundColor = "white";
        pdfElement.style.position = "absolute";
        pdfElement.style.top = "-9999px";

        pdfElement.innerHTML = `
          <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
            <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
            <hr style="margin: 8px 0; border: 1px solid #000;">
            <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
            <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
            <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या रहात असल्यास करावयाचा अर्ज</p>
          </div>

          <div style="margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr>
                <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.id || "N/A"}</td>
                <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: left; margin-bottom: 20px;">
            <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
              <img
                src="${imageSrc}"
                alt="Arjdaar Photo"
                style="width: 100%; height: 100%; object-fit: cover;"
                crossOrigin="Anonymous"
              />
            </div>
            <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
          </div>

          <!-- Rest of the HTML content remains the same -->
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">मी खालील नमूद केलेल्या माहितीची खात्री देतो:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
              <tr>
                <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">१. मुख्य अर्जदाराचे नाव:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td>
              </tr>
               <tr>
              <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे नाव:</td>
              <td style="border: 1px solid #000; padding: 5px;">${
                data.hut_name || ""
              }</td>
            </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""} पासून</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
              <tr>
                <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
                <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${totalMembers || ""} सदस्य</td>
              </tr>
            </table>

            <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
              <tr>
                <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
                <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
                <th style="border: 1px solid #000; padding: 4px;">वय</th>
                <th style="border: 1px solid #000; padding: 4px;">नातं</th>
                <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
                <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
              </tr>
             ${[1, 2, 3, 4, 5, 6].map((n) => {
  const name = data[`family_member${n}_name`];
  const age = data[`family_member${n}_age`];
  const relation = data[`family_member${n}_relation`];
  const gender = data[`family_member${n}_gender`];
  const aadhaar = data[`family_member${n}_aadhaar`];

  // If no data found for this member, skip row
  if (!name && !age && !relation && !gender && !aadhaar) return "";

  return `
    <tr>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${n}</td>
      <td style="border: 1px solid #000; padding: 4px;">${name || ""}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${age || ""}</td>
      <td style="border: 1px solid #000; padding: 4px;">${relation || ""}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${gender || ""}</td>
      <td style="border: 1px solid #000; padding: 4px;">${aadhaar || ""}</td>
    </tr>`;
}).join("")}
            </table>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
              <tr>
                <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">लांबी (मीटर):</td>
                <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.length || ""}</td>
                <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">रुंदी (मीटर):</td>
                <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.width || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
                <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
              <tr>
                <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">बँकेचे नाव:</td>
                <td style="border: 1px solid #000; padding: 5px; width: 70%;">${data.bank_name || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td>
              </tr>
            </table>
          </div>

          <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
            <div style="text-align: center;">
              <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
              <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
            </div>
          </div>

          <div style="margin-top: 25px; text-align: center; padding-top: 15px; border-top: 1px solid #000;">
            <p style="font-size: 10px; font-weight: bold; margin: 3px 0;">संपर्क माहिती:</p>
            <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
            <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
          </div>

          <div style="margin-top: 15px; text-align: center; font-size: 9px; color: #666;">
            <p style="margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
            <p style="margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
          </div>
        `;

        document.body.appendChild(pdfElement);

        // Wait for a short delay to ensure DOM rendering
        setTimeout(() => {
          html2canvas(pdfElement, { scale: 2, useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const canvasHeight = (canvas.height * pageWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pageWidth, canvasHeight);
            pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

            document.body.removeChild(pdfElement);
            resolve(true);
          }).catch((err) => {
            document.body.removeChild(pdfElement);
            reject(err);
          });
        }, 500);
      })
      .catch((err) => {
        console.error("Image preload failed:", err);
        // Fallback to a default image if preload fails
        const fallbackImage = `${baseUrl}/user2.png`;
        pdfElement.innerHTML = pdfElement.innerHTML.replace(imageSrc, fallbackImage);
        document.body.appendChild(pdfElement);

        setTimeout(() => {
          html2canvas(pdfElement, { scale: 2, useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const canvasHeight = (canvas.height * pageWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pageWidth, canvasHeight);
            pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

            document.body.removeChild(pdfElement);
            resolve(true);
          }).catch((err) => {
            document.body.removeChild(pdfElement);
            reject(err);
          });
        }, 500);
      });
  });
};

  // Main PDF generation function
  const generateAndDownloadPdfs = async (formData) => {
    console.log("testing form data>>>>>>>>>>>", formData)
    setGeneratingPdfs(true);
    setError(null);

    try {
      const dateStr = formData.residency_since;
      console.log("Residency date string:", dateStr);

      let isJodpatra3 = false;

      if (dateStr === "00-00-0000") {
        isJodpatra3 = true;
      } else {
        const [day, month, year] = dateStr.split("-").map(Number);
        const selectedDate = new Date(year, month - 1, day);
        const cutoffDate = new Date(2000, 0, 1);

        if (selectedDate <= cutoffDate) {
          isJodpatra3 = true;
        }
      }

      if (isJodpatra3) {
        setSuccess("Generating Jodpatra-3 for residency 2000 or before...");
        console.log("Generating Jodpatra-3 for date:", dateStr);

        await generateJodpatra3(formData);
        setSuccess("✅ Successfully generated and downloaded Jodpatra-3!");
      } else {
        setSuccess("Generating Jodpatra-4 for residency after 2000...");
        console.log("Generating Jodpatra-4 for date:", dateStr);

        await generateJodpatra4(formData);
        setSuccess("✅ Successfully generated and downloaded Jodpatra-4!");
      }
    } catch (error) {
      console.error("Error generating PDFs:", error);
      setError("Error generating PDFs: " + error.message);
    } finally {
      setTimeout(() => {
        setGeneratingPdfs(false);
        setSuccess(null);
      }, 3000);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = getAuthToken()
        if (!token) {
          throw new Error("No authentication token found")
        }

        const response = await fetch(`${BASE_URL}/api/sra-logs/all-logs`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication failed. Please login again.")
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setApplications(data)
      } catch (err) {
        console.error("Error fetching applications:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

//   const filteredApplications = applications.filter((app) => {
//     const searchString = searchTerm.toLowerCase()

//     const matchesSearch = searchTerm === "" || (
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//     //   (app.name_of_slum_area && app.name_of_slum_area.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString)) ||
//       (app.cluster_number && app.cluster_number.toLowerCase().includes(searchString)) ||
//       (app.slum_use && app.slum_use.toLowerCase().includes(searchString))
//     )

//     const matchesHutUse = hutUseFilter === "" || (
//       app.slum_use && app.slum_use.toLowerCase().trim() === hutUseFilter.toLowerCase().trim()
//     )

//     const matchesSurveyStatus = surveyStatusFilter === "" || (() => {
//       if (!app.survey_status || app.survey_status === null) {
//         return surveyStatusFilter.toLowerCase().trim() === "pending"
//       }

//       const appStatus = app.survey_status.toLowerCase().trim()
//       const filterStatus = surveyStatusFilter.toLowerCase().trim()

//       if (appStatus === filterStatus) return true

//       const statusMappings = {
//         'pending': ['pending', 'pendding', 'panding'],
//         'completed': ['completed', 'complete', 'complated'],
//         'ready for survey': ['ready for survey', 'ready_for_survey', 'readyforsurvey', 'ready survey'],
//         'hut appose': ['hut appose', 'hut_appose', 'hutappose', 'hut oppose']
//       }

//       for (const [key, variations] of Object.entries(statusMappings)) {
//         if (variations.includes(filterStatus) && variations.includes(appStatus)) {
//           return true
//         }
//       }

//       return false
//     })()

//     return matchesSearch && matchesHutUse && matchesSurveyStatus
//   })




const filteredApplications = applications
  .filter((app) => {
    // ✅ If surveyor, show only his records
    if (role === "surveyor") {
      return Number(app.submittedBy) === Number(user_id)
    }
    return true
  })
  .filter((app) => {
    const searchString = searchTerm.toLowerCase()

    const matchesSearch =
      searchTerm === "" ||
      (app.first_name &&
        app.first_name.toLowerCase().includes(searchString)) ||
      (app.last_name &&
        app.last_name.toLowerCase().includes(searchString)) ||
      (app.slum_id &&
        app.slum_id.toLowerCase().includes(searchString)) ||
      (app.aadhaar_number &&
        app.aadhaar_number.includes(searchString)) ||
      (app.cluster_number &&
        app.cluster_number.toLowerCase().includes(searchString)) ||
      (app.slum_use &&
        app.slum_use.toLowerCase().includes(searchString))

    return matchesSearch
  })
  const getFamilyMembers = (app) => {
    const members = []
    for (let i = 1; i <= 6; i++) {
      if (app[`family_member${i}_name`]) {
        members.push({
          name: app[`family_member${i}_name`],
          age: app[`family_member${i}_age`],
          relation: app[`family_member${i}_relation`],
          gender: app[`family_member${i}_gender`],
        })
      }
    }
    return members
  }

  const getDocuments = (app) => {
    const docs = []
    const docFields = [
      "photo_self_path",
      "photo_family_path",
      "biometric_path",
      "front_photo_path",
      "side_photo_path",
      "inside_video_path",
      "declaration_video_path",
      "adivashihutimage",
      "doc_before_2000",
      "submitted_docs_before_2000",
      "description_doc_before_2000",
      "after_2000_proof_submitted",
      "possession_doc_info",
      "Seldeclaration_letter",
      "Ration_card_info",
      "Voter_card_info",
      "Other_doc_info",
      "document_upload"
    ]

    docFields.forEach((field) => {
      if (app[field]) {
        const parsedPaths = parseOriginalPath(app[field])
        const firstPath = parsedPaths[0]
        const documentUrl = firstPath

        docs.push({
          name: field
            .replace(/_/g, " ")
            .replace(/([A-Z])/g, " $1")
            .trim(),
          originalPath: app[field],
          parsedPaths: parsedPaths,
          cleanPath: extractDocumentPath(firstPath),
          url: documentUrl,
          lat: app[`${field}_lat`],
          long: app[`${field}_long`],
          extension: getFileExtension(firstPath),
          isImage: isImageFile(firstPath),
          isVideo: isVideoFile(firstPath),
          isPdf: isPdfFile(firstPath),
          hasMultiple: parsedPaths.length > 1
        })
      }
    })
    return docs
  }

  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .trim()
  }

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800"

    const statusLower = status.toLowerCase().trim()

    if (statusLower.includes("ready") && statusLower.includes("survey")) {
      return "bg-green-100 text-green-800"
    }
    if (statusLower.includes("pending")) {
      return "bg-yellow-100 text-yellow-800"
    }
    if (statusLower.includes("completed") || statusLower.includes("complete")) {
      return "bg-blue-100 text-blue-800"
    }
    if (statusLower.includes("appose") || statusLower.includes("oppose")) {
      return "bg-red-100 text-red-800"
    }

    return "bg-gray-100 text-gray-800"
  }

  const openModal = (app) => {
    setSelectedApplication(app)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedApplication(null)
  }

  const openDocumentModal = (document) => {
    setSelectedDocument(document)
    setCurrentImageIndex(0)
    setShowDocumentModal(true)
  }

  const closeDocumentModal = () => {
    setShowDocumentModal(false)
    setSelectedDocument(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedDocument && selectedDocument.parsedPaths) {
      setCurrentImageIndex((prev) =>
        prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedDocument && selectedDocument.parsedPaths) {
      setCurrentImageIndex((prev) =>
        prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
      )
    }
  }

  const DocumentPreview = ({ document }) => {
    if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
      return <div className="text-center text-gray-500 p-8">Document not available</div>
    }

    const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

    if (document.isImage) {
      return (
        <div className="text-center">
          <div className="relative">
            <img
              src={currentPath}
              alt={document.name}
              className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.target.style.display = "none"
                e.target.nextSibling.style.display = "block"
              }}
            />
            <div style={{ display: "none" }} className="text-red-500 p-4">
              Failed to load image: {currentPath}
            </div>

            {document.hasMultiple && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {document.hasMultiple && (
            <div className="mt-4 text-sm text-gray-600">
              Image {currentImageIndex + 1} of {document.parsedPaths.length}
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
              <Download size={20} />
              Download File
            </button>
          </div>

          {document.hasMultiple && document.parsedPaths.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
              {document.parsedPaths.map((path, index) => (
                <img
                  key={index}
                  src={path}
                  alt={`${document.name} ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                    index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      )
    }

    if (document.isVideo) {
      return (
        <div className="text-center">
          <div className="relative">
            <video
              controls
              className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.target.style.display = "none"
                e.target.nextSibling.style.display = "block"
              }}
            >
              <source src={currentPath} type={`video/${document.extension}`} />
              Your browser does not support the video tag.
            </video>
            <div style={{ display: "none" }} className="text-red-500 p-4">
              Failed to load video: {currentPath}
            </div>

            {document.hasMultiple && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {document.hasMultiple && (
            <div className="mt-4 text-sm text-gray-600">
              Video {currentImageIndex + 1} of {document.parsedPaths.length}
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
              <Download size={20} />
              Download File
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="text-center p-8">
        <div className="text-6xl mb-4">📄</div>
        <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
        {document.hasMultiple ? (
          <div>
            <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
            <div className="space-y-2">
              {document.parsedPaths.map((path, index) => (
                <button
                  key={index}
                  onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
                  className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download File {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
          >
            <Download size={20} />
            Download File
          </button>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SRA applications...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{backgroundColor:'#F9FAFB'}} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 p-4">
   
      {/* <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.completed}</div>
            <div className="text-blue-800 text-sm font-medium">Completed</div>
          </div>
          <div className="text-center p-4 bg-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{statusCounts.pending}</div>
            <div className="text-green-800 text-sm font-medium">Pending</div>
          </div>
          <div className="text-center p-4 bg-orange-100 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{statusCounts.hutAppose}</div>
            <div className="text-orange-800 text-sm font-medium">Hut Appose</div>
          </div>
          <div className="text-center p-4 bg-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{statusCounts.hutDenied}</div>
            <div className="text-purple-800 text-sm font-medium">Hut Denied</div>
          </div>
        </div>
      </div> */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

   
    <div className="relative overflow-hidden rounded-2xl p-6 
      bg-gradient-to-br from-blue-50 to-blue-100
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-300 group">

      <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>

      <div className="relative">
        <div className="text-3xl font-bold text-blue-700">
          {statusCounts.completed}
        </div>
        <div className="text-blue-900 text-sm font-semibold mt-1">
          Completed
        </div>
      </div>
    </div>

 
    <div className="relative overflow-hidden rounded-2xl p-6 
      bg-gradient-to-br from-green-50 to-green-100
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-300 group">

      <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>

      <div className="relative">
        <div className="text-3xl font-bold text-green-700">
          {statusCounts.pending}
        </div>
        <div className="text-green-900 text-sm font-semibold mt-1">
          Pending
        </div>
      </div>
    </div>

    
    <div className="relative overflow-hidden rounded-2xl p-6 
      bg-gradient-to-br from-orange-50 to-orange-100
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-300 group">

      <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>

      <div className="relative">
        <div className="text-3xl font-bold text-orange-700">
          {statusCounts.hutAppose}
        </div>
        <div className="text-orange-900 text-sm font-semibold mt-1">
          Hut Appose
        </div>
      </div>
    </div>

    
    <div className="relative overflow-hidden rounded-2xl p-6 
      bg-gradient-to-br from-purple-50 to-purple-100
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-300 group">

      <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>

      <div className="relative">
        <div className="text-3xl font-bold text-purple-700">
          {statusCounts.hutDenied}
        </div>
        <div className="text-purple-900 text-sm font-semibold mt-1">
          Hut Denied
        </div>
      </div>
    </div>

  </div>
</div>

      {/* Header */}
      {/* <div className="mb-9 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 style={{color:'#4A5565',textTransform:'uppercase'}} className="text-2xl font-bold tracking-wide text-gray-800">BMC Applications</h2>
       
        </div>

        <button
  onClick={() => setShowAddForm(true)}
  className="group relative inline-flex items-center gap-2 
  px-6 py-3 rounded-xl font-semibold text-white 
  bg-gradient-to-r from-orange-500 to-orange-600
  hover:from-orange-600 hover:to-orange-700
  shadow-md hover:shadow-xl 
  transition-all duration-300 
  hover:-translate-y-1 active:scale-95"
>
  <Plus 
    size={18} 
    className="transition-transform duration-300 group-hover:rotate-90" 
  />
  Add Application
</button>
      </div> */}







{/* <div className="mb-9 flex flex-col sm:flex-row justify-between items-center gap-4">
  
  <div>
    <h2 
      style={{ color: '#4A5565', textTransform: 'uppercase' }} 
      className="text-2xl font-bold tracking-wide text-gray-800"
    >
      BMC Applications
    </h2>
  </div>

<div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">

  
    <button
      onClick={handleDownloadExcel}
      className="group relative flex items-center justify-center gap-2 
      w-[95%] sm:w-auto mx-auto sm:mx-0
      px-5 py-3 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-green-500 to-green-600
      hover:from-green-600 hover:to-green-700
      shadow-md hover:shadow-xl 
      transition-all duration-300 
      hover:-translate-y-1 active:scale-95"
    >
      <Download size={18} />
      Download Excel
    </button>

    
    <button
      onClick={handleDownloadPDF}
      className="group relative flex items-center justify-center gap-2 
      w-[95%] sm:w-auto mx-auto sm:mx-0
      px-5 py-3 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-blue-500 to-blue-600
      hover:from-blue-600 hover:to-blue-700
      shadow-md hover:shadow-xl 
      transition-all duration-300 
      hover:-translate-y-1 active:scale-95"
    >
      <Download size={18} />
      Download PDF
    </button>

    
    <button
      onClick={() => setShowAddForm(true)}
      className="group relative flex items-center justify-center gap-2 
      w-[95%] sm:w-auto mx-auto sm:mx-0
      px-6 py-3 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-orange-500 to-orange-600
      hover:from-orange-600 hover:to-orange-700
      shadow-md hover:shadow-xl 
      transition-all duration-300 
      hover:-translate-y-1 active:scale-95"
    >
      <Plus 
        size={18} 
        className="transition-transform duration-300 group-hover:rotate-90" 
      />
      Add Application
    </button>

  </div>
  
</div> */}



{/* <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
  
  <div>
    <h2 
      style={{ color: '#4A5565', textTransform: 'uppercase' }} 
      className="text-2xl font-bold tracking-wide text-gray-800"
    >
      BMC Applications
    </h2>
  </div>

  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

   
    <button
      onClick={handleDownloadExcel}
      className="group relative flex w-full items-center justify-center gap-2 
      sm:w-auto
      px-5 py-3 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-green-500 to-green-600
      hover:from-green-600 hover:to-green-700
      shadow-md hover:shadow-xl 
      transition-all duration-300 
      hover:-translate-y-1 active:scale-95"
    >
      <Download size={18} />
      Download Excel
    </button>

    
    <button
      onClick={handleDownloadPDF}
      className="group relative flex w-full items-center justify-center gap-2 
      sm:w-auto
      px-5 py-3 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-blue-500 to-blue-600
      hover:from-blue-600 hover:to-blue-700
      shadow-md hover:shadow-xl 
      transition-all duration-300 
      hover:-translate-y-1 active:scale-95"
    >
      <Download size={18} />
      Download PDF
    </button>

    
    <button
      onClick={() => setShowAddForm(true)}
      className="group relative flex w-full items-center justify-center gap-2 
      sm:w-auto
      px-6 py-3 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-orange-500 to-orange-600
      hover:from-orange-600 hover:to-orange-700
      shadow-md hover:shadow-xl 
      transition-all duration-300 
      hover:-translate-y-1 active:scale-95"
    >
      <Plus 
        size={18} 
        className="transition-transform duration-300 group-hover:rotate-90" 
      />
      Add Application
    </button>

  </div>
  
</div> */}

<div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
  
  <div>
    <h2 
      style={{ color: '#4A5565', textTransform: 'uppercase' }} 
      className="text-2xl font-bold tracking-wide text-gray-800"
    >
      BMC Applications
    </h2>
  </div>

  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

    <button
      onClick={handleDownloadExcel}
      className="group relative flex w-[90%] mx-auto items-center justify-center gap-2 
      sm:w-auto sm:mx-0
      px-5 py-3 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-green-500 to-green-600
      hover:from-green-600 hover:to-green-700
      shadow-md hover:shadow-xl 
      transition-all duration-300 
      hover:-translate-y-1 active:scale-95"
    >
      <Download size={18} />
      Download Excel
    </button>

    <button
      onClick={handleDownloadPDF}
      className="group relative flex w-[90%] mx-auto items-center justify-center gap-2 
      sm:w-auto sm:mx-0
      px-5 py-3 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-blue-500 to-blue-600
      hover:from-blue-600 hover:to-blue-700
      shadow-md hover:shadow-xl 
      transition-all duration-300 
      hover:-translate-y-1 active:scale-95"
    >
      <Download size={18} />
      Download PDF
    </button>

    <button
      onClick={() => setShowAddForm(true)}
      className="group relative flex w-[90%] mx-auto items-center justify-center gap-2 
      sm:w-auto sm:mx-0
      px-6 py-3 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-orange-500 to-orange-600
      hover:from-orange-600 hover:to-orange-700
      shadow-md hover:shadow-xl 
      transition-all duration-300 
      hover:-translate-y-1 active:scale-95"
    >
      <Plus 
        size={18} 
        className="transition-transform duration-300 group-hover:rotate-90" 
      />
      Add Application
    </button>

  </div>
  
</div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
          <span className="text-2xl mr-3">✅</span>
          <span className="font-medium">{success}</span>
        </div>
      )}

      {error && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
          <span className="text-2xl mr-3">❌</span>
          <span className="font-medium">{error}</span>
        </div>
      )}

      {generatingPdfs && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div>
          <span className="font-medium">Generating and downloading PDF documents...</span>
        </div>
      )}

      {/* Search Bar and Filters */}
      {/* <div className="bg-white rounded-lg shadow-md p-6 mb-15">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-800" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by name, slum ID, area, cluster number, or Aadhaar number..."
            className="w-full pl-10 pr-4 py-3 border border-[#4A5565] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base sm:text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Use of Hut
            </label>
            <select
              value={hutUseFilter}
              onChange={(e) => setHutUseFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">All Uses</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="combine">Combine</option>
              <option value="Social">Social</option>
              <option value="Devotional">Devotional</option>
              <option value="Educational">Educational</option>
             
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Survey Status
            </label>
            <select
              value={surveyStatusFilter}
              onChange={(e) => setSurveyStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">All Statuses</option>
          
               <option value="readytosurvey">Ready To Survey</option>
              <option value="Hut Appose">Hut Appose</option>
                <option value="Hut Denied">Hut Denied</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setHutUseFilter("")
                setSurveyStatusFilter("")
                setSearchTerm("")
              }}
              className="text-white px-2 py-1.5 rounded-lg hover:bg-orange-700 font-medium w-40 text-center"
              style={{ backgroundColor: "#4A5565" }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {(hutUseFilter || surveyStatusFilter || searchTerm) && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {hutUseFilter && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Use: {hutUseFilter}
                  <button
                    onClick={() => setHutUseFilter("")}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {surveyStatusFilter && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                  Status: {surveyStatusFilter}
                  <button
                    onClick={() => setSurveyStatusFilter("")}
                    className="ml-1 text-orange-600 hover:text-orange-800"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Showing {filteredApplications.length} of {applications.length} applications
            </p>
          </div>
        )}
      </div> */}












      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-10">

  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="text-gray-500" size={18} />
    </div>

    <input
      type="text"
      placeholder="Search by name, slum ID, area, cluster number, or Aadhaar number..."
      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl 
                 focus:ring-2 focus:ring-orange-500 focus:border-orange-400
                 transition-all duration-200 text-sm sm:text-base bg-gray-50"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

   
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Filter by Use of Hut
      </label>

      <select
        value={hutUseFilter}
        onChange={(e) => setHutUseFilter(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                   focus:ring-2 focus:ring-orange-500 focus:border-orange-400
                   bg-gray-50 transition"
      >
        <option value="">All Uses</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="combine">Combine</option>
        <option value="Social">Social</option>
        <option value="Devotional">Devotional</option>
        <option value="Educational">Educational</option>
      </select>
    </div>


    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Filter by Survey Status
      </label>

      <select
        value={surveyStatusFilter}
        onChange={(e) => setSurveyStatusFilter(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                   focus:ring-2 focus:ring-orange-500 focus:border-orange-400
                   bg-gray-50 transition"
      >
        <option value="">All Statuses</option>
        <option value="readytosurvey">Ready To Survey</option>
        <option value="Hut Appose">Hut Appose</option>
        <option value="Hut Denied">Hut Denied</option>
      </select>
    </div>


    <div className="flex items-end">
      
      <button
  onClick={() => {
    setHutUseFilter("")
    setSurveyStatusFilter("")
    setSearchTerm("")
  }}
  className="inline-flex items-center gap-2 
  px-6 py-3 rounded-xl font-semibold
  bg-white border border-gray-300
  text-gray-700 
  hover:bg-gray-100 hover:border-orange-400 hover:text-orange-600
  shadow-sm hover:shadow-md
  transition-all duration-300 active:scale-95"
>
  Clear Filters
</button>
    </div>

  </div>

  {/* ACTIVE FILTERS */}
  {(hutUseFilter || surveyStatusFilter || searchTerm) && (
    <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl">

      <p className="text-sm font-semibold text-gray-700 mb-3">
        Active Filters
      </p>

      <div className="flex flex-wrap gap-3">

        {searchTerm && (
          <span className="inline-flex items-center px-3 py-1 text-xs 
                           bg-blue-100 text-blue-700 rounded-full shadow-sm">
            Search: "{searchTerm}"
            <button
              onClick={() => setSearchTerm("")}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              <X size={12} />
            </button>
          </span>
        )}

        {hutUseFilter && (
          <span className="inline-flex items-center px-3 py-1 text-xs 
                           bg-green-100 text-green-700 rounded-full shadow-sm">
            Use: {hutUseFilter}
            <button
              onClick={() => setHutUseFilter("")}
              className="ml-2 text-green-600 hover:text-green-800"
            >
              <X size={12} />
            </button>
          </span>
        )}

        {surveyStatusFilter && (
          <span className="inline-flex items-center px-3 py-1 text-xs 
                           bg-orange-100 text-orange-700 rounded-full shadow-sm">
            Status: {surveyStatusFilter}
            <button
              onClick={() => setSurveyStatusFilter("")}
              className="ml-2 text-orange-600 hover:text-orange-800"
            >
              <X size={12} />
            </button>
          </span>
        )}

      </div>

      <p className="text-xs text-gray-600 mt-3">
        Showing <span className="font-semibold text-orange-600">
          {filteredApplications.length}
        </span> of {applications.length} applications
      </p>

    </div>
  )}

</div>

      {/* Table */}
      
      {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="Alp-thead">
              <tr>
                <th className="Alp-th">
                  Serial No.
                </th>
                <th className="Alp-th">
                  Cluster Number
                </th>
                <th className="Alp-th">
                  Hut ID
                </th>
                <th className="Alp-th">
                  Name
                </th>
                <th className="Alp-th">
                  Address
                </th>
                <th className="Alp-th">
                  Slum Floor
                </th>
                <th className="Alp-th">
                  Use of Hut
                </th>
                <th className="Alp-th">
                  Hut Area (sq.m)
                </th>
                <th className="Alp-th">
                  Date of Survey
                </th>
                <th className="Alp-th">
                  Done By
                </th>
                <th className="Alp-th">
                  Survey Status
                </th>
               {role !== "surveyor" && (
                <th className="Alp-th">
                  Action
                </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
                    No applications found matching your search criteria
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app, index) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="Alp-td">
                      {app.id || index + 1}
                    </td>
                    <td className="Alp-td">
                      {app.cluster_number || "N/A"}
                    </td>
                    <td className="Alp-td">
                      {app.slum_id || "N/A"}
                    </td>
                    <td className="Alp-td">
                      <div className="truncate">
                        {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
                      </div>
                      <div className="text-gray-500 text-xs truncate">
                        {app.gender} • {app.aadhaar_number}
                      </div>
                    </td>
                    <td className="Alp-td">
                    
                      <div className="text-gray-500 text-xs">
                        {app.current_pincode && `PIN: ${app.current_pincode}`}
                      </div>
                    </td>
                    <td className="Alp-td">
                      {app.slum_floor === "G" ? (
                        <span className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-700 mx-auto">
                          {app.slum_floor}
                        </span>
                      ) : (
                        <span className="text-gray-700">{app.slum_floor || "N/A"}</span>
                      )}
                    </td>
                    <td className="Alp-td">
                      {app.slum_use || "N/A"}
                    </td>
                    <td className="Alp-td">
                      <div className="font-medium">{app.area_sq_m}</div>
                      <div className="text-gray-500 text-xs">
                        {app.length && app.width && `${app.length}×${app.width}m`}
                      </div>
                    </td>
                    <td className="Alp-td">
                      <div>{app.created_date || "N/A"}</div>
                      
                    </td>
                    <td className="Alp-td">
                      {app.submittedBy || "-"}
                    </td>
                    <td className="Alp-td">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.survey_status)}`}>
                        {app.survey_status || "Pending"}
                      </span>
                    </td>

                  {role !== "surveyor" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(app)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <Eye size={20} />
                        </button>

                         
<button
  onClick={() => {
    setEditingApplication(app)
    setShowEditForm(true)
  }}
  className="text-orange-600 hover:text-orange-900 transition-colors"
  title="Edit Application"
>
  <Edit size={20} />
</button>


                        <button
                          onClick={() => generateAndDownloadPdfs(app)}
                          disabled={generatingPdfs}
                          className="text-green-600 hover:text-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Download Jodpatra"
                        >
                          <Download size={20} />
                        </button>
                      </div>
                    </td>
                     )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div> */}

      {/* Table */}
<div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">

      {/* HEADER */}
      <thead className="bg-gradient-to-r from-orange-100 to-orange-50 
text-[#2D3748] uppercase tracking-wider font-bold text-xs" >
        <tr>
          <th className="px-6 py-4">Serial No.</th>
          <th className="px-6 py-4">Cluster Number</th>
          <th className="px-6 py-4">Hut ID</th>
          <th className="px-6 py-4">Name</th>
          <th className="px-6 py-4">Address</th>
          <th className="px-6 py-4 text-center">Slum Floor</th>
          <th className="px-6 py-4">Use of Hut</th>
          <th className="px-6 py-4">Hut Area (sq.m)</th>
          <th className="px-6 py-4">Date of Survey</th>
          <th className="px-6 py-4">Done By</th>
          <th className="px-6 py-4">Survey Status</th>
          {role !== "surveyor" && (
            <th className="px-6 py-4 text-center">Action</th>
          )}
        </tr>
      </thead>

      {/* BODY */}
      <tbody className="divide-y divide-gray-200">

        {filteredApplications.length === 0 ? (
          <tr>
            <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
              No applications found matching your search criteria
            </td>
          </tr>
        ) : (
          filteredApplications.map((app, index) => (

            <tr
              key={app.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-orange-50 hover:scale-[1.002] transition-all duration-200"
            >

              <td className="px-6 py-4 font-medium text-gray-700">
                {app.id || index + 1}
              </td>

              <td className="px-6 py-4 text-gray-700">
                {app.cluster_number || "N/A"}
              </td>

              <td className="px-6 py-4 text-gray-700">
                {app.slum_id || "N/A"}
              </td>

              {/* NAME COLUMN */}
              <td className="px-6 py-4">
                <div className="font-semibold text-gray-800 truncate">
                  {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
                </div>
                <div className="text-gray-500 text-xs truncate">
                  {app.gender} • {app.aadhaar_number}
                </div>
              </td>

              {/* ADDRESS */}
              <td className="px-6 py-4 text-gray-600">
                <div className="text-xs">
                  {app.current_pincode && `PIN: ${app.current_pincode}`}
                </div>
              </td>

              {/* FLOOR */}
              <td className="px-6 py-4 text-center">
                {app.slum_floor === "G" ? (
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-semibold shadow-sm">
                    {app.slum_floor}
                  </span>
                ) : (
                  <span className="text-gray-700">{app.slum_floor || "N/A"}</span>
                )}
              </td>

              {/* USE */}
              <td className="px-6 py-4 text-gray-700">
                {app.slum_use || "N/A"}
              </td>

              {/* AREA */}
              <td className="px-6 py-4">
                <div className="font-medium text-gray-800">{app.area_sq_m}</div>
                <div className="text-gray-500 text-xs">
                  {app.length && app.width && `${app.length}×${app.width}m`}
                </div>
              </td>

              {/* DATE */}
              <td className="px-6 py-4 text-gray-700">
                {app.created_date || "N/A"}
              </td>

              {/* DONE BY */}
              <td className="px-6 py-4 text-gray-700">
                {app.submittedBy || "-"}
              </td>

              {/* STATUS */}
              <td className="px-6 py-4">
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getStatusColor(app.survey_status)}`}>
                  {app.survey_status || "Pending"}
                </span>
              </td>

              {/* ACTION */}
              {role !== "surveyor" && (
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-3">

                    <button
                      onClick={() => openModal(app)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setEditingApplication(app)
                        setShowEditForm(true)
                      }}
                      className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                      title="Edit Application"
                    >
                      <Edit size={18} />
                    </button>

                    <button 
                   
                      onClick={() => generateAndDownloadPdfs(app)}
                      disabled={generatingPdfs}
                      className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition disabled:opacity-50 cursor-pointer flex items-center justify-center flex-col"
                      title="Download Jodpatra"
                    >
                      <Download size={18} />जोडपत्र
                    </button>

                    <button
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer flex items-center justify-center flex-col"
  onClick={() => generateIndexPDF(app)}

>
 <Download size={18} /><span>Index</span>
</button>

                  </div>
                </td>
              )}

            </tr>
          ))
        )}

      </tbody>
    </table>
  </div>
</div>

      {/* Document Modal */}
      {showDocumentModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <div>
                <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
                <p className="text-sm text-gray-600">
                  Type: {selectedDocument.extension.toUpperCase()} |
                  {selectedDocument.hasMultiple && (
                    <span> {selectedDocument.parsedPaths.length} files | </span>
                  )}
                  {selectedDocument.lat && selectedDocument.long && (
                    <span>
                      {" "}
                      GPS: {selectedDocument.lat}, {selectedDocument.long}
                    </span>
                  )}
                </p>
              </div>
              <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <DocumentPreview document={selectedDocument} />
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">File Information:</h4>
                <p className="text-sm text-gray-600 break-all">
                  <strong>Original Path:</strong> {selectedDocument.originalPath}
                </p>
                <p className="text-sm text-gray-600 break-all">
                  <strong>Clean Path:</strong> {selectedDocument.cleanPath}
                </p>
                <p className="text-sm text-gray-600 break-all">
                  <strong>URL:</strong> {selectedDocument.url}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
              <h2 className="text-3xl font-bold">
                Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={28} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
                  👨‍👩‍👧‍👦 Family Members Details
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFamilyMembers(selectedApplication).map((member, index) => (
                    <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                      <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm">
                          <strong>Relation:</strong> {member.relation}
                        </p>
                        <p className="text-sm">
                          <strong>Gender:</strong> {member.gender}
                        </p>
                        <p className="text-sm">
                          <strong>Age:</strong> {member.age} years
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
                  📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getDocuments(selectedApplication).map((doc, index) => {
                    const firstImagePath = doc.parsedPaths[0]

                    return (
                      <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                        <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>

                        <div className="mb-3">
                          {doc.isImage && (
                            <div className="relative">
                              <img
                                src={firstImagePath}
                                alt={doc.name}
                                className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
                                onClick={() => openDocumentModal(doc)}
                                onError={(e) => {
                                  e.target.src =
                                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
                                }}
                              />
                              {doc.hasMultiple && (
                                <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                  +{doc.parsedPaths.length - 1}
                                </div>
                              )}
                            </div>
                          )}
                          {doc.isVideo && (
                            <div
                              className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
                              onClick={() => openDocumentModal(doc)}
                            >
                              <span className="text-3xl">🎥</span>
                              {doc.hasMultiple && (
                                <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                  +{doc.parsedPaths.length - 1}
                                </div>
                              )}
                            </div>
                          )}
                          {doc.isPdf && (
                            <div
                              className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative"
                              onClick={() => openDocumentModal(doc)}
                            >
                              <span className="text-3xl">📄</span>
                              {doc.hasMultiple && (
                                <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                  +{doc.parsedPaths.length - 1}
                                </div>
                              )}
                            </div>
                          )}
                          {!doc.isImage && !doc.isVideo && !doc.isPdf && (
                            <div
                              className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative"
                              onClick={() => openDocumentModal(doc)}
                            >
                              <span className="text-3xl">📁</span>
                              {doc.hasMultiple && (
                                <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                  +{doc.parsedPaths.length - 1}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                            {/* 1*** */}
                          <button
                            onClick={() => openDocumentModal(doc)}
                            className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1"
                          >
                            <Eye size={16} />
                            View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
                          </button>

                          <button
                            onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)}
                            className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
                          >
                            <Download size={16} />
                            Download File
                          </button>
                        </div>

                        <div className="space-y-2 mt-2">
                          <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
                            <strong>Files Count:</strong> {doc.parsedPaths.length}
                          </p>
                          {doc.lat && doc.long && (
                            <p className="text-xs text-gray-600 bg-white p-2 rounded">
                              <strong>GPS:</strong> {doc.lat}, {doc.long}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
                  📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(selectedApplication).map(([key, value], index) => (
                    <div
                      key={key}
                      className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900 text-sm">
                          {index + 1}. {formatFieldName(key)}
                        </h4>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-sm text-gray-700 break-all">
                          {value !== null && value !== undefined ? value.toString() : "N/A"}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Application Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
              <h2 className="text-3xl font-bold">Application Form</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={28} />
              </button>
            </div>
            <div className="p-6">
              <AddApplicationForm
                onClose={() => setShowAddForm(false)}
                onSuccess={() => {
                  setShowAddForm(false)
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Application Form Modal */}
{showEditForm && editingApplication && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
        <h2 className="text-3xl font-bold">Edit Application - {editingApplication.first_name} {editingApplication.last_name}</h2>
        <button
          onClick={() => {
            setShowEditForm(false)
            setEditingApplication(null)
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={28} />
        </button>
      </div>
      <div className="p-6">
        <EditApplicationForm
          formId={editingApplication.id}
          onClose={() => {
            setShowEditForm(false)
            setEditingApplication(null)
          }}
          onSuccess={() => {
            setShowEditForm(false)
            setEditingApplication(null)
            // Optionally refetch data
            fetchApplications()
          }}
        />
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default AllApplicationsPage
