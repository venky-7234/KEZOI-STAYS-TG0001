import React, { useState, useEffect } from 'react';
import MicrositeHeader from './components/MicrositeHeader';
import PropertyHero from './components/PropertyHero';
import PropertySummary from './components/PropertySummary';
import AboutProperty from './components/AboutProperty';
import PropertyGallery from './components/PropertyGallery';
import AmenitiesSection from './components/AmenitiesSection';
import LocationSection from './components/LocationSection';
import CheckInInfo from './components/CheckInInfo';
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
    { title: "Living room", description: "A generous shared space for relaxing and spending time together, with direct access to the living-room balcony.", detailSections: [{ title: "Where the Stay Comes Together", body: "A comfortable space to relax, gather, watch a movie, or simply spend time together. The living room also opens onto its private balcony, giving you a spot to step out and unwind." }, { title: "Everything Within Reach", body: "You’ll find the TV remote, AC remote, water sprayer, board games, room freshener, and extra tissue box in the cupboard below the TV. Please return everything to its place after use." }, { title: "A Little Care", items: ["Please do not move or touch the paintings.", "Please handle the curtains gently.", "Smoke alarms are installed for your safety. Smoking is permitted on balconies only.", "Please keep the furniture and decorative pieces in their original positions."] }], includes: "Includes living-room balcony", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6309.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6327.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6387.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6381.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6352.webp"] },
    { title: "Dining", description: "A dedicated dining area for shared meals, conversation and relaxed gatherings.", detailSections: [{ title: "Where Meals Become Moments", body: "A comfortable space to enjoy your meals, catch up, and spend time together around the table." }, { title: "Everything in Its Place", body: "Crockery, cutlery, glasses, and dining essentials are provided for your convenience. Please handle them with care and return them to their place after use." }, { title: "A Little Care Goes a Long Way", items: ["Please handle crockery and glassware carefully.", "Please avoid placing hot utensils directly on the table.", "Please clean up spills promptly and leave the dining area tidy."] }], images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707476.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707478.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707481.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707487.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707495.webp"] },
    { title: "Master Bedroom (King Size)", description: "A spacious king-size retreat made for deep rest, slow mornings, and unwinding after a long day in Hyderabad.", detailSections: [{ title: "Your Quiet Corner", body: "A spacious king-size retreat made for deep rest, slow mornings, and unwinding after a long day in Hyderabad." }, { title: "Everything Within Reach", body: "Extra towels, a hair dryer, an iron box, and an ironing stand are kept neatly inside the cupboard for your convenience." }, { title: "A Little Care", items: ["Please handle the furniture and furnishings with care.", "Please keep the balcony doors and windows secured when not in use.", "Please leave the room clean and tidy."] }], includes: "King-size bed · No balcony", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6285.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6276.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6280.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6293.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6298.webp"] },
    { title: "Bathroom 1", description: "Everything you need for a comfortable shower is ready for you, including shampoo and shower gel. Sanitary napkins are also available in the drawer.", detailSections: [{ title: "A Little Freshness, Just for You", body: "Everything you need for a comfortable shower is ready for you, including shampoo and shower gel. Sanitary napkins are also available in the drawer." }, { title: "Everything Within Reach", body: "You’ll find the shampoo, shower gel, and sanitary napkins neatly placed in the bathroom drawer." }, { title: "A Little Care", items: ["Please do not flush sanitary products. Wrap them securely in paper, place them in the provided disposal cover, and dispose of them in the dustbin.", "Please use water thoughtfully and avoid unnecessary wastage."] }], images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6264-2.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6269.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6273.webp"] },
    { title: "Bedroom 2 (Queen Size)", description: "A comfortable queen-size bedroom designed to help you slow down, rest well, and enjoy a little privacy after a long day in Hyderabad.", detailSections: [{ title: "Your Quiet Corner", body: "A comfortable queen-size bedroom designed to help you slow down, rest well, and enjoy a little privacy after a long day in Hyderabad." }, { title: "Everything Within Reach", body: "Extra towels are kept neatly inside the cupboard for your convenience. If you need a hair dryer, iron, or ironing board, you can find them in the master bedroom." }, { title: "A Little Care", items: ["Please handle the furniture and furnishings with care.", "Please keep the balcony doors and windows secured when not in use.", "Please leave the room clean and tidy."] }], includes: "Queen-size bed · Includes balcony", extraPhotoLabel: "Balcony photo", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6155.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6158.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6160.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6166.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6174.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6185.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6188.webp"] },
    { title: "Bathroom 2", description: "Everything you need for a comfortable shower is ready for you, including shampoo and shower gel. Sanitary napkins are also available in the drawer.", detailSections: [{ title: "A Little Freshness, Just for You", body: "Everything you need for a comfortable shower is ready for you, including shampoo and shower gel. Sanitary napkins are also available in the drawer." }, { title: "Everything Within Reach", body: "You’ll find the shampoo, shower gel, and sanitary napkins neatly placed in the bathroom drawer." }, { title: "A Little Care", items: ["Please do not flush sanitary products. Wrap them securely in paper, place them in the provided disposal cover, and dispose of them in the dustbin.", "Please use water thoughtfully and avoid unnecessary wastage."] }], images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6204-3.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6211.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6207.webp"] },
    { title: "Bedroom 3 (Queen Size)", description: "A comfortable queen-size bedroom designed to help you slow down, rest well, and enjoy a little privacy after a long day in Hyderabad.", detailSections: [{ title: "Your Quiet Corner", body: "A comfortable queen-size bedroom designed to help you slow down, rest well, and enjoy a little privacy after a long day in Hyderabad." }, { title: "Everything Within Reach", body: "Extra towels are kept neatly inside the cupboard for your convenience. If you need a hair dryer, iron, or ironing board, you can find them in the master bedroom." }, { title: "A Little Care", items: ["Please handle the furniture and furnishings with care.", "Please keep the balcony doors and windows secured when not in use.", "Please leave the room clean and tidy."] }], includes: "Queen-size bed · Includes balcony", extraPhotoLabel: "Balcony photo", images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6231.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6223.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6230.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6254.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6256.webp"] },
    { title: "Bathroom 3", description: "Everything you need for a comfortable shower is ready for you, including shampoo and shower gel. Sanitary napkins are also available in the drawer.", detailSections: [{ title: "A Little Freshness, Just for You", body: "Everything you need for a comfortable shower is ready for you, including shampoo and shower gel. Sanitary napkins are also available in the drawer." }, { title: "Everything Within Reach", body: "You’ll find the shampoo, shower gel, and sanitary napkins neatly placed in the bathroom drawer." }, { title: "A Little Care", items: ["Please do not flush sanitary products. Wrap them securely in paper, place them in the provided disposal cover, and dispose of them in the dustbin.", "Please use water thoughtfully and avoid unnecessary wastage."] }], images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6212.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6213.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6216.webp"] },
    { title: "Kitchen", description: "A well-equipped kitchen with the essentials for preparing breakfast, quick meals, coffee, or a home-cooked meal during your stay.", detailSections: [{ title: "Where Meals Come Together", body: "A well-equipped kitchen with the essentials for preparing breakfast, quick meals, coffee, or a home-cooked meal during your stay." }, { title: "Everything Within Reach", body: "The kitchen includes a gas stove, induction cooktop, electric kettle, water purifier, cookware, and utensils. The water purifier is located above the sink, while utensils are stored in the lower drawers. Coffee, green tea, and essential cooking items are kept in the translucent cupboard." }, { title: "A Little Care", items: ["Wash vessels and leave the counter and cooking area clean after use.", "Handle kitchen items with care and return them to their places.", "Vessel-cleaning service is available at an additional charge."] }], naturalAspect: true, applianceImageIndexes: [5, 6, 7], images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6707040.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6706856.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6706847.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6706977.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/kitchen/A6706955.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A6706984_2_11zon.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A6706975_1_11zon.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/IMG_6075_3_11zon.webp"] },
    { title: "Additional pictures", description: "A closer look at Kezoi Stays branding details and other thoughtful features around the residence.", includes: "Branding · Property details", adaptiveAspect: true, images: ["https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707022.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707203.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707205.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707214.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707223.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/additional-images/A6707226.webp", "https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A6706997.webp"] }
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
        <div className="container policies-grid policies-grid-single">
          <CheckInInfo property={property} onOpenBooking={handleOpenBooking} />
        </div>
      </section>

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

      <button
        type="button"
        className="sticky-mobile-bar mobile-only"
        onClick={handleOpenBooking}
        aria-label="Book now"
      >
        BOOK NOW
      </button>

    </div>
  );
}

export default App;
