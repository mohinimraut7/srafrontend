"use client"
import { Menu, Bell, User } from "lucide-react";
import { useLocation } from "react-router-dom"


const TopNavbar = ({ user, onToggleSidebar,currentPage}) => {
 const location = useLocation()   // ✅ route info इथे मिळेल
  console.log("Current Route:", location.pathname)
  console.log("currentPage",currentPage)
  // return (
  //   <header className="bg-white border-b border-gray-200 px-6 py-4">
  //     <div className="flex items-center justify-between">
  //       <div className="flex items-center space-x-4">
  //         <button onClick={onToggleSidebar} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
  //           <Menu className="h-5 w-5" />
  //         </button>
  //         {/* <div>
  //           <h1 className="text-lg font-semibold text-gray-900">MHADA</h1>
  //         </div> */}
  //         <div>
  //           {currentPage === "all-applications" ? (
  //             <div className="flex items-center justify-center space-x-4 mb-1">
  //               {/* <img 
  //                 src="/images/bmclogo.png" 
  //                 alt="Logo" 
  //                 className="w-7 h-7 object-cover"
  //               /> */}
  //               <h2 
  //                 style={{ color: "#4A5565", textTransform: "uppercase" }} 
  //                 className="text-2xl font-bold text-gray-800"
  //               >
  //                 Survey Status
  //               </h2>
  //             </div>
  //           ) : (
  //             <h1 className="text-lg font-semibold text-gray-900">BMC</h1>
  //           )}
  //         </div>
  //       </div>

  //       <div className="flex items-center space-x-4">
  //         <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative">
  //           <Bell className="h-5 w-5" />
  //           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
  //         </button>

  //         <div className="flex items-center space-x-3">
  //           <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
  //             <User className="h-4 w-4 text-white" />
  //           </div>
  //           <div className="hidden md:block">
  //             <p className="text-xs text-gray-500">{user?.role || "Administrator"}</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </header>
  // )
  return (
  <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 shadow-sm">
    <div className="flex items-center justify-between">

      {/* LEFT SECTION */}
      <div className="flex items-center space-x-4">

        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl text-gray-600 
          hover:bg-orange-100 hover:text-orange-600 
          transition-all duration-300"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page Title */}
        <div>
          {currentPage === "all-applications" ? (
            <div>
              <h2 className="text-2xl font-bold tracking-wide text-gray-800">
                Survey Status
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full mt-1"></div>
            </div>
          ) : (
            <h1 className="text-lg font-semibold text-gray-900">
              BMC Portal
            </h1>
          )}
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-6">

        {/* Notification */}
        {/* <button
          className="relative p-2 rounded-xl text-gray-600 
          hover:bg-orange-100 hover:text-orange-600
          transition-all duration-300"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button> */}

        {/* User Profile */}
        <div className="flex items-center space-x-3 bg-gray-50 px-3 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">

          <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-orange-600 
          rounded-full flex items-center justify-center shadow-md">
            <User className="h-4 w-4 text-white" />
          </div>

          <div className="hidden md:block">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {user?.role || "Administrator"}
            </p>
          </div>

        </div>

      </div>

    </div>
  </header>
)
}

export default TopNavbar
