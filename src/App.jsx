import React, { useState, useEffect } from 'react';
import MicrositeHeader from './components/MicrositeHeader';
import PropertyHero from './components/PropertyHero';
import PropertySummary from './components/PropertySummary';
import AboutProperty from './components/AboutProperty';
import PropertyGallery from './components/PropertyGallery';
import AmenitiesSection from './components/AmenitiesSection';
import RoomSection from './components/RoomSection';
import LocationSection from './components/LocationSection';
import CheckInInfo from './components/CheckInInfo';
import HouseRules from './components/HouseRules';
import GuestSupport from './components/GuestSupport';
import BookingCTA from './components/BookingCTA';
import MicrositeFooter from './components/MicrositeFooter';
import { MessageCircle } from 'lucide-react';

const property = {
  code: "TG-0001",
  name: "The Sapphire Residence",
  location: "Banjara Hills, Hyderabad",
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
    { title: "Building", items: [{ name: "Lift", icon: "ArrowUpToLine" }, { name: "Parking", icon: "Car" }, { name: "Security", icon: "Shield" }, { name: "Power Backup", icon: "Zap" }] }
  ],
  rooms: [
    { title: "Master Bedroom", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["King-size plush bed", "En-suite bathroom with bathtub", "City skyline views"] },
    { title: "Bedroom 2", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["Queen-size bed", "Dedicated workspace", "Ample natural light"] },
    { title: "Bedroom 3", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["Twin beds (convertible)", "Large wardrobe", "Cozy reading corner"] },
    { title: "Living Room", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["65-inch Smart OLED TV", "Plush designer seating", "Open-plan layout"] },
    { title: "Kitchen", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["Fully equipped appliances", "Nespresso coffee machine", "Island with seating"] },
    { title: "Balcony", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80", features: ["Panoramic views", "Outdoor seating for 4", "Ambient evening lighting"] }
  ],
  nearbyPlaces: [
    { name: "Business District", time: "8 min" },
    { name: "Metro Station", time: "5 min" },
    { name: "Shopping Mall", time: "10 min" },
    { name: "Hospital", time: "12 min" },
    { name: "Airport", time: "35 min" }
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
      
      <PropertyHero property={property} />
      <PropertySummary property={property} />
      <AboutProperty description={property.description} />
      <PropertyGallery images={property.images} />
      <AmenitiesSection amenities={property.amenities} />
      <RoomSection rooms={property.rooms} />
      <LocationSection location={property.location} nearbyPlaces={property.nearbyPlaces} />
      
      <section className="policies-section">
        <div className="container policies-grid">
          <CheckInInfo property={property} />
          <HouseRules rules={property.rules} />
        </div>
      </section>

      <GuestSupport />
      <BookingCTA />
      <MicrositeFooter />
      
      {/* Floating Action WhatsApp */}
      <a href="#" className="floating-whatsapp" aria-label="WhatsApp Support">
        <MessageCircle size={28} />
      </a>

      {/* Sticky Mobile Bottom Bar */}
      <div className="sticky-mobile-bar mobile-only">
        <div className="sticky-price">
          <span className="price-label">Need Help?</span>
        </div>
        <button className="btn btn-primary btn-small">Chat Now</button>
      </div>
    </div>
  );
}

export default App;
