import { useState } from "react";
import { ScanLine, Info, AlertCircle, Trash2, Search, X, HelpCircle, Lightbulb } from "lucide-react";
import { CameraModal } from "../components/CameraModal";

const initialRecentScans = [
  {
    name: "CeraVe Hydrating Cleanser",
    brand: "CeraVe",
    grade: "A",
    gradeColor: "bg-green-500",
    calories: null,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    type: "skincare",
  },
  {
    name: "The Ordinary Niacinamide Serum",
    brand: "Deciem",
    grade: "A+",
    gradeColor: "bg-emerald-500",
    calories: null,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
    type: "skincare",
  },
];

const mockProducts = [
  {
    name: "CeraVe Renewing SA Cleanser",
    brand: "CeraVe",
    grade: "A-",
    gradeColor: "bg-green-400",
    match: "92%",
    rating: "Dermatologist Recommended",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
    type: "skincare",
  },
  {
    name: "Neutrogena Hydro Boost Water Gel",
    brand: "Neutrogena",
    grade: "A",
    gradeColor: "bg-green-500",
    match: "96%",
    rating: "Non-Comedogenic",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    type: "skincare",
  },
  {
    name: "Paula's Choice 2% BHA",
    brand: "Paula's Choice",
    grade: "A+",
    gradeColor: "bg-emerald-500",
    match: "99%",
    rating: "Safe for Sensitive Skin",
    image: "https://images.unsplash.com/photo-1608280731043-34e1c2e42bc5?w=400",
    type: "skincare",
  },
  {
    name: "La Roche-Posay Toleriane SPF 30",
    brand: "La Roche-Posay",
    grade: "A",
    gradeColor: "bg-green-500",
    match: "95%",
    rating: "Fragrance-Free",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
    type: "skincare",
  },
];

export function Scanner() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [recentScans, setRecentScans] = useState(initialRecentScans);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleScanComplete = (result: any) => {
    // Determine a color based on the grade or score
    let gradeColor = "bg-primary";
    const grade = result.grade || "A";
    if (grade.includes("A")) gradeColor = "bg-emerald-500";
    else if (grade.includes("B")) gradeColor = "bg-green-400";
    else if (grade.includes("C")) gradeColor = "bg-yellow-500";
    else if (grade.includes("D") || grade.includes("F")) gradeColor = "bg-red-500";

    const newScan = {
      name: result.name || "Unknown Product",
      brand: result.brand || "Unknown Brand",
      grade: result.grade || "A",
      gradeColor: gradeColor,
      calories: result.calories || null, // Will be ignored by skincare UI now
      match: result.match || "98%",
      rating: result.rating || "Clean Ingredients",
      image: result.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      type: result.type || "skincare",
      time: "Just now",
    };

    setRecentScans((prev) => [newScan, ...prev.slice(0, 4)]);
  };

  const handleDeleteScan = (indexToDelete: number) => {
    setRecentScans((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleAddFromSearch = (product: any) => {
    const newScan = {
      ...product,
      time: "Just now",
    };
    setRecentScans((prev) => [newScan, ...prev.slice(0, 4)]);
    setSearchQuery("");
  };

  const filteredProducts = searchQuery.trim()
    ? mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-card rounded-xl md:rounded-2xl p-4 sm:p-5 border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">Ingredient Scanner</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Scan product barcodes to analyze ingredients and get health insights</p>
      </div>

      {/* Search Bar */}
      <div className="bg-card rounded-xl md:rounded-2xl p-4 sm:p-5 border border-border shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for products by name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 bg-muted/30 border border-border rounded-xl text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-4">
            {filteredProducts.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredProducts.map((product, index) => {
                    const numericGrade = typeof product.grade === 'number' ? product.grade :
                      product.grade === 'A+' ? 98 :
                      product.grade === 'A' ? 95 :
                      product.grade === 'A-' ? 90 :
                      product.grade === 'B+' ? 88 :
                      product.grade === 'B' ? 85 : 90;

                    return (
                      <div
                        key={index}
                        className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-muted/20 hover:bg-muted/40 border border-border/40 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                        onClick={() => handleAddFromSearch(product)}
                      >
                        <div className="relative flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover shadow-sm transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 border border-black/10 rounded-lg"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm sm:text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                            {product.brand}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className={`${product.gradeColor} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex flex-col items-center justify-center shadow-sm`}>
                              <span className="text-white font-bold text-sm sm:text-base leading-none">{numericGrade}</span>
                            </div>
                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider rounded-md">
                              {product.match}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No products found matching "{searchQuery}"</p>
                <p className="text-xs text-muted-foreground mt-1">Try a different search term or scan a barcode</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Scanner Interface */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Barcode Scanner</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHowItWorks(true)}
              className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all group"
              aria-label="How it works"
            >
              <HelpCircle className="w-5 h-5 text-blue-600 group-hover:text-blue-500 transition-colors" />
            </button>
            <button
              onClick={() => setShowTips(true)}
              className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:from-amber-500/30 hover:to-orange-500/30 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 transition-all group"
              aria-label="Scanner tips"
            >
              <Lightbulb className="w-5 h-5 text-amber-600 group-hover:text-amber-500 transition-colors" />
            </button>
            <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">Ready</span>
          </div>
        </div>

          {/* Camera Viewport */}
          <div 
            onClick={() => setIsScannerOpen(true)}
            className="relative bg-gradient-to-br from-muted/50 to-muted rounded-2xl aspect-square flex items-center justify-center mb-6 border-2 border-border overflow-hidden group hover:border-primary/50 transition-colors duration-300 cursor-pointer"
          >
            {/* Background Image that blurs on hover */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1666402667676-a273d65cdc42?w=800&h=800&fit=crop" 
                alt="Barcode" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-30 group-hover:blur-sm transition-all duration-500 scale-110 group-hover:scale-100"
              />
            </div>

            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-[0.1] group-hover:opacity-[0.2] transition-opacity duration-500" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>

            {/* Barcode Frame */}
            <div className="relative w-full max-w-[280px] aspect-square z-10 transition-transform duration-500 group-hover:scale-105">
              {/* Corner Brackets */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-[3px] border-l-[3px] border-primary/90 rounded-tl-xl transition-all duration-300 group-hover:border-primary group-hover:w-14 group-hover:h-14 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-[3px] border-r-[3px] border-primary/90 rounded-tr-xl transition-all duration-300 group-hover:border-primary group-hover:w-14 group-hover:h-14 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-[3px] border-l-[3px] border-primary/90 rounded-bl-xl transition-all duration-300 group-hover:border-primary group-hover:w-14 group-hover:h-14 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-[3px] border-r-[3px] border-primary/90 rounded-br-xl transition-all duration-300 group-hover:border-primary group-hover:w-14 group-hover:h-14 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]"></div>

              {/* Scanning Line Animation */}
              <div className="absolute left-[5%] right-[5%] h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-90" 
                   style={{ 
                     top: '10%',
                     animation: 'scanLineMove 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate',
                     boxShadow: '0 0 15px 3px rgba(167, 139, 250, 0.6), 0 0 30px 5px rgba(244, 114, 182, 0.4)'
                   }}>
              </div>
            </div>

            {/* Instruction Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-border text-center shadow-lg group-hover:opacity-0 transition-opacity duration-300">
              <p className="text-xs font-semibold text-foreground tracking-wide flex items-center gap-2">
                <ScanLine className="w-4 h-4 text-primary" />
                Align barcode to scan
              </p>
            </div>

            {/* Open Scanner CTA */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                </div>
              </div>
              <span className="text-sm font-bold text-foreground tracking-wide uppercase bg-background/80 px-4 py-1.5 rounded-full shadow-sm border border-border/50">Tap to Open Camera</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-xl border border-border/40 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Supported Formats</p>
                  <p className="text-xs text-muted-foreground mt-0.5">UPC, EAN, and QR codes accepted</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-center text-muted-foreground font-medium uppercase tracking-wider">
              Powered by our database of 80,000+ products
            </p>
          </div>

          {/* Add CSS for the scan line animation if not already present */}
          <style>{`
            @keyframes scanLineMove {
              0% { top: 15%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 85%; opacity: 0; }
            }
          `}</style>
        </div>

      {/* Recent Scans */}
      <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Recent Scans</h3>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground bg-muted/50 px-2.5 sm:px-3 py-1 rounded-full border border-border/50 self-start">Today</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {recentScans.map((scan, index) => {
            const numericGrade = typeof scan.grade === 'number' ? scan.grade :
              scan.grade === 'A+' ? 98 :
              scan.grade === 'A' ? 95 :
              scan.grade === 'A-' ? 90 :
              scan.grade === 'B+' ? 88 :
              scan.grade === 'B' ? 85 : 90;

            // Generate some mock ingredients based on the scan type
            const mockIngredients = scan.type === 'skincare'
              ? [
                  { name: "Water (Aqua)", status: "neutral" },
                  { name: "Glycerin", status: "good" },
                  { name: "Niacinamide", status: "good" },
                  { name: "Synthetic Fragrance", status: "bad" },
                  { name: "Parabens", status: "bad" },
                ]
              : [
                  { name: "Whole Grain Oats", status: "good" },
                  { name: "Almonds", status: "good" },
                  { name: "Organic Honey", status: "good" },
                  { name: "High Fructose Corn Syrup", status: "bad" },
                  { name: "Artificial Colors (Red 40)", status: "bad" },
                ];

            return (
            <div
              key={index}
              className="group flex flex-col p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 hover:bg-muted/40 transition-all duration-300 border border-border/40 hover:border-border hover:shadow-md relative"
            >
              <button
                onClick={() => handleDeleteScan(index)}
                className="absolute top-2 right-2 p-2 sm:p-1.5 rounded-md text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors sm:opacity-0 sm:group-hover:opacity-100 z-10 touch-manipulation"
                aria-label="Delete scan"
              >
                <Trash2 className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>

              <div className="flex items-start gap-3 sm:gap-4 w-full pr-8 sm:pr-0">
                <div className="relative flex-shrink-0 overflow-hidden rounded-lg sm:rounded-xl">
                  <img
                    src={scan.image}
                    alt={scan.name}
                    className="w-20 h-20 sm:w-20 sm:h-20 object-cover shadow-sm transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 border border-black/10 rounded-lg sm:rounded-xl"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-2 pr-1">{scan.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    <span className="font-medium text-foreground/80">{scan.brand}</span> • {scan.type === 'skincare' ? 'Skincare' : 'Food'}
                    {(scan as any).time && <span className="text-primary font-medium hidden sm:inline"> • {(scan as any).time}</span>}
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    {scan.rating ? (
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-primary/10 text-primary text-[9px] sm:text-[10px] font-semibold rounded-md">
                        {scan.rating}
                      </span>
                    ) : (
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-primary/10 text-primary text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider rounded-md">
                        Clean
                      </span>
                    )}
                    {(scan.match || scan.type === 'skincare') && (
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-emerald-500/10 text-emerald-600 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider rounded-md whitespace-nowrap">
                        Match: {scan.match || '98%'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
                <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Safety Score</span>
                <div className={`w-16 h-16 sm:w-16 sm:h-16 ${scan.gradeColor || 'bg-primary'} rounded-lg sm:rounded-xl flex flex-col items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-300`}>
                  <span className="text-white font-extrabold text-2xl sm:text-2xl leading-none">{numericGrade}</span>
                  <span className="text-white/70 text-xs sm:text-xs font-semibold mt-0.5 leading-none">/100</span>
                </div>
              </div>

              {/* Expandable Ingredients Section */}
              <details className="group/details mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50 w-full overflow-hidden">
                <summary className="text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer list-none flex items-center justify-between gap-2 select-none outline-none touch-manipulation py-1">
                  <span className="group-open/details:hidden">View Ingredients</span>
                  <span className="hidden group-open/details:inline">Hide Ingredients</span>
                  <svg className="w-4 h-4 transition-transform group-open/details:rotate-180 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div className="mt-3 sm:mt-4 grid grid-cols-1 gap-2 sm:gap-2.5 animate-in slide-in-from-top-2 fade-in duration-300">
                  {mockIngredients.map((ing, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-background border border-border/50 shadow-sm">
                      <span className="text-xs sm:text-sm text-foreground font-medium flex-1 line-clamp-1">{ing.name}</span>
                      <div className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md flex-shrink-0 ${
                        ing.status === 'good' ? 'bg-emerald-500/10 text-emerald-600' :
                        ing.status === 'bad' ? 'bg-rose-500/10 text-rose-600' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {ing.status === 'good' && (
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {ing.status === 'bad' && (
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        {ing.status === 'neutral' && (
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                          </svg>
                        )}
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider hidden sm:inline">{ing.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
            );
          })}
        </div>
      </div>

      {/* How It Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowHowItWorks(false)}>
          <div className="bg-card rounded-2xl p-6 border border-border max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">How It Works</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>1. Position the product barcode within the scanning frame</p>
                    <p>2. Our AI analyzes the ingredient list and nutritional information</p>
                    <p>3. Get instant health ratings and personalized recommendations</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowHowItWorks(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 border border-border/40">
              <h4 className="font-semibold text-foreground mb-3">What We Analyze</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                  <span className="text-muted-foreground">Ingredient quality and potential allergens</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-1.5"></div>
                  <span className="text-muted-foreground">Nutritional value and macro breakdown</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-1.5"></div>
                  <span className="text-muted-foreground">Skin compatibility and safety ratings</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full mt-1.5"></div>
                  <span className="text-muted-foreground">Personalized health impact based on your profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scanner Tips Modal */}
      {showTips && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowTips(false)}>
          <div className="bg-card rounded-2xl p-6 border border-border max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Scanner Tips</h3>
              </div>
              <button
                onClick={() => setShowTips(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/30 border border-border/40">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <p className="font-semibold text-foreground text-sm mb-2">Good Lighting</p>
                <p className="text-xs text-muted-foreground">Ensure adequate lighting for accurate scanning</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/30 border border-border/40">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <p className="font-semibold text-foreground text-sm mb-2">Steady Hold</p>
                <p className="text-xs text-muted-foreground">Keep your device steady while scanning</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/30 border border-border/40">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-rose-400 rounded-lg flex items-center justify-center flex-shrink-0 mb-3">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <p className="font-semibold text-foreground text-sm mb-2">Flat Surface</p>
                <p className="text-xs text-muted-foreground">Place barcode on a flat, smooth surface</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <CameraModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        title="Barcode Scanner"
        type="scanner"
        onCapture={handleScanComplete}
      />
    </div>
  );
}
