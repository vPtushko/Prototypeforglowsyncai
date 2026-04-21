import { Droplet, Zap, Moon, Flame, Heart, TrendingUp, CheckCircle2, Target, Video, Calendar, ArrowRight } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Link } from "react-router";

const activityData = [
  { time: "9am", value: 65 },
  { time: "12pm", value: 78 },
  { time: "3pm", value: 85 },
  { time: "6pm", value: 92 },
  { time: "9pm", value: 70 },
];

const weeklyData = [
  { day: "M", value: 450 },
  { day: "T", value: 520 },
  { day: "W", value: 380 },
  { day: "Th", value: 690 },
  { day: "F", value: 550 },
];

export function Home() {
  return (
    <div className="p-4 space-y-5">
      {/* Greeting Card */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-5 border border-border">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Good Morning, Sarah! ✨
        </h1>
        <p className="text-sm text-muted-foreground">
          You're on track with your wellness goals. Keep up the great work!
        </p>
      </div>

      {/* Wellness Score Card */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-foreground">Wellness Score</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            Excellent
          </span>
        </div>
        <div className="flex items-end gap-2 mb-4">
          <div className="text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
            87
          </div>
          <span className="text-muted-foreground mb-2 text-base">/100</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Your overall health score based on nutrition, activity, skin health, and sleep quality.
        </p>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full" style={{ width: "87%" }}></div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Zap, label: "Energy", value: "82%", change: "+5%", color: "from-yellow-400 to-orange-400" },
          { icon: Droplet, label: "Hydration", value: "2.1L", change: "+12%", color: "from-cyan-400 to-blue-400" },
          { icon: Moon, label: "Sleep", value: "7.5h", change: "+8%", color: "from-indigo-400 to-purple-400" },
          { icon: Flame, label: "Active Cal.", value: "420", change: "+15%", color: "from-rose-400 to-pink-400" },
        ].map((metric, index) => (
          <div key={index} className="bg-card rounded-2xl p-4 border border-border shadow-sm active:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-md`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className="px-2 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
            <div className="text-sm text-muted-foreground">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="space-y-4">
        {/* Activity Chart */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Today's Activity</h3>
              <p className="text-sm text-muted-foreground">Heart rate zones</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "14px"
                }}
              />
              <defs>
                <linearGradient id="homeActivityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="value"
                stroke="url(#homeActivityGradient)"
                strokeWidth={3}
                dot={{ fill: "#14b8a6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Progress */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Weekly Active Calories</h3>
            <span className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium rounded-full">
              On Track
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "14px"
                }}
              />
              <defs>
                <linearGradient id="homeWeeklyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
              <Bar dataKey="value" fill="url(#homeWeeklyGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Average:</span> 518 cal/day •
              <span className="text-green-600 dark:text-green-400 font-medium"> +12% from last week</span>
            </p>
          </div>
        </div>
      </div>

      {/* Today's Goals and Achievement */}
      <div className="space-y-4">
        {/* Today's Tasks */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Today's Goals</h3>
            <span className="text-sm text-muted-foreground">3/3</span>
          </div>
          <div className="space-y-3">
            {[
              { icon: Droplet, title: "Drink 8 glasses of water", time: "Completed at 6:00 PM", done: true },
              { icon: Flame, title: "Burn 400 active calories", time: "Completed at 5:30 PM", done: true },
              { icon: Moon, title: "Sleep 7+ hours", time: "Completed this morning", done: true },
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 active:bg-muted transition-colors">
                <div className="w-11 h-11 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-sm">
                  <task.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.time}</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Skincare Progress */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center shadow-md">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Skincare Routine</h3>
                <p className="text-sm text-muted-foreground">14-day streak</p>
              </div>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent">
              93%
            </div>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-secondary to-accent rounded-full" style={{ width: "93%" }}></div>
          </div>
          <p className="text-sm text-muted-foreground">
            You're consistently following your routine. Your skin health score improved by 8 points this week!
          </p>
        </div>
      </div>

      {/* Expert Consultation CTA */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6 border border-border shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -z-0"></div>
        <div className="relative z-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Get Expert Guidance
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Book affordable online consultations with licensed dermatologists, nutritionists, and wellness experts. Get personalized advice tailored to your health and beauty goals.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                From $35/session
              </span>
              <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Flexible scheduling
              </span>
              <span className="px-3 py-1.5 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold rounded-full flex items-center gap-1">
                <Video className="w-3.5 h-3.5" />
                100% virtual
              </span>
            </div>
            <Link
              to="/consultations"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold active:scale-95 transition-transform shadow-md"
            >
              Browse Experts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
