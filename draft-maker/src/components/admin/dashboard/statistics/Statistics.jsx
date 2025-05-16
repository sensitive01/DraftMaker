import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { getDashboardStatistics } from "../../../../api/service/axiosService";

const DashboardCard = ({
  icon: Icon,
  title,
  value,
  bgColor,
  textColor,
  iconBgColor,
}) => (
  <div
    className={`${bgColor} ${textColor} rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300`}
  >
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
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalAmount: 0,
    pending: { bookings: 0, amount: 0 },
    completed: { bookings: 0, amount: 0 },
    cancelled: { bookings: 0, amount: 0 },
    processing: { bookings: 0, amount: 0 },
    processed: { bookings: 0, amount: 0 },
    approved: { bookings: 0, amount: 0 },
    delivered: { bookings: 0, amount: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStatistics();
        console.log("Dashboard data:", response);
        if (response && response.data) {
          setDashboardData(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard statistics:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare booking stats cards with actual data
  const bookingStats = [
    {
      icon: Calendar,
      title: "Total Bookings",
      value: dashboardData.totalBookings,
      bgColor: "bg-red-50",
      textColor: "text-red-900",
      iconBgColor: "bg-red-200",
    },
    {
      icon: Clock,
      title: "Pending Bookings",
      value: dashboardData.pending.bookings,
      bgColor: "bg-red-50",
      textColor: "text-red-900",
      iconBgColor: "bg-red-200",
    },
    {
      icon: CheckCircle2,
      title: "Completed Bookings",
      value: dashboardData.completed.bookings,
      bgColor: "bg-red-50",
      textColor: "text-red-900",
      iconBgColor: "bg-red-200",
    },
    {
      icon: AlertTriangle,
      title: "Cancelled Bookings",
      value: dashboardData.cancelled.bookings,
      bgColor: "bg-red-50",
      textColor: "text-red-900",
      iconBgColor: "bg-red-200",
    },
  ];

  // Sample recent bookings - in a real application, you would fetch this from an API
  const recentBookings = [
    {
      id: "#B001",
      customer: "Alice Johnson",
      date: "2024-05-10",
      status: "Pending",
    },
    {
      id: "#B002",
      customer: "Bob Smith",
      date: "2024-05-11",
      status: "Pending",
    },
    {
      id: "#B003",
      customer: "Charlie Brown",
      date: "2024-05-12",
      status: "Cancelled",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

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

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <div className="bg-red-50 rounded-lg p-6 border border-red-100 hover:shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold text-red-900 mb-4">
            Financial Overview
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-red-600">Total Revenue</span>
              <span className="font-semibold text-red-900">
                ₹{dashboardData.totalAmount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-600">Pending Amount</span>
              <span className="font-semibold text-red-900">
                ₹{dashboardData.pending.amount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-600">Average Booking Value</span>
              <span className="font-semibold text-red-900">
                ₹
                {dashboardData.totalBookings
                  ? Math.round(
                      dashboardData.totalAmount / dashboardData.totalBookings
                    )
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Status Overview */}
      <div className="bg-white rounded-lg border border-red-100 shadow-md">
        <div className="p-6 border-b border-red-100 bg-red-50">
          <h2 className="text-xl font-semibold text-red-900">
            Booking Status Overview
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {Object.entries({
            Processing: dashboardData.processing,
            Processed: dashboardData.processed,
            Approved: dashboardData.approved,
            Delivered: dashboardData.delivered,
          }).map(([status, data], index) => (
            <div
              key={index}
              className="bg-red-50 rounded-lg p-4 border border-red-100"
            >
              <h3 className="font-medium text-red-900 mb-2">{status}</h3>
              <div className="flex justify-between text-sm">
                <span className="text-red-600">Bookings</span>
                <span className="font-semibold text-red-900">
                  {data.bookings}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-red-600">Amount</span>
                <span className="font-semibold text-red-900">
                  ₹{data.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
