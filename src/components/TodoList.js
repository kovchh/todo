import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { firestore } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // TODO: refactor fetch
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "todos"));
        const todosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosData);
        console.log(todos, todosData);
      } catch (error) {
        console.error("Error fetching collection: ", error);
      }
    };

    fetchTodos();
  }, []);
  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    console.log(todo);

    // Create a new document in the "todos" collection with the todo object
    try {
      const docRef = await addDoc(collection(firestore, "todos"), {
        text: todo.text,
        isComplete: false,
      });
      // Update the local state with the newly created todo's ID
      setTodos((prev) => [{ id: docRef.id, ...todo }, ...prev]);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatesTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatesTodos);
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
