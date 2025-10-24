import React from 'react'

const AllApplicationsCard = () => {
  return (
     <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{dashboardData.totalRecords?.[0]?.count || 0}</div>
            <div className="text-blue-800 text-sm font-medium">Total Applications</div>
          </div>
  )
}

export default AllApplicationsCard