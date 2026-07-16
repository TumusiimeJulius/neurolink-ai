interface ProgressChartData {
  name: string;
  value: number;
  color?: string;
}

interface ProgressChartProps {
  title?: string;
  subtitle?: string;
  data?: ProgressChartData[];
}

function ProgressChart({
  title = "Learning progress",
  subtitle = "Your consistency is creating compounding gains.",
  data = [
    { name: "Week 1", value: 40, color: "#34d399" },
    { name: "Week 2", value: 60, color: "#38bdf8" },
    { name: "Week 3", value: 82, color: "#a78bfa" },
    { name: "Week 4", value: 76, color: "#60a5fa" },
    { name: "Week 5", value: 90, color: "#22c55e" },
  ],
}: ProgressChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 100);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="rounded-2xl bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-600">
          {data.length ? `${Math.round(data[data.length - 1].value - data[0].value)} pts` : "+0"}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {data.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
              <span>{item.name}</span>
              <span className="font-semibold">{item.value}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  background: item.color ?? "linear-gradient(to right, #06b6d4, #818cf8)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressChart;