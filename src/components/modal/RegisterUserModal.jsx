// "use client"
// import React, { useState } from "react"
// import {
//   User,
//   Mail,
//   Phone,
//   Lock,
//   UserCheck,
//   MapPin,
//   Building,
//   X,
//   Check,
//   Eye,
//   EyeOff,
// } from "lucide-react"
// import roles from "../../data/rolesData.json"
// import talukasDistrict from "../../data/mumbaiTalukas.json"
// import toast, { Toaster } from "react-hot-toast"

// const BASE_URL = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in"

// export default function RegisterUserModal({ onNavigate }) {
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [talukas, setTalukas] = useState([])

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobileNumber: "",
//     password: "",
//     role: "",
//     district: "",
//     taluka: "",
//   })

//   const getAuthToken = () => localStorage.getItem("authToken")

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const response = await fetch(`${BASE_URL}/api/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getAuthToken()}`,
//         },
//         body: JSON.stringify(formData),
//       })

//       const data = await response.json()

//       if (!response.ok) throw new Error(data.message)

//       toast.success("User registered successfully 🎉")
//       setTimeout(() => onNavigate("getUser"), 1000)
//     } catch (error) {
//       toast.error(error.message || "Registration failed")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     // <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4 relative">
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <Toaster position="top-right" />

//       {/* Background Logo */}
//       {/* <div className="absolute inset-0 opacity-10">
//         <img
//           src="/images/logo.jpeg"
//           alt="Background"
//           className="w-full h-full object-contain"
//         />
//       </div> */}

//       {/* Modal Card */}
//       <div className="relative z-10 w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               Register New User
//             </h2>
//             <p className="text-sm text-gray-500">
//               Add a new user to the SRA system
//             </p>
//           </div>

//           <button
//             onClick={() => onNavigate("getUser")}
//             className="p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Full Name */}
//           <InputField icon={<User />} name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" />

//           {/* Password */}
//           <div>
//             <label className="text-sm font-medium text-gray-700 mb-1 block">
//               <Lock className="inline w-4 h-4 mr-2" />
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                 placeholder="Enter password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           <InputField icon={<Mail />} name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" />
//           <InputField icon={<Phone />} name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="Mobile Number" />

//           {/* Role */}
//           <SelectField
//             icon={<UserCheck />}
//             name="role"
//             value={formData.role}
//             onChange={handleInputChange}
//             options={roles}
//             placeholder="Select Role"
//           />

//           {/* District */}
//           <SelectField
//             icon={<Building />}
//             name="district"
//             value={formData.district}
//             onChange={(e) => {
//               handleInputChange(e)
//               const selected = talukasDistrict.find(
//                 (d) => d.districtName === e.target.value
//               )
//               setTalukas(selected ? selected.talukas : [])
//             }}
//             options={talukasDistrict.map((d) => ({
//               value: d.districtName,
//               label: d.districtName,
//             }))}
//             placeholder="Select District"
//           />

//           {/* Taluka */}
//           <SelectField
//             icon={<MapPin />}
//             name="taluka"
//             value={formData.taluka}
//             onChange={handleInputChange}
//             options={talukas.map((t) => ({ value: t, label: t }))}
//             placeholder="Select Taluka"
//           />

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 transition"
//           >
//             {isLoading ? "Registering..." : "Register User"}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// /* ---------- Reusable Components ---------- */

// const InputField = ({ icon, name, value, onChange, placeholder }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-700 mb-1 block flex items-center">
//       {icon}
//       <span className="ml-2">{placeholder}</span>
//     </label>
//     <input
//       type="text"
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
//       placeholder={placeholder}
//     />
//   </div>
// )

// const SelectField = ({ icon, name, value, onChange, options, placeholder }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-700 mb-1 block flex items-center">
//       {icon}
//       <span className="ml-2">{placeholder}</span>
//     </label>
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
//     >
//       <option value="">{placeholder}</option>
//       {options.map((opt, i) => (
//         <option key={i} value={opt.value}>
//           {opt.label}
//         </option>
//       ))}
//     </select>
//   </div>
// )


// ==========================


"use client"
import React, { useState } from "react"
import {
  User,
  Mail,
  Phone,
  Lock,
  UserCheck,
  MapPin,
  Building,
  X,
  Eye,
  EyeOff,
} from "lucide-react"
import roles from "../../data/rolesData.json"
import talukasDistrict from "../../data/mumbaiTalukas.json"
import toast, { Toaster } from "react-hot-toast"

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in"

export default function RegisterUserModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [talukas, setTalukas] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    role: "",
    district: "",
    taluka: "",
  })

  const getAuthToken = () => localStorage.getItem("authToken")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.message)

      toast.success("User registered successfully 🎉")

      setTimeout(() => {
        onClose()   // ✅ modal close
      }, 1000)

    } catch (error) {
      toast.error(error.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Toaster position="top-right" />

      {/* <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 relative"> */}
      {/* <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto"> */}
<div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl relative">

<div className="max-h-[85vh] overflow-hidden rounded-2xl">
  <div className="max-h-[85vh] overflow-y-auto px-8 py-8 pr-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Register New User
          </h2>
          <p className="text-sm text-gray-500">
            Add a new user to the SRA system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <InputField icon={<User />} name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" />

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              <Lock className="inline w-4 h-4 mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <InputField icon={<Mail />} name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" />
          <InputField icon={<Phone />} name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="Mobile Number" />

          {/* Role */}
          <SelectField
            icon={<UserCheck />}
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            options={roles}
            placeholder="Select Role"
          />

          {/* District */}
          <SelectField
            icon={<Building />}
            name="district"
            value={formData.district}
            onChange={(e) => {
              handleInputChange(e)
              const selected = talukasDistrict.find(
                (d) => d.districtName === e.target.value
              )
              setTalukas(selected ? selected.talukas : [])
            }}
            options={talukasDistrict.map((d) => ({
              value: d.districtName,
              label: d.districtName,
            }))}
            placeholder="Select District"
          />

          {/* Taluka */}
          <SelectField
            icon={<MapPin />}
            name="taluka"
            value={formData.taluka}
            onChange={handleInputChange}
            options={talukas.map((t) => ({ value: t, label: t }))}
            placeholder="Select Taluka"
          />

         <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 transition"
          >
            {isLoading ? "Registering..." : "Register User"}
          </button>
          </div>

        </form>
          </div>
</div>

      </div>
    </div>
  )
}

/* Reusable Components */

const InputField = ({ icon, name, value, onChange, placeholder }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block flex items-center">
      {icon}
      <span className="ml-2">{placeholder}</span>
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
      placeholder={placeholder}
    />
  </div>
)

const SelectField = ({ icon, name, value, onChange, options, placeholder }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block flex items-center">
      {icon}
      <span className="ml-2">{placeholder}</span>
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)
