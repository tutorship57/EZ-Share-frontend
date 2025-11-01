import React,{useState} from 'react'

 const AssignModal = ({ item, participants, currentAssignments,mealId, onAssign, onClose }) => {
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    console.log("this is participants",participants)
   
    const toggleParticipant = (participantId) => {
      setSelectedParticipants(prev => {
        if (prev.includes(participantId)) {
          return prev.filter(id => id !== participantId);
        } else {
          return [...prev, participantId];
        }
      });
      console.log(selectedParticipants);
    };

    const handleAssign =async () => {
      const payload = {
        menuId: item.menu_id,
        guestIds: selectedParticipants,
        amount: item.amount,
        mealId:mealId
      };
      try {
        await onAssign(payload);
        onClose();
      } catch (error) {
        console.log("this is error:",error)
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md text-gray-700">
          <h2 className="text-xl font-semibold mb-4">
            Assign "{item.menu_name}" (${item.amount.toFixed(2)})
          </h2>
          
          <div className="space-y-3 mb-6">
            {participants.map(participant => (
              <label key={participant.guest_id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedParticipants.includes(participant.guest_id)}
                  onChange={() => toggleParticipant(participant.guest_id)}
                  className="mr-3 w-4 h-4 text-indigo-600"
                />
                <span className="flex-1">{participant.guest_table.guest_name}</span>
                {selectedParticipants.includes(participant.guest_id) && (
                  <span className="text-sm text-gray-600">
                    ${(item.amount / selectedParticipants.length).toFixed(2) }
                  </span>
                )}
              </label>
            ))}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    );
  };

export default AssignModal
