import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, Filter, Eye, Edit, Trash2, UserCheck, Mail, Phone, MapPin, Building, AlertCircle, Loader } from 'lucide-react';
import {getAuthToken} from "../utils/auth.js"

const UsersList = ({onNavigate }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const getAuthToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = getAuthToken();
      const response = await fetch('https://sra.saavi.co.in/api/auth/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter and search users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.mobileNumber?.includes(searchTerm);
    const matchesRole = filterRole === '' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleRefresh = () => {
    fetchUsers();
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'surveyor':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">Loading users...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">User Management</h1>
          <p className="text-slate-600">Manage all users in the SRA system</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-orange-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Role Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="pl-10 pr-8 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors duration-200 bg-white"
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="surveyor">Surveyor</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="bg-slate-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors duration-300 flex items-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Refresh
              </button>
              
              <button
               onClick={() => onNavigate("registerUser")}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New User
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span>Total Users: <strong className="text-slate-800">{users.length}</strong></span>
              <span>Filtered Results: <strong className="text-slate-800">{filteredUsers.length}</strong></span>
              <span>Current Page: <strong className="text-slate-800">{currentPage} of {totalPages}</strong></span>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center text-red-700">
              <AlertCircle className="w-6 h-6 mr-3" />
              <div>
                <h3 className="font-semibold">Error Loading Users</h3>
                <p className="text-sm mt-1">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users List */}
        {!error && (
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
            {currentUsers.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No Users Found</h3>
                <p className="text-slate-500 mb-6">
                  {searchTerm || filterRole ? 'No users match your search criteria.' : 'No users have been registered yet.'}
                </p>
                {!searchTerm && !filterRole && (
                  <button
                    onClick={onNavigateToRegister}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Plus className="w-5 h-5 mr-2 inline" />
                    Add First User
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-orange-50 to-red-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User Details</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Contact</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role & Location</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Joined</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentUsers.map((user, index) => (
                        <tr key={user.id || index} className="hover:bg-orange-25 transition-colors duration-200">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-800">{user.fullName || 'N/A'}</div>
                                <div className="text-sm text-slate-500">ID: {user.id || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center text-sm text-slate-600">
                                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                {user.email || 'N/A'}
                              </div>
                              <div className="flex items-center text-sm text-slate-600">
                                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                {user.mobileNumber || 'N/A'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                                <UserCheck className="w-3 h-3 mr-1" />
                                {user.role?.charAt(0)?.toUpperCase() + user.role?.slice(1) || 'N/A'}
                              </span>
                              <div className="flex items-center text-sm text-slate-600">
                                <Building className="w-4 h-4 mr-1 text-gray-400" />
                                {user.district || 'N/A'}
                                {user.taluka && (
                                  <>
                                    <MapPin className="w-3 h-3 mx-1 text-gray-400" />
                                    {user.taluka}
                                  </>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden divide-y divide-gray-100">
                  {currentUsers.map((user, index) => (
                    <div key={user.id || index} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{user.fullName || 'N/A'}</div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)} mt-1`}>
                              <UserCheck className="w-3 h-3 mr-1" />
                              {user.role?.charAt(0)?.toUpperCase() + user.role?.slice(1) || 'N/A'}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-slate-600">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {user.email || 'N/A'}
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {user.mobileNumber || 'N/A'}
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Building className="w-4 h-4 mr-2 text-gray-400" />
                          {user.district || 'N/A'}
                          {user.taluka && (
                            <>
                              <MapPin className="w-3 h-3 mx-1 text-gray-400" />
                              {user.taluka}
                            </>
                          )}
                        </div>
                        <div className="text-slate-500">
                          Joined: {formatDate(user.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">
                        Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          Previous
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                              currentPage === i + 1
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                                : 'text-slate-600 bg-white border border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;