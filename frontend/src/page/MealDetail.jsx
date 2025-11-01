import React,{ useState,useEffect } from 'react'
import { Plus, Users,Calendar,Utensils, Calculator, Receipt, LogIn, UserPlus, Home, Menu as MenuIcon, X, Trash2, Edit3 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import AssignModal from '../components/AssignModal';
import { useAuth } from '../contextProvider/AuthProvider';
import {getAllMenu} from '../functions/menuManage';
import {getAllGuest} from '../functions/guestManage';
import {createMenuShare,getAllMenuShareInfo} from '../functions/menuShareManage';
import {getAllTripGuests} from '../functions/tripGuestManage';
import { twoStepTryFetchWithId,twoStepTryFetch,twoStepTryFetchCustom } from '../services/apiCallwithToken';
const MealDetail = () => {
    const [activeTab, setActiveTab] = useState('participants');
    const [showAddParticipant, setShowAddParticipant] = useState(false);
    const [showAddMenuItem, setShowAddMenuItem] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [participantName, setParticipantName] = useState('');
    const [participantGuests, setParticipantGuests] = useState([]);
    const [tripGuests, setTripGuests] = useState([]);
    const [menuShareInfo, setMenuShareInfo] = useState([]);
    const Navigate = useNavigate()
    const {tripId,mealId} = useParams()
    const {accessToken,setAccessToken} = useAuth();
    const [currentMeal, setCurrentMeal] = useState(
    [{
      menuItems: [
        { id: "item_001", name: "Pizza", price: 12.5 },
        { id: "item_002", name: "Burger", price: 8.0 },
        { id: "item_003", name: "Salad", price: 10.0 }
      ],
      participants: [
        { id: "p1", name: "Alice" },
        { id: "p2", name: "Bob" },
        { id: "p3", name: "Charlie" }
      ],
      assignments: {
        "item_001": ["p1", "p3"],
        "item_002": ["p2"],
        "item_003": []
      }
    }
    ]);
    



    const fetchMenu = async () => {
        try {
          const respondMenu  = await twoStepTryFetchWithId(mealId,getAllMenu,accessToken,setAccessToken)
          console.log(respondMenu)

          if(respondMenu.status===200){
            setMenuItems(respondMenu.data.menuList)
            return
          }
        }catch(error){
          console.log("this is error:",error)
          return 
        }
    }
    // const fetchParticipantGuests = async () =>{
    //   try {
    //     const respondParticipants = await twoStepTryFetchWithId(mealId,getAllGuest,accessToken,setAccessToken)
    //     if(respondParticipants.status===200){
    //       setParticipantGuests(respondParticipants.data.guests)
    //       return
    //     }
    //   } catch (error) {
    //     console.log("this is error:",error)
    //     return
    //   }
    // }
    const fetchTripGuest = async () =>{
      try {
        const respondTripGuest = await twoStepTryFetchWithId(tripId,getAllTripGuests,accessToken,setAccessToken)
        if(respondTripGuest.status===200){

          console.log(respondTripGuest.data.tripGuests)
          setTripGuests(respondTripGuest.data.tripGuests)
          return
        }
      } catch (error) {
        console.log("this is error:",error)
        return 
      }
    }
    const fetchMenuShareInfo = async () => {
      try {
        const respondMenuShareInfo = await twoStepTryFetchWithId(mealId,getAllMenuShareInfo,accessToken,setAccessToken)
        if(respondMenuShareInfo.status===200){
          console.log(respondMenuShareInfo)
          setMenuShareInfo(respondMenuShareInfo.data.menuShareInfo)
        }
      }catch(error){
        console.log("this is error:",error)
      }
    }
    useEffect(() => {
      fetchMenu()
    },[]);
    useEffect(()=>{
      fetchTripGuest()
    },[])
    useEffect(()=>{
      fetchMenuShareInfo()
    },[])
    const handleAddParticipant = (e) => {
      e.preventDefault();
    //   addParticipant(participantName);
      setParticipantName('');
      setShowAddParticipant(false);
    };

    
    const handleAddMenuItem = (e) => {
      e.preventDefault();
    //   addMenuItem({ ...menuItem, price: parseFloat(menuItem.price) });
     Navigate(`/User/DashBoard/TripDetail/${tripId}/MealDetail/${mealId}/addMenu`)
    };

    const openAssignModal = (item) => {
      setSelectedItem(item);
      setShowAssignModal(true);
    };
    const handleAssignMenuShareMedal = async(payload)=>{
      try {
        const responseMenuShare = await twoStepTryFetch(createMenuShare,payload,accessToken,setAccessToken)
        if(responseMenuShare.status===200){
          setShowAssignModal(false)
          return responseMenuShare
        }
      } catch (error) {
        console.log("this is error MenuShare:",error)
      }
    }

    const getMealIcon = (type) => {
        switch (type) {
          case 'breakfast': return <Coffee className="w-5 h-5" />;
          case 'lunch': return <Utensils className="w-5 h-5" />;
          case 'dinner': return <MenuIcon className="w-5 h-5" />;
          default: return <Clock className="w-5 h-5" />;
        }
      };

    // const split = calculateSplit();
    

    return (
      <div className="min-h-screen bg-gray-50 ">
        

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-xl shadow-md">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6 ">
                {['menu','participants','assignments', 'summary'].filter(tab => menuItems !=0 || tab !== 'participants').map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'participants' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Participants</h2>
                    <button
                      onClick={() => setShowAddParticipant(true)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Participant
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
                    {tripGuests?.map(participant => (
                      <div key={participant.guest_id} className="bg-gray-50 rounded-lg p-4 flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <Users className="w-5 h-5 text-indigo-600" />
                        </div>
                        <span className="font-medium">{participant.guest_table.guest_name}</span>
                      </div>
                    ))}
                  </div>

                  {tripGuests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No participants added yet ! for this meal 
                    </div>
                  )}
                </div>
              )}



              {activeTab === 'menu' && (
                <div className="text-gray-800">
                  <div className="flex  justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Menu Items</h2>
                    <button
                      onClick={handleAddMenuItem}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Menu Item
                    </button>
                  </div>

                  <div className="space-y-4 text-gray-700">
                    {menuItems?.map(item => (
                      <div key={item.menu_id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{item.menu_name}</h3>
                          <p className="text-gray-600">${item.amount.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => openAssignModal(item)}
                          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm hover:bg-indigo-200"
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>

                  {menuItems?.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No menu items added yet
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'assignments' && (
                 /* <div>
                  <h2 className="text-xl font-semibold text-gray-800 mt-1 mb-6">Item Assignments</h2>
                  
                  <div className="space-y-4 text-gray-700">
                    {currentMeal[0]?.menuItems.map(item => {
                      const assignedParticipants = currentMeal[0].assignments[item.id] || [];
                      const assignedNames = assignedParticipants.map(pid => 
                        currentMeal[0].participants.find(p => p.id === pid)?.name
                      ).filter(Boolean);
                      return (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                            <button
                              onClick={() => openAssignModal(item)}
                              className="text-indigo-600 hover:text-indigo-800 text-sm"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {assignedNames.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {assignedNames.map((name, idx) => (
                                <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm">
                                  {name} (${(item.price / assignedNames.length).toFixed(2)})
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">Not assigned to anyone</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div> */
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mt-1 mb-6">Item Assignments</h2>
                  
                  <div className="space-y-4 text-gray-700">
                    {currentMeal[0]?.menuItems.map(item => {
                      const assignedParticipants = currentMeal[0].assignments[item.id] || [];
                      const assignedNames = assignedParticipants.map(pid => 
                        currentMeal[0].participants.find(p => p.id === pid)?.name
                      ).filter(Boolean);
                      return (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                            <button
                              onClick={() => openAssignModal(item)}
                              className="text-indigo-600 hover:text-indigo-800 text-sm"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {assignedNames.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {assignedNames.map((name, idx) => (
                                <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm">
                                  {name} (${(item.price / assignedNames.length).toFixed(2)})
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">Not assigned to anyone</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'summary' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Bill Summary</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.values(split).map(person => (
                      <div key={person.name} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="font-semibold text-lg mb-4">{person.name}</h3>
                        <div className="space-y-2 mb-4">
                          {person.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.name}</span>
                              <span>${item.amount.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span className="text-indigo-600">${person.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {Object.keys(split).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Add participants and menu items to see the bill summary
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        {/* {showAddParticipant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add Participant</h2>
              <form onSubmit={handleAddParticipant}>
                <input
                  type="text"
                  placeholder="Participant name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                />
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddParticipant(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddMenuItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add Menu Item</h2>
              <form onSubmit={handleAddMenuItem}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Item name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={menuItem.name}
                    onChange={(e) => setMenuItem({...menuItem, name: e.target.value})}
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={menuItem.price}
                    onChange={(e) => setMenuItem({...menuItem, price: e.target.value})}
                  />
                </div>
                <div className="flex space-x-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddMenuItem(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

         */}
         {showAssignModal && selectedItem && (
          <AssignModal
            item={selectedItem}
            participants={tripGuests || []}
            currentAssignments={[]}
            onAssign={handleAssignMenuShareMedal}
            onClose={() => setShowAssignModal(false)}
            mealId={mealId}
          />
        )}
      </div>
    );
  };





export default MealDetail
