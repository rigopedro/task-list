// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import lightBulbOff from './assets/lightbulb-off.png';
import lightBulbOn from './assets/lightbulb-on.png';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        task: newTask,
        description: taskDescription,
        date: new Date(),
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
      setTaskDescription('');
      setShowModal(false);
    } else {
      // eslint-disable-next-line no-undef
      alert('Task cannot be empty.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task List</h1>
            <img
              src={darkMode ? lightBulbOn : lightBulbOff}
              alt="Toggle Dark Mode"
              className="w-8 h-8 cursor-pointer"
              onClick={toggleDarkMode}
            />
          </header>
          <main>
            {showNotification && (
              <div className="notification bg-green-500 text-white p-4 rounded-lg mb-4">
                Tarefa concluída!
              </div>
            )}
            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-4 rounded shadow"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => completeTask(index)}
                      className="mr-3"
                    />
                    <div>
                      <p className={`${task.completed ? 'line-through' : ''} text-gray-900 dark:text-white`}>
                        {task.task}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {task.date.toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-600 dark:text-red-400"
                  >
                    Delete
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
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
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Enter task description..."
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
