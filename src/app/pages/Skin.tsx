import { useState } from "react";
import { Camera, Sparkles, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { CameraModal } from "../components/CameraModal";

const initialSkinScoreData = [
  { date: "Apr 13", score: 76 },
  { date: "Apr 14", score: 78 },
  { date: "Apr 15", score: 80 },
  { date: "Apr 16", score: 82 },
  { date: "Apr 17", score: 83 },
  { date: "Apr 18", score: 85 },
  { date: "Apr 19", score: 86 },
  { date: "Apr 20", score: 88 },
];

export function Skin() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [skinScore, setSkinScore] = useState(88);
  const [hydration, setHydration] = useState(92);
  const [texture, setTexture] = useState(85);
  const [clarity, setClarity] = useState(87);
  const [skinScoreData, setSkinScoreData] = useState(initialSkinScoreData);
  const [lastScanMessage, setLastScanMessage] = useState(
    "Your skin health has improved significantly over the past week. Keep up your current routine for best results."
  );

  const handleScanComplete = (result: any) => {
    // Update current metrics
    setSkinScore(result.score);
    setHydration(result.hydration);
    setTexture(result.texture);
    setClarity(result.clarity);
    setLastScanMessage(result.message);

    // Add new data point to chart
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    setSkinScoreData((prevData) => {
      const newData = [...prevData];
      const existingIndex = newData.findIndex((d) => d.date === dateStr);

      if (existingIndex >= 0) {
        newData[existingIndex] = { date: dateStr, score: result.score };
      } else {
        newData.push({ date: dateStr, score: result.score });
        if (newData.length > 8) {
          newData.shift();
        }
      }

      return newData;
    });
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-card rounded-xl md:rounded-2xl p-4 sm:p-5 border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">Skin Health Analysis</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Track your skin progress with AI-powered insights</p>
      </div>

      {/* Skin Score Card */}
      <div className="bg-card rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-border shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6 text-center">Your Skin Health Score</h3>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center">
          {/* Circular Score */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 176 176">
              <circle
                cx="88"
                cy="88"
                r="76"
                stroke="#e2e8f0"
                strokeWidth="14"
                fill="none"
              />
              <circle
                cx="88"
                cy="88"
                r="76"
                stroke="url(#skinGradient)"
                strokeWidth="14"
                fill="none"
                strokeDasharray={`${(skinScore / 100) * 477} 477`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent">
                {skinScore}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                {skinScore >= 90 ? "Excellent" : skinScore >= 80 ? "Very Good" : skinScore >= 70 ? "Good" : "Fair"}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 w-full">
            <p className="text-sm text-muted-foreground mb-4">
              {lastScanMessage}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Hydration", value: hydration },
                { label: "Texture", value: texture },
                { label: "Clarity", value: clarity },
              ].map((metric, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">{metric.value}%</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Camera and Tracker Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Skin Scanner */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-foreground">AI Skin Scanner</h3>
            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
              Powered by AI
            </span>
          </div>

          {/* Camera Viewport */}
          <div 
            onClick={() => setIsCameraOpen(true)}
            className="relative bg-gradient-to-br from-muted/50 to-muted rounded-2xl aspect-square flex items-center justify-center mb-6 border-2 border-border overflow-hidden group hover:border-secondary/50 transition-colors duration-300 cursor-pointer"
          >
             {/* Background Pattern instead of image */}
             <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '16px 16px' }}>
            </div>

            {/* Subtle Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5"></div>

            {/* Face Frame */}
            <div className="relative w-full max-w-[220px] aspect-[3/4] z-10 transition-transform duration-500 group-hover:scale-105">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-[3px] border-l-[3px] border-secondary/70 rounded-tl-xl transition-all duration-300 group-hover:border-secondary group-hover:w-12 group-hover:h-12 group-hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-[3px] border-r-[3px] border-secondary/70 rounded-tr-xl transition-all duration-300 group-hover:border-secondary group-hover:w-12 group-hover:h-12 group-hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[3px] border-l-[3px] border-secondary/70 rounded-bl-xl transition-all duration-300 group-hover:border-secondary group-hover:w-12 group-hover:h-12 group-hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[3px] border-r-[3px] border-secondary/70 rounded-br-xl transition-all duration-300 group-hover:border-secondary group-hover:w-12 group-hover:h-12 group-hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]"></div>

              {/* Oval Guide */}
              <div className="absolute inset-4 flex items-center justify-center">
                <div className="w-full h-full border-[1.5px] border-dashed border-secondary/40 rounded-[100px] shadow-[inset_0_0_20px_rgba(244,114,182,0.05)] group-hover:border-secondary/80 transition-colors duration-300"></div>
              </div>

              {/* Scanning Line Animation */}
              <div className="absolute left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" 
                   style={{ 
                     top: '20%',
                     animation: 'faceScanMove 3s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate',
                     boxShadow: '0 0 10px 2px rgba(244, 114, 182, 0.4)'
                   }}>
              </div>
            </div>

            {/* Instruction Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-border/50 text-center shadow-sm group-hover:opacity-0 transition-opacity duration-300">
              <p className="text-xs font-semibold text-foreground tracking-wide flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                Tap to position face
              </p>
            </div>

            {/* Open Scanner CTA */}
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center animate-pulse">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg shadow-secondary/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
                </div>
              </div>
              <span className="text-sm font-bold text-foreground tracking-wide uppercase bg-background/80 px-4 py-1.5 rounded-full shadow-sm border border-border/50">Start Analysis</span>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="bg-muted/30 p-4 rounded-xl border border-border/40 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Skin Analysis</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Detects hydration, texture, and problem areas instantly</p>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes faceScanMove {
              0% { top: 15%; }
              100% { top: 85%; }
            }
          `}</style>
        </div>

        {/* Progress Tracker */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Progress Tracker</h3>
            <span className="text-sm text-muted-foreground">Last 7 days</span>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">Overall Score</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">{skinScore}</span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={skinScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis domain={[70, 95]} stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <defs>
                  <linearGradient id="skinProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="url(#skinProgressGradient)"
                  strokeWidth={3}
                  dot={{ fill: "#f472b6", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-4 border-t border-border flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              skinScore >= skinScoreData[0].score ? "bg-green-50" : "bg-yellow-50"
            }`}>
              <TrendingUp className={`w-5 h-5 ${
                skinScore >= skinScoreData[0].score ? "text-green-600" : "text-yellow-600"
              }`} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                {skinScore >= skinScoreData[0].score ? "Improving Consistently" : "Keep Going"}
              </p>
              <p className="text-xs text-muted-foreground">
                {skinScore >= skinScoreData[0].score
                  ? `Your skin score has increased by ${skinScore - skinScoreData[0].score} points. Great progress!`
                  : "Continue your skincare routine for best results."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl p-6 border border-border">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Personalized Recommendations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                <span>Continue using your vitamin C serum in the morning for improved brightness</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                <span>Increase water intake to 2.5L daily for better skin hydration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                <span>Consider adding a retinol product 2-3 times per week for texture improvement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        title="AI Skin Analysis"
        type="skin"
        onCapture={handleScanComplete}
      />
    </div>
  );
}
