import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { firestore } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

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

  const removeTodo = async (id) => {
    try {
      const docRef = doc(firestore, "todos", id);
      await deleteDoc(docRef);
      setTodos(todos.filter((todo) => todo.id !== id));
      console.log("Document deleted with ID: ", id);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const updateTodo = async (todoId, newValue) => {
    // Check if the new value object has a valid 'text' property
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    try {
      const docRef = doc(firestore, "todos", todoId);
      await updateDoc(docRef, {
        text: newValue.text,
      });

      setTodos((prev) =>
        prev.map((item) =>
          item.id === todoId ? { ...item, ...newValue } : item
        )
      );
      console.log("Document updated with ID: ", docRef.id);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const completeTodo = async (todoId, isComplete) => {
    try {
      const docRef = doc(firestore, "todos", todoId);
      await updateDoc(docRef, {
        isComplete: isComplete,
      });

      setTodos((prev) =>
        prev.map((item) =>
          item.id === todoId ? { ...item, isComplete: isComplete } : item
        )
      );
      console.log("Document updated with ID: ", docRef.id);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
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
