import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { Home, UtensilsCrossed, Sparkles, Activity, ScanLine, Video, Bell, User, Settings, LogOut, Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function Layout() {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/nutrition", icon: UtensilsCrossed, label: "Nutrition" },
    { path: "/skin", icon: Sparkles, label: "Skin" },
    { path: "/activity", icon: Activity, label: "Activity" },
    { path: "/scanner", icon: ScanLine, label: "Scanner" },
  ];

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile Header */}
        <header className="border-b border-border px-4 py-3 flex items-center justify-between bg-card shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">GlowSync</h1>
              <p className="text-xs text-muted-foreground">AI Health & Beauty</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/consultations"
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md active:scale-95 transition-transform"
              aria-label="Expert Consultations"
            >
              <Video className="w-5 h-5 text-white" />
            </Link>
            <button className="w-10 h-10 rounded-lg hover:bg-muted active:bg-muted flex items-center justify-center transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-all duration-200 border-2 ${isProfileOpen ? 'border-secondary ring-2 ring-secondary/30' : 'border-background'}`}
              >
                <User className="w-5 h-5 text-white" />
              </button>

              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="px-4 py-3 border-b border-border/50 mb-1">
                      <p className="text-sm font-semibold text-foreground">Sarah Chen</p>
                      <p className="text-xs text-muted-foreground mt-0.5">sarah.chen@example.com</p>
                    </div>
                    <Link
                      to="/consultations"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-3"
                    >
                      <Video className="w-4 h-4 text-primary" />
                      <span>Expert Consultations</span>
                    </Link>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      My Profile
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-3">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      Settings
                    </button>
                    <div className="border-t border-border/50 my-1"></div>
                    <div className="px-4 py-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Theme</p>
                      <div className="space-y-1">
                        <button
                          onClick={() => setTheme("light")}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${
                            theme === "light" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
                              <Sun className="w-3 h-3 text-white" />
                            </div>
                            Light
                          </div>
                          {theme === "light" && <Check className="w-4 h-4 text-primary" />}
                        </button>
                        <button
                          onClick={() => setTheme("dark")}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${
                            theme === "dark" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                              <Moon className="w-3 h-3 text-white" />
                            </div>
                            Dark
                          </div>
                          {theme === "dark" && <Check className="w-4 h-4 text-primary" />}
                        </button>
                        <button
                          onClick={() => setTheme("auto")}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${
                            theme === "auto" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                              <Monitor className="w-3 h-3 text-white" />
                            </div>
                            Auto
                          </div>
                          {theme === "auto" && <Check className="w-4 h-4 text-primary" />}
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-border/50 my-1"></div>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-3">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-20 bg-background">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg safe-area-inset-bottom">
          <div className="flex justify-around items-center h-16 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center flex-1 h-full transition-colors active:scale-95 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                  <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}