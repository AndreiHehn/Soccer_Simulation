import { Container } from "../PieChart/styles";
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from "recharts";

type PieChartData = {
  name: string;
  value: number;
};

interface Props {
  data: PieChartData[];
  dataColors: string[];
  centerData?: string;
  width: number;
  height: number;
  innerRadius?: string; // Percentage (%)
  outerRadius?: string; // Percentage (%)
  strokeColor?: string;
  displayTooltip?: boolean;
  displayLegend?: boolean;
}

export default function GenericPieChart({
  data,
  dataColors,
  centerData,
  width,
  height,
  innerRadius,
  outerRadius,
  strokeColor,
  displayTooltip,
  displayLegend,
}: Props) {
  return (
    <Container>
      <PieChart width={width} height={height} tabIndex={-1}>
        <Pie
          data={data}
          innerRadius={innerRadius ?? "40%"}
          outerRadius={outerRadius ?? "80%"}
          dataKey="value"
          stroke={strokeColor ?? "none"}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={dataColors[index % dataColors.length]}
            />
          ))}
        </Pie>
        {displayTooltip && (
          <Tooltip
            content={({ payload, label }) => {
              if (!payload || !payload.length) return null;

              return (
                <div
                  style={{
                    backgroundColor: "var(--background-primary)",
                    padding: 8,
                    borderRadius: 4,
                    fontFamily: "Segoe-UI",
                  }}
                >
                  <strong style={{ color: "#fff" }}>{label}</strong>
                  {payload.map((entry) => {
                    // encontra o índice do item no array original `data`
                    const dataIndex = data.findIndex(
                      (d) => d.name === entry.name
                    );
                    const color =
                      dataIndex !== -1
                        ? dataColors[dataIndex % dataColors.length]
                        : "#fff";

                    return (
                      <div
                        key={entry.name}
                        style={{ color, fontWeight: "bold" }}
                      >
                        {entry.name}: {entry.value}
                      </div>
                    );
                  })}
                </div>
              );
            }}
          />
        )}
        <Label
          value={centerData}
          position="center"
          fill="var(--text-primary)"
          fontSize={16}
          fontWeight="bold"
          fontFamily="Segoe UI"
        />
        {displayLegend && <Legend />}
      </PieChart>
    </Container>
  );
}
