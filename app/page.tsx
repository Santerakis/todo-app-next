'use client';

import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json' },
    });
    setTitle('');
    fetchTodos();
  };

  const completeTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'PATCH' });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
      <main className="p-8 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">ToDo App</h1>
        <div className="flex gap-2 mb-4">
          <input
              className="border px-2 py-1 flex-1"
              placeholder="New task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-1" onClick={addTodo}>
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
              <li key={todo.id} className="flex justify-between items-center border-b py-2">
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.title}</span>
                <div className="flex gap-2">
                  {!todo.completed && (
                      <button onClick={() => completeTodo(todo.id)} className="text-green-500">
                        Complete
                      </button>
                  )}
                  <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
                    Delete
                  </button>
                </div>
              </li>
          ))}
        </ul>
      </main>
  );
}
