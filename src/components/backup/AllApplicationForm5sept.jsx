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

// -----------------------------------------------------------------------------------------------------------------------------------


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
//     id: '',
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
//     plan_submitted: 'false',
//     society_registered: 'false',
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     aadhaar_mobile_number: '',
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
    
//     // Family Members
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
    
//     // Other fields from JSON
//     aadhaar_number: '',
//     person_providing_info: '',
//     personprovidedinfo: '',
//     adivashihut: '',
//     assembly_constituency: '',
//     assembly_number: '',
//     voter_year: '',
//     part_number: '',
//     serial_number: '',
//     east_slum_no: '',
//     west_slum_no: '',
//     north_slum_no: '',
//     south_slum_no: '',
//     special_feature: '',
//     observation: '',
//     slum_number: '',
//     block_alphabet: '',
//     government_doc_info: '',
//     self_declaration_letter: 'false',
//     namepfbiometricperson: '',
//     doc_before_2000: '',
//     submitted_docs_before_2000: '',
//     description_doc_before_2000: '',
//     after_2000_proof_submitted: '',
//     possession_doc_info: '',
//     Seldeclaration_letter: '',
//     Ration_card_info: '',
//     Voter_card_info: '',
//     Other_doc_info: '',
//     ip_address: '',
//     timestamp: '',
//     sale_agreement: '',
//     document_type: '',
//     document_upload: '',
//     created_date: '',
//     created_time: ''
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
//     { id: 7, title: 'Images/Documents', icon: '📄' },
//     { id: 8, title: 'Review & Submit', icon: '✅' }
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

//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
//           formDataToSend.append(key, formData[key])
//         }
//       })

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
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
//                 <input
//                   type="text"
//                   name="id"
//                   value={formData.id}
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टीचे नाव *</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">महानगरपालिकाचे नाव *</label>
//                 <input
//                   type="text"
//                   name="municipal_corporation"
//                   value={formData.municipal_corporation}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Ward *</label>
//                 <select
//                   name="ward"
//                   value={formData.ward}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="Ward 1">Ward 1</option>
//                   <option value="Ward 2">Ward 2</option>
//                   <option value="Ward 3">Ward 3</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select District *</label>
//                 <select
//                   name="district"
//                   value={formData.district}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban">Mumbai Suburban</option>
//                   <option value="Mumbai City">Mumbai City</option>
//                   <option value="Thane">Thane</option>
//                   <option value="Pune">Pune</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">तालुका</label>
//                 <select
//                   name="taluka"
//                   value={formData.taluka}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="andheri">Andheri</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="bandra">Bandra</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">गाव</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टी वापर</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टी मजला</label>
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
//                 <input
//                   type="text"
//                   name="ownership_of_slum_land"
//                   value={formData.ownership_of_slum_land}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">सर्वेक्षणाची स्थिती</label>
//                 <select
//                   name="survey_status"
//                   value={formData.survey_status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                   <option value="Ready for Survey">Ready for Survey</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">योजना सादर केली आहे का?</label>
//                 <select
//                   name="plan_submitted"
//                   value={formData.plan_submitted}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="false">No</option>
//                   <option value="true">Yes</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">सोसायटी नोंदणीकृत आहे का?</label>
//                 <select
//                   name="society_registered"
//                   value={formData.society_registered}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="false">No</option>
//                   <option value="true">Yes</option>
//                 </select>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">नाव *</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">मधले नाव</label>
//                 <input
//                   type="text"
//                   name="middle_name"
//                   value={formData.middle_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आडनाव *</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">लिंग निवडा *</label>
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

//               <div>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Person Providing Info</label>
//                 <input
//                   type="text"
//                   name="person_providing_info"
//                   value={formData.person_providing_info}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center mt-6">
//               <input
//                 type="checkbox"
//                 name="self_declaration_letter"
//                 checked={formData.self_declaration_letter === 'true'}
//                 onChange={(e) => setFormData(prev => ({
//                   ...prev,
//                   self_declaration_letter: e.target.checked ? 'true' : 'false'
//                 }))}
//                 className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//               />
//               <label className="ml-2 block text-sm text-gray-700">
//                 सदर झोपडी हि एकाच झोपडीधारकाच्या मालकीची उसलयास
//               </label>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number *</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <input
//                   type="text"
//                   name="voter_card_type"
//                   value={formData.voter_card_type}
//                   onChange={handleInputChange}
//                   placeholder="Epic 10 Digit"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number (मराठीमध्ये)</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code (नंबर मराठीमध्ये आहे)</label>
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
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 Members)</h3>
            
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
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 7:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Images/Documents</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_self_path"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_self_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_self_path.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Family Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_family_path"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_family_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_family_path.name}</p>
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
//                   accept="image/*,.pdf,.doc,.docx"
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
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.after_2000_proof_submitted && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.after_2000_proof_submitted.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Possessional Doc Info</h4>
//                 <input
//                   type="file"
//                   name="possession_doc_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
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
//                 <h4 className="font-semibold mb-3">Document Upload</h4>
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

//       case 8:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit Application</h3>
            
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <h4 className="text-lg font-semibold text-blue-900 mb-4">📋 Application Summary</h4>
              
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Basic Information</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>ID:</strong> {formData.id}</p>
//                     <p><strong>Slum ID:</strong> {formData.slum_id}</p>
//                     <p><strong>Slum Area:</strong> {formData.name_of_slum_area}</p>
//                     <p><strong>Municipal Corporation:</strong> {formData.municipal_corporation}</p>
//                     <p><strong>Ward:</strong> {formData.ward}</p>
//                     <p><strong>District:</strong> {formData.district}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Personal Details</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Name:</strong> {formData.first_name} {formData.middle_name} {formData.last_name}</p>
//                     <p><strong>Gender:</strong> {formData.gender}</p>
//                     <p><strong>Mobile:</strong> {formData.current_mobile_number}</p>
//                     <p><strong>Email:</strong> {formData.user_email}</p>
//                     <p><strong>Spouse:</strong> {formData.spouse_name}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Slum Details</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Length:</strong> {formData.length}</p>
//                     <p><strong>Width:</strong> {formData.width}</p>
//                     <p><strong>Area:</strong> {formData.area_sq_m} sq m</p>
//                     <p><strong>Residency Since:</strong> {formData.residency_since}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Bank Details</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Bank Name:</strong> {formData.bank_name}</p>
//                     <p><strong>Account Number:</strong> {formData.account_number}</p>
//                     <p><strong>IFSC Code:</strong> {formData.ifsc_code}</p>
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
//                 ⚠️ कृपया सबमिट करण्यापूर्वी सर्व माहिती काळजीपूर्वक तपासा. एकदा सबमिट केल्यावर, आवश्यक असल्यास तुम्ही नंतर अर्ज संपादित करू शकता.
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
//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//           ✅ {success}
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//           ❌ {error}
//         </div>
//       )}

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
//               <div className="ml-3 hidden sm:block">
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

// --------------------------------------------------------------------------------------------------

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
//     id: '',
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
//     plan_submitted: 'false',
//     society_registered: 'false',
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     aadhaar_mobile_number: '',
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
    
