"use client"

import { useState, useEffect } from "react"
import { Plus, Check, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { createClient } from '@supabase/supabase-js'

interface Todo {
  id: number
  title: string
  finished: boolean
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function PageClient() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from('todo_lists')
        .select('*')

      if (error) {
        console.error('Error fetching todos:', error)
      } else {
        setTodos(data || [])
      }
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      setNewTodo("")
      // Add the new todo to Supabase
      try {
        const { data, error } = await supabase
          .from('todo_lists')
          .insert([{ title: newTodo, finished: false }])
        
        if (error) {
          console.error('Error inserting todo:', error)
        } else {
          console.log('Todo added to Supabase:', data)
          // Fetch the updated todos to get the server-generated ID
          fetchTodos()
        }
      } catch (error) {
        console.error('Error inserting todo:', error)
      }
    }
  }

  const toggleTodo = async (id: number) => {
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

  const deleteTodo = async (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))

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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">My Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className="flex-grow"
          />
          <Button onClick={addTodo} size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add todo</span>
          </Button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  "rounded-full transition-colors",
                  todo.finished && "bg-green-500 text-white hover:bg-green-600"
                )}
                onClick={() => toggleTodo(todo.id)}
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
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete todo</span>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

