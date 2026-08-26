import React, { useState, useEffect } from 'react';
import MicrositeHeader from './components/MicrositeHeader';
import PropertyHero from './components/PropertyHero';
import PropertySummary from './components/PropertySummary';
import AboutProperty from './components/AboutProperty';
import PropertyGallery from './components/PropertyGallery';
import AmenitiesSection from './components/AmenitiesSection';
import LocationSection from './components/LocationSection';
import CheckInInfo from './components/CheckInInfo';
import HouseRules from './components/HouseRules';
import GuestSupport from './components/GuestSupport';
import BookingCTA from './components/BookingCTA';
import MicrositeFooter from './components/MicrositeFooter';
import { MessageCircle } from 'lucide-react';
import { useScrollReveal } from './hooks/useScrollReveal';

const property = {
  code: "TG-0001",
  name: "The Sapphire Residence",
  location: "Madhapur, Hyderabad",
  propertyType: "Premium Apartment",
  guests: 6,
  bedrooms: 3,
  bathrooms: 3,
  beds: 4,
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  description: [
    "Experience unparalleled luxury in the heart of Hyderabad. The Sapphire Residence offers a seamless blend of elegant design, modern amenities, and personalized service.",
    "Whether you are traveling for business or leisure, our meticulously curated spaces ensure that every moment of your stay is effortlessly relaxing and entirely unforgettable."
  ],
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ],
  amenities: [
    { title: "Essentials", items: [{ name: "Wi-Fi", icon: "Wifi" }, { name: "Air Conditioning", icon: "Wind" }, { name: "Smart TV", icon: "Tv" }, { name: "Hot Water", icon: "Droplet" }] },
    { title: "Kitchen", items: [{ name: "Refrigerator", icon: "Refrigerator" }, { name: "Stove", icon: "Coffee" }, { name: "Microwave", icon: "Microwave" }, { name: "Dining Area", icon: "Utensils" }] },
    { title: "Comfort", items: [{ name: "Premium Linen", icon: "Bed" }, { name: "Towels", icon: "BookOpen" }, { name: "Workspace", icon: "Briefcase" }, { name: "Housekeeping", icon: "Sparkles" }] },
    { title: "Building", items: [{ name: "Lift", icon: "ArrowUpToLine" }, { name: "Parking", icon: "Car" }, { name: "Security", icon: "Shield" }, { name: "Power Backup", icon: "Zap" }] },
    { title: "Services", items: [{ name: "Cloud Kitchen", icon: "Utensils" }, { name: "Laundry", icon: "Shirt" }, { name: "Cab & Auto", icon: "Car" }, { name: "Welcome Kit", icon: "Gift" }] }
  ],
  rooms: [
    { title: "Living Hall", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["65-inch Smart OLED TV", "Plush designer seating", "Open-plan layout"] },
    { title: "Dining Hall", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["8-seater elegant table", "Ambient chandelier", "Direct kitchen access"] },
    { title: "Master Bedroom", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["King-size plush bed", "En-suite bathroom with bathtub", "City skyline views"] },
    { title: "2nd Bedroom", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["Queen-size bed", "Dedicated workspace", "Ample natural light"] },
    { title: "3rd Room", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["Twin beds (convertible)", "Large wardrobe", "Cozy reading corner"] },
    { title: "Kitchen", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["Fully equipped appliances", "Nespresso coffee machine", "Island with seating"] },
    { title: "Washroom", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["Walk-in rain shower", "Premium toiletries", "Modern marble finish"] },
    { title: "View from Balcony", image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["Panoramic views", "Outdoor seating for 4", "Ambient evening lighting"] }
  ],
  nearbyPlaces: [
    { name: "Mindspace IT Park", time: "5 min" },
    { name: "HITEC City Metro Station", time: "5 min" },
    { name: "Medicover Hospitals", time: "5 min" },
    { name: "Inorbit Mall", time: "10 min" },
    { name: "Durgam Cheruvu", time: "10 min" },
    { name: "Rajiv Gandhi Airport", time: "40 min" }
  ],
  rules: [
    "No smoking inside the property",
    "No parties or events",
    "Registered guests only",
    "Quiet hours from 10:00 PM to 7:00 AM",
    "Respect property belongings"
  ]
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { ref: policiesRef, isVisible: policiesVisible } = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <MicrositeHeader propertyCode={property.code} isScrolled={isScrolled} />
      
      <div id="overview">
        <PropertyHero property={property} />
        <PropertySummary property={property} />
      </div>
      
      <div id="about">
        <AboutProperty description={property.description} />
      </div>
      
      <div id="gallery">
        <PropertyGallery rooms={property.rooms} />
      </div>
      
      <div id="amenities">
        <AmenitiesSection amenities={property.amenities} />
      </div>
      
      <div id="location">
        <LocationSection location={property.location} nearbyPlaces={property.nearbyPlaces} />
      </div>
      
      <section 
        id="policies" 
        className={`policies-section ${policiesVisible ? 'animate-fade-up' : 'pre-animate'}`} 
        ref={policiesRef}
      >
        <div className="container policies-grid">
          <CheckInInfo property={property} />
          <HouseRules rules={property.rules} />
        </div>
      </section>

      <GuestSupport />
      <BookingCTA />
      <MicrositeFooter />
      
      {/* Floating Action WhatsApp */}
      <a href="https://wa.me/919052688188" target="_blank" rel="noopener noreferrer" className="floating-whatsapp" aria-label="WhatsApp Support">
        <MessageCircle size={28} />
      </a>
    </div>
  );
}

export default App;
