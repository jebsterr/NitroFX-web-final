import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Mock product data for products
const PRODUCTS = [
  {
    id: 1,
    name: "Example product 1",
    description: "Description example",
    price: 2499, // robux price
    altPrice: "€2,299", // alternate price
    altCurrency: "EUR", // alternate currency (white button) -- kinda irrelevant
    category: "laser", // category, shows top left of product card, and in the category drop-down
    tags: ["tag1", "tag2", "tag3", "tag4"], // tags that show on the product card
    image: "logo.png", // image displayed on the product card
    featured: true, // this product will show on the landing page, limited to only 1. if multiple are :true then 1st one will show.
    isNew: true, // this will display the "NEW" tag in the top-right of the product card.
    productHubLink: "https://example.com/rblxhublink", // Edit this link
    paypalLink: "https://paypal.com" // Edit this PayPal link
  },
  {
    id: 2,
    name: "Example product 2",
    description: "Description example",
    price: 1299,
    altPrice: "€1,199",
    altCurrency: "EUR",
    category: "wash",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    image: "logo.png",
    featured: false,
    isNew: true,
    productHubLink: "https://example.com/rblxhublink",
    paypalLink: "https://paypal.com"
  },
  {
    id: 3,
    name: "Example product 3",
    description: "Description example",
    price: 899,
    altPrice: "€829",
    altCurrency: "EUR",
    category: "blinder",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    image: "logo.png",
    featured: false,
    isNew: false,
    productHubLink: "https://example.com/rblxhublink",
    paypalLink: "https://paypal.com"
  },
  {
    id: 4,
    name: "Example product 4",
    description: "Description example",
    price: 1899,
    altPrice: "€1,749",
    altCurrency: "EUR",
    category: "moving head",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    image: "logo.png",
    featured: false,
    isNew: true,
    productHubLink: "https://example.com/rblxhublink",
    paypalLink: "https://paypal.com"
  },
  {
    id: 5,
    name: "Example product 5",
    description: "Description example",
    price: 799,
    altPrice: "€739",
    altCurrency: "EUR",
    category: "laser",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    image: "logo.png",
    featured: false,
    isNew: false,
    productHubLink: "https://example.com/rblxhublink",
    paypalLink: "https://paypal.com"
  },
  {
    id: 6,
    name: "Example product 6",
    description: "Description example",
    price: 1599,
    altPrice: "€1,479",
    altCurrency: "EUR",
    category: "wash",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    image: "logo.png",
    featured: true,
    isNew: true,
    productHubLink: "https://example.com/rblxhublink",
    paypalLink: "https://paypal.com"
  },
  {
    id: 7,
    name: "Example product 7",
    description: "Description example",
    price: 1199,
    altPrice: "€1,109",
    altCurrency: "EUR",
    category: "blinder",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    image: "logo.png",
    featured: false,
    isNew: false,
    productHubLink: "https://example.com/rblxhublink",
    paypalLink: "https://paypal.com"
  },
  {
    id: 8,
    name: "Example product 8",
    description: "Description example",
    price: 2299,
    altPrice: "€2,129",
    altCurrency: "EUR",
    category: "moving head",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    image: "logo.png",
    featured: false,
    isNew: true,
    productHubLink: "https://example.com/rblxhublink",
    paypalLink: "https://paypal.com"
  }
];

const CATEGORIES = [
  { id: "all", name: "All Products", icon: "" },
  { id: "New Products", name: "New Products", icon: "" },
  { id: "moving head", name: "Moving Head", icon: "" },
  { id: "laser", name: "Laser", icon: "" },
  { id: "wash", name: "Wash", icon: "" },
  { id: "blinder", name: "Blinder", icon: "" }
];

// Navbar Component
const Navbar = ({ activeRoute, setActiveRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatured = () => {
    const featuredSection = document.getElementById('featured-product');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img 
              src="logo.png" 
              alt="Nitro Lighting Logo"
              className="w-8 h-8 rounded-full"
            />
            <div className="font-bold text-white hover:text-blue-400 transition-colors cursor-pointer flex flex-col leading-none"
                 onClick={() => setActiveRoute('home')}>
              <span className="text-blue-400 text-lg">NITRO</span>
              <span className="text-white text-sm">Lighting</span>
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
            <button 
              onClick={() => setActiveRoute('contact')}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 ${
                activeRoute === 'contact' ? 'text-blue-400' : 'text-gray-300'
              }`}>
              Contact Us
            </button>
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
const HeroSection = ({ scrollToFeatured }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    "logo.png",
    "logo.png"
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
          <h1 className="font-bold text-white mb-4 animate-fade-in-up flex flex-col leading-none">
            <span className="text-blue-400 text-6xl md:text-8xl">NITRO</span>
            <span className="text-white text-6xl md:text-8xl">LIGHTING</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-2 animate-fade-in-up animation-delay-200">
            The Power Of <span className="text-blue-400">LIGHTING</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 animate-fade-in-up animation-delay-300 max-w-3xl mx-auto">
            Transform your Roblox EDM experiences with professional-grade lighting systems. 
            From powerful wash lights to dynamic moving heads, we deliver the energy your events deserve.
          </p>
          <button 
            onClick={scrollToFeatured}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-600">
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

// Featured Product Section
const FeaturedProductSection = ({ setActiveRoute }) => {
  const featuredProduct = PRODUCTS.find(product => product.featured);
  
  return (
    <section id="featured-product" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-blue-400">Product</span>
          </h2>
          <p className="text-xl text-gray-400">Discover our lighting equipment</p>
        </div>
        
        {featuredProduct && (
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 max-w-6xl mx-auto">
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              <img 
                src={featuredProduct.image} 
                alt={featuredProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                <div className="max-w-2xl">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {featuredProduct.name}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                    {featuredProduct.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProduct.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                  <div className="mb-4 md:mb-0">
                    <span className="text-4xl md:text-5xl font-bold text-blue-400">
                      ${featuredProduct.price}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => window.open(featuredProduct.productHubLink, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Product Hub
                    </button>
                    <button 
                      onClick={() => window.open(featuredProduct.paypalLink, '_blank')}
                      className="bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-gray-300">
                      {featuredProduct.altPrice}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
// @j e b s t e r r wrote this
// Footer Component
const Footer = () => {
  const socialLinks = [
    { name: 'Roblox Group', icon: '', url: 'https://www.roblox.com/communities/32516652/Nitro-Lighting#!/about' },
    { name: 'Discord', icon: '', url: 'https://discord.gg/qXymNbtpXn' },
    { name: 'TikTok', icon: '', url: '#' },
    { name: 'YouTube', icon: '', url: '#' },
    { name: 'X', icon: '', url: '#' },
  ];

  const supportLinks = [
    { name: 'Installation Guide', url: '#' },
    { name: 'Technical Support', url: 'https://discord.gg/qXymNbtpXn' },
    { name: 'Contact Us', url: 'https://discord.gg/qXymNbtpXn' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="logo.png" 
                alt="Nitro Lighting Logo"
                className="w-8 h-8 rounded-full"
              />
              <h3 className="font-bold text-white flex flex-col leading-none">
                <span className="text-blue-400 text-lg">NITRO</span>
                <span className="text-white text-sm">Lighting</span>
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Nitro Lighting is a Roblox Lighting company dedicated to providing top-notch products for the Roblox community.
              Founded with a comitment to quality and affordability, Nitro Lighting offers a wide range of products, including Stage Lighting, Venues, Maps, Stages, and Pyrotechnics
            </p>
          </div>

          {/* Media Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Media</h4>
            <div className="space-y-2">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <div className="space-y-2">
              {supportLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © 2025 NITRO Lighting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
// @jeb sterr wrote this

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
          <span className="text-xl font-bold text-blue-400">R${product.price}</span>
          <div className="flex gap-2">
            <button 
              onClick={() => window.open(product.productHubLink, '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-xs">
              Product Hub
            </button>
            <button 
              onClick={() => window.open(product.paypalLink, '_blank')}
              className="bg-white hover:bg-gray-100 text-black px-3 py-2 rounded-lg transition-colors text-xs border border-gray-300 font-medium">
              {product.altPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Us Page Component
const ContactPage = () => {
  const socialLinks = [
    { name: 'Discord', icon: '💬', url: 'https://discord.gg/your-server', description: 'Join our community server' },
    { name: 'TikTok', icon: '🎵', url: '#', description: 'Follow us for lighting tips' },
    { name: 'YouTube', icon: '📺', url: '#', description: 'Watch product demonstrations' },
    { name: 'Twitter/X', icon: '🐦', url: '#', description: 'Latest updates and news' },
  ];
console.log("This website was made by @jebsterr on discord!")
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-blue-400">Us</span>
          </h1>
          <p className="text-xl text-gray-400">Get in touch with the NITRO Lighting team</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Social Media Links */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Connect With Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{link.icon}</span>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {link.name}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm">{link.description}</p>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Get Support</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">📧</span>
                  <span>support@nitrolighting.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">📞</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">🕒</span>
                  <span>24/7 Support Available</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Discord Embed */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">Join Our Discord Community</h2>
              <div className="flex justify-center">
                <iframe 
                  src="https://discord.com/widget?id=1301201863881920602&theme=dark" 
                  width="350" 
                  height="500" 
                  allowtransparency="true" 
                  frameborder="0" 
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

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

  const selectedCategoryData = CATEGORIES.find(cat => cat.id === selectedCategory);

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
            
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors flex items-center space-x-2 min-w-[200px] justify-between">
                <span className="flex items-center space-x-2">
                  <span>{selectedCategoryData?.icon}</span>
                  <span>{selectedCategoryData?.name}</span>
                </span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`absolute top-14 left-0 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-xl transition-all duration-300 z-10 ${
                isCategoryDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center space-x-2 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setIsCategoryDropdownOpen(false);
                    }}>
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
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
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById('featured-product');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black">
      <HeroSection scrollToFeatured={scrollToFeatured} />
      <FeaturedProductSection setActiveRoute={setActiveRoute} />
      <Footer />
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
      {activeRoute === 'products' && (
        <>
          <ProductsPage />
          <Footer />
        </>
      )}
      {activeRoute === 'contact' && (
        <>
          <ContactPage />
          <Footer />
        </>
      )}
    </div>
  );
}

// @jebsterr made this
export default App;
