"use client"

import { useState } from "react"
import { Plus, Check, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function PageClient() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
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
                  todo.completed && "bg-green-500 text-white hover:bg-green-600"
                )}
                onClick={() => toggleTodo(todo.id)}
              >
                <Check className={cn("h-4 w-4", todo.completed ? "opacity-100" : "opacity-0")} />
                <span className="sr-only">
                  {todo.completed ? "Mark as incomplete" : "Mark as complete"}
                </span>
              </Button>
              <span className={cn(
                "flex-grow",
                todo.completed && "line-through text-gray-500"
              )}>
                {todo.text}
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

