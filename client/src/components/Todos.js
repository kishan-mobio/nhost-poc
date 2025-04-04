import { useState } from "react";
import { useUserId, useAuthenticated } from "@nhost/react";
import FetchTodos from "./TodoList";
import { nhost } from "../nhost";
import PropTypes from "prop-types";

const CreateTodo = ({ isAdmin }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const userId = useUserId();
  const isAuthenticated = useAuthenticated();

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("You must be logged in to add todos.");
      return;
    }

    const mutation = `
      mutation AddTodo($userId: uuid!, $title: String!, $desc: String!) {
        insert_Todos_one(object: { UserId: $userId, Title: $title, Description: $desc }) {
          UserId
          Title
          Description
        }
      }
    `;

    const { data, error } = await nhost.graphql.request(mutation, {
      userId,
      title,
      desc,
    });

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      console.log("Todo added:", data.insert_Todos_one);
      setTitle("");
      setDesc("");
    }
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <FetchTodos userId={userId} isAdmin={isAdmin} />
    </div>
  );
};

CreateTodo.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default CreateTodo;
