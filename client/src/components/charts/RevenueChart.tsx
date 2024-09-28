import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingDown, TrendingUp } from "lucide-react";

export const description = "A stacked bar chart with a legend";

const chartConfig = {
  sales: {
    label: "sales",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RevenueChart({
  chartData,
  trend,
}: {
  chartData: {
    month: string;
    sales: number;
    revenue: number;
  }[];
  trend: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue per month</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                });
              }}
            />
            <Bar
              dataKey="sales"
              stackId="a"
              fill="var(--color-sales)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="revenue"
              stackId="a"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend < 1 ? (
            <>
              Declining by {trend.toFixed(2)}%{" "}
              <TrendingDown className="h-4 w-4" />
            </>
          ) : (
            <>
              Trending by {trend.toFixed(2)}%
              <TrendingUp className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total for the last period
        </div>
      </CardFooter>
    </Card>
  );
}
