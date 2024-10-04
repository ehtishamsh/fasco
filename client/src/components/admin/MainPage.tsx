import { useEffect, useState } from "react";

import { User } from "@/lib/redux/types";
import { DynamicBarChart } from "../charts/MontlySales";
import { LineChartUsers } from "../charts/LineChartUsers";
import { RevenueChart } from "../charts/RevenueChart";
interface ChartConfig {
  [key: string]: {
    label: string; // The label to display for the data key
    color: string; // The color to use for the data key
  };
}
//@ts-ignore
interface ChartProps {
  title: string;
  dataKey: string; // The key used for the bar values
  labelKey: string; // The key used for the x-axis labels
  chartConfig: ChartConfig; // Configuration for the chart's appearance
  chartData: { [key: string]: any }[]; // Generic data array
  trend: number; // Trend data
}
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

interface revenueByMonth {
  month: string;
  sales: number;
  revenue: number;
}
function MainPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://fascobackend-production.up.railway.app/api/dashboard"
      );
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
    (item) => (item._sum.amount || 0) * 0.2
  );

  // Function to aggregate data by month
  const aggregateDataByMonth = (months: string[], data: any, key: any) => {
    return months.reduce((acc: any, month: string, index: number) => {
      if (!acc[month]) {
        acc[month] = { month, [key]: 0 };
      }
      acc[month][key] += data[index];
      return acc;
    }, {});
  };

  // Function to calculate trending percentage
  const calculateTrending = (latest: number, previous: number) =>
    ((latest - previous) / previous) * 100;

  // Aggregate sales data by month
  const salesData = aggregateDataByMonth(
    ordersByMonth,
    salesByMonthData,
    "sales"
  );
  const salesChartData = Object.values(salesData) as {
    month: string;
    sales: number;
  }[];

  const latestMonthDataSales = salesChartData[salesChartData.length - 1].sales;
  const previousMonthDataSales =
    salesChartData[salesChartData.length - 2].sales;
  const trendingSalesThisMonth = calculateTrending(
    latestMonthDataSales,
    previousMonthDataSales
  );

  // Aggregate orders data by month
  const ordersData = aggregateDataByMonth(
    ordersByMonth,
    ordersByMonthData,
    "orders"
  );
  const ordersChartData = Object.values(ordersData) as {
    month: string;
    orders: number;
  }[];

  const latestMonthDataOrders =
    ordersChartData[ordersChartData.length - 1].orders;
  const previousMonthDataOrders =
    ordersChartData[ordersChartData.length - 2].orders;
  const trendingOrdersThisMonth = calculateTrending(
    latestMonthDataOrders,
    previousMonthDataOrders
  );

  // Aggregate users data by month
  const usersData = aggregateDataByMonth(
    usersByMonth,
    usersByMonthData,
    "users"
  );
  const usersChartData = Object.values(usersData) as {
    month: string;
    users: number;
  }[];

  const latestMonthDataUsers = usersChartData[usersChartData.length - 1].users;
  const previousMonthDataUsers =
    usersChartData[usersChartData.length - 2].users;
  const trendingUsersThisMonth = calculateTrending(
    latestMonthDataUsers,
    previousMonthDataUsers
  );

  // Aggregate revenue data by month
  const revenueData = aggregateDataByMonth(
    salesByMonthLabels,
    revenueByMonthData,
    "revenue"
  );
  const revenueChartData = Object.values(revenueData) as {
    month: string;
    revenue: number;
  }[];

  const latestMonthDataRevenue =
    revenueChartData[revenueChartData.length - 1].revenue;
  const previousMonthDataRevenue =
    revenueChartData[revenueChartData.length - 2].revenue;
  const trendingRevenueThisMonth = calculateTrending(
    latestMonthDataRevenue,
    previousMonthDataRevenue
  );
  const revenueandsales: revenueByMonth[] = revenueChartData
    .map((item) => {
      return salesChartData
        .map((sales) => {
          if (item.month === sales.month) {
            return { ...item, sales: sales.sales };
          }
        })
        .filter((i): i is revenueByMonth => i !== undefined);
    })
    .flat();
  const formatedRevenue: revenueByMonth[] = revenueandsales.map((item) => {
    return {
      month: item.month,
      revenue: parseInt(item.revenue.toFixed(2)),
      sales: parseInt(item.sales.toFixed(2)),
    };
  });

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
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6 mb-6 ">
          <div className="w-full">
            <DynamicBarChart
              chartData={salesChartData}
              trend={trendingSalesThisMonth}
              title="Monthly Sales"
              labelKey="month"
              dataKey="sales"
              chartConfig={{
                sales: {
                  label: "Sales",
                  color: "hsl(var(--chart-1))",
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="w-full">
            <DynamicBarChart
              chartData={ordersChartData}
              trend={trendingOrdersThisMonth}
              title="Monthly Orders"
              labelKey="month"
              dataKey="orders"
              chartConfig={{
                sales: {
                  label: "Orders",
                  color: "hsl(var(--chart-2))",
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="w-full">
            <LineChartUsers
              chartData={usersChartData}
              trend={trendingUsersThisMonth}
            />
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="w-full">
            <RevenueChart
              chartData={formatedRevenue}
              trend={trendingRevenueThisMonth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
