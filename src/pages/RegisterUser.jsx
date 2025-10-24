import React, { useState } from 'react';
import { User, Mail, Phone, Lock, UserCheck, MapPin, Building, X, Check,Eye, EyeOff } from 'lucide-react';
import {getAuthToken} from "../utils/auth.js"

const RegisterUser = ({onNavigate}) => {
    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    district: '',
    taluka: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getAuthToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  };

  const roles = [
    { value: '', label: 'Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'surveyor', label: 'Surveyor' },
  ];


  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }


    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.district) {
      newErrors.district = 'District is required';
    }

    if (!formData.taluka) {
      newErrors.taluka = 'Taluka is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

   

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);
  const token = getAuthToken();

  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: formData.name,   // backend expects `name`, map from fullName
        email: formData.email,
        password: formData.password,
        role: formData.role,
        district: formData.district,
        taluka: formData.taluka
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    console.log("API response:", data);

    // Reset form on success
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      district: "",
      taluka: ""
    });

    alert("User registered successfully!");
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message || "Failed to register user. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: '',
      district: '',
      taluka: ''
    });
    setErrors({});
  };

  const getCurrentTalukas = () => {
    return talukas[formData.district] || talukas.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Register New User</h1>
          <p className="text-slate-600">Add a new user to the SRA system</p>
        </div>
        
        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
                  errors.name 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-orange-400'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-orange-400'
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>


            {/* Password */}
           <div>
  <label className="block text-slate-700 font-medium mb-2">
    <Lock className="inline w-4 h-4 mr-2" />
    Password
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleInputChange}
      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
        errors.password 
          ? "border-red-300 focus:border-red-500" 
          : "border-gray-200 focus:border-orange-400"
      }`}
      placeholder="Enter password (min. 6 characters)"
    />
    {/* Eye button */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1 flex items-center">
      <X className="w-4 h-4 mr-1" />
      {errors.password}
    </p>
  )}
</div>

            {/* Role */}
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                <UserCheck className="inline w-4 h-4 mr-2" />
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
                  errors.role 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-orange-400'
                }`}
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.role}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* District */}
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  <Building className="inline w-4 h-4 mr-2" />
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
                    errors.district 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-orange-400'
                  }`}
                  placeholder="Enter district"
                />
                {errors.district && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <X className="w-4 h-4 mr-1" />
                    {errors.district}
                  </p>
                )}
              </div>

              {/* Taluka */}
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Taluka
                </label>
                <input
                  type="text"
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
                    errors.taluka 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-orange-400'
                  }`}
                  placeholder="Enter taluka"
                />
                {errors.taluka && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <X className="w-4 h-4 mr-1" />
                    {errors.taluka}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Registering...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Register User
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 md:flex-initial bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
              >
                <X className="w-5 h-5 mr-2" />
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-600">
          <p>All fields are required. Please ensure information is accurate.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;