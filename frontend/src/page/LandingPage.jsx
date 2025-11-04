import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextProvider/AuthProvider';

export default function EZShareLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLoginClick = () => {  
    navigate('/SignIn');
  };

  const handleStartSharing = () => {
    if (accessToken) {
      navigate('/User/Dashboard');  // ถ้า login แล้ว ไปที่หน้า Dashboard
    } else {
      navigate('/SignIn');  // ถ้ายังไม่ได้ login ไปที่หน้า SignIn
    }
  };


  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements - Soft and Dreamy */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-3000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            EZ-share
          </div>
          {/* Navigation Button - Login/Register */}
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition transform hover:scale-105 font-medium">
            <button onClick={handleLoginClick}>Login or Register</button>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Logo - Custom SVG with Food Theme */}
          <div className="mb-4 flex justify-center">
            <div className="relative inline-block animate-float">
              
            <img 
                src="/src/assets/logo-PhotoroomCrop.svg" 
                alt="EZ-share Logo"
                className="w-[700px] h-auto drop-shadow-2xl"
            />
                
              {/* Animated sparkles around logo */}
              <div className="absolute -top-4 -right-4 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-pink-400 rounded-full animate-ping animation-delay-1000"></div>
              <div className="absolute top-1/2 -right-8 w-2 h-2 bg-purple-400 rounded-full animate-ping animation-delay-2000"></div>
              <div className="absolute top-0 left-1/4 w-3 h-3 bg-orange-400 rounded-full animate-ping animation-delay-1500"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-gradient">
            Share Made Easy
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience the delicious simplicity of sharing. Fast, secure, and absolutely delightful.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105 flex items-center gap-2">
                <button onClick={handleStartSharing} className="...existing classes...">Start Sharing Now</button>
              <ChevronRight className="group-hover:translate-x-1 transition" />
            </button>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transition transform hover:scale-105">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Animated Food Icons Floating */}
        <div className="absolute top-20 left-20 animate-bounce-slow opacity-10">
          <div className="text-6xl">🧇</div>
        </div>
        <div className="absolute top-40 right-32 animate-bounce-slow animation-delay-1000 opacity-10">
          <div className="text-5xl">🍇</div>
        </div>
        <div className="absolute bottom-40 left-40 animate-bounce-slow animation-delay-2000 opacity-10">
          <div className="text-5xl">🍕</div>
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce-slow animation-delay-3000 opacity-10">
          <div className="text-6xl">🥤</div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce-slow animation-delay-2500 opacity-10">
          <div className="text-4xl">🍣</div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-2500 {
          animation-delay: 2.5s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
