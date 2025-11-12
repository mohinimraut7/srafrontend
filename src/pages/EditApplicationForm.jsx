// import { useState, useEffect } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download, Plus, Minus, MapPin, Crosshair, X } from 'lucide-react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import isValidAadhaar from '../utils/aadhaarValidator';

// const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const validationSchemas = {
//   // Reuse same validation as Add form
//   1: Yup.object({
//     slum_id: Yup.string().required('Slum ID is required'),
//     municipal_corporation: Yup.string().required('Municipal Corporation is required'),
//     ward: Yup.string().required('Ward is required'),
//     district: Yup.string().required('District is required'),
//     taluka: Yup.string().required('Taluka is required'),
//   }),
//   2: Yup.object({
//     first_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('First name is required'),
//     middle_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Middle name is required'),
//     last_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Last name is required'),
//     gender: Yup.string().required('Gender is required'),
//     aadhaar_number: Yup.string()
//       .required('Aadhaar number is required')
//       .test('is-valid-aadhaar', 'Enter a valid Aadhaar number', (value) => isValidAadhaar(value)),
//     aadhaar_mobile_number: Yup.string()
//       .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
//       .required('Mobile number is required'),
//     user_email: Yup.string().email('Invalid email format'),
//   }),
//   3: Yup.object({
//     current_address: Yup.string().required('Current address is required'),
//     current_mobile_number: Yup.string()
//       .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
//       .required('Mobile number is required'),
//     current_pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     aadhaar_pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     voter_card_number: Yup.string().matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),
//   }),
//   4: Yup.object({
//     residency_since: Yup.string().required('Residency since is required'),
//   }),
//   5: Yup.object({
//     num_family_members: Yup.number()
//       .min(1, 'At least 1 family member is required')
//       .max(6, 'Maximum 6 family members allowed')
//       .required('Number of family members is required'),
//   }),
//   6: Yup.object({}),
//   7: Yup.object({}),
// }

// const EditApplicationForm = ({ formId, onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [files, setFiles] = useState({}) // New files
//   const [existingFiles, setExistingFiles] = useState({}) // URLs from DB
//   const [loading, setLoading] = useState(false)
//   const [fetching, setFetching] = useState(true)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [displayedMembers, setDisplayedMembers] = useState(1)
//   const [locationFetched, setLocationFetched] = useState(false)
//   const [selectedCluster, setSelectedCluster] = useState("")
//   const [slums, setSlums] = useState([])
//   const [clusters, setClusters] = useState([])

//   useEffect(() => {
//     fetchClusters()
//     fetchFormData()
//   }, [formId])


//   // EditApplicationForm.jsx (or .tsx)
// // useEffect(() => {
// //   const load = async () => {
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem('authToken');
   
// //       const r = await fetch(`${API_BASE_URL}/api/sra-logs/sra-form-logs/${formId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (!r.ok) throw new Error(await r.text());
// //       setFormData(await r.json());
// //     } catch (e) {
// //       setError(e.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   load();
// // }, [formId]);





// useEffect(() => {
//   const load = async () => {
//     if (!formId) return;

//     setLoading(true);
//     try {
//       const token = getAuthToken();
//       if (!token) throw new Error("Authentication required");

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/sra-form-logs/${formId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         const errText = await response.text();
//         throw new Error(errText || "Failed to fetch form data");
//       }

//       const data = await response.json();

//       // Parse family members count
//       const numMembers = parseInt(data.num_family_members) || 1;
//       setDisplayedMembers(Math.min(numMembers, 6));

//       // Format residency_since: "DD-MM-YYYY" → "YYYY-MM-DD"
//       if (data.residency_since && data.residency_since.includes('-')) {
//         const [day, month, year] = data.residency_since.split('-');
//         data.residency_since = `${year}-${month}-${day}`;
//       }

//       // Handle file paths (existing files from DB)
//       const fileFields = [
//         'photo_self_path', 'photo_family_path', 'biometric_path', 'doc_front_view',
//         'side_photo_path', 'inside_video_path', 'declaration_video_path', 'adivashihutimage',
//         'doc_before_2000', 'submitted_docs_before_2000', 'description_doc_before_2000',
//         'after_2000_proof_submitted', 'possession_doc_info', 'Seldeclaration_letter',
//         'Ration_card_info', 'Voter_card_info', 'Other_doc_info', 'sale_agreement'
//       ];

//       const existing = {};
//       fileFields.forEach(field => {
//         if (data[field]) {
//           let paths = [];
//           if (Array.isArray(data[field])) {
//             paths = data[field];
//           } else if (typeof data[field] === 'string') {
//             try {
//               paths = JSON.parse(data[field]);
//             } catch {
//               paths = [data[field]];
//             }
//           } else {
//             paths = [data[field]];
//           }
//           existing[field] = paths.filter(Boolean); // Remove empty
//         }
//       });
//       setExistingFiles(existing);

//       // Update Formik initial values
//       setInitialValues(prev => ({ ...prev, ...data }));

//     } catch (e) {
//       setError(e.message || "Failed to load form data");
//     } finally {
//       setLoading(false);
//       setFetching(false); // In case you still use this
//     }
//   };

//   load();
// }, [formId]);




//   const fetchClusters = async () => {
//     const token = getAuthToken()
//     if (!token) return

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/clusters/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (response.ok) {
//         const data = await response.json()
//         setClusters(data || [])
//       }
//     } catch (err) {
//       console.error("Error fetching clusters:", err)
//     }
//   }

//   const fetchFormData = async () => {
//     const token = getAuthToken()
//     if (!token || !formId) return

//     try {
//       setFetching(true)
//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/sra-form-logs/${formId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       if (!response.ok) throw new Error("Failed to fetch form data")

//       const data = await response.json()

//       // Parse family members
//       const numMembers = parseInt(data.num_family_members) || 1
//       setDisplayedMembers(Math.min(numMembers, 6))

//       // Format residency_since to YYYY-MM-DD
//       if (data.residency_since) {
//         const [day, month, year] = data.residency_since.split('-')
//         data.residency_since = `${year}-${month}-${day}`
//       }

//       // Set existing file URLs
//       const fileFields = [
//         'photo_self_path', 'photo_family_path', 'biometric_path', 'doc_front_view',
//         'side_photo_path', 'inside_video_path', 'declaration_video_path', 'adivashihutimage',
//         'doc_before_2000', 'submitted_docs_before_2000', 'description_doc_before_2000',
//         'after_2000_proof_submitted', 'possession_doc_info', 'Seldeclaration_letter',
//         'Ration_card_info', 'Voter_card_info', 'Other_doc_info', 'sale_agreement'
//       ]

//       const existing = {}
//       fileFields.forEach(field => {
//         if (data[field]) {
//           if (field === 'sale_agreement' && typeof data[field] === 'string') {
//             try {
//               existing[field] = JSON.parse(data[field])
//             } catch {
//               existing[field] = [data[field]]
//             }
//           } else {
//             existing[field] = Array.isArray(data[field]) ? data[field] : [data[field]]
//           }
//         }
//       })
//       setExistingFiles(existing)

//       // Initialize Formik after data is ready
//       setInitialValues(prev => ({ ...prev, ...data }))
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setFetching(false)
//     }
//   }

//   const [initialValues, setInitialValues] = useState({
//     hut_id: '', hut_name: '', slum_id: '', slum_name: '', name_of_slum_area: '',
//     municipal_corporation: "BMC", ward: '', district: '', taluka: '', village: '',
//     cluster_number: '', slum_use: '', slum_floor: '', ownership_of_slum_land: '',
//     survey_status: '', plan_submitted: false, society_registered: false,
//     first_name: '', middle_name: '', last_name: '', gender: '', spouse_name: '',
//     user_email: '', aadhaar_number: '', aadhaar_mobile_number: '',
//     aadhaar_address: '', aadhaar_pincode: '', current_address: '', current_pincode: '',
//     current_mobile_number: '', voter_card_type: '', voter_card_number: '',
//     biometric_lat: '', biometric_long: '',
//     bank_name: '', account_number: '', ifsc_code: '',
//     length: '', width: '', area_sq_m: '', residency_since: '',
//     num_family_members: 1,
//     family_member1_name: '', family_member1_age: '', family_member1_relation: '', family_member1_gender: '', family_member1_aadhaar: '',
//     family_member2_name: '', family_member2_age: '', family_member2_relation: '', family_member2_gender: '', family_member2_aadhaar: '',
//     family_member3_name: '', family_member3_age: '', family_member3_relation: '', family_member3_gender: '', family_member3_aadhaar: '',
//     family_member4_name: '', family_member4_age: '', family_member4_relation: '', family_member4_gender: '', family_member4_aadhaar: '',
//     family_member5_name: '', family_member5_age: '', family_member5_relation: '', family_member5_gender: '', family_member5_aadhaar: '',
//     family_member6_name: '', family_member6_age: '', family_member6_relation: '', family_member6_gender: '', family_member6_aadhaar: '',
//     self_declaration_letter: false, submitted_docs_before_2000: false,
//     doc_before_2000: false, after_2000_proof_submitted: false,
//   })

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: 'Building' },
//     { id: 2, title: 'Personal Details', icon: 'User' },
//     { id: 3, title: 'Address Contact', icon: 'MapPin' },
//     { id: 4, title: 'Bank and Slum Details', icon: 'Bank' },
//     { id: 5, title: 'Family Members', icon: 'Users' },
//     { id: 6, title: 'Images', icon: 'Camera' },
//     { id: 7, title: 'Metadata', icon: 'FileText' }
//   ]

//   const handleFileChange = (e, setFieldValue) => {
//     const { name, files: selectedFiles } = e.target
//     if (name === "sale_agreement") {
//       setFiles(prev => ({
//         ...prev,
//         [name]: [...(prev[name] || []), ...Array.from(selectedFiles)]
//       }))
//     } else {
//       setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }))
//     }
//     setFieldValue(name, selectedFiles[0] || (name === "sale_agreement" ? selectedFiles : null))
//   }

//   const removeNewFile = (name, index) => {
//     setFiles(prev => {
//       const updated = [...(prev[name] || [])]
//       updated.splice(index, 1)
//       return { ...prev, [name]: updated.length > 0 ? updated : undefined }
//     })
//   }

//   const nextStep = () => currentStep < steps.length && setCurrentStep(currentStep + 1)
//   const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1)
//   const addMember = () => displayedMembers < 6 && setDisplayedMembers(displayedMembers + 1)
//   const removeMember = () => displayedMembers > 1 && setDisplayedMembers(displayedMembers - 1)

//   const handleSubmit = async (values, { setFieldError }) => {
//     setLoading(true); setError(null); setSuccess(null)

//     const token = getAuthToken()
//     if (!token) {
//       setError("Authentication required")
//       setLoading(false)
//       return
//     }

//     try {
//       const formData = new FormData()

//       // Only append changed text fields
//       const original = initialValues
//       Object.keys(values).forEach(key => {
//         if (values[key] !== original[key] && values[key] !== '' && values[key] != null) {
//           formData.append(key, values[key])
//         }
//       })

//       // Append new files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           if (Array.isArray(files[key])) {
//             files[key].forEach(file => formData.append(key, file))
//           } else {
//             formData.append(key, files[key])
//           }
//         }
//       })

//       if (formData.entries().next().done) {
//         setError("No changes detected")
//         setLoading(false)
//         return
//       }

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/sra-form-logs/${formId}`, {
//         method: 'PUT',
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData
//       })

//       if (!response.ok) {
//         const err = await response.json()
//         throw new Error(err.message || "Update failed")
//       }

//       setSuccess("Form updated successfully!")
//       setTimeout(() => onSuccess?.(), 2000)
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderFilePreview = (url, name, index) => {
//     const isImage = url.match(/\.(jpg|jpeg|png|gif)$/i)
//     const isVideo = url.match(/\.(mp4|webm|ogg)$/i)
//     const isPDF = url.endsWith('.pdf')

//     return (
//       <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded mt-1 text-xs">
//         <div className="flex items-center gap-2 truncate">
//           {isImage ? 'Photo' : isVideo ? 'Video' : isPDF ? 'PDF' : 'File'}
//           <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-[150px]">
//             {name || url.split('/').pop()}
//           </a>
//         </div>
//         <a href={url} download className="text-green-600 hover:text-green-800">
//           <Download size={14} />
//         </a>
//       </div>
//     )
//   }

//   if (fetching) {
//     return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="mb-8">
//           <div className="flex items-center justify-between overflow-x-auto bg-white rounded-xl shadow-lg p-4">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
//                 <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all ${
//                   currentStep >= step.id 
//                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-lg' 
//                     : 'bg-white border-gray-300 text-gray-500'
//                 }`}>
//                   <span className="text-xl">{step.icon}</span>
//                 </div>
//                 <div className="ml-4 min-w-0">
//                   <p className={`text-sm font-semibold ${currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'}`}>Step {step.id}</p>
//                   <p className={`text-xs truncate ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}>{step.title}</p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full ${currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'}`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
//           {success && (
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">Success</span>
//               <span className="font-medium">{success}</span>
//             </div>
//           )}
//           {error && (
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">Error</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[currentStep]}
//             onSubmit={handleSubmit}
//             enableReinitialize
//           >
//             {({ values, setFieldValue }) => (
//               <Form>
//                 {/* Same renderStepContent logic as Add form, but with existingFiles & file preview */}
//                 {currentStep === 1 && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {/* Reuse same fields as Add form */}
//                       {/* ... (same as AddApplicationForm.jsx Step 1) ... */}
//                     </div>
//                   </div>
//                 )}

//                 {currentStep === 6 && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {[
//                         { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: 'Photo', db: 'photo_self_path' },
//                         { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: 'Family', db: 'photo_family_path' },
//                         { name: 'doc_side_view', label: 'Doc Side View', accept: 'image/*', icon: 'Side', db: 'side_photo_path' },
//                         { name: 'doc_front_view', label: 'Doc Front View', accept: 'image/*', icon: 'Front', db: 'doc_front_view' },
//                         { name: 'adivashihutimage', label: 'Hut Image', accept: 'image/*,.pdf', icon: 'Home', db: 'adivashihutimage' },
//                         ...(values.residency_since && new Date(values.residency_since) <= new Date('2000-01-01')
//                           ? [
//                               { name: 'doc_before_2000', label: 'Docs before 2000', accept: 'image/*,.pdf', icon: 'File', db: 'doc_before_2000' },
//                               { name: 'submitted_docs_before_2000', label: 'Submitted Docs Before 2000', accept: 'image/*,.pdf', icon: 'Check', db: 'submitted_docs_before_2000' }
//                             ]
//                           : []
//                         ),
//                         ...(values.residency_since && new Date(values.residency_since) > new Date('2000-01-01')
//                           ? [{ name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: 'Check', db: 'after_2000_proof_submitted' }]
//                           : []
//                         ),
//                         { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: 'Home', db: 'possession_doc_info' },
//                         { name: 'Seldeclaration_letter', label: 'Self Declaration', accept: 'image/*,.pdf', icon: 'Write', db: 'Seldeclaration_letter' },
//                         { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: 'Card', db: 'Ration_card_info' },
//                         { name: 'sale_agreement', label: 'Sale Agreement (Multi)', accept: '.pdf,.doc,.docx,image/*', icon: 'Agreement', db: 'sale_agreement', multiple: true },
//                         { name: 'biometric', label: 'Biometric', accept: 'image/*', icon: 'Fingerprint', db: 'biometric_path' },
//                         { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: 'Video', db: 'declaration_video_path' },
//                         { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: 'Camera', db: 'inside_video_path' }
//                       ].map(({ name, label, accept, icon, db, multiple }) => (
//                         <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
//                           <div className="flex items-center mb-3">
//                             <span className="text-2xl mr-2">{icon}</span>
//                             <h4 className="font-semibold text-gray-800">{label}</h4>
//                           </div>

//                           {/* Existing Files */}
//                           {existingFiles[db] && existingFiles[db].map((url, i) => renderFilePreview(url, `${label} #${i + 1}`, i))}

//                           {/* New File Input */}
//                           <input
//                             type="file"
//                             name={name}
//                             onChange={(e) => handleFileChange(e, setFieldValue)}
//                             accept={accept}
//                             multiple={multiple}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700"
//                           />

//                           {/* New Files Preview */}
//                           {files[name] && Array.isArray(files[name]) && files[name].map((file, i) => (
//                             <div key={i} className="flex items-center justify-between p-2 bg-blue-50 rounded mt-1 text-xs">
//                               <span className="truncate">{file.name}</span>
//                               <button type="button" onClick={() => removeNewFile(name, i)} className="text-red-600">
//                                 <X size={14} />
//                               </button>
//                             </div>
//                           ))}
//                           {files[name] && !Array.isArray(files[name]) && (
//                             <div className="flex items-center justify-between p-2 bg-blue-50 rounded mt-1 text-xs">
//                               <span className="truncate">{files[name].name}</span>
//                               <button type="button" onClick={() => {
//                                 setFiles(prev => ({ ...prev, [name]: null }))
//                                 setFieldValue(name, null)
//                               }} className="text-red-600">
//                                 <X size={14} />
//                               </ button>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Other steps same as Add form... */}

//                 <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 1}
//                     className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
//                       currentStep === 1
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
//                     }`}
//                   >
//                     <ChevronLeft size={20} /> Previous
//                   </button>

//                   {currentStep < steps.length ? (
//                     <button
//                       type="button"
//                       onClick={nextStep}
//                       className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg"
//                     >
//                       Next <ChevronRight size={20} />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
//                         loading
//                           ? 'bg-gray-400 cursor-not-allowed'
//                           : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg'
//                       } text-white`}
//                     >
//                       {loading ? 'Updating...' : <><Save size={20} /> Update Form</>}
//                     </button>
//                   )}
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EditApplicationForm


// ===============================================


/* EditApplicationForm.jsx */
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Download,
  Plus,
  Minus,
  MapPin,
  Crosshair,
  X,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import isValidAadhaar from "../utils/aadhaarValidator";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthToken = () => (typeof window === "undefined" ? null : localStorage.getItem("authToken"));

/* ────────────────────── VALIDATION (same as Add) ────────────────────── */
const validationSchemas = {
  1: Yup.object({
    cluster_number: Yup.string().required("Cluster is required"),
    slum_id: Yup.string().required("Slum ID is required"),
    hut_id: Yup.string().required("Hut ID is required"),
    hut_name: Yup.string().required("Hut name is required"),
  }),
  2: Yup.object({
    first_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets")
      .required("First name required"),
    middle_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets")
      .required("Middle name required"),
    last_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets")
      .required("Last name required"),
    gender: Yup.string().required("Gender required"),
    aadhaar_number: Yup.string()
      .required("Aadhaar required")
      .test("valid-aadhaar", "Invalid Aadhaar", (v) => isValidAadhaar(v)),
    aadhaar_mobile_number: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Valid 10-digit mobile")
      .required("Mobile required"),
    user_email: Yup.string().email("Invalid email"),
  }),
  3: Yup.object({
    current_address: Yup.string().required("Current address required"),
    current_mobile_number: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Valid 10-digit mobile")
      .required("Mobile required"),
    current_pincode: Yup.string().matches(/^[0-9]{6}$/, "6-digit pincode"),
    aadhaar_pincode: Yup.string().matches(/^[0-9]{6}$/, "6-digit pincode"),
    voter_card_number: Yup.string().matches(/^[A-Z0-9]{10}$/, "10-digit voter ID"),
  }),
  4: Yup.object({
    residency_since: Yup.string().required("Residency since required"),
    length: Yup.number().min(0).required(),
    width: Yup.number().min(0).required(),
  }),
  5: Yup.object({
    num_family_members: Yup.number()
      .min(1, "At least 1 member")
      .max(6, "Max 6 members")
      .required(),
  }),
  6: Yup.object({}),
  7: Yup.object({}),
};

