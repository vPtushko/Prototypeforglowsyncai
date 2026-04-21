import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";

interface MealLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (meal: { name: string; calories: number; protein: number; carbs: number; fats: number }) => void;
  editMeal?: { name: string; calories: number; protein: number; carbs: number; fats: number; index?: number } | null;
  onUpdateMeal?: (index: number, meal: { name: string; calories: number; protein: number; carbs: number; fats: number }) => void;
}

const suggestedMeals = [
  { name: "Grilled Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 4 },
  { name: "Salmon Fillet", calories: 280, protein: 25, carbs: 0, fats: 18 },
  { name: "Greek Yogurt", calories: 130, protein: 11, carbs: 9, fats: 5 },
  { name: "Quinoa Bowl", calories: 220, protein: 8, carbs: 39, fats: 4 },
  { name: "Avocado Toast", calories: 250, protein: 7, carbs: 26, fats: 15 },
];

export function MealLogModal({ isOpen, onClose, onAddMeal, editMeal, onUpdateMeal }: MealLogModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [customMeal, setCustomMeal] = useState({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [isCustomMode, setIsCustomMode] = useState(false);

  useEffect(() => {
    if (editMeal && isOpen) {
      setCustomMeal({
        name: editMeal.name,
        calories: editMeal.calories,
        protein: editMeal.protein,
        carbs: editMeal.carbs,
        fats: editMeal.fats,
      });
      setIsCustomMode(true);
    } else if (!isOpen) {
      setCustomMeal({ name: "", calories: 0, protein: 0, carbs: 0, fats: 0 });
      setIsCustomMode(false);
      setSearchTerm("");
    }
  }, [editMeal, isOpen]);

  if (!isOpen) return null;

  const filteredMeals = suggestedMeals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCustom = () => {
    if (!customMeal.name || customMeal.calories <= 0) return;

    if (editMeal && editMeal.index !== undefined && onUpdateMeal) {
      onUpdateMeal(editMeal.index, customMeal);
    } else {
      onAddMeal(customMeal);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {editMeal ? "Edit Meal" : "Log Meal"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4">
          {!isCustomMode ? (
            <>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
                {filteredMeals.map((meal, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onAddMeal(meal);
                      onClose();
                    }}
                    className="w-full p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-left"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-foreground text-sm">{meal.name}</h3>
                      <span className="text-lg font-bold text-primary">{meal.calories}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>P: {meal.protein}g</span>
                      <span>C: {meal.carbs}g</span>
                      <span>F: {meal.fats}g</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsCustomMode(true)}
                className="w-full py-2.5 border border-border hover:bg-muted rounded-lg text-sm font-medium transition-colors"
              >
                + Add Custom Meal
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Meal Name</label>
                <input
                  type="text"
                  value={customMeal.name}
                  onChange={(e) => setCustomMeal({ ...customMeal, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="e.g., Chicken Salad"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Calories</label>
                  <input
                    type="number"
                    value={customMeal.calories || ""}
                    onChange={(e) => setCustomMeal({ ...customMeal, calories: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Protein (g)</label>
                  <input
                    type="number"
                    value={customMeal.protein || ""}
                    onChange={(e) => setCustomMeal({ ...customMeal, protein: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Carbs (g)</label>
                  <input
                    type="number"
                    value={customMeal.carbs || ""}
                    onChange={(e) => setCustomMeal({ ...customMeal, carbs: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Fats (g)</label>
                  <input
                    type="number"
                    value={customMeal.fats || ""}
                    onChange={(e) => setCustomMeal({ ...customMeal, fats: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {!editMeal && (
                  <button
                    onClick={() => setIsCustomMode(false)}
                    className="flex-1 py-2.5 border border-border hover:bg-muted rounded-lg text-sm font-medium transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleSaveCustom}
                  className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors"
                >
                  {editMeal ? "Update" : "Add"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
