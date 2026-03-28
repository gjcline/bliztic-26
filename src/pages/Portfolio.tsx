import React from 'react';
import { ArrowRight } from 'lucide-react';
import CTA from '../components/CTA';

const Portfolio: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Success Stories</h1>
            <p className="text-xl text-primary-100">
              See how we've helped businesses across industries achieve remarkable growth and transformation
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Case Study */}
          <div className="mb-20 bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="order-2 lg:order-1 p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
                  Manufacturing
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">TechManufacture Inc.</h2>
                <p className="text-xl text-gray-700 mb-6">
                  How we helped a leading manufacturer reduce operational costs by 42% through smart automation
                </p>
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Cost Reduction</p>
                    <p className="text-2xl font-bold text-primary-600">42%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Productivity Increase</p>
                    <p className="text-2xl font-bold text-primary-600">67%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Implementation Time</p>
                    <p className="text-2xl font-bold text-primary-600">3 months</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">ROI Timeline</p>
                    <p className="text-2xl font-bold text-primary-600">6 months</p>
                  </div>
                </div>
                <a href="#case-study-1" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
              <div className="order-1 lg:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Manufacturing automation case study" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          
          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="SaaS company growth case study" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">
                  Software
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">CloudSolution SaaS</h3>
                <p className="text-gray-600 mb-4">Achieved 215% YoY growth by entering 3 new market segments with our targeted expansion strategy.</p>
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-500 text-xs">Growth</p>
                    <p className="text-lg font-bold text-primary-600">215%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">New Markets</p>
                    <p className="text-lg font-bold text-primary-600">3</p>
                  </div>
                </div>
                <a href="#case-study-2" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                  Read case study <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Financial services digital transformation" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">
                  Financial Services
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">FinSecure Services</h3>
                <p className="text-gray-600 mb-4">Modernized legacy systems, reducing processing time by 78% and improving customer satisfaction by 45%.</p>
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-500 text-xs">Processing Time</p>
                    <p className="text-lg font-bold text-primary-600">-78%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Customer Satisfaction</p>
                    <p className="text-lg font-bold text-primary-600">+45%</p>
                  </div>
                </div>
                <a href="#case-study-3" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                  Read case study <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Healthcare workflow optimization" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">
                  Healthcare
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">MediTech Solutions</h3>
                <p className="text-gray-600 mb-4">Streamlined clinical workflows and implemented predictive analytics, increasing patient capacity by 32%.</p>
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-500 text-xs">Patient Capacity</p>
                    <p className="text-lg font-bold text-primary-600">+32%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Resource Utilization</p>
                    <p className="text-lg font-bold text-primary-600">+47%</p>
                  </div>
                </div>
                <a href="#case-study-4" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                  Read case study <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Retail digital transformation" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">
                  Retail
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">ShopSmart Retail</h3>
                <p className="text-gray-600 mb-4">Implemented omnichannel strategy and supply chain automation, driving 87% increase in online sales.</p>
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-500 text-xs">Online Sales</p>
                    <p className="text-lg font-bold text-primary-600">+87%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Inventory Turns</p>
                    <p className="text-lg font-bold text-primary-600">+52%</p>
                  </div>
                </div>
                <a href="#case-study-5" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                  Read case study <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Logistics automation" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">
                  Logistics
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">FastTrack Logistics</h3>
                <p className="text-gray-600 mb-4">Revolutionized logistics processes with AI-driven routing and warehouse automation, cutting delivery times by 63%.</p>
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-500 text-xs">Delivery Time</p>
                    <p className="text-lg font-bold text-primary-600">-63%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Operational Costs</p>
                    <p className="text-lg font-bold text-primary-600">-38%</p>
                  </div>
                </div>
                <a href="#case-study-6" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                  Read case study <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
                alt="Education platform expansion" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">
                  Education
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">EduLearn Platform</h3>
                <p className="text-gray-600 mb-4">Expanded into 7 new international markets with localized content strategy, growing user base by 340%.</p>
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-500 text-xs">User Growth</p>
                    <p className="text-lg font-bold text-primary-600">+340%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">New Markets</p>
                    <p className="text-lg font-bold text-primary-600">7</p>
                  </div>
                </div>
                <a href="#case-study-7" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                  Read case study <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-700 italic mb-6">
                "Bliztic's process automation strategy completely transformed our manufacturing operations. We've seen a 42% reduction in costs and a 67% increase in productivity."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-white">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Jane Smith</h4>
                  <p className="text-gray-600">CEO, TechManufacture Inc.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-700 italic mb-6">
                "The market expansion strategy Bliztic developed for us was data-driven and highly effective. Their expertise was invaluable to our growth, helping us achieve 215% YoY growth."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-white">
                  MR
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Michael Rodriguez</h4>
                  <p className="text-gray-600">COO, CloudSolution SaaS</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-700 italic mb-6">
                "Bliztic's digital transformation expertise helped us modernize our legacy systems, reducing processing time by 78% and dramatically improving customer satisfaction."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-white">
                  AT
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Alex Thompson</h4>
                  <p className="text-gray-600">CTO, FinSecure Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </>
  );
};

export default Portfolio;