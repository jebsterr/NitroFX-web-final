import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Mock product data for lighting equipment
const PRODUCTS = [
  {
    id: 1,
    name: "ProLaser X1 Moving Head",
    description: "Professional RGB laser with precise beam control and DMX compatibility. Perfect for large venues and concerts.",
    price: 2499,
    category: "laser",
    tags: ["Professional", "DMX", "RGB", "High Power"],
    image: "https://images.unsplash.com/photo-1573339887617-d674bc961c31",
    featured: true,
    isNew: true
  },
  {
    id: 2,
    name: "StageWash Pro 360",
    description: "High-output LED wash light with 360-degree rotation and color mixing capabilities.",
    price: 1299,
    category: "wash",
    tags: ["LED", "Color Mixing", "360°", "Energy Efficient"],
    image: "https://images.unsplash.com/photo-1558620013-a08999547a36",
    featured: false,
    isNew: true
  },
  {
    id: 3,
    name: "BlindMax 4000 Array",
    description: "Intense LED blinder array with individual pixel control and strobe effects.",
    price: 899,
    category: "blinder",
    tags: ["LED Array", "Pixel Control", "Strobe", "Compact"],
    image: "https://images.unsplash.com/photo-1558266253-a70a709358c6",
    featured: true,
    isNew: false
  },
  {
    id: 4,
    name: "MoveHead Elite 500",
    description: "Precision moving head with gobos, prisms, and advanced positioning system.",
    price: 1899,
    category: "moving head",
    tags: ["Gobos", "Prisms", "Precision", "Professional"],
    image: "https://images.pexels.com/photos/7598535/pexels-photo-7598535.jpeg",
    featured: false,
    isNew: true
  },
  {
    id: 5,
    name: "LaserBeam RGB Pro",
    description: "Compact RGB laser projector with pattern effects and sound activation.",
    price: 799,
    category: "laser",
    tags: ["RGB", "Patterns", "Sound Active", "Compact"],
    image: "https://images.pexels.com/photos/7351136/pexels-photo-7351136.jpeg",
    featured: false,
    isNew: false
  },
  {
    id: 6,
    name: "WashLight Supreme",
    description: "Premium wash light with RGBW LEDs and wireless DMX connectivity.",
    price: 1599,
    category: "wash",
    tags: ["RGBW", "Wireless DMX", "Premium", "Long Range"],
    image: "https://images.pexels.com/photos/7598668/pexels-photo-7598668.jpeg",
    featured: true,
    isNew: true
  },
  {
    id: 7,
    name: "BlindStorm Matrix",
    description: "Matrix blinder with individual cell control and chase effects.",
    price: 1199,
    category: "blinder",
    tags: ["Matrix", "Cell Control", "Chase Effects", "High Impact"],
    image: "https://images.pexels.com/photos/7671467/pexels-photo-7671467.jpeg",
    featured: false,
    isNew: false
  },
  {
    id: 8,
    name: "MoveSpot Ultimate",
    description: "Ultimate moving head spotlight with zoom, focus, and color wheel.",
    price: 2299,
    category: "moving head",
    tags: ["Zoom", "Focus", "Color Wheel", "Spotlight"],
    image: "https://images.unsplash.com/photo-1598387846101-b5e6738c6e67",
    featured: false,
    isNew: true
  }
];

const CATEGORIES = [
  { id: "all", name: "All Products", icon: "🔥" },
  { id: "moving head", name: "Moving Head", icon: "🎯" },
  { id: "laser", name: "Laser", icon: "⚡" },
  { id: "wash", name: "Wash", icon: "🌈" },
  { id: "blinder", name: "Blinder", icon: "💡" }
];

// Navbar Component
const Navbar = ({ activeRoute, setActiveRoute }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-white hover:text-blue-400 transition-colors cursor-pointer"
                 onClick={() => setActiveRoute('home')}>
              <span className="text-blue-400">Light</span>Tech
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setActiveRoute('home')}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 ${
                activeRoute === 'home' ? 'text-blue-400' : 'text-gray-300'
              }`}>
              Home
            </button>
            <button 
              onClick={() => setActiveRoute('products')}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 ${
                activeRoute === 'products' ? 'text-blue-400' : 'text-gray-300'
              }`}>
              Products
            </button>
            
            <div className="relative">
              <button 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-1">
                <span>Categories</span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className={`absolute top-8 left-0 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl transition-all duration-300 ${
                  isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                {CATEGORIES.slice(1).map((category) => (
                  <button
                    key={category.id}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                    onClick={() => {
                      setActiveRoute('products');
                      setIsDropdownOpen(false);
                    }}>
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button className="md:hidden text-gray-300 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1558266253-a70a709358c6",
    "https://images.unsplash.com/photo-1598387846101-b5e6738c6e67",
    "https://images.unsplash.com/photo-1558620013-a08999547a36"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      ))}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Illuminate Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> Vision</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up animation-delay-300">
            Professional stage lighting equipment for concerts, events, and installations
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-600">
            Explore Products
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

// Featured Products Section
const FeaturedProducts = ({ setActiveRoute }) => {
  const featuredProducts = PRODUCTS.filter(product => product.isNew).slice(0, 3);
  
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-blue-400">Arrivals</span>
          </h2>
          <p className="text-xl text-gray-400">Discover our newest professional lighting equipment</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              style={{ animationDelay: `${index * 200}ms` }}>
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    NEW
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black/70 text-blue-400 px-2 py-1 rounded text-xs font-medium">
                    {CATEGORIES.find(cat => cat.id === product.category)?.name}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-400">${product.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => setActiveRoute('products')}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-3 rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 border border-gray-600 hover:border-blue-500">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-black/70 text-blue-400 px-2 py-1 rounded text-xs font-medium">
            {CATEGORIES.find(cat => cat.id === product.category)?.icon} {CATEGORIES.find(cat => cat.id === product.category)?.name}
          </span>
        </div>
        {product.isNew && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
              NEW
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 mb-3 text-sm line-clamp-2">{product.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-400">${product.price}</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Products Page Component
const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  useEffect(() => {
    let filtered = PRODUCTS;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-blue-400">Lighting</span> Equipment
          </h1>
          <p className="text-xl text-gray-400">Find the perfect lighting solution for your needs</p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}>
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">No products found</div>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ setActiveRoute }) => {
  return (
    <div className="bg-black">
      <HeroSection />
      <FeaturedProducts setActiveRoute={setActiveRoute} />
    </div>
  );
};

// Main App Component
function App() {
  const [activeRoute, setActiveRoute] = useState('home');

  return (
    <div className="App bg-black min-h-screen">
      <Navbar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
      
      {activeRoute === 'home' && <HomePage setActiveRoute={setActiveRoute} />}
      {activeRoute === 'products' && <ProductsPage />}
    </div>
  );
}

export default App;