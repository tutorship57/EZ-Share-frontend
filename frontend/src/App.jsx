// import React, { useState } from 'react';
// import { Plus, Users, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3, Clock, Coffee, Utensils, Calendar, MapPin, User } from 'lucide-react';
// import "./App.css";


// const App = () => {
//   const [currentPage, setCurrentPage] = useState('login');
//   const [user, setUser] = useState(null);
//   const [trips, setTrips] = useState([]);
//   const [currentTrip, setCurrentTrip] = useState(null);
//   const [currentMeal, setCurrentMeal] = useState(null);

//   // Auth functions
//   const handleLogin = (email, password) => {
//     setUser({ user_id: '1', name: 'John Doe', email });
//     setCurrentPage('dashboard');
//   };

//   const handleRegister = (name, email, password) => {
//     setUser({ user_id: '1', name, email });
//     setCurrentPage('dashboard');
//   };

//   const logout = () => {
//     setUser(null);
//     setCurrentPage('login');
//     setTrips([]);
//     setCurrentTrip(null);
//     setCurrentMeal(null);
//   };

//   // Trip functions
//   const createTrip = (tripData) => {
//     const newTrip = {
//       trip_id: Date.now().toString(),
//       ...tripData,
//       user_id: user.user_id,
//       createdAt: new Date(),
//       meals: [],
//       tripGuests: []
//     };
//     setTrips([...trips, newTrip]);
//     setCurrentTrip(newTrip);
//     setCurrentPage('trip-detail');
//   };

//   // Trip Guest functions
//   const addTripGuest = (guestData) => {
//     if (currentTrip) {
//       const newGuest = {
//         guest_id: Date.now().toString(),
//         ...guestData,
//         trip_id: currentTrip.trip_id
//       };
      
//       const updatedTrip = {
//         ...currentTrip,
//         tripGuests: [...currentTrip.tripGuests, newGuest]
//       };
      
//       setCurrentTrip(updatedTrip);
//       setTrips(trips.map(t => t.trip_id === currentTrip.trip_id ? updatedTrip : t));
//     }
//   };

//   // Meal functions
//   const createMeal = (mealData) => {
//     if (currentTrip) {
//       const newMeal = {
//         meal_id: Date.now().toString(),
//         ...mealData,
//         trip_id: currentTrip.trip_id,
//         meal_status: 'planned',
//         menuList: [],
//         assignedGuests: [] // guests assigned to this specific meal
//       };
      
//       const updatedTrip = {
//         ...currentTrip,
//         meals: [...currentTrip.meals, newMeal]
//       };
      
//       setCurrentTrip(updatedTrip);
//       setTrips(trips.map(t => t.trip_id === currentTrip.trip_id ? updatedTrip : t));
//     }
//   };

//   // Meal guest assignment
//   const assignGuestsToMeal = (mealId, guestIds) => {
//     if (currentTrip) {
//       const updatedTrip = {
//         ...currentTrip,
//         meals: currentTrip.meals.map(meal => 
//           meal.meal_id === mealId 
//             ? { ...meal, assignedGuests: guestIds }
//             : meal
//         )
//       };
      
//       setCurrentTrip(updatedTrip);
//       setTrips(trips.map(t => t.trip_id === currentTrip.trip_id ? updatedTrip : t));
//     }
//   };

//   const addMenuItem = (item) => {
//     if (currentMeal && currentTrip) {
//       const newItem = { 
//         menu_id: Date.now().toString(),
//         ...item,
//         meal_id: currentMeal.meal_id,
//         assignments: {} // guest_id -> boolean
//       };
      
//       const updatedMeal = {
//         ...currentMeal,
//         menuList: [...currentMeal.menuList, newItem]
//       };
      
//       const updatedTrip = {
//         ...currentTrip,
//         meals: currentTrip.meals.map(m => m.meal_id === currentMeal.meal_id ? updatedMeal : m)
//       };
      
//       setCurrentMeal(updatedMeal);
//       setCurrentTrip(updatedTrip);
//       setTrips(trips.map(t => t.trip_id === currentTrip.trip_id ? updatedTrip : t));
//     }
//   };

//   const assignMenuItem = (menuId, guestIds) => {
//     if (currentMeal && currentTrip) {
//       const updatedMeal = {
//         ...currentMeal,
//         menuList: currentMeal.menuList.map(item =>
//           item.menu_id === menuId
//             ? { ...item, assignments: guestIds }
//             : item
//         )
//       };
      
//       const updatedTrip = {
//         ...currentTrip,
//         meals: currentTrip.meals.map(m => m.meal_id === currentMeal.meal_id ? updatedMeal : m)
//       };
      
//       setCurrentMeal(updatedMeal);
//       setCurrentTrip(updatedTrip);
//       setTrips(trips.map(t => t.trip_id === currentTrip.trip_id ? updatedTrip : t));
//     }
//   };

//   const calculateMealSplit = () => {
//     if (!currentMeal || !currentTrip) return {};
    
//     const assignedGuests = currentTrip.tripGuests.filter(guest => 
//       currentMeal.assignedGuests.includes(guest.guest_id)
//     );

//     const split = {};
//     assignedGuests.forEach(guest => {
//       split[guest.guest_id] = { 
//         name: guest.name, 
//         total: 0, 
//         items: [] 
//       };
//     });

//     currentMeal.menuList.forEach(item => {
//       const assignedGuestIds = item.assignments || [];
//       if (assignedGuestIds.length > 0) {
//         const splitAmount = item.price / assignedGuestIds.length;
//         assignedGuestIds.forEach(guestId => {
//           if (split[guestId]) {
//             split[guestId].total += splitAmount;
//             split[guestId].items.push({
//               name: item.menu_name,
//               amount: splitAmount
//             });
//           }
//         });
//       }
//     });

//     return split;
//   };

//   const getMealIcon = (mealAt) => {
//     if (mealAt && mealAt.toLowerCase().includes('breakfast')) return <Coffee className="w-5 h-5" />;
//     if (mealAt && mealAt.toLowerCase().includes('lunch')) return <Utensils className="w-5 h-5" />;
//     if (mealAt && mealAt.toLowerCase().includes('dinner')) return <MenuIcon className="w-5 h-5" />;
//     return <Clock className="w-5 h-5" />;
//   };

//   // Components
//   const LoginPage = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       if (isLogin) {
//         handleLogin(formData.email, formData.password);
//       } else {
//         handleRegister(formData.name, formData.email, formData.password);
//       }
//     };

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//           <div className="text-center mb-8">
//             <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Receipt className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800">SplitEase</h1>
//             <p className="text-gray-600 mt-2">Split bills with friends easily</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {!isLogin && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 />
//               </div>
//             )}
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={formData.password}
//                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//             >
//               {isLogin ? 'Sign In' : 'Create Account'}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
//             >
//               {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const Dashboard = () => {
//     const [showCreateTrip, setShowCreateTrip] = useState(false);

//     return (
//       <div className="min-h-screen bg-gray-50">
//         <nav className="bg-white shadow-sm border-b">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <div className="flex items-center">
//                 <Receipt className="w-8 h-8 text-indigo-600 mr-2" />
//                 <span className="text-xl font-bold text-gray-800">SplitEase</span>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <span className="text-gray-700">Welcome, {user?.name}</span>
//                 <button
//                   onClick={logout}
//                   className="text-red-600 hover:text-red-800 font-medium"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-800">Your Trips</h1>
//             <button
//               onClick={() => setShowCreateTrip(true)}
//               className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
//             >
//               <Plus className="w-5 h-5 mr-2" />
//               New Trip
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {trips.map(trip => (
//               <div key={trip.trip_id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{trip.tripName}</h3>
//                 <p className="text-gray-600 mb-4">{trip.Description}</p>
//                 <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
//                   <span className="flex items-center">
//                     <Calendar className="w-4 h-4 mr-1" />
//                     {new Date(trip.Date).toLocaleDateString()}
//                   </span>
//                   <div className="flex items-center space-x-3">
//                     <span className="flex items-center">
//                       <Users className="w-4 h-4 mr-1" />
//                       {trip.tripGuests.length}
//                     </span>
//                     <span className="flex items-center">
//                       <Utensils className="w-4 h-4 mr-1" />
//                       {trip.meals.length}
//                     </span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setCurrentTrip(trip);
//                     setCurrentPage('trip-detail');
//                   }}
//                   className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg font-medium hover:bg-indigo-200 transition-colors"
//                 >
//                   Manage Trip
//                 </button>
//               </div>
//             ))}
//           </div>

//           {trips.length === 0 && (
//             <div className="text-center py-12">
//               <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-medium text-gray-600 mb-2">No trips yet</h3>
//               <p className="text-gray-500">Create your first trip to get started</p>
//             </div>
//           )}
//         </div>

//         {showCreateTrip && <CreateTripModal onClose={() => setShowCreateTrip(false)} />}
//       </div>
//     );
//   };

//   const CreateTripModal = ({ onClose }) => {
//     const [formData, setFormData] = useState({ 
//       tripName: '', 
//       Description: '', 
//       Date: '' 
//     });

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       createTrip(formData);
//       onClose();
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-xl p-6 w-full max-w-md">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Create New Trip</h2>
//             <button onClick={onClose}>
//               <X className="w-6 h-6 text-gray-500" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name</label>
//               <input
//                 type="text"
//                 required
//                 placeholder="e.g., Bangkok Weekend Trip"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={formData.tripName}
//                 onChange={(e) => setFormData({...formData, tripName: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <textarea
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 rows={3}
//                 placeholder="Brief description of the trip..."
//                 value={formData.Description}
//                 onChange={(e) => setFormData({...formData, Description: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Trip Date</label>
//               <input
//                 type="date"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={formData.Date}
//                 onChange={(e) => setFormData({...formData, Date: e.target.value})}
//               />
//             </div>

//             <div className="flex space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//               >
//                 Create Trip
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   const TripDetail = () => {
//     const [activeTab, setActiveTab] = useState('guests');
//     const [showAddGuest, setShowAddGuest] = useState(false);
//     const [showAddMeal, setShowAddMeal] = useState(false);

//     return (
//       <div className="min-h-screen bg-gray-50">
//         <nav className="bg-white shadow-sm border-b">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <div className="flex items-center">
//                 <button
//                   onClick={() => setCurrentPage('dashboard')}
//                   className="text-indigo-600 hover:text-indigo-800 mr-4"
//                 >
//                   <Home className="w-6 h-6" />
//                 </button>
//                 <div>
//                   <h1 className="text-lg font-semibold text-gray-800">{currentTrip?.tripName}</h1>
//                   <p className="text-sm text-gray-600">{currentTrip?.Description}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={logout}
//                 className="text-red-600 hover:text-red-800 font-medium"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </nav>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="bg-white rounded-xl shadow-md">
//             <div className="border-b border-gray-200">
//               <nav className="flex space-x-8 px-6">
//                 {['guests', 'meals'].map(tab => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
//                       activeTab === tab
//                         ? 'border-indigo-500 text-indigo-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     {tab === 'guests' ? 'Trip Guests' : 'Meals'}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             <div className="p-6">
//               {activeTab === 'guests' && (
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl font-semibold">Trip Guests</h2>
//                     <button
//                       onClick={() => setShowAddGuest(true)}
//                       className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
//                     >
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add Guest
//                     </button>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {currentTrip?.tripGuests.map(guest => (
//                       <div key={guest.guest_id} className="bg-gray-50 rounded-lg p-4 flex items-center">
//                         <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
//                           <User className="w-5 h-5 text-indigo-600" />
//                         </div>
//                         <div>
//                           <p className="font-medium">{guest.name}</p>
//                           {guest.email && (
//                             <p className="text-sm text-gray-600">{guest.email}</p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {currentTrip?.tripGuests.length === 0 && (
//                     <div className="text-center py-8 text-gray-500">
//                       No guests added yet. Add guests who will participate in meals.
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'meals' && (
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl font-semibold">Trip Meals</h2>
//                     <button
//                       onClick={() => setShowAddMeal(true)}
//                       className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
//                       disabled={currentTrip?.tripGuests.length === 0}
//                     >
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add Meal
//                     </button>
//                   </div>

//                   {currentTrip?.tripGuests.length === 0 && (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
//                       <p className="text-yellow-800">Please add trip guests before creating meals.</p>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {currentTrip?.meals.map(meal => {
//                       const host = currentTrip.tripGuests.find(g => g.guest_id === meal.meal_host);
//                       return (
//                         <div key={meal.meal_id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
//                           <div className="flex items-center mb-4">
//                             <div className="bg-indigo-100 p-2 rounded-lg mr-3">
//                               {getMealIcon(meal.meal_at)}
//                             </div>
//                             <div>
//                               <h3 className="text-lg font-semibold text-gray-800">{meal.meal_name}</h3>
//                               <p className="text-sm text-gray-600">{meal.meal_at}</p>
//                             </div>
//                           </div>
                          
//                           <div className="mb-4">
//                             <p className="text-sm text-gray-600">
//                               Host: <span className="font-medium">{host?.name || 'Not assigned'}</span>
//                             </p>
//                             <p className="text-sm text-gray-600">
//                               Status: <span className="capitalize font-medium">{meal.meal_status}</span>
//                             </p>
//                           </div>

//                           <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
//                             <span className="flex items-center">
//                               <Users className="w-4 h-4 mr-1" />
//                               {meal.assignedGuests.length} guests
//                             </span>
//                             <span className="flex items-center">
//                               <MenuIcon className="w-4 h-4 mr-1" />
//                               {meal.menuList.length} items
//                             </span>
//                           </div>

//                           <button
//                             onClick={() => {
//                               setCurrentMeal(meal);
//                               setCurrentPage('meal-detail');
//                             }}
//                             className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//                           >
//                             Manage Meal
//                           </button>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {currentTrip?.meals.length === 0 && currentTrip?.tripGuests.length > 0 && (
//                     <div className="text-center py-12">
//                       <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-xl font-medium text-gray-600 mb-2">No meals added yet</h3>
//                       <p className="text-gray-500">Create your first meal to start splitting bills</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {showAddGuest && <AddGuestModal onClose={() => setShowAddGuest(false)} />}
//         {showAddMeal && <CreateMealModal onClose={() => setShowAddMeal(false)} />}
//       </div>
//     );
//   };

//   const AddGuestModal = ({ onClose }) => {
//     const [formData, setFormData] = useState({ 
//       name: '', 
//       email: '', 
//       phone: '' 
//     });

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       addTripGuest(formData);
//       setFormData({ name: '', email: '', phone: '' });
//       onClose();
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-xl p-6 w-full max-w-md">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Add Trip Guest</h2>
//             <button onClick={onClose}>
//               <X className="w-6 h-6 text-gray-500" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
//               <input
//                 type="text"
//                 required
//                 placeholder="Guest name"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={formData.name}
//                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 placeholder="guest@example.com"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//               <input
//                 type="tel"
//                 placeholder="Phone number"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={formData.phone}
//                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
//               />
//             </div>

//             <div className="flex space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//               >
//                 Add Guest
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   const CreateMealModal = ({ onClose }) => {
//     const [formData, setFormData] = useState({ 
//       meal_name: '', 
//       meal_at: '', 
//       meal_host: '' 
//     });

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       createMeal(formData);
//       onClose();
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-xl p-6 w-full max-w-md">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Create New Meal</h2>
//             <button onClick={onClose}>
//               <X className="w-6 h-6 text-gray-500" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Meal Name *</label>
//               <input
//                 type="text"
//                 required
//                 placeholder="e.g., Breakfast at Hotel, Lunch at Restaurant"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={formData.meal_name}
//                 onChange={(e) => setFormData({...formData, meal_name: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Meal Time/Type *</label>
//               <input
//                 type="text"
//                 required
//                 placeholder="e.g., Breakfast 8:00 AM, Lunch 12:30 PM, Dinner 7:00 PM"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={formData.meal_at}
//                 onChange={(e) => setFormData({...formData, meal_at: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Meal Host *</label>
//               <select
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 value={formData.meal_host}
//                 onChange={(e) => setFormData({...formData, meal_host: e.target.value})}
//               >
//                 <option value="">Select a host</option>
//                 {currentTrip?.tripGuests.map(guest => (
//                   <option key={guest.guest_id} value={guest.guest_id}>
//                     {guest.name}
//                   </option>
//                 ))}
//               </select>
//               <p className="text-xs text-gray-500 mt-1">
//                 The host is responsible for organizing this meal
//               </p>
//             </div>

//             <div className="flex space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//               >
//                 Create Meal
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   const MealDetail = () => {
//     const [activeTab, setActiveTab] = useState('guests');
//     const [showAssignGuests, setShowAssignGuests] = useState(false);
//     const [showAddMenuItem, setShowAddMenuItem] = useState(false);
//     const [showAssignModal, setShowAssignModal] = useState(false);
//     const [selectedItem, setSelectedItem] = useState(null);
//     const [menuItem, setMenuItem] = useState({ menu_name: '', price: '', description: '' });

//     const handleAddMenuItem = (e) => {
//       e.preventDefault();
//       addMenuItem({ ...menuItem, price: parseFloat(menuItem.price) });
//       setMenuItem({ menu_name: '', price: '', description: '' });
//       setShowAddMenuItem(false);
//     };

//     const openAssignModal = (item) => {
//       setSelectedItem(item);
//       setShowAssignModal(true);
//     };

//     const split = calculateMealSplit();

//     const assignedGuests = currentTrip?.tripGuests.filter(guest => 
//       currentMeal?.assignedGuests.includes(guest.guest_id)
//     ) || [];

//     return (
//       <div className="min-h-screen bg-gray-50">
//         <nav className="bg-white shadow-sm border-b">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <div className="flex items-center">
//                 <button
//                   onClick={() => setCurrentPage('trip-detail')}
//                   className="text-indigo-600 hover:text-indigo-800 mr-4"
//                 >
//                   <Home className="w-6 h-6" />
//                 </button>
//                 <div className="flex items-center">
//                   <div className="bg-indigo-100 p-1 rounded mr-2">
//                     {getMealIcon(currentMeal?.meal_at)}
//                   </div>
//                   <div>
//                     <h1 className="text-lg font-semibold text-gray-800">{currentMeal?.meal_name}</h1>
//                     <p className="text-sm text-gray-600">{currentTrip?.tripName} • {currentMeal?.meal_at}</p>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={logout}
//                 className="text-red-600 hover:text-red-800 font-medium"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </nav>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="bg-white rounded-xl shadow-md">
//             <div className="border-b border-gray-200">
//               <nav className="flex space-x-8 px-6">
//                 {['guests', 'menu', 'assignments', 'summary'].map(tab => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
//                       activeTab === tab
//                         ? 'border-indigo-500 text-indigo-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     {tab === 'guests' ? 'Meal Guests' : tab}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             <div className="p-6">
//               {activeTab === 'guests' && (
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl font-semibold">Meal Guests</h2>
//                     <button
//                       onClick={() => setShowAssignGuests(true)}
//                       className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
//                     >
//                       <Users className="w-4 h-4 mr-2" />
//                       Assign Guests
//                     </button>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {assignedGuests.map(guest => (
//                       <div key={guest.guest_id} className="bg-gray-50 rounded-lg p-4 flex items-center">
//                         <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
//                           <User className="w-5 h-5 text-indigo-600" />
//                         </div>
//                         <div>
//                           <p className="font-medium">{guest.name}</p>
//                           {guest.guest_id === currentMeal?.meal_host && (
//                             <p className="text-xs text-indigo-600 font-medium">HOST</p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {assignedGuests.length === 0 && (
//                     <div className="text-center py-8 text-gray-500">
//                       No guests assigned to this meal yet
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'menu' && (
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl font-semibold">Menu Items</h2>
//                     <button
//                       onClick={() => setShowAddMenuItem(true)}
//                       className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
//                     >
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add Menu Item
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     {currentMeal?.menuList.map(item => (
//                       <div key={item.menu_id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
//                         <div>
//                           <h3 className="font-medium">{item.menu_name}</h3>
//                           <p className="text-gray-600">${item.price.toFixed(2)}</p>
//                           {item.description && (
//                             <p className="text-sm text-gray-500">{item.description}</p>
//                           )}
//                         </div>
//                         <button
//                           onClick={() => openAssignModal(item)}
//                           className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm hover:bg-indigo-200"
//                         >
//                           Assign
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   {currentMeal?.menuList.length === 0 && (
//                     <div className="text-center py-8 text-gray-500">
//                       No menu items added yet
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'assignments' && (
//                 <div>
//                   <h2 className="text-xl font-semibold mb-6">Item Assignments</h2>
                  
//                   <div className="space-y-4">
//                     {currentMeal?.menuList.map(item => {
//                       const assignedGuestIds = item.assignments || [];
//                       const assignedGuestNames = assignedGuestIds.map(guestId => 
//                         assignedGuests.find(g => g.guest_id === guestId)?.name
//                       ).filter(Boolean);

//                       return (
//                         <div key={item.menu_id} className="bg-gray-50 rounded-lg p-4">
//                           <div className="flex justify-between items-start mb-2">
//                             <div>
//                               <h3 className="font-medium">{item.menu_name}</h3>
//                               <p className="text-gray-600">${item.price.toFixed(2)}</p>
//                             </div>
//                             <button
//                               onClick={() => openAssignModal(item)}
//                               className="text-indigo-600 hover:text-indigo-800 text-sm"
//                             >
//                               <Edit3 className="w-4 h-4" />
//                             </button>
//                           </div>
                          
//                           {assignedGuestNames.length > 0 ? (
//                             <div className="flex flex-wrap gap-2">
//                               {assignedGuestNames.map((name, idx) => (
//                                 <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm">
//                                   {name} (${(item.price / assignedGuestNames.length).toFixed(2)})
//                                 </span>
//                               ))}
//                             </div>
//                           ) : (
//                             <p className="text-gray-500 text-sm">Not assigned to anyone</p>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'summary' && (
//                 <div>
//                   <h2 className="text-xl font-semibold mb-6">Bill Summary</h2>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {Object.values(split).map(person => (
//                       <div key={person.name} className="bg-gray-50 rounded-lg p-6">
//                         <h3 className="font-semibold text-lg mb-4">{person.name}</h3>
//                         <div className="space-y-2 mb-4">
//                           {person.items.map((item, idx) => (
//                             <div key={idx} className="flex justify-between text-sm">
//                               <span>{item.name}</span>
//                               <span>${item.amount.toFixed(2)}</span>
//                             </div>
//                           ))}
//                         </div>
//                         <div className="border-t pt-2">
//                           <div className="flex justify-between font-semibold text-lg">
//                             <span>Total:</span>
//                             <span className="text-indigo-600">${person.total.toFixed(2)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {Object.keys(split).length === 0 && (
//                     <div className="text-center py-8 text-gray-500">
//                       Add menu items and assign them to guests to see the bill summary
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Modals */}
//         {showAssignGuests && (
//           <AssignGuestsModal
//             availableGuests={currentTrip?.tripGuests || []}
//             currentAssignments={currentMeal?.assignedGuests || []}
//             onAssign={(guestIds) => {
//               assignGuestsToMeal(currentMeal.meal_id, guestIds);
//               setShowAssignGuests(false);
//             }}
//             onClose={() => setShowAssignGuests(false)}
//           />
//         )}

//         {showAddMenuItem && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl p-6 w-full max-w-md">
//               <h2 className="text-xl font-semibold mb-4">Add Menu Item</h2>
//               <form onSubmit={handleAddMenuItem}>
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     placeholder="Item name"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     value={menuItem.menu_name}
//                     onChange={(e) => setMenuItem({...menuItem, menu_name: e.target.value})}
//                   />
//                   <input
//                     type="number"
//                     step="0.01"
//                     placeholder="Price"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     value={menuItem.price}
//                     onChange={(e) => setMenuItem({...menuItem, price: e.target.value})}
//                   />
//                   <textarea
//                     placeholder="Description (optional)"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     rows={2}
//                     value={menuItem.description}
//                     onChange={(e) => setMenuItem({...menuItem, description: e.target.value})}
//                   />
//                 </div>
//                 <div className="flex space-x-3 mt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowAddMenuItem(false)}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                   >
//                     Add Item
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {showAssignModal && selectedItem && (
//           <AssignMenuModal
//             item={selectedItem}
//             availableGuests={assignedGuests}
//             currentAssignments={selectedItem.assignments || []}
//             onAssign={(guestIds) => assignMenuItem(selectedItem.menu_id, guestIds)}
//             onClose={() => setShowAssignModal(false)}
//           />
//         )}
//       </div>
//     );
//   };

//   const AssignGuestsModal = ({ availableGuests, currentAssignments, onAssign, onClose }) => {
//     const [selectedGuests, setSelectedGuests] = useState(currentAssignments);

//     const toggleGuest = (guestId) => {
//       if (selectedGuests.includes(guestId)) {
//         setSelectedGuests(selectedGuests.filter(id => id !== guestId));
//       } else {
//         setSelectedGuests([...selectedGuests, guestId]);
//       }
//     };

//     const handleAssign = () => {
//       onAssign(selectedGuests);
//       onClose();
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-xl p-6 w-full max-w-md">
//           <h2 className="text-xl font-semibold mb-4">
//             Assign Guests to Meal
//           </h2>
          
//           <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
//             {availableGuests.map(guest => (
//               <label key={guest.guest_id} className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={selectedGuests.includes(guest.guest_id)}
//                   onChange={() => toggleGuest(guest.guest_id)}
//                   className="mr-3 w-4 h-4 text-indigo-600"
//                 />
//                 <div className="flex-1">
//                   <span className="font-medium">{guest.name}</span>
//                   {guest.email && (
//                     <p className="text-xs text-gray-500">{guest.email}</p>
//                   )}
//                 </div>
//               </label>
//             ))}
//           </div>

//           <div className="flex space-x-3">
//             <button
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleAssign}
//               className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//             >
//               Assign ({selectedGuests.length})
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const AssignMenuModal = ({ item, availableGuests, currentAssignments, onAssign, onClose }) => {
//     const [selectedGuests, setSelectedGuests] = useState(currentAssignments);

//     const toggleGuest = (guestId) => {
//       if (selectedGuests.includes(guestId)) {
//         setSelectedGuests(selectedGuests.filter(id => id !== guestId));
//       } else {
//         setSelectedGuests([...selectedGuests, guestId]);
//       }
//     };

//     const handleAssign = () => {
//       onAssign(selectedGuests);
//       onClose();
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-xl p-6 w-full max-w-md">
//           <h2 className="text-xl font-semibold mb-4">
//             Assign "{item.menu_name}" (${item.price.toFixed(2)})
//           </h2>
          
//           <div className="space-y-3 mb-6">
//             {availableGuests.map(guest => (
//               <label key={guest.guest_id} className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={selectedGuests.includes(guest.guest_id)}
//                   onChange={() => toggleGuest(guest.guest_id)}
//                   className="mr-3 w-4 h-4 text-indigo-600"
//                 />
//                 <span className="flex-1">{guest.name}</span>
//                 {selectedGuests.includes(guest.guest_id) && (
//                   <span className="text-sm text-gray-600">
//                     ${(item.price / selectedGuests.length).toFixed(2)}
//                   </span>
//                 )}
//               </label>
//             ))}
//           </div>

//           <div className="flex space-x-3">
//             <button
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleAssign}
//               className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//             >
//               Assign
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Main render logic
//   if (!user) {
//     return <LoginPage />;
//   }

//   if (currentPage === 'dashboard') {
//     return <Dashboard />;
//   }

//   if (currentPage === 'trip-detail') {
//     return <TripDetail />;
//   }

//   if (currentPage === 'meal-detail') {
//     return <MealDetail />;
//   }

//   return null;
// };

// export default App;




import { useState } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import "./App.css";
import LandingPage from "./page/LandingPage"
import Test from "./page/Test";
import Login from './page/Login'
import DashBoard from "./page/DashBoard";
import TripDetail from "./page/TripDetail";
import CreateTripModal from "./components/CreateTripModal";
import AssignModal from "./components/AssignModal";
import { AuthProvider } from "./contextProvider/AuthProvider";
import UserRoute from "./routes/UserRoute";
import CreateTrip from "./page/CreateTrip";
import MealDetail from "./page/MealDetail";
import CreateGuest from "./page/CreateGuest";
import CreateMeal from "./page/CreateMeal";
import SelectTripGuest from "./page/SelectTripGuest";
import CreateMenu from "./page/CreateMenu";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<Navigate to="/SignIn" />} /> */}
        <Route path="/SignIn" element={<Login/>} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/User" element={<UserRoute />} >
          <Route path="DashBoard" element={<DashBoard/>}/>
          <Route path="DashBoard/NewTrip" element={<CreateTrip/>} />
          <Route path="DashBoard/AssignUser" element={<AssignModal/>}/>
          {/* <Route path="DashBoard/AddGuest" element={<CreateGuest/>}/> */}
          {/* <Route path="DashBoard/AddMeal" element={<CreateMeal/>}/> */}
          {/* <Route path="DashBoard/TripDetail" element={<TripDetail/>}/> */}
          <Route path="DashBoard/TripDetail/:tripId" element={<TripDetail/>}/>
          <Route path="DashBoard/TripDetail/:id/AddGuest" element={<CreateGuest/>}/>
          <Route path="DashBoard/TripDetail/:id/SelectTripGuest" element={<SelectTripGuest/>}/>
          <Route path="DashBoard/TripDetail/:id/AddMeal" element={<CreateMeal/>}/>
          <Route path="DashBoard/TripDetail/:tripId/MealDetail/:mealId" element={<MealDetail/>}/>
          {/* <Route path="DashBoard/TripDetail/:tripId/MealDetail/:mealId/addParticipant" element={<MealDetail/>}/> */}
          <Route path="DashBoard/TripDetail/:tripId/MealDetail/:mealId/addMenu" element={<CreateMenu/>} />
          

          {/* <Route path="DashBoard/TripDetail/:tripId/MealDetail/:mealId/participants/add" element={}/> */}



          {/* <Route path="DashBoard/TripDetail/:id" element={</>}>
            <Route index element={<TripDetail />} />
            <Route path="AssignUser" element={<AssignModal/>}/>
            <Route path="AddGuest" element={<CreateGuest/>}/>
          </Route> */}
          {/* <Route path="DashBoard/TripDetail" element={<TripDetail/>}/> */}

          {/* <Route path="DashBoard/" element={<MealDetail/>}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

