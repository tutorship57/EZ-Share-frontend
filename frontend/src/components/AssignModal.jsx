import React, { useState } from "react";

const AssignModal = ({
  item,
  participants,
  currentAssignments,
  mealId,
  onAssign,
  onClose,
}) => {
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  console.log("this is participants", participants);

  const toggleParticipant = (participantId) => {
    setSelectedParticipants((prev) => {
      if (prev.includes(participantId)) {
        return prev.filter((id) => id !== participantId);
      } else {
        return [...prev, participantId];
      }
    });
    console.log(selectedParticipants);
  };

  const handleAssign = async () => {
    const payload = {
      menuId: item.menu_id,
      guestIds: selectedParticipants,
      amount: item.amount,
      mealId: mealId,
    };
    try {
      await onAssign(payload);
      onClose();
    } catch (error) {
      console.log("this is error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md text-gray-700">
        <h2 className="text-xl font-semibold mb-4">
          Assign "{item.menu_name}" (${item.amount.toFixed(2)})
        </h2>

        <div className="space-y-3 mb-6 max-h-70 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">
          {participants.map((participant) => (
            <div key={participant.guest_id} className="relative">
              <input
                type="checkbox"
                id={`participant-${participant.guest_id}`}
                checked={selectedParticipants.includes(participant.guest_id)}
                onChange={() => toggleParticipant(participant.guest_id)}
                className="peer hidden"
              />

              <label
                htmlFor={`participant-${participant.guest_id}`}
                className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:translate-x-1 peer-checked:bg-violet-100 peer-checked:translate-x-0"
              >
                <div className="w-6 h-6 border-2 border-violet-500 rounded-md mr-4 flex items-center justify-center peer-checked:border-white peer-checked:bg-white transition-all duration-300">
                  {selectedParticipants.includes(participant.guest_id) && (
                    <svg
                      className="w-4 h-4 text-violet-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>

                <span className="flex-1 font-medium text-md">
                  {participant.guest_table.guest_name}
                </span>

                {selectedParticipants.includes(participant.guest_id) && (
                  <span className="text-sm text-gray-600 ml-3">
                    ${(item.amount / selectedParticipants.length).toFixed(2)}
                  </span>
                )}
              </label>
            </div>
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
            className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
