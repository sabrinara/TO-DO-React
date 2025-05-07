'use client';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from '@/lib/api';
import React, { useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import ReactDOM from 'react-dom/client';

export const TodoNoState = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadTodos = async () => {
    const todos = await fetchTodos();
    if (!Array.isArray(todos)) return;
    if (listRef.current) {
      listRef.current.innerHTML = '';
      todos.forEach((todo) => renderTodo(todo));
    }
  };

  const renderIcon = (IconComponent: React.ReactElement) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'text-xl'; // optional styling
    ReactDOM.createRoot(wrapper).render(IconComponent);
    return wrapper;
  };

  const renderTodo = (todo: any) => {
    const div = document.createElement('div');
    div.className = 'flex justify-between items-center p-4 border-b border-[#79086f] text-lg';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.className = 'mr-4';
    checkbox.onchange = async () => {
      await updateTodo(todo._id, { completed: checkbox.checked });
      toast.info(checkbox.checked ? 'To-Do Completed Successfully!' : 'To-Do Marked as Incomplete!');
      loadTodos();
    };

    const text = document.createElement('span');
    text.innerText = todo.text;
    text.className = 'flex-grow';
    if (todo.completed) {
      text.style.textDecoration = 'line-through';
      text.style.opacity = '0.6';
    }

    const editBtn = document.createElement('button');
    editBtn.title = 'Click to Edit';
    editBtn.className = 'text-blue-500 hover:text-blue-700';
    editBtn.onclick = async () => {
      const newText = prompt('Edit todo:', todo.text);
      if (newText && newText.trim()) {
        await updateTodo(todo._id, { text: newText.trim() });
        toast.success('To-Do Updated Successfully!');
        loadTodos();
      }
    };
    editBtn.appendChild(renderIcon(<MdOutlineEdit />));

    const deleteBtn = document.createElement('button');
    deleteBtn.title = 'Click to Delete';
    deleteBtn.className = 'text-red-500 hover:text-red-700';
    deleteBtn.onclick = async () => {
      await deleteTodo(todo._id);
      toast.warning('To-Do Deleted Successfully!');
      loadTodos();
    };
    deleteBtn.appendChild(renderIcon(<MdDelete />));

    const actionWrapper = document.createElement('div');
    actionWrapper.className = 'flex space-x-4 items-center';
    actionWrapper.appendChild(editBtn);
    actionWrapper.appendChild(deleteBtn);

    div.append(checkbox, text, actionWrapper);
    listRef.current?.appendChild(div);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async () => {
    const value = inputRef.current?.value.trim();
    if (value) {
      const newTodo = await addTodo(value);
      toast.success('To-Do added Successfully!');
      inputRef.current!.value = '';
      loadTodos();
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center gap-10'>
        <h2 className='text-2xl'>Todo List Without useState (DOM)</h2>
        <button className="BTN">
          <a href="/">Back to with Props</a>
        </button>
      </div>

      <div className='flex flex-col my-4'>
        <label htmlFor="add" className='LabelTitle'>Add Task</label>
        <div className='flex justify-between items-center gap-2'>
          <input ref={inputRef} placeholder="Enter todo" className='w-[600px] px-2 py-2 rounded-sm border border-fuchsia-800' />
          <button onClick={handleAdd} className='BTN'>Add</button>
        </div>
      </div>

      <div>
        <h1 className='LabelTitle'>My To-Do List</h1>
        <div ref={listRef}></div>
      </div>
      <ToastContainer />
    </div>
  );
};
