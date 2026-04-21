import { useState, useEffect } from "react";
import { X, Camera, CheckCircle, RefreshCw, Focus, Scan } from "lucide-react";
import ceraveBarcode from "../../imports/routine-help-i-think-my-cerave-product-is-fake-v0-21q8niyhf97b1.jpg";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "skin" | "scanner";
  onCapture?: (result: any) => void;
}

const faceImages = [
  "https://images.unsplash.com/photo-1714492678355-bdef8d9e874f?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1765607476376-9574ea76b2ee?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1676907811281-6db08aaf56b7?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop",
];

const barcodeImages = [
  ceraveBarcode,
];

export function CameraModal({ isOpen, onClose, title, type, onCapture }: CameraModalProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [trackingCode, setTrackingCode] = useState("SYS_READY");

  useEffect(() => {
    if (isOpen) {
      const images = type === "skin" ? faceImages : barcodeImages;
      setCurrentImage(images[Math.floor(Math.random() * images.length)]);
      setIsScanning(false);
      setScanComplete(false);
      setIsFlashing(false);
      setScanProgress(0);
      setResult(null);
    }
  }, [isOpen, type]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      interval = setInterval(() => {
        setTrackingCode(
          Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
        );
      }, 100);
    } else {
      setTrackingCode("SYS_READY");
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  if (!isOpen) return null;

  const handleCapture = () => {
    setIsScanning(true);
    setScanProgress(0);

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 3;
      if (progress > 100) progress = 100;
      setScanProgress(progress);
    }, 150);

    setTimeout(() => {
      clearInterval(progressInterval);
      setScanProgress(100);
      
      // Trigger flash effect
      setIsScanning(false);
      setIsFlashing(true);

      setTimeout(() => {
        setIsFlashing(false);
        setScanComplete(true);

        const mockResult =
          type === "skin"
            ? {
                score: Math.floor(Math.random() * 15) + 80,
                hydration: Math.floor(Math.random() * 15) + 80,
                texture: Math.floor(Math.random() * 15) + 80,
                clarity: Math.floor(Math.random() * 15) + 80,
                message: [
                  "Your skin looks healthy! Continue your current routine.",
                  "Excellent skin health. Keep up the great work!",
                  "Your skin is glowing! Maintain your current habits.",
                  "Great improvement! Your routine is working well.",
                ][Math.floor(Math.random() * 4)],
                image: currentImage,
                type: "skin",
              }
            : {
                name: [
                  "CeraVe Moisturizing Lotion",
                  "La Roche-Posay Cleanser",
                  "Cetaphil Gentle Skin Cleanser",
                  "Neutrogena Hydro Boost Water Gel",
                  "The Ordinary Niacinamide 10% + Zinc 1%",
                  "Paula's Choice 2% BHA Liquid Exfoliant",
                ][Math.floor(Math.random() * 6)],
                brand: ["CeraVe", "La Roche-Posay", "Cetaphil", "Neutrogena", "The Ordinary", "Paula's Choice"][Math.floor(Math.random() * 6)],
                grade: ["A", "A-", "B+", "A+", "B"][Math.floor(Math.random() * 5)],
                match: `${Math.floor(Math.random() * 15) + 85}%`,
                rating: ["Safe for Sensitive Skin", "Dermatologist Recommended", "Non-Comedogenic", "Fragrance-Free"][Math.floor(Math.random() * 4)],
                image: currentImage,
                type: "skincare",
              };

        setResult(mockResult);
        onCapture?.(mockResult);
      }, 200);
    }, 3000);
  };

  const handleRetake = () => {
    const images = type === "skin" ? faceImages : barcodeImages;
    let nextImage = images[Math.floor(Math.random() * images.length)];
    // Ensure we actually get a different image if possible
    while (nextImage === currentImage && images.length > 1) {
      nextImage = images[Math.floor(Math.random() * images.length)];
    }
    setCurrentImage(nextImage);
    setIsScanning(false);
    setScanComplete(false);
    setIsFlashing(false);
    setScanProgress(0);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999] p-4">
      <div className="bg-gray-900 rounded-[2rem] max-w-lg w-full overflow-hidden shadow-2xl border border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        {!scanComplete ? (
          <div className="flex flex-col flex-1 overflow-hidden bg-black">
            {/* Camera Viewport */}
            <div className="relative w-full aspect-[3/4] sm:aspect-square bg-black overflow-hidden group">
              {/* Image Background */}
              <img
                key={currentImage} // Force re-render of image for crisp animation
                src={currentImage}
                alt="Camera view"
                className={`w-full h-full object-cover transition-all duration-[4000ms] ease-out ${
                  isScanning ? "scale-110 filter brightness-75" : "scale-100 filter brightness-100"
                }`}
              />

              {/* Tint Overlay during scan */}
              <div 
                className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                  isScanning 
                    ? type === "skin" ? "bg-pink-500/10" : "bg-teal-500/10"
                    : "opacity-0"
                }`} 
              />

              {/* Camera Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-1 z-20">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full shadow-lg ${isScanning ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="text-white text-xs sm:text-sm font-mono font-bold tracking-wider drop-shadow-md">
                    {isScanning ? 'REC' : 'STBY'}
                  </span>
                </div>
                <span className="text-white/80 text-[10px] sm:text-xs font-mono tracking-widest uppercase bg-black/20 px-1 rounded">
                  {trackingCode}
                </span>
              </div>

              <div className="absolute top-4 right-4 z-20">
                <span className="text-white/90 text-[10px] sm:text-xs font-mono drop-shadow-md bg-black/40 px-2 py-1 rounded">
                  4K / 60FPS
                </span>
              </div>

              {/* Rule of Thirds Grid */}
              <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3 grid-rows-3 opacity-20">
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-white" />
                <div className="border-r border-white" />
                <div className="" />
              </div>

              {/* Auto-focus bracket */}
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-500 ease-in-out z-20 ${isScanning ? 'scale-90' : 'scale-100'}`}>
                <div className="w-56 h-56 sm:w-64 sm:h-64 relative">
                  <div className={`absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] transition-colors duration-300 ${isScanning ? (type === 'skin' ? 'border-pink-500' : 'border-teal-400') : 'border-white/70'}`} />
                  <div className={`absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] transition-colors duration-300 ${isScanning ? (type === 'skin' ? 'border-pink-500' : 'border-teal-400') : 'border-white/70'}`} />
                  <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] transition-colors duration-300 ${isScanning ? (type === 'skin' ? 'border-pink-500' : 'border-teal-400') : 'border-white/70'}`} />
                  <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] transition-colors duration-300 ${isScanning ? (type === 'skin' ? 'border-pink-500' : 'border-teal-400') : 'border-white/70'}`} />
                  
                  {!isScanning && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 opacity-40">
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white" />
                      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Active Scan Visuals */}
              {isScanning && (
                <div className="absolute inset-0 z-30 pointer-events-none">
                  {/* Sweeping Laser */}
                  <div 
                    className="absolute left-0 right-0 h-[2px] w-full"
                    style={{
                      backgroundColor: type === 'skin' ? '#f472b6' : '#2dd4bf',
                      boxShadow: type === 'skin' ? '0 0 15px 4px rgba(244,114,182,0.4)' : '0 0 15px 4px rgba(45,212,191,0.4)',
                      animation: 'laserSweep 2s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate',
                    }}
                  />
                  
                  {/* Subject Tracking Elements */}
                  {type === 'skin' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-44 h-64 sm:w-48 sm:h-72 rounded-[3.5rem] border-[1.5px] border-pink-500/40 bg-pink-500/5 backdrop-blur-[0.5px]">
                        {/* Facial feature points */}
                        <div className="absolute top-[32%] left-[28%] w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_#f472b6]" />
                        <div className="absolute top-[32%] right-[28%] w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_#f472b6]" style={{animationDelay: '0.1s'}} />
                        <div className="absolute top-[52%] left-[50%] -translate-x-1/2 w-1 h-1 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_#f472b6]" style={{animationDelay: '0.2s'}} />
                        <div className="absolute bottom-[28%] left-[32%] w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_#f472b6]" style={{animationDelay: '0.3s'}} />
                        <div className="absolute bottom-[28%] right-[32%] w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_#f472b6]" style={{animationDelay: '0.4s'}} />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-64 h-32 flex gap-1 sm:gap-1.5 items-center justify-center p-3 bg-teal-500/5 border border-teal-500/30 backdrop-blur-[0.5px]">
                        {Array.from({length: 28}).map((_, i) => (
                          <div key={i} className="h-full bg-teal-400/80 rounded-full" 
                               style={{ 
                                 width: Math.random() > 0.5 ? '2px' : '4px',
                                 animation: `barcodePulse ${Math.random() * 0.4 + 0.3}s infinite alternate` 
                               }} 
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Processing Progress Bar */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 flex items-center gap-3 w-[80%] max-w-xs">
                    <div className="flex-1 h-1.5 bg-gray-700/80 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-150 ease-out"
                        style={{ 
                          width: `${scanProgress}%`,
                          backgroundColor: type === 'skin' ? '#f472b6' : '#2dd4bf' 
                        }}
                      />
                    </div>
                    <span className="text-white text-xs font-mono font-medium w-9">{scanProgress}%</span>
                  </div>
                </div>
              )}

              {/* White Flash Effect on Completion */}
              <div className={`absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-300 ${isFlashing ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Controls */}
            <div className="p-4 sm:p-6 bg-gray-900 border-t border-white/5">
              <div className="flex gap-3">
                <button
                  onClick={handleRetake}
                  disabled={isScanning}
                  className="w-14 h-14 sm:w-auto sm:px-6 flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-2xl font-medium gap-2 transition-all disabled:opacity-50 flex-shrink-0"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span className="hidden sm:inline">New Photo</span>
                </button>
                <button
                  onClick={handleCapture}
                  disabled={isScanning}
                  className="flex-1 h-14 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 relative overflow-hidden group"
                  style={{
                    background: type === "skin"
                      ? "linear-gradient(135deg, #ec4899, #8b5cf6)"
                      : "linear-gradient(135deg, #0d9488, #8b5cf6)",
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out" />
                  
                  {isScanning ? (
                    <span className="flex items-center gap-2 z-10">
                      <Focus className="w-5 h-5 animate-[spin_3s_linear_infinite]" />
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 z-10">
                      <Scan className="w-5 h-5" />
                      Start Scan
                    </span>
                  )}
                </button>
              </div>
              {!isScanning && (
                <p className="text-center text-gray-400 text-xs sm:text-sm mt-4 font-medium px-4">
                  {type === "skin" ? "Position face within the frame for analysis" : "Center barcode in the viewfinder to scan"}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 text-center bg-gray-900 overflow-y-auto max-h-full">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ animation: "scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
            >
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
            </div>

            {type === "skin" ? (
              <div className="animate-[fadeIn_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {result.score}
                  <span className="text-xl sm:text-2xl text-gray-500 font-medium ml-1">/100</span>
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-sm mx-auto leading-relaxed">{result.message}</p>
                
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                  <div className="bg-gray-800/80 p-4 rounded-2xl border border-gray-700/50">
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{result.hydration}%</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">Hydration</div>
                  </div>
                  <div className="bg-gray-800/80 p-4 rounded-2xl border border-gray-700/50">
                    <div className="text-2xl sm:text-3xl font-bold text-violet-400">{result.texture}%</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">Texture</div>
                  </div>
                  <div className="bg-gray-800/80 p-4 rounded-2xl border border-gray-700/50">
                    <div className="text-2xl sm:text-3xl font-bold text-rose-400">{result.clarity}%</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">Clarity</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-[fadeIn_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">{result.name}</h3>
                <p className="text-gray-400 mb-8 font-medium">{result.brand}</p>
                
                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
                  <div className="bg-green-500/10 px-6 sm:px-8 py-4 sm:py-5 rounded-3xl border border-green-500/20">
                    <div className="text-3xl sm:text-4xl font-extrabold text-green-400">{result.grade || 'A+'}</div>
                    <div className="text-xs sm:text-sm text-green-400/80 mt-1 font-medium uppercase tracking-wider">Safety Grade</div>
                  </div>
                  <div className="bg-gray-800/80 px-6 sm:px-8 py-4 sm:py-5 rounded-3xl border border-gray-700/50">
                    <div className="text-3xl sm:text-4xl font-bold text-white">{result.match || '98%'}</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium uppercase tracking-wider">Clean Match</div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/10 text-green-400 rounded-full font-medium text-sm border border-green-500/20">
                    <CheckCircle className="w-4 h-4" />
                    {result.rating || 'Excellent choice'}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full h-14 rounded-2xl font-semibold text-white transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #14b8a6, #0d9488)",
              }}
            >
              Done & Save
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes laserSweep {
          0% { top: 10%; }
          100% { top: 90%; }
        }

        @keyframes barcodePulse {
          0% { opacity: 0.15; }
          100% { opacity: 0.95; }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
