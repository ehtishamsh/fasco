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
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

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

  return (
    <div className="px-5 mt-8 max-xs:px-2 min-h-screen bg-gray-100">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
          <FaUsers className="text-yellow-500 text-4xl mb-3" />
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="mt-2 text-2xl font-bold">
            {" "}
            {dashboardData.totalUsers.all}{" "}
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
          <FaBoxOpen className="text-green-500 text-4xl mb-3" />
          <h3 className="text-xl font-semibold">Total Products</h3>
          <p className="mt-2 text-2xl font-bold">
            {" "}
            {dashboardData.totalProducts}{" "}
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
          <FaShoppingCart className="text-blue-500 text-4xl mb-3" />
          <h3 className="text-xl font-semibold">Total Orders</h3>
          <p className="mt-2 text-2xl font-bold">
            {" "}
            {dashboardData.totalOrders.all}{" "}
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
          <FaDollarSign className="text-red-500 text-4xl mb-3" />
          <h3 className="text-xl font-semibold">Total Sales</h3>
          <p className="mt-2 text-2xl font-bold">
            {" "}
            ${dashboardData.totalSales.toFixed(2)}{" "}
          </p>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold">Pending Orders</h3>
          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {" "}
            {dashboardData.pendingOrders}{" "}
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold">Completed Orders</h3>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {" "}
            {dashboardData.completedOrders}{" "}
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold">Cancelled Orders</h3>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {" "}
            {dashboardData.cancelledOrders}{" "}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-center mb-6">
            Sales by Month
          </h3>
          <div className="flex justify-center w-full">
            <Bar data={saleData} />
          </div>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-center mb-6">
            Users by Month
          </h3>
          <div className="flex justify-center w-full">
            <Bar data={usersData} />
          </div>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-center mb-6">
            Orders by Month
          </h3>
          <div className="flex justify-center w-full">
            <Bar data={ordersData} />
          </div>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-center mb-6">
            Revenue (10% Profit) by Month
          </h3>
          <div className="flex justify-center w-full">
            <Line data={revenueData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
