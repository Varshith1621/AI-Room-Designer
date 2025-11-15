import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Enhanced Background */}
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        
        {/* Floating gradient orbs for depth */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 relative z-10">
          
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-gray-200 dark:border-neutral-700 text-sm text-gray-800 dark:text-neutral-200 p-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              <svg className="flex-shrink-0 size-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
              </svg>
              AI-Powered Design Technology
            </span>
          </div>
          
          {/* Main Heading with Gradient Animation */}
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200 leading-tight animate-fade-in-up">
              AI Room and Home{" "}
              <span className="bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-transparent animate-gradient-x">
                Interior Design
              </span>
            </h1>
          </div>
          
          {/* Subheading */}
          <div className="mt-6 max-w-3xl text-center mx-auto animate-fade-in-up animation-delay-200">
            <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-400 leading-relaxed">
              Transform Your Space with AI: Effortless Room & Home Interior Design at Your Fingertips!
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="mt-10 gap-4 flex justify-center flex-wrap animate-fade-in-up animation-delay-400">
            <Link 
              href="/dashboard"
              className="group inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 border border-transparent text-white text-sm md:text-base font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 py-3.5 px-6 md:py-4 md:px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started for Free
              <svg className="flex-shrink-0 size-4 group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
            
            
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-10 flex justify-center items-center gap-x-8 text-sm text-gray-500 dark:text-neutral-500 animate-fade-in-up animation-delay-600">
            <div className="flex items-center gap-x-2">
              <svg className="size-5 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span className="font-medium">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-x-2">
              <svg className="size-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span className="font-medium">10K+ Designs Created</span>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase Image with Enhanced Styling */}
      <div className="relative flex items-center justify-center px-4 -mt-8 mb-16 animate-fade-in-up animation-delay-800">
        <div className="relative max-w-6xl w-full">
          {/* Decorative background elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur-2xl opacity-20"></div>
          
          {/* Image container with shadow and border */}
          <div className="relative bg-white dark:bg-neutral-900 p-3 rounded-2xl shadow-2xl border border-gray-200 dark:border-neutral-800">
            <Image 
              src="/group.png" 
              alt="AI Interior Design Showcase" 
              width={1200} 
              height={700} 
              className="rounded-xl w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Features Section - Enhanced Cards */}
      <div className="max-w-[85rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-neutral-200 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-neutral-400">
            Transform your space in three simple steps
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 - Upload */}
          <div className="group relative overflow-hidden bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-blue-50 hover:to-violet-50 dark:hover:from-neutral-800 dark:hover:to-neutral-800 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
            {/* Step number badge */}
            <div className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
              1
            </div>
            
            <div className="flex justify-center items-center size-14 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-5">
              <svg className="flex-shrink-0 size-7 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" x2="12" y1="3" y2="15"/>
              </svg>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Upload Photo
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-4 leading-relaxed">
                Upload your current room picture to get started with AI transformation
              </p>
              <span className="inline-flex items-center gap-x-2 text-sm text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-x-3 transition-all duration-300">
                Learn more
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </span>
            </div>
          </div>
          
          {/* Card 2 - Select Design */}
          <div className="group relative overflow-hidden bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-blue-50 hover:to-violet-50 dark:hover:from-neutral-800 dark:hover:to-neutral-800 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-4 right-4 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
              2
            </div>
            
            <div className="flex justify-center items-center size-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-5">
              <svg className="flex-shrink-0 size-7 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Choose Style
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-4 leading-relaxed">
                Select your preferred design style and room type from our curated collection
              </p>
              <span className="inline-flex items-center gap-x-2 text-sm text-violet-600 dark:text-violet-400 font-semibold group-hover:gap-x-3 transition-all duration-300">
                Explore styles
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </span>
            </div>
          </div>
          
          {/* Card 3 - AI Processing */}
          <div className="group relative overflow-hidden bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-blue-50 hover:to-violet-50 dark:hover:from-neutral-800 dark:hover:to-neutral-800 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-4 right-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
              3
            </div>
            
            <div className="flex justify-center items-center size-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-5">
              <svg className="flex-shrink-0 size-7 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                AI Magic
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-4 leading-relaxed">
                Our AI analyzes and redesigns your space in seconds with stunning results
              </p>
              <span className="inline-flex items-center gap-x-2 text-sm text-purple-600 dark:text-purple-400 font-semibold group-hover:gap-x-3 transition-all duration-300">
                See examples
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </span>
            </div>
          </div>
          
          {/* Card 4 - Download */}
          <div className="group relative overflow-hidden bg-white dark:bg-neutral-900 hover:bg-gradient-to-br hover:from-blue-50 hover:to-violet-50 dark:hover:from-neutral-800 dark:hover:to-neutral-800 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-4 right-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
              4
            </div>
            
            <div className="flex justify-center items-center size-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-5">
              <svg className="flex-shrink-0 size-7 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Download & Share
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-4 leading-relaxed">
                Download your redesigned space in high quality and share with others
              </p>
              <span className="inline-flex items-center gap-x-2 text-sm text-green-600 dark:text-green-400 font-semibold group-hover:gap-x-3 transition-all duration-300">
                Start now
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-center rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">10K+</div>
            <div className="text-sm text-gray-600 dark:text-neutral-400 font-medium">Designs Created</div>
          </div>
          
          <div className="flex flex-col bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-center rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl md:text-5xl font-bold text-violet-600 dark:text-violet-400 mb-2">50+</div>
            <div className="text-sm text-gray-600 dark:text-neutral-400 font-medium">Design Styles</div>
          </div>
          
          <div className="flex flex-col bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-center rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">5K+</div>
            <div className="text-sm text-gray-600 dark:text-neutral-400 font-medium">Happy Users</div>
          </div>
          
          <div className="flex flex-col bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-center rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-neutral-400 font-medium">AI Support</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-[85rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-3xl p-8 md:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Join thousands of happy users creating stunning interior designs with AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard"
                className="inline-flex justify-center items-center gap-x-3 text-center bg-white hover:bg-gray-50 text-blue-600 text-base font-semibold rounded-xl py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start Designing Now
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
              
              <button className="inline-flex justify-center items-center gap-x-3 text-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white text-base font-semibold rounded-xl py-4 px-8 transition-all duration-300">
                View Examples
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
        <div className="max-w-[85rem] px-4 py-8 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              © 2025 AI Interior Design. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