//     // Family Members
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
    
//     // Other fields from JSON
//     aadhaar_number: '',
//     person_providing_info: '',
//     personprovidedinfo: '',
//     adivashihut: '',
//     assembly_constituency: '',
//     assembly_number: '',
//     voter_year: '',
//     part_number: '',
//     serial_number: '',
//     east_slum_no: '',
//     west_slum_no: '',
//     north_slum_no: '',
//     south_slum_no: '',
//     special_feature: '',
//     observation: '',
//     slum_number: '',
//     block_alphabet: '',
//     government_doc_info: '',
//     self_declaration_letter: 'false',
//     namepfbiometricperson: '',
//     doc_before_2000: '',
//     submitted_docs_before_2000: '',
//     description_doc_before_2000: '',
//     after_2000_proof_submitted: '',
//     possession_doc_info: '',
//     Seldeclaration_letter: '',
//     Ration_card_info: '',
//     Voter_card_info: '',
//     Other_doc_info: '',
//     ip_address: '',
//     timestamp: '',
//     sale_agreement: '',
//     document_type: '',
//     document_upload: '',
//     created_date: '',
//     created_time: ''
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
//     { id: 7, title: 'Images/Documents', icon: '📄' },
//     { id: 8, title: 'Review & Submit', icon: '✅' }
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

//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
//           formDataToSend.append(key, formData[key])
//         }
//       })

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
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
//                 <input
//                   type="text"
//                   name="id"
//                   value={formData.id}
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टीचे नाव *</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">महानगरपालिकाचे नाव *</label>
//                 <input
//                   type="text"
//                   name="municipal_corporation"
//                   value={formData.municipal_corporation}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Ward *</label>
//                 <select
//                   name="ward"
//                   value={formData.ward}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="Ward 1">Ward 1</option>
//                   <option value="Ward 2">Ward 2</option>
//                   <option value="Ward 3">Ward 3</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select District *</label>
//                 <select
//                   name="district"
//                   value={formData.district}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban">Mumbai Suburban</option>
//                   <option value="Mumbai City">Mumbai City</option>
//                   <option value="Thane">Thane</option>
//                   <option value="Pune">Pune</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">तालुका</label>
//                 <select
//                   name="taluka"
//                   value={formData.taluka}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="andheri">Andheri</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="bandra">Bandra</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">गाव</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टी वापर</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टी मजला</label>
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
//                 <input
//                   type="text"
//                   name="ownership_of_slum_land"
//                   value={formData.ownership_of_slum_land}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">सर्वेक्षणाची स्थिती</label>
//                 <select
//                   name="survey_status"
//                   value={formData.survey_status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                   <option value="Ready for Survey">Ready for Survey</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">योजना सादर केली आहे का?</label>
//                 <select
//                   name="plan_submitted"
//                   value={formData.plan_submitted}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="false">No</option>
//                   <option value="true">Yes</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">सोसायटी नोंदणीकृत आहे का?</label>
//                 <select
//                   name="society_registered"
//                   value={formData.society_registered}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="false">No</option>
//                   <option value="true">Yes</option>
//                 </select>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">नाव *</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">मधले नाव</label>
//                 <input
//                   type="text"
//                   name="middle_name"
//                   value={formData.middle_name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आडनाव *</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">लिंग निवडा *</label>
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

//               <div>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Person Providing Info</label>
//                 <input
//                   type="text"
//                   name="person_providing_info"
//                   value={formData.person_providing_info}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center mt-6">
//               <input
//                 type="checkbox"
//                 name="self_declaration_letter"
//                 checked={formData.self_declaration_letter === 'true'}
//                 onChange={(e) => setFormData(prev => ({
//                   ...prev,
//                   self_declaration_letter: e.target.checked ? 'true' : 'false'
//                 }))}
//                 className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//               />
//               <label className="ml-2 block text-sm text-gray-700">
//                 सदर झोपडी हि एकाच झोपडीधारकाच्या मालकीची उसलयास
//               </label>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number *</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <input
//                   type="text"
//                   name="voter_card_type"
//                   value={formData.voter_card_type}
//                   onChange={handleInputChange}
//                   placeholder="Epic 10 Digit"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number (मराठीमध्ये)</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code (नंबर मराठीमध्ये आहे)</label>
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
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 Members)</h3>
            
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
//                 </div>
//               </div>
//             ))}
//           </div>
//         )

//       case 7:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Images/Documents</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Self Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_self_path"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_self_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_self_path.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Family Photo</h4>
//                 <input
//                   type="file"
//                   name="photo_family_path"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.photo_family_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.photo_family_path.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Biometric Document</h4>
//                 <input
//                   type="file"
//                   name="biometric_path"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.biometric_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.biometric_path.name}</p>
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

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Declaration Video</h4>
//                 <input
//                   type="file"
//                   name="declaration_video_path"
//                   onChange={handleFileChange}
//                   accept="video/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.declaration_video_path && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.declaration_video_path.name}</p>
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
//                 <h4 className="font-semibold mb-3">Submitted Docs Before 2000</h4>
//                 <input
//                   type="file"
//                   name="submitted_docs_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.submitted_docs_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.submitted_docs_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Description Doc Before 2000</h4>
//                 <input
//                   type="file"
//                   name="description_doc_before_2000"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.description_doc_before_2000 && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.description_doc_before_2000.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">After 2000 Proof Submitted</h4>
//                 <input
//                   type="file"
//                   name="after_2000_proof_submitted"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {files.after_2000_proof_submitted && (
//                   <p className="text-sm text-green-600 mt-1">✅ {files.after_2000_proof_submitted.name}</p>
//                 )}
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Possessional Doc Info</h4>
//                 <input
//                   type="file"
//                   name="possession_doc_info"
//                   onChange={handleFileChange}
//                   accept="image/*,.pdf,.doc,.docx"
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
//                 <h4 className="font-semibold mb-3">Voter Card Info (Image)</h4>
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
//                 <h4 className="font-semibold mb-3">Other Doc Info</h4>
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

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold mb-3">Document Upload</h4>
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

//       case 8:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit Application</h3>
            
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <h4 className="text-lg font-semibold text-blue-900 mb-4">📋 Application Summary</h4>
              
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Basic Information</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>ID:</strong> {formData.id}</p>
//                     <p><strong>Slum ID:</strong> {formData.slum_id}</p>
//                     <p><strong>Slum Area:</strong> {formData.name_of_slum_area}</p>
//                     <p><strong>Municipal Corporation:</strong> {formData.municipal_corporation}</p>
//                     <p><strong>Ward:</strong> {formData.ward}</p>
//                     <p><strong>District:</strong> {formData.district}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Personal Details</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Name:</strong> {formData.first_name} {formData.middle_name} {formData.last_name}</p>
//                     <p><strong>Gender:</strong> {formData.gender}</p>
//                     <p><strong>Mobile:</strong> {formData.current_mobile_number}</p>
//                     <p><strong>Email:</strong> {formData.user_email}</p>
//                     <p><strong>Spouse:</strong> {formData.spouse_name}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Slum Details</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Length:</strong> {formData.length}</p>
//                     <p><strong>Width:</strong> {formData.width}</p>
//                     <p><strong>Area:</strong> {formData.area_sq_m} sq m</p>
//                     <p><strong>Residency Since:</strong> {formData.residency_since}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-2">Bank Details</h5>
//                   <div className="space-y-1 text-sm text-gray-700">
//                     <p><strong>Bank Name:</strong> {formData.bank_name}</p>
//                     <p><strong>Account Number:</strong> {formData.account_number}</p>
//                     <p><strong>IFSC Code:</strong> {formData.ifsc_code}</p>
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
//                 ⚠️ कृपया सबमिट करण्यापूर्वी सर्व माहिती काळजीपूर्वक तपासा. एकदा सबमिट केल्यावर, आवश्यक असल्यास तुम्ही नंतर अर्ज संपादित करू शकता.
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
//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//           ✅ {success}
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//           ❌ {error}
//         </div>
//       )}

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
//               <div className="ml-3 hidden sm:block">
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
// =====================================================================
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Save, Upload } from 'lucide-react'

const API_BASE_URL = "http://13.203.251.59:4200"

const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

const AddApplicationForm = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    id: '',
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
    survey_status: 'pending',
    plan_submitted: 'false',
    society_registered: 'false',
    
    // Personal Details
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    spouse_name: '',
    user_email: '',
    
    // Address Contact
    aadhaar_address: '',
    aadhaar_pincode: '',
    current_address: '',
    current_pincode: '',
    current_mobile_number: '',
    aadhaar_mobile_number: '',
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
    
    // Family Members
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
    
    // Additional fields from JSON reference
    aadhaar_number: '',
    person_providing_info: '',
    personprovidedinfo: '',
    adivashihut: '',
    assembly_constituency: '',
    assembly_number: '',
    voter_year: '',
    part_number: '',
    serial_number: '',
    east_slum_no: '',
    west_slum_no: '',
    north_slum_no: '',
    south_slum_no: '',
    special_feature: '',
    observation: '',
    slum_number: '',
    block_alphabet: '',
    government_doc_info: '',
    self_declaration_letter: 'false',
    namepfbiometricperson: '',
    
    // File path fields (these will store file names after upload)
    photo_self_path: '',
    photo_self_lat: '',
    photo_self_long: '',
    photo_family_path: '',
    photo_family_lat: '',
    photo_family_long: '',
    biometric_path: '',
    biometric_lat: '',
    biometric_long: '',
    front_photo_path: '',
    front_photo_lat: '',
    front_photo_long: '',
    side_photo_path: '',
    side_photo_lat: '',
    side_photo_long: '',
    inside_video_path: '',
    inside_video_lat: '',
    inside_video_long: '',
    declaration_video_path: '',
    declaration_video_lat: '',
    declaration_video_long: '',
    adivashihutimage: '',
    adivashihutimage_lat: '',
    adivashihutimage_long: '',
    doc_before_2000: '',
    doc_before_2000_lat: '',
    doc_before_2000_long: '',
    submitted_docs_before_2000: '',
    submitted_docs_before_2000_lat: '',
    submitted_docs_before_2000_long: '',
    description_doc_before_2000: '',
    description_doc_before_2000_lat: '',
    description_doc_before_2000_long: '',
    after_2000_proof_submitted: '',
    after_2000_proof_submitted_lat: '',
    after_2000_proof_submitted_long: '',
    possession_doc_info: '',
    possession_doc_info_lat: '',
    possession_doc_info_long: '',
    Seldeclaration_letter: '',
    Seldeclaration_letter_lat: '',
    Seldeclaration_letter_long: '',
    Ration_card_info: '',
    Ration_card_info_lat: '',
    Ration_card_info_long: '',
    Voter_card_info: '',
    Voter_card_info_lat: '',
    Voter_card_info_long: '',
    Other_doc_info: '',
    Other_doc_info_lat: '',
    Other_doc_info_long: '',
    
    // Other fields
    ip_address: '',
    timestamp: '',
    sale_agreement: '',
    document_type: '',
    document_upload: '',
    created_date: '',
    created_time: ''
  })
  
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const steps = [
    { id: 1, title: 'Basic Information', icon: '🏢' },
    { id: 2, title: 'Personal Details', icon: '👤' },
    { id: 3, title: 'Address Contact', icon: '📍' },
    { id: 4, title: 'Bank Details', icon: '🏦' },
    { id: 5, title: 'Slum Details', icon: '🏠' },
    { id: 6, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
    { id: 7, title: 'Additional Fields', icon: '📝' },
    { id: 8, title: 'Images/Documents', icon: '📄' },
    { id: 9, title: 'Review & Submit', icon: '✅' }
  ]

  // Define allowed file fields based on your backend configuration
  const allowedFileFields = [
    'photo_self_path',
    'photo_family_path',
    'biometric_path',
    'front_photo_path', 
    'side_photo_path',
    'inside_video_path',
    'declaration_video_path',
    'adivashihutimage',
    'doc_before_2000',
    'submitted_docs_before_2000',
    'description_doc_before_2000',
    'after_2000_proof_submitted',
    'possession_doc_info',
    'Seldeclaration_letter',
    'Ration_card_info',
    'Voter_card_info',
    'Other_doc_info',
    'document_upload'
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'true' : 'false') : value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target
    if (selectedFiles && selectedFiles[0]) {
      // Only allow files for predefined fields
      if (allowedFileFields.includes(name)) {
        setFiles(prev => ({
          ...prev,
          [name]: selectedFiles[0]
        }))
      } else {
        console.warn(`File field ${name} is not allowed`)
      }
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      const formDataToSend = new FormData()

      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          formDataToSend.append(key, formData[key])
        }
      })

      // Add only allowed files
      Object.keys(files).forEach(key => {
        if (files[key] && allowedFileFields.includes(key)) {
          formDataToSend.append(key, files[key])
        }
      })

      // Add current timestamp and IP info
      const now = new Date()
      formDataToSend.append('timestamp', now.toISOString())
      formDataToSend.append('created_date', now.toISOString().split('T')[0])
      formDataToSend.append('created_time', now.toTimeString().split(' ')[0])

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

      setSuccess("Application submitted successfully!")
      setTimeout(() => {
        onSuccess()
      }, 2000)

    } catch (err) {
      console.error("Error submitting application:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
                <input
                  type="text"
                  name="slum_id"
                  value={formData.slum_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टीचे नाव *</label>
                <input
                  type="text"
                  name="name_of_slum_area"
                  value={formData.name_of_slum_area}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">महानगरपालिकाचे नाव *</label>
                <input
                  type="text"
                  name="municipal_corporation"
                  value={formData.municipal_corporation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Ward *</label>
                <select
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Ward</option>
                  <option value="P/N">P/N</option>
                  <option value="Ward 1">Ward 1</option>
                  <option value="Ward 2">Ward 2</option>
                  <option value="Ward 3">Ward 3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select District *</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select District</option>
                  <option value="Mumbai Suburban">Mumbai Suburban</option>
                  <option value="Mumbai City">Mumbai City</option>
                  <option value="Thane">Thane</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">तालुका</label>
                <select
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Taluka</option>
                  <option value="malad">Malad</option>
                  <option value="andheri">Andheri</option>
                  <option value="borivali">Borivali</option>
                  <option value="bandra">Bandra</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">गाव</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
                <input
                  type="text"
                  name="cluster_number"
                  value={formData.cluster_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टी वापर</label>
                <select
                  name="slum_use"
                  value={formData.slum_use}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Use</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Combine">Combine</option>
                  <option value="Social">Social</option>
                  <option value="Devotional">Devotional</option>
                  <option value="Educational">Educational</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टी मजला</label>
                <select
                  name="slum_floor"
                  value={formData.slum_floor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Floor</option>
                  <option value="G">G</option>
                  <option value="G+1">G+1</option>
                  <option value="G+2">G+2</option>
                  <option value="G+3">G+3</option>
                  <option value="G+4">G+4</option>
                  <option value="G+5">G+5</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
                <input
                  type="text"
                  name="ownership_of_slum_land"
                  value={formData.ownership_of_slum_land}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">सर्वेक्षणाची स्थिती</label>
                <select
                  name="survey_status"
                  value={formData.survey_status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Ready for Survey">Ready for Survey</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">योजना सादर केली आहे का?</label>
                <select
                  name="plan_submitted"
                  value={formData.plan_submitted}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">सोसायटी नोंदणीकृत आहे का?</label>
                <select
                  name="society_registered"
                  value={formData.society_registered}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">नाव *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">मधले नाव</label>
                <input
                  type="text"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">आडनाव *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">लिंग निवडा *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
                <input
                  type="text"
                  name="spouse_name"
                  value={formData.spouse_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
                <input
                  type="text"
                  name="aadhaar_number"
                  value={formData.aadhaar_number}
                  onChange={handleInputChange}
                  maxLength="12"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Person Providing Info</label>
                <input
                  type="text"
                  name="person_providing_info"
                  value={formData.person_providing_info}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="self_declaration_letter"
                checked={formData.self_declaration_letter === 'true'}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                सदर झोपडी हि एकाच झोपडीधारकाच्या मालकीची उसलयास
              </label>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Address</label>
                <textarea
                  name="aadhaar_address"
                  value={formData.aadhaar_address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
                <textarea
                  name="current_address"
                  value={formData.current_address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Pincode</label>
                <input
                  type="text"
                  name="aadhaar_pincode"
                  value={formData.aadhaar_pincode}
                  onChange={handleInputChange}
                  maxLength="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode</label>
                <input
                  type="text"
                  name="current_pincode"
                  value={formData.current_pincode}
                  onChange={handleInputChange}
                  maxLength="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number *</label>
                <input
                  type="tel"
                  name="current_mobile_number"
                  value={formData.current_mobile_number}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
                <input
                  type="tel"
                  name="aadhaar_mobile_number"
                  value={formData.aadhaar_mobile_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
                <input
                  type="text"
                  name="voter_card_type"
                  value={formData.voter_card_type}
                  onChange={handleInputChange}
                  placeholder="Epic 10 Digit"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number (मराठीमध्ये)</label>
                <input
                  type="text"
                  name="voter_card_number"
                  value={formData.voter_card_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assembly Constituency</label>
                <input
                  type="text"
                  name="assembly_constituency"
                  value={formData.assembly_constituency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assembly Number</label>
                <input
                  type="text"
                  name="assembly_number"
                  value={formData.assembly_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter Year</label>
                <input
                  type="text"
                  name="voter_year"
                  value={formData.voter_year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Part Number</label>
                <input
                  type="text"
                  name="part_number"
                  value={formData.part_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
                <input
                  type="text"
                  name="serial_number"
                  value={formData.serial_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank Details</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input
                  type="text"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code (नंबर मराठीमध्ये आहे)</label>
                <input
                  type="text"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Slum Details</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                <input
                  type="number"
                  step="0.1"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                <input
                  type="number"
                  step="0.1"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
                <input
                  type="number"
                  step="0.01"
                  name="area_sq_m"
                  value={formData.area_sq_m}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since</label>
                <input
                  type="text"
                  name="residency_since"
                  value={formData.residency_since}
                  onChange={handleInputChange}
                  placeholder="1995"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum Number</label>
                <input
                  type="text"
                  name="slum_number"
                  value={formData.slum_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Block Alphabet</label>
                <input
                  type="text"
                  name="block_alphabet"
                  value={formData.block_alphabet}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">East Slum No</label>
                <input
                  type="text"
                  name="east_slum_no"
                  value={formData.east_slum_no}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">West Slum No</label>
                <input
                  type="text"
                  name="west_slum_no"
                  value={formData.west_slum_no}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">North Slum No</label>
                <input
                  type="text"
                  name="north_slum_no"
                  value={formData.north_slum_no}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">South Slum No</label>
                <input
                  type="text"
                  name="south_slum_no"
                  value={formData.south_slum_no}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Feature</label>
                <input
                  type="text"
                  name="special_feature"
                  value={formData.special_feature}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observation</label>
                <textarea
                  name="observation"
                  value={formData.observation}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 Members)</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members</label>
              <input
                type="number"
                name="num_family_members"
                value={formData.num_family_members}
                onChange={handleInputChange}
                min="1"
                max="6"
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {[1, 2, 3, 4, 5, 6].map(memberNum => (
              <div key={memberNum} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Family Member {memberNum}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name={`family_member${memberNum}_name`}
                      value={formData[`family_member${memberNum}_name`]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      name={`family_member${memberNum}_age`}
                      value={formData[`family_member${memberNum}_age`]}
                      onChange={handleInputChange}
                      min="0"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
                    <input
                      type="text"
                      name={`family_member${memberNum}_relation`}
                      value={formData[`family_member${memberNum}_relation`]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      name={`family_member${memberNum}_gender`}
                      value={formData[`family_member${memberNum}_gender`]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
                    <input
                      type="text"
                      name={`family_member${memberNum}_aadhaar`}
                      value={formData[`family_member${memberNum}_aadhaar`]}
                      onChange={handleInputChange}
                      maxLength="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Fields</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Person Provided Info</label>
                <input
                  type="text"
                  name="personprovidedinfo"
                  value={formData.personprovidedinfo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adivasi Hut</label>
                <input
                  type="text"
                  name="adivashihut"
                  value={formData.adivashihut}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Government Doc Info</label>
                <input
                  type="text"
                  name="government_doc_info"
                  value={formData.government_doc_info}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name of Biometric Person</label>
                <input
                  type="text"
                  name="namepfbiometricperson"
                  value={formData.namepfbiometricperson}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sale Agreement</label>
                <input
                  type="text"
                  name="sale_agreement"
                  value={formData.sale_agreement}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <input
                  type="text"
                  name="document_type"
                  value={formData.document_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IP Address</label>
                <input
                  type="text"
                  name="ip_address"
                  value={formData.ip_address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Images/Documents</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Self Photo</h4>
                <input
                  type="file"
                  name="photo_self_path"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.photo_self_path && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.photo_self_path.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Family Photo</h4>
                <input
                  type="file"
                  name="photo_family_path"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.photo_family_path && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.photo_family_path.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Biometric Document</h4>
                <input
                  type="file"
                  name="biometric_path"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.biometric_path && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.biometric_path.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Front Photo</h4>
                <input
                  type="file"
                  name="front_photo_path"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.front_photo_path && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.front_photo_path.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Side Photo</h4>
                <input
                  type="file"
                  name="side_photo_path"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.side_photo_path && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.side_photo_path.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Inside Video</h4>
                <input
                  type="file"
                  name="inside_video_path"
                  onChange={handleFileChange}
                  accept="video/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.inside_video_path && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.inside_video_path.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Declaration Video</h4>
                <input
                  type="file"
                  name="declaration_video_path"
                  onChange={handleFileChange}
                  accept="video/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.declaration_video_path && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.declaration_video_path.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Adivashi Hut Image</h4>
                <input
                  type="file"
                  name="adivashihutimage"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.adivashihutimage && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.adivashihutimage.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Document Before 2000</h4>
                <input
                  type="file"
                  name="doc_before_2000"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.doc_before_2000 && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.doc_before_2000.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Submitted Docs Before 2000</h4>
                <input
                  type="file"
                  name="submitted_docs_before_2000"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.submitted_docs_before_2000 && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.submitted_docs_before_2000.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Description Doc Before 2000</h4>
                <input
                  type="file"
                  name="description_doc_before_2000"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.description_doc_before_2000 && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.description_doc_before_2000.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">After 2000 Proof Submitted</h4>
                <input
                  type="file"
                  name="after_2000_proof_submitted"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.after_2000_proof_submitted && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.after_2000_proof_submitted.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Possessional Doc Info</h4>
                <input
                  type="file"
                  name="possession_doc_info"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.possession_doc_info && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.possession_doc_info.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Self Declaration Letter Image</h4>
                <input
                  type="file"
                  name="Seldeclaration_letter"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.Seldeclaration_letter && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.Seldeclaration_letter.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Ration Card Info (Image)</h4>
                <input
                  type="file"
                  name="Ration_card_info"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.Ration_card_info && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.Ration_card_info.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Voter Card Info (Image)</h4>
                <input
                  type="file"
                  name="Voter_card_info"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.Voter_card_info && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.Voter_card_info.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Other Doc Info</h4>
                <input
                  type="file"
                  name="Other_doc_info"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.Other_doc_info && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.Other_doc_info.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Document Upload</h4>
                <input
                  type="file"
                  name="document_upload"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.document_upload && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.document_upload.name}</p>
                )}
              </div>
            </div>
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit Application</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">📋 Application Summary</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Basic Information</h5>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>ID:</strong> {formData.id}</p>
                    <p><strong>Slum ID:</strong> {formData.slum_id}</p>
                    <p><strong>Slum Area:</strong> {formData.name_of_slum_area}</p>
                    <p><strong>Municipal Corporation:</strong> {formData.municipal_corporation}</p>
                    <p><strong>Ward:</strong> {formData.ward}</p>
                    <p><strong>District:</strong> {formData.district}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Personal Details</h5>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Name:</strong> {formData.first_name} {formData.middle_name} {formData.last_name}</p>
                    <p><strong>Gender:</strong> {formData.gender}</p>
                    <p><strong>Mobile:</strong> {formData.current_mobile_number}</p>
                    <p><strong>Email:</strong> {formData.user_email}</p>
                    <p><strong>Spouse:</strong> {formData.spouse_name}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Slum Details</h5>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Length:</strong> {formData.length}</p>
                    <p><strong>Width:</strong> {formData.width}</p>
                    <p><strong>Area:</strong> {formData.area_sq_m} sq m</p>
                    <p><strong>Residency Since:</strong> {formData.residency_since}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Bank Details</h5>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Bank Name:</strong> {formData.bank_name}</p>
                    <p><strong>Account Number:</strong> {formData.account_number}</p>
                    <p><strong>IFSC Code:</strong> {formData.ifsc_code}</p>
                  </div>
                </div>
              </div>

              {Object.keys(files).length > 0 && (
                <div className="mt-6">
                  <h5 className="font-medium text-gray-900 mb-2">📎 Uploaded Files ({Object.keys(files).length})</h5>
                  <div className="grid md:grid-cols-3 gap-2">
                    {Object.entries(files).map(([key, file]) => (
                      <div key={key} className="text-sm text-gray-600 bg-white p-2 rounded border">
                        <strong>{key.replace(/_/g, ' ')}:</strong> {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ कृपया सबमिट करण्यापूर्वी सर्व माहिती काळजीपूर्वक तपासा. एकदा सबमिट केल्यावर, आवश्यक असल्यास तुम्ही नंतर अर्ज संपादित करू शकता.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          ✅ {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          ❌ {error}
        </div>
      )}

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-orange-500 border-orange-500 text-white' 
                  : 'bg-white border-gray-300 text-gray-500'
              }`}>
                <span className="text-lg">{step.icon}</span>
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  Step {step.id}
                </p>
                <p className={`text-xs ${
                  currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddApplicationForm

// ---------------------------------------------------------

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Save, Upload } from 'lucide-react'

const API_BASE_URL = "http://13.203.251.59:4200"

const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

const AddApplicationForm = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    aadhaar_number: '',
    aadhaar_mobile_number: '',
    current_mobile_number: '',
    user_email: '',
    spouse_name: '',
    residency_since: '',
    
    // Address Information
    current_address: '',
    current_pincode: '',
    aadhaar_address: '',
    aadhaar_pincode: '',
    
    // Location Details
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
    survey_status: 'pending',
    person_providing_info: '',
    
    // Property Measurements
    length: '',
    width: '',
    area_sq_m: '',
    special_feature: '',
    observation: '',
    
    // Voter Information
    voter_card_type: '',
    voter_card_number: '',
    assembly_constituency: '',
    assembly_number: '',
    voter_year: '',
    part_number: '',
    serial_number: '',
    
    // Bank Details
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    
    // Family Information
    num_family_members: '',
    family_member1_name: '',
    family_member1_aadhaar: '',
    family_member1_age: '',
    family_member1_relation: '',
    family_member1_gender: '',
    family_member2_name: '',
    family_member2_aadhaar: '',
    family_member2_age: '',
    family_member2_relation: '',
    family_member2_gender: '',
    family_member3_name: '',
    family_member3_aadhaar: '',
    family_member3_age: '',
    family_member3_relation: '',
    family_member3_gender: '',
    family_member4_name: '',
    family_member4_aadhaar: '',
    family_member4_age: '',
    family_member4_relation: '',
    family_member4_gender: '',
    family_member5_name: '',
    family_member5_aadhaar: '',
    family_member5_age: '',
    family_member5_relation: '',
    family_member5_gender: '',
    family_member6_name: '',
    family_member6_aadhaar: '',
    family_member6_age: '',
    family_member6_relation: '',
    family_member6_gender: '',
    
    // Document Information
    doc_before_2000: '',
    submitted_docs_before_2000: '',
    description_doc_before_2000: '',
    after_2000_proof_submitted: null,
    possession_doc_info: '',
    document_type: '',
    
    // Additional Fields from reference
    plan_submitted: 'false',
    society_registered: 'false',
    east_slum_no: '',
    west_slum_no: '',
    north_slum_no: '',
    south_slum_no: '',
    slum_number: '',
    block_alphabet: '',
    government_doc_info: '',
    self_declaration_letter: 'false',
    ip_address: '',
    personprovidedinfo: '',
    adivashihut: '',
    namepfbiometricperson: '',
    sale_agreement: '',
    document_upload: '',

    // Location coordinates
    photo_self_lat: '',
    photo_self_long: '',
    photo_family_lat: '',
    photo_family_long: '',
    biometric_lat: '',
    biometric_long: '',
    front_photo_lat: '',
    front_photo_long: '',
    side_photo_lat: '',
    side_photo_long: '',
    inside_video_lat: '',
    inside_video_long: '',
    declaration_video_lat: '',
    declaration_video_long: '',
    adivashihutimage_lat: '',
    adivashihutimage_long: '',
    doc_before_2000_lat: '',
    doc_before_2000_long: '',
    submitted_docs_before_2000_lat: '',
    submitted_docs_before_2000_long: '',
    description_doc_before_2000_lat: '',
    description_doc_before_2000_long: '',
    after_2000_proof_submitted_lat: '',
    after_2000_proof_submitted_long: '',
    possession_doc_info_lat: '',
    possession_doc_info_long: '',
    Seldeclaration_letter_lat: '',
    Seldeclaration_letter_long: '',
    Ration_card_info_lat: '',
    Ration_card_info_long: '',
    Voter_card_info_lat: '',
    Voter_card_info_long: '',
    Other_doc_info_lat: '',
    Other_doc_info_long: ''
  })
  
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const steps = [
    { id: 1, title: 'Personal Details', icon: '👤' },
    { id: 2, title: 'Address & Location', icon: '📍' },
    { id: 3, title: 'Property Details', icon: '🏠' },
    { id: 4, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
    { id: 5, title: 'Documents', icon: '📄' },
    { id: 6, title: 'Review & Submit', icon: '✅' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'true' : 'false') : value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target
    if (selectedFiles && selectedFiles[0]) {
      setFiles(prev => ({
        ...prev,
        [name]: selectedFiles[0]
      }))
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      const formDataToSend = new FormData()

      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          formDataToSend.append(key, formData[key])
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

      setSuccess("Application submitted successfully!")
      setTimeout(() => {
        onSuccess()
      }, 2000)

    } catch (err) {
      console.error("Error submitting application:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                <input
                  type="text"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number *</label>
                <input
                  type="text"
                  name="aadhaar_number"
                  value={formData.aadhaar_number}
                  onChange={handleInputChange}
                  maxLength="12"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  name="current_mobile_number"
                  value={formData.current_mobile_number}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
                <input
                  type="tel"
                  name="aadhaar_mobile_number"
                  value={formData.aadhaar_mobile_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
                <input
                  type="text"
                  name="spouse_name"
                  value={formData.spouse_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since</label>
                <input
                  type="text"
                  name="residency_since"
                  value={formData.residency_since}
                  onChange={handleInputChange}
                  placeholder="YYYY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Person Providing Info</label>
                <input
                  type="text"
                  name="person_providing_info"
                  value={formData.person_providing_info}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Person Provided Info</label>
                <input
                  type="text"
                  name="personprovidedinfo"
                  value={formData.personprovidedinfo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name of Biometric Person</label>
                <input
                  type="text"
                  name="namepfbiometricperson"
                  value={formData.namepfbiometricperson}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adivashi Hut</label>
                <input
                  type="text"
                  name="adivashihut"
                  value={formData.adivashihut}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Address & Location Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
                <textarea
                  name="current_address"
                  value={formData.current_address}
                  onChange={handleInputChange}
                  rows="3"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Address</label>
                <textarea
                  name="aadhaar_address"
                  value={formData.aadhaar_address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode *</label>
                <input
                  type="text"
                  name="current_pincode"
                  value={formData.current_pincode}
                  onChange={handleInputChange}
                  maxLength="6"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Pincode</label>
                <input
                  type="text"
                  name="aadhaar_pincode"
                  value={formData.aadhaar_pincode}
                  onChange={handleInputChange}
                  maxLength="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Location Details</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
                <input
                  type="text"
                  name="slum_id"
                  value={formData.slum_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name of Slum Area *</label>
                <input
                  type="text"
                  name="name_of_slum_area"
                  value={formData.name_of_slum_area}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation</label>
                <input
                  type="text"
                  name="municipal_corporation"
                  value={formData.municipal_corporation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
                <input
                  type="text"
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
                <input
                  type="text"
                  name="cluster_number"
                  value={formData.cluster_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
                <select
                  name="ownership_of_slum_land"
                  value={formData.ownership_of_slum_land}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Ownership</option>
                  <option value="State Government">State Government</option>
                  <option value="Central Government">Central Government</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Boundary Details</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">East Slum Number</label>
                <input
                  type="text"
                  name="east_slum_no"
                  value={formData.east_slum_no}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">West Slum Number</label>
                <input
                  type="text"
                  name="west_slum_no"
                  value={formData.west_slum_no}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">North Slum Number</label>
                <input
                  type="text"
                  name="north_slum_no"
                  value={formData.north_slum_no}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">South Slum Number</label>
                <input
                  type="text"
                  name="south_slum_no"
                  value={formData.south_slum_no}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
                <input
                  type="number"
                  step="0.1"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
                <input
                  type="number"
                  step="0.1"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq.m)</label>
                <input
                  type="number"
                  step="0.1"
                  name="area_sq_m"
                  value={formData.area_sq_m}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                <input
                  type="text"
                  name="slum_floor"
                  value={formData.slum_floor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
                <input
                  type="text"
                  name="slum_use"
                  value={formData.slum_use}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum Number</label>
                <input
                  type="text"
                  name="slum_number"
                  value={formData.slum_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Block Alphabet</label>
                <input
                  type="text"
                  name="block_alphabet"
                  value={formData.block_alphabet}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
                <select
                  name="survey_status"
                  value={formData.survey_status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="ready for survey">Ready for Survey</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Feature</label>
                <textarea
                  name="special_feature"
                  value={formData.special_feature}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observation</label>
                <textarea
                  name="observation"
                  value={formData.observation}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Bank Details</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input
                  type="text"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                <input
                  type="text"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Voter Information</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
                <input
                  type="text"
                  name="voter_card_type"
                  value={formData.voter_card_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number</label>
                <input
                  type="text"
                  name="voter_card_number"
                  value={formData.voter_card_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assembly Constituency</label>
                <input
                  type="text"
                  name="assembly_constituency"
                  value={formData.assembly_constituency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assembly Number</label>
                <input
                  type="text"
                  name="assembly_number"
                  value={formData.assembly_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter Year</label>
                <input
                  type="text"
                  name="voter_year"
                  value={formData.voter_year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Part Number</label>
                <input
                  type="text"
                  name="part_number"
                  value={formData.part_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
                <input
                  type="text"
                  name="serial_number"
                  value={formData.serial_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members Information</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members</label>
              <input
                type="number"
                name="num_family_members"
                value={formData.num_family_members}
                onChange={handleInputChange}
                min="1"
                max="10"
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {[1, 2, 3, 4, 5, 6].map(memberNum => (
              <div key={memberNum} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Family Member {memberNum}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name={`family_member${memberNum}_name`}
                      value={formData[`family_member${memberNum}_name`]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
                    <input
                      type="text"
                      name={`family_member${memberNum}_aadhaar`}
                      value={formData[`family_member${memberNum}_aadhaar`]}
                      onChange={handleInputChange}
                      maxLength="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      name={`family_member${memberNum}_age`}
                      value={formData[`family_member${memberNum}_age`]}
                      onChange={handleInputChange}
                      min="0"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
                    <input
                      type="text"
                      name={`family_member${memberNum}_relation`}
                      value={formData[`family_member${memberNum}_relation`]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      name={`family_member${memberNum}_gender`}
                      value={formData[`family_member${memberNum}_gender`]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Documents & Media Upload</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Self Photo</h4>
                <input
                  type="file"
                  name="photo_self"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.photo_self && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.photo_self.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Family Photo</h4>
                <input
                  type="file"
                  name="photo_family"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.photo_family && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.photo_family.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Biometric Document</h4>
                <input
                  type="file"
                  name="biometric"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.biometric && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.biometric.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Front Photo</h4>
                <input
                  type="file"
                  name="front_photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.front_photo && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.front_photo.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Side Photo</h4>
                <input
                  type="file"
                  name="side_photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.side_photo && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.side_photo.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Inside Video</h4>
                <input
                  type="file"
                  name="inside_video"
                  onChange={handleFileChange}
                  accept="video/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.inside_video && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.inside_video.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Declaration Video</h4>
                <input
                  type="file"
                  name="declaration_video"
                  onChange={handleFileChange}
                  accept="video/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.declaration_video && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.declaration_video.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Adivashi Hut Image</h4>
                <input
                  type="file"
                  name="adivashihutimage"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.adivashihutimage && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.adivashihutimage.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Document Before 2000</h4>
                <input
                  type="file"
                  name="doc_before_2000"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.doc_before_2000 && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.doc_before_2000.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Submitted Docs Before 2000</h4>
                <input
                  type="file"
                  name="submitted_docs_before_2000"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.submitted_docs_before_2000 && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.submitted_docs_before_2000.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Self Declaration Letter</h4>
                <input
                  type="file"
                  name="Seldeclaration_letter"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.Seldeclaration_letter && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.Seldeclaration_letter.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Ration Card Info</h4>
                <input
                  type="file"
                  name="Ration_card_info"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.Ration_card_info && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.Ration_card_info.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Voter Card Info</h4>
                <input
                  type="file"
                  name="Voter_card_info"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.Voter_card_info && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.Voter_card_info.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Other Documents</h4>
                <input
                  type="file"
                  name="Other_doc_info"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.Other_doc_info && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.Other_doc_info.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Sale Agreement</h4>
                <input
                  type="file"
                  name="sale_agreement"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.sale_agreement && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.sale_agreement.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Document Upload</h4>
                <input
                  type="file"
                  name="document_upload"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.document_upload && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.document_upload.name}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-900">Document Information</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description of Documents Before 2000</label>
                  <textarea
                    name="description_doc_before_2000"
                    value={formData.description_doc_before_2000}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Possession Document Info</label>
                  <textarea
                    name="possession_doc_info"
                    value={formData.possession_doc_info}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Government Document Info</label>
                  <textarea
                    name="government_doc_info"
                    value={formData.government_doc_info}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                  <input
                    type="text"
                    name="document_type"
                    value={formData.document_type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="after_2000_proof_submitted"
                    checked={formData.after_2000_proof_submitted === 'true'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">After 2000 Proof Submitted</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="self_declaration_letter"
                    checked={formData.self_declaration_letter === 'true'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Self Declaration Letter</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="plan_submitted"
                    checked={formData.plan_submitted === 'true'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Plan Submitted</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="society_registered"
                    checked={formData.society_registered === 'true'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Society Registered</label>
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit Application</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">📋 Application Summary</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Personal Information</h5>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Name:</strong> {formData.first_name} {formData.middle_name} {formData.last_name}</p>
                    <p><strong>Gender:</strong> {formData.gender}</p>
                    <p><strong>Aadhaar:</strong> {formData.aadhaar_number}</p>
                    <p><strong>Mobile:</strong> {formData.current_mobile_number}</p>
                    <p><strong>Email:</strong> {formData.user_email}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Location Details</h5>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Slum ID:</strong> {formData.slum_id}</p>
                    <p><strong>Area:</strong> {formData.name_of_slum_area}</p>
                    <p><strong>Ward:</strong> {formData.ward}</p>
                    <p><strong>District:</strong> {formData.district}</p>
                    <p><strong>Cluster:</strong> {formData.cluster_number}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Property Details</h5>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Length:</strong> {formData.length} m</p>
                    <p><strong>Width:</strong> {formData.width} m</p>
                    <p><strong>Area:</strong> {formData.area_sq_m} sq.m</p>
                    <p><strong>Floor:</strong> {formData.slum_floor}</p>
                    <p><strong>Use:</strong> {formData.slum_use}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Family & Documents</h5>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Family Members:</strong> {formData.num_family_members}</p>
                    <p><strong>Documents Uploaded:</strong> {Object.keys(files).length}</p>
                    <p><strong>Survey Status:</strong> {formData.survey_status}</p>
                  </div>
                </div>
              </div>

              {Object.keys(files).length > 0 && (
                <div className="mt-6">
                  <h5 className="font-medium text-gray-900 mb-2">📎 Uploaded Files ({Object.keys(files).length})</h5>
                  <div className="grid md:grid-cols-3 gap-2">
                    {Object.entries(files).map(([key, file]) => (
                      <div key={key} className="text-sm text-gray-600 bg-white p-2 rounded border">
                        <strong>{key.replace(/_/g, ' ')}:</strong> {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ Please review all information carefully before submitting. Once submitted, you can edit the application later if needed.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-orange-500 border-orange-500 text-white' 
                  : 'bg-white border-gray-300 text-gray-500'
              }`}>
                <span className="text-lg">{step.icon}</span>
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  Step {step.id}
                </p>
                <p className={`text-xs ${
                  currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            ✅ {success}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddApplicationForm

// ===========================

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Save, Upload } from 'lucide-react'

const API_BASE_URL = "http://13.203.251.59:4200"

const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

const AddApplicationForm = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
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
    created_date: ''
  })
  
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const steps = [
    { id: 1, title: 'Basic Information', icon: '🏢' },
    { id: 2, title: 'Personal Details', icon: '👤' },
    { id: 3, title: 'Address Contact', icon: '📍' },
    { id: 4, title: 'Bank Details', icon: '🏦' },
    { id: 5, title: 'Slum Details', icon: '🏠' },
    { id: 6, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
    { id: 7, title: 'Images', icon: '📷' },
    { id: 8, title: 'Metadata', icon: '📄' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target
    if (selectedFiles && selectedFiles[0]) {
      setFiles(prev => ({
        ...prev,
        [name]: selectedFiles[0]
      }))
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      const formDataToSend = new FormData()

      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          formDataToSend.append(key, formData[key])
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

      setSuccess("Application submitted successfully!")
      setTimeout(() => {
        onSuccess()
      }, 2000)

    } catch (err) {
      console.error("Error submitting application:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum ID *</label>
                <input
                  type="text"
                  name="slum_id"
                  value={formData.slum_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum Area *</label>
                <input
                  type="text"
                  name="name_of_slum_area"
                  value={formData.name_of_slum_area}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation</label>
                <input
                  type="text"
                  name="municipal_corporation"
                  value={formData.municipal_corporation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
                <select
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Ward</option>
                  <option value="P/N">P/N</option>
                  <option value="G/N">G/N</option>
                  <option value="H/E">H/E</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select District</option>
                  <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
                  <option value="Mumbai City (District)">Mumbai City (District)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
                <select
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Taluka</option>
                  <option value="malad">Malad</option>
                  <option value="borivali">Borivali</option>
                  <option value="andheri">Andheri</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
                <input
                  type="text"
                  name="cluster_number"
                  value={formData.cluster_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum Use</label>
                <input
                  type="text"
                  name="slum_use"
                  value={formData.slum_use}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slum Floor</label>
                <input
                  type="text"
                  name="slum_floor"
                  value={formData.slum_floor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label>
                <input
                  type="text"
                  name="ownership_of_slum_land"
                  value={formData.ownership_of_slum_land}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
                <input
                  type="text"
                  name="survey_status"
                  value={formData.survey_status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="plan_submitted"
                  checked={formData.plan_submitted}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Plan Submitted</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="society_registered"
                  checked={formData.society_registered}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Society Registered</label>
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
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                <input
                  type="text"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
                <input
                  type="text"
                  name="spouse_name"
                  value={formData.spouse_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
                <input
                  type="text"
                  name="aadhaar_number"
                  value={formData.aadhaar_number}
                  onChange={handleInputChange}
                  maxLength="12"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number</label>
                <input
                  type="tel"
                  name="aadhaar_mobile_number"
                  value={formData.aadhaar_mobile_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
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
                <textarea
                  name="aadhaar_address"
                  value={formData.aadhaar_address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
                <textarea
                  name="current_address"
                  value={formData.current_address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode</label>
                <input
                  type="text"
                  name="aadhaar_pincode"
                  value={formData.aadhaar_pincode}
                  onChange={handleInputChange}
                  maxLength="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode</label>
                <input
                  type="text"
                  name="current_pincode"
                  value={formData.current_pincode}
                  onChange={handleInputChange}
                  maxLength="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number</label>
                <input
                  type="tel"
                  name="current_mobile_number"
                  value={formData.current_mobile_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
                <input
                  type="text"
                  name="voter_card_type"
                  value={formData.voter_card_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number</label>
                <input
                  type="text"
                  name="voter_card_number"
                  value={formData.voter_card_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank Details</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input
                  type="text"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                <input
                  type="text"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Slum Details</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                <input
                  type="number"
                  step="0.1"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                <input
                  type="number"
                  step="0.1"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
                <input
                  type="number"
                  step="0.01"
                  name="area_sq_m"
                  value={formData.area_sq_m}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since</label>
                <input
                  type="text"
                  name="residency_since"
                  value={formData.residency_since}
                  onChange={handleInputChange}
                  placeholder="1995"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Member (Max 6 member)</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members</label>
              <input
                type="number"
                name="num_family_members"
                value={formData.num_family_members}
                onChange={handleInputChange}
                min="1"
                max="6"
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {[1, 2, 3, 4, 5, 6].map(memberNum => (
              <div key={memberNum} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Family Member {memberNum} {memberNum === 1 ? 'Name' : ''}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {memberNum === 1 ? 'Family Member1 Name' : `Family Member${memberNum} Name`}
                    </label>
                    <input
                      type="text"
                      name={`family_member${memberNum}_name`}
                      value={formData[`family_member${memberNum}_name`]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {memberNum === 1 ? 'Family Member1 Age' : `Family Member${memberNum} Age`}
                    </label>
                    <input
                      type="number"
                      name={`family_member${memberNum}_age`}
                      value={formData[`family_member${memberNum}_age`]}
                      onChange={handleInputChange}
                      min="0"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Family Member {memberNum} Relation
                    </label>
                    <input
                      type="text"
                      name={`family_member${memberNum}_relation`}
                      value={formData[`family_member${memberNum}_relation`]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Family Member {memberNum} Gender
                    </label>
                    <select
                      name={`family_member${memberNum}_gender`}
                      value={formData[`family_member${memberNum}_gender`]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Family Member {memberNum} Aadhar
                    </label>
                    <input
                      type="text"
                      name={`family_member${memberNum}_aadhaar`}
                      value={formData[`family_member${memberNum}_aadhaar`]}
                      onChange={handleInputChange}
                      maxLength="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Images</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Self Photo</h4>
                <input
                  type="file"
                  name="photo_self"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.photo_self && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.photo_self.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Family Photo</h4>
                <input
                  type="file"
                  name="photo_family"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.photo_family && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.photo_family.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Front Photo</h4>
                <input
                  type="file"
                  name="front_photo_path"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.front_photo_path && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.front_photo_path.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Side Photo</h4>
                <input
                  type="file"
                  name="side_photo_path"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.side_photo_path && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.side_photo_path.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Document Before 2000</h4>
                <input
                  type="file"
                  name="doc_before_2000"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.doc_before_2000 && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.doc_before_2000.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Submitted Docs Before 2000</h4>
                <input
                  type="file"
                  name="submitted_docs_before_2000"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.submitted_docs_before_2000 && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.submitted_docs_before_2000.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">After 2000 Proof Submitted</h4>
                <input
                  type="file"
                  name="after_2000_proof_submitted"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.after_2000_proof_submitted && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.after_2000_proof_submitted.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Possesional Doc Info</h4>
                <input
                  type="file"
                  name="possession_doc_info"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.possession_doc_info && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.possession_doc_info.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Self Declaration Letter Image</h4>
                <input
                  type="file"
                  name="Seldeclaration_letter"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.Seldeclaration_letter && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.Seldeclaration_letter.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Ration Card Info (Image)</h4>
                <input
                  type="file"
                  name="Ration_card_info"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.Ration_card_info && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.Ration_card_info.name}</p>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3">document_upload</h4>
                <input
                  type="file"
                  name="document_upload"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {files.document_upload && (
                  <p className="text-sm text-green-600 mt-1">✅ {files.document_upload.name}</p>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-orange-500 border-orange-500 text-white' 
                  : 'bg-white border-gray-300 text-gray-500'
              }`}>
                <span className="text-lg">{step.icon}</span>
              </div>
              <div className="ml-3 min-w-0">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  Step {step.id}
                </p>
                <p className={`text-xs truncate ${
                  currentStep >= step.id ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 min-w-8 ${
                  currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            ✅ {success}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddApplicationForm