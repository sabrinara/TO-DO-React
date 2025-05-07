import React from 'react';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

type TodoProps = {
  todo: { _id: string; text: string; completed: boolean };
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export const TodoItem: React.FC<TodoProps> = ({ todo, onEdit, onDelete, onToggle }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-[#79086f] text-lg">
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo._id)}
      className="mr-4"
    />
    
    <span
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      className="flex-grow "
    >
      {todo.text}
    </span>
    
    <div className="flex space-x-4 items-center">
      <button
        title="Click to Edit"
        onClick={() => {
          const newText = prompt('Edit todo:', todo.text);
          if (newText && newText.trim()) {
            onEdit(todo._id, newText.trim());
          }
        }}
        className="text-blue-500 hover:text-blue-700"
      >
        <MdOutlineEdit />
      </button>
      
      <button
        title="Click to Delete"
        onClick={() => onDelete(todo._id)}
        className="text-red-500 hover:text-red-700"
      >
        <MdDelete />
      </button>
    </div>
  </div>
  
  );
};
