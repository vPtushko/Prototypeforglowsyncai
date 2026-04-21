import { useState } from "react";
import { Calendar, Clock, Video, DollarSign, Star, Award, CheckCircle, X, ChevronRight, User, MessageCircle, Sparkles } from "lucide-react";

interface Professional {
  id: string;
  name: string;
  title: string;
  specialty: "dermatologist" | "nutritionist" | "wellness";
  image: string;
  rating: number;
  reviews: number;
  experience: string;
  price: number;
  languages: string[];
  certifications: string[];
  availability: string[];
  bio: string;
}

const professionals: Professional[] = [
  {
    id: "1",
    name: "Dr. Emily Rodriguez",
    title: "Board Certified Dermatologist",
    specialty: "dermatologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    rating: 4.9,
    reviews: 248,
    experience: "12 years",
    price: 49,
    languages: ["English", "Spanish"],
    certifications: ["Board Certified", "AAD Member"],
    availability: ["Mon 2-6pm", "Wed 10am-4pm", "Fri 1-5pm"],
    bio: "Specializing in skincare routines, acne treatment, and anti-aging solutions with a holistic approach.",
  },
  {
    id: "2",
    name: "Sarah Chen, RD",
    title: "Registered Dietitian Nutritionist",
    specialty: "nutritionist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
    rating: 4.8,
    reviews: 192,
    experience: "8 years",
    price: 39,
    languages: ["English", "Mandarin"],
    certifications: ["RDN", "Certified Nutrition Specialist"],
    availability: ["Tue 9am-5pm", "Thu 11am-7pm", "Sat 10am-2pm"],
    bio: "Focused on personalized nutrition plans for skin health, weight management, and overall wellness.",
  },
  {
    id: "3",
    name: "Dr. James Williams",
    title: "Wellness & Integrative Medicine",
    specialty: "wellness",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    rating: 5.0,
    reviews: 156,
    experience: "15 years",
    price: 45,
    languages: ["English"],
    certifications: ["MD", "Integrative Medicine Certified"],
    availability: ["Mon 9am-1pm", "Wed 2-8pm", "Fri 9am-3pm"],
    bio: "Combining conventional medicine with holistic practices for comprehensive health and beauty optimization.",
  },
  {
    id: "4",
    name: "Dr. Maya Patel",
    title: "Cosmetic Dermatologist",
    specialty: "dermatologist",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
    rating: 4.9,
    reviews: 301,
    experience: "10 years",
    price: 55,
    languages: ["English", "Hindi"],
    certifications: ["Board Certified", "Cosmetic Dermatology Fellowship"],
    availability: ["Tue 1-7pm", "Thu 9am-3pm", "Sat 11am-5pm"],
    bio: "Expert in skincare product recommendations, ingredient analysis, and personalized beauty routines.",
  },
  {
    id: "5",
    name: "Michael Torres, CNS",
    title: "Clinical Nutritionist",
    specialty: "nutritionist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    rating: 4.7,
    reviews: 134,
    experience: "6 years",
    price: 35,
    languages: ["English", "Portuguese"],
    certifications: ["CNS", "Sports Nutrition Specialist"],
    availability: ["Mon 10am-6pm", "Wed 12-8pm", "Fri 9am-5pm"],
    bio: "Specializing in nutrition for healthy skin, hair, and nails with evidence-based dietary interventions.",
  },
  {
    id: "6",
    name: "Lisa Anderson, LMT",
    title: "Holistic Wellness Coach",
    specialty: "wellness",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    rating: 4.8,
    reviews: 178,
    experience: "9 years",
    price: 40,
    languages: ["English"],
    certifications: ["Certified Wellness Coach", "Yoga Instructor"],
    availability: ["Tue 10am-4pm", "Thu 1-7pm", "Sat 9am-1pm"],
    bio: "Helping clients achieve balance through stress management, mindfulness, and lifestyle optimization.",
  },
];

export function Consultations() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const specialtyFilters = [
    { value: "all", label: "All Specialists", icon: User },
    { value: "dermatologist", label: "Dermatologists", icon: Sparkles },
    { value: "nutritionist", label: "Nutritionists", icon: Award },
    { value: "wellness", label: "Wellness Experts", icon: CheckCircle },
  ];

  const filteredProfessionals = selectedSpecialty === "all"
    ? professionals
    : professionals.filter(p => p.specialty === selectedSpecialty);

  const handleBookAppointment = (professional: Professional) => {
    setSelectedProfessional(professional);
    setShowBookingModal(true);
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleConfirmBooking = () => {
    // Here you would integrate with a backend booking system
    alert(`Appointment booked with ${selectedProfessional?.name} on ${selectedDate} at ${selectedTime}`);
    setShowBookingModal(false);
    setSelectedProfessional(null);
  };

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM"
  ];

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-xl md:rounded-2xl p-4 sm:p-6 border border-border shadow-sm">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <Video className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Expert Consultations</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Connect with licensed professionals for personalized health and beauty guidance</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
                Affordable Pricing
              </span>
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
                Licensed Experts
              </span>
              <span className="px-3 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold rounded-full">
                Virtual Sessions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Specialty Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {specialtyFilters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.value}
              onClick={() => setSelectedSpecialty(filter.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                selectedSpecialty === filter.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredProfessionals.map((professional) => (
          <div
            key={professional.id}
            className="group bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex gap-4 mb-4">
              <div className="relative flex-shrink-0">
                <img
                  src={professional.image}
                  alt={professional.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-border"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-base sm:text-lg mb-1">{professional.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">{professional.title}</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-500/10 rounded-md">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{professional.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({professional.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Award className="w-3 h-3" />
                  {professional.experience} experience
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{professional.bio}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {professional.certifications.map((cert, i) => (
                <span key={i} className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md">
                  {cert}
                </span>
              ))}
            </div>

            <div className="border-t border-border pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-2xl font-bold text-foreground">${professional.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">/session</span>
                </div>
              </div>
              <button
                onClick={() => handleBookAppointment(professional)}
                className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 text-sm"
              >
                Book Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">How It Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Choose & Book</p>
              <p className="text-xs text-muted-foreground">Select a professional and pick a convenient time slot</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Video Consultation</p>
              <p className="text-xs text-muted-foreground">Join secure video call at your appointment time</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-rose-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Get Guidance</p>
              <p className="text-xs text-muted-foreground">Receive personalized advice and follow-up resources</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedProfessional && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-card rounded-2xl p-6 border border-border max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <img
                  src={selectedProfessional.image}
                  alt={selectedProfessional.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-border"
                />
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedProfessional.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedProfessional.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">${selectedProfessional.price}</span>
                    <span className="text-sm text-muted-foreground">/session</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Select Time</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted/30 border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Info */}
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Typical Availability</p>
                    <div className="space-y-1">
                      {selectedProfessional.availability.map((slot, i) => (
                        <p key={i} className="text-xs text-muted-foreground">{slot}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmBooking}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  selectedDate && selectedTime
                    ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
