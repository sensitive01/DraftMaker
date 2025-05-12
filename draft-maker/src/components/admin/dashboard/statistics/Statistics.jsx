import React from 'react';
import { 
  Calendar, 
  Users, 
  ClipboardList, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

const DashboardCard = ({ icon: Icon, title, value, bgColor, textColor, iconBgColor }) => (
  <div className={`${bgColor} ${textColor} rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300`}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium mb-2 opacity-80">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`${iconBgColor} p-3 rounded-full`}>
        <Icon size={28} className="opacity-70" />
      </div>
    </div>
  </div>
);

const Statistics = () => {
  // Sample data (you would typically fetch this from an API)
  const bookingStats = [
    {
      icon: Calendar,
      title: 'Total Bookings',
      value: '256',
      bgColor: 'bg-red-50',
      textColor: 'text-red-900',
      iconBgColor: 'bg-red-200'
    },
    {
      icon: ClipboardList,
      title: 'New Bookings',
      value: '42',
      bgColor: 'bg-red-50',
      textColor: 'text-red-900',
      iconBgColor: 'bg-red-200'
    },
    {
      icon: Clock,
      title: 'Pending Bookings',
      value: '15',
      bgColor: 'bg-red-50',
      textColor: 'text-red-900',
      iconBgColor: 'bg-red-200'
    },
    {
      icon: CheckCircle2,
      title: 'Completed Bookings',
      value: '199',
      bgColor: 'bg-red-50',
      textColor: 'text-red-900',
      iconBgColor: 'bg-red-200'
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-red-900 mb-2">Dashboard</h1>
        <p className="text-red-600">Welcome back, John Doe!</p>
      </div>

      {/* Booking Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bookingStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg border border-red-100 shadow-md">
        <div className="p-6 border-b border-red-100 bg-red-50">
          <h2 className="text-xl font-semibold text-red-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50 border-b border-red-100">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Booking ID</th>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Date</th>
                <th className="p-4 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-red-100">
              {[
                { id: '#B001', customer: 'Alice Johnson', date: '2024-05-10', status: 'Confirmed' },
                { id: '#B002', customer: 'Bob Smith', date: '2024-05-11', status: 'Pending' },
                { id: '#B003', customer: 'Charlie Brown', date: '2024-05-12', status: 'Completed' }
              ].map((booking, index) => (
                <tr key={index} className="hover:bg-red-50 transition-colors duration-200">
                  <td className="p-4 whitespace-nowrap text-sm text-red-500">{booking.id}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-red-900">{booking.customer}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-red-500">{booking.date}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`
                      px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}
                    `}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Create New Booking */}
        <div className="bg-red-50 rounded-lg p-6 border border-red-100 hover:shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold text-red-900 mb-4">Create New Booking</h3>
          <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
            New Booking
          </button>
        </div>

        {/* Quick Stats */}
        <div className="bg-red-50 rounded-lg p-6 border border-red-100 hover:shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold text-red-900 mb-4">Quick Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-red-600">Total Revenue</span>
              <span className="font-semibold text-red-900">$45,678</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-600">Average Booking Value</span>
              <span className="font-semibold text-red-900">$178</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;