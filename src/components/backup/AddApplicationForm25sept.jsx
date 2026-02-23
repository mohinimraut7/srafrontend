
// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload } from 'lucide-react'

// const API_BASE_URL = "http://13.203.251.59:4200"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AddApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     // Personal Information
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
//     current_mobile_number: '',
//     user_email: '',
//     spouse_name: '',
//     residency_since: '',
    
//     // Address Information
//     current_address: '',
//     current_pincode: '',
//     aadhaar_address: '',
//     aadhaar_pincode: '',
    
//     // Location Details
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: 'pending',
//     person_providing_info: '',
    
//     // Property Measurements
//     length: '',
//     width: '',
//     area_sq_m: '',
//     special_feature: '',
//     observation: '',
    
//     // Voter Information
//     voter_card_type: '',
//     voter_card_number: '',
//     assembly_constituency: '',
//     assembly_number: '',
//     voter_year: '',
//     part_number: '',
//     serial_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_aadhaar: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member2_name: '',
//     family_member2_aadhaar: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member3_name: '',
//     family_member3_aadhaar: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member4_name: '',
//     family_member4_aadhaar: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member5_name: '',
//     family_member5_aadhaar: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member6_name: '',
//     family_member6_aadhaar: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
    
//     // Document Information
//     doc_before_2000: '',
//     submitted_docs_before_2000: '',
//     description_doc_before_2000: '',
//     after_2000_proof_submitted: false,
//     possession_doc_info: '',
//     document_type: '',
    
//     // Additional Fields
//     plan_submitted: false,
//     society_registered: false,
//     east_slum_no: '',
//     west_slum_no: '',
//     north_slum_no: '',
//     south_slum_no: '',
//     slum_number: '',
//     block_alphabet: '',
//     government_doc_info: '',
//     self_declaration_letter: false,
//     ip_address: '',
//     adivashi_hut: '',
//     name_of_biometric_person: ''
//   })
  
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)

//   const steps = [
//     { id: 1, title: 'Personal Details', icon: '👤' },
//     { id: 2, title: 'Address & Location', icon: '📍' },
//     { id: 3, title: 'Property Details', icon: '🏠' },
//     { id: 4, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 5, title: 'Documents', icon: '📄' },
//     { id: 6, title: 'Review & Submit', icon: '✅' }
//   ]

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }))
//   }

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
//           formDataToSend.append(key, formData[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/sra-form-logs`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully!")
//       setTimeout(() => {
//         onSuccess()
//       }, 2000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <input
//                   type="text"
//                   name="middle_name"
//                   value={formData.middle_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number *</label>
//                 <input
//                   type="text"
//                   name="aadhaar_number"
//                   value={formData.aadhaar_number}
//                   onChange={handleInputChange}
//                   maxLength="12"
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
//                 <input
//                   type="tel"
//                   name="current_mobile_number"
//                   value={formData.current_mobile_number}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   value={formData.aadhaar_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="user_email"
//                   value={formData.user_email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <input
//                   type="text"
//                   name="spouse_name"
//                   value={formData.spouse_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since</label>
//                 <input
//                   type="text"
//                   name="residency_since"
//                   value={formData.residency_since}
//                   onChange={handleInputChange}
//                   placeholder="YYYY"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Person Providing Info</label>
//                 <input
//                   type="text"
//                   name="person_providing_info"
//                   value={formData.person_providing_info}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Name of Biometric Person</label>
//                 <input
//                   type="text"
//                   name="name_of_biometric_person"
//                   value={formData.name_of_biometric_person}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address & Location Information</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
//                 <textarea
//                   name="current_address"
//                   value={formData.current_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Address</label>
//                 <textarea
//                   name="aadhaar_address"
//                   value={formData.aadhaar_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode *</label>
//                 <input
//                   type="text"
//                   name="current_pincode"
//                   value={formData.current_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Pincode</label>
//                 <input
//                   type="text"
//                   name="aadhaar_pincode"
//                   value={formData.aadhaar_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Location Details</h4>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <input
//                   type="text"
//                   name="slum_id"
//                   value={formData.slum_id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Name of Slum Area *</label>
//                 <input
//                   type="text"
//                   name="name_of_slum_area"
//                   value={formData.name_of_slum_area}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation</label>
//                 <input
//                   type="text"
//                   name="municipal_corporation"
//                   value={formData.municipal_corporation}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
//                 <input
//                   type="text"
//                   name="ward"
//                   value={formData.ward}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
//                 <input
//                   type="text"
//                   name="district"
//                   value={formData.district}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
//                 <input
//                   type="text"
//                   name="taluka"
//                   value={formData.taluka}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <input
//                   type="text"
//                   name="village"
//                   value={formData.village}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <input
//                   type="text"
//                   name="cluster_number"
//                   value={formData.cluster_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <select
//                   name="ownership_of_slum_land"
//                   value={formData.ownership_of_slum_land}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="length"
//                   value={formData.length}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="width"
//                   value={formData.width}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq.m)</label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="area_sq_m"
//                   value={formData.area_sq_m}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
//                 <input
//                   type="text"
//                   name="slum_floor"
//                   value={formData.slum_floor}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
//                 <input
//                   type="text"
//                   name="slum_use"
//                   value={formData.slum_use}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Number</label>
//                 <input
//                   type="text"
//                   name="slum_number"
//                   value={formData.slum_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Block Alphabet</label>
//                 <input
//                   type="text"
//                   name="block_alphabet"
//                   value={formData.block_alphabet}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
//                 <select
//                   name="survey_status"
//                   value={formData.survey_status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="ready for survey">Ready for Survey</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Special Feature</label>
//                 <textarea
//                   name="special_feature"
//                   value={formData.special_feature}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Observation</label>
//                 <textarea
//                   name="observation"
//                   value={formData.observation}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Bank Details</h4>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                 <input
//                   type="text"
//                   name="bank_name"
//                   value={formData.bank_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                 <input
//                   type="text"
//                   name="account_number"
//                   value={formData.account_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                 <input
//                   type="text"
//                   name="ifsc_code"
//                   value={formData.ifsc_code}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Voter Information</h4>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <input
//                   type="text"
//                   name="voter_card_type"
//                   value={formData.voter_card_type}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number</label>
//                 <input
//                   type="text"
//                   name="voter_card_number"
//                   value={formData.voter_card_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Assembly Constituency</label>
//                 <input
//                   type="text"
//                   name="assembly_constituency"
//                   value={formData.assembly_constituency}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Assembly Number</label>
//                 <input
//                   type="text"
//                   name="assembly_number"
//                   value={formData.assembly_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Year</label>
//                 <input
//                   type="text"
//                   name="voter_year"
//                   value={formData.voter_year}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Part Number</label>
//                 <input
//                   type="text"
//                   name="part_number"
//                   value={formData.part_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
//                 <input
//                   type="text"
//                   name="serial_number"
//                   value={formData.serial_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members Information</h3>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members</label>
//               <input
//                 type="number"
//                 name="num_family_members"
//                 value={formData.num_family_members}
//                 onChange={handleInputChange}
//                 min="1"
//                 max="10"
//                 className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800">Family Member {memberNum}</h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       value={formData[`family_member${memberNum}_name`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       value={formData[`family_member${memberNum}_aadhaar`]}
//                       onChange={handleInputChange}
//                       maxLength="12"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
//                     <input
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       value={formData[`family_member${memberNum}_age`]}
//                       onChange={handleInputChange}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       value={formData[`family_member${memberNum}_relation`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                     <select
//                       name={`family_member${memberNum}_gender`}
//                       value={formData[`family_member${memberNum}_gender`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Documents & Media Upload</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_self"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_self && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_self.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Family Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_family"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_family && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_family.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Biometric Document</h4>
//                 <input
//                   type="file"
//                   name="biometric"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.biometric && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.biometric.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Front Photo</h4>
//                 <input
//                   type="file"
//                   name="doc_front_view"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_front_view && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_front_view.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Side Photo</h4>
//                 <input
//                   type="file"
//                   name="doc_side_view"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_side_view && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_side_view.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Inside Video</h4>
//                 <input
//                   type="file"
//                   name="video_inside"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.video_inside && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.video_inside.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Declaration Video</h4>
//                 <input
//                   type="file"
//                   name="video_self_declaration"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.video_self_declaration && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.video_self_declaration.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Adivashi Hut Image</h4>
//                 <input
//                   type="file"
//                   name="adivashihutimage"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.adivashihutimage && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.adivashihutimage.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Document Before 2000</h4>
//                 <input
//                   type="file"
//                   name="doc_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Ration Card Info</h4>
//                 <input
//                   type="file"
//                   name="Ration_card_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Ration_card_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Ration_card_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Voter Card Info</h4>
//                 <input
//                   type="file"
//                   name="Voter_card_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Voter_card_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Voter_card_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Other Documents</h4>
//                 <input
//                   type="file"
//                   name="Other_doc_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Other_doc_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Other_doc_info.name}</p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h4 className="text-xl font-bold text-gray-900">Document Information</h4>
              
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description of Documents Before 2000</label>
//                   <textarea
//                     name="description_doc_before_2000"
//                     value={formData.description_doc_before_2000}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Possession Document Info</label>
//                   <textarea
//                     name="possession_doc_info"
//                     value={formData.possession_doc_info}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Government Document Info</label>
//                   <textarea
//                     name="government_doc_info"
//                     value={formData.government_doc_info}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
//                   <input
//                     type="text"
//                     name="document_type"
//                     value={formData.document_type}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="after_2000_proof_submitted"
//                     checked={formData.after_2000_proof_submitted}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">After 2000 Proof Submitted</label>
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="self_declaration_letter"
//                     checked={formData.self_declaration_letter}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Self Declaration Letter</label>
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="plan_submitted"
//                     checked={formData.plan_submitted}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Plan Submitted</label>
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="society_registered"
//                     checked={formData.society_registered}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Society Registered</label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit Application</h3>
            
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <h4 className="text-lg font-semibold text-blue-900 mb-4">📋 Application Summary</h4>
              
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Personal Information</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Name:</strong> {formData.first_name} {formData.middle_name} {formData.last_name}</p>
//                     <p><strong>Gender:</strong> {formData.gender}</p>
//                     <p><strong>Aadhaar:</strong> {formData.aadhaar_number}</p>
//                     <p><strong>Mobile:</strong> {formData.current_mobile_number}</p>
//                     <p><strong>Email:</strong> {formData.user_email}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Location Details</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Slum ID:</strong> {formData.slum_id}</p>
//                     <p><strong>Area:</strong> {formData.name_of_slum_area}</p>
//                     <p><strong>Ward:</strong> {formData.ward}</p>
//                     <p><strong>District:</strong> {formData.district}</p>
//                     <p><strong>Cluster:</strong> {formData.cluster_number}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Property Details</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Length:</strong> {formData.length} m</p>
//                     <p><strong>Width:</strong> {formData.width} m</p>
//                     <p><strong>Area:</strong> {formData.area_sq_m} sq.m</p>
//                     <p><strong>Floor:</strong> {formData.slum_floor}</p>
//                     <p><strong>Use:</strong> {formData.slum_use}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Family & Documents</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Family Members:</strong> {formData.num_family_members}</p>
//                     <p><strong>Documents Uploaded:</strong> {Object.keys(files).length}</p>
//                     <p><strong>Survey Status:</strong> {formData.survey_status}</p>
//                   </div>
//                 </div>
//               </div>

//               {Object.keys(files).length > 0 && (
//                 <div className="mt-6">
//                   <h5 className="font-medium text-gray-900 mb-2">📎 Uploaded Files ({Object.keys(files).length})</h5>
//                   <div className="grid md:grid-cols-3 gap-2">
//                     {Object.entries(files).map(([key, file]) => (
//                       <div key={key} className="text-sm text-gray-600 bg-white p-2 rounded border">
//                         <strong>{key.replace(/_/g, ' ')}:</strong> {file.name}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//               <p className="text-yellow-800 text-sm">
//                 ⚠️ Please review all information carefully before submitting. Once submitted, you can edit the application later if needed.
//               </p>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex items-center">
//               <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
//                 currentStep >= step.id 
//                   ? 'bg-orange-500 border-orange-500 text-white' 
//                   : 'bg-white border-gray-300 text-gray-500'
//               }`}>
//                 <span className="text-lg">{step.icon}</span>
//               </div>
//               <div className="ml-3">
//                 <p className={`text-sm font-medium ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   Step {step.id}
//                 </p>
//                 <p className={`text-xs ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   {step.title}
//                 </p>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`flex-1 h-0.5 mx-4 ${
//                   currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
//                 }`} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//             ✅ {success}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//             ❌ {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {renderStepContent()}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
//                 currentStep === 1
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               <ChevronLeft size={20} />
//               Previous
//             </button>

//             <div className="text-sm text-gray-600">
//               Step {currentStep} of {steps.length}
//             </div>

//             {currentStep < steps.length ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
//               >
//                 Next
//                 <ChevronRight size={20} />
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium ${
//                   loading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-green-600 hover:bg-green-700'
//                 } text-white`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={20} />
//                     Submit Application
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddApplicationForm

// --------------------------------------------

// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload } from 'lucide-react'

// const API_BASE_URL = "http://13.203.251.59:4200"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AddApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     // Personal Information
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
//     current_mobile_number: '',
//     user_email: '',
//     spouse_name: '',
//     residency_since: '',
    
//     // Address Information
//     current_address: '',
//     current_pincode: '',
//     aadhaar_address: '',
//     aadhaar_pincode: '',
    
//     // Location Details
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: 'pending',
//     person_providing_info: '',
    
//     // Property Measurements
//     length: '',
//     width: '',
//     area_sq_m: '',
//     special_feature: '',
//     observation: '',
    
//     // Voter Information
//     voter_card_type: '',
//     voter_card_number: '',
//     assembly_constituency: '',
//     assembly_number: '',
//     voter_year: '',
//     part_number: '',
//     serial_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_aadhaar: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member2_name: '',
//     family_member2_aadhaar: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member3_name: '',
//     family_member3_aadhaar: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member4_name: '',
//     family_member4_aadhaar: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member5_name: '',
//     family_member5_aadhaar: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member6_name: '',
//     family_member6_aadhaar: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
    
//     // Document Information
//     doc_before_2000: '',
//     submitted_docs_before_2000: '',
//     description_doc_before_2000: '',
//     after_2000_proof_submitted: false,
//     possession_doc_info: '',
//     document_type: '',
    
//     // Additional Fields
//     plan_submitted: false,
//     society_registered: false,
//     east_slum_no: '',
//     west_slum_no: '',
//     north_slum_no: '',
//     south_slum_no: '',
//     slum_number: '',
//     block_alphabet: '',
//     government_doc_info: '',
//     self_declaration_letter: false,
//     ip_address: '',
//     adivashi_hut: '',
//     name_of_biometric_person: ''
//   })
  
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)

//   const steps = [
//     { id: 1, title: 'Personal Details', icon: '👤' },
//     { id: 2, title: 'Address & Location', icon: '📍' },
//     { id: 3, title: 'Property Details', icon: '🏠' },
//     { id: 4, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 5, title: 'Documents', icon: '📄' },
//     { id: 6, title: 'Review & Submit', icon: '✅' }
//   ]

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }))
//   }

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
//           formDataToSend.append(key, formData[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       // https://sra.saavi.co.in/api/sra-logs/submit-log

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully!")
//       setTimeout(() => {
//         onSuccess()
//       }, 2000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <input
//                   type="text"
//                   name="middle_name"
//                   value={formData.middle_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number *</label>
//                 <input
//                   type="text"
//                   name="aadhaar_number"
//                   value={formData.aadhaar_number}
//                   onChange={handleInputChange}
//                   maxLength="12"
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
//                 <input
//                   type="tel"
//                   name="current_mobile_number"
//                   value={formData.current_mobile_number}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   value={formData.aadhaar_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="user_email"
//                   value={formData.user_email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <input
//                   type="text"
//                   name="spouse_name"
//                   value={formData.spouse_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since</label>
//                 <input
//                   type="text"
//                   name="residency_since"
//                   value={formData.residency_since}
//                   onChange={handleInputChange}
//                   placeholder="YYYY"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Person Providing Info</label>
//                 <input
//                   type="text"
//                   name="person_providing_info"
//                   value={formData.person_providing_info}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Name of Biometric Person</label>
//                 <input
//                   type="text"
//                   name="name_of_biometric_person"
//                   value={formData.name_of_biometric_person}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address & Location Information</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
//                 <textarea
//                   name="current_address"
//                   value={formData.current_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Address</label>
//                 <textarea
//                   name="aadhaar_address"
//                   value={formData.aadhaar_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode *</label>
//                 <input
//                   type="text"
//                   name="current_pincode"
//                   value={formData.current_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Pincode</label>
//                 <input
//                   type="text"
//                   name="aadhaar_pincode"
//                   value={formData.aadhaar_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Location Details</h4>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <input
//                   type="text"
//                   name="slum_id"
//                   value={formData.slum_id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Name of Slum Area *</label>
//                 <input
//                   type="text"
//                   name="name_of_slum_area"
//                   value={formData.name_of_slum_area}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation</label>
//                 <input
//                   type="text"
//                   name="municipal_corporation"
//                   value={formData.municipal_corporation}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
//                 <input
//                   type="text"
//                   name="ward"
//                   value={formData.ward}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
//                 <input
//                   type="text"
//                   name="district"
//                   value={formData.district}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
//                 <input
//                   type="text"
//                   name="taluka"
//                   value={formData.taluka}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <input
//                   type="text"
//                   name="village"
//                   value={formData.village}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <input
//                   type="text"
//                   name="cluster_number"
//                   value={formData.cluster_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <select
//                   name="ownership_of_slum_land"
//                   value={formData.ownership_of_slum_land}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="length"
//                   value={formData.length}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="width"
//                   value={formData.width}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq.m)</label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="area_sq_m"
//                   value={formData.area_sq_m}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
//                 <input
//                   type="text"
//                   name="slum_floor"
//                   value={formData.slum_floor}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
//                 <input
//                   type="text"
//                   name="slum_use"
//                   value={formData.slum_use}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Number</label>
//                 <input
//                   type="text"
//                   name="slum_number"
//                   value={formData.slum_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Block Alphabet</label>
//                 <input
//                   type="text"
//                   name="block_alphabet"
//                   value={formData.block_alphabet}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
//                 <select
//                   name="survey_status"
//                   value={formData.survey_status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="ready for survey">Ready for Survey</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Special Feature</label>
//                 <textarea
//                   name="special_feature"
//                   value={formData.special_feature}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Observation</label>
//                 <textarea
//                   name="observation"
//                   value={formData.observation}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Bank Details</h4>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                 <input
//                   type="text"
//                   name="bank_name"
//                   value={formData.bank_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                 <input
//                   type="text"
//                   name="account_number"
//                   value={formData.account_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                 <input
//                   type="text"
//                   name="ifsc_code"
//                   value={formData.ifsc_code}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Voter Information</h4>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <input
//                   type="text"
//                   name="voter_card_type"
//                   value={formData.voter_card_type}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number</label>
//                 <input
//                   type="text"
//                   name="voter_card_number"
//                   value={formData.voter_card_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Assembly Constituency</label>
//                 <input
//                   type="text"
//                   name="assembly_constituency"
//                   value={formData.assembly_constituency}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Assembly Number</label>
//                 <input
//                   type="text"
//                   name="assembly_number"
//                   value={formData.assembly_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Year</label>
//                 <input
//                   type="text"
//                   name="voter_year"
//                   value={formData.voter_year}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Part Number</label>
//                 <input
//                   type="text"
//                   name="part_number"
//                   value={formData.part_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
//                 <input
//                   type="text"
//                   name="serial_number"
//                   value={formData.serial_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members Information</h3>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members</label>
//               <input
//                 type="number"
//                 name="num_family_members"
//                 value={formData.num_family_members}
//                 onChange={handleInputChange}
//                 min="1"
//                 max="10"
//                 className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800">Family Member {memberNum}</h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       value={formData[`family_member${memberNum}_name`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       value={formData[`family_member${memberNum}_aadhaar`]}
//                       onChange={handleInputChange}
//                       maxLength="12"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
//                     <input
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       value={formData[`family_member${memberNum}_age`]}
//                       onChange={handleInputChange}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       value={formData[`family_member${memberNum}_relation`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                     <select
//                       name={`family_member${memberNum}_gender`}
//                       value={formData[`family_member${memberNum}_gender`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Documents & Media Upload</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_self"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_self && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_self.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Family Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_family"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_family && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_family.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Biometric Document</h4>
//                 <input
//                   type="file"
//                   name="biometric"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.biometric && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.biometric.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Front Photo</h4>
//                 <input
//                   type="file"
//                   name="doc_front_view"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_front_view && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_front_view.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Side Photo</h4>
//                 <input
//                   type="file"
//                   name="doc_side_view"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_side_view && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_side_view.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Inside Video</h4>
//                 <input
//                   type="file"
//                   name="video_inside"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.video_inside && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.video_inside.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Declaration Video</h4>
//                 <input
//                   type="file"
//                   name="video_self_declaration"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.video_self_declaration && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.video_self_declaration.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Adivashi Hut Image</h4>
//                 <input
//                   type="file"
//                   name="adivashihutimage"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.adivashihutimage && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.adivashihutimage.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Document Before 2000</h4>
//                 <input
//                   type="file"
//                   name="doc_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Ration Card Info</h4>
//                 <input
//                   type="file"
//                   name="Ration_card_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Ration_card_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Ration_card_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Voter Card Info</h4>
//                 <input
//                   type="file"
//                   name="Voter_card_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Voter_card_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Voter_card_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Other Documents</h4>
//                 <input
//                   type="file"
//                   name="Other_doc_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Other_doc_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Other_doc_info.name}</p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h4 className="text-xl font-bold text-gray-900">Document Information</h4>
              
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description of Documents Before 2000</label>
//                   <textarea
//                     name="description_doc_before_2000"
//                     value={formData.description_doc_before_2000}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Possession Document Info</label>
//                   <textarea
//                     name="possession_doc_info"
//                     value={formData.possession_doc_info}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Government Document Info</label>
//                   <textarea
//                     name="government_doc_info"
//                     value={formData.government_doc_info}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
//                   <input
//                     type="text"
//                     name="document_type"
//                     value={formData.document_type}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="after_2000_proof_submitted"
//                     checked={formData.after_2000_proof_submitted}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">After 2000 Proof Submitted</label>
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="self_declaration_letter"
//                     checked={formData.self_declaration_letter}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Self Declaration Letter</label>
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="plan_submitted"
//                     checked={formData.plan_submitted}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Plan Submitted</label>
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="society_registered"
//                     checked={formData.society_registered}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-700">Society Registered</label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit Application</h3>
            
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <h4 className="text-lg font-semibold text-blue-900 mb-4">📋 Application Summary</h4>
              
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Personal Information</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Name:</strong> {formData.first_name} {formData.middle_name} {formData.last_name}</p>
//                     <p><strong>Gender:</strong> {formData.gender}</p>
//                     <p><strong>Aadhaar:</strong> {formData.aadhaar_number}</p>
//                     <p><strong>Mobile:</strong> {formData.current_mobile_number}</p>
//                     <p><strong>Email:</strong> {formData.user_email}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Location Details</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Slum ID:</strong> {formData.slum_id}</p>
//                     <p><strong>Area:</strong> {formData.name_of_slum_area}</p>
//                     <p><strong>Ward:</strong> {formData.ward}</p>
//                     <p><strong>District:</strong> {formData.district}</p>
//                     <p><strong>Cluster:</strong> {formData.cluster_number}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Property Details</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Length:</strong> {formData.length} m</p>
//                     <p><strong>Width:</strong> {formData.width} m</p>
//                     <p><strong>Area:</strong> {formData.area_sq_m} sq.m</p>
//                     <p><strong>Floor:</strong> {formData.slum_floor}</p>
//                     <p><strong>Use:</strong> {formData.slum_use}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Family & Documents</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Family Members:</strong> {formData.num_family_members}</p>
//                     <p><strong>Documents Uploaded:</strong> {Object.keys(files).length}</p>
//                     <p><strong>Survey Status:</strong> {formData.survey_status}</p>
//                   </div>
//                 </div>
//               </div>

//               {Object.keys(files).length > 0 && (
//                 <div className="mt-6">
//                   <h5 className="font-medium text-gray-900 mb-2">📎 Uploaded Files ({Object.keys(files).length})</h5>
//                   <div className="grid md:grid-cols-3 gap-2">
//                     {Object.entries(files).map(([key, file]) => (
//                       <div key={key} className="text-sm text-gray-600 bg-white p-2 rounded border">
//                         <strong>{key.replace(/_/g, ' ')}:</strong> {file.name}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//               <p className="text-yellow-800 text-sm">
//                 ⚠️ Please review all information carefully before submitting. Once submitted, you can edit the application later if needed.
//               </p>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex items-center">
//               <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
//                 currentStep >= step.id 
//                   ? 'bg-orange-500 border-orange-500 text-white' 
//                   : 'bg-white border-gray-300 text-gray-500'
//               }`}>
//                 <span className="text-lg">{step.icon}</span>
//               </div>
//               <div className="ml-3">
//                 <p className={`text-sm font-medium ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   Step {step.id}
//                 </p>
//                 <p className={`text-xs ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   {step.title}
//                 </p>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`flex-1 h-0.5 mx-4 ${
//                   currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
//                 }`} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//             ✅ {success}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//             ❌ {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {renderStepContent()}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
//                 currentStep === 1
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               <ChevronLeft size={20} />
//               Previous
//             </button>

//             <div className="text-sm text-gray-600">
//               Step {currentStep} of {steps.length}
//             </div>

//             {currentStep < steps.length ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
//               >
//                 Next
//                 <ChevronRight size={20} />
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium ${
//                   loading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-green-600 hover:bg-green-700'
//                 } text-white`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={20} />
//                     Submit Application
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddApplicationForm  



// ==============================


// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload } from 'lucide-react'

// const API_BASE_URL = "http://13.203.251.59:4200"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AddApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: ''
//   })
  
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank Details', icon: '🏦' },
//     { id: 5, title: 'Slum Details', icon: '🏠' },
//     { id: 6, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 7, title: 'Images', icon: '📷' },
//     { id: 8, title: 'Metadata', icon: '📄' }
//   ]

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }))
//   }

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
//           formDataToSend.append(key, formData[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully!")
//       setTimeout(() => {
//         onSuccess()
//       }, 2000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <input
//                   type="text"
//                   name="cluster_number"
//                   value={formData.cluster_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
              

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
//                 <input
//                   type="text"
//                   name="name_of_slum_area"
//                   value={formData.name_of_slum_area}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation</label>
//                 <input
//                   type="text"
//                   name="municipal_corporation"
//                   value={formData.municipal_corporation}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
//                 <select
//                   name="ward"
//                   value={formData.ward}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
//                 <select
//                   name="district"
//                   value={formData.district}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
//                 <select
//                   name="taluka"
//                   value={formData.taluka}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <input
//                   type="text"
//                   name="village"
//                   value={formData.village}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

             

//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
//                 <input
//                   type="text"
//                   name="slum_use"
//                   value={formData.slum_use}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div> */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <input
//                   type="text"
//                   name="slum_id"
//                   value={formData.slum_id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Slum Use
//   </label>
//   <select
//     name="slum_use"
//     value={formData.slum_use}
//     onChange={handleInputChange}
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//   >
//     <option value="">Select Use</option>
//     <option value="Residential">Residential</option>
//     <option value="Commercial">Commercial</option>
//     <option value="Combine">Combine</option>
//     <option value="Social">Social</option>
//     <option value="Devotional">Devotional</option>
//     <option value="Educational">Educational</option>
//   </select>
// </div>


//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Floor</label>
//                 <input
//                   type="text"
//                   name="slum_floor"
//                   value={formData.slum_floor}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div> */}


//               <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Slum Floor
//   </label>
//   <select
//     name="slum_floor"
//     value={formData.slum_floor}
//     onChange={handleInputChange}
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//   >
//     <option value="">Select Floor</option>
//     <option value="G">G</option>
//     <option value="G+1">G+1</option>
//     <option value="G+2">G+2</option>
//     <option value="G+3">G+3</option>
//     <option value="G+4">G+4</option>
//     <option value="G+5">G+5</option>
//   </select>
// </div>


//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <input
//                   type="text"
//                   name="ownership_of_slum_land"
//                   value={formData.ownership_of_slum_land}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
                
//               </div> */}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <select
//                   name="ownership_of_slum_land"
//                   value={formData.ownership_of_slum_land || ""}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </select>
//               </div>

//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
//                 <input
//                   type="text"
//                   name="survey_status"
//                   value={formData.survey_status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div> */}

//               <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Survey Status
//   </label>
//   <select
//     name="survey_status"
//     value={formData.survey_status}
//     onChange={handleInputChange}
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//   >
//     <option value="">Select Status</option>
//     <option value="Pending">Pending</option>
//     <option value="Hut Appose">Hut Appose</option>
//     <option value="Hut Denied">Hut Denied</option>
//     <option value="Completed">Completed</option>
//   </select>
// </div>

//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="plan_submitted"
//                   checked={formData.plan_submitted}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="society_registered"
//                   checked={formData.society_registered}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <input
//                   type="text"
//                   name="middle_name"
//                   value={formData.middle_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//                 <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
//                 <input
//                   type="text"
//                   name="aadhaar_number"
//                   value={formData.aadhaar_number}
//                   onChange={handleInputChange}
//                   maxLength="12"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   value={formData.aadhaar_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <input
//                   type="text"
//                   name="spouse_name"
//                   value={formData.spouse_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <input
//                   type="email"
//                   name="user_email"
//                   value={formData.user_email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

            
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <textarea
//                   name="aadhaar_address"
//                   value={formData.aadhaar_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
//                 <textarea
//                   name="current_address"
//                   value={formData.current_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode</label>
//                 <input
//                   type="text"
//                   name="aadhaar_pincode"
//                   value={formData.aadhaar_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode</label>
//                 <input
//                   type="text"
//                   name="current_pincode"
//                   value={formData.current_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="current_mobile_number"
//                   value={formData.current_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <input
//                   type="text"
//                   name="voter_card_type"
//                   value={formData.voter_card_type}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div> */}

//               <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Voter Card Type
//   </label>
//   <select
//     name="voter_card_type"
//     value={formData.voter_card_type}
//     onChange={handleInputChange}
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//   >
//     <option value="">Select Voter Card Type</option>
//     <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//     <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//   </select>
// </div>


//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number</label>
//                 <input
//                   type="text"
//                   name="voter_card_number"
//                   value={formData.voter_card_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank Details</h3>
            
//             <div className="grid md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                 <input
//                   type="text"
//                   name="bank_name"
//                   value={formData.bank_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                 <input
//                   type="text"
//                   name="account_number"
//                   value={formData.account_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                 <input
//                   type="text"
//                   name="ifsc_code"
//                   value={formData.ifsc_code}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Slum Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="length"
//                   value={formData.length}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="width"
//                   value={formData.width}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="area_sq_m"
//                   value={formData.area_sq_m}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since</label>
//                 <input
//                   type="text"
//                   name="residency_since"
//                   value={formData.residency_since}
//                   onChange={handleInputChange}
//                   placeholder="1995"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Member (Max 6 member)</h3>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members</label>
//               <input
//                 type="number"
//                 name="num_family_members"
//                 value={formData.num_family_members}
//                 onChange={handleInputChange}
//                 min="1"
//                 max="6"
//                 className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800">Family Member {memberNum} {memberNum === 1 ? 'Name' : ''}</h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {memberNum === 1 ? 'Family Member1 Name' : `Family Member${memberNum} Name`}
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       value={formData[`family_member${memberNum}_name`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {memberNum === 1 ? 'Family Member1 Age' : `Family Member${memberNum} Age`}
//                     </label>
//                     <input
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       value={formData[`family_member${memberNum}_age`]}
//                       onChange={handleInputChange}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Relation
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       value={formData[`family_member${memberNum}_relation`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Gender
//                     </label>
//                     <select
//                       name={`family_member${memberNum}_gender`}
//                       value={formData[`family_member${memberNum}_gender`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Aadhar
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       value={formData[`family_member${memberNum}_aadhaar`]}
//                       onChange={handleInputChange}
//                       maxLength="12"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 7:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Images</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_self"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_self && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_self.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Family Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_family"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_family && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_family.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Front Photo</h4>
//                 <input
//                   type="file"
//                   name="front_photo_path"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.front_photo_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.front_photo_path.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Side Photo</h4>
//                 <input
//                   type="file"
//                   name="side_photo_path"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.side_photo_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.side_photo_path.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Document Before 2000</h4>
//                 <input
//                   type="file"
//                   name="doc_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Submitted Docs Before 2000</h4>
//                 <input
//                   type="file"
//                   name="submitted_docs_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.submitted_docs_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.submitted_docs_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">After 2000 Proof Submitted</h4>
//                 <input
//                   type="file"
//                   name="after_2000_proof_submitted"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.after_2000_proof_submitted && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.after_2000_proof_submitted.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Possesional Doc Info</h4>
//                 <input
//                   type="file"
//                   name="possession_doc_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.possession_doc_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.possession_doc_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Declaration Letter Image</h4>
//                 <input
//                   type="file"
//                   name="Seldeclaration_letter"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Seldeclaration_letter && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Seldeclaration_letter.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Ration Card Info (Image)</h4>
//                 <input
//                   type="file"
//                   name="Ration_card_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Ration_card_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Ration_card_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">document_upload</h4>
//                 <input
//                   type="file"
//                   name="document_upload"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.document_upload && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.document_upload.name}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between overflow-x-auto">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
//               <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
//                 currentStep >= step.id 
//                   ? 'bg-orange-500 border-orange-500 text-white' 
//                   : 'bg-white border-gray-300 text-gray-500'
//               }`}>
//                 <span className="text-lg">{step.icon}</span>
//               </div>
//               <div className="ml-3 min-w-0">
//                 <p className={`text-sm font-medium ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   Step {step.id}
//                 </p>
//                 <p className={`text-xs truncate ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   {step.title}
//                 </p>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`flex-1 h-0.5 mx-4 min-w-8 ${
//                   currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
//                 }`} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//             ✅ {success}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//             ❌ {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {renderStepContent()}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
//                 currentStep === 1
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               <ChevronLeft size={20} />
//               Previous
//             </button>

//             <div className="text-sm text-gray-600">
//               Step {currentStep} of {steps.length}
//             </div>

//             {currentStep < steps.length ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
//               >
//                 Next
//                 <ChevronRight size={20} />
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium ${
//                   loading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-green-600 hover:bg-green-700'
//                 } text-white`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={20} />
//                     Submit Application
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddApplicationForm
// ==============================================================
// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload } from 'lucide-react'

// const API_BASE_URL = "http://13.203.251.59:4200"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AddApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     after_2000_proof_submitted: false,
//     sale_agreement:false,
//     Other_doc_info:false,
//     timestamp: '',
//     created_date: ''
//   })
  
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     const newValue = type === 'checkbox' ? checked : value
    
//     setFormData(prev => {
//       const updated = {
//         ...prev,
//         [name]: newValue
//       }
      
//       // Auto-calculate area when length or width changes
//       if (name === 'length' || name === 'width') {
//         const length = name === 'length' ? parseFloat(value) || 0 : parseFloat(prev.length) || 0
//         const width = name === 'width' ? parseFloat(value) || 0 : parseFloat(prev.width) || 0
        
//         if (length > 0 && width > 0) {
//           updated.area_sq_m = (length * width).toFixed(2)
//         } else {
//           updated.area_sq_m = ''
//         }
//       }
      
//       return updated
//     })
//   }

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
//           formDataToSend.append(key, formData[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully!")
//       setTimeout(() => {
//         onSuccess()
//       }, 2000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <input
//                   type="text"
//                   name="cluster_number"
//                   value={formData.cluster_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
              

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
//                 <input
//                   type="text"
//                   name="name_of_slum_area"
//                   value={formData.name_of_slum_area}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation</label>
//                 <input
//                   type="text"
//                   name="municipal_corporation"
//                   value={formData.municipal_corporation}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
//                 <select
//                   name="ward"
//                   value={formData.ward}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
//                 <select
//                   name="district"
//                   value={formData.district}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
//                 <select
//                   name="taluka"
//                   value={formData.taluka}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <input
//                   type="text"
//                   name="village"
//                   value={formData.village}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <input
//                   type="text"
//                   name="slum_id"
//                   value={formData.slum_id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Slum Use
//                 </label>
//                 <select
//                   name="slum_use"
//                   value={formData.slum_use}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Slum Floor
//                 </label>
//                 <select
//                   name="slum_floor"
//                   value={formData.slum_floor}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <select
//                   name="ownership_of_slum_land"
//                   value={formData.ownership_of_slum_land || ""}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Survey Status
//                 </label>
//                 <select
//                   name="survey_status"
//                   value={formData.survey_status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>

//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="plan_submitted"
//                   checked={formData.plan_submitted}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="society_registered"
//                   checked={formData.society_registered}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <input
//                   type="text"
//                   name="middle_name"
//                   value={formData.middle_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//                 <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
//                 <input
//                   type="text"
//                   name="aadhaar_number"
//                   value={formData.aadhaar_number}
//                   onChange={handleInputChange}
//                   maxLength="12"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   value={formData.aadhaar_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <input
//                   type="text"
//                   name="spouse_name"
//                   value={formData.spouse_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <input
//                   type="email"
//                   name="user_email"
//                   value={formData.user_email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

            
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <textarea
//                   name="aadhaar_address"
//                   value={formData.aadhaar_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
//                 <textarea
//                   name="current_address"
//                   value={formData.current_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode</label>
//                 <input
//                   type="text"
//                   name="aadhaar_pincode"
//                   value={formData.aadhaar_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode</label>
//                 <input
//                   type="text"
//                   name="current_pincode"
//                   value={formData.current_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="current_mobile_number"
//                   value={formData.current_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Voter Card Type
//                 </label>
//                 <select
//                   name="voter_card_type"
//                   value={formData.voter_card_type}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number</label>
//                 <input
//                   type="text"
//                   name="voter_card_number"
//                   value={formData.voter_card_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gray-50 rounded-lg p-6">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">Bank Details</h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <input
//                     type="text"
//                     name="bank_name"
//                     value={formData.bank_name}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <input
//                     type="text"
//                     name="account_number"
//                     value={formData.account_number}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <input
//                     type="text"
//                     name="ifsc_code"
//                     value={formData.ifsc_code}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-blue-50 rounded-lg p-6">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">Slum Details</h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     value={formData.length}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     value={formData.width}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     value={formData.area_sq_m}
//                     onChange={handleInputChange}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since</label>
//                   <input
//                     type="text"
//                     name="residency_since"
//                     value={formData.residency_since}
//                     onChange={handleInputChange}
//                     placeholder="1995"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Member (Max 6 member)</h3>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members</label>
//               <input
//                 type="number"
//                 name="num_family_members"
//                 value={formData.num_family_members}
//                 onChange={handleInputChange}
//                 min="1"
//                 max="6"
//                 className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800">Family Member {memberNum} {memberNum === 1 ? 'Name' : ''}</h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {memberNum === 1 ? 'Family Member1 Name' : `Family Member${memberNum} Name`}
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       value={formData[`family_member${memberNum}_name`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {memberNum === 1 ? 'Family Member1 Age' : `Family Member${memberNum} Age`}
//                     </label>
//                     <input
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       value={formData[`family_member${memberNum}_age`]}
//                       onChange={handleInputChange}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Relation
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       value={formData[`family_member${memberNum}_relation`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Gender
//                     </label>
//                     <select
//                       name={`family_member${memberNum}_gender`}
//                       value={formData[`family_member${memberNum}_gender`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Aadhar
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       value={formData[`family_member${memberNum}_aadhaar`]}
//                       onChange={handleInputChange}
//                       maxLength="12"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Images</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_self"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_self && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_self.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Family Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_family"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_family && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_family.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Front Photo</h4>
//                 <input
//                   type="file"
//                   name="front_photo_path"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.front_photo_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.front_photo_path.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Side Photo</h4>
//                 <input
//                   type="file"
//                   name="side_photo_path"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.side_photo_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.side_photo_path.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Document Before 2000</h4>
//                 <input
//                   type="file"
//                   name="doc_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_before_2000.name}</p>
//                 )}
//               </div>

//               {/* <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Submitted Docs Before 2000</h4>
//                 <input
//                   type="file"
//                   name="submitted_docs_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.submitted_docs_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.submitted_docs_before_2000.name}</p>
//                 )}
//               </div> */}

//               {/* Between Year 2000 to 2010 */}

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Between Year 2000 to 2010</h4>
//                 <input
//                   type="file"
//                   name="after_2000_proof_submitted"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.after_2000_proof_submitted && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.after_2000_proof_submitted.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Possesional Doc Info</h4>
//                 <input
//                   type="file"
//                   name="possession_doc_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.possession_doc_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.possession_doc_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Declaration Letter Image</h4>
//                 <input
//                   type="file"
//                   name="Seldeclaration_letter"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Seldeclaration_letter && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Seldeclaration_letter.name}</p>
//                 )}
//               </div>

              

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Ration Card Info (Image)</h4>
//                 <input
//                   type="file"
//                   name="Ration_card_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Ration_card_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Ration_card_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">document_upload</h4>
//                 <input
//                   type="file"
//                   name="document_upload"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.document_upload && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.document_upload.name}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between overflow-x-auto">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
//               <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
//                 currentStep >= step.id 
//                   ? 'bg-orange-500 border-orange-500 text-white' 
//                   : 'bg-white border-gray-300 text-gray-500'
//               }`}>
//                 <span className="text-lg">{step.icon}</span>
//               </div>
//               <div className="ml-3 min-w-0">
//                 <p className={`text-sm font-medium ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   Step {step.id}
//                 </p>
//                 <p className={`text-xs truncate ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   {step.title}
//                 </p>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`flex-1 h-0.5 mx-4 min-w-8 ${
//                   currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
//                 }`} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//             ✅ {success}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//             ❌ {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {renderStepContent()}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
//                 currentStep === 1
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               <ChevronLeft size={20} />
//               Previous
//             </button>

//             <div className="text-sm text-gray-600">
//               Step {currentStep} of {steps.length}
//             </div>

//             {currentStep < steps.length ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
//               >
//                 Next
//                 <ChevronRight size={20} />
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium ${
//                   loading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-green-600 hover:bg-green-700'
//                 } text-white`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={20} />
//                     Submit Application
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddApplicationForm

// =======================================================

// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload } from 'lucide-react'

// const API_BASE_URL = "http://13.203.251.59:4200"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AddApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: ''
//   })
  
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     const newValue = type === 'checkbox' ? checked : value
    
//     setFormData(prev => {
//       const updated = {
//         ...prev,
//         [name]: newValue
//       }
      
//       // Auto-calculate area when length or width changes
//       if (name === 'length' || name === 'width') {
//         const length = name === 'length' ? parseFloat(value) || 0 : parseFloat(prev.length) || 0
//         const width = name === 'width' ? parseFloat(value) || 0 : parseFloat(prev.width) || 0
        
//         if (length > 0 && width > 0) {
//           updated.area_sq_m = (length * width).toFixed(2)
//         } else {
//           updated.area_sq_m = ''
//         }
//       }
      
//       return updated
//     })
//   }

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
//           formDataToSend.append(key, formData[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully!")
//       setTimeout(() => {
//         onSuccess()
//       }, 2000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <input
//                   type="text"
//                   name="cluster_number"
//                   value={formData.cluster_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
              

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
//                 <input
//                   type="text"
//                   name="name_of_slum_area"
//                   value={formData.name_of_slum_area}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation</label>
//                 <input
//                   type="text"
//                   name="municipal_corporation"
//                   value={formData.municipal_corporation}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
//                 <select
//                   name="ward"
//                   value={formData.ward}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
//                 <select
//                   name="district"
//                   value={formData.district}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
//                 <select
//                   name="taluka"
//                   value={formData.taluka}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <input
//                   type="text"
//                   name="village"
//                   value={formData.village}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <input
//                   type="text"
//                   name="slum_id"
//                   value={formData.slum_id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Slum Use
//                 </label>
//                 <select
//                   name="slum_use"
//                   value={formData.slum_use}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Slum Floor
//                 </label>
//                 <select
//                   name="slum_floor"
//                   value={formData.slum_floor}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <select
//                   name="ownership_of_slum_land"
//                   value={formData.ownership_of_slum_land || ""}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Survey Status
//                 </label>
//                 <select
//                   name="survey_status"
//                   value={formData.survey_status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>

//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="plan_submitted"
//                   checked={formData.plan_submitted}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="society_registered"
//                   checked={formData.society_registered}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <input
//                   type="text"
//                   name="middle_name"
//                   value={formData.middle_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//                 <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
//                 <input
//                   type="text"
//                   name="aadhaar_number"
//                   value={formData.aadhaar_number}
//                   onChange={handleInputChange}
//                   maxLength="12"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   value={formData.aadhaar_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <input
//                   type="text"
//                   name="spouse_name"
//                   value={formData.spouse_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <input
//                   type="email"
//                   name="user_email"
//                   value={formData.user_email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

            
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <textarea
//                   name="aadhaar_address"
//                   value={formData.aadhaar_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
//                 <textarea
//                   name="current_address"
//                   value={formData.current_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode</label>
//                 <input
//                   type="text"
//                   name="aadhaar_pincode"
//                   value={formData.aadhaar_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode</label>
//                 <input
//                   type="text"
//                   name="current_pincode"
//                   value={formData.current_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="current_mobile_number"
//                   value={formData.current_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Voter Card Type
//                 </label>
//                 <select
//                   name="voter_card_type"
//                   value={formData.voter_card_type}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number</label>
//                 <input
//                   type="text"
//                   name="voter_card_number"
//                   value={formData.voter_card_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gray-50 rounded-lg p-6">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">Bank Details</h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <input
//                     type="text"
//                     name="bank_name"
//                     value={formData.bank_name}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <input
//                     type="text"
//                     name="account_number"
//                     value={formData.account_number}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <input
//                     type="text"
//                     name="ifsc_code"
//                     value={formData.ifsc_code}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-blue-50 rounded-lg p-6">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">Slum Details</h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     value={formData.length}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     value={formData.width}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     value={formData.area_sq_m}
//                     onChange={handleInputChange}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since</label>
//                   <input
//                     type="text"
//                     name="residency_since"
//                     value={formData.residency_since}
//                     onChange={handleInputChange}
//                     placeholder="1995"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Member (Max 6 member)</h3>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members</label>
//               <input
//                 type="number"
//                 name="num_family_members"
//                 value={formData.num_family_members}
//                 onChange={handleInputChange}
//                 min="1"
//                 max="6"
//                 className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800">Family Member {memberNum} {memberNum === 1 ? 'Name' : ''}</h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {memberNum === 1 ? 'Family Member1 Name' : `Family Member${memberNum} Name`}
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       value={formData[`family_member${memberNum}_name`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {memberNum === 1 ? 'Family Member1 Age' : `Family Member${memberNum} Age`}
//                     </label>
//                     <input
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       value={formData[`family_member${memberNum}_age`]}
//                       onChange={handleInputChange}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Relation
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       value={formData[`family_member${memberNum}_relation`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Gender
//                     </label>
//                     <select
//                       name={`family_member${memberNum}_gender`}
//                       value={formData[`family_member${memberNum}_gender`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Aadhar
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       value={formData[`family_member${memberNum}_aadhaar`]}
//                       onChange={handleInputChange}
//                       maxLength="12"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Images</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_self"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_self && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_self.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Family Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_family"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_family && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_family.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Front Photo</h4>
//                 <input
//                   type="file"
//                   name="front_photo_path"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.front_photo_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.front_photo_path.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Side Photo</h4>
//                 <input
//                   type="file"
//                   name="side_photo_path"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.side_photo_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.side_photo_path.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Document Before 2000</h4>
//                 <input
//                   type="file"
//                   name="doc_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Submitted Docs Before 2000</h4>
//                 <input
//                   type="file"
//                   name="submitted_docs_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.submitted_docs_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.submitted_docs_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">After 2000 Proof Submitted</h4>
//                 <input
//                   type="file"
//                   name="after_2000_proof_submitted"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.after_2000_proof_submitted && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.after_2000_proof_submitted.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Possesional Doc Info</h4>
//                 <input
//                   type="file"
//                   name="possession_doc_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.possession_doc_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.possession_doc_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Declaration Letter Image</h4>
//                 <input
//                   type="file"
//                   name="Seldeclaration_letter"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Seldeclaration_letter && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Seldeclaration_letter.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Ration Card Info (Image)</h4>
//                 <input
//                   type="file"
//                   name="Ration_card_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Ration_card_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Ration_card_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">document_upload</h4>
//                 <input
//                   type="file"
//                   name="document_upload"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.document_upload && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.document_upload.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Sale Agreement</h4>
//                 <input
//                   type="file"
//                   name="sale_agreement"
//                   onChange={handleFileChange}
//                   accept=".pdf,.doc,.docx,image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.sale_agreement && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.sale_agreement.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Selfdeclaration (Video)</h4>
//                 <input
//                   type="file"
//                   name="self_declaration_letter"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.self_declaration_letter && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.self_declaration_letter.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Inside Video</h4>
//                 <input
//                   type="file"
//                   name="inside_video_path"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.inside_video_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.inside_video_path.name}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between overflow-x-auto">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
//               <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
//                 currentStep >= step.id 
//                   ? 'bg-orange-500 border-orange-500 text-white' 
//                   : 'bg-white border-gray-300 text-gray-500'
//               }`}>
//                 <span className="text-lg">{step.icon}</span>
//               </div>
//               <div className="ml-3 min-w-0">
//                 <p className={`text-sm font-medium ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   Step {step.id}
//                 </p>
//                 <p className={`text-xs truncate ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   {step.title}
//                 </p>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`flex-1 h-0.5 mx-4 min-w-8 ${
//                   currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
//                 }`} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//             ✅ {success}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//             ❌ {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {renderStepContent()}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
//                 currentStep === 1
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               <ChevronLeft size={20} />
//               Previous
//             </button>

//             <div className="text-sm text-gray-600">
//               Step {currentStep} of {steps.length}
//             </div>

//             {currentStep < steps.length ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
//               >
//                 Next
//                 <ChevronRight size={20} />
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium ${
//                   loading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-green-600 hover:bg-green-700'
//                 } text-white`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={20} />
//                     Submit Application
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddApplicationForm


// =============================================================================


// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload } from 'lucide-react'

// const API_BASE_URL = "http://13.203.251.59:4200"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AddApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: ''
//   })
  
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     const newValue = type === 'checkbox' ? checked : value
    
//     setFormData(prev => {
//       const updated = {
//         ...prev,
//         [name]: newValue
//       }
      
//       // Auto-calculate area when length or width changes
//       if (name === 'length' || name === 'width') {
//         const length = name === 'length' ? parseFloat(value) || 0 : parseFloat(prev.length) || 0
//         const width = name === 'width' ? parseFloat(value) || 0 : parseFloat(prev.width) || 0
        
//         if (length > 0 && width > 0) {
//           updated.area_sq_m = (length * width).toFixed(2)
//         } else {
//           updated.area_sq_m = ''
//         }
//       }
      
//       return updated
//     })
//   }

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
//           formDataToSend.append(key, formData[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully!")
//       setTimeout(() => {
//         onSuccess()
//       }, 2000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <input
//                   type="text"
//                   name="cluster_number"
//                   value={formData.cluster_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
              

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
//                 <input
//                   type="text"
//                   name="name_of_slum_area"
//                   value={formData.name_of_slum_area}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation</label>
//                 <input
//                   type="text"
//                   name="municipal_corporation"
//                   value={formData.municipal_corporation}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
//                 <select
//                   name="ward"
//                   value={formData.ward}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
//                 <select
//                   name="district"
//                   value={formData.district}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
//                 <select
//                   name="taluka"
//                   value={formData.taluka}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <input
//                   type="text"
//                   name="village"
//                   value={formData.village}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <input
//                   type="text"
//                   name="slum_id"
//                   value={formData.slum_id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Slum Use
//                 </label>
//                 <select
//                   name="slum_use"
//                   value={formData.slum_use}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Slum Floor
//                 </label>
//                 <select
//                   name="slum_floor"
//                   value={formData.slum_floor}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <select
//                   name="ownership_of_slum_land"
//                   value={formData.ownership_of_slum_land || ""}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Survey Status
//                 </label>
//                 <select
//                   name="survey_status"
//                   value={formData.survey_status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>

//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="plan_submitted"
//                   checked={formData.plan_submitted}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="society_registered"
//                   checked={formData.society_registered}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <input
//                   type="text"
//                   name="middle_name"
//                   value={formData.middle_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//                 <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
//                 <input
//                   type="text"
//                   name="aadhaar_number"
//                   value={formData.aadhaar_number}
//                   onChange={handleInputChange}
//                   maxLength="12"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   value={formData.aadhaar_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <input
//                   type="text"
//                   name="spouse_name"
//                   value={formData.spouse_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <input
//                   type="email"
//                   name="user_email"
//                   value={formData.user_email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

            
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <textarea
//                   name="aadhaar_address"
//                   value={formData.aadhaar_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
//                 <textarea
//                   name="current_address"
//                   value={formData.current_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode</label>
//                 <input
//                   type="text"
//                   name="aadhaar_pincode"
//                   value={formData.aadhaar_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode</label>
//                 <input
//                   type="text"
//                   name="current_pincode"
//                   value={formData.current_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="current_mobile_number"
//                   value={formData.current_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Voter Card Type
//                 </label>
//                 <select
//                   name="voter_card_type"
//                   value={formData.voter_card_type}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number</label>
//                 <input
//                   type="text"
//                   name="voter_card_number"
//                   value={formData.voter_card_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gray-50 rounded-lg p-6">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">Bank Details</h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <input
//                     type="text"
//                     name="bank_name"
//                     value={formData.bank_name}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <input
//                     type="text"
//                     name="account_number"
//                     value={formData.account_number}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <input
//                     type="text"
//                     name="ifsc_code"
//                     value={formData.ifsc_code}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-blue-50 rounded-lg p-6">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">Slum Details</h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     value={formData.length}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     value={formData.width}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     value={formData.area_sq_m}
//                     onChange={handleInputChange}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since</label>
//                   <input
//                     type="text"
//                     name="residency_since"
//                     value={formData.residency_since}
//                     onChange={handleInputChange}
//                     placeholder="1995"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Member (Max 6 member)</h3>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members</label>
//               <input
//                 type="number"
//                 name="num_family_members"
//                 value={formData.num_family_members}
//                 onChange={handleInputChange}
//                 min="1"
//                 max="6"
//                 className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800">Family Member {memberNum} {memberNum === 1 ? 'Name' : ''}</h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {memberNum === 1 ? 'Family Member1 Name' : `Family Member${memberNum} Name`}
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       value={formData[`family_member${memberNum}_name`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {memberNum === 1 ? 'Family Member1 Age' : `Family Member${memberNum} Age`}
//                     </label>
//                     <input
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       value={formData[`family_member${memberNum}_age`]}
//                       onChange={handleInputChange}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Relation
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       value={formData[`family_member${memberNum}_relation`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Gender
//                     </label>
//                     <select
//                       name={`family_member${memberNum}_gender`}
//                       value={formData[`family_member${memberNum}_gender`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Aadhar
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       value={formData[`family_member${memberNum}_aadhaar`]}
//                       onChange={handleInputChange}
//                       maxLength="12"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Images</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_self"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_self && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_self.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Family Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_family"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_family && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_family.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Front Photo</h4>
//                 <input
//                   type="file"
//                   name="doc_front_view"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_front_view && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_front_view.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Side Photo</h4>
//                 <input
//                   type="file"
//                   name="doc_side_view"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_side_view && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_side_view.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Document Before 2000</h4>
//                 <input
//                   type="file"
//                   name="doc_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Submitted Docs Before 2000</h4>
//                 <input
//                   type="file"
//                   name="submitted_docs_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.submitted_docs_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.submitted_docs_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">After 2000 Proof Submitted</h4>
//                 <input
//                   type="file"
//                   name="after_2000_proof_submitted"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.after_2000_proof_submitted && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.after_2000_proof_submitted.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Possesional Doc Info</h4>
//                 <input
//                   type="file"
//                   name="possession_doc_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.possession_doc_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.possession_doc_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Declaration Letter Image</h4>
//                 <input
//                   type="file"
//                   name="Seldeclaration_letter"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Seldeclaration_letter && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Seldeclaration_letter.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Ration Card Info (Image)</h4>
//                 <input
//                   type="file"
//                   name="Ration_card_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Ration_card_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Ration_card_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">document_upload</h4>
//                 <input
//                   type="file"
//                   name="document_upload"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.document_upload && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.document_upload.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Sale Agreement</h4>
//                 <input
//                   type="file"
//                   name="sale_agreement"
//                   onChange={handleFileChange}
//                   accept=".pdf,.doc,.docx,image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.sale_agreement && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.sale_agreement.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Declaration (Video)</h4>
//                 <input
//                   type="file"
//                   name="video_self_declaration"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.video_self_declaration && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.video_self_declaration.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Inside Video</h4>
//                 <input
//                   type="file"
//                   name="video_inside"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.video_inside && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.video_inside.name}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between overflow-x-auto">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
//               <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
//                 currentStep >= step.id 
//                   ? 'bg-orange-500 border-orange-500 text-white' 
//                   : 'bg-white border-gray-300 text-gray-500'
//               }`}>
//                 <span className="text-lg">{step.icon}</span>
//               </div>
//               <div className="ml-3 min-w-0">
//                 <p className={`text-sm font-medium ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   Step {step.id}
//                 </p>
//                 <p className={`text-xs truncate ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   {step.title}
//                 </p>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`flex-1 h-0.5 mx-4 min-w-8 ${
//                   currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
//                 }`} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//             ✅ {success}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//             ❌ {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {renderStepContent()}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
//                 currentStep === 1
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               <ChevronLeft size={20} />
//               Previous
//             </button>

//             <div className="text-sm text-gray-600">
//               Step {currentStep} of {steps.length}
//             </div>

//             {currentStep < steps.length ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
//               >
//                 Next
//                 <ChevronRight size={20} />
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium ${
//                   loading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-green-600 hover:bg-green-700'
//                 } text-white`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={20} />
//                     Submit Application
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddApplicationForm



// ==================================================

// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download } from 'lucide-react'
// import jsPDF from 'jspdf'
// import html2canvas from 'html2canvas'

// const API_BASE_URL = "http://13.203.251.59:4200"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// const AddApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: ''
//   })
  
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     const newValue = type === 'checkbox' ? checked : value
    
//     setFormData(prev => {
//       const updated = {
//         ...prev,
//         [name]: newValue
//       }
      
//       // Auto-calculate area when length or width changes
//       if (name === 'length' || name === 'width') {
//         const length = name === 'length' ? parseFloat(value) || 0 : parseFloat(prev.length) || 0
//         const width = name === 'width' ? parseFloat(value) || 0 : parseFloat(prev.width) || 0
        
//         if (length > 0 && width > 0) {
//           updated.area_sq_m = (length * width).toFixed(2)
//         } else {
//           updated.area_sq_m = ''
//         }
//       }
      
//       return updated
//     })
//   }

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   // PDF Generation Functions
//   const generateJodpatra1 = (data) => {
//     return new Promise((resolve) => {
//       const pdfElement = document.createElement('div')
//       pdfElement.style.width = '210mm'
//       pdfElement.style.minHeight = '297mm'
//       pdfElement.style.padding = '20mm'
//       pdfElement.style.fontFamily = 'Arial, sans-serif'
//       pdfElement.style.fontSize = '14px'
//       pdfElement.style.lineHeight = '1.5'
//       pdfElement.style.backgroundColor = 'white'
//       pdfElement.style.position = 'absolute'
//       pdfElement.style.top = '-9999px'

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//           <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - तीन</h3>
//           <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//           <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि. १.१.२००० अथवा त्यापूर्वीपासूनच्या संरक्षणपत्र झोपडीत दि. १.१.२००० अथवा त्यापूर्वीपासून राहणाऱ्या झोपडीवासीसाठी अर्ज.</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>अर्ज क्र: ${data.slum_id || 'ME_08403185'}</strong> <span style="float: right;"><strong>दिनांक:-07/06/2025</strong></span></p>
//           <p><strong>a. झोपडिवासियाचे नाव :- :-</strong> ${data.first_name || 'RABIYA'} ${data.last_name || 'YAQOOB'}</p>
//           <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || 'RAFIQ NAGAR SHIVAJI NAGAR GOVANDI, MUMBAI'}</p>
//           <p><strong>c. शहराचे नाव :-</strong> ${data.current_address || 'Akuri'}</p>
//           <p><strong>d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- M/E</strong>ME</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>e. झोपडिवासिय सध्याच्या झोपडीत केव्हापासून राहत आहे :-01/02/1999</strong></p>
//           <p><strong>f. कुटुंबातील सदस्यांची नावे:-</strong></p>
          
//           <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//             <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे - </p>
//           </div>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>g. झोपडी दि. ०१.०१.२००० रोजी अथवा त्यापूर्वी अस्तित्वात असताना अस्तित्वप्रमाण आणि झोपडिवासी त्या ठिकाणी राहत असण्याचा साक्षीदाराने सादर केलेला पुरावा :-</strong></p>
//           <p><strong>(अ) विवरणपत्रातील सादर केलेला पुरावा/पुराव्यांचे अनुक्रमांक :-Proof NA</strong></p>
          
//           <div style="text-align: center; margin: 20px 0;">
//             <p><strong>आणि</strong></p>
//           </div>
          
//           <p><strong>h.झोपडिवासिय सध्याचा त्या झोपडीत प्रत्यक्ष राहत असण्याबद्दलचा अलिकडच्या एका वर्षातील पुरावा :-</strong></p>
          
//           <p><strong>(अ) विवरणपत्रातील सादर केलेला पुरावा/पुराव्यांचे अनुक्रमांक :-Electricity Bill</strong></p>
//           <p>i.दिनांक एप्रिल, २०१५ च्या शासन आदेशातील परिच्छेद क्रमांक ३ नुसार स्वतःचा फोटो असलेल्या साध्या कागदावर स्वयं घोषणापत्र आहे व "पुरावे साक्षांकनासाठी स्वयं घोषणापत्र":-आहे.

// </p>
//         </div>

//         <div style="margin-top: 40px; text-align: center;">
//           <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//             <span style="font-size: 12px;">QR Code</span>
//           </div>
//           <p style="margin-top: 10px; font-size: 12px;"><strong>झोपडिवासियाची सही / अंगठा निशाणी</strong></p>
//           <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमाक :8957015366</strong></p>
//         </div>
//       `

//       document.body.appendChild(pdfElement)
      
//       setTimeout(() => {
//         html2canvas(pdfElement, {
//           scale: 2,
//           useCORS: true,
//           allowTaint: true
//         }).then(canvas => {
//           const imgData = canvas.toDataURL('image/png')
//           const pdf = new jsPDF('p', 'mm', 'a4')
//           const imgProps = pdf.getImageProperties(imgData)
//           const pdfWidth = pdf.internal.pageSize.getWidth()
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//           document.body.removeChild(pdfElement)
//           resolve(pdf)
//         }).catch(() => {
//           document.body.removeChild(pdfElement)
//           resolve(null)
//         })
//       }, 1000)
//     })
//   }

//   const generateJodpatra2 = (data) => {
//     return new Promise((resolve) => {
//       const pdfElement = document.createElement('div')
//       pdfElement.style.width = '210mm'
//       pdfElement.style.minHeight = '297mm'
//       pdfElement.style.padding = '20mm'
//       pdfElement.style.fontFamily = 'Arial, sans-serif'
//       pdfElement.style.fontSize = '14px'
//       pdfElement.style.lineHeight = '1.5'
//       pdfElement.style.backgroundColor = 'white'
//       pdfElement.style.position = 'absolute'
//       pdfElement.style.top = '-9999px'

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h2 style="margin: 0; font-size: 18px; font-weight: bold;">नियंत्रक शासन कमालय: प्रचंड-१००१/प्र.क्र.१०४१/झोपडपट्टी-१</h2>
//           <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - चार</h3>
//           <p style="margin: 5px 0; font-size: 12px;">(खास नियंत्रक प्राधिकरण विभाग म. झोपडपट्टी-१००१/प्र.क्र.१०४१/झोपडपट्टी-१, दिनाक १३ मे२०१४ मतलब ओरडर-एक पुरान)</p>
//           <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि.१.१.२००० च त्यानुकार सरकारपास्ण झोपडपट्टी दि.१.१.२००० मन्स्थ दिनांकाचून राहणार्या झोपडपत्रीची पण झोपडक झुरी माहितीचू आरक्षणच अर्ज.</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>अर्ज क्र: ${data.slum_id || 'UJ100071'}</strong> <span style="float: right;"><strong>दिनाक:-29/03/2017</strong></span></p>
//           <p><strong>a. झोपडधारकाचे नाव :-</strong> ${data.first_name || 'Vaid Ali'} ${data.last_name || 'Jalwir Khan'}</p>
//           <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || 'Gakalganj 250 Jazkar Ali Khan, , KAMRAJ NAGAR, Mumbai'}</p>
//           <p><strong>c. प्रत्यक्ष नाव :-</strong> ${data.current_address || 'Gakalganj'}</p>
//           <p><strong>d. महासंकेत/महानगरपालिकाचे क्र. :-</strong>N</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>e. झोपडधारकाच सस्याचा झोपडपट्टी कंबळण्या धर्म अर्ज:-01/02/2012</strong></p>
          
//           <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//             <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे - </p>
//             <p style="text-align: center; font-size: 10px;">Vaid Ali Khan</p>
//           </div>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>f. झोपडी दि.१.१.२००० रोजी असथा त्यापूर्वी अस्तित्वात अस्तित्वाप्रधान आणि झोपडधारकांच स्वहस्त केला पुरावा :-</strong></p>
//           <p><strong>(अ) विद्युतरक्षकाचे सादर केलेला पुरावाप्रधानाच अनुमानक :- Proof NA</strong></p>
          
//           <div style="text-align: center; margin: 20px 0;">
//             <p><strong>आणि</strong></p>
//           </div>
          
//           <p><strong>h. हो दि.१.१.२००० असथा त्यानुकार अस्तित्वाप्रधान कोणते कारण कंज अस्तित्वाप्रधान अधिक अधिकारनच एखा सैजे प्रमाण वाक् असस्या अस्तित्वाप्रधानाचे</strong></p>
//           <p><strong>संगणकावरि केल्या इत्यादि असथा त्यानुकार अस्तित्वाप्रधान</strong></p>
          
//           <p><strong>(अ) विद्युतरक्षकाचे सादर केलेला पुरावाप्रधानाच अनुमानक :- Proof NA</strong></p>
//           <p><strong>-अ) प्रमाणपत्री कार्याकारी अधिकारनच अधिकारनच कगी कार्यनच अधिक कोणते कारण अधिक सरकार अधिक प्रमाण संख अर्ज अधिक अधिकार धमकार उठाव अर्ज अधिक</strong></p>
//           <p><strong>संगणकावरी पुरावाप्रधान आमे डिसकी घुमार लेटा अर्ज अधिक</strong></p>
//           <p><strong>-र) सेला अधिकारनच स्मरण अवकळि मिसकी डिकार्या धावार पुरावार केले अधिकारी मिसकी प्रमाण संख अधिक अधिकार धमकार धावा संकार दिला अधिकार अधिकार</strong></p>
//           <p><strong>संगणकावरि पुरावाप्रधान आमे डिसकी मुलेंना मालार साझा अर्ज अधिक संकार्य</strong></p>
//           <p><strong>-डी सैव्यांचे संकेताचे अधिकारनच पूर्वीची चळवळ व पूर्ण घरुन चा कार्या अधिकारी सरकार केतार्यामधे रहुन अभ्यागताच अर्ज व "पूर्ण संकिल्पकराची</strong></p>
//           <p><strong>रुत घेल्यान" .- अर्ज</strong></p>
//           <p><strong>) अवनिली झोपडधारकाची खेळाच कमुनिस्ट प्रमाण निसर्गी वाव प्रमाण संकार अर्ज</strong></p>
//         </div>

//         <div style="margin-top: 40px; text-align: center;">
//           <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//             <span style="font-size: 12px;">QR Code</span>
//           </div>
//           <p style="margin-top: 10px; font-size: 12px;"><strong>झोपडधारकांच नाव/ आणि निशाणी</strong></p>
//           <p style="font-size: 12px;"><strong>प्रमाणपत्राची क्रमाक :3833021789</strong></p>
//           <p style="font-size: 12px;"><strong>टिप :- सदर प्रक्रिया कार्यालयाच प्रामुख्यते टिंग्ग जुक भरून वात्यंकीच रहन झराण्व</strong></p>
//         </div>
//       `

//       document.body.appendChild(pdfElement)
      
//       setTimeout(() => {
//         html2canvas(pdfElement, {
//           scale: 2,
//           useCORS: true,
//           allowTaint: true
//         }).then(canvas => {
//           const imgData = canvas.toDataURL('image/png')
//           const pdf = new jsPDF('p', 'mm', 'a4')
//           const imgProps = pdf.getImageProperties(imgData)
//           const pdfWidth = pdf.internal.pageSize.getWidth()
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//           document.body.removeChild(pdfElement)
//           resolve(pdf)
//         }).catch(() => {
//           document.body.removeChild(pdfElement)
//           resolve(null)
//         })
//       }, 1000)
//     })
//   }

//   const generateJodpatra3 = (data) => {
//     return new Promise((resolve) => {
//       const pdfElement = document.createElement('div')
//       pdfElement.style.width = '210mm'
//       pdfElement.style.minHeight = '297mm'
//       pdfElement.style.padding = '20mm'
//       pdfElement.style.fontFamily = 'Arial, sans-serif'
//       pdfElement.style.fontSize = '14px'
//       pdfElement.style.lineHeight = '1.5'
//       pdfElement.style.backgroundColor = 'white'
//       pdfElement.style.position = 'absolute'
//       pdfElement.style.top = '-9999px'

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h2 style="margin: 0; font-size: 18px; font-weight: bold;">नियंत्रक शासन कमालय: प्रचंड-१००१/प्र.क्र.१०४१/झोपडपट्टी-१</h2>
//           <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - पाच</h3>
//           <p style="margin: 5px 0; font-size: 12px;">(खास नियंत्रक प्राधिकरण विभाग म. झोपडपट्टी-१००१/प्र.क्र.१०४१/झोपडपट्टी-१, दिनाक १३ मे२०१४ मतलब ओरडर-एक पुरान)</p>
//           <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">झोपडपट्टी पुनर्वसन योजना - सदस्यता नोंदणी प्रपत्र</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>अर्ज क्र: ${data.slum_id || 'UJ100072'}</strong> <span style="float: right;"><strong>दिनाक:-${new Date().toLocaleDateString('en-GB')}</strong></span></p>
//           <p><strong>झोपडधारकाचे संपूर्ण नाव :-</strong> ${data.first_name || ''} ${data.middle_name || ''} ${data.last_name || ''}</p>
//           <p><strong>झोपडपट्टीचे नाव व संपूर्ण पत्ता :-</strong> ${data.name_of_slum_area || ''}, ${data.current_address || ''}</p>
//           <p><strong>वडील/पतींचे नाव :-</strong> ${data.spouse_name || ''}</p>
//           <p><strong>महासंकेत/महानगरपालिका क्रमांक :-</strong> ${data.cluster_number || ''}</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>कुटुंबातील सदस्यांची संख्या :-</strong> ${data.num_family_members || ''}</p>
          
//           <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
//             <thead>
//               <tr style="background-color: #f0f0f0;">
//                 <th style="border: 1px solid #000; padding: 8px; text-align: center;">क्र.</th>
//                 <th style="border: 1px solid #000; padding: 8px; text-align: center;">नाव</th>
//                 <th style="border: 1px solid #000; padding: 8px; text-align: center;">वय</th>
//                 <th style="border: 1px solid #000; padding: 8px; text-align: center;">नाते</th>
//                 <th style="border: 1px solid #000; padding: 8px; text-align: center;">लिंग</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${[1,2,3,4,5,6].map(i => `
//                 <tr>
//                   <td style="border: 1px solid #000; padding: 8px; text-align: center;">${i}</td>
//                   <td style="border: 1px solid #000; padding: 8px;">${data[`family_member${i}_name`] || ''}</td>
//                   <td style="border: 1px solid #000; padding: 8px; text-align: center;">${data[`family_member${i}_age`] || ''}</td>
//                   <td style="border: 1px solid #000; padding: 8px;">${data[`family_member${i}_relation`] || ''}</td>
//                   <td style="border: 1px solid #000; padding: 8px; text-align: center;">${data[`family_member${i}_gender`] || ''}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>झोपडीचे क्षेत्रफळ :-</strong> ${data.area_sq_m || ''} चौ.मी. (${data.length || ''} X ${data.width || ''} मीटर)</p>
//           <p><strong>झोपडीचा वापर :-</strong> ${data.slum_use || ''}</p>
//           <p><strong>झोपडीचा मजला :-</strong> ${data.slum_floor || ''}</p>
//           <p><strong>राहत असल्याचे वर्ष :-</strong> ${data.residency_since || ''} पासून</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>बॅंक तपशील :-</strong></p>
//           <p>बॅंकेचे नाव: ${data.bank_name || ''}</p>
//           <p>खाते क्रमांक: ${data.account_number || ''}</p>
//           <p>IFSC कोड: ${data.ifsc_code || ''}</p>
//         </div>

//         <div style="margin-top: 50px;">
//           <div style="display: flex; justify-content: space-between;">
//             <div style="text-align: center;">
//               <div style="border: 1px solid #000; width: 100px; height: 80px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
//                 <span style="font-size: 12px;">फोटो</span>
//               </div>
//               <p style="margin: 0; font-size: 12px;">झोपडधारकाची स्वाक्षरी</p>
//               <div style="border-bottom: 1px solid #000; width: 150px; height: 30px; margin: 10px auto;"></div>
//             </div>
            
//             <div style="text-align: center;">
//               <p style="margin-bottom: 30px; font-size: 12px;">कार्यालयीन वापरासाठी</p>
//               <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
//                 <span style="font-size: 10px;">मुहर</span>
//               </div>
//               <p style="margin: 0; font-size: 12px;">अधिकाऱ्याची स्वाक्षरी</p>
//             </div>
//           </div>
//         </div>
//       `

//       document.body.appendChild(pdfElement)
      
//       setTimeout(() => {
//         html2canvas(pdfElement, {
//           scale: 2,
//           useCORS: true,
//           allowTaint: true
//         }).then(canvas => {
//           const imgData = canvas.toDataURL('image/png')
//           const pdf = new jsPDF('p', 'mm', 'a4')
//           const imgProps = pdf.getImageProperties(imgData)
//           const pdfWidth = pdf.internal.pageSize.getWidth()
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//           document.body.removeChild(pdfElement)
//           resolve(pdf)
//         }).catch(() => {
//           document.body.removeChild(pdfElement)
//           resolve(null)
//         })
//       }, 1000)
//     })
//   }

//   const generateJodpatra4 = (data) => {
//     return new Promise((resolve) => {
//       const pdfElement = document.createElement('div')
//       pdfElement.style.width = '210mm'
//       pdfElement.style.minHeight = '297mm'
//       pdfElement.style.padding = '20mm'
//       pdfElement.style.fontFamily = 'Arial, sans-serif'
//       pdfElement.style.fontSize = '14px'
//       pdfElement.style.lineHeight = '1.5'
//       pdfElement.style.backgroundColor = 'white'
//       pdfElement.style.position = 'absolute'
//       pdfElement.style.top = '-9999px'

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h2 style="margin: 0; font-size: 18px; font-weight: bold;">नियंत्रक शासन कमालय: प्रचंड-१००१/प्र.क्र.१०४१/झोपडपट्टी-१</h2>
//           <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - सहा</h3>
//           <p style="margin: 5px 0; font-size: 12px;">(खास नियंत्रक प्राधिकरण विभाग म. झोपडपट्टी-१००१/प्र.क्र.१०४१/झोपडपट्टी-१, दिनाक १३ मे२०१४ मतलब ओरडर-एक पुरान)</p>
//           <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">स्वघोषणा पत्र - झोपडी अस्तित्व प्रमाण</p>
//         </div>

//         <div style="margin-bottom: 30px;">
//           <p style="text-align: right;"><strong>दिनाक: ${new Date().toLocaleDateString('en-GB')}</strong></p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="text-align: center; font-size: 16px; font-weight: bold;">प्रति,</p>
//           <p style="text-align: center; font-size: 16px; font-weight: bold;">झोपडपट्टी पुनर्वसन प्राधिकरण</p>
//           <p style="text-align: center; font-size: 16px; font-weight: bold;">मुंबई</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="text-align: center; font-size: 16px; font-weight: bold; text-decoration: underline;">विषय: झोपडी अस्तित्व संबंधी स्वघोषणा</p>
//         </div>

//         <div style="margin-bottom: 30px;">
//           <p>महोदय/महोदया,</p>
          
//           <p style="margin: 20px 0; text-indent: 50px; line-height: 2;">
//             मी, <strong>${data.first_name || ''} ${data.middle_name || ''} ${data.last_name || ''}</strong>, 
//             वय <strong>${data.family_member1_age || 'XX'}</strong> वर्षे, राहणार <strong>${data.current_address || ''}</strong> 
//             या द्वारे घोषणा करतो/करते की, मी <strong>${data.residency_since || 'XXXX'}</strong> सालपासून 
//             <strong>${data.name_of_slum_area || ''}</strong> येथे स्थित माझ्या झोपडीत राहत आहे.
//           </p>

//           <p style="margin: 20px 0; text-indent: 50px; line-height: 2;">
//             माझी झोपडी दिनांक <strong>१ जानेवारी २०००</strong> ${parseInt(data.residency_since) <= 1999 ? 'च्या आधी' : 'किंवा त्यानंतर'} 
//             अस्तित्वात होती आणि मी त्यावेळेपासून सतत येथेच राहत आहे. माझ्या झोपडीचे क्षेत्रफळ 
//             <strong>${data.area_sq_m || ''} चौ.मी.</strong> आहे आणि तिचा वापर <strong>${data.slum_use || ''}</strong> साठी केला जातो.
//           </p>

//           <p style="margin: 20px 0; text-indent: 50px; line-height: 2;">
//             माझ्या कुटुंबात <strong>${data.num_family_members || ''}</strong> सदस्य आहेत आणि आम्ही सर्वजण येथेच राहतो. 
//             मी या झोपडपट्टी पुनर्वसन योजनेत सहभागी होण्यास इच्छुक आहे.
//           </p>

//           <p style="margin: 20px 0; text-indent: 50px; line-height: 2;">
//             वरील माहिती पूर्णपणे सत्य आहे. जर कोणतीही माहिती चुकीची आढळली तर त्याची संपूर्ण जबाबदारी माझी राहील 
//             आणि माझा अर्ज रद्द केला जाऊ शकेल.
//           </p>
//         </div>

//         <div style="margin-top: 80px;">
//           <div style="display: flex; justify-content: space-between; align-items: flex-end;">
//             <div>
//               <p style="margin: 0; font-size: 14px; font-weight: bold;">संलग्न कागदपत्रे:</p>
//               <p style="margin: 5px 0; font-size: 12px;">१. झोपडीचा फोटो</p>
//               <p style="margin: 5px 0; font-size: 12px;">२. कुटुंबाचा फोटो</p>
//               <p style="margin: 5px 0; font-size: 12px;">३. ओळखपत्राची प्रत</p>
//               <p style="margin: 5px 0; font-size: 12px;">४. निवासाचा पुरावा</p>
//             </div>
            
//             <div style="text-align: center;">
//               <div style="border-bottom: 2px solid #000; width: 200px; height: 50px; margin-bottom: 10px;"></div>
//               <p style="margin: 0; font-size: 14px; font-weight: bold;">${data.first_name || ''} ${data.last_name || ''}</p>
//               <p style="margin: 5px 0; font-size: 12px;">(अर्जदाराची स्वाक्षरी)</p>
//             </div>
//           </div>
//         </div>

//         <div style="margin-top: 40px; text-align: center;">
//           <div style="border: 1px solid #000; padding: 10px; display: inline-block;">
//             <p style="margin: 0; font-size: 10px;">अंगठाचा ठसा</p>
//             <div style="width: 60px; height: 60px; border: 1px solid #000; margin: 10px auto;"></div>
//           </div>
//         </div>
//       `

//       document.body.appendChild(pdfElement)
      
//       setTimeout(() => {
//         html2canvas(pdfElement, {
//           scale: 2,
//           useCORS: true,
//           allowTaint: true
//         }).then(canvas => {
//           const imgData = canvas.toDataURL('image/png')
//           const pdf = new jsPDF('p', 'mm', 'a4')
//           const imgProps = pdf.getImageProperties(imgData)
//           const pdfWidth = pdf.internal.pageSize.getWidth()
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//           document.body.removeChild(pdfElement)
//           resolve(pdf)
//         }).catch((error) => {
//           console.error('Error generating PDF 4:', error)
//           document.body.removeChild(pdfElement)
//           resolve(null)
//         })
//       }, 1500)
//     })
//   }

//   const generateAndDownloadPdfs = async (formData) => {
//     setGeneratingPdfs(true)
    
//     try {
//       const residencyYear = parseInt(formData.residency_since) || 2000
//       console.log("Residency year:", residencyYear)
      
//       // Clear condition: If year is 1999 or before, generate 3 PDFs. If 2000 or after, generate 4 PDFs
//       if (residencyYear <= 1999) {
//         // Generate 3 PDFs for before 2000 (1999 and earlier)
//         setSuccess("Generating 3 Jodpatras for residency before 2000...")
//         console.log("Generating 3 PDFs for year:", residencyYear)
        
//         const [pdf1, pdf2, pdf3] = await Promise.all([
//           generateJodpatra1(formData),
//           generateJodpatra2(formData),
//           generateJodpatra3(formData)
//         ])
        
//         // Download PDFs with delays
//         setTimeout(() => {
//           if (pdf1) pdf1.save(`Jodpatra_1_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 500)
        
//         setTimeout(() => {
//           if (pdf2) pdf2.save(`Jodpatra_2_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 1000)
        
//         setTimeout(() => {
//           if (pdf3) pdf3.save(`Jodpatra_3_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 1500)
        
//         setSuccess("✅ Successfully generated and downloaded 3 Jodpatras!")
        
//       } else {
//         // Generate 4 PDFs for 2000 or after
//         setSuccess("Generating 4 Jodpatras for residency 2000 or after...")
//         console.log("Generating 4 PDFs for year:", residencyYear)
        
//         const [pdf1, pdf2, pdf3, pdf4] = await Promise.all([
//           generateJodpatra1(formData),
//           generateJodpatra2(formData),
//           generateJodpatra3(formData),
//           generateJodpatra4(formData)
//         ])
        
//         console.log("PDFs generated:", { 
//           pdf1: !!pdf1, 
//           pdf2: !!pdf2, 
//           pdf3: !!pdf3, 
//           pdf4: !!pdf4 
//         })
        
//         // Download PDFs with delays to ensure proper download
//         setTimeout(() => {
//           if (pdf1) pdf1.save(`Jodpatra_1_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 500)
        
//         setTimeout(() => {
//           if (pdf2) pdf2.save(`Jodpatra_2_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 1000)
        
//         setTimeout(() => {
//           if (pdf3) pdf3.save(`Jodpatra_3_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 1500)
        
//         setTimeout(() => {
//           if (pdf4) {
//             console.log("Downloading PDF 4...")
//             pdf4.save(`Jodpatra_4_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//           } else {
//             console.error("PDF 4 generation failed")
//           }
//         }, 2000)
        
//         setSuccess("✅ Successfully generated and downloaded 4 Jodpatras!")
//       }
      
//     } catch (error) {
//       console.error("Error generating PDFs:", error)
//       setError("Error generating PDFs: " + error.message)
//     } finally {
//       setTimeout(() => {
//         setGeneratingPdfs(false)
//       }, 3000)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
//           formDataToSend.append(key, formData[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully! Now generating PDFs...")
      
//       // Generate and download PDFs after successful submission
//       await generateAndDownloadPdfs(formData)
      
//       setTimeout(() => {
//         onSuccess()
//       }, 3000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <input
//                   type="text"
//                   name="cluster_number"
//                   value={formData.cluster_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
              

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
//                 <input
//                   type="text"
//                   name="name_of_slum_area"
//                   value={formData.name_of_slum_area}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation</label>
//                 <input
//                   type="text"
//                   name="municipal_corporation"
//                   value={formData.municipal_corporation}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
//                 <select
//                   name="ward"
//                   value={formData.ward}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
//                 <select
//                   name="district"
//                   value={formData.district}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
//                 <select
//                   name="taluka"
//                   value={formData.taluka}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <input
//                   type="text"
//                   name="village"
//                   value={formData.village}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <input
//                   type="text"
//                   name="slum_id"
//                   value={formData.slum_id}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Slum Use
//                 </label>
//                 <select
//                   name="slum_use"
//                   value={formData.slum_use}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Slum Floor
//                 </label>
//                 <select
//                   name="slum_floor"
//                   value={formData.slum_floor}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <select
//                   name="ownership_of_slum_land"
//                   value={formData.ownership_of_slum_land || ""}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Survey Status
//                 </label>
//                 <select
//                   name="survey_status"
//                   value={formData.survey_status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>

//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="plan_submitted"
//                   checked={formData.plan_submitted}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="society_registered"
//                   checked={formData.society_registered}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <input
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <input
//                   type="text"
//                   name="middle_name"
//                   value={formData.middle_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <input
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//                 <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
//                 <input
//                   type="text"
//                   name="aadhaar_number"
//                   value={formData.aadhaar_number}
//                   onChange={handleInputChange}
//                   maxLength="12"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   value={formData.aadhaar_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <input
//                   type="text"
//                   name="spouse_name"
//                   value={formData.spouse_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <input
//                   type="email"
//                   name="user_email"
//                   value={formData.user_email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

            
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <textarea
//                   name="aadhaar_address"
//                   value={formData.aadhaar_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
//                 <textarea
//                   name="current_address"
//                   value={formData.current_address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode</label>
//                 <input
//                   type="text"
//                   name="aadhaar_pincode"
//                   value={formData.aadhaar_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode</label>
//                 <input
//                   type="text"
//                   name="current_pincode"
//                   value={formData.current_pincode}
//                   onChange={handleInputChange}
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number</label>
//                 <input
//                   type="tel"
//                   name="current_mobile_number"
//                   value={formData.current_mobile_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Voter Card Type
//                 </label>
//                 <select
//                   name="voter_card_type"
//                   value={formData.voter_card_type}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number</label>
//                 <input
//                   type="text"
//                   name="voter_card_number"
//                   value={formData.voter_card_number}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gray-50 rounded-lg p-6">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">Bank Details</h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <input
//                     type="text"
//                     name="bank_name"
//                     value={formData.bank_name}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <input
//                     type="text"
//                     name="account_number"
//                     value={formData.account_number}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <input
//                     type="text"
//                     name="ifsc_code"
//                     value={formData.ifsc_code}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-blue-50 rounded-lg p-6">
//               <h4 className="text-xl font-semibold text-gray-800 mb-4">Slum Details</h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     value={formData.length}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     value={formData.width}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     value={formData.area_sq_m}
//                     onChange={handleInputChange}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
//                   <input
//                     type="number"
//                     name="residency_since"
//                     value={formData.residency_since}
//                     onChange={handleInputChange}
//                     placeholder="1995"
//                     min="1950"
//                     max="2024"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                   <p className="text-xs text-gray-600 mt-1">
//                     {formData.residency_since && (
//                       <span className={parseInt(formData.residency_since) <= 1999 ? "text-green-600" : "text-blue-600"}>
//                         {parseInt(formData.residency_since) <= 1999 ? "1999 or before - Will generate 3 PDFs" : "2000 or after - Will generate 4 PDFs"}
//                       </span>
//                     )}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Member (Max 6 member)</h3>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members</label>
//               <input
//                 type="number"
//                 name="num_family_members"
//                 value={formData.num_family_members}
//                 onChange={handleInputChange}
//                 min="1"
//                 max="6"
//                 className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800">Family Member {memberNum} {memberNum === 1 ? 'Name' : ''}</h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {memberNum === 1 ? 'Family Member1 Name' : `Family Member${memberNum} Name`}
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       value={formData[`family_member${memberNum}_name`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {memberNum === 1 ? 'Family Member1 Age' : `Family Member${memberNum} Age`}
//                     </label>
//                     <input
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       value={formData[`family_member${memberNum}_age`]}
//                       onChange={handleInputChange}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Relation
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       value={formData[`family_member${memberNum}_relation`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Gender
//                     </label>
//                     <select
//                       name={`family_member${memberNum}_gender`}
//                       value={formData[`family_member${memberNum}_gender`]}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Family Member {memberNum} Aadhar
//                     </label>
//                     <input
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       value={formData[`family_member${memberNum}_aadhaar`]}
//                       onChange={handleInputChange}
//                       maxLength="12"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Images</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_self"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_self && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_self.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Family Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_family"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_family && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_family.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Front Photo</h4>
//                 <input
//                   type="file"
//                   name="doc_front_view"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_front_view && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_front_view.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Side Photo</h4>
//                 <input
//                   type="file"
//                   name="doc_side_view"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_side_view && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_side_view.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Document Before 2000</h4>
//                 <input
//                   type="file"
//                   name="doc_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.doc_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.doc_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Submitted Docs Before 2000</h4>
//                 <input
//                   type="file"
//                   name="submitted_docs_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.submitted_docs_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.submitted_docs_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">After 2000 Proof Submitted</h4>
//                 <input
//                   type="file"
//                   name="after_2000_proof_submitted"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.after_2000_proof_submitted && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.after_2000_proof_submitted.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Possesional Doc Info</h4>
//                 <input
//                   type="file"
//                   name="possession_doc_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.possession_doc_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.possession_doc_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Declaration Letter Image</h4>
//                 <input
//                   type="file"
//                   name="Seldeclaration_letter"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Seldeclaration_letter && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Seldeclaration_letter.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Ration Card Info (Image)</h4>
//                 <input
//                   type="file"
//                   name="Ration_card_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.Ration_card_info && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.Ration_card_info.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">document_upload</h4>
//                 <input
//                   type="file"
//                   name="document_upload"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.document_upload && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.document_upload.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Sale Agreement</h4>
//                 <input
//                   type="file"
//                   name="sale_agreement"
//                   onChange={handleFileChange}
//                   accept=".pdf,.doc,.docx,image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.sale_agreement && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.sale_agreement.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Declaration (Video)</h4>
//                 <input
//                   type="file"
//                   name="video_self_declaration"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.video_self_declaration && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.video_self_declaration.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Inside Video</h4>
//                 <input
//                   type="file"
//                   name="video_inside"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.video_inside && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.video_inside.name}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between overflow-x-auto">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
//               <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
//                 currentStep >= step.id 
//                   ? 'bg-orange-500 border-orange-500 text-white' 
//                   : 'bg-white border-gray-300 text-gray-500'
//               }`}>
//                 <span className="text-lg">{step.icon}</span>
//               </div>
//               <div className="ml-3 min-w-0">
//                 <p className={`text-sm font-medium ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   Step {step.id}
//                 </p>
//                 <p className={`text-xs truncate ${
//                   currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
//                 }`}>
//                   {step.title}
//                 </p>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`flex-1 h-0.5 mx-4 min-w-8 ${
//                   currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
//                 }`} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//             ✅ {success}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//             ❌ {error}
//           </div>
//         )}

//         {generatingPdfs && (
//           <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6 flex items-center">
//             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-3"></div>
//             Generating and downloading PDF documents...
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {renderStepContent()}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
//                 currentStep === 1
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               <ChevronLeft size={20} />
//               Previous
//             </button>

//             <div className="text-sm text-gray-600">
//               Step {currentStep} of {steps.length}
//               {formData.residency_since && currentStep === 4 && (
//                 <div className="text-xs mt-1">
//                   <span className={parseInt(formData.residency_since) <= 1999 ? "text-green-600" : "text-blue-600"}>
//                     {parseInt(formData.residency_since) <= 1999 ? "Will generate 3 Jodpatras" : "Will generate 4 Jodpatras"}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {currentStep < steps.length ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
//               >
//                 Next
//                 <ChevronRight size={20} />
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 disabled={loading || generatingPdfs}
//                 className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium ${
//                   loading || generatingPdfs
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-green-600 hover:bg-green-700'
//                 } text-white`}
//               >
//                 {loading || generatingPdfs ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     {generatingPdfs ? 'Generating PDFs...' : 'Submitting...'}
//                   </>
//                 ) : (
//                   <>
//                     <Save size={20} />
//                     Submit & Generate PDFs
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddApplicationForm


// ==================================================================

// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download } from 'lucide-react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import jsPDF from 'jspdf'
// import html2canvas from 'html2canvas'

// const API_BASE_URL = "http://13.203.251.59:4200"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// // Validation schemas for each step
// const validationSchemas = {
//   1: Yup.object({
//     slum_id: Yup.string().required('Slum ID is required'),
//     name_of_slum_area: Yup.string().required('Slum name is required'),
//     municipal_corporation: Yup.string().required('Municipal Corporation is required'),
//     ward: Yup.string().required('Ward is required'),
//     district: Yup.string().required('District is required'),
//     taluka: Yup.string().required('Taluka is required'),
//   }),
//   2: Yup.object({
//     first_name: Yup.string().required('First name is required'),
//     last_name: Yup.string().required('Last name is required'),
//     gender: Yup.string().required('Gender is required'),
//     aadhaar_number: Yup.string().matches(/^[0-9]{12}$/, 'Aadhaar number must be 12 digits'),
//     user_email: Yup.string().email('Invalid email format'),
//   }),
//   3: Yup.object({
//     current_address: Yup.string().required('Current address is required'),
//     current_mobile_number: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
//     current_pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
//   }),
//   4: Yup.object({
//     residency_since: Yup.number()
//       .min(1950, 'Year must be after 1950')
//       .max(2024, 'Year cannot be in the future')
//       .required('Residency since is required'),
//     length: Yup.number().positive('Length must be positive'),
//     width: Yup.number().positive('Width must be positive'),
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

// const ApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)

//   const initialValues = {
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: ''
//   }

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = (formik) => {
//     // Validate current step before proceeding
//     const currentSchema = validationSchemas[currentStep]
//     if (currentSchema) {
//       formik.validateForm().then(errors => {
//         const stepErrors = Object.keys(errors).length > 0
//         if (!stepErrors) {
//           if (currentStep < steps.length) {
//             setCurrentStep(currentStep + 1)
//           }
//         }
//       })
//     } else {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1)
//       }
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   // PDF Generation Functions
//   const generateJodpatra1 = (data) => {
//     return new Promise((resolve) => {
//       const pdfElement = document.createElement('div')
//       pdfElement.style.width = '210mm'
//       pdfElement.style.minHeight = '297mm'
//       pdfElement.style.padding = '20mm'
//       pdfElement.style.fontFamily = 'Arial, sans-serif'
//       pdfElement.style.fontSize = '14px'
//       pdfElement.style.lineHeight = '1.5'
//       pdfElement.style.backgroundColor = 'white'
//       pdfElement.style.position = 'absolute'
//       pdfElement.style.top = '-9999px'

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//           <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - तीन</h3>
//           <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//           <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि. १.१.२००० अथवा त्यापूर्वीपासूनच्या संरक्षणपत्र झोपडीत दि. १.१.२००० अथवा त्यापूर्वीपासून राहणाऱ्या झोपडीवासीसाठी अर्ज.</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>अर्ज क्र: ${data.slum_id || 'ME_08403185'}</strong> <span style="float: right;"><strong>दिनांक:-07/06/2025</strong></span></p>
//           <p><strong>a. झोपडिवासियाचे नाव :- :-</strong> ${data.first_name || 'RABIYA'} ${data.last_name || 'YAQOOB'}</p>
//           <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || 'RAFIQ NAGAR SHIVAJI NAGAR GOVANDI, MUMBAI'}</p>
//           <p><strong>c. शहराचे नाव :-</strong> ${data.current_address || 'Akuri'}</p>
//           <p><strong>d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- M/E</strong>ME</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>e. झोपडिवासिय सध्याच्या झोपडीत केव्हापासून राहत आहे :-01/02/1999</strong></p>
//           <p><strong>f. कुटुंबातील सदस्यांची नावे:-</strong></p>
          
//           <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//             <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे - </p>
//           </div>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>g. झोपडी दि. ०१.०१.२००० रोजी अथवा त्यापूर्वी अस्तित्वात असताना अस्तित्वप्रमाण आणि झोपडिवासी त्या ठिकाणी राहत असण्याचा साक्षीदाराने सादर केलेला पुरावा :-</strong></p>
//           <p><strong>(अ) विवरणपत्रातील सादर केलेला पुरावा/पुराव्यांचे अनुक्रमांक :-Proof NA</strong></p>
          
//           <div style="text-align: center; margin: 20px 0;">
//             <p><strong>आणि</strong></p>
//           </div>
          
//           <p><strong>h.झोपडिवासिय सध्याचा त्या झोपडीत प्रत्यक्ष राहत असण्याबद्दलचा अलिकडच्या एका वर्षातील पुरावा :-</strong></p>
          
//           <p><strong>(अ) विवरणपत्रातील सादर केलेला पुरावा/पुराव्यांचे अनुक्रमांक :-Electricity Bill</strong></p>
//           <p>i.दिनांक एप्रिल, २०१५ च्या शासन आदेशातील परिच्छेद क्रमांक ३ नुसार स्वतःचा फोटो असलेल्या साध्या कागदावर स्वयं घोषणापत्र आहे व "पुरावे साक्षांकनासाठी स्वयं घोषणापत्र":-आहे.</p>
//         </div>

//         <div style="margin-top: 40px; text-align: center;">
//           <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//             <span style="font-size: 12px;">QR Code</span>
//           </div>
//           <p style="margin-top: 10px; font-size: 12px;"><strong>झोपडिवासियाची सही / अंगठा निशाणी</strong></p>
//           <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमाक :8957015366</strong></p>
//         </div>
//       `

//       document.body.appendChild(pdfElement)
      
//       setTimeout(() => {
//         html2canvas(pdfElement, {
//           scale: 2,
//           useCORS: true,
//           allowTaint: true
//         }).then(canvas => {
//           const imgData = canvas.toDataURL('image/png')
//           const pdf = new jsPDF('p', 'mm', 'a4')
//           const imgProps = pdf.getImageProperties(imgData)
//           const pdfWidth = pdf.internal.pageSize.getWidth()
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//           document.body.removeChild(pdfElement)
//           resolve(pdf)
//         }).catch(() => {
//           document.body.removeChild(pdfElement)
//           resolve(null)
//         })
//       }, 1000)
//     })
//   }

//   const generateJodpatra2 = (data) => {
//     return new Promise((resolve) => {
//       const pdfElement = document.createElement('div')
//       pdfElement.style.width = '210mm'
//       pdfElement.style.minHeight = '297mm'
//       pdfElement.style.padding = '20mm'
//       pdfElement.style.fontFamily = 'Arial, sans-serif'
//       pdfElement.style.fontSize = '14px'
//       pdfElement.style.lineHeight = '1.5'
//       pdfElement.style.backgroundColor = 'white'
//       pdfElement.style.position = 'absolute'
//       pdfElement.style.top = '-9999px'

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h2 style="margin: 0; font-size: 18px; font-weight: bold;">नियंत्रक शासन कमालय: प्रचंड-१००१/प्र.क्र.१०४१/झोपडपट्टी-१</h2>
//           <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - चार</h3>
//           <p style="margin: 5px 0; font-size: 12px;">(खास नियंत्रक प्राधिकरण विभाग म. झोपडपट्टी-१००१/प्र.क्र.१०४१/झोपडपट्टी-१, दिनाक १३ मे२०१४ मतलब ओरडर-एक पुरान)</p>
//           <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि.१.१.२००० च त्यानुकार सरकारपास्ण झोपडपट्टी दि.१.१.२००० मन्स्थ दिनांकाचून राहणार्या झोपडपत्रीची पण झोपडक झुरी माहितीचू आरक्षणच अर्ज.</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>अर्ज क्र: ${data.slum_id || 'UJ100071'}</strong> <span style="float: right;"><strong>दिनाक:-29/03/2017</strong></span></p>
//           <p><strong>a. झोपडधारकाचे नाव :-</strong> ${data.first_name || 'Vaid Ali'} ${data.last_name || 'Jalwir Khan'}</p>
//           <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || 'Gakalganj 250 Jazkar Ali Khan, , KAMRAJ NAGAR, Mumbai'}</p>
//           <p><strong>c. प्रत्यक्ष नाव :-</strong> ${data.current_address || 'Gakalganj'}</p>
//           <p><strong>d. महासंकेत/महानगरपालिकाचे क्र. :-</strong>N</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>e. झोपडधारकाच सस्याचा झोपडपट्टी कंबळण्या धर्म अर्ज:-01/02/2012</strong></p>
          
//           <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//             <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे - </p>
//             <p style="text-align: center; font-size: 10px;">Vaid Ali Khan</p>
//           </div>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>f. झोपडी दि.१.१.२००० रोजी असथा त्यापूर्वी अस्तित्वात अस्तित्वाप्रधान आणि झोपडधारकांच स्वहस्त केला पुरावा :-</strong></p>
//           <p><strong>(अ) विद्युतरक्षकाचे सादर केलेला पुरावाप्रधानाच अनुमानक :- Proof NA</strong></p>
          
//           <div style="text-align: center; margin: 20px 0;">
//             <p><strong>आणि</strong></p>
//           </div>
          
//           <p><strong>h. हो दि.१.१.२००० असथा त्यानुकार अस्तित्वाप्रधान कोणते कारण कंज अस्तित्वाप्रधान अधिक अधिकारनच एखा सैजे प्रमाण वाक् असस्या अस्तित्वाप्रधानाचे</strong></p>
//           <p><strong>संगणकावरि केल्या इत्यादि असथा त्यानुकार अस्तित्वाप्रधान</strong></p>
          
//           <p><strong>(अ) विद्युतरक्षकाचे सादर केलेला पुरावाप्रधानाच अनुमानक :- Proof NA</strong></p>
//         </div>

//         <div style="margin-top: 40px; text-align: center;">
//           <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//             <span style="font-size: 12px;">QR Code</span>
//           </div>
//           <p style="margin-top: 10px; font-size: 12px;"><strong>झोपडधारकांच नाव/ आणि निशाणी</strong></p>
//           <p style="font-size: 12px;"><strong>प्रमाणपत्राची क्रमाक :3833021789</strong></p>
//         </div>
//       `

//       document.body.appendChild(pdfElement)
      
//       setTimeout(() => {
//         html2canvas(pdfElement, {
//           scale: 2,
//           useCORS: true,
//           allowTaint: true
//         }).then(canvas => {
//           const imgData = canvas.toDataURL('image/png')
//           const pdf = new jsPDF('p', 'mm', 'a4')
//           const imgProps = pdf.getImageProperties(imgData)
//           const pdfWidth = pdf.internal.pageSize.getWidth()
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//           document.body.removeChild(pdfElement)
//           resolve(pdf)
//         }).catch(() => {
//           document.body.removeChild(pdfElement)
//           resolve(null)
//         })
//       }, 1000)
//     })
//   }

//   const generateJodpatra3 = (data) => {
//     return new Promise((resolve) => {
//       const pdfElement = document.createElement('div')
//       pdfElement.style.width = '210mm'
//       pdfElement.style.minHeight = '297mm'
//       pdfElement.style.padding = '20mm'
//       pdfElement.style.fontFamily = 'Arial, sans-serif'
//       pdfElement.style.fontSize = '14px'
//       pdfElement.style.lineHeight = '1.5'
//       pdfElement.style.backgroundColor = 'white'
//       pdfElement.style.position = 'absolute'
//       pdfElement.style.top = '-9999px'

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h2 style="margin: 0; font-size: 18px; font-weight: bold;">नियंत्रक शासन कमालय: प्रचंड-१००१/प्र.क्र.१०४१/झोपडपट्टी-१</h2>
//           <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - पाच</h3>
//           <p style="margin: 5px 0; font-size: 12px;">(खास नियंत्रक प्राधिकरण विभाग म. झोपडपट्टी-१००१/प्र.क्र.१०४१/झोपडपट्टी-१, दिनाक १३ मे२०१४ मतलब ओरडर-एक पुरान)</p>
//           <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">झोपडपट्टी पुनर्वसन योजना - सदस्यता नोंदणी प्रपत्र</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>अर्ज क्र: ${data.slum_id || 'UJ100072'}</strong> <span style="float: right;"><strong>दिनाक:-${new Date().toLocaleDateString('en-GB')}</strong></span></p>
//           <p><strong>झोपडधारकाचे संपूर्ण नाव :-</strong> ${data.first_name || ''} ${data.middle_name || ''} ${data.last_name || ''}</p>
//           <p><strong>झोपडपट्टीचे नाव व संपूर्ण पत्ता :-</strong> ${data.name_of_slum_area || ''}, ${data.current_address || ''}</p>
//           <p><strong>वडील/पतींचे नाव :-</strong> ${data.spouse_name || ''}</p>
//           <p><strong>महासंकेत/महानगरपालिका क्रमांक :-</strong> ${data.cluster_number || ''}</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>कुटुंबातील सदस्यांची संख्या :-</strong> ${data.num_family_members || ''}</p>
          
//           <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
//             <thead>
//               <tr style="background-color: #f0f0f0;">
//                 <th style="border: 1px solid #000; padding: 8px; text-align: center;">क्र.</th>
//                 <th style="border: 1px solid #000; padding: 8px; text-align: center;">नाव</th>
//                 <th style="border: 1px solid #000; padding: 8px; text-align: center;">वय</th>
//                 <th style="border: 1px solid #000; padding: 8px; text-align: center;">नाते</th>
//                 <th style="border: 1px solid #000; padding: 8px; text-align: center;">लिंग</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${[1,2,3,4,5,6].map(i => `
//                 <tr>
//                   <td style="border: 1px solid #000; padding: 8px; text-align: center;">${i}</td>
//                   <td style="border: 1px solid #000; padding: 8px;">${data[`family_member${i}_name`] || ''}</td>
//                   <td style="border: 1px solid #000; padding: 8px; text-align: center;">${data[`family_member${i}_age`] || ''}</td>
//                   <td style="border: 1px solid #000; padding: 8px;">${data[`family_member${i}_relation`] || ''}</td>
//                   <td style="border: 1px solid #000; padding: 8px; text-align: center;">${data[`family_member${i}_gender`] || ''}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>झोपडीचे क्षेत्रफळ :-</strong> ${data.area_sq_m || ''} चौ.मी. (${data.length || ''} X ${data.width || ''} मीटर)</p>
//           <p><strong>झोपडीचा वापर :-</strong> ${data.slum_use || ''}</p>
//           <p><strong>झोपडीचा मजला :-</strong> ${data.slum_floor || ''}</p>
//           <p><strong>राहत असल्याचे वर्ष :-</strong> ${data.residency_since || ''} पासून</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>बॅंक तपशील :-</strong></p>
//           <p>बॅंकेचे नाव: ${data.bank_name || ''}</p>
//           <p>खाते क्रमांक: ${data.account_number || ''}</p>
//           <p>IFSC कोड: ${data.ifsc_code || ''}</p>
//         </div>

//         <div style="margin-top: 50px;">
//           <div style="display: flex; justify-content: space-between;">
//             <div style="text-align: center;">
//               <div style="border: 1px solid #000; width: 100px; height: 80px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
//                 <span style="font-size: 12px;">फोटो</span>
//               </div>
//               <p style="margin: 0; font-size: 12px;">झोपडधारकाची स्वाक्षरी</p>
//               <div style="border-bottom: 1px solid #000; width: 150px; height: 30px; margin: 10px auto;"></div>
//             </div>
            
//             <div style="text-align: center;">
//               <p style="margin-bottom: 30px; font-size: 12px;">कार्यालयीन वापरासाठी</p>
//               <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
//                 <span style="font-size: 10px;">मुहर</span>
//               </div>
//               <p style="margin: 0; font-size: 12px;">अधिकाऱ्याची स्वाक्षरी</p>
//             </div>
//           </div>
//         </div>
//       `

//       document.body.appendChild(pdfElement)
      
//       setTimeout(() => {
//         html2canvas(pdfElement, {
//           scale: 2,
//           useCORS: true,
//           allowTaint: true
//         }).then(canvas => {
//           const imgData = canvas.toDataURL('image/png')
//           const pdf = new jsPDF('p', 'mm', 'a4')
//           const imgProps = pdf.getImageProperties(imgData)
//           const pdfWidth = pdf.internal.pageSize.getWidth()
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//           document.body.removeChild(pdfElement)
//           resolve(pdf)
//         }).catch(() => {
//           document.body.removeChild(pdfElement)
//           resolve(null)
//         })
//       }, 1000)
//     })
//   }

//   const generateJodpatra4 = (data) => {
//     return new Promise((resolve) => {
//       const pdfElement = document.createElement('div')
//       pdfElement.style.width = '210mm'
//       pdfElement.style.minHeight = '297mm'
//       pdfElement.style.padding = '20mm'
//       pdfElement.style.fontFamily = 'Arial, sans-serif'
//       pdfElement.style.fontSize = '14px'
//       pdfElement.style.lineHeight = '1.5'
//       pdfElement.style.backgroundColor = 'white'
//       pdfElement.style.position = 'absolute'
//       pdfElement.style.top = '-9999px'

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h2 style="margin: 0; font-size: 18px; font-weight: bold;">नियंत्रक शासन कमालय: प्रचंड-१००१/प्र.क्र.१०४१/झोपडपट्टी-१</h2>
//           <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - सहा</h3>
//           <p style="margin: 5px 0; font-size: 12px;">(खास नियंत्रक प्राधिकरण विभाग म. झोपडपट्टी-१००१/प्र.क्र.१०४१/झोपडपट्टी-१, दिनाक १३ मे२०१४ मतलब ओरडर-एक पुरान)</p>
//           <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">स्वघोषणा पत्र - झोपडी अस्तित्व प्रमाण</p>
//         </div>

//         <div style="margin-bottom: 30px;">
//           <p style="text-align: right;"><strong>दिनाक: ${new Date().toLocaleDateString('en-GB')}</strong></p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="text-align: center; font-size: 16px; font-weight: bold;">प्रति,</p>
//           <p style="text-align: center; font-size: 16px; font-weight: bold;">झोपडपट्टी पुनर्वसन प्राधिकरण</p>
//           <p style="text-align: center; font-size: 16px; font-weight: bold;">मुंबई</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="text-align: center; font-size: 16px; font-weight: bold; text-decoration: underline;">विषय: झोपडी अस्तित्व संबंधी स्वघोषणा</p>
//         </div>

//         <div style="margin-bottom: 30px;">
//           <p>महोदय/महोदया,</p>
          
//           <p style="margin: 20px 0; text-indent: 50px; line-height: 2;">
//             मी, <strong>${data.first_name || ''} ${data.middle_name || ''} ${data.last_name || ''}</strong>, 
//             वय <strong>${data.family_member1_age || 'XX'}</strong> वर्षे, राहणार <strong>${data.current_address || ''}</strong> 
//             या द्वारे घोषणा करतो/करते की, मी <strong>${data.residency_since || 'XXXX'}</strong> सालपासून 
//             <strong>${data.name_of_slum_area || ''}</strong> येथे स्थित माझ्या झोपडीत राहत आहे.
//           </p>

//           <p style="margin: 20px 0; text-indent: 50px; line-height: 2;">
//             माझी झोपडी दिनांक <strong>१ जानेवारी २०००</strong> ${parseInt(data.residency_since) <= 1999 ? 'च्या आधी' : 'किंवा त्यानंतर'} 
//             अस्तित्वात होती आणि मी त्यावेळेपासून सतत येथेच राहत आहे. माझ्या झोपडीचे क्षेत्रफळ 
//             <strong>${data.area_sq_m || ''} चौ.मी.</strong> आहे आणि तिचा वापर <strong>${data.slum_use || ''}</strong> साठी केला जातो.
//           </p>

//           <p style="margin: 20px 0; text-indent: 50px; line-height: 2;">
//             माझ्या कुटुंबात <strong>${data.num_family_members || ''}</strong> सदस्य आहेत आणि आम्ही सर्वजण येथेच राहतो. 
//             मी या झोपडपट्टी पुनर्वसन योजनेत सहभागी होण्यास इच्छुक आहे.
//           </p>

//           <p style="margin: 20px 0; text-indent: 50px; line-height: 2;">
//             वरील माहिती पूर्णपणे सत्य आहे. जर कोणतीही माहिती चुकीची आढळली तर त्याची संपूर्ण जबाबदारी माझी राहील 
//             आणि माझा अर्ज रद्द केला जाऊ शकेल.
//           </p>
//         </div>

//         <div style="margin-top: 80px;">
//           <div style="display: flex; justify-content: space-between; align-items: flex-end;">
//             <div>
//               <p style="margin: 0; font-size: 14px; font-weight: bold;">संलग्न कागदपत्रे:</p>
//               <p style="margin: 5px 0; font-size: 12px;">१. झोपडीचा फोटो</p>
//               <p style="margin: 5px 0; font-size: 12px;">२. कुटुंबाचा फोटो</p>
//               <p style="margin: 5px 0; font-size: 12px;">३. ओळखपत्राची प्रत</p>
//               <p style="margin: 5px 0; font-size: 12px;">४. निवासाचा पुरावा</p>
//             </div>
            
//             <div style="text-align: center;">
//               <div style="border-bottom: 2px solid #000; width: 200px; height: 50px; margin-bottom: 10px;"></div>
//               <p style="margin: 0; font-size: 14px; font-weight: bold;">${data.first_name || ''} ${data.last_name || ''}</p>
//               <p style="margin: 5px 0; font-size: 12px;">(अर्जदाराची स्वाक्षरी)</p>
//             </div>
//           </div>
//         </div>

//         <div style="margin-top: 40px; text-align: center;">
//           <div style="border: 1px solid #000; padding: 10px; display: inline-block;">
//             <p style="margin: 0; font-size: 10px;">अंगठाचा ठसा</p>
//             <div style="width: 60px; height: 60px; border: 1px solid #000; margin: 10px auto;"></div>
//           </div>
//         </div>
//       `

//       document.body.appendChild(pdfElement)
      
//       setTimeout(() => {
//         html2canvas(pdfElement, {
//           scale: 2,
//           useCORS: true,
//           allowTaint: true
//         }).then(canvas => {
//           const imgData = canvas.toDataURL('image/png')
//           const pdf = new jsPDF('p', 'mm', 'a4')
//           const imgProps = pdf.getImageProperties(imgData)
//           const pdfWidth = pdf.internal.pageSize.getWidth()
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//           document.body.removeChild(pdfElement)
//           resolve(pdf)
//         }).catch((error) => {
//           console.error('Error generating PDF 4:', error)
//           document.body.removeChild(pdfElement)
//           resolve(null)
//         })
//       }, 1500)
//     })
//   }

//   const generateAndDownloadPdfs = async (formData) => {
//     setGeneratingPdfs(true)
    
//     try {
//       const residencyYear = parseInt(formData.residency_since) || 2000
//       console.log("Residency year:", residencyYear)
      
//       // Clear condition: If year is 1999 or before, generate 3 PDFs. If 2000 or after, generate 4 PDFs
//       if (residencyYear <= 1999) {
//         // Generate 3 PDFs for before 2000 (1999 and earlier)
//         setSuccess("Generating 3 Jodpatras for residency before 2000...")
//         console.log("Generating 3 PDFs for year:", residencyYear)
        
//         const [pdf1, pdf2, pdf3] = await Promise.all([
//           generateJodpatra1(formData),
//           generateJodpatra2(formData),
//           generateJodpatra3(formData)
//         ])
        
//         // Download PDFs with delays
//         setTimeout(() => {
//           if (pdf1) pdf1.save(`Jodpatra_1_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 500)
        
//         setTimeout(() => {
//           if (pdf2) pdf2.save(`Jodpatra_2_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 1000)
        
//         setTimeout(() => {
//           if (pdf3) pdf3.save(`Jodpatra_3_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 1500)
        
//         setSuccess("✅ Successfully generated and downloaded 3 Jodpatras!")
        
//       } else {
//         // Generate 4 PDFs for 2000 or after
//         setSuccess("Generating 4 Jodpatras for residency 2000 or after...")
//         console.log("Generating 4 PDFs for year:", residencyYear)
        
//         const [pdf1, pdf2, pdf3, pdf4] = await Promise.all([
//           generateJodpatra1(formData),
//           generateJodpatra2(formData),
//           generateJodpatra3(formData),
//           generateJodpatra4(formData)
//         ])
        
//         console.log("PDFs generated:", { 
//           pdf1: !!pdf1, 
//           pdf2: !!pdf2, 
//           pdf3: !!pdf3, 
//           pdf4: !!pdf4 
//         })
        
//         // Download PDFs with delays to ensure proper download
//         setTimeout(() => {
//           if (pdf1) pdf1.save(`Jodpatra_1_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 500)
        
//         setTimeout(() => {
//           if (pdf2) pdf2.save(`Jodpatra_2_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 1000)
        
//         setTimeout(() => {
//           if (pdf3) pdf3.save(`Jodpatra_3_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//         }, 1500)
        
//         setTimeout(() => {
//           if (pdf4) {
//             console.log("Downloading PDF 4...")
//             pdf4.save(`Jodpatra_4_${formData.first_name}_${formData.last_name}_${Date.now()}.pdf`)
//           } else {
//             console.error("PDF 4 generation failed")
//           }
//         }, 2000)
        
//         setSuccess("✅ Successfully generated and downloaded 4 Jodpatras!")
//       }
      
//     } catch (error) {
//       console.error("Error generating PDFs:", error)
//       setError("Error generating PDFs: " + error.message)
//     } finally {
//       setTimeout(() => {
//         setGeneratingPdfs(false)
//       }, 3000)
//     }
//   }

//   const handleSubmit = async (values) => {
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(values).forEach(key => {
//         if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
//           formDataToSend.append(key, values[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully! Now generating PDFs...")
      
//       // Generate and download PDFs after successful submission
//       await generateAndDownloadPdfs(values)
      
//       setTimeout(() => {
//         if (onSuccess) onSuccess()
//       }, 3000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = (formik) => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <Field
//                   type="text"
//                   name="cluster_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
//                 <Field
//                   type="text"
//                   name="name_of_slum_area"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="name_of_slum_area" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation *</label>
//                 <Field
//                   type="text"
//                   name="municipal_corporation"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="municipal_corporation" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
//                 <Field
//                   as="select"
//                   name="ward"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </Field>
//                 <ErrorMessage name="ward" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
//                 <Field
//                   as="select"
//                   name="district"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </Field>
//                 <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka *</label>
//                 <Field
//                   as="select"
//                   name="taluka"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </Field>
//                 <ErrorMessage name="taluka" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <Field
//                   type="text"
//                   name="village"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <Field
//                   type="text"
//                   name="slum_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
//                 <Field
//                   as="select"
//                   name="slum_use"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Floor</label>
//                 <Field
//                   as="select"
//                   name="slum_floor"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <Field
//                   as="select"
//                   name="ownership_of_slum_land"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
//                 <Field
//                   as="select"
//                   name="survey_status"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </Field>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="plan_submitted"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="society_registered"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <Field
//                   type="text"
//                   name="first_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <Field
//                   type="text"
//                   name="middle_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <Field
//                   type="text"
//                   name="last_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <Field
//                   as="select"
//                   name="gender"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </Field>
//                 <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_number"
//                   maxLength="12"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
//                 <Field
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <Field
//                   type="text"
//                   name="spouse_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <Field
//                   type="email"
//                   name="user_email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <Field
//                   as="textarea"
//                   name="aadhaar_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
//                 <Field
//                   as="textarea"
//                   name="current_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_pincode"
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode</label>
//                 <Field
//                   type="text"
//                   name="current_pincode"
//                   maxLength="6"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number *</label>
//                 <Field
//                   type="tel"
//                   name="current_mobile_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <Field
//                   as="select"
//                   name="voter_card_type"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number</label>
//                 <Field
//                   type="text"
//                   name="voter_card_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏦</span>
//                 </div>
//                 Bank Details
//               </h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <Field
//                     type="text"
//                     name="bank_name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <Field
//                     type="text"
//                     name="account_number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <Field
//                     type="text"
//                     name="ifsc_code"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏠</span>
//                 </div>
//                 Slum Details
//               </h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('length', e.target.value)
//                       const length = parseFloat(e.target.value) || 0
//                       const width = parseFloat(formik.values.width) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="length" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('width', e.target.value)
//                       const width = parseFloat(e.target.value) || 0
//                       const length = parseFloat(formik.values.length) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="width" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <Field
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
//                   <Field
//                     type="number"
//                     name="residency_since"
//                     placeholder="1995"
//                     min="1950"
//                     max="2024"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                   <ErrorMessage name="residency_since" component="div" className="text-red-500 text-sm mt-1" />
//                   {formik.values.residency_since && (
//                     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//                       <p className="text-xs font-medium">
//                         <span className={parseInt(formik.values.residency_since) <= 1999 ? "text-green-600" : "text-blue-600"}>
//                           {parseInt(formik.values.residency_since) <= 1999 ? "1999 or before - Will generate 3 PDFs" : "2000 or after - Will generate 4 PDFs"}
//                         </span>
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 members)</h3>
            
//             <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members *</label>
//               <Field
//                 type="number"
//                 name="num_family_members"
//                 min="1"
//                 max="6"
//                 className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//               <ErrorMessage name="num_family_members" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50 shadow-sm hover:shadow-md transition-all">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                     <span className="text-white font-bold text-sm">{memberNum}</span>
//                   </div>
//                   Family Member {memberNum}
//                 </h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Name
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <Field
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Relation
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender
//                     </label>
//                     <Field
//                       as="select"
//                       name={`family_member${memberNum}_gender`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </Field>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Aadhaar Number
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       maxLength="12"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: '📷' },
//                 { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: '👨‍👩‍👧‍👦' },
//                 { name: 'doc_front_view', label: 'Front View Photo', accept: 'image/*', icon: '🏠' },
//                 { name: 'doc_side_view', label: 'Side View Photo', accept: 'image/*', icon: '🏗️' },
//                 { name: 'doc_before_2000', label: 'Document Before 2000', accept: 'image/*,.pdf,.doc,.docx', icon: '📄' },
//                 { name: 'submitted_docs_before_2000', label: 'Submitted Docs Before 2000', accept: 'image/*,.pdf', icon: '📋' },
//                 { name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: '📃' },
//                 { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: '🏡' },
//                 { name: 'Seldeclaration_letter', label: 'Self Declaration Letter', accept: 'image/*,.pdf', icon: '✍️' },
//                 { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: '🍚' },
//                 { name: 'document_upload', label: 'General Document', accept: 'image/*,.pdf,.doc,.docx', icon: '📁' },
//                 { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜' },
//                 { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
//                 { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' }
//               ].map(({ name, label, accept, icon }) => (
//                 <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl mr-2">{icon}</span>
//                     <h4 className="font-semibold text-gray-800">{label}</h4>
//                   </div>
//                   <input
//                     type="file"
//                     name={name}
//                     onChange={handleFileChange}
//                     accept={accept}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
//                   />
//                   {files[name] && (
//                     <div className="mt-2 p-2 bg-green-50 rounded flex items-center">
//                       <span className="text-green-500 text-sm mr-2">✅</span>
//                       <p className="text-sm text-green-700 truncate">{files[name].name}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )

//       default:
//         return (
//           <div className="text-center py-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3>
//             <p className="text-gray-600">Please review all your information and click submit to proceed.</p>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Progress Steps */}
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
//                   {currentStep >= step.id && (
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs">✓</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="ml-4 min-w-0">
//                   <p className={`text-sm font-semibold transition-colors ${
//                     currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'
//                   }`}>
//                     Step {step.id}
//                   </p>
//                   <p className={`text-xs truncate transition-colors ${
//                     currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
//                   }`}>
//                     {step.title}
//                   </p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full transition-all ${
//                     currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
//           {success && (
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">✅</span>
//               <span className="font-medium">{success}</span>
//             </div>
//           )}

//           {error && (
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">❌</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           {generatingPdfs && (
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div>
//               <span className="font-medium">Generating and downloading PDF documents...</span>
//             </div>
//           )}

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[currentStep]}
//             onSubmit={handleSubmit}
//           >
//             {(formik) => (
//               <Form>
//                 {renderStepContent(formik)}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 1}
//                     className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
//                       currentStep === 1
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                     Previous
//                   </button>

//                   <div className="text-center">
//                     <div className="text-sm font-medium text-gray-600">
//                       Step {currentStep} of {steps.length}
//                     </div>
//                     {formik.values.residency_since && currentStep === 4 && (
//                       <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//                         <span className={parseInt(formik.values.residency_since) <= 1999 ? "text-green-600 font-semibold" : "text-blue-600 font-semibold"}>
//                           {parseInt(formik.values.residency_since) <= 1999 ? "Will generate 3 Jodpatras" : "Will generate 4 Jodpatras"}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {currentStep < steps.length ? (
//                     <button
//                       type="button"
//                       onClick={() => nextStep(formik)}
//                       className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
//                     >
//                       Next
//                       <ChevronRight size={20} />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading || generatingPdfs || !formik.isValid}
//                       className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
//                         loading || generatingPdfs || !formik.isValid
//                           ? 'bg-gray-400 cursor-not-allowed shadow-md' 
//                           : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
//                       } text-white`}
//                     >
//                       {loading || generatingPdfs ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           {generatingPdfs ? 'Generating PDFs...' : 'Submitting...'}
//                         </>
//                       ) : (
//                         <>
//                           <Save size={20} />
//                           Submit & Generate PDFs
//                         </>
//                       )}
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

// export default ApplicationForm

// =================================================
// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download } from 'lucide-react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'

// const API_BASE_URL = "http://13.203.251.59:4200"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// // Enhanced validation schemas with proper field validation
// const validationSchemas = {
//   1: Yup.object({
//     slum_id: Yup.string().required('Slum ID is required'),
//     name_of_slum_area: Yup.string().required('Slum name is required'),
//     municipal_corporation: Yup.string().required('Municipal Corporation is required'),
//     ward: Yup.string().required('Ward is required'),
//     district: Yup.string().required('District is required'),
//     taluka: Yup.string().required('Taluka is required'),
//   }),
//   2: Yup.object({
//     first_name: Yup.string().required('First name is required'),
//     last_name: Yup.string().required('Last name is required'),
//     gender: Yup.string().required('Gender is required'),
//     aadhaar_number: Yup.string()
//       .matches(/^[0-9]{12}$/, 'Aadhaar number must be exactly 12 digits')
//       .required('Aadhaar number is required'),
//     aadhaar_mobile_number: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
//     user_email: Yup.string().email('Invalid email format'),
//   }),
//   3: Yup.object({
//     current_address: Yup.string().required('Current address is required'),
//     current_mobile_number: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
//       .required('Mobile number is required'),
//     current_pincode: Yup.string()
//       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     aadhaar_pincode: Yup.string()
//       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     voter_card_number: Yup.string()
//       .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),
//   }),
//   4: Yup.object({
//     residency_since: Yup.number()
//       .min(1950, 'Year must be after 1950')
//       .max(2024, 'Year cannot be in the future')
//       .required('Residency since is required'),
//     length: Yup.number().positive('Length must be positive'),
//     width: Yup.number().positive('Width must be positive'),
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

// const ApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)

//   const initialValues = {
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: ''
//   }

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = (formik) => {
//     // Validate current step before proceeding
//     const currentSchema = validationSchemas[currentStep]
//     if (currentSchema) {
//       formik.validateForm().then(errors => {
//         const stepErrors = Object.keys(errors).length > 0
//         if (!stepErrors) {
//           if (currentStep < steps.length) {
//             setCurrentStep(currentStep + 1)
//           }
//         }
//       })
//     } else {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1)
//       }
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   // Enhanced PDF generation with proper jodapatra-3 and jodapatra-4 download
//   const generateJodpatra3 = (data) => {
//     return new Promise((resolve) => {
//       const pdfElement = document.createElement('div')
//       pdfElement.style.width = '210mm'
//       pdfElement.style.minHeight = '297mm'
//       pdfElement.style.padding = '20mm'
//       pdfElement.style.fontFamily = 'Arial, sans-serif'
//       pdfElement.style.fontSize = '14px'
//       pdfElement.style.lineHeight = '1.5'
//       pdfElement.style.backgroundColor = 'white'
//       pdfElement.style.position = 'absolute'
//       pdfElement.style.top = '-9999px'

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//           <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - तीन</h3>
//           <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//           <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि. १.१.२००० अथवा त्यापूर्वीपासूनच्या संरक्षणपत्र झोपडीत दि. १.१.२००० अथवा त्यापूर्वीपासून राहणाऱ्या झोपडीवासीसाठी अर्ज.</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>अर्ज क्र: ${data.slum_id || 'ME_08403185'}</strong> <span style="float: right;"><strong>दिनांक:-${new Date().toLocaleDateString('en-GB')}</strong></span></p>
//           <p><strong>a. झोपडिवासियाचे नाव :-</strong> ${data.first_name || ''} ${data.middle_name || ''} ${data.last_name || ''}</p>
//           <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || ''}</p>
//           <p><strong>c. शहराचे नाव :-</strong> ${data.current_address || ''}</p>
//           <p><strong>d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- ${data.ward || ''}</strong></p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>e. झोपडिवासिय सध्याच्या झोपडीत केव्हापासून राहत आहे :- ${data.residency_since || ''} पासून</strong></p>
//           <p><strong>f. कुटुंबातील सदस्यांची संख्या:- ${data.num_family_members || ''}</strong></p>
          
//           <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//             <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे</p>
//           </div>
//         </div>

//         <div style="margin-top: 50px; text-align: center;">
//           <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//             <span style="font-size: 12px;">QR Code</span>
//           </div>
//           <p style="margin-top: 15px; font-size: 12px;"><strong>झोपडिवासियाची स्वाक्षरी / अंगठा निशाणी</strong></p>
//           <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमांक : ${data.current_mobile_number || '0000000000'}</strong></p>
//         </div>
//       `

//       document.body.appendChild(pdfElement)
      
//       // Create a simple PDF content
//       setTimeout(() => {
//         const canvas = document.createElement('canvas')
//         const ctx = canvas.getContext('2d')
//         canvas.width = 595  // A4 width in pixels at 72 DPI
//         canvas.height = 842 // A4 height in pixels at 72 DPI
        
//         // Fill background
//         ctx.fillStyle = 'white'
//         ctx.fillRect(0, 0, canvas.width, canvas.height)
        
//         // Add text content
//         ctx.fillStyle = 'black'
//         ctx.font = '16px Arial'
//         ctx.textAlign = 'center'
//         ctx.fillText('जोडपत्र - तीन', canvas.width / 2, 50)
//         ctx.fillText(`अर्ज क्र: ${data.slum_id || ''}`, canvas.width / 2, 100)
//         ctx.fillText(`नाव: ${data.first_name || ''} ${data.last_name || ''}`, canvas.width / 2, 150)
//         ctx.fillText(`वर्ष: ${data.residency_since || ''}`, canvas.width / 2, 200)
        
//         const imgData = canvas.toDataURL('image/png')
        
//         // Create download link
//         const link = document.createElement('a')
//         link.href = imgData
//         link.download = `Jodpatra_3_${data.first_name}_${data.last_name}_${Date.now()}.png`
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)
//         document.body.removeChild(pdfElement)
//         resolve(true)
//       }, 1000)
//     })
//   }

//   const generateJodpatra4 = (data) => {
//     return new Promise((resolve) => {
//       const pdfElement = document.createElement('div')
//       pdfElement.style.width = '210mm'
//       pdfElement.style.minHeight = '297mm'
//       pdfElement.style.padding = '20mm'
//       pdfElement.style.fontFamily = 'Arial, sans-serif'
//       pdfElement.style.fontSize = '14px'
//       pdfElement.style.lineHeight = '1.5'
//       pdfElement.style.backgroundColor = 'white'
//       pdfElement.style.position = 'absolute'
//       pdfElement.style.top = '-9999px'

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h2 style="margin: 0; font-size: 18px; font-weight: bold;">नियंत्रक शासन कमालय: प्रचंड-१००१/प्र.क्र.१०४१/झोपडपट्टी-१</h2>
//           <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - चार</h3>
//           <p style="margin: 5px 0; font-size: 12px;">(खास नियंत्रक प्राधिकरण विभाग म. झोपडपट्टी-१००१/प्र.क्र.१०४१/झोपडपट्टी-१, दिनांक १३ मे२०१४)</p>
//           <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि.१.१.२००० च त्यानुकार सरकारपास्ण झोपडपट्टी २००० नंतरचे अर्ज.</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p><strong>अर्ज क्र: ${data.slum_id || 'UJ100071'}</strong> <span style="float: right;"><strong>दिनांक:-${new Date().toLocaleDateString('en-GB')}</strong></span></p>
//           <p><strong>a. झोपडधारकाचे नाव :-</strong> ${data.first_name || ''} ${data.middle_name || ''} ${data.last_name || ''}</p>
//           <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || ''}, ${data.current_address || ''}</p>
//           <p><strong>c. राहण्याचे वर्ष :-</strong> ${data.residency_since || ''}</p>
//           <p><strong>d. महासंकेत/महानगरपालिका क्र. :-</strong> ${data.cluster_number || ''}</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//             <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे</p>
//             <p style="text-align: center; font-size: 10px;">${data.first_name || ''} ${data.last_name || ''}</p>
//           </div>
//         </div>

//         <div style="margin-top: 50px; text-align: center;">
//           <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//             <span style="font-size: 12px;">QR Code</span>
//           </div>
//           <p style="margin-top: 15px; font-size: 12px;"><strong>झोपडधारकाची स्वाक्षरी / अंगठा निशाणी</strong></p>
//           <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमांक : ${data.current_mobile_number || '0000000000'}</strong></p>
//         </div>
//       `

//       document.body.appendChild(pdfElement)
      
//       // Create a simple PDF content
//       setTimeout(() => {
//         const canvas = document.createElement('canvas')
//         const ctx = canvas.getContext('2d')
//         canvas.width = 595  // A4 width in pixels at 72 DPI
//         canvas.height = 842 // A4 height in pixels at 72 DPI
        
//         // Fill background
//         ctx.fillStyle = 'white'
//         ctx.fillRect(0, 0, canvas.width, canvas.height)
        
//         // Add text content
//         ctx.fillStyle = 'black'
//         ctx.font = '16px Arial'
//         ctx.textAlign = 'center'
//         ctx.fillText('जोडपत्र - चार', canvas.width / 2, 50)
//         ctx.fillText(`अर्ज क्र: ${data.slum_id || ''}`, canvas.width / 2, 100)
//         ctx.fillText(`नाव: ${data.first_name || ''} ${data.last_name || ''}`, canvas.width / 2, 150)
//         ctx.fillText(`वर्ष: ${data.residency_since || ''} (2000 नंतर)`, canvas.width / 2, 200)
        
//         const imgData = canvas.toDataURL('image/png')
        
//         // Create download link
//         const link = document.createElement('a')
//         link.href = imgData
//         link.download = `Jodpatra_4_${data.first_name}_${data.last_name}_${Date.now()}.png`
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)
//         document.body.removeChild(pdfElement)
//         resolve(true)
//       }, 1000)
//     })
//   }

//   const generateAndDownloadPdfs = async (formData) => {
//     setGeneratingPdfs(true)
    
//     try {
//       const residencyYear = parseInt(formData.residency_since) || 2000
//       console.log("Residency year:", residencyYear)
      
//       if (residencyYear <= 1999) {
//         // Generate jodpatra-3 for before 2000
//         setSuccess("Generating Jodpatra-3 for residency before 2000...")
//         console.log("Generating Jodpatra-3 for year:", residencyYear)
        
//         await generateJodpatra3(formData)
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-3!")
        
//       } else {
//         // Generate jodpatra-4 for 2000 or after
//         setSuccess("Generating Jodpatra-4 for residency 2000 or after...")
//         console.log("Generating Jodpatra-4 for year:", residencyYear)
        
//         await generateJodpatra4(formData)
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-4!")
//       }
      
//     } catch (error) {
//       console.error("Error generating PDFs:", error)
//       setError("Error generating PDFs: " + error.message)
//     } finally {
//       setTimeout(() => {
//         setGeneratingPdfs(false)
//       }, 3000)
//     }
//   }

//   const handleSubmit = async (values) => {
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(values).forEach(key => {
//         if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
//           formDataToSend.append(key, values[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully! Now generating PDFs...")
      
//       // Generate and download PDFs after successful submission
//       await generateAndDownloadPdfs(values)
      
//       setTimeout(() => {
//         if (onSuccess) onSuccess()
//       }, 3000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = (formik) => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <Field
//                   type="text"
//                   name="cluster_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
//                 <Field
//                   type="text"
//                   name="name_of_slum_area"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="name_of_slum_area" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation *</label>
//                 <Field
//                   type="text"
//                   name="municipal_corporation"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="municipal_corporation" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
//                 <Field
//                   as="select"
//                   name="ward"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </Field>
//                 <ErrorMessage name="ward" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
//                 <Field
//                   as="select"
//                   name="district"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </Field>
//                 <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka *</label>
//                 <Field
//                   as="select"
//                   name="taluka"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </Field>
//                 <ErrorMessage name="taluka" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <Field
//                   type="text"
//                   name="village"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <Field
//                   type="text"
//                   name="slum_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
//                 <Field
//                   as="select"
//                   name="slum_use"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Floor</label>
//                 <Field
//                   as="select"
//                   name="slum_floor"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <Field
//                   as="select"
//                   name="ownership_of_slum_land"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
//                 <Field
//                   as="select"
//                   name="survey_status"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </Field>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="plan_submitted"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="society_registered"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <Field
//                   type="text"
//                   name="first_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <Field
//                   type="text"
//                   name="middle_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <Field
//                   type="text"
//                   name="last_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <Field
//                   as="select"
//                   name="gender"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </Field>
//                 <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number (12 digits) *</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_number"
//                   maxLength="12"
//                   placeholder="123456789012"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number (10 digits)</label>
//                 <Field
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <Field
//                   type="text"
//                   name="spouse_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <Field
//                   type="email"
//                   name="user_email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <Field
//                   as="textarea"
//                   name="aadhaar_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
//                 <Field
//                   as="textarea"
//                   name="current_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="current_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number (10 digits) *</label>
//                 <Field
//                   type="tel"
//                   name="current_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <Field
//                   as="select"
//                   name="voter_card_type"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number (10 digits)</label>
//                 <Field
//                   type="text"
//                   name="voter_card_number"
//                   maxLength="10"
//                   placeholder="ABC1234567"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏦</span>
//                 </div>
//                 Bank Details
//               </h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <Field
//                     type="text"
//                     name="bank_name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <Field
//                     type="text"
//                     name="account_number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <Field
//                     type="text"
//                     name="ifsc_code"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏠</span>
//                 </div>
//                 Slum Details
//               </h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('length', e.target.value)
//                       const length = parseFloat(e.target.value) || 0
//                       const width = parseFloat(formik.values.width) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="length" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('width', e.target.value)
//                       const width = parseFloat(e.target.value) || 0
//                       const length = parseFloat(formik.values.length) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="width" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <Field
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
//                   <Field
//                     type="number"
//                     name="residency_since"
//                     placeholder="1995"
//                     min="1950"
//                     max="2024"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                   <ErrorMessage name="residency_since" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                   {formik.values.residency_since && (
//                     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//                       <p className="text-xs font-medium">
//                         <span className={parseInt(formik.values.residency_since) <= 1999 ? "text-green-600" : "text-blue-600"}>
//                           {parseInt(formik.values.residency_since) <= 1999 ? "1999 या आधी - Jodpatra-3 तयार होईल" : "2000 किंवा नंतर - Jodpatra-4 तयार होईल"}
//                         </span>
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 members)</h3>
            
//             <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members *</label>
//               <Field
//                 type="number"
//                 name="num_family_members"
//                 min="1"
//                 max="6"
//                 className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//               <ErrorMessage name="num_family_members" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50 shadow-sm hover:shadow-md transition-all">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                     <span className="text-white font-bold text-sm">{memberNum}</span>
//                   </div>
//                   Family Member {memberNum}
//                 </h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Name
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <Field
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Relation
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender
//                     </label>
//                     <Field
//                       as="select"
//                       name={`family_member${memberNum}_gender`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </Field>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Aadhaar Number (12 digits)
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       maxLength="12"
//                       placeholder="123456789012"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: '📷' },
//                 { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: '👨‍👩‍👧‍👦' },
//                 { name: 'doc_front_view', label: 'Front View Photo', accept: 'image/*', icon: '🏠' },
//                 { name: 'doc_side_view', label: 'Side View Photo', accept: 'image/*', icon: '🏗️' },
//                 { name: 'doc_before_2000', label: 'Document Before 2000', accept: 'image/*,.pdf,.doc,.docx', icon: '📄' },
//                 { name: 'submitted_docs_before_2000', label: 'Submitted Docs Before 2000', accept: 'image/*,.pdf', icon: '📋' },
//                 { name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: '📃' },
//                 { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: '🏡' },
//                 { name: 'Seldeclaration_letter', label: 'Self Declaration Letter', accept: 'image/*,.pdf', icon: '✍️' },
//                 { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: '🍚' },
//                 { name: 'document_upload', label: 'General Document', accept: 'image/*,.pdf,.doc,.docx', icon: '📁' },
//                 { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜' },
//                 { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
//                 { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' }
//               ].map(({ name, label, accept, icon }) => (
//                 <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl mr-2">{icon}</span>
//                     <h4 className="font-semibold text-gray-800">{label}</h4>
//                   </div>
//                   <input
//                     type="file"
//                     name={name}
//                     onChange={handleFileChange}
//                     accept={accept}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
//                   />
//                   {files[name] && (
//                     <div className="mt-2 p-2 bg-green-50 rounded flex items-center">
//                       <span className="text-green-500 text-sm mr-2">✅</span>
//                       <p className="text-sm text-green-700 truncate">{files[name].name}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )

//       default:
//         return (
//           <div className="text-center py-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3>
//             <p className="text-gray-600">Please review all your information and click submit to proceed.</p>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Progress Steps */}
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
//                   {currentStep >= step.id && (
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs">✓</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="ml-4 min-w-0">
//                   <p className={`text-sm font-semibold transition-colors ${
//                     currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'
//                   }`}>
//                     Step {step.id}
//                   </p>
//                   <p className={`text-xs truncate transition-colors ${
//                     currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
//                   }`}>
//                     {step.title}
//                   </p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full transition-all ${
//                     currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
//           {success && (
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">✅</span>
//               <span className="font-medium">{success}</span>
//             </div>
//           )}

//           {error && (
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">❌</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           {generatingPdfs && (
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div>
//               <span className="font-medium">Generating and downloading PDF documents...</span>
//             </div>
//           )}

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[currentStep]}
//             onSubmit={handleSubmit}
//           >
//             {(formik) => (
//               <Form>
//                 {renderStepContent(formik)}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 1}
//                     className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
//                       currentStep === 1
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                     Previous
//                   </button>

//                   <div className="text-center">
//                     <div className="text-sm font-medium text-gray-600">
//                       Step {currentStep} of {steps.length}
//                     </div>
//                     {formik.values.residency_since && currentStep === 4 && (
//                       <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//                         <span className={parseInt(formik.values.residency_since) <= 1999 ? "text-green-600 font-semibold" : "text-blue-600 font-semibold"}>
//                           {parseInt(formik.values.residency_since) <= 1999 ? "Jodpatra-3 तयार होईल" : "Jodpatra-4 तयार होईल"}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {currentStep < steps.length ? (
//                     <button
//                       type="button"
//                       onClick={() => nextStep(formik)}
//                       className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
//                     >
//                       Next
//                       <ChevronRight size={20} />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading || generatingPdfs || !formik.isValid}
//                       className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
//                         loading || generatingPdfs || !formik.isValid
//                           ? 'bg-gray-400 cursor-not-allowed shadow-md' 
//                           : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
//                       } text-white`}
//                     >
//                       {loading || generatingPdfs ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           {generatingPdfs ? 'Generating PDFs...' : 'Submitting...'}
//                         </>
//                       ) : (
//                         <>
//                           <Save size={20} />
//                           Submit & Generate PDFs
//                         </>
//                       )}
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



// export default ApplicationForm


// ==================================================================================================================

// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download } from 'lucide-react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import html2canvas from 'html2canvas';

// import jsPDF from 'jspdf'



// // const API_BASE_URL = "http://13.203.251.59:4200"
// const API_BASE_URL = "https://sra.saavi.co.in"


// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// // Enhanced validation schemas with proper field validation
// const validationSchemas = {
//   1: Yup.object({
//     slum_id: Yup.string().required('Slum ID is required'),
//     name_of_slum_area: Yup.string().required('Slum name is required'),
//     municipal_corporation: Yup.string().required('Municipal Corporation is required'),
//     ward: Yup.string().required('Ward is required'),
//     district: Yup.string().required('District is required'),
//     taluka: Yup.string().required('Taluka is required'),
//   }),
//   2: Yup.object({
//     first_name: Yup.string().required('First name is required'),
//     last_name: Yup.string().required('Last name is required'),
//     gender: Yup.string().required('Gender is required'),
//     aadhaar_number: Yup.string()
//       .matches(/^[0-9]{12}$/, 'Aadhaar number must be exactly 12 digits')
//       .required('Aadhaar number is required'),
//     aadhaar_mobile_number: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
//     user_email: Yup.string().email('Invalid email format'),
//   }),
//   3: Yup.object({
//     current_address: Yup.string().required('Current address is required'),
//     current_mobile_number: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
//       .required('Mobile number is required'),
//     current_pincode: Yup.string()
//       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     aadhaar_pincode: Yup.string()
//       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     voter_card_number: Yup.string()
//       .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),
//   }),
//   4: Yup.object({
//     residency_since: Yup.number()
//       .min(1950, 'Year must be after 1950')
//       .max(2024, 'Year cannot be in the future')
//       .required('Residency since is required'),
//     length: Yup.number().positive('Length must be positive'),
//     width: Yup.number().positive('Width must be positive'),
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

// const ApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)

//   const initialValues = {
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: ''
//   }

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = (formik) => {
//     // Validate current step before proceeding
//     const currentSchema = validationSchemas[currentStep]
//     if (currentSchema) {
//       formik.validateForm().then(errors => {
//         const stepErrors = Object.keys(errors).length > 0
//         if (!stepErrors) {
//           if (currentStep < steps.length) {
//             setCurrentStep(currentStep + 1)
//           }
//         }
//       })
//     } else {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1)
//       }
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   // PDF Generation Functions
//   // const generateJodpatra3 = (data) => {
//   //   return new Promise((resolve) => {
//   //     const pdfElement = document.createElement('div')
//   //     pdfElement.style.width = '210mm'
//   //     pdfElement.style.minHeight = '297mm'
//   //     pdfElement.style.padding = '20mm'
//   //     pdfElement.style.fontFamily = 'Arial, sans-serif'
//   //     pdfElement.style.fontSize = '14px'
//   //     pdfElement.style.lineHeight = '1.5'
//   //     pdfElement.style.backgroundColor = 'white'
//   //     pdfElement.style.position = 'absolute'
//   //     pdfElement.style.top = '-9999px'

//   //     pdfElement.innerHTML = `
//   //       <div style="text-align: center; margin-bottom: 30px;">
//   //         <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//   //         <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - तीन</h3>
//   //         <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//   //         <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि. १.१.२००० अथवा त्यापूर्वीपासूनच्या संरक्षणपत्र झोपडीत दि. १.१.२००० अथवा त्यापूर्वीपासून राहणाऱ्या झोपडीवासीसाठी अर्ज.</p>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>अर्ज क्र: ${data.slum_id || 'ME_08403185'}</strong> <span style="float: right;"><strong>दिनांक:-${new Date().toLocaleDateString('en-GB')}</strong></span></p>
//   //         <p><strong>a. झोपडिवासियाचे नाव :- :-</strong> ${data.first_name || 'RABIYA'} ${data.middle_name || ''} ${data.last_name || 'YAQOOB'}</p>
//   //         <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || 'RAFIQ NAGAR SHIVAJI NAGAR GOVANDI, MUMBAI'}</p>
//   //         <p><strong>c. शहराचे नाव :-</strong> ${data.current_address || 'Mumbai'}</p>
//   //         <p><strong>d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- ${data.ward || 'M/E'}</strong></p>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>e. झोपडिवासिय सध्याच्या झोपडीत केव्हापासून राहत आहे :-${data.residency_since || '01/02/1999'}</strong></p>
//   //         <p><strong>f. कुटुंबातील सदस्यांची नावे:-</strong></p>
          
//   //         <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//   //           <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे - </p>
//   //         </div>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>g. झोपडी दि. ०१.०१.२००० रोजी अथवा त्यापूर्वी अस्तित्वात असताना अस्तित्वप्रमाण आणि झोपडिवासी त्या ठिकाणी राहत असण्याचा साक्षीदाराने सादर केलेला पुरावा :-</strong></p>
//   //         <p><strong>(अ) विवरणपत्रातील सादर केलेला पुरावा/पुराव्यांचे अनुक्रमांक :-Proof NA</strong></p>
          
//   //         <div style="text-align: center; margin: 20px 0;">
//   //           <p><strong>आणि</strong></p>
//   //         </div>
          
//   //         <p><strong>h.झोपडिवासिय सध्याचा त्या झोपडीत प्रत्यक्ष राहत असण्याबद्दलचा अलिकडच्या एका वर्षातील पुरावा :-</strong></p>
          
//   //         <p><strong>(अ) विवरणपत्रातील सादर केलेला पुरावा/पुराव्यांचे अनुक्रमांक :-Electricity Bill</strong></p>
//   //         <p>i.दिनांक एप्रिल, २०१५ च्या शासन आदेशातील परिच्छेद क्रमांक ३ नुसार स्वतःचा फोटो असलेल्या साध्या कागदावर स्वयं घोषणापत्र आहे व "पुरावे साक्षांकनासाठी स्वयं घोषणापत्र":-आहे.</p>
//   //       </div>

//   //       <div style="margin-top: 40px; text-align: center;">
//   //         <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//   //           <span style="font-size: 12px;">QR Code</span>
//   //         </div>
//   //         <p style="margin-top: 10px; font-size: 12px;"><strong>झोपडिवासियाची सही / अंगठा निशाणी</strong></p>
//   //         <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमाक :${data.current_mobile_number || '8957015366'}</strong></p>
//   //       </div>
//   //     `

//   //     document.body.appendChild(pdfElement)
      
//   //     // Generate PDF using HTML to Canvas
//   //     setTimeout(() => {
//   //       // Create download function
//   //       const createPDFDownload = () => {
//   //         const element = pdfElement
//   //         const opt = {
//   //           margin: 1,
//   //           filename: `Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`,
//   //           image: { type: 'jpeg', quality: 0.98 },
//   //           html2canvas: { scale: 2 },
//   //           jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//   //         }
          
//   //         // Simple PDF generation alternative using canvas
//   //         const canvas = document.createElement('canvas')
//   //         const ctx = canvas.getContext('2d')
//   //         canvas.width = 2480  // A4 width in pixels at 300 DPI
//   //         canvas.height = 3508 // A4 height in pixels at 300 DPI
          
//   //         // White background
//   //         ctx.fillStyle = 'white'
//   //         ctx.fillRect(0, 0, canvas.width, canvas.height)
          
//   //         // Header
//   //         ctx.fillStyle = 'black'
//   //         ctx.font = 'bold 48px Arial'
//   //         ctx.textAlign = 'center'
//   //         ctx.fillText('निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१', canvas.width / 2, 150)
          
//   //         ctx.font = 'bold 42px Arial'
//   //         ctx.fillText('जोडपत्र - तीन', canvas.width / 2, 220)
          
//   //         ctx.font = '32px Arial'
//   //         ctx.fillText('(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१)', canvas.width / 2, 280)
          
//   //         ctx.font = 'bold 36px Arial'
//   //         ctx.fillText('दि. १.१.२००० अथवा त्यापूर्वीपासूनच्या संरक्षणपत्र झोपडीत', canvas.width / 2, 340)
//   //         ctx.fillText('दि. १.१.२००० अथवा त्यापूर्वीपासून राहणाऱ्या झोपडीवासीसाठी अर्ज.', canvas.width / 2, 380)
          
//   //         // Form details
//   //         ctx.font = '32px Arial'
//   //         ctx.textAlign = 'left'
//   //         const leftMargin = 100
//   //         let yPos = 480
          
//   //         ctx.fillText(`अर्ज क्र: ${data.slum_id || 'ME_08403185'}`, leftMargin, yPos)
//   //         ctx.textAlign = 'right'
//   //         ctx.fillText(`दिनांक:-${new Date().toLocaleDateString('en-GB')}`, canvas.width - 100, yPos)
          
//   //         ctx.textAlign = 'left'
//   //         yPos += 60
//   //         ctx.fillText(`a. झोपडिवासियाचे नाव :- ${data.first_name || 'RABIYA'} ${data.middle_name || ''} ${data.last_name || 'YAQOOB'}`, leftMargin, yPos)
          
//   //         yPos += 60
//   //         ctx.fillText(`b. झोपडपट्टीचे नाव व ठिकाण :- ${data.name_of_slum_area || 'RAFIQ NAGAR SHIVAJI NAGAR'}`, leftMargin, yPos)
          
//   //         yPos += 60
//   //         ctx.fillText(`c. शहराचे नाव :- ${data.current_address || 'Mumbai'}`, leftMargin, yPos)
          
//   //         yPos += 60
//   //         ctx.fillText(`d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- ${data.ward || 'M/E'}`, leftMargin, yPos)
          
//   //         yPos += 80
//   //         ctx.fillText(`e. झोपडिवासिय सध्याच्या झोपडीत केव्हापासून राहत आहे :- ${data.residency_since || '1999'} पासून`, leftMargin, yPos)
          
//   //         yPos += 60
//   //         ctx.fillText(`f. कुटुंबातील सदस्यांची संख्या:- ${data.num_family_members || ''}`, leftMargin, yPos)
          
//   //         // Photo box
//   //         yPos += 100
//   //         ctx.strokeStyle = 'black'
//   //         ctx.lineWidth = 3
//   //         ctx.strokeRect(leftMargin, yPos, 300, 200)
//   //         ctx.font = '24px Arial'
//   //         ctx.textAlign = 'center'
//   //         ctx.fillText('फोटो स्कॅन केले पाहिजे', leftMargin + 150, yPos + 110)
          
//   //         // Footer
//   //         yPos = canvas.height - 400
//   //         ctx.textAlign = 'center'
//   //         ctx.strokeRect(canvas.width/2 - 100, yPos, 200, 200)
//   //         ctx.font = '24px Arial'
//   //         ctx.fillText('QR Code', canvas.width/2, yPos + 110)
          
//   //         yPos += 250
//   //         ctx.font = 'bold 28px Arial'
//   //         ctx.fillText('झोपडिवासियाची स्वाक्षरी / अंगठा निशाणी', canvas.width/2, yPos)
          
//   //         yPos += 50
//   //         ctx.fillText(`भ्रमणदूरध्वनी क्रमांक : ${data.current_mobile_number || '0000000000'}`, canvas.width/2, yPos)
          
//   //         // Convert to blob and download
//   //         canvas.toBlob((blob) => {
//   //           const url = URL.createObjectURL(blob)
//   //           const link = document.createElement('a')
//   //           link.href = url
//   //           link.download = `Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.png`
//   //           document.body.appendChild(link)
//   //           link.click()
//   //           document.body.removeChild(link)
//   //           URL.revokeObjectURL(url)
//   //           resolve(true)
//   //         })
//   //       }
        
//   //       createPDFDownload()
//   //       document.body.removeChild(pdfElement)
//   //     }, 1000)
//   //   })
//   // }


//   // const generateJodpatra3 = (data) => {
//   //   return new Promise((resolve) => {
//   //     const pdfElement = document.createElement('div')
//   //     pdfElement.style.width = '210mm'
//   //     pdfElement.style.minHeight = '297mm'
//   //     pdfElement.style.padding = '20mm'
//   //     pdfElement.style.fontFamily = 'Arial, sans-serif'
//   //     pdfElement.style.fontSize = '14px'
//   //     pdfElement.style.lineHeight = '1.5'
//   //     pdfElement.style.backgroundColor = 'white'
//   //     pdfElement.style.position = 'absolute'
//   //     pdfElement.style.top = '-9999px'

//   //     pdfElement.innerHTML = `
//   //       <div style="text-align: center; margin-bottom: 30px;">
//   //         <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//   //         <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - तीन</h3>
//   //         <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//   //         <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि. १.१.२००० अथवा त्यापूर्वीपासूनच्या संरक्षणपत्र झोपडीत दि. १.१.२००० अथवा त्यापूर्वीपासून राहणाऱ्या झोपडीवासीसाठी अर्ज.</p>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>अर्ज क्र: ${data.slum_id || 'ME_08403185'}</strong> <span style="float: right;"><strong>दिनांक:-${new Date().toLocaleDateString('en-GB')}</strong></span></p>
//   //         <p><strong>a. झोपडिवासियाचे नाव :-</strong> ${data.first_name || ''} ${data.middle_name || ''} ${data.last_name || ''}</p>
//   //         <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || ''}</p>
//   //         <p><strong>c. शहराचे नाव :-</strong> ${data.current_address || ''}</p>
//   //         <p><strong>d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- ${data.ward || ''}</strong></p>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>e. झोपडिवासिय सध्याच्या झोपडीत केव्हापासून राहत आहे :- ${data.residency_since || ''} पासून</strong></p>
//   //         <p><strong>f. कुटुंबातील सदस्यांची संख्या:- ${data.num_family_members || ''}</strong></p>
          
//   //         <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//   //           <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे</p>
//   //         </div>
//   //       </div>

//   //       <div style="margin-top: 50px; text-align: center;">
//   //         <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//   //           <span style="font-size: 12px;">QR Code</span>
//   //         </div>
//   //         <p style="margin-top: 15px; font-size: 12px;"><strong>झोपडिवासियाची स्वाक्षरी / अंगठा निशाणी</strong></p>
//   //         <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमांक : ${data.current_mobile_number || '0000000000'}</strong></p>
//   //       </div>
//   //     `

//   //     document.body.appendChild(pdfElement)
      
//   //     // Create a simple PDF content
//   //     setTimeout(() => {
//   //       const canvas = document.createElement('canvas')
//   //       const ctx = canvas.getContext('2d')
//   //       canvas.width = 595  // A4 width in pixels at 72 DPI
//   //       canvas.height = 842 // A4 height in pixels at 72 DPI
        
//   //       // Fill background
//   //       ctx.fillStyle = 'white'
//   //       ctx.fillRect(0, 0, canvas.width, canvas.height)
        
//   //       // Add text content
//   //       ctx.fillStyle = 'black'
//   //       ctx.font = '16px Arial'
//   //       ctx.textAlign = 'center'
//   //       ctx.fillText('जोडपत्र - तीन', canvas.width / 2, 50)
//   //       ctx.fillText(`अर्ज क्र: ${data.slum_id || ''}`, canvas.width / 2, 100)
//   //       ctx.fillText(`नाव: ${data.first_name || ''} ${data.last_name || ''}`, canvas.width / 2, 150)
//   //       ctx.fillText(`वर्ष: ${data.residency_since || ''}`, canvas.width / 2, 200)
        
//   //       const imgData = canvas.toDataURL('image/png')
        
//   //       // Create download link
//   //       const link = document.createElement('a')
//   //       link.href = imgData
//   //       link.download = `Jodpatra_3_${data.first_name}_${data.last_name}_${Date.now()}.png`
//   //       document.body.appendChild(link)
//   //       link.click()
//   //       document.body.removeChild(link)
//   //       document.body.removeChild(pdfElement)
//   //       resolve(true)
//   //     }, 1000)
//   //   })
//   // }


// // ----------------------------------------------

//  // PDF Generation Functions
//   // const generateJodpatra3 = (data) => {
//   //   return new Promise((resolve) => {
//   //     const pdfElement = document.createElement('div')
//   //     pdfElement.style.width = '210mm'
//   //     pdfElement.style.minHeight = '297mm'
//   //     pdfElement.style.padding = '20mm'
//   //     pdfElement.style.fontFamily = 'Arial, sans-serif'
//   //     pdfElement.style.fontSize = '14px'
//   //     pdfElement.style.lineHeight = '1.5'
//   //     pdfElement.style.backgroundColor = 'white'
//   //     pdfElement.style.position = 'absolute'
//   //     pdfElement.style.top = '-9999px'

//   //     pdfElement.innerHTML = `
//   //       <div style="text-align: center; margin-bottom: 30px;">
//   //         <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//   //         <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - तीन</h3>
//   //         <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//   //         <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि. १.१.२००० अथवा त्यापूर्वीपासूनच्या संरक्षणपत्र झोपडीत दि. १.१.२००० अथवा त्यापूर्वीपासून राहणाऱ्या झोपडीवासीसाठी अर्ज.</p>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>अर्ज क्र: ${data.slum_id || 'ME_08403185'}</strong> <span style="float: right;"><strong>दिनांक:-07/06/2025</strong></span></p>
//   //         <p><strong>a. झोपडिवासियाचे नाव :- :-</strong> ${data.first_name || 'RABIYA'} ${data.last_name || 'YAQOOB'}</p>
//   //         <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || 'RAFIQ NAGAR SHIVAJI NAGAR GOVANDI, MUMBAI'}</p>
//   //         <p><strong>c. शहराचे नाव :-</strong> ${data.current_address || 'Akuri'}</p>
//   //         <p><strong>d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- M/E</strong>ME</p>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>e. झोपडिवासिय सध्याच्या झोपडीत केव्हापासून राहत आहे :-01/02/1999</strong></p>
//   //         <p><strong>f. कुटुंबातील सदस्यांची नावे:-</strong></p>
          
//   //         <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//   //           <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे - </p>
//   //         </div>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>g. झोपडी दि. ०१.०१.२००० रोजी अथवा त्यापूर्वी अस्तित्वात असताना अस्तित्वप्रमाण आणि झोपडिवासी त्या ठिकाणी राहत असण्याचा साक्षीदाराने सादर केलेला पुरावा :-</strong></p>
//   //         <p><strong>(अ) विवरणपत्रातील सादर केलेला पुरावा/पुराव्यांचे अनुक्रमांक :-Proof NA</strong></p>
          
//   //         <div style="text-align: center; margin: 20px 0;">
//   //           <p><strong>आणि</strong></p>
//   //         </div>
          
//   //         <p><strong>h.झोपडिवासिय सध्याचा त्या झोपडीत प्रत्यक्ष राहत असण्याबद्दलचा अलिकडच्या एका वर्षातील पुरावा :-</strong></p>
          
//   //         <p><strong>(अ) विवरणपत्रातील सादर केलेला पुरावा/पुराव्यांचे अनुक्रमांक :-Electricity Bill</strong></p>
//   //         <p>i.दिनांक एप्रिल, २०१५ च्या शासन आदेशातील परिच्छेद क्रमांक ३ नुसार स्वतःचा फोटो असलेल्या साध्या कागदावर स्वयं घोषणापत्र आहे व "पुरावे साक्षांकनासाठी स्वयं घोषणापत्र":-आहे.</p>
//   //       </div>

//   //       <div style="margin-top: 40px; text-align: center;">
//   //         <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//   //           <span style="font-size: 12px;">QR Code</span>
//   //         </div>
//   //         <p style="margin-top: 10px; font-size: 12px;"><strong>झोपडिवासियाची सही / अंगठा निशाणी</strong></p>
//   //         <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमाक :8957015366</strong></p>
//   //       </div>
//   //     `

//   //     document.body.appendChild(pdfElement)
      
//   //     setTimeout(() => {
//   //       html2canvas(pdfElement, {
//   //         scale: 2,
//   //         useCORS: true,
//   //         allowTaint: true
//   //       }).then(canvas => {
//   //         const imgData = canvas.toDataURL('image/png')
//   //         const pdf = new jsPDF('p', 'mm', 'a4')
//   //         const imgProps = pdf.getImageProperties(imgData)
//   //         const pdfWidth = pdf.internal.pageSize.getWidth()
//   //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          
//   //         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//   //         document.body.removeChild(pdfElement)
//   //         resolve(pdf)
//   //       }).catch(() => {
//   //         document.body.removeChild(pdfElement)
//   //         resolve(null)
//   //       })
//   //     }, 1000)
//   //   })
//   // }
// // -----------------------------------------------------------

// const generateJodpatra3 = (data) => {
//   return new Promise((resolve, reject) => {
//     const pdfElement = document.createElement("div");
//     pdfElement.style.width = "210mm";
//     pdfElement.style.minHeight = "297mm";
//     pdfElement.style.padding = "20mm";
//     pdfElement.style.fontFamily = "Arial, sans-serif";
//     pdfElement.style.fontSize = "14px";
//     pdfElement.style.lineHeight = "1.5";
//     pdfElement.style.backgroundColor = "white";
//     pdfElement.style.position = "absolute";
//     pdfElement.style.top = "-9999px";

//     // तुमचं HTML लेआउट
//     pdfElement.innerHTML = `
//       <div style="text-align: center; margin-bottom: 30px;">
//         <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//         <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - तीन</h3>
//         <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//         <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि. १.१.२००० अथवा त्यापूर्वीपासूनच्या संरक्षणपत्र झोपडीत दि. १.१.२००० अथवा त्यापूर्वीपासून राहणाऱ्या झोपडीवासीसाठी अर्ज.</p>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p><strong>अर्ज क्र: ${data.slum_id || "ME_08403185"}</strong> 
//         <span style="float: right;"><strong>दिनांक:-${new Date().toLocaleDateString("en-GB")}</strong></span></p>
//         <p><strong>a. झोपडिवासियाचे नाव :-</strong> ${data.first_name || "RABIYA"} ${data.last_name || "YAQOOB"}</p>
//         <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || "RAFIQ NAGAR SHIVAJI NAGAR GOVANDI, MUMBAI"}</p>
//         <p><strong>c. शहराचे नाव :-</strong> ${data.current_address || "Akuri"}</p>
//         <p><strong>d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- ${data.ward || "M/E"}</strong></p>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p><strong>e. झोपडिवासिय सध्याच्या झोपडीत केव्हापासून राहत आहे :- ${data.residency_since || "01/02/1999"}</strong></p>
//         <p><strong>f. कुटुंबातील सदस्यांची नावे:-</strong></p>
//         <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//           <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे</p>
//         </div>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p><strong>g. झोपडी दि. ०१.०१.२००० रोजी अथवा त्यापूर्वी अस्तित्वात असताना पुरावा :-</strong></p>
//         <p><strong>(अ) पुरावा :- Proof NA</strong></p>
//         <p><strong>h. अलिकडच्या एका वर्षातील पुरावा :- Electricity Bill</strong></p>
//         <p>i. स्वयं घोषणापत्र :- आहे</p>
//       </div>

//       <div style="margin-top: 40px; text-align: center;">
//         <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//           <span style="font-size: 12px;">QR Code</span>
//         </div>
//         <p style="margin-top: 10px; font-size: 12px;"><strong>झोपडिवासियाची सही / अंगठा निशाणी</strong></p>
//         <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमांक : ${data.current_mobile_number || "0000000000"}</strong></p>
//       </div>
//     `;

//     document.body.appendChild(pdfElement);

//     setTimeout(() => {
//       html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

//         // ✅ PDF डाउनलोड करतो
//         pdf.save(`Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

//         document.body.removeChild(pdfElement);
//         resolve(true);
//       }).catch((err) => {
//         document.body.removeChild(pdfElement);
//         reject(err);
//       });
//     }, 500);
//   });
// };



//   // const generateJodpatra4 = (data) => {
//   //   return new Promise((resolve) => {
//   //     const pdfElement = document.createElement('div')
//   //     pdfElement.style.width = '210mm'
//   //     pdfElement.style.minHeight = '297mm'
//   //     pdfElement.style.padding = '20mm'
//   //     pdfElement.style.fontFamily = 'Arial, sans-serif'
//   //     pdfElement.style.fontSize = '14px'
//   //     pdfElement.style.lineHeight = '1.5'
//   //     pdfElement.style.backgroundColor = 'white'
//   //     pdfElement.style.position = 'absolute'
//   //     pdfElement.style.top = '-9999px'

//   //     pdfElement.innerHTML = `
//   //       <div style="text-align: center; margin-bottom: 30px;">
//   //         <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//   //         <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - चार</h3>
//   //         <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
//   //         <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि. १.१.२००० नंतरच्या झोपडपट्टी विकसन प्राधिकरण योजनेसाठी अर्ज.</p>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>अर्ज क्र: ${data.slum_id || 'UJ100071'}</strong> <span style="float: right;"><strong>दिनांक:-${new Date().toLocaleDateString('en-GB')}</strong></span></p>
//   //         <p><strong>a. झोपडधारकाचे नाव :-</strong> ${data.first_name || 'RAHUL'} ${data.middle_name || ''} ${data.last_name || 'SHARMA'}</p>
//   //         <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || 'EKTA NAGAR BANDRA EAST'}, ${data.current_address || 'Mumbai'}</p>
//   //         <p><strong>c. शहराचे नाव :-</strong> ${data.current_address || 'Mumbai'}</p>
//   //         <p><strong>d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- ${data.ward || 'H/E'}</strong></p>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>e. झोपडधारक सध्याच्या झोपडीत केव्हापासून राहत आहे :- ${data.residency_since || '2005'} पासून</strong></p>
//   //         <p><strong>f. कुटुंबातील सदस्यांची संख्या:- ${data.num_family_members || ''}</strong></p>
          
//   //         <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//   //           <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे</p>
//   //           <p style="text-align: center; font-size: 10px;">${data.first_name || ''} ${data.last_name || ''}</p>
//   //         </div>
//   //       </div>

//   //       <div style="margin-bottom: 20px;">
//   //         <p><strong>g. दि. १.१.२००० नंतर झोपडी उभारल्याचा पुरावा आणि त्या ठिकाणी राहत असण्याचा साक्षीदाराने सादर केलेला पुरावा :-</strong></p>
//   //         <p><strong>(अ) विवरणपत्रातील सादर केलेला पुरावा/पुराव्यांचे अनुक्रमांक :- After 2000 Proof</strong></p>
          
//   //         <div style="text-align: center; margin: 20px 0;">
//   //           <p><strong>आणि</strong></p>
//   //         </div>
          
//   //         <p><strong>h. झोपडधारक सध्याच्या त्या झोपडीत प्रत्यक्ष राहत असण्याबद्दलचा अलिकडच्या एका वर्षातील पुरावा :-</strong></p>
//   //         <p><strong>(अ) विवरणपत्रातील सादर केलेला पुरावा/पुराव्यांचे अनुक्रमांक :- Electricity Bill / Ration Card</strong></p>
//   //       </div>

//   //       <div style="margin-top: 40px; text-align: center;">
//   //         <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//   //           <span style="font-size: 12px;">QR Code</span>
//   //         </div>
//   //         <p style="margin-top: 10px; font-size: 12px;"><strong>झोपडधारकाची स्वाक्षरी / अंगठा निशाणी</strong></p>
//   //         <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमांक : ${data.current_mobile_number || '0000000000'}</strong></p>
//   //       </div>
//   //     `

//   //     document.body.appendChild(pdfElement)
      
//   //     // Generate PDF using HTML to Canvas
//   //     setTimeout(() => {
//   //       const canvas = document.createElement('canvas')
//   //       const ctx = canvas.getContext('2d')
//   //       canvas.width = 2480  // A4 width in pixels at 300 DPI
//   //       canvas.height = 3508 // A4 height in pixels at 300 DPI
        
//   //       // White background
//   //       ctx.fillStyle = 'white'
//   //       ctx.fillRect(0, 0, canvas.width, canvas.height)
        
//   //       // Header
//   //       ctx.fillStyle = 'black'
//   //       ctx.font = 'bold 48px Arial'
//   //       ctx.textAlign = 'center'
//   //       ctx.fillText('निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१', canvas.width / 2, 150)
        
//   //       ctx.font = 'bold 42px Arial'
//   //       ctx.fillText('जोडपत्र - चार', canvas.width / 2, 220)
        
//   //       ctx.font = '32px Arial'
//   //       ctx.fillText('(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१)', canvas.width / 2, 280)
        
//   //       ctx.font = 'bold 36px Arial'
//   //       ctx.fillText('दि. १.१.२००० नंतरच्या झोपडपट्टी विकसन प्राधिकरण योजनेसाठी अर्ज.', canvas.width / 2, 340)
        
//   //       // Form details
//   //       ctx.font = '32px Arial'
//   //       ctx.textAlign = 'left'
//   //       const leftMargin = 100
//   //       let yPos = 480
        
//   //       ctx.fillText(`अर्ज क्र: ${data.slum_id || 'UJ100071'}`, leftMargin, yPos)
//   //       ctx.textAlign = 'right'
//   //       ctx.fillText(`दिनांक:-${new Date().toLocaleDateString('en-GB')}`, canvas.width - 100, yPos)
        
//   //       ctx.textAlign = 'left'
//   //       yPos += 60
//   //       ctx.fillText(`a. झोपडधारकाचे नाव :- ${data.first_name || 'RAHUL'} ${data.middle_name || ''} ${data.last_name || 'SHARMA'}`, leftMargin, yPos)
        
//   //       yPos += 60
//   //       ctx.fillText(`b. झोपडपट्टीचे नाव व ठिकाण :- ${data.name_of_slum_area || 'EKTA NAGAR BANDRA EAST'}`, leftMargin, yPos)
        
//   //       yPos += 60
//   //       ctx.fillText(`c. शहराचे नाव :- ${data.current_address || 'Mumbai'}`, leftMargin, yPos)
        
//   //       yPos += 60
//   //       ctx.fillText(`d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- ${data.ward || 'H/E'}`, leftMargin, yPos)
        
//   //       yPos += 80
//   //       ctx.fillText(`e. झोपडधारक सध्याच्या झोपडीत केव्हापासून राहत आहे :- ${data.residency_since || '2005'} पासून`, leftMargin, yPos)
        
//   //       yPos += 60
//   //       ctx.fillText(`f. कुटुंबातील सदस्यांची संख्या:- ${data.num_family_members || ''}`, leftMargin, yPos)
        
//   //       // Photo box
//   //       yPos += 100
//   //       ctx.strokeStyle = 'black'
//   //       ctx.lineWidth = 3
//   //       ctx.strokeRect(leftMargin, yPos, 300, 200)
//   //       ctx.font = '24px Arial'
//   //       ctx.textAlign = 'center'
//   //       ctx.fillText('फोटो स्कॅन केले पाहिजे', leftMargin + 150, yPos + 110)
//   //       ctx.fillText(`${data.first_name || ''} ${data.last_name || ''}`, leftMargin + 150, yPos + 140)
        
//   //       // Footer
//   //       yPos = canvas.height - 400
//   //       ctx.textAlign = 'center'
//   //       ctx.strokeRect(canvas.width/2 - 100, yPos, 200, 200)
//   //       ctx.font = '24px Arial'
//   //       ctx.fillText('QR Code', canvas.width/2, yPos + 110)
        
//   //       yPos += 250
//   //       ctx.font = 'bold 28px Arial'
//   //       ctx.fillText('झोपडधारकाची स्वाक्षरी / अंगठा निशाणी', canvas.width/2, yPos)
        
//   //       yPos += 50
//   //       ctx.fillText(`भ्रमणदूरध्वनी क्रमांक : ${data.current_mobile_number || '0000000000'}`, canvas.width/2, yPos)
        
//   //       // Convert to blob and download
//   //       canvas.toBlob((blob) => {
//   //         const url = URL.createObjectURL(blob)
//   //         const link = document.createElement('a')
//   //         link.href = url
//   //         link.download = `Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.png`
//   //         document.body.appendChild(link)
//   //         link.click()
//   //         document.body.removeChild(link)
//   //         URL.revokeObjectURL(url)
//   //         resolve(true)
//   //       })
        
//   //       document.body.removeChild(pdfElement)
//   //     }, 1000)
//   //   })
//   // }



//   const generateJodpatra4 = (data) => {
//   return new Promise((resolve, reject) => {
//     const pdfElement = document.createElement('div');
//     pdfElement.style.width = '210mm';
//     pdfElement.style.minHeight = '297mm';
//     pdfElement.style.padding = '20mm';
//     pdfElement.style.fontFamily = 'Arial, sans-serif';
//     pdfElement.style.fontSize = '14px';
//     pdfElement.style.backgroundColor = 'white';
//     pdfElement.style.position = 'absolute';
//     pdfElement.style.top = '-9999px';

//     pdfElement.innerHTML = `
//       <!-- Your structured HTML content from the uploaded Jodpatra4.pdf -->
//       <div style="text-align: center; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</div>
//       <h3>जोडपत्र - चार</h3>
//       <!-- More fields dynamically populated from data object -->
//       <p>अर्ज क्र: ${data.slum_id || 'UJ100071'}</p>
//       <p>नाम: ${data.first_name} ${data.middle_name} ${data.last_name}</p>
//       <p>Ward: ${data.ward}</p>
//       <p>Current Mobile No: ${data.current_mobile_number || '0000000000'}</p>
//       <!-- Add rest of the fields as per PDF layout -->
//     `;

//     document.body.appendChild(pdfElement);

//     html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();
      
//       pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
//       pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);
      
//       document.body.removeChild(pdfElement);
//       resolve(true);
//     }).catch(reject);
//   });
// };


//   const generateAndDownloadPdfs = async (formData) => {
//     setGeneratingPdfs(true)
    
//     try {
//       const residencyYear = parseInt(formData.residency_since) || 2000
//       console.log("Residency year:", residencyYear)
      
//       if (residencyYear <= 2000) {
//         // Generate jodpatra-3 for 2000 or before
//         setSuccess("Generating Jodpatra-3 for residency 2000 or before...")
//         console.log("Generating Jodpatra-3 for year:", residencyYear)
        
//         await generateJodpatra3(formData)
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-3!")
        
//       } else {
//         // Generate jodpatra-4 for after 2000
//         setSuccess("Generating Jodpatra-4 for residency after 2000...")
//         console.log("Generating Jodpatra-4 for year:", residencyYear)
        
//         await generateJodpatra4(formData)
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-4!")
//       }
      
//     } catch (error) {
//       console.error("Error generating PDFs:", error)
//       setError("Error generating PDFs: " + error.message)
//     } finally {
//       setTimeout(() => {
//         setGeneratingPdfs(false)
//       }, 3000)
//     }
//   }

//   const handleSubmit = async (values) => {
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(values).forEach(key => {
//         if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
//           formDataToSend.append(key, values[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully! Now generating PDFs...")
      
//       // Generate and download PDFs after successful submission
//       await generateAndDownloadPdfs(values)
      
//       setTimeout(() => {
//         if (onSuccess) onSuccess()
//       }, 3000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = (formik) => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <Field
//                   type="text"
//                   name="cluster_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
//                 <Field
//                   type="text"
//                   name="name_of_slum_area"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="name_of_slum_area" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation *</label>
//                 <Field
//                   type="text"
//                   name="municipal_corporation"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="municipal_corporation" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
//                 <Field
//                   as="select"
//                   name="ward"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </Field>
//                 <ErrorMessage name="ward" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
//                 <Field
//                   as="select"
//                   name="district"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </Field>
//                 <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka *</label>
//                 <Field
//                   as="select"
//                   name="taluka"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </Field>
//                 <ErrorMessage name="taluka" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <Field
//                   type="text"
//                   name="village"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <Field
//                   type="text"
//                   name="slum_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
//                 <Field
//                   as="select"
//                   name="slum_use"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Floor</label>
//                 <Field
//                   as="select"
//                   name="slum_floor"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <Field
//                   as="select"
//                   name="ownership_of_slum_land"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
//                 <Field
//                   as="select"
//                   name="survey_status"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </Field>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="plan_submitted"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="society_registered"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <Field
//                   type="text"
//                   name="first_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <Field
//                   type="text"
//                   name="middle_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <Field
//                   type="text"
//                   name="last_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <Field
//                   as="select"
//                   name="gender"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </Field>
//                 <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number (12 digits) *</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_number"
//                   maxLength="12"
//                   placeholder="123456789012"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number (10 digits)</label>
//                 <Field
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <Field
//                   type="text"
//                   name="spouse_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <Field
//                   type="email"
//                   name="user_email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <Field
//                   as="textarea"
//                   name="aadhaar_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
//                 <Field
//                   as="textarea"
//                   name="current_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="current_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number (10 digits) *</label>
//                 <Field
//                   type="tel"
//                   name="current_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <Field
//                   as="select"
//                   name="voter_card_type"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number (10 digits)</label>
//                 <Field
//                   type="text"
//                   name="voter_card_number"
//                   maxLength="10"
//                   placeholder="ABC1234567"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏦</span>
//                 </div>
//                 Bank Details
//               </h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <Field
//                     type="text"
//                     name="bank_name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <Field
//                     type="text"
//                     name="account_number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <Field
//                     type="text"
//                     name="ifsc_code"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏠</span>
//                 </div>
//                 Slum Details
//               </h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('length', e.target.value)
//                       const length = parseFloat(e.target.value) || 0
//                       const width = parseFloat(formik.values.width) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="length" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('width', e.target.value)
//                       const width = parseFloat(e.target.value) || 0
//                       const length = parseFloat(formik.values.length) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="width" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <Field
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
//                   <Field
//                     type="number"
//                     name="residency_since"
//                     placeholder="1995"
//                     min="1950"
//                     max="2024"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                   <ErrorMessage name="residency_since" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                   {formik.values.residency_since && (
//                     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//                       <p className="text-xs font-medium">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600" : "text-blue-600"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "2000 या आधी - Jodpatra-3 तयार होईल" : "2000 नंतर - Jodpatra-4 तयार होईल"}
//                         </span>
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 members)</h3>
            
//             <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members *</label>
//               <Field
//                 type="number"
//                 name="num_family_members"
//                 min="1"
//                 max="6"
//                 className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//               <ErrorMessage name="num_family_members" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50 shadow-sm hover:shadow-md transition-all">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                     <span className="text-white font-bold text-sm">{memberNum}</span>
//                   </div>
//                   Family Member {memberNum}
//                 </h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Name
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <Field
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Relation
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender
//                     </label>
//                     <Field
//                       as="select"
//                       name={`family_member${memberNum}_gender`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </Field>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Aadhaar Number (12 digits)
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       maxLength="12"
//                       placeholder="123456789012"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: '📷' },
//                 { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: '👨‍👩‍👧‍👦' },
//                 { name: 'doc_front_view', label: 'Front View Photo', accept: 'image/*', icon: '🏠' },
//                 { name: 'doc_side_view', label: 'Side View Photo', accept: 'image/*', icon: '🏗️' },
//                 { name: 'doc_before_2000', label: 'Document Before 2000', accept: 'image/*,.pdf,.doc,.docx', icon: '📄' },
//                 { name: 'submitted_docs_before_2000', label: 'Submitted Docs Before 2000', accept: 'image/*,.pdf', icon: '📋' },
//                 { name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: '📃' },
//                 { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: '🏡' },
//                 { name: 'Seldeclaration_letter', label: 'Self Declaration Letter', accept: 'image/*,.pdf', icon: '✍️' },
//                 { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: '🍚' },
//                 { name: 'document_upload', label: 'General Document', accept: 'image/*,.pdf,.doc,.docx', icon: '📁' },
//                 { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜' },
//                 { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
//                 { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' }
//               ].map(({ name, label, accept, icon }) => (
//                 <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl mr-2">{icon}</span>
//                     <h4 className="font-semibold text-gray-800">{label}</h4>
//                   </div>
//                   <input
//                     type="file"
//                     name={name}
//                     onChange={handleFileChange}
//                     accept={accept}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
//                   />
//                   {files[name] && (
//                     <div className="mt-2 p-2 bg-green-50 rounded flex items-center">
//                       <span className="text-green-500 text-sm mr-2">✅</span>
//                       <p className="text-sm text-green-700 truncate">{files[name].name}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )

//       default:
//         return (
//           <div className="text-center py-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3>
//             <p className="text-gray-600">Please review all your information and click submit to proceed.</p>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Progress Steps */}
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
//                   {currentStep >= step.id && (
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs">✓</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="ml-4 min-w-0">
//                   <p className={`text-sm font-semibold transition-colors ${
//                     currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'
//                   }`}>
//                     Step {step.id}
//                   </p>
//                   <p className={`text-xs truncate transition-colors ${
//                     currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
//                   }`}>
//                     {step.title}
//                   </p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full transition-all ${
//                     currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
//           {success && (
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">✅</span>
//               <span className="font-medium">{success}</span>
//             </div>
//           )}

//           {error && (
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">❌</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           {generatingPdfs && (
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div>
//               <span className="font-medium">Generating and downloading PDF documents...</span>
//             </div>
//           )}

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[currentStep]}
//             onSubmit={handleSubmit}
//           >
//             {(formik) => (
//               <Form>
//                 {renderStepContent(formik)}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 1}
//                     className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
//                       currentStep === 1
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                     Previous
//                   </button>

//                   <div className="text-center">
//                     <div className="text-sm font-medium text-gray-600">
//                       Step {currentStep} of {steps.length}
//                     </div>
//                     {formik.values.residency_since && currentStep === 4 && (
//                       <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600 font-semibold" : "text-blue-600 font-semibold"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "Jodpatra-3 तयार होईल" : "Jodpatra-4 तयार होईल"}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {currentStep < steps.length ? (
//                     <button
//                       type="button"
//                       onClick={() => nextStep(formik)}
//                       className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
//                     >
//                       Next
//                       <ChevronRight size={20} />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading || generatingPdfs || !formik.isValid}
//                       className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
//                         loading || generatingPdfs || !formik.isValid
//                           ? 'bg-gray-400 cursor-not-allowed shadow-md' 
//                           : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
//                       } text-white`}
//                     >
//                       {loading || generatingPdfs ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           {generatingPdfs ? 'Generating PDFs...' : 'Submitting...'}
//                         </>
//                       ) : (
//                         <>
//                           <Save size={20} />
//                           Submit & Generate PDFs
//                         </>
//                       )}
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

// export default ApplicationForm;


// =======================================================================================================
// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download } from 'lucide-react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

// // const API_BASE_URL = "http://13.203.251.59:4200"
// const API_BASE_URL = "https://sra.saavi.co.in"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// // Enhanced validation schemas with proper field validation
// const validationSchemas = {
//   1: Yup.object({
//     slum_id: Yup.string().required('Slum ID is required'),
//     name_of_slum_area: Yup.string().required('Slum name is required'),
//     municipal_corporation: Yup.string().required('Municipal Corporation is required'),
//     ward: Yup.string().required('Ward is required'),
//     district: Yup.string().required('District is required'),
//     taluka: Yup.string().required('Taluka is required'),
//   }),
//   2: Yup.object({
//     first_name: Yup.string().required('First name is required'),
//     last_name: Yup.string().required('Last name is required'),
//     gender: Yup.string().required('Gender is required'),
//     aadhaar_number: Yup.string()
//       .matches(/^[0-9]{12}$/, 'Aadhaar number must be exactly 12 digits')
//       .required('Aadhaar number is required'),
//     aadhaar_mobile_number: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
//     user_email: Yup.string().email('Invalid email format'),
//   }),
//   3: Yup.object({
//     current_address: Yup.string().required('Current address is required'),
//     current_mobile_number: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
//       .required('Mobile number is required'),
//     current_pincode: Yup.string()
//       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     aadhaar_pincode: Yup.string()
//       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     voter_card_number: Yup.string()
//       .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),
//   }),
//   4: Yup.object({
//     residency_since: Yup.number()
//       .min(1950, 'Year must be after 1950')
//       .max(2024, 'Year cannot be in the future')
//       .required('Residency since is required'),
//     length: Yup.number().positive('Length must be positive'),
//     width: Yup.number().positive('Width must be positive'),
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

// const ApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)

//   const initialValues = {
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: ''
//   }

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = (formik) => {
//     // Validate current step before proceeding
//     const currentSchema = validationSchemas[currentStep]
//     if (currentSchema) {
//       formik.validateForm().then(errors => {
//         const stepErrors = Object.keys(errors).length > 0
//         if (!stepErrors) {
//           if (currentStep < steps.length) {
//             setCurrentStep(currentStep + 1)
//           }
//         }
//       })
//     } else {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1)
//       }
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

  
// // ----------------------------------------------

//  // PDF Generation Functions
//  // -----------------------------------------------------------

// const generateJodpatra3 = (data) => {
//   return new Promise((resolve, reject) => {
//     const pdfElement = document.createElement("div");
//     pdfElement.style.width = "210mm";
//     pdfElement.style.minHeight = "297mm";
//     pdfElement.style.padding = "20mm";
//     pdfElement.style.fontFamily = "Arial, sans-serif";
//     pdfElement.style.fontSize = "14px";
//     pdfElement.style.lineHeight = "1.5";
//     pdfElement.style.backgroundColor = "white";
//     pdfElement.style.position = "absolute";
//     pdfElement.style.top = "-9999px";

//     // तुमचं HTML लेआउट
//     pdfElement.innerHTML = `
//       <div style="text-align: center; margin-bottom: 30px;">
//         <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//         <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - तीन</h3>
//         <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//         <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि. १.१.२००० अथवा त्यापूर्वीपासूनच्या संरक्षणपत्र झोपडीत दि. १.१.२००० अथवा त्यापूर्वीपासून राहणाऱ्या झोपडीवासीसाठी अर्ज.</p>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p><strong>अर्ज क्र: ${data.slum_id || "ME_08403185"}</strong> 
//         <span style="float: right;"><strong>दिनांक:-${new Date().toLocaleDateString("en-GB")}</strong></span></p>
//         <p><strong>a. झोपडिवासियाचे नाव :-</strong> ${data.first_name || "RABIYA"} ${data.last_name || "YAQOOB"}</p>
//         <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || "RAFIQ NAGAR SHIVAJI NAGAR GOVANDI, MUMBAI"}</p>
//         <p><strong>c. शहराचे नाव :-</strong> ${data.current_address || "Akuri"}</p>
//         <p><strong>d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- ${data.ward || "M/E"}</strong></p>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p><strong>e. झोपडिवासिय सध्याच्या झोपडीत केव्हापासून राहत आहे :- ${data.residency_since || "01/02/1999"}</strong></p>
//         <p><strong>f. कुटुंबातील सदस्यांची नावे:-</strong></p>
//         <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//           <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे</p>
//         </div>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p><strong>g. झोपडी दि. ०१.०१.२००० रोजी अथवा त्यापूर्वी अस्तित्वात असताना पुरावा :-</strong></p>
//         <p><strong>(अ) पुरावा :- Proof NA</strong></p>
//         <p><strong>h. अलिकडच्या एका वर्षातील पुरावा :- Electricity Bill</strong></p>
//         <p>i. स्वयं घोषणापत्र :- आहे</p>
//       </div>

//       <div style="margin-top: 40px; text-align: center;">
//         <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//           <span style="font-size: 12px;">QR Code</span>
//         </div>
//         <p style="margin-top: 10px; font-size: 12px;"><strong>झोपडिवासियाची सही / अंगठा निशाणी</strong></p>
//         <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमांक : ${data.current_mobile_number || "0000000000"}</strong></p>
//       </div>
//     `;

//     document.body.appendChild(pdfElement);

//     setTimeout(() => {
//       html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

//         // ✅ PDF डाउनलोड करतो
//         pdf.save(`Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

//         document.body.removeChild(pdfElement);
//         resolve(true);
//       }).catch((err) => {
//         document.body.removeChild(pdfElement);
//         reject(err);
//       });
//     }, 500);
//   });
// };



  

// const generateJodpatra4 = (data) => {
//   return new Promise((resolve, reject) => {
//     const pdfElement = document.createElement('div');
//     pdfElement.style.width = '210mm';
//     pdfElement.style.minHeight = '297mm';
//     pdfElement.style.padding = '20mm';
//     pdfElement.style.fontFamily = 'Arial, sans-serif';
//     pdfElement.style.fontSize = '14px';
//     pdfElement.style.lineHeight = '1.5';
//     pdfElement.style.backgroundColor = 'white';
//     pdfElement.style.position = 'absolute';
//     pdfElement.style.top = '-9999px';

//     // Complete Jodpatra-4 HTML Layout based on your Marathi text
//     pdfElement.innerHTML = `
//       <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px;">
//         <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//         <div style="margin: 10px 0; border-bottom: 1px solid #000; width: 100%;"></div>
//         <h3 style="margin: 10px 0; font-size: 16px; font-weight: bold;">जोडपत्र - चार</h3>
//         <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
//         <p style="margin: 15px 0; font-size: 14px; font-weight: bold;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र</p>
//         <div style="margin-top: 15px; padding: 10px; border: 2px solid #000; background: #f8f8f8;">
//           <h4 style="margin: 0; font-size: 16px; font-weight: bold;">पात्र</h4>
//         </div>
//       </div>

//       <div style="margin-bottom: 25px;">
//         <table style="width: 100%; border-collapse: collapse;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; width: 50%; font-weight: bold;">अर्ज क्रमांक: ${data.slum_id || "UJ100071"}</td>
//             <td style="border: 1px solid #000; padding: 8px; width: 50%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-bottom: 25px;">
//         <h4 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; text-decoration: underline;">वैयक्तिक माहिती:</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; width: 25%; font-weight: bold; background: #f0f0f0;">१. नाव:</td>
//             <td style="border: 1px solid #000; padding: 8px; width: 75%;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; font-weight: bold; background: #f0f0f0;">२. लिंग:</td>
//             <td style="border: 1px solid #000; padding: 8px;">${data.gender || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; font-weight: bold; background: #f0f0f0;">३. आधार क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 8px;">${data.aadhaar_number || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; font-weight: bold; background: #f0f0f0;">४. मोबाईल नंबर:</td>
//             <td style="border: 1px solid #000; padding: 8px;">${data.current_mobile_number || ""}</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-bottom: 25px;">
//         <h4 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; text-decoration: underline;">पत्ता व वॉर्ड माहिती:</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; width: 25%; font-weight: bold; background: #f0f0f0;">५. वॉर्ड:</td>
//             <td style="border: 1px solid #000; padding: 8px; width: 75%;">${data.ward || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; font-weight: bold; background: #f0f0f0;">६. सध्याचा पत्ता:</td>
//             <td style="border: 1px solid #000; padding: 8px;">${data.current_address || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; font-weight: bold; background: #f0f0f0;">७. झोपडपट्टीचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 8px;">${data.name_of_slum_area || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; font-weight: bold; background: #f0f0f0;">८. निवासी कधीपासून:</td>
//             <td style="border: 1px solid #000; padding: 8px;">${data.residency_since || ""}</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-bottom: 25px;">
//         <h4 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; text-decoration: underline;">कुटुंबातील माहिती:</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; font-weight: bold; background: #f0f0f0;">९. कुटुंबातील एकूण सदस्य:</td>
//             <td style="border: 1px solid #000; padding: 8px;">${data.num_family_members || ""}</td>
//           </tr>
//         </table>
        
//         <h5 style="font-size: 14px; font-weight: bold; margin: 15px 0 10px 0;">कुटुंबातील सदस्यांची संपूर्ण माहिती:</h5>
//         <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//           <tr style="background-color: #e0e0e0;">
//             <th style="border: 1px solid #000; padding: 6px; text-align: center;">अनु.क्र.</th>
//             <th style="border: 1px solid #000; padding: 6px; text-align: center;">नाव</th>
//             <th style="border: 1px solid #000; padding: 6px; text-align: center;">वय</th>
//             <th style="border: 1px solid #000; padding: 6px; text-align: center;">नातं</th>
//             <th style="border: 1px solid #000; padding: 6px; text-align: center;">लिंग</th>
//             <th style="border: 1px solid #000; padding: 6px; text-align: center;">आधार क्रमांक</th>
//           </tr>
//           ${Array.from({length: parseInt(data.num_family_members) || 0}, (_, i) => {
//             const memberNum = i + 1;
//             return `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 6px; text-align: center;">${memberNum}</td>
//                 <td style="border: 1px solid #000; padding: 6px;">${data[`family_member${memberNum}_name`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 6px; text-align: center;">${data[`family_member${memberNum}_age`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 6px;">${data[`family_member${memberNum}_relation`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 6px; text-align: center;">${data[`family_member${memberNum}_gender`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 6px;">${data[`family_member${memberNum}_aadhaar`] || ""}</td>
//               </tr>
//             `;
//           }).join('')}
//         </table>
//       </div>

//       <div style="margin-bottom: 25px;">
//         <h4 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; text-decoration: underline;">झोपडीचा तपशील:</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; width: 25%; font-weight: bold; background: #f0f0f0;">लांबी (मीटर):</td>
//             <td style="border: 1px solid #000; padding: 8px; width: 25%;">${data.length || ""}</td>
//             <td style="border: 1px solid #000; padding: 8px; width: 25%; font-weight: bold; background: #f0f0f0;">रुंदी (मीटर):</td>
//             <td style="border: 1px solid #000; padding: 8px; width: 25%;">${data.width || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; font-weight: bold; background: #f0f0f0;">एकूण क्षेत्रफळ:</td>
//             <td style="border: 1px solid #000; padding: 8px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-bottom: 25px;">
//         <h4 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; text-decoration: underline;">बँक तपशील:</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; width: 30%; font-weight: bold; background: #f0f0f0;">बँकेचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 8px; width: 70%;">${data.bank_name || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; font-weight: bold; background: #f0f0f0;">खाते क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 8px;">${data.account_number || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; font-weight: bold; background: #f0f0f0;">IFSC कोड:</td>
//             <td style="border: 1px solid #000; padding: 8px;">${data.ifsc_code || ""}</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: end;">
//         <div style="text-align: center;">
//           <div style="border: 2px solid #000; width: 120px; height: 120px; margin: 0 auto; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
//             <span style="font-size: 12px; font-weight: bold;">अर्जदाराचा<br>फोटो</span>
//           </div>
//           <p style="margin-top: 10px; font-size: 12px; font-weight: bold;">अर्जदाराचा फोटो</p>
//         </div>
        
//         <div style="text-align: center;">
//           <div style="border: 2px solid #000; width: 100px; height: 100px; margin: 0 auto; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
//             <span style="font-size: 10px;">QR Code</span>
//           </div>
//           <p style="margin-top: 15px; font-size: 12px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//           <div style="margin-top: 5px; border-top: 1px solid #000; width: 150px;"></div>
//         </div>
//       </div>

//       <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid #000;">
//         <p style="font-size: 12px; font-weight: bold;">संपर्क माहिती:</p>
//         <p style="font-size: 12px;">भ्रमणदूरध्वनी क्रमांक: ${data.current_mobile_number || "0000000000"}</p>
//         <p style="font-size: 12px;">ई-मेल: ${data.user_email || "N/A"}</p>
//       </div>

//       <div style="margin-top: 20px; text-align: center; font-size: 10px; color: #666;">
//         <p>*** हे पत्र संगणकाद्वारे तयार केले आहे ***</p>
//         <p>तयार केल्याची तारीख: ${new Date().toLocaleDateString("mr-IN")}</p>
//       </div>
//     `;

//     document.body.appendChild(pdfElement);

//     setTimeout(() => {
//       html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pageWidth = pdf.internal.pageSize.getWidth();
//         const pageHeight = pdf.internal.pageSize.getHeight();
        
//         // Calculate height to maintain aspect ratio
//         const canvasHeight = (canvas.height * pageWidth) / canvas.width;
        
//         pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, canvasHeight);
        
//         // ✅ PDF डाउनलोड करतो
//         pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);
        
//         document.body.removeChild(pdfElement);
//         resolve(true);
//       }).catch((err) => {
//         document.body.removeChild(pdfElement);
//         reject(err);
//       });
//     }, 500);
//   });
// };


//   const generateAndDownloadPdfs = async (formData) => {
//     setGeneratingPdfs(true)
    
//     try {
//       const residencyYear = parseInt(formData.residency_since) || 2000
//       console.log("Residency year:", residencyYear)
      
//       if (residencyYear <= 2000) {
//         // Generate jodpatra-3 for 2000 or before
//         setSuccess("Generating Jodpatra-3 for residency 2000 or before...")
//         console.log("Generating Jodpatra-3 for year:", residencyYear)
        
//         await generateJodpatra3(formData)
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-3!")
        
//       } else {
//         // Generate jodpatra-4 for after 2000
//         setSuccess("Generating Jodpatra-4 for residency after 2000...")
//         console.log("Generating Jodpatra-4 for year:", residencyYear)
        
//         await generateJodpatra4(formData)
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-4!")
//       }
      
//     } catch (error) {
//       console.error("Error generating PDFs:", error)
//       setError("Error generating PDFs: " + error.message)
//     } finally {
//       setTimeout(() => {
//         setGeneratingPdfs(false)
//       }, 3000)
//     }
//   }

//   const handleSubmit = async (values) => {
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(values).forEach(key => {
//         if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
//           formDataToSend.append(key, values[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully! Now generating PDFs...")
      
//       // Generate and download PDFs after successful submission
//       await generateAndDownloadPdfs(values)
      
//       setTimeout(() => {
//         if (onSuccess) onSuccess()
//       }, 3000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = (formik) => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <Field
//                   type="text"
//                   name="cluster_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
//                 <Field
//                   type="text"
//                   name="name_of_slum_area"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="name_of_slum_area" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation *</label>
//                 <Field
//                   type="text"
//                   name="municipal_corporation"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="municipal_corporation" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
//                 <Field
//                   as="select"
//                   name="ward"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </Field>
//                 <ErrorMessage name="ward" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
//                 <Field
//                   as="select"
//                   name="district"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </Field>
//                 <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka *</label>
//                 <Field
//                   as="select"
//                   name="taluka"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </Field>
//                 <ErrorMessage name="taluka" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <Field
//                   type="text"
//                   name="village"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <Field
//                   type="text"
//                   name="slum_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
//                 <Field
//                   as="select"
//                   name="slum_use"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Floor</label>
//                 <Field
//                   as="select"
//                   name="slum_floor"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <Field
//                   as="select"
//                   name="ownership_of_slum_land"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
//                 <Field
//                   as="select"
//                   name="survey_status"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </Field>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="plan_submitted"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="society_registered"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <Field
//                   type="text"
//                   name="first_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <Field
//                   type="text"
//                   name="middle_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <Field
//                   type="text"
//                   name="last_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <Field
//                   as="select"
//                   name="gender"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </Field>
//                 <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number (12 digits) *</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_number"
//                   maxLength="12"
//                   placeholder="123456789012"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number (10 digits)</label>
//                 <Field
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <Field
//                   type="text"
//                   name="spouse_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <Field
//                   type="email"
//                   name="user_email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <Field
//                   as="textarea"
//                   name="aadhaar_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
//                 <Field
//                   as="textarea"
//                   name="current_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="current_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number (10 digits) *</label>
//                 <Field
//                   type="tel"
//                   name="current_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <Field
//                   as="select"
//                   name="voter_card_type"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number (10 digits)</label>
//                 <Field
//                   type="text"
//                   name="voter_card_number"
//                   maxLength="10"
//                   placeholder="ABC1234567"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏦</span>
//                 </div>
//                 Bank Details
//               </h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <Field
//                     type="text"
//                     name="bank_name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <Field
//                     type="text"
//                     name="account_number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <Field
//                     type="text"
//                     name="ifsc_code"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏠</span>
//                 </div>
//                 Slum Details
//               </h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('length', e.target.value)
//                       const length = parseFloat(e.target.value) || 0
//                       const width = parseFloat(formik.values.width) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="length" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('width', e.target.value)
//                       const width = parseFloat(e.target.value) || 0
//                       const length = parseFloat(formik.values.length) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="width" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <Field
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
//                   <Field
//                     type="number"
//                     name="residency_since"
//                     placeholder="1995"
//                     min="1950"
//                     max="2024"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                   <ErrorMessage name="residency_since" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                   {formik.values.residency_since && (
//                     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//                       <p className="text-xs font-medium">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600" : "text-blue-600"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "2000 या आधी - Jodpatra-3 तयार होईल" : "2000 नंतर - Jodpatra-4 तयार होईल"}
//                         </span>
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 members)</h3>
            
//             <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members *</label>
//               <Field
//                 type="number"
//                 name="num_family_members"
//                 min="1"
//                 max="6"
//                 className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//               <ErrorMessage name="num_family_members" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50 shadow-sm hover:shadow-md transition-all">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                     <span className="text-white font-bold text-sm">{memberNum}</span>
//                   </div>
//                   Family Member {memberNum}
//                 </h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Name
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <Field
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Relation
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender
//                     </label>
//                     <Field
//                       as="select"
//                       name={`family_member${memberNum}_gender`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </Field>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Aadhaar Number (12 digits)
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       maxLength="12"
//                       placeholder="123456789012"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: '📷' },
//                 { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: '👨‍👩‍👧‍👦' },
//                 { name: 'doc_front_view', label: 'Front View Photo', accept: 'image/*', icon: '🏠' },
//                 { name: 'doc_side_view', label: 'Side View Photo', accept: 'image/*', icon: '🏗️' },
//                 { name: 'doc_before_2000', label: 'Document Before 2000', accept: 'image/*,.pdf,.doc,.docx', icon: '📄' },
//                 { name: 'submitted_docs_before_2000', label: 'Submitted Docs Before 2000', accept: 'image/*,.pdf', icon: '📋' },
//                 { name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: '📃' },
//                 { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: '🏡' },
//                 { name: 'Seldeclaration_letter', label: 'Self Declaration Letter', accept: 'image/*,.pdf', icon: '✍️' },
//                 { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: '🍚' },
//                 { name: 'document_upload', label: 'General Document', accept: 'image/*,.pdf,.doc,.docx', icon: '📁' },
//                 { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜' },
//                 { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
//                 { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' }
//               ].map(({ name, label, accept, icon }) => (
//                 <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl mr-2">{icon}</span>
//                     <h4 className="font-semibold text-gray-800">{label}</h4>
//                   </div>
//                   <input
//                     type="file"
//                     name={name}
//                     onChange={handleFileChange}
//                     accept={accept}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
//                   />
//                   {files[name] && (
//                     <div className="mt-2 p-2 bg-green-50 rounded flex items-center">
//                       <span className="text-green-500 text-sm mr-2">✅</span>
//                       <p className="text-sm text-green-700 truncate">{files[name].name}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )

//       default:
//         return (
//           <div className="text-center py-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3>
//             <p className="text-gray-600">Please review all your information and click submit to proceed.</p>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Progress Steps */}
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
//                   {currentStep >= step.id && (
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs">✓</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="ml-4 min-w-0">
//                   <p className={`text-sm font-semibold transition-colors ${
//                     currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'
//                   }`}>
//                     Step {step.id}
//                   </p>
//                   <p className={`text-xs truncate transition-colors ${
//                     currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
//                   }`}>
//                     {step.title}
//                   </p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full transition-all ${
//                     currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
//           {success && (
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">✅</span>
//               <span className="font-medium">{success}</span>
//             </div>
//           )}

//           {error && (
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">❌</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           {generatingPdfs && (
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div>
//               <span className="font-medium">Generating and downloading PDF documents...</span>
//             </div>
//           )}

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[currentStep]}
//             onSubmit={handleSubmit}
//           >
//             {(formik) => (
//               <Form>
//                 {renderStepContent(formik)}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 1}
//                     className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
//                       currentStep === 1
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                     Previous
//                   </button>

//                   <div className="text-center">
//                     <div className="text-sm font-medium text-gray-600">
//                       Step {currentStep} of {steps.length}
//                     </div>
//                     {formik.values.residency_since && currentStep === 4 && (
//                       <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600 font-semibold" : "text-blue-600 font-semibold"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "Jodpatra-3 तयार होईल" : "Jodpatra-4 तयार होईल"}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {currentStep < steps.length ? (
//                     <button
//                       type="button"
//                       onClick={() => nextStep(formik)}
//                       className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
//                     >
//                       Next
//                       <ChevronRight size={20} />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading || generatingPdfs || !formik.isValid}
//                       className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
//                         loading || generatingPdfs || !formik.isValid
//                           ? 'bg-gray-400 cursor-not-allowed shadow-md' 
//                           : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
//                       } text-white`}
//                     >
//                       {loading || generatingPdfs ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           {generatingPdfs ? 'Generating PDFs...' : 'Submitting...'}
//                         </>
//                       ) : (
//                         <>
//                           <Save size={20} />
//                           Submit & Generate PDFs
//                         </>
//                       )}
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

// export default ApplicationForm;


// =======================================================================================


// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download } from 'lucide-react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

// // const API_BASE_URL = "http://13.203.251.59:4200"
// const API_BASE_URL = "https://sra.saavi.co.in"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// // Enhanced validation schemas with proper field validation
// const validationSchemas = {
//   1: Yup.object({
//     slum_id: Yup.string().required('Slum ID is required'),
//     name_of_slum_area: Yup.string().required('Slum name is required'),
//     municipal_corporation: Yup.string().required('Municipal Corporation is required'),
//     ward: Yup.string().required('Ward is required'),
//     district: Yup.string().required('District is required'),
//     taluka: Yup.string().required('Taluka is required'),
//   }),
//   2: Yup.object({
//     first_name: Yup.string().required('First name is required'),
//     last_name: Yup.string().required('Last name is required'),
//     gender: Yup.string().required('Gender is required'),
//     aadhaar_number: Yup.string()
//       .matches(/^[0-9]{12}$/, 'Aadhaar number must be exactly 12 digits')
//       .required('Aadhaar number is required'),
//     aadhaar_mobile_number: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
//     user_email: Yup.string().email('Invalid email format'),
//   }),
//   3: Yup.object({
//     current_address: Yup.string().required('Current address is required'),
//     current_mobile_number: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
//       .required('Mobile number is required'),
//     current_pincode: Yup.string()
//       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     aadhaar_pincode: Yup.string()
//       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     voter_card_number: Yup.string()
//       .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),
//   }),
//   4: Yup.object({
//     residency_since: Yup.number()
//       .min(1950, 'Year must be after 1950')
//       .max(2024, 'Year cannot be in the future')
//       .required('Residency since is required'),
//     length: Yup.number().positive('Length must be positive'),
//     width: Yup.number().positive('Width must be positive'),
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

// const ApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)

//   const initialValues = {
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: '',
//     submittedBy:''
//   }

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target
//     if (selectedFiles && selectedFiles[0]) {
//       setFiles(prev => ({
//         ...prev,
//         [name]: selectedFiles[0]
//       }))
//     }
//   }

//   const nextStep = (formik) => {
//     // Validate current step before proceeding
//     const currentSchema = validationSchemas[currentStep]
//     if (currentSchema) {
//       formik.validateForm().then(errors => {
//         const stepErrors = Object.keys(errors).length > 0
//         if (!stepErrors) {
//           if (currentStep < steps.length) {
//             setCurrentStep(currentStep + 1)
//           }
//         }
//       })
//     } else {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1)
//       }
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

  
// // ----------------------------------------------

//  // PDF Generation Functions
//  // -----------------------------------------------------------

// const generateJodpatra3 = (data) => {
//   return new Promise((resolve, reject) => {
//     const pdfElement = document.createElement("div");
//     pdfElement.style.width = "210mm";
//     pdfElement.style.minHeight = "297mm";
//     pdfElement.style.padding = "20mm";
//     pdfElement.style.fontFamily = "Arial, sans-serif";
//     pdfElement.style.fontSize = "14px";
//     pdfElement.style.lineHeight = "1.5";
//     pdfElement.style.backgroundColor = "white";
//     pdfElement.style.position = "absolute";
//     pdfElement.style.top = "-9999px";

//     // तुमचं HTML लेआउट
//     pdfElement.innerHTML = `
//       <div style="text-align: center; margin-bottom: 30px;">
//         <h2 style="margin: 0; font-size: 18px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//         <h3 style="margin: 10px 0; font-size: 16px;">जोडपत्र - तीन</h3>
//         <p style="margin: 5px 0; font-size: 12px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//         <p style="margin: 5px 0; font-size: 14px; font-weight: bold;">दि. १.१.२००० अथवा त्यापूर्वीपासूनच्या संरक्षणपत्र झोपडीत दि. १.१.२००० अथवा त्यापूर्वीपासून राहणाऱ्या झोपडीवासीसाठी अर्ज.</p>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p><strong>अर्ज क्र: ${data.slum_id || "ME_08403185"}</strong> 
//         <span style="float: right;"><strong>दिनांक:-${new Date().toLocaleDateString("en-GB")}</strong></span></p>
//         <p><strong>a. झोपडिवासियाचे नाव :-</strong> ${data.first_name || "RABIYA"} ${data.last_name || "YAQOOB"}</p>
//         <p><strong>b. झोपडपट्टीचे नाव व ठिकाण :-</strong> ${data.name_of_slum_area || "RAFIQ NAGAR SHIVAJI NAGAR GOVANDI, MUMBAI"}</p>
//         <p><strong>c. शहराचे नाव :-</strong> ${data.current_address || "Akuri"}</p>
//         <p><strong>d. महापालिका / नगरपालिका / वॉर्ड क्रमांक :- ${data.ward || "M/E"}</strong></p>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p><strong>e. झोपडिवासिय सध्याच्या झोपडीत केव्हापासून राहत आहे :- ${data.residency_since || "01/02/1999"}</strong></p>
//         <p><strong>f. कुटुंबातील सदस्यांची नावे:-</strong></p>
//         <div style="border: 1px solid #000; padding: 10px; margin: 10px 0; width: 150px; height: 100px; display: inline-block;">
//           <p style="text-align: center; margin-top: 35px; font-size: 12px;">फोटो स्कॅन केले पाहिजे</p>
//         </div>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p><strong>g. झोपडी दि. ०१.०१.२००० रोजी अथवा त्यापूर्वी अस्तित्वात असताना पुरावा :-</strong></p>
//         <p><strong>(अ) पुरावा :- Proof NA</strong></p>
//         <p><strong>h. अलिकडच्या एका वर्षातील पुरावा :- Electricity Bill</strong></p>
//         <p>i. स्वयं घोषणापत्र :- आहे</p>
//       </div>

//       <div style="margin-top: 40px; text-align: center;">
//         <div style="border: 1px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
//           <span style="font-size: 12px;">QR Code</span>
//         </div>
//         <p style="margin-top: 10px; font-size: 12px;"><strong>झोपडिवासियाची सही / अंगठा निशाणी</strong></p>
//         <p style="font-size: 12px;"><strong>भ्रमणदूरध्वनी क्रमांक : ${data.current_mobile_number || "0000000000"}</strong></p>
//       </div>
//     `;

//     document.body.appendChild(pdfElement);

//     setTimeout(() => {
//       html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

//         // ✅ PDF डाउनलोड करतो
//         pdf.save(`Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

//         document.body.removeChild(pdfElement);
//         resolve(true);
//       }).catch((err) => {
//         document.body.removeChild(pdfElement);
//         reject(err);
//       });
//     }, 500);
//   });
// };



// const generateJodpatra4 = (data) => {
//   return new Promise((resolve, reject) => {
//     const pdfElement = document.createElement('div');
//     pdfElement.style.width = '210mm';
//     pdfElement.style.minHeight = '297mm';
//     pdfElement.style.padding = '15mm';
//     pdfElement.style.fontFamily = 'Arial, sans-serif';
//     pdfElement.style.fontSize = '12px';
//     pdfElement.style.lineHeight = '1.4';
//     pdfElement.style.backgroundColor = 'white';
//     pdfElement.style.position = 'absolute';
//     pdfElement.style.top = '-9999px';

//     // जोडपत्र-4 की बिल्कुल वही layout जो आपने screenshot में दिखाया है
//     pdfElement.innerHTML = `
//       <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//         <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//         <hr style="margin: 8px 0; border: 1px solid #000;">
//         <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
//         <p style="margin: 5px 0; font-size: 11px; font-style: italic;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
//         <p style="margin: 10px 0; font-size: 13px; font-weight: bold;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र</p>
        
//         <div style="margin: 15px auto; padding: 8px; border: 2px solid #000; background: #f5f5f5; width: 100px;">
//           <h4 style="margin: 0; font-size: 14px; font-weight: bold;">पात्र</h4>
//         </div>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">श्री / श्रीमती / कुमारी नाव: ${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
//             <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">मी खालील नमूद केलेल्या माहितीची खात्री देतो:</p>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold; background: #f8f8f8;">१. मुख्य अर्जदाराचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold; background: #f8f8f8;">२. लिंग:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold; background: #f8f8f8;">३. आधार क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold; background: #f8f8f8;">४. मोबाईल क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold; background: #f8f8f8;">५. झोपडपट्टीचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.name_of_slum_area || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold; background: #f8f8f8;">६. वॉर्ड:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold; background: #f8f8f8;">७. सध्याचा पत्ता:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold; background: #f8f8f8;">८. निवासी कधीपासून:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""} पासून</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
//         <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 4px; font-weight: bold; background: #f0f0f0;">कुटुंबातील एकूण सदस्य:</td>
//             <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${data.num_family_members || ""} सदस्य</td>
//           </tr>
//         </table>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//           <tr style="background-color: #e5e5e5;">
//             <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//             <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//             <th style="border: 1px solid #000; padding: 4px;">वय</th>
//             <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//             <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//             <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//           </tr>
//           ${Array.from({length: Math.min(parseInt(data.num_family_members) || 0, 6)}, (_, i) => {
//             const memberNum = i + 1;
//             return `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_name`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_age`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_relation`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_gender`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_aadhaar`] || ""}</td>
//               </tr>
//             `;
//           }).join('')}
//         </table>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
//         <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold; background: #f8f8f8;">लांबी (मीटर):</td>
//             <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.length || ""}</td>
//             <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold; background: #f8f8f8;">रुंदी (मीटर):</td>
//             <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.width || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold; background: #f8f8f8;">एकूण क्षेत्रफळ:</td>
//             <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
//         <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold; background: #f8f8f8;">बँकेचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px; width: 70%;">${data.bank_name || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold; background: #f8f8f8;">खाते क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold; background: #f8f8f8;">IFSC कोड:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end;">
//         <div style="text-align: center;">
//           <div style="border: 2px solid #000; width: 100px; height: 100px; margin: 0 auto; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
//             <span style="font-size: 10px; font-weight: bold; text-align: center;">अर्जदाराचा<br>फोटो</span>
//           </div>
//           <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
//         </div>
        
//         <div style="text-align: center;">
//           <div style="border: 2px solid #000; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
//             <span style="font-size: 8px;">QR Code</span>
//           </div>
//           <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//           <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px; margin-left: auto; margin-right: auto;"></div>
//         </div>
//       </div>

//       <div style="margin-top: 25px; text-align: center; padding-top: 15px; border-top: 1px solid #000;">
//         <p style="font-size: 10px; font-weight: bold; margin: 3px 0;">संपर्क माहिती:</p>
//         <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
//         <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
//       </div>

//       <div style="margin-top: 15px; text-align: center; font-size: 9px; color: #666;">
//         <p style="margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
//         <p style="margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
//       </div>
//     `;

//     document.body.appendChild(pdfElement);

//     setTimeout(() => {
//       html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pageWidth = pdf.internal.pageSize.getWidth();
//         const pageHeight = pdf.internal.pageSize.getHeight();
        
//         // Calculate height to maintain aspect ratio
//         const canvasHeight = (canvas.height * pageWidth) / canvas.width;
        
//         pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, canvasHeight);
        
//         // ✅ PDF डाउनलोड करतो
//         pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);
        
//         document.body.removeChild(pdfElement);
//         resolve(true);
//       }).catch((err) => {
//         document.body.removeChild(pdfElement);
//         reject(err);
//       });
//     }, 500);
//   });
// };


//   const generateAndDownloadPdfs = async (formData) => {
//     setGeneratingPdfs(true)
    
//     try {
//       const residencyYear = parseInt(formData.residency_since) || 2000
//       console.log("Residency year:", residencyYear)
      
//       if (residencyYear <= 2000) {
//         // Generate jodpatra-3 for 2000 or before
//         setSuccess("Generating Jodpatra-3 for residency 2000 or before...")
//         console.log("Generating Jodpatra-3 for year:", residencyYear)
        
//         await generateJodpatra3(formData)
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-3!")
        
//       } else {
//         // Generate jodpatra-4 for after 2000
//         setSuccess("Generating Jodpatra-4 for residency after 2000...")
//         console.log("Generating Jodpatra-4 for year:", residencyYear)
        
//         await generateJodpatra4(formData)
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-4!")
//       }
      
//     } catch (error) {
//       console.error("Error generating PDFs:", error)
//       setError("Error generating PDFs: " + error.message)
//     } finally {
//       setTimeout(() => {
//         setGeneratingPdfs(false)
//       }, 3000)
//     }
//   }

//   const handleSubmit = async (values) => {
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Add all form fields
//       Object.keys(values).forEach(key => {
//         if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
//           formDataToSend.append(key, values[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully! Now generating PDFs...")
      
//       // Generate and download PDFs after successful submission
//       await generateAndDownloadPdfs(values)
      
//       setTimeout(() => {
//         if (onSuccess) onSuccess()
//       }, 3000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = (formik) => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <Field
//                   type="text"
//                   name="cluster_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
//                 <Field
//                   type="text"
//                   name="name_of_slum_area"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="name_of_slum_area" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation *</label>
//                 <Field
//                   type="text"
//                   name="municipal_corporation"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="municipal_corporation" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
//                 <Field
//                   as="select"
//                   name="ward"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </Field>
//                 <ErrorMessage name="ward" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
//                 <Field
//                   as="select"
//                   name="district"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </Field>
//                 <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka *</label>
//                 <Field
//                   as="select"
//                   name="taluka"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </Field>
//                 <ErrorMessage name="taluka" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <Field
//                   type="text"
//                   name="village"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
//                 <Field
//                   type="text"
//                   name="slum_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
//                 <Field
//                   as="select"
//                   name="slum_use"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slum Floor</label>
//                 <Field
//                   as="select"
//                   name="slum_floor"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
//                 <Field
//                   as="select"
//                   name="ownership_of_slum_land"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Private">Private</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
//                 <Field
//                   as="select"
//                   name="survey_status"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </Field>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="plan_submitted"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="society_registered"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <Field
//                   type="text"
//                   name="first_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <Field
//                   type="text"
//                   name="middle_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <Field
//                   type="text"
//                   name="last_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <Field
//                   as="select"
//                   name="gender"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </Field>
//                 <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number (12 digits) *</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_number"
//                   maxLength="12"
//                   placeholder="123456789012"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number (10 digits)</label>
//                 <Field
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <Field
//                   type="text"
//                   name="spouse_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <Field
//                   type="email"
//                   name="user_email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <Field
//                   as="textarea"
//                   name="aadhaar_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
//                 <Field
//                   as="textarea"
//                   name="current_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="current_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number (10 digits) *</label>
//                 <Field
//                   type="tel"
//                   name="current_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <Field
//                   as="select"
//                   name="voter_card_type"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number (10 digits)</label>
//                 <Field
//                   type="text"
//                   name="voter_card_number"
//                   maxLength="10"
//                   placeholder="ABC1234567"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏦</span>
//                 </div>
//                 Bank Details
//               </h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <Field
//                     type="text"
//                     name="bank_name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <Field
//                     type="text"
//                     name="account_number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <Field
//                     type="text"
//                     name="ifsc_code"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏠</span>
//                 </div>
//                 Slum Details
//               </h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('length', e.target.value)
//                       const length = parseFloat(e.target.value) || 0
//                       const width = parseFloat(formik.values.width) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="length" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('width', e.target.value)
//                       const width = parseFloat(e.target.value) || 0
//                       const length = parseFloat(formik.values.length) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="width" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <Field
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
//                   <Field
//                     type="number"
//                     name="residency_since"
//                     placeholder="1995"
//                     min="1950"
//                     max="2024"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                   <ErrorMessage name="residency_since" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                   {formik.values.residency_since && (
//                     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//                       <p className="text-xs font-medium">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600" : "text-blue-600"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "2000 या आधी - Jodpatra-3 तयार होईल" : "2000 नंतर - Jodpatra-4 तयार होईल"}
//                         </span>
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 members)</h3>
            
//             <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members *</label>
//               <Field
//                 type="number"
//                 name="num_family_members"
//                 min="1"
//                 max="6"
//                 className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//               <ErrorMessage name="num_family_members" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//             </div>

//             {[1, 2, 3, 4, 5, 6].map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50 shadow-sm hover:shadow-md transition-all">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                     <span className="text-white font-bold text-sm">{memberNum}</span>
//                   </div>
//                   Family Member {memberNum}
//                 </h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Name
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <Field
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Relation
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender
//                     </label>
//                     <Field
//                       as="select"
//                       name={`family_member${memberNum}_gender`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </Field>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Aadhaar Number (12 digits)
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       maxLength="12"
//                       placeholder="123456789012"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: '📷' },
//                 { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: '👨‍👩‍👧‍👦' },
//                 { name: 'doc_front_view', label: 'Front View Photo', accept: 'image/*', icon: '🏠' },
//                 { name: 'doc_side_view', label: 'Side View Photo', accept: 'image/*', icon: '🏗️' },
//                 { name: 'doc_before_2000', label: 'Document Before 2000', accept: 'image/*,.pdf,.doc,.docx', icon: '📄' },
//                 { name: 'submitted_docs_before_2000', label: 'Submitted Docs Before 2000', accept: 'image/*,.pdf', icon: '📋' },
//                 { name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: '📃' },
//                 { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: '🏡' },
//                 { name: 'Seldeclaration_letter', label: 'Self Declaration Letter', accept: 'image/*,.pdf', icon: '✍️' },
//                 { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: '🍚' },
//                 { name: 'document_upload', label: 'General Document', accept: 'image/*,.pdf,.doc,.docx', icon: '📁' },
//                 { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜' },
//                 { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
//                 { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' }
//               ].map(({ name, label, accept, icon }) => (
//                 <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl mr-2">{icon}</span>
//                     <h4 className="font-semibold text-gray-800">{label}</h4>
//                   </div>
//                   <input
//                     type="file"
//                     name={name}
//                     onChange={handleFileChange}
//                     accept={accept}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
//                   />
//                   {files[name] && (
//                     <div className="mt-2 p-2 bg-green-50 rounded flex items-center">
//                       <span className="text-green-500 text-sm mr-2">✅</span>
//                       <p className="text-sm text-green-700 truncate">{files[name].name}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )

//       default:
//         return (
//           <div className="text-center py-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3>
//             <p className="text-gray-600">Please review all your information and click submit to proceed.</p>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Progress Steps */}
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
//                   {currentStep >= step.id && (
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs">✓</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="ml-4 min-w-0">
//                   <p className={`text-sm font-semibold transition-colors ${
//                     currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'
//                   }`}>
//                     Step {step.id}
//                   </p>
//                   <p className={`text-xs truncate transition-colors ${
//                     currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
//                   }`}>
//                     {step.title}
//                   </p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full transition-all ${
//                     currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
//           {success && (
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">✅</span>
//               <span className="font-medium">{success}</span>
//             </div>
//           )}

//           {error && (
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">❌</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           {generatingPdfs && (
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div>
//               <span className="font-medium">Generating and downloading PDF documents...</span>
//             </div>
//           )}

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[currentStep]}
//             onSubmit={handleSubmit}
//           >
//             {(formik) => (
//               <Form>
//                 {renderStepContent(formik)}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 1}
//                     className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
//                       currentStep === 1
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                     Previous
//                   </button>

//                   <div className="text-center">
//                     <div className="text-sm font-medium text-gray-600">
//                       Step {currentStep} of {steps.length}
//                     </div>
//                     {formik.values.residency_since && currentStep === 4 && (
//                       <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600 font-semibold" : "text-blue-600 font-semibold"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "Jodpatra-3 तयार होईल" : "Jodpatra-4 तयार होईल"}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {currentStep < steps.length ? (
//                     <button
//                       type="button"
//                       onClick={() => nextStep(formik)}
//                       className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
//                     >
//                       Next
//                       <ChevronRight size={20} />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading || generatingPdfs || !formik.isValid}
//                       className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
//                         loading || generatingPdfs || !formik.isValid
//                           ? 'bg-gray-400 cursor-not-allowed shadow-md' 
//                           : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
//                       } text-white`}
//                     >
//                       {loading || generatingPdfs ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           {generatingPdfs ? 'Generating PDFs...' : 'Submitting...'}
//                         </>
//                       ) : (
//                         <>
//                           <Save size={20} />
//                           Submit & Generate PDFs
//                         </>
//                       )}
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

// export default ApplicationForm






// =========================================================================================================
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Save, Upload, Download,Plus, Minus} from 'lucide-react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// const API_BASE_URL = "http://13.203.251.59:4200"
const API_BASE_URL = "https://sra.saavi.co.in"

const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

// Get user from localStorage
const getUser = () => {
  if (typeof window === "undefined") return null
  try {
    const userString = localStorage.getItem("user")
    return userString ? JSON.parse(userString) : null
  } catch (error) {
    console.error("Error parsing user from localStorage:", error)
    return null
  }
}

// Fetch user profile and set in localStorage
const fetchAndSetUserProfile = async () => {
  const token = getAuthToken()
  if (!token) return null

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    if (response.ok) {
      const userData = await response.json()
      localStorage.setItem("user", JSON.stringify(userData))
      return userData
    }
  } catch (error) {
    console.error("Error fetching profile:", error)
  }
  return null
}


// Enhanced validation schemas with proper field validation
const validationSchemas = {
  1: Yup.object({
    slum_id: Yup.string().required('Slum ID is required'),
    name_of_slum_area: Yup.string().required('Slum name is required'),
    municipal_corporation: Yup.string().required('Municipal Corporation is required'),
    ward: Yup.string().required('Ward is required'),
    district: Yup.string().required('District is required'),
    taluka: Yup.string().required('Taluka is required'),
  }),
  2: Yup.object({
    first_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('First name is required'),
    middle_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Middle name is required'),
    last_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Last name is required'),
    gender: Yup.string().required('Gender is required'),
    aadhaar_number: Yup.string()
      .matches(/^[0-9]{12}$/, 'Aadhaar number must be exactly 12 digits')
      .required('Aadhaar number is required'),
    aadhaar_mobile_number: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
      .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
    user_email: Yup.string().email('Invalid email format'),
  }),
  3: Yup.object({
    current_address: Yup.string().required('Current address is required'),
    current_mobile_number: Yup.string()
     .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
    .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
    current_pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
    aadhaar_pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
    voter_card_number: Yup.string()
      .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),
  }),
  4: Yup.object({
    residency_since: Yup.number()
      .min(1950, 'Year must be after 1950')
      .max(2024, 'Year cannot be in the future')
      .required('Residency since is required'),
    length: Yup.number().positive('Length must be positive'),
    width: Yup.number().positive('Width must be positive'),
  }),
  5: Yup.object({
    num_family_members: Yup.number()
      .min(1, 'At least 1 family member is required')
      .max(6, 'Maximum 6 family members allowed')
      .required('Number of family members is required'),
  }),
  6: Yup.object({}),
  7: Yup.object({}),
}

const ApplicationForm = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [generatingPdfs, setGeneratingPdfs] = useState(false)
const [visibleMembers, setVisibleMembers] = useState(1); // initially 1 member visible
const [displayedMembers, setDisplayedMembers] = useState(1);

  const initialValues = {
    // Basic Information
    slum_id: '',
    name_of_slum_area: '',
    municipal_corporation: '',
    ward: '',
    district: '',
    taluka: '',
    village: '',
    cluster_number: '',
    slum_use: '',
    slum_floor: '',
    ownership_of_slum_land: '',
    survey_status: '',
    plan_submitted: false,
    society_registered: false,
    
    // Personal Details
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    spouse_name: '',
    user_email: '',
    aadhaar_number: '',
    aadhaar_mobile_number: '',
    
    // Address Contact
    aadhaar_address: '',
    aadhaar_pincode: '',
    current_address: '',
    current_pincode: '',
    current_mobile_number: '',
    voter_card_type: '',
    voter_card_number: '',
    
    // Bank Details
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    
    // Slum Details
    length: '',
    width: '',
    area_sq_m: '',
    residency_since: '',
    
    // Family Information
    num_family_members: '',
    family_member1_name: '',
    family_member1_age: '',
    family_member1_relation: '',
    family_member1_gender: '',
    family_member1_aadhaar: '',
    family_member2_name: '',
    family_member2_age: '',
    family_member2_relation: '',
    family_member2_gender: '',
    family_member2_aadhaar: '',
    family_member3_name: '',
    family_member3_age: '',
    family_member3_relation: '',
    family_member3_gender: '',
    family_member3_aadhaar: '',
    family_member4_name: '',
    family_member4_age: '',
    family_member4_relation: '',
    family_member4_gender: '',
    family_member4_aadhaar: '',
    family_member5_name: '',
    family_member5_age: '',
    family_member5_relation: '',
    family_member5_gender: '',
    family_member5_aadhaar: '',
    family_member6_name: '',
    family_member6_age: '',
    family_member6_relation: '',
    family_member6_gender: '',
    family_member6_aadhaar: '',
    
    // Additional fields
    self_declaration_letter: false,
    after_2000_proof_submitted: false,
    timestamp: '',
    created_date: '',
    submittedBy:''
  }

  const steps = [
    { id: 1, title: 'Basic Information', icon: '🏢' },
    { id: 2, title: 'Personal Details', icon: '👤' },
    { id: 3, title: 'Address Contact', icon: '📍' },
    { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
    { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
    { id: 6, title: 'Images', icon: '📷' },
    { id: 7, title: 'Metadata', icon: '📄' }
  ]

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target
    if (selectedFiles && selectedFiles[0]) {
      setFiles(prev => ({
        ...prev,
        [name]: selectedFiles[0]
      }))
    }
  }

  const nextStep = (formik) => {
    // Validate current step before proceeding
    const currentSchema = validationSchemas[currentStep]
    if (currentSchema) {
      formik.validateForm().then(errors => {
        const stepErrors = Object.keys(errors).length > 0
        if (!stepErrors) {
          if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
          }
        }
      })
    } else {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

    const toBase64 = (url) =>
  fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));
    




// ✅ Jodpatra-3 PDF Generator
const generateJodpatra3 = async (data) => {
  // अर्जदाराचा फोटो base64 मध्ये
  const imageUrl = data.front_photo_path
    ? JSON.parse(data.front_photo_path)[0]
    : null;

  let base64Image = "";
  if (imageUrl) {
    try {
      base64Image = await toBase64(imageUrl);
    } catch (e) {
      console.error("Photo load error:", e);
    }
  }

  return new Promise((resolve, reject) => {
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

    // HTML Layout
    pdfElement.innerHTML = `
      <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
        <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
        <hr style="margin: 8px 0; border: 1px solid #000;">
        <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
        <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
        <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
      </div>

      <!-- अर्ज क्र + दिनांक -->
      <div style="margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <tr>
            <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${
              data.slum_id || "N/A"
            }</td>
            <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString(
              "en-GB"
            )}</td>
          </tr>
        </table>
      </div>

      <!-- फोटो -->
      <div style="text-align: left; margin-bottom: 20px;">
        <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
          ${
            base64Image
              ? `<img src="${base64Image}" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
              : `<span style="font-size: 10px;">अर्जदाराचा<br>फोटो</span>`
          }
        </div>
        <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
      </div>

      <!-- अर्जदाराची माहिती -->
      <div style="margin-bottom: 20px;">
        <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
          <tr>
            <td style="border: 1px solid #000; padding: 5px; width: 35%; font-weight: bold;">१. अर्जदाराचे नाव:</td>
            <td style="border: 1px solid #000; padding: 5px;">${
              data.first_name || ""
            } ${data.middle_name || ""} ${data.last_name || ""}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
            <td style="border: 1px solid #000; padding: 5px;">${
              data.gender || ""
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
            <td style="border: 1px solid #000; padding: 5px;">${
              data.aadhaar_number || ""
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
            <td style="border: 1px solid #000; padding: 5px;">${
              data.current_mobile_number || ""
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
            <td style="border: 1px solid #000; padding: 5px;">${
              data.name_of_slum_area || ""
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
            <td style="border: 1px solid #000; padding: 5px;">${
              data.ward || ""
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
            <td style="border: 1px solid #000; padding: 5px;">${
              data.current_address || ""
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
            <td style="border: 1px solid #000; padding: 5px;">${
              data.residency_since || ""
            }</td>
          </tr>
        </table>
      </div>

      <!-- कुटुंबातील सदस्य -->
      <div style="margin-bottom: 20px;">
        <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
          <tr>
            <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
            <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
            <th style="border: 1px solid #000; padding: 4px;">वय</th>
            <th style="border: 1px solid #000; padding: 4px;">नातं</th>
            <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
            <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
          </tr>
          ${Array.from(
            { length: Math.min(parseInt(data.num_family_members) || 0, 6) },
            (_, i) => {
              const memberNum = i + 1;
              return `
              <tr>
                <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
                <td style="border: 1px solid #000; padding: 4px;">${
                  data[`family_member${memberNum}_name`] || ""
                }</td>
                <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
                  data[`family_member${memberNum}_age`] || ""
                }</td>
                <td style="border: 1px solid #000; padding: 4px;">${
                  data[`family_member${memberNum}_relation`] || ""
                }</td>
                <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
                  data[`family_member${memberNum}_gender`] || ""
                }</td>
                <td style="border: 1px solid #000; padding: 4px;">${
                  data[`family_member${memberNum}_aadhaar`] || ""
                }</td>
              </tr>
            `;
            }
          ).join("")}
        </table>
      </div>

      <!-- सही / QR -->
      <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
        <div style="text-align: center;">
          <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
            <span style="font-size: 8px;">QR Code</span>
          </div>
          <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
          <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
        </div>
      </div>
    `;

    document.body.appendChild(pdfElement);

    setTimeout(() => {
      html2canvas(pdfElement, { scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

          pdf.save(
            `Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`
          );

          document.body.removeChild(pdfElement);
          resolve(true);
        })
        .catch((err) => {
          document.body.removeChild(pdfElement);
          reject(err);
        });
    }, 500);
  });
};


// ---------------------------------------------------------------------------------------------


const generateJodpatra4 =async (data) => {
    console.log("data>>>>>",data)

     // 1️⃣ Image base64 बनवा
//   const imageUrl = "https://via.placeholder.com/100";
  const imageUrl = "https://sratoday.s3.ap-south-1.amazonaws.com/sra_uploads/doc_front_view-1758618100134.png";
const proxyUrl = "https://cors-anywhere.herokuapp.com/" + imageUrl;

  const base64Image = await toBase64(proxyUrl);




  return new Promise((resolve, reject) => {
    const pdfElement = document.createElement('div');
    pdfElement.style.width = '210mm';
    pdfElement.style.minHeight = '297mm';
    pdfElement.style.padding = '15mm';
    pdfElement.style.fontFamily = 'Arial, sans-serif';
    pdfElement.style.fontSize = '12px';
    pdfElement.style.lineHeight = '1.4';
    pdfElement.style.backgroundColor = 'white';
    pdfElement.style.position = 'absolute';
    pdfElement.style.top = '-9999px';

    // जोडपत्र-4 की बिल्कुल वही layout जो आपने screenshot में दिखाया है
    pdfElement.innerHTML = `
      <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
        <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
        <hr style="margin: 8px 0; border: 1px solid #000;">
        <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
        <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
        <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या  रहात असल्यास करावयाचा अर्ज</p>
        
      
      </div>

      <div style="margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <tr>
            <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.length-1 || "N/A"}</td>
            <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
          </tr>
        </table>
      </div>

    
 <div style="text-align: left; margin-bottom: 20px;">
        <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
          <img 
            src="${base64Image}" 
            alt="Arjdaar Photo" 
            style="width: 100%; height: 100%; object-fit: cover;" 
          />
        </div>
        <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
      </div>


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
            <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
            <td style="border: 1px solid #000; padding: 5px;">${data.name_of_slum_area || ""}</td>
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
            <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${data.num_family_members || ""} सदस्य</td>
          </tr>
        </table>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
          <tr">
            <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
            <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
            <th style="border: 1px solid #000; padding: 4px;">वय</th>
            <th style="border: 1px solid #000; padding: 4px;">नातं</th>
            <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
            <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
          </tr>
          ${Array.from({length: Math.min(parseInt(data.num_family_members) || 0, 6)}, (_, i) => {
            const memberNum = i + 1;
            return `
              <tr>
                <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
                <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_name`] || ""}</td>
                <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_age`] || ""}</td>
                <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_relation`] || ""}</td>
                <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_gender`] || ""}</td>
                <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_aadhaar`] || ""}</td>
              </tr>
            `;
          }).join('')}
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
      <span style="font-size: 8px;">QR Code</span>
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

    setTimeout(() => {
      html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Calculate height to maintain aspect ratio
        const canvasHeight = (canvas.height * pageWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, canvasHeight);
        
        // ✅ PDF डाउनलोड करतो
        pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);
        
        document.body.removeChild(pdfElement);
        resolve(true);
      }).catch((err) => {
        document.body.removeChild(pdfElement);
        reject(err);
      });
    }, 500);
  });
};







const generateAndDownloadPdfs = async (formData) => {
    setGeneratingPdfs(true)
    
    try {
      const residencyYear = parseInt(formData.residency_since) || 2000
      console.log("Residency year:", residencyYear)
      
      if (residencyYear <= 2000) {
        // Generate jodpatra-3 for 2000 or before
        setSuccess("Generating Jodpatra-3 for residency 2000 or before...")
        console.log("Generating Jodpatra-3 for year:", residencyYear)
        
        await generateJodpatra3(formData)
        setSuccess("✅ Successfully generated and downloaded Jodpatra-3!")
        
      } else {
        // Generate jodpatra-4 for after 2000
        setSuccess("Generating Jodpatra-4 for residency after 2000...")
        console.log("Generating Jodpatra-4 for year:", residencyYear)
        
        await generateJodpatra4(formData)
        setSuccess("✅ Successfully generated and downloaded Jodpatra-4!")
      }
      
    } catch (error) {
      console.error("Error generating PDFs:", error)
      setError("Error generating PDFs: " + error.message)
    } finally {
      setTimeout(() => {
        setGeneratingPdfs(false)
      }, 3000)
    }
  }



    const addMember = () => {
    if (displayedMembers < 6) {
      setDisplayedMembers(displayedMembers + 1);
    }
  };

  const removeMember = () => {
    if (displayedMembers > 1) {
      setDisplayedMembers(displayedMembers - 1);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      const formDataToSend = new FormData()

      // Set submittedBy field with user role
      var currentUser = getUser()


      if (!currentUser) {
        // setUserDataLoading(true)
        // setSuccess("Getting user data...")
        currentUser = await fetchAndSetUserProfile()
        // setUserDataLoading(false)
      }

      const submittedByValue = currentUser?.user_id || "N/A";

      
      // Add submittedBy to the values
      const updatedValues = {
        ...values,
        submittedBy: submittedByValue,
        // timestamp: new Date().toISOString(),
        // created_date: new Date().toISOString()
      }


      // Add all form fields
      Object.keys(updatedValues).forEach(key => {
        if (updatedValues[key] !== null && updatedValues[key] !== undefined && updatedValues[key] !== '') {
          formDataToSend.append(key, updatedValues[key])
        }
      })

      // Add files
      Object.keys(files).forEach(key => {
        if (files[key]) {
          formDataToSend.append(key, files[key])
        }
      })

      const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      setSuccess("Application submitted successfully! Now generating PDFs...")
      
      // Generate and download PDFs after successful submission
      await generateAndDownloadPdfs(values)
      
      setTimeout(() => {
        if (onSuccess) onSuccess()
      }, 3000)

    } catch (err) {
      console.error("Error submitting application:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = (formik) => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
                <Field
                  type="text"
                  name="cluster_number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum Name *</label>
                <Field
                  type="text"
                  name="name_of_slum_area"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="name_of_slum_area" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation *</label>
                <Field
                  type="text"
                  name="municipal_corporation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="municipal_corporation" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
                <Field
                  as="select"
                  name="ward"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Ward</option>
                  <option value="P/N">P/N</option>
                  <option value="G/N">G/N</option>
                  <option value="H/E">H/E</option>
                </Field>
                <ErrorMessage name="ward" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                <Field
                  as="select"
                  name="district"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select District</option>
                  <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
                  <option value="Mumbai City (District)">Mumbai City (District)</option>
                </Field>
                <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taluka *</label>
                <Field
                  as="select"
                  name="taluka"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Taluka</option>
                  <option value="malad">Malad</option>
                  <option value="borivali">Borivali</option>
                  <option value="andheri">Andheri</option>
                </Field>
                <ErrorMessage name="taluka" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
                <Field
                  type="text"
                  name="village"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
                <Field
                  type="text"
                  name="slum_id"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
                <Field
                  as="select"
                  name="slum_use"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Use</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Combine">Combine</option>
                  <option value="Social">Social</option>
                  <option value="Devotional">Devotional</option>
                  <option value="Educational">Educational</option>
                </Field>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum Floor</label>
                <Field
                  as="select"
                  name="slum_floor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Floor</option>
                  <option value="G">G</option>
                  <option value="G+1">G+1</option>
                  <option value="G+2">G+2</option>
                  <option value="G+3">G+3</option>
                  <option value="G+4">G+4</option>
                  <option value="G+5">G+5</option>
                </Field>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
                <Field
                  as="select"
                  name="ownership_of_slum_land"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Ownership</option>
                  <option value="State Government">State Government</option>
                  <option value="Central Government">Central Government</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Private">Private</option>
                </Field>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
                <Field
                  as="select"
                  name="survey_status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Hut Appose">Hut Appose</option>
                  <option value="Hut Denied">Hut Denied</option>
                  <option value="Completed">Completed</option>
                </Field>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Field
                  type="checkbox"
                  name="plan_submitted"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
                />
                <label className="text-sm font-medium text-gray-700">Plan Submitted</label>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Field
                  type="checkbox"
                  name="society_registered"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
                />
                <label className="text-sm font-medium text-gray-700">Society Registered</label>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <Field
                  type="text"
                  name="first_name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                <Field
                  type="text"
                  name="middle_name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="middle_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <Field
                  type="text"
                  name="last_name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number (12 digits) *</label>
                <Field
                  type="text"
                  name="aadhaar_number"
                  maxLength="12"
                  placeholder="123456789012"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number (10 digits)</label>
                <Field
                  type="tel"
                  name="aadhaar_mobile_number"
                  maxLength="10"
                  placeholder="9876543210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
                <Field
                  type="text"
                  name="spouse_name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
                <Field
                  type="email"
                  name="user_email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
                <Field
                  as="textarea"
                  name="aadhaar_address"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
                <Field
                  as="textarea"
                  name="current_address"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode (6 digits)</label>
                <Field
                  type="text"
                  name="aadhaar_pincode"
                  maxLength="6"
                  placeholder="400001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="aadhaar_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode (6 digits)</label>
                <Field
                  type="text"
                  name="current_pincode"
                  maxLength="6"
                  placeholder="400001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number (10 digits) *</label>
                <Field
                  type="tel"
                  name="current_mobile_number"
                  maxLength="10"
                  placeholder="9876543210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
                <Field
                  as="select"
                  name="voter_card_type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Voter Card Type</option>
                  <option value="EPIC 10 Digit">EPIC 10 Digit</option>
                  <option value="EPIC 14 Digit">EPIC 14 Digit</option>
                </Field>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number (10 digits)</label>
                <Field
                  type="text"
                  name="voter_card_number"
                  maxLength="10"
                  placeholder="ABC1234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
            {/* Bank Details Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">🏦</span>
                </div>
                Bank Details
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <Field
                    type="text"
                    name="bank_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <Field
                    type="text"
                    name="account_number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                  <Field
                    type="text"
                    name="ifsc_code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Slum Details Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">🏠</span>
                </div>
                Slum Details
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
                  <Field
                    type="number"
                    step="0.1"
                    name="length"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) => {
                      formik.setFieldValue('length', e.target.value)
                      const length = parseFloat(e.target.value) || 0
                      const width = parseFloat(formik.values.width) || 0
                      if (length > 0 && width > 0) {
                        formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
                      } else {
                        formik.setFieldValue('area_sq_m', '')
                      }
                    }}
                  />
                  <ErrorMessage name="length" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
                  <Field
                    type="number"
                    step="0.1"
                    name="width"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={(e) => {
                      formik.setFieldValue('width', e.target.value)
                      const width = parseFloat(e.target.value) || 0
                      const length = parseFloat(formik.values.length) || 0
                      if (length > 0 && width > 0) {
                        formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
                      } else {
                        formik.setFieldValue('area_sq_m', '')
                      }
                    }}
                  />
                  <ErrorMessage name="width" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
                  <Field
                    type="number"
                    step="0.01"
                    name="area_sq_m"
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all"
                    placeholder="Auto-calculated"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
                  <Field
                    type="number"
                    name="residency_since"
                    placeholder="1995"
                    min="1950"
                    max="2024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <ErrorMessage name="residency_since" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                  {formik.values.residency_since && (
                    <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
                      <p className="text-xs font-medium">
                        <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600" : "text-blue-600"}>
                          {parseInt(formik.values.residency_since) <= 2000 ? "2000 या आधी - Jodpatra-3 तयार होईल" : "2000 नंतर - Jodpatra-4 तयार होईल"}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 members)</h3>
            
            <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members *</label>
              <Field
                type="number"
                name="num_family_members"
                min="1"
                max="6"
                className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <ErrorMessage name="num_family_members" component="div" className="text-red-500 text-sm mt-1 font-medium" />
            </div>

            {[1, 2, 3, 4, 5, 6].map(memberNum => (
              <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50 shadow-sm hover:shadow-md transition-all">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">{memberNum}</span>
                  </div>
                  Family Member {memberNum}
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Field
                      type="text"
                      name={`family_member${memberNum}_name`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <Field
                      type="number"
                      name={`family_member${memberNum}_age`}
                      min="0"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relation
                    </label>
                    <Field
                      type="text"
                      name={`family_member${memberNum}_relation`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <Field
                      as="select"
                      name={`family_member${memberNum}_gender`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhaar Number (12 digits)
                    </label>
                    <Field
                      type="text"
                      name={`family_member${memberNum}_aadhaar`}
                      maxLength="12"
                      placeholder="123456789012"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: '📷' },
                { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: '👨‍👩‍👧‍👦' },
                { name: 'doc_front_view', label: 'Front View Photo', accept: 'image/*', icon: '🏠' },
                { name: 'doc_side_view', label: 'Side View Photo', accept: 'image/*', icon: '🏗️' },
                { name: 'doc_before_2000', label: 'Document Before 2000', accept: 'image/*,.pdf,.doc,.docx', icon: '📄' },
                { name: 'submitted_docs_before_2000', label: 'Submitted Docs Before 2000', accept: 'image/*,.pdf', icon: '📋' },
                { name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: '📃' },
                { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: '🏡' },
                { name: 'Seldeclaration_letter', label: 'Self Declaration Letter', accept: 'image/*,.pdf', icon: '✍️' },
                { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: '🍚' },
                { name: 'document_upload', label: 'General Document', accept: 'image/*,.pdf,.doc,.docx', icon: '📁' },
                { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜' },
                { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
                { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' }
              ].map(({ name, label, accept, icon }) => (
                <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">{icon}</span>
                    <h4 className="font-semibold text-gray-800">{label}</h4>
                  </div>
                  <input
                    type="file"
                    name={name}
                    onChange={handleFileChange}
                    accept={accept}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                  />
                  {files[name] && (
                    <div className="mt-2 p-2 bg-green-50 rounded flex items-center">
                      <span className="text-green-500 text-sm mr-2">✅</span>
                      <p className="text-sm text-green-700 truncate">{files[name].name}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3>
            <p className="text-gray-600">Please review all your information and click submit to proceed.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between overflow-x-auto bg-white rounded-xl shadow-lg p-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
                <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all ${
                  currentStep >= step.id 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-lg' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  <span className="text-xl">{step.icon}</span>
                  {currentStep >= step.id && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div className="ml-4 min-w-0">
                  <p className={`text-sm font-semibold transition-colors ${
                    currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'
                  }`}>
                    Step {step.id}
                  </p>
                  <p className={`text-xs truncate transition-colors ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full transition-all ${
                    currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[currentStep]}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                {renderStepContent(formik)}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
                      currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>

                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">
                      Step {currentStep} of {steps.length}
                    </div>
                    {formik.values.residency_since && currentStep === 4 && (
                      <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
                        <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600 font-semibold" : "text-blue-600 font-semibold"}>
                          {parseInt(formik.values.residency_since) <= 2000 ? "Jodpatra-3 तयार होईल" : "Jodpatra-4 तयार होईल"}
                        </span>
                      </div>
                    )}
                  </div>

                  {currentStep < steps.length ? (
                    <button
                      type="button"
                      onClick={() => nextStep(formik)}
                      className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Next
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || generatingPdfs || !formik.isValid}
                      className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
                        loading || generatingPdfs || !formik.isValid
                          ? 'bg-gray-400 cursor-not-allowed shadow-md' 
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                      } text-white`}
                    >
                      {loading || generatingPdfs ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          {generatingPdfs ? 'Generating PDFs...' : 'Submitting...'}
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Submit & Generate PDFs
                        </>
                      )}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm




