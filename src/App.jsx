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
import MicrositeFooter from './components/MicrositeFooter';
import BookingModal from './components/BookingModal';
import { PhoneIcon, WhatsAppIcon } from './components/BrandIcons';
import { useScrollReveal } from './hooks/useScrollReveal';

const property = {
  code: "TG-0001",
  name: "TG-0001",
  location: "Manikonda, Hyderabad",
  mapsLink: "https://maps.app.goo.gl/yzzJ91W1RFjDeWfi9",
  embedMapUrl: "https://maps.google.com/maps?q=17.4048101,78.3643339&t=&z=16&ie=UTF8&iwloc=&output=embed",
  propertyType: "Premium 3BHK Apartment",
  guests: 6,
  bedrooms: 3,
  bathrooms: 3,
  beds: 3,
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  description: [
    "Experience unparalleled luxury in the heart of Hyderabad. Our residence offers a seamless blend of elegant design, modern amenities, and personalized service.",
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
    { title: "Bathroom", items: [{ name: "Hair dryer", icon: "Wind" }, { name: "Cleaning products", icon: "SprayCan" }, { name: "Shampoo", icon: "Soap" }, { name: "Conditioner", icon: "Soap" }, { name: "Body soap", icon: "Soap" }, { name: "Hot water", icon: "Droplet" }] },
    { title: "Bedroom & laundry", items: [{ name: "Washer", icon: "WashingMachine" }, { name: "Essentials", detail: "Towels, bed sheets, soap and toilet paper", icon: "PackageOpen" }, { name: "Hangers", icon: "Triangle" }, { name: "Bed linens", icon: "Bed" }, { name: "Extra pillows & blankets", icon: "Bed" }, { name: "Room-darkening shades", icon: "PanelTop" }, { name: "Iron", icon: "LampDesk" }, { name: "Drying rack", icon: "Fence" }, { name: "Clothing storage", icon: "Warehouse" }] },
    { title: "Entertainment & family", items: [{ name: "TV", icon: "Tv" }, { name: "Books & reading material", icon: "BookOpen" }, { name: "Board games", icon: "Dices" }] },
    { title: "Comfort", items: [{ name: "Air conditioning", icon: "Snowflake" }, { name: "Ceiling fan", icon: "Fan" }] },
    { title: "Home safety", items: [{ name: "Exterior security cameras", detail: "Exterior areas only; no private indoor spaces", icon: "Cctv" }, { name: "Smoke alarm", icon: "AlarmSmoke" }, { name: "Fire extinguisher", icon: "FireExtinguisher" }, { name: "First aid kit", icon: "BriefcaseMedical" }] },
    { title: "Internet & office", items: [{ name: "Wi-Fi", icon: "Wifi" }] },
    { title: "Kitchen & dining", items: [{ name: "Kitchen", detail: "Space where guests can cook their own meals", icon: "CookingPot" }, { name: "Refrigerator", icon: "Refrigerator" }, { name: "Microwave", icon: "Microwave" }, { name: "Cooking basics", detail: "Pots and pans, oil, salt and pepper", icon: "CookingPot" }, { name: "Dishes & silverware", detail: "Plates, bowls, cups, cutlery and utensils", icon: "Utensils" }, { name: "Freezer", icon: "Refrigerator" }, { name: "Stove", icon: "CookingPot" }, { name: "Hot water kettle", icon: "Coffee" }, { name: "Wine glasses", icon: "Wine" }, { name: "Blender", icon: "Blender" }, { name: "Rice maker", icon: "CookingPot" }, { name: "Dining table", icon: "Utensils" }, { name: "Coffee", icon: "Coffee" }] },
    { title: "Outdoor", items: [{ name: "Outdoor furniture", icon: "Armchair" }] },
    { title: "Parking & facilities", items: [{ name: "Free parking on premises", icon: "Car" }, { name: "Elevator", detail: "Accessible elevator and doorway", icon: "ArrowUpToLine" }, { name: "Composting", icon: "Recycle" }] },
    { title: "Services", items: [{ name: "Long-term stays allowed", detail: "Stays of 28 days or more", icon: "CalendarDays" }, { name: "Daily housekeeping", detail: "Available from 12:00 PM to 1:30 PM", icon: "Sparkles" }] }
  ],
  rooms: [
    { title: "Living room", description: "A generous shared space for relaxing and spending time together, with direct access to the living-room balcony.", includes: "Includes living-room balcony", extraPhotoLabel: "Balcony photo", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6309.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6327.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6387.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6381.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6352.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6349.webp"] },
    { title: "Dining", description: "A dedicated dining area for shared meals, conversation and relaxed gatherings.", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707476.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707478.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707481.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707487.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707495.webp"] },
    { title: "Bedroom 1", description: "A spacious primary bedroom with a king-size bed, designed for restful nights and added comfort.", includes: "King-size bed · No balcony", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6285.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6276.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6280.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6293.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6298.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6283.webp"] },
    { title: "Bathroom 1", description: "A clean, modern bathroom stocked with the essential amenities for your stay.", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6264-2.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6269.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6273.webp"] },
    { title: "Bedroom 2", description: "A calm bedroom with a queen-size bed and direct access to its own private balcony.", includes: "Queen-size bed · Includes balcony", extraPhotoLabel: "Balcony photo", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6155.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6158.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6160.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6166.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6174.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6185.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6188.webp"] },
    { title: "Bathroom 2", description: "A private bathroom with a functional layout and hot-water facilities.", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6204-3.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6211.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6207.webp"] },
    { title: "Bedroom 3", description: "A welcoming bedroom with a queen-size bed, storage and direct access to a private balcony.", includes: "Queen-size bed · Includes balcony", extraPhotoLabel: "Balcony photo", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6231.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6223.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6230.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6254.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6256.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6257.webp"] },
    { title: "Bathroom 3", description: "An additional full bathroom offering convenience for families and groups.", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6212.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6213.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6216.webp"] },
    { title: "Kitchen", description: "A practical kitchen equipped for preparing meals throughout short and extended stays.", naturalAspect: true, images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6707040.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6706856.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6706847.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6706977.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6706984.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6706955.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/Purifier.webp"] },
    { title: "Additional pictures", description: "A closer look at Kezoi Stays branding details, the washing machine and other thoughtful features around the residence.", includes: "Branding · Washing machine · Property details", adaptiveAspect: true, images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707022.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707203.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707205.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707214.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707223.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707226.webp"] }
  ],
  nearbyPlaces: [
    { name: "Khajaguda Hills", time: "2 min" },
    { name: "Financial District / Wipro Circle", time: "5 min" },
    { name: "Continental Hospital", time: "8 min" },
    { name: "Gachibowli Junction", time: "10 min" },
    { name: "Raheja Mindspace & HITEC City", time: "12 min" },
    { name: "Inorbit Mall & Knowledge City", time: "15 min" },
    { name: "Rajiv Gandhi International Airport (ORR)", time: "30 min" }
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
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { ref: policiesRef, isVisible: policiesVisible } = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="app-container">
      <MicrositeHeader propertyCode={property.code} isScrolled={isScrolled} onOpenBooking={handleOpenBooking} />

      <div id="overview">
        <PropertyHero property={property} onOpenBooking={handleOpenBooking} />
        <PropertySummary property={property} />
      </div>

      <div id="about">
        <AboutProperty description={property.description} onOpenBooking={handleOpenBooking} />
      </div>

      <div id="gallery">
        <PropertyGallery rooms={property.rooms} onOpenBooking={handleOpenBooking} />
      </div>

      <div id="amenities">
        <AmenitiesSection amenities={property.amenities} onOpenBooking={handleOpenBooking} />
      </div>

      <div id="location">
        <LocationSection 
          location={property.location} 
          nearbyPlaces={property.nearbyPlaces} 
          mapsLink={property.mapsLink}
          embedMapUrl={property.embedMapUrl}
          onOpenBooking={handleOpenBooking}
        />
      </div>

      <section
        id="policies"
        className={`policies-section ${policiesVisible ? 'animate-fade-up' : 'pre-animate'}`}
        ref={policiesRef}
      >
        <div className="container policies-grid">
          <CheckInInfo property={property} onOpenBooking={handleOpenBooking} />
          <HouseRules rules={property.rules} />
        </div>
      </section>

      <GuestSupport />
      <MicrositeFooter />

      {/* Guest Booking Application Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
        property={property} 
      />

      {/* Floating Action WhatsApp */}
      <a href="https://wa.me/919052688188" target="_blank" rel="noopener noreferrer" className="floating-whatsapp" aria-label="WhatsApp Support">
        <WhatsAppIcon size={30} />
      </a>

      {/* Floating Action Call */}
      <a href="tel:+919052688188" className="floating-call" aria-label="Call Kezoi Stays">
        <PhoneIcon size={28} />
      </a>
    </div>
  );
}

export default App;
