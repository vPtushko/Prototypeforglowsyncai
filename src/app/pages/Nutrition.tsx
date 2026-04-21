import { useState } from "react";
import { Apple, Plus, Lightbulb, TrendingUp, Pencil, Trash2 } from "lucide-react";
import { MealLogModal } from "../components/MealLogModal";
import { ConfirmDialog } from "../components/ConfirmDialog";

const initialMealData = [
  {
    name: "Acai Smoothie Bowl",
    time: "8:30 AM",
    calories: 320,
    protein: 12,
    carbs: 48,
    fats: 11,
    tags: ["Breakfast", "High Fiber"],
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
  },
  {
    name: "Grilled Chicken Salad",
    time: "12:45 PM",
    calories: 420,
    protein: 38,
    carbs: 22,
    fats: 18,
    tags: ["Lunch", "High Protein"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  },
  {
    name: "Quinoa Buddha Bowl",
    time: "7:00 PM",
    calories: 385,
    protein: 16,
    carbs: 52,
    fats: 14,
    tags: ["Dinner", "Vegan"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
  },
  {
    name: "Mixed Nuts & Berries",
    time: "3:30 PM",
    calories: 180,
    protein: 6,
    carbs: 15,
    fats: 12,
    tags: ["Snack"],
    image: "https://images.unsplash.com/photo-1506802913710-40e2e66339c9?w=400",
  },
];

export function Nutrition() {
  const [activeTab, setActiveTab] = useState("today");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mealData, setMealData] = useState(initialMealData);
  const [editingMeal, setEditingMeal] = useState<{ name: string; calories: number; protein: number; carbs: number; fats: number; index: number } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; index: number; name: string }>({
    isOpen: false,
    index: -1,
    name: "",
  });
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [expandedDate, setExpandedDate] = useState<number | null>(null);

  const totalCalories = mealData.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = mealData.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = mealData.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = mealData.reduce((sum, meal) => sum + meal.fats, 0);
  const calorieGoal = 1800;
  const caloriePercent = Math.round((totalCalories / calorieGoal) * 100);

  const handleAddMeal = (meal: { name: string; calories: number; protein: number; carbs: number; fats: number }) => {
    const newMeal = {
      ...meal,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      tags: ["Just Added"],
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    };
    setMealData([...mealData, newMeal]);
  };

  const handleDeleteMeal = (index: number) => {
    const meal = mealData[index];
    setDeleteConfirm({
      isOpen: true,
      index,
      name: meal.name,
    });
  };

  const confirmDelete = () => {
    setMealData(mealData.filter((_, i) => i !== deleteConfirm.index));
    setDeleteConfirm({ isOpen: false, index: -1, name: "" });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, index: -1, name: "" });
  };

  const handleEditMeal = (index: number) => {
    const meal = mealData[index];
    setEditingMeal({
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      index,
    });
    setIsModalOpen(true);
  };

  const handleUpdateMeal = (index: number, updatedMeal: { name: string; calories: number; protein: number; carbs: number; fats: number }) => {
    const newMealData = [...mealData];
    newMealData[index] = {
      ...mealData[index],
      ...updatedMeal,
    };
    setMealData(newMealData);
    setEditingMeal(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMeal(null);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-card rounded-xl md:rounded-2xl p-4 sm:p-5 border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">Nutrition Tracker </h1>
        <p className="text-sm sm:text-base text-muted-foreground">Monday, April 20, 2026</p>
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

      {/* Calorie Tracking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              {activeTab === "week" ? "Weekly Overview" : activeTab === "month" ? "Monthly Calendar" : "Daily Calorie Goal"}
            </h3>
            {activeTab !== "today" && (
              <div className="flex gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary"></div><span className="text-muted-foreground">On Goal</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div><span className="text-muted-foreground">Over</span></div>
              </div>
            )}
          </div>
          
          {activeTab === "today" ? (
            <div className="flex flex-col sm:flex-row items-center gap-8 animate-in fade-in zoom-in-95 duration-300">
              {/* Circular Progress */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144">
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${(caloriePercent / 100) * 402} 402`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                    {caloriePercent}%
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">of goal</div>
                </div>
              </div>

              {/* Macros Info */}
              <div className="flex-1 w-full">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Calories Consumed</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold text-foreground">{totalCalories}</span>
                    <span className="text-sm text-muted-foreground font-medium">/ {calorieGoal} kcal</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 bg-muted/20 p-4 rounded-xl">
                  {[
                    { label: "Protein", value: totalProtein, color: "bg-cyan-500", max: 120 },
                    { label: "Carbs", value: totalCarbs, color: "bg-violet-500", max: 200 },
                    { label: "Fats", value: totalFats, color: "bg-rose-500", max: 60 },
                  ].map((macro, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="h-16 w-3 bg-muted rounded-full mb-3 overflow-hidden flex flex-col justify-end">
                        <div className={`w-full ${macro.color} rounded-full transition-all duration-1000 ease-out`} style={{ height: `${Math.min((macro.value / macro.max) * 100, 100)}%` }}></div>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-foreground">{macro.value}g</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">{macro.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === "week" ? (
            <div className="grid grid-cols-7 gap-2 sm:gap-4 mt-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                // Generate slightly varied data for each day based on its index
                const dayMockMultiplier = 0.8 + (i * 0.05); // Varied multiplier between 0.8 and 1.1
                const dayCalories = i === 0 ? totalCalories : Math.round(totalCalories * dayMockMultiplier);
                const dayProtein = i === 0 ? totalProtein : Math.round(totalProtein * dayMockMultiplier);
                const dayCarbs = i === 0 ? totalCarbs : Math.round(totalCarbs * dayMockMultiplier);
                const dayFats = i === 0 ? totalFats : Math.round(totalFats * dayMockMultiplier);
                const dayPercent = Math.round((dayCalories / calorieGoal) * 100);
                
                const isToday = i === 0;
                let bgColor = dayPercent >= 80 && dayPercent <= 100 ? "bg-primary text-white" : dayPercent > 100 ? "bg-rose-500 text-white" : "bg-primary/20 text-primary";
                
                const isExpanded = expandedDay === day;

                if (isExpanded) {
                  return (
                    <div key={day} className="col-span-7 bg-muted/30 rounded-2xl p-5 md:p-6 animate-in zoom-in-95 duration-200 border border-border shadow-sm my-2">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-semibold text-foreground text-lg">Details for {day}</h4>
                        <button onClick={() => setExpandedDay(null)} className="text-sm font-medium text-muted-foreground hover:text-foreground bg-background px-3 py-1 rounded-full border border-border transition-colors cursor-pointer">Close</button>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-8">
                        <div className="relative w-28 h-28 flex-shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144">
                            <circle cx="72" cy="72" r="64" stroke="#e2e8f0" strokeWidth="10" fill="none" />
                            <circle
                              cx="72" cy="72" r="64" stroke="url(#gradient)" strokeWidth="10" fill="none"
                              strokeDasharray={`${(dayPercent / 100) * 402} 402`} strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">{dayPercent}%</div>
                          </div>
                        </div>
                        <div className="flex-1 w-full grid grid-cols-3 gap-4 bg-background p-4 rounded-xl border border-border/50">
                          {[
                            { label: "Protein", value: dayProtein, color: "bg-cyan-500", max: 120 },
                            { label: "Carbs", value: dayCarbs, color: "bg-violet-500", max: 200 },
                            { label: "Fats", value: dayFats, color: "bg-rose-500", max: 60 },
                          ].map((macro, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              <div className="h-14 w-2.5 bg-muted rounded-full mb-2 overflow-hidden flex flex-col justify-end">
                                <div className={`w-full ${macro.color} rounded-full`} style={{ height: `${Math.min((macro.value / macro.max) * 100, 100)}%` }}></div>
                              </div>
                              <div className="text-sm font-bold text-foreground">{macro.value}g</div>
                              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{macro.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <button 
                    key={day} 
                    onClick={() => setExpandedDay(day)}
                    className="flex flex-col items-center gap-2 sm:gap-3 group"
                  >
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{day}</span>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ring-2 ring-offset-2 ring-offset-card transition-all transform group-hover:scale-110 group-active:scale-95 cursor-pointer ${isToday ? 'ring-foreground' : 'ring-transparent'} ${bgColor}`}>
                      {i + 20}
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-foreground transition-colors">{dayCalories}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="w-full mt-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="grid grid-cols-7 gap-y-2 sm:gap-y-4 gap-x-1 sm:gap-x-2 text-center mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                  <div key={i} className="text-[10px] sm:text-xs text-muted-foreground font-medium">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-2 sm:gap-y-4 gap-x-1 sm:gap-x-2 text-center">
                <div className="aspect-square"></div>
                <div className="aspect-square"></div>
                {Array.from({ length: 30 }).map((_, i) => {
                  // Generate varied mock data for the month calendar
                  const mockMultiplier = 0.7 + ((i % 5) * 0.1) + ((i % 3) * 0.05);
                  const dayCalories = i === 19 ? totalCalories : Math.round(totalCalories * mockMultiplier);
                  const dayProtein = i === 19 ? totalProtein : Math.round(totalProtein * mockMultiplier);
                  const dayCarbs = i === 19 ? totalCarbs : Math.round(totalCarbs * mockMultiplier);
                  const dayFats = i === 19 ? totalFats : Math.round(totalFats * mockMultiplier);
                  const dayPercent = Math.round((dayCalories / calorieGoal) * 100);

                  const isToday = i === 19; 
                  let bgColor = dayPercent >= 80 && dayPercent <= 100 ? "bg-primary text-white" : dayPercent > 100 ? "bg-rose-500 text-white" : "bg-primary/20 text-primary";

                  const isExpanded = expandedDate === i;

                  if (isExpanded) {
                    return (
                      <div key={`exp-${i}`} className="col-span-7 bg-muted/30 rounded-2xl p-5 md:p-6 my-2 animate-in zoom-in-95 duration-200 border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="font-semibold text-foreground text-lg">Details for April {i + 1}</h4>
                          <button onClick={() => setExpandedDate(null)} className="text-sm font-medium text-muted-foreground hover:text-foreground bg-background px-3 py-1 rounded-full border border-border transition-colors cursor-pointer">Close</button>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                          <div className="relative w-28 h-28 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144">
                              <circle cx="72" cy="72" r="64" stroke="#e2e8f0" strokeWidth="10" fill="none" />
                              <circle
                                cx="72" cy="72" r="64" stroke="url(#gradient)" strokeWidth="10" fill="none"
                                strokeDasharray={`${(dayPercent / 100) * 402} 402`} strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="text-2xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">{dayPercent}%</div>
                            </div>
                          </div>
                          <div className="flex-1 w-full grid grid-cols-3 gap-4 bg-background p-4 rounded-xl border border-border/50">
                            {[
                              { label: "Protein", value: dayProtein, color: "bg-cyan-500", max: 120 },
                              { label: "Carbs", value: dayCarbs, color: "bg-violet-500", max: 200 },
                              { label: "Fats", value: dayFats, color: "bg-rose-500", max: 60 },
                            ].map((macro, idx) => (
                              <div key={idx} className="flex flex-col items-center">
                                <div className="h-14 w-2.5 bg-muted rounded-full mb-2 overflow-hidden flex flex-col justify-end">
                                  <div className={`w-full ${macro.color} rounded-full`} style={{ height: `${Math.min((macro.value / macro.max) * 100, 100)}%` }}></div>
                                </div>
                                <div className="text-sm font-bold text-foreground">{macro.value}g</div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{macro.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button 
                      key={i} 
                      onClick={() => setExpandedDate(i)}
                      className="flex items-center justify-center group"
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-medium shadow-sm ring-2 ring-offset-1 sm:ring-offset-2 ring-offset-card transition-all transform group-hover:scale-110 group-active:scale-95 cursor-pointer ${isToday ? 'ring-foreground font-bold' : 'ring-transparent'} ${bgColor}`}>
                        {i + 1}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex lg:flex-col gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-14 lg:h-auto lg:flex-1 font-medium flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Plus className="w-5 h-5" />
            Log Meal
          </button>
          <button className="flex-1 border border-border hover:bg-muted rounded-xl h-14 lg:h-auto lg:flex-1 font-medium flex items-center justify-center gap-2 transition-colors">
            <Apple className="w-5 h-5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-2xl p-6 border border-border">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">AI Nutrition Insight</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Great job staying within your calorie goal! You're slightly low on protein today. Consider adding a high-protein snack like Greek yogurt or a handful of almonds to meet your macro targets.
            </p>
          </div>
        </div>
      </div>

      {/* Meals List */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Today's Meals</h3>
          <span className="text-sm text-muted-foreground">{mealData.length} items</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {mealData.map((meal, index) => (
            <div
              key={index}
              className="group flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border relative"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-sm flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{meal.name}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">{meal.time}</p>
                <div className="flex gap-2 flex-wrap">
                  {meal.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">{meal.calories}</div>
                  <div className="text-xs text-muted-foreground">kcal</div>
                </div>
                <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditMeal(index)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
                    title="Edit meal"
                  >
                    <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMeal(index)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive flex items-center justify-center transition-colors"
                    title="Delete meal"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MealLogModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddMeal={handleAddMeal}
        editMeal={editingMeal}
        onUpdateMeal={handleUpdateMeal}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Meal"
        message={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
