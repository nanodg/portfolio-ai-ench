"use client"

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts"

interface ChartProps {
  data: {
    subject: string;
    current: number;
    fullMark: number;
  }[];
}

interface TooltipProps {
  active?: boolean;
  payload?: {
    value: number;
    payload: {
      subject: string;
    };
  }[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
        <p className="text-sm font-medium">{payload[0].payload.subject}</p>
        <p className="text-sm text-muted-foreground">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export function Chart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="hsl(var(--muted-foreground))" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Radar
          name="Skill Level"
          dataKey="current"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
          dot={false}
          activeDot={{
            r: 6,
            fill: "hsl(var(--primary))",
            stroke: "hsl(var(--background))",
            strokeWidth: 2,
          }}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}