/* ────────────────────── COMPONENT ────────────────────── */
const EditApplicationForm = ({ formId, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [displayedMembers, setDisplayedMembers] = useState(1);
  const [clusters, setClusters] = useState([]);
  const [slums, setSlums] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState("");

  const [initialValues, setInitialValues] = useState({
    // ---- basic ----
    cluster_number: "",
    slum_id: "",
    slum_name: "",
    name_of_slum_area: "",
    municipal_corporation: "BMC",
    ward: "",
    district: "",
    taluka: "",
    village: "",
    hut_id: "",
    hut_name: "",
    slum_use: "",
    slum_floor: "",
    ownership_of_slum_land: "",
    survey_status: "",
    plan_submitted: false,
    society_registered: false,

    // ---- personal ----
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    spouse_name: "",
    user_email: "",
    aadhaar_number: "",
    aadhaar_mobile_number: "",
    aadhaar_address: "",
    aadhaar_pincode: "",
    current_address: "",
    current_pincode: "",
    current_mobile_number: "",
    voter_card_type: "",
    voter_card_number: "",
    biometric_lat: "",
    biometric_long: "",

    // ---- bank & slum ----
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    length: "",
    width: "",
    area_sq_m: "",
    residency_since: "",

    // ---- family ----
    num_family_members: 1,
    family_member1_name: "",
    family_member1_age: "",
    family_member1_relation: "",
    family_member1_gender: "",
    family_member1_aadhaar: "",
    family_member2_name: "",
    family_member2_age: "",
    family_member2_relation: "",
    family_member2_gender: "",
    family_member2_aadhaar: "",
    family_member3_name: "",
    family_member3_age: "",
    family_member3_relation: "",
    family_member3_gender: "",
    family_member3_aadhaar: "",
    family_member4_name: "",
    family_member4_age: "",
    family_member4_relation: "",
    family_member4_gender: "",
    family_member4_aadhaar: "",
    family_member5_name: "",
    family_member5_age: "",
    family_member5_relation: "",
    family_member5_gender: "",
    family_member5_aadhaar: "",
    family_member6_name: "",
    family_member6_age: "",
    family_member6_relation: "",
    family_member6_gender: "",
    family_member6_aadhaar: "",

    // ---- flags ----
    self_declaration_letter: false,
    submitted_docs_before_2000: false,
    doc_before_2000: false,
    after_2000_proof_submitted: false,
  });

  const [files, setFiles] = useState({});               // new files (File objects)
  const [existingFiles, setExistingFiles] = useState({}); // URLs from DB

  /* ────────────────────── FETCH CLUSTERS ────────────────────── */
  useEffect(() => {
    const fetchClusters = async () => {
      const token = getAuthToken();
      if (!token) return;
      try {
        const r = await fetch(`${API_BASE_URL}/api/clusters/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (r.ok) setClusters(await r.json());
      } catch (e) {
        console.error(e);
      }
    };
    fetchClusters();
  }, []);

  /* ────────────────────── FETCH FORM DATA ────────────────────── */
  useEffect(() => {
    const load = async () => {
      if (!formId) return;
      setFetching(true);
      const token = getAuthToken();
      if (!token) {
        setError("Login required");
        setFetching(false);
        return;
      }

      try {
        const r = await fetch(`${API_BASE_URL}/api/sra-logs/sra-form-logs/${formId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!r.ok) throw new Error(await r.text());
        const data = await r.json();

        /* ----- family members ----- */
        const members = parseInt(data.num_family_members) || 1;
        setDisplayedMembers(Math.min(members, 6));

        /* ----- residency date (DD-MM-YYYY → YYYY-MM-DD) ----- */
        if (data.residency_since && data.residency_since.includes("-")) {
          const [d, m, y] = data.residency_since.split("-");
          data.residency_since = `${y}-${m}-${d}`;
        }

        /* ----- file URLs ----- */
        const fileMap = {
          photo_self_path: "photo_self",
          photo_family_path: "photo_family",
          doc_front_view: "doc_front_view",
          side_photo_path: "doc_side_view",
          adivashihutimage: "adivashihutimage",
          biometric_path: "biometric",
          inside_video_path: "video_inside",
          declaration_video_path: "video_self_declaration",
          doc_before_2000: "doc_before_2000",
          submitted_docs_before_2000: "submitted_docs_before_2000",
          after_2000_proof_submitted: "after_2000_proof_submitted",
          possession_doc_info: "possession_doc_info",
          Seldeclaration_letter: "Seldeclaration_letter",
          Ration_card_info: "Ration_card_info",
          sale_agreement: "sale_agreement",
        };

        const existing = {};
        Object.entries(fileMap).forEach(([dbKey, uiKey]) => {
          if (!data[dbKey]) return;
          let arr = [];
          if (Array.isArray(data[dbKey])) arr = data[dbKey];
          else if (typeof data[dbKey] === "string")
            try {
              arr = JSON.parse(data[dbKey]);
            } catch {
              arr = [data[dbKey]];
            }
          else arr = [data[dbKey]];
          existing[uiKey] = arr.filter(Boolean);
        });
        setExistingFiles(existing);

        /* ----- set Formik initial values ----- */
        setInitialValues((prev) => ({ ...prev, ...data }));
      } catch (e) {
        setError(e.message);
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [formId]);

  /* ────────────────────── HELPERS ────────────────────── */
  const nextStep = () => currentStep < 7 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);
  const addMember = () => displayedMembers < 6 && setDisplayedMembers(displayedMembers + 1);
  const removeMember = () => displayedMembers > 1 && setDisplayedMembers(displayedMembers - 1);

  const handleFileChange = (e, setFieldValue) => {
    const { name, files: f } = e.target;
    if (name === "sale_agreement") {
      setFiles((p) => ({
        ...p,
        [name]: [...(p[name] || []), ...Array.from(f)],
      }));
    } else {
      setFiles((p) => ({ ...p, [name]: f[0] }));
    }
    setFieldValue(name, f[0] || (name === "sale_agreement" ? Array.from(f) : null));
  };

  const removeNewFile = (name, idx) => {
    setFiles((p) => {
      const a = [...(p[name] || [])];
      a.splice(idx, 1);
      return { ...p, [name]: a.length ? a : undefined };
    });
  };

  const fetchCurrentLocation = (setFieldValue) => {
    if (!navigator.geolocation) return setError("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        setFieldValue("biometric_lat", lat);
        setFieldValue("biometric_long", lng);
        setSuccess(`Location captured: ${lat}, ${lng}`);
        setTimeout(() => setSuccess(null), 3000);
      },
      () => setError("Failed to get location")
    );
  };

  const handleSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const token = getAuthToken();
    if (!token) {
      setError("Login required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    let hasChanges = false;

    // ---- text fields that changed ----
    Object.entries(values).forEach(([k, v]) => {
      if (v !== initialValues[k] && v !== "" && v != null) {
        formData.append(k, v);
        hasChanges = true;
      }
    });

    // ---- new files ----
    Object.entries(files).forEach(([k, v]) => {
      if (!v) return;
      if (Array.isArray(v)) {
        v.forEach((f) => formData.append(k, f));
      } else {
        formData.append(k, v);
      }
      hasChanges = true;
    });

    if (!hasChanges) {
      setError("No changes detected");
      setLoading(false);
      return;
    }

    try {
      const r = await fetch(`${API_BASE_URL}/api/sra-logs/sra-form-logs/${formId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!r.ok) throw new Error((await r.json()).message || "Update failed");
      setSuccess("Application updated!");
      setTimeout(() => onSuccess?.(), 2000);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ────────────────────── RENDER FILE PREVIEW ────────────────────── */
  const renderFile = (url, label, idx) => {
    const isImg = /\.(jpe?g|png|gif|webp)$/i.test(url);
    const isVid = /\.(mp4|webm|ogg)$/i.test(url);
    const isPdf = url.endsWith(".pdf");

    return (
      <div
        key={idx}
        className="flex items-center justify-between p-2 bg-green-50 rounded text-xs"
      >
        <div className="flex items-center gap-1 truncate">
          {isImg ? "Image" : isVid ? "Video" : isPdf ? "PDF" : "File"}
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-[140px]">
            {label}
          </a>
        </div>
        <a href={url} download className="text-green-600">
          <Download size={14} />
        </a>
      </div>
    );
  };

  /* ────────────────────── STEPS UI ────────────────────── */
  const steps = [
    { id: 1, title: "Basic Information", icon: "Building" },
    { id: 2, title: "Personal Details", icon: "User" },
    { id: 3, title: "Address Contact", icon: "MapPin" },
    { id: 4, title: "Bank & Slum Details", icon: "Bank" },
    { id: 5, title: "Family Members", icon: "Users" },
    { id: 6, title: "Documents", icon: "Camera" },
    { id: 7, title: "Review", icon: "FileText" },
  ];

  if (fetching) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* ---- STEPS BAR ---- */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center bg-white rounded-xl shadow-lg p-4 gap-4">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center flex-shrink-0">
                <div
                  className={`relative flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all ${
                    currentStep >= s.id
                      ? "bg-gradient-to-r from-indigo-600 to-blue-600 border-indigo-600 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  <span className="text-xl">{s.icon}</span>
                </div>
                <div className="ml-3 min-w-0">
                  <p className={`text-sm font-medium ${currentStep >= s.id ? "text-indigo-700" : "text-gray-500"}`}>Step {s.id}</p>
                  <p className={`text-xs truncate ${currentStep >= s.id ? "text-indigo-600" : "text-gray-400"}`}>{s.title}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full ${currentStep > s.id ? "bg-indigo-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-300 text-green-800 rounded-lg flex items-center">
              <span className="mr-2">Success</span> {success}
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg flex items-center">
              <span className="mr-2">Error</span> {error}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[currentStep]}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue }) => (
              <Form>
                {/* ───── STEP 1 ───── */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* CLUSTER */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cluster *</label>
                        <select
                          name="cluster_number"
                          value={values.cluster_number}
                          onChange={(e) => {
                            const v = e.target.value;
                            setFieldValue("cluster_number", v);
                            setSelectedCluster(v);
                            // auto-fill ward / district / taluka / municipal
                            const cl = clusters.find((c) => c.cluster_number === v);
                            if (cl) {
                              setFieldValue("district", cl.district || "");
                              setFieldValue("taluka", cl.taluka || "");
                              setFieldValue("ward", cl.ward || "");
                              setFieldValue("municipal_corporation", cl.municipal_corporation || "BMC");
                            }
                            // fetch slums for this cluster
                            fetch(`${API_BASE_URL}/api/slums/all?cluster=${v}`, {
                              headers: { Authorization: `Bearer ${getAuthToken()}` },
                            })
                              .then((r) => r.json())
                              .then((s) => setSlums(s || []))
                              .catch(() => setSlums([]));
                          }}
                          className="w-full border rounded-md px-3 py-2"
                        >
                          <option value="">Select Cluster</option>
                          {clusters.map((c) => (
                            <option key={c.cluster_number} value={c.cluster_number}>
                              {c.cluster_number} - {c.cluster_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* SLUM */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
                        <select
                          name="slum_id"
                          value={values.slum_id}
                          onChange={(e) => {
                            const id = e.target.value;
                            setFieldValue("slum_id", id);
                            const s = slums.find((x) => x.slum_id === id);
                            if (s) {
                              setFieldValue("slum_name", s.slum_name || "");
                              setFieldValue("name_of_slum_area", s.slum_address || "");
                            }
                          }}
                          disabled={!values.cluster_number}
                          className="w-full border rounded-md px-3 py-2"
                        >
                          <option value="">
                            {values.cluster_number ? "Select Slum" : "Select Cluster first"}
                          </option>
                          {slums
                            .filter((s) => s.cluster_number === values.cluster_number)
                            .map((s) => (
                              <option key={s.slum_id} value={s.slum_id}>
                                {s.slum_id}
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* SLUM NAME (readonly) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name</label>
                        <Field
                          type="text"
                          name="slum_name"
                          readOnly
                          className="w-full border rounded-md px-3 py-2 bg-gray-100"
                        />
                      </div>

                      {/* HUT ID & NAME */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hut ID *</label>
                        <Field name="hut_id" className="w-full border rounded-md px-3 py-2" />
                        <ErrorMessage name="hut_id" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hut Name *</label>
                        <Field name="hut_name" className="w-full border rounded-md px-3 py-2" />
                        <ErrorMessage name="hut_name" component="div" className="text-red-500 text-sm" />
                      </div>

                      {/* OTHER BASIC FIELDS (same as Add) */}
                      {[
                        { name: "municipal_corporation", label: "Municipal Corporation", readOnly: true },
                        { name: "ward", label: "Ward", readOnly: true },
                        { name: "district", label: "District", readOnly: true },
                        { name: "taluka", label: "Taluka", readOnly: true },
                        { name: "village", label: "Village" },
                        { name: "slum_use", label: "Slum Use", type: "select", options: ["Residential", "Commercial", "Combine", "Social", "Devotional", "Educational"] },
                        { name: "slum_floor", label: "Floor", type: "select", options: ["G", "G+1", "G+2", "G+3", "G+4", "G+5"] },
                        { name: "ownership_of_slum_land", label: "Land Ownership", type: "select", options: ["State Government", "Central Government", "Municipal Corporation", "Mhada", "SRA", "Private"] },
                        { name: "survey_status", label: "Survey Status", type: "select", options: ["Pending", "Hut Appose", "Hut Denied", "Completed"] },
                      ].map((f) => (
                        <div key={f.name}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{f.label} *</label>
                          {f.type === "select" ? (
                            <Field as="select" name={f.name} className="w-full border rounded-md px-3 py-2">
                              <option value="">Select</option>
                              {f.options.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </Field>
                          ) : (
                            <Field
                              type="text"
                              name={f.name}
                              readOnly={f.readOnly}
                              className={`w-full border rounded-md px-3 py-2 ${f.readOnly ? "bg-gray-100" : ""}`}
                            />
                          )}
                        </div>
                      ))}

                      {/* CHECKBOXES */}
                      <div className="col-span-1 md:col-span-2 flex gap-6">
                        <label className="flex items-center">
                          <Field type="checkbox" name="plan_submitted" className="mr-2" />
                          Plan Submitted?
                        </label>
                        <label className="flex items-center">
                          <Field type="checkbox" name="society_registered" className="mr-2" />
                          Society Registered?
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ───── STEP 2 ───── */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {["first_name", "middle_name", "last_name"].map((n) => (
                        <div key={n}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {n === "first_name" ? "First Name" : n === "middle_name" ? "Middle Name" : "Last Name"} *
                          </label>
                          <Field name={n} className="w-full border rounded-md px-3 py-2" />
                          <ErrorMessage name={n} component="div" className="text-red-500 text-sm" />
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                        <Field as="select" name="gender" className="w-full border rounded-md px-3 py-2">
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number *</label>
                        <Field name="aadhaar_number" maxLength="12" className="w-full border rounded-md px-3 py-2" />
                        <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile *</label>
                        <Field name="aadhaar_mobile_number" maxLength="10" className="w-full border rounded-md px-3 py-2" />
                        <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
                        <Field name="spouse_name" className="w-full border rounded-md px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <Field type="email" name="user_email" className="w-full border rounded-md px-3 py-2" />
                        <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>
                  </div>
                )}

                {/* ───── STEP 3 ───── */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Address & Contact</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Address</label>
                        <Field as="textarea" name="aadhaar_address" rows={3} className="w-full border rounded-md px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
                        <Field as="textarea" name="current_address" rows={3} className="w-full border rounded-md px-3 py-2" />
                        <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm" />
                      </div>
                      {["aadhaar_pincode", "current_pincode", "current_mobile_number", "voter_card_type", "voter_card_number"].map((n) => (
                        <div key={n}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {n.includes("pincode") ? (n === "aadhaar_pincode" ? "Aadhaar Pincode" : "Current Pincode") : n === "current_mobile_number" ? "Current Mobile *" : n === "voter_card_type" ? "Voter Card Type" : "Voter Card Number"}
                          </label>
                          {n === "voter_card_type" ? (
                            <Field as="select" name={n} className="w-full border rounded-md px-3 py-2">
                              <option value="">Select</option>
                              <option value="EPIC 10 Digit">EPIC 10 Digit</option>
                              <option value="EPIC 14 Digit">EPIC 14 Digit</option>
                            </Field>
                          ) : (
                            <Field
                              name={n}
                              maxLength={n.includes("pincode") ? 6 : n === "current_mobile_number" ? 10 : 10}
                              className="w-full border rounded-md px-3 py-2"
                            />
                          )}
                          <ErrorMessage name={n} component="div" className="text-red-500 text-sm" />
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="inline w-4 h-4 mr-1" /> Latitude
                        </label>
                        <Field name="biometric_lat" placeholder="19.0760" className="w-full border rounded-md px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="inline w-4 h-4 mr-1" /> Longitude
                        </label>
                        <Field name="biometric_long" placeholder="72.8777" className="w-full border rounded-md px-3 py-2" />
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <button
                        type="button"
                        onClick={() => fetchCurrentLocation(setFieldValue)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        <Crosshair size={18} /> Get Current Location
                      </button>
                    </div>
                  </div>
                )}

                {/* ───── STEP 4 ───── */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank & Slum Details</h3>

                    <div className="grid md:grid-cols-3 gap-6">
                      {["bank_name", "account_number", "ifsc_code"].map((n) => (
                        <div key={n}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {n === "bank_name" ? "Bank Name" : n === "account_number" ? "Account Number" : "IFSC Code"} *
                          </label>
                          <Field name={n} className="w-full border rounded-md px-3 py-2" />
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Length (m) *</label>
                        <Field
                          type="number"
                          step="0.1"
                          name="length"
                          onChange={(e) => {
                            setFieldValue("length", e.target.value);
                            const l = parseFloat(e.target.value) || 0;
                            const w = parseFloat(values.width) || 0;
                            if (l && w) setFieldValue("area_sq_m", (l * w).toFixed(2));
                          }}
                          className="w-full border rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Width (m) *</label>
                        <Field
                          type="number"
                          step="0.1"
                          name="width"
                          onChange={(e) => {
                            setFieldValue("width", e.target.value);
                            const w = parseFloat(e.target.value) || 0;
                            const l = parseFloat(values.length) || 0;
                            if (l && w) setFieldValue("area_sq_m", (l * w).toFixed(2));
                          }}
                          className="w-full border rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
                        <Field name="area_sq_m" readOnly className="w-full border rounded-md px-3 py-2 bg-gray-100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
                        <Field
                          type="date"
                          name="residency_since"
                          className="w-full border rounded-md px-3 py-2"
                        />
                        <ErrorMessage name="residency_since" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>
                  </div>
                )}

                {/* ───── STEP 5 ───── */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (max 6)</h3>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of members *</label>
                      <Field
                        type="number"
                        name="num_family_members"
                        min={1}
                        max={6}
                        value={displayedMembers}
                        onChange={(e) => {
                          const v = parseInt(e.target.value);
                          if (v >= 1 && v <= 6) {
                            setDisplayedMembers(v);
                            setFieldValue("num_family_members", v);
                          }
                        }}
                        className="w-24 border rounded-md px-3 py-2"
                      />
                    </div>

                    {Array.from({ length: displayedMembers }, (_, i) => i + 1).map((num) => (
                      <div key={num} className="p-4 border rounded-lg bg-gray-50">
                        <h4 className="font-semibold mb-3">Member {num}</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                            <Field name={`family_member${num}_name`} className="w-full border rounded-md px-2 py-1 text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Age *</label>
                            <Field type="number" name={`family_member${num}_age`} className="w-full border rounded-md px-2 py-1 text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Relation *</label>
                            <Field as="select" name={`family_member${num}_relation`} className="w-full border rounded-md px-2 py-1 text-sm">
                              <option value="">Select</option>
                              {["Wife","Husband","Son","Daughter","Mother","Father","Brother","Sister","Other"].map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </Field>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Gender *</label>
                            <Field as="select" name={`family_member${num}_gender`} className="w-full border rounded-md px-2 py-1 text-sm">
                              <option value="">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </Field>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Aadhaar</label>
                            <Field name={`family_member${num}_aadhaar`} maxLength="12" className="w-full border rounded-md px-2 py-1 text-sm" />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-3 mt-4">
                      {displayedMembers < 6 && (
                        <button type="button" onClick={addMember} className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">
                          <Plus size={20} />
                        </button>
                      )}
                      {displayedMembers > 1 && (
                        <button type="button" onClick={removeMember} className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center">
                          <Minus size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* ───── STEP 6 (Documents) ───── */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Documents & Media</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { name: "photo_self", label: "Self Photo", accept: "image/*", icon: "Photo", db: "photo_self" },
                        { name: "photo_family", label: "Family Photo", accept: "image/*", icon: "Family", db: "photo_family" },
                        { name: "doc_front_view", label: "Front View", accept: "image/*", icon: "Front", db: "doc_front_view" },
                        { name: "doc_side_view", label: "Side View", accept: "image/*", icon: "Side", db: "doc_side_view" },
                        { name: "adivashihutimage", label: "Hut Image", accept: "image/*,.pdf", icon: "Home", db: "adivashihutimage" },
                        ...(new Date(values.residency_since) <= new Date("2000-01-01")
                          ? [
                              { name: "doc_before_2000", label: "Docs ≤ 2000", accept: "image/*,.pdf", icon: "File", db: "doc_before_2000" },
                              { name: "submitted_docs_before_2000", label: "Submitted ≤ 2000", accept: "image/*,.pdf", icon: "Check", db: "submitted_docs_before_2000" },
                            ]
                          : []),
                        ...(new Date(values.residency_since) > new Date("2000-01-01")
                          ? [{ name: "after_2000_proof_submitted", label: "Proof > 2000", accept: "image/*,.pdf", icon: "Check", db: "after_2000_proof_submitted" }]
                          : []),
                        { name: "possession_doc_info", label: "Possession Doc", accept: "image/*,.pdf", icon: "Home", db: "possession_doc_info" },
                        { name: "Seldeclaration_letter", label: "Self Declaration", accept: "image/*,.pdf", icon: "Write", db: "Seldeclaration_letter" },
                        { name: "Ration_card_info", label: "Ration Card", accept: "image/*,.pdf", icon: "Card", db: "Ration_card_info" },
                        { name: "sale_agreement", label: "Sale Agreement (multi)", accept: ".pdf,.doc,.docx,image/*", icon: "Agreement", db: "sale_agreement", multiple: true },
                        { name: "biometric", label: "Biometric", accept: "image/*", icon: "Fingerprint", db: "biometric" },
                        { name: "video_self_declaration", label: "Self Declaration Video", accept: "video/*", icon: "Video", db: "video_self_declaration" },
                        { name: "video_inside", label: "Inside Video", accept: "video/*", icon: "Camera", db: "video_inside" },
                      ].map(({ name, label, accept, icon, db, multiple }) => (
                        <div key={name} className="border rounded-lg p-4 bg-white shadow-sm">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">{icon}</span>
                            <h4 className="font-semibold">{label}</h4>
                          </div>

                          {/* Existing files */}
                          {existingFiles[db] &&
                            existingFiles[db].map((url, i) => renderFile(url, `${label} #${i + 1}`, i))}

                          {/* New file input */}
                          <input
                            type="file"
                            name={name}
                            accept={accept}
                            multiple={multiple}
                            onChange={(e) => handleFileChange(e, setFieldValue)}
                            className="w-full text-sm file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:bg-indigo-50 file:text-indigo-700"
                          />

                          {/* New files preview */}
                          {files[name] && Array.isArray(files[name]) && files[name].map((f, i) => (
                            <div key={i} className="flex items-center justify-between p-1 bg-blue-50 rounded mt-1 text-xs">
                              <span className="truncate">{f.name}</span>
                              <button type="button" onClick={() => removeNewFile(name, i)} className="text-red-600">
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                          {files[name] && !Array.isArray(files[name]) && (
                            <div className="flex items-center justify-between p-1 bg-blue-50 rounded mt-1 text-xs">
                              <span className="truncate">{files[name].name}</span>
                              <button type="button" onClick={() => setFiles((p) => ({ ...p, [name]: null }))} className="text-red-600">
                                <X size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ───── STEP 7 (Review) ───── */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h3>
                    <p className="text-gray-600">Scroll through all steps to verify data. Click <strong>Update</strong> when ready.</p>
                  </div>
                )}

                {/* ───── NAVIGATION ---- */}
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      currentStep === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <ChevronLeft size={20} /> Previous
                  </button>

                  {currentStep < 7 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                    >
                      Next <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {loading ? "Updating..." : <><Save size={20} /> Update Application</>}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditApplicationForm;