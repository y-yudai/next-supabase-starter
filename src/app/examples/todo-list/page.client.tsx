"use client"

import { useState, useEffect } from "react"
import { Plus, Check, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { createClient } from '@supabase/supabase-js'
import useUserStore from '@/store/user-account'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface Todo {
  id: number
  title: string
  finished: boolean
}

async function fetchTodos(
  userId: number,
  setTodos: (todos: Todo[]) => void,
  setLoading: (loading: boolean) => void
) {
  try {
    const { data, error } = await supabase
      .from('todo_lists')
      .select('*')
      .eq('user_id', userId)
    setLoading(false)
    if (error) {
      console.error('Error fetching todos:', error)
    } else {
      setTodos(data || [])
    }
  } catch (error) {
    console.error('Error fetching todos:', error)
  }
}

async function addTodo(
  userId: number,
  newTodo: string,
  setNewTodo: (value: string) => void,
  onSuccess: () => void
) {
  setNewTodo("")
  try {
    const { data, error } = await supabase
      .from('todo_lists')
      .insert([{ user_id: userId, title: newTodo, finished: false }])
    
    if (error) {
      console.error('Error inserting todo:', error)
    } else {
      console.log('Todo added to Supabase:', data)
      onSuccess()
    }
  } catch (error) {
    console.error('Error inserting todo:', error)
  }
}

async function toggleTodo(
  id: number,
  todos: Todo[],
  setTodos: (todos: Todo[]) => void
) {
  const updatedTodos = todos.map(todo =>
    todo.id === id ? { ...todo, finished: !todo.finished } : todo
  )
  setTodos(updatedTodos)

  try {
    const { error } = await supabase
      .from('todo_lists')
      .update({ finished: !todos.find(t => t.id === id)?.finished })
      .eq('id', id)

    if (error) {
      console.error('Error updating todo:', error)
    }
  } catch (error) {
    console.error('Error updating todo:', error)
  }
}

async function deleteTodo(
  id: number,
  setTodos: (update: (todos: Todo[]) => Todo[]) => void
) {
  setTodos((todos: Todo[]) => todos.filter(todo => todo.id !== id))

  try {
    const { error } = await supabase
      .from('todo_lists')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting todo:', error)
    }
  } catch (error) {
    console.error('Error deleting todo:', error)
  }
}

function TodoInput({ newTodo, setNewTodo, handleAddTodo }: { newTodo: string, setNewTodo: (value: string) => void, handleAddTodo: () => void }) {
  return (
    <div className="flex space-x-2 mb-4">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
        className="flex-grow"
      />
      <Button onClick={handleAddTodo} size="icon">
        <Plus className="h-4 w-4" />
        <span className="sr-only">Add todo</span>
      </Button>
    </div>
  )
}

function TodoList({ todos, handleToggleTodo, handleDeleteTodo }: { todos: Todo[], handleToggleTodo: (id: number) => void, handleDeleteTodo: (id: number) => void }) {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} handleToggleTodo={handleToggleTodo} handleDeleteTodo={handleDeleteTodo} />
      ))}
    </ul>
  )
}

function TodoItem({ todo, handleToggleTodo, handleDeleteTodo }: { todo: Todo, handleToggleTodo: (id: number) => void, handleDeleteTodo: (id: number) => void }) {
  return (
    <li className="flex items-center space-x-2">
      <Button
        size="icon"
        variant="outline"
        className={cn(
          "rounded-full transition-colors",
          todo.finished && "bg-green-500 text-white hover:bg-green-600"
        )}
        onClick={() => handleToggleTodo(todo.id)}
      >
        <Check className={cn("h-4 w-4", todo.finished ? "opacity-100" : "opacity-0")} />
        <span className="sr-only">
          {todo.finished ? "Mark as incomplete" : "Mark as complete"}
        </span>
      </Button>
      <span className={cn(
        "flex-grow",
        todo.finished && "line-through text-gray-500"
      )}>
        {todo.title}
      </span>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => handleDeleteTodo(todo.id)}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete todo</span>
      </Button>
    </li>
  )
}

export default function PageClient() {
  const { userAccount } = useUserStore()
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (userAccount) {
      fetchTodos(userAccount.id, setTodos, setLoading)
    } else {
      setLoading(false)
    }
  }, [userAccount?.id])

  if (isLoading) return <p>Loading...</p>

  const handleAddTodo = () => {
    if (userAccount && newTodo.trim() !== "") {
      addTodo(userAccount.id, newTodo, setNewTodo, () => fetchTodos(userAccount.id, setTodos, setLoading))
    }
  }

  const handleToggleTodo = (id: number) => {
    toggleTodo(id, todos, setTodos)
  }

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id, setTodos)
  }

  return (
    <main className="mx-auto mt-12 flex max-w-screen-md justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} handleAddTodo={handleAddTodo} />
          <TodoList todos={todos} handleToggleTodo={handleToggleTodo} handleDeleteTodo={handleDeleteTodo} />
        </CardContent>
      </Card>
    </main>
  )
}

