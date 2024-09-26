import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { User } from "@/lib/redux/types";

// Register the scales and components needed
Chart.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesByMonth {
  createdAt: string; // date in string format
  _sum: { amount: number | null }; // nullable in case there's no sale in a month
}
interface GroupedByMonth {
  createdAt: string;
  _count: {
    id: number; // The count of users or orders for the specific month
  };
}

interface DashboardData {
  totalUsers: {
    all: number;
    monthly: GroupedByMonth[];
  };
  totalProducts: number;
  totalOrders: {
    all: number;
    monthly: GroupedByMonth[];
  };
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalSales: number;
  salesByMonth: SalesByMonth[];
}

function MainPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4000/api/dashboard");
      const data = await response.json();
      setDashboardData(data.data);
    }
    fetchData();
  }, []);

  if (!dashboardData) return <div>Loading...</div>;

  const salesByMonthLabels = dashboardData.salesByMonth.map((item) =>
    new Date(item.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    })
  );
  const usersByMonth = dashboardData.totalUsers.monthly.map((item) =>
    new Date(item.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    })
  );
  const ordersByMonth = dashboardData.totalOrders.monthly.map((item) =>
    new Date(item.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    })
  );
  const salesByMonthData = dashboardData.salesByMonth.map(
    (item) => item._sum.amount
  );
  const usersByMonthData = dashboardData.totalUsers.monthly.map(
    (item) => item._count.id
  );
  const ordersByMonthData = dashboardData.totalOrders.monthly.map(
    (item) => item._count.id
  );
  const revenueByMonthData = dashboardData.salesByMonth.map(
    (item) => (item._sum.amount || 0) * 0.1
  );

  const saleData = {
    labels: salesByMonthLabels,
    datasets: [
      {
        label: "Sales by Month",
        data: salesByMonthData,
        backgroundColor: "#FFBB33",
      },
    ],
  };
  const usersData = {
    labels: usersByMonth,
    datasets: [
      {
        label: "Users by Month",
        data: usersByMonthData,
        backgroundColor: "#33B5E5",
      },
    ],
  };
  const ordersData = {
    labels: ordersByMonth,
    datasets: [
      {
        label: "Orders by Month",
        data: ordersByMonthData,
        backgroundColor: "#FF4444",
      },
    ],
  };
  const revenueData = {
    labels: salesByMonthLabels,
    datasets: [
      {
        label: "Revenue (10% Profit) by Month",
        data: revenueByMonthData,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: false,
      },
    ],
  };
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-8">
        Welcome back, {user.firstname}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Users */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500 text-xs font-bold">Total Users</h2>
          <p className="text-2xl font-bold text-gray-700">
            {dashboardData.totalUsers.all}
          </p>
        </div>
        {/* Total Products */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500 text-xs font-bold">Total Products</h2>
          <p className="text-2xl font-bold text-gray-700">
            {dashboardData.totalProducts}
          </p>
        </div>
        {/* Total Orders */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500 text-xs font-bold">Total Orders</h2>
          <p className="text-2xl font-bold text-gray-700">
            {dashboardData.totalOrders.all}
          </p>
        </div>
        {/* Total Sales */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500 text-xs font-bold">Total Sales</h2>
          <p className="text-2xl font-bold text-gray-700">
            ${dashboardData.totalSales.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Order Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500 text-xs font-bold">Pending Orders</h2>
          <p className="text-2xl font-bold text-yellow-500">
            {dashboardData.pendingOrders}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500 text-xs font-bold">Completed Orders</h2>
          <p className="text-2xl font-bold text-green-500">
            {dashboardData.completedOrders}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500 text-xs font-bold">Cancelled Orders</h2>
          <p className="text-2xl font-bold text-red-500">
            {dashboardData.cancelledOrders}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Monthly Sales</h2>
        <div className="w-full">
          <Bar data={saleData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">User Growth</h2>
        <div className="w-full">
          <Line data={usersData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Orders Over Time
        </h2>
        <div className="w-full">
          <Bar data={ordersData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Revenue Over Time
        </h2>
        <div className="w-full">
          <Line data={revenueData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
