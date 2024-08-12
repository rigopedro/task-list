// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [showModal, setShowModal] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
      setShowModal(false);
    } else {
      alert('Task cannot be empty.');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task List</h1>
            <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 bg-gray-700 text-white rounded">
              Toggle Dark Mode
            </button>
          </header>
          <main>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-4 rounded shadow">
                  <p className="text-gray-900 dark:text-white">{task}</p>
                  <button onClick={() => deleteTask(index)} className="text-red-600 dark:text-red-400">Delete</button>
                </div>
              ))}
            </div>
            <button onClick={() => setShowModal(true)} className="mt-6 w-full py-2 bg-blue-500 text-white rounded">
              Add New Task
            </button>
          </main>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Enter your task..."
            />
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
                Cancel
              </button>
              <button onClick={addTask} className="px-4 py-2 bg-blue-500 text-white rounded">
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;