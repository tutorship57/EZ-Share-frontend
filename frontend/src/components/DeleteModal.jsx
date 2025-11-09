import React from 'react'

const DeleteModal = ({onClose,description,category,handleDeleteMenuShare,leftContext,rightContext,title}) => {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center  justify-center p-4 z-50">
      <div className="bg-white/100 rounded-lg p-6 text-gray-700 w-screen max-w-md">
        <div className="flex flex-col space-y-2 text-center mb-4">
          <h2 className="text-xl font-semibold ">Delete {category}</h2>
          <p className="text-gray-700">
            Are you sure you want to delete this {category}?
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 mb-2">
          <div className="text-xl font-medium mb-2">
            {title}
          </div>
          <div>
            {description}
          </div>
          <div className="flex flex-wrap gap-2 pt-2 justify-between">
            <div className="flex flex-wrap gap-2"> 
              <span
                className="bg-violet-100 text-violet-700 px-2 py-1 rounded text-sm"
              >
                {leftContext}
              </span>
            </div>
            <div className="text-orange-600 bg-orange-100 px-2 py-1 rounded text-sm">
                {rightContext}
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteMenuShare}
            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
