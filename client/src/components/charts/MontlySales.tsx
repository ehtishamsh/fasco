"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Make the description dynamic based on the passed title
export const description = (title: string) => `${title} bar chart`;

interface ChartProps {
  title: string;
  dataKey: string; // The key used for the bar values
  labelKey: string; // The key used for the x-axis labels
  chartConfig: ChartConfig; // Configuration for the chart's appearance
  chartData: { [key: string]: any }[]; // Generic data array
  trend: number; // Trend data
}

export function DynamicBarChart({
  title,
  dataKey,
  labelKey,
  chartConfig,
  chartData,
  trend,
}: ChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={labelKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey={dataKey}
              fill={chartConfig[dataKey]?.color}
              radius={8}
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
