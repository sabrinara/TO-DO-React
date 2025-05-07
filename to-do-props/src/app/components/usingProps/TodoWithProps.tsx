'use client';
import React, { useEffect, useState } from 'react';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from '@/lib/api';
import { TodoItem } from './TodoItems';
import { ToastContainer, toast } from 'react-toastify';

type Todo = {
  _id: string;
  text: string;
  completed: boolean;
};

export const TodoWithProps = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(Array.isArray(data) ? data : []);
    };
    loadTodos();
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return;
    const newTodo = await addTodo(text.trim());
    toast.success("To-Do added Successfully!");
    if (newTodo) {
      setTodos(prev => [...prev, newTodo]);
      setText('');
    }
  };

  const handleEdit = async (_id: string, newText: string) => {
    const updated = await updateTodo(_id, { text: newText });
    toast.success("To-Do Updated Successfully!");
    setTodos(todos.map(todo => (todo._id === _id ? updated : todo)));
  };

  const handleDelete = async (_id: string) => {
    await deleteTodo(_id);
    toast.warning("To-Do Deleted Successfully!");
    setTodos(todos.filter(t => t._id !== _id));
  };

  const handleToggle = async (_id: string) => {
    const todo = todos.find(t => t._id === _id);
    if (!todo) return;
    const updated = await updateTodo(_id, { completed: !todo.completed });
    if (updated.completed) {
      toast.success("To-Do Completed Successfully!");
    } else {
      toast.info("To-Do Marked as Incomplete!");
    }
    setTodos(todos.map(t => (t._id === _id ? updated : t)));
  };

  return (
    <div>
      <div className='flex justify-between items-center gap-10'>
        <h2 className='text-2xl'>Todo List with Props</h2>
        <button className="BTN"><a href="/noState"> Using no State</a></button>

      </div>
      <div className='flex flex-col my-4'>
        <label htmlFor="add" className='LabelTitle'>Add Task</label>
        <div className='flex justify-between items-center gap-2'>
          <input name='add' value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter todo" className='w-[600px] px-2 py-2 rounded-sm border border-fuchsia-800' />
          <button className='BTN' onClick={handleAdd}>Add</button>
        </div>
      </div>
      <div>
        <h1 className='LabelTitle'>My To-Do List</h1>
        {todos.length > 0 ? (
          todos.map((todo) =>
            todo ? (
              <div className='my-2'>
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                />
              </div>
            ) : null
          )
        ) : (
          <p>No todos found.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
