import React, { useEffect, useState } from "react";
import { X, Check, Eye, EyeOff, User, Mail, Phone, Lock, UserCheck, Building, MapPin } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import roles from "../../data/rolesData.json";
import talukasDistrict from "../../data/mumbaiTalukas.json";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

const EditUserModal = ({ user, open, onClose, onUpdated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [talukas, setTalukas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    role: "",
    district: "",
    taluka: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && open) {
      setForm({
        name: user.name || user.fullName || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        password: "",
        role: user.role || "",
        district: user.district || "",
        taluka: user.taluka || "",
      });

      const selected = talukasDistrict.find((d) => d.districtName === (user.district || ""));
      setTalukas(selected ? selected.talukas : []);
    }
  }, [user, open]);

  const validate = () => {
    const newErr = {};
    if (!form.name.trim()) newErr.name = "Full name is required";
    if (!form.email.trim()) newErr.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErr.email = "Email is invalid";
    if (!form.mobileNumber) newErr.mobileNumber = "Mobile number is required";
    if (!form.role) newErr.role = "Role is required";
    if (!form.district) newErr.district = "District is required";
    if (!form.taluka) newErr.taluka = "Taluka is required";
    // password optional for edit, but if present must be >=6
    if (form.password && form.password.length > 0 && form.password.length < 6) {
      newErr.password = "Password must be at least 6 characters";
    }
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleDistrictChange = (e) => {
    handleChange(e);
    const selected = talukasDistrict.find((d) => d.districtName === e.target.value);
    setTalukas(selected ? selected.talukas : []);
    setForm((p) => ({ ...p, taluka: "" }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const token = getAuthToken();
      const payload = {
        name: form.name,
        email: form.email,
        mobileNumber: form.mobileNumber,
        role: form.role,
        district: form.district,
        taluka: form.taluka,
      };
      // include password only if provided
      if (form.password && form.password.length >= 6) payload.password = form.password;

      const res = await fetch(`${BASE_URL}/api/auth/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update user");

      toast.success(data.message || "User updated successfully");
      onUpdated && onUpdated(); // signal to parent to refresh
      onClose && onClose();
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <Toaster position="top-right" />
      {/* backdrop */}
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        <div className="absolute inset-0 backdrop-blur-sm bg-black/30" onClick={() => onClose && onClose()} />
        {/* modal */}
        <div className="relative z-50 w-[60%] max-w-3xl mx-4">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/40">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Edit User</h2>
                <p className="text-sm text-slate-600">Update user details and save changes</p>
              </div>
              <button onClick={() => onClose && onClose()} className="p-2 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-700 mb-1 font-medium">
                  <User className="inline w-4 h-4 mr-2" /> Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none ${
                    errors.name ? "border-red-300" : "border-gray-200 focus:border-orange-400"
                  }`}
                  placeholder="Enter full name"
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">
                    <Mail className="inline w-4 h-4 mr-2" /> Email
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none ${
                      errors.email ? "border-red-300" : "border-gray-200 focus:border-orange-400"
                    }`}
                    placeholder="Enter email"
                    type="email"
                  />
                  {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-medium">
                    <Phone className="inline w-4 h-4 mr-2" /> Mobile Number
                  </label>
                  <input
                    name="mobileNumber"
                    value={form.mobileNumber}
                    onChange={handleChange}
                    maxLength={10}
                    className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none ${
                      errors.mobileNumber ? "border-red-300" : "border-gray-200 focus:border-orange-400"
                    }`}
                    placeholder="Enter mobile number"
                  />
                  {errors.mobileNumber && <div className="text-red-500 text-sm mt-1">{errors.mobileNumber}</div>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">
                    <UserCheck className="inline w-4 h-4 mr-2" /> Role
                  </label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none ${
                      errors.role ? "border-red-300" : "border-gray-200 focus:border-orange-400"
                    }`}
                  >
                    {roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-medium">
                    <Lock className="inline w-4 h-4 mr-2" /> Password (optional)
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none ${
                        errors.password ? "border-red-300" : "border-gray-200 focus:border-orange-400"
                      }`}
                      placeholder="Enter new password (leave blank to keep existing)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">
                    <Building className="inline w-4 h-4 mr-2" /> District
                  </label>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleDistrictChange}
                    className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none ${
                      errors.district ? "border-red-300" : "border-gray-200 focus:border-orange-400"
                    }`}
                  >
                    <option value="">Select District</option>
                    {talukasDistrict.map((d) => (
                      <option key={d.districtName} value={d.districtName}>
                        {d.districtName}
                      </option>
                    ))}
                  </select>
                  {errors.district && <div className="text-red-500 text-sm mt-1">{errors.district}</div>}
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-medium">
                    <MapPin className="inline w-4 h-4 mr-2" /> Taluka
                  </label>
                  <select
                    name="taluka"
                    value={form.taluka}
                    onChange={handleChange}
                    disabled={!form.district}
                    className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none ${
                      errors.taluka ? "border-red-300" : "border-gray-200 focus:border-orange-400"
                    }`}
                  >
                    <option value="">Select Taluka</option>
                    {talukas.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.taluka && <div className="text-red-500 text-sm mt-1">{errors.taluka}</div>}
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => onClose && onClose()}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow"
                >
                  {isLoading ? "Saving..." : (
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserModal;
