import { useState } from "react";
import { Heart, Flame, Footprints, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ActivityCalendar } from "../components/ActivityCalendar";

const heartRateData = [
  { time: "8am", bpm: 72 },
  { time: "10am", bpm: 95 },
  { time: "12pm", bpm: 88 },
  { time: "2pm", bpm: 110 },
  { time: "4pm", bpm: 78 },
  { time: "6pm", bpm: 125 },
  { time: "8pm", bpm: 70 },
];

const hourlyStepsData = [
  { hour: "8", steps: 420 },
  { hour: "9", steps: 680 },
  { hour: "10", steps: 520 },
  { hour: "11", steps: 390 },
  { hour: "12", steps: 850 },
  { hour: "13", steps: 1200 },
  { hour: "14", steps: 680 },
  { hour: "15", steps: 1380 },
  { hour: "16", steps: 920 },
  { hour: "17", steps: 580 },
];

export function Activity() {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-card rounded-xl md:rounded-2xl p-4 sm:p-5 border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">Activity Tracker</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Monday, April 20, 2026 • Great job staying active today!</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["Today", "Week", "Month"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.toLowerCase()
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Calendar View for Week/Month */}
      {(activeTab === "week" || activeTab === "month") && (
        <ActivityCalendar view={activeTab as "week" | "month"} />
      )}

      {/* Today View */}
      {activeTab === "today" && (
        <>
          {/* Calorie Burn Hero Card */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 border border-border">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-lg font-semibold text-foreground">Total Calories Burned</h2>
          <span className="px-3 py-1 bg-green-50 text-green-600 text-sm font-medium rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +18%
          </span>
        </div>
        <div className="flex items-baseline gap-3 mb-8">
          <div className="text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
            2,420
          </div>
          <span className="text-muted-foreground text-xl mb-2">kcal</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Active", value: 690, percent: 85, gradientId: "activityActiveGrad", startColor: "#fb7185", endColor: "#f472b6" },
            { label: "Resting", value: 1580, percent: 92, gradientId: "activityRestingGrad", startColor: "#22d3ee", endColor: "#3b82f6" },
            { label: "Exercise", value: 150, percent: 75, gradientId: "activityExerciseGrad", startColor: "#a78bfa", endColor: "#9333ea" },
          ].map((metric, i) => (
            <div key={i} className="bg-card rounded-2xl p-5 text-center border border-border">
              <div className="relative w-16 h-16 mx-auto mb-3">
                <svg className="w-full h-full transform -rotate-90">
                  <defs>
                    <linearGradient id={metric.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={metric.startColor} />
                      <stop offset="100%" stopColor={metric.endColor} />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#e2e8f0"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke={`url(#${metric.gradientId})`}
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${(metric.percent / 100) * 176} 176`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">{metric.percent}%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heart Rate Chart */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Heart Rate</h3>
              <p className="text-sm text-muted-foreground">Throughout the day</p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span className="text-2xl font-bold text-foreground">92</span>
                <span className="text-sm text-muted-foreground">bpm</span>
              </div>
              <p className="text-xs text-muted-foreground">Current</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[60, 140]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <defs>
                <linearGradient id="activityHeartRateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="bpm"
                stroke="url(#activityHeartRateGradient)"
                strokeWidth={3}
                dot={{ fill: "#f43f5e", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex gap-3 justify-center mt-4 pt-4 border-t border-border flex-wrap">
            {[
              { label: "Resting", color: "bg-blue-500" },
              { label: "Fat Burn", color: "bg-yellow-500" },
              { label: "Cardio", color: "bg-orange-500" },
              { label: "Peak", color: "bg-red-500" },
            ].map((zone, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3 h-3 ${zone.color} rounded-full`}></div>
                <span className="text-xs text-muted-foreground">{zone.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Chart */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Steps</h3>
              <p className="text-sm text-muted-foreground">Hourly breakdown</p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <Footprints className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">8,620</span>
              </div>
              <p className="text-xs text-muted-foreground">of 10,000 goal</p>
            </div>
          </div>

          <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: "86%" }}></div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">86% complete • 1,380 steps to go</p>

          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={hourlyStepsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <defs>
                <linearGradient id="activityStepsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
              <Bar dataKey="steps" fill="url(#activityStepsGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Peak hour:</span> 3:00 PM with 1,380 steps
            </p>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-2xl p-6 border border-border">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Daily Activity Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Excellent activity level today! You've burned 18% more calories than your average. Your heart rate shows good variation between rest and active periods, indicating healthy cardiovascular fitness.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                Active Minutes: 82
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                Avg HR: 92 bpm
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
                Distance: 6.2 km
              </span>
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
