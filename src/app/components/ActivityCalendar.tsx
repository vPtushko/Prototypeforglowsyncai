import { ChevronLeft, ChevronRight, Flame, Heart, Footprints, TrendingUp, X } from "lucide-react";
import { useState } from "react";

interface DayData {
  date: number;
  calories: number;
  steps: number;
  heartRate: number;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  activeMinutes?: number;
  distance?: number;
  caloriesBreakdown?: {
    active: number;
    resting: number;
    exercise: number;
  };
}

interface ActivityCalendarProps {
  view: "week" | "month";
}

export function ActivityCalendar({ view }: ActivityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 21)); // April 21, 2026
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateWeekData = (): DayData[] => {
    const today = new Date(currentDate);
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    const weekData: DayData[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const calories = Math.floor(2000 + Math.random() * 800);
      const active = Math.floor(calories * 0.3);
      const exercise = Math.floor(calories * 0.1);
      const resting = calories - active - exercise;

      weekData.push({
        date: date.getDate(),
        calories,
        steps: Math.floor(6000 + Math.random() * 5000),
        heartRate: Math.floor(75 + Math.random() * 25),
        isToday: date.toDateString() === new Date(2026, 3, 21).toDateString(),
        isCurrentMonth: true,
        activeMinutes: Math.floor(60 + Math.random() * 40),
        distance: parseFloat((4 + Math.random() * 4).toFixed(1)),
        caloriesBreakdown: {
          active,
          resting,
          exercise,
        },
      });
    }
    return weekData;
  };

  const generateMonthData = (): DayData[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const monthData: DayData[] = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDate = new Date(year, month, 0 - (startingDayOfWeek - i - 1));
      monthData.push({
        date: prevMonthDate.getDate(),
        calories: 0,
        steps: 0,
        heartRate: 0,
        isCurrentMonth: false,
      });
    }

    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const calories = Math.floor(2000 + Math.random() * 800);
      const active = Math.floor(calories * 0.3);
      const exercise = Math.floor(calories * 0.1);
      const resting = calories - active - exercise;

      monthData.push({
        date: i,
        calories,
        steps: Math.floor(6000 + Math.random() * 5000),
        heartRate: Math.floor(75 + Math.random() * 25),
        isToday: date.toDateString() === new Date(2026, 3, 21).toDateString(),
        isCurrentMonth: true,
        activeMinutes: Math.floor(60 + Math.random() * 40),
        distance: parseFloat((4 + Math.random() * 4).toFixed(1)),
        caloriesBreakdown: {
          active,
          resting,
          exercise,
        },
      });
    }

    // Add empty cells to complete the grid
    const remainingCells = 42 - monthData.length;
    for (let i = 1; i <= remainingCells; i++) {
      monthData.push({
        date: i,
        calories: 0,
        steps: 0,
        heartRate: 0,
        isCurrentMonth: false,
      });
    }

    return monthData;
  };

  const calendarData = view === "week" ? generateWeekData() : generateMonthData();

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "week") {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === "week") {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getCalorieColor = (calories: number) => {
    if (calories >= 2500) return "from-rose-500 to-pink-500";
    if (calories >= 2200) return "from-primary to-accent";
    if (calories >= 1800) return "from-blue-400 to-cyan-400";
    return "from-gray-300 to-gray-400";
  };

  const getStartOfWeek = () => {
    const today = new Date(currentDate);
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    return startOfWeek;
  };

  const getEndOfWeek = () => {
    const start = getStartOfWeek();
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  };

  const getHeaderText = () => {
    if (view === "week") {
      const start = getStartOfWeek();
      const end = getEndOfWeek();
      if (start.getMonth() === end.getMonth()) {
        return `${monthNames[start.getMonth()]} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
      } else {
        return `${monthNames[start.getMonth()]} ${start.getDate()} - ${monthNames[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
      }
    } else {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  };

  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground">{getHeaderText()}</h2>
        <div className="flex gap-2">
          <button
            onClick={navigatePrevious}
            className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={navigateNext}
            className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day Headers */}
      <div className={`grid ${view === "week" ? "grid-cols-7" : "grid-cols-7"} gap-2 mb-2`}>
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs sm:text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className={`grid ${view === "week" ? "grid-cols-7" : "grid-cols-7"} gap-2`}>
        {calendarData.map((day, index) => (
          <button
            key={index}
            onClick={() => day.isCurrentMonth && setSelectedDay(day)}
            disabled={!day.isCurrentMonth}
            className={`relative rounded-xl p-2 sm:p-3 min-h-[100px] sm:min-h-[120px] border transition-all text-left ${
              selectedDay?.date === day.date && selectedDay?.isCurrentMonth === day.isCurrentMonth
                ? "border-accent border-2 bg-accent/10 shadow-lg"
                : day.isToday
                ? "border-primary border-2 bg-primary/5"
                : day.isCurrentMonth
                ? "border-border bg-gradient-to-br from-background to-muted/30 hover:shadow-md hover:border-primary/50 cursor-pointer"
                : "border-transparent bg-muted/20 opacity-40 cursor-not-allowed"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="text-xs sm:text-sm font-semibold text-foreground mb-2">
                {day.date}
              </div>
              {day.isCurrentMonth && (
                <div className="flex-1 space-y-1.5">
                  {/* Calories */}
                  <div className="flex items-center gap-1 text-xs">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${getCalorieColor(day.calories)}`}></div>
                    <span className="text-muted-foreground hidden sm:inline">{day.calories}</span>
                    <Flame className="w-3 h-3 text-orange-500 sm:hidden" />
                  </div>
                  {/* Steps */}
                  <div className="flex items-center gap-1 text-xs">
                    <Footprints className="w-2.5 h-2.5 text-primary" />
                    <span className="text-muted-foreground hidden sm:inline">{day.steps.toLocaleString()}</span>
                  </div>
                  {/* Heart Rate */}
                  <div className="flex items-center gap-1 text-xs">
                    <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                    <span className="text-muted-foreground hidden sm:inline">{day.heartRate} bpm</span>
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Day Detail Panel */}
      {selectedDay && selectedDay.isCurrentMonth && (
        <div className="mt-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-border relative">
          <button
            onClick={() => setSelectedDay(null)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close detail panel"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-1">
              {monthNames[currentDate.getMonth()]} {selectedDay.date}, {currentDate.getFullYear()}
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedDay.isToday ? "Today's Activity" : "Activity Summary"}
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-muted-foreground">Total Calories</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{selectedDay.calories}</span>
                <span className="text-sm text-muted-foreground">kcal</span>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Footprints className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Steps</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{selectedDay.steps.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span className="text-sm text-muted-foreground">Avg Heart Rate</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{selectedDay.heartRate}</span>
                <span className="text-sm text-muted-foreground">bpm</span>
              </div>
            </div>
          </div>

          {/* Calories Breakdown */}
          <div className="bg-card rounded-xl p-5 border border-border mb-4">
            <h4 className="font-semibold text-foreground mb-4">Calories Breakdown</h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Active", value: selectedDay.caloriesBreakdown?.active || 0, color: "from-rose-500 to-pink-500" },
                { label: "Resting", value: selectedDay.caloriesBreakdown?.resting || 0, color: "from-cyan-500 to-blue-500" },
                { label: "Exercise", value: selectedDay.caloriesBreakdown?.exercise || 0, color: "from-violet-500 to-purple-600" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${item.color} mb-2`}></div>
                  <div className="text-lg font-bold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Active Minutes: {selectedDay.activeMinutes}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full">
              <span className="text-sm font-medium">Distance: {selectedDay.distance} km</span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-4 justify-center text-xs">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-muted-foreground">Calories Burned</span>
          </div>
          <div className="flex items-center gap-2">
            <Footprints className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Steps</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-muted-foreground">Avg Heart Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
