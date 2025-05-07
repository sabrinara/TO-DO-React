export const fetchTodos = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos`);
    const data = await res.json();
    console.log('Fetched todos:', data);
    return data;
  };
  
  export const addTodo = async (text: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return res.json();
  };
  
  export const updateTodo = async (_id: string, payload: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  };
  
  export const deleteTodo = async (_id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${_id}`, {
      method: 'DELETE',
    });
  };
  