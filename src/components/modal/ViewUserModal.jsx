import React from "react";
import { X, UserCheck, Mail, Phone, Building, MapPin } from "lucide-react";

const ViewUserModal = ({ user, open, onClose }) => {
  if (!open) return null;

  const getRoleBadgeColor = (role) => {
    switch ((role || "").toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "surveyor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/28" onClick={() => onClose && onClose()} />
      <div className="relative z-50 w-[60%] max-w-2xl mx-4">
        <div className="bg-white/75 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">User Details</h2>
              <p className="text-sm text-slate-600">Read-only view</p>
            </div>
            <button onClick={() => onClose && onClose()} className="p-2 rounded-full hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-800">{user?.name || "N/A"}</div>
                <div className="text-sm text-slate-500">ID: {user?.id || "N/A"}</div>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user?.role)}`}>
                    <UserCheck className="w-3 h-3 mr-1" />
                    {user?.role || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                {user?.email || "N/A"}
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                {user?.mobileNumber || "N/A"}
              </div>
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-2 text-gray-400" />
                {user?.district || "N/A"}
                {user?.taluka && (
                  <>
                    <MapPin className="w-3 h-3 mx-1 text-gray-400" />
                    {user?.taluka}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-slate-500">
            <div><strong>Joined:</strong> {user?.created_date || "N/A"}</div>
            {/* any more meta can go here */}
          </div>

          <div className="flex justify-end pt-4">
            <button onClick={() => onClose && onClose()} className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
