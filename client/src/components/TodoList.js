import { gql, useSubscription } from "@apollo/client";
import { ApolloProvider, useMutation } from "@apollo/client/react";
import { apolloClient } from "./AppolloClient.js";
import PropTypes from "prop-types";
import styles from "../styles/components/Todos.module.css";

const isUUID = (props, propName, componentName) => {
  const value = props[propName];
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(value)) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected a valid UUID.`
    );
  }
};

const ALL_TODOS = gql`
  subscription SubscribeTodos {
    Todos {
      ID
      Description
      Title
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodos($id: uuid!) {
    delete_Todos(where: { ID: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const TODOS_SUBSCRIPTION = gql`
  subscription SubscribeTodos($userId: uuid!) {
    Todos(where: { UserId: { _eq: $userId } }) {
      ID
      Description
      Title
      UserId
    }
  }
`;

const SubscribeTodos = ({ userId, isAdmin }) => {
  const subscription = isAdmin
    ? ALL_TODOS
    : (TODOS_SUBSCRIPTION,
      {
        variables: { userId },
      });
  const { data, loading, error } = useSubscription(subscription);

  const [deleteTodo] = useMutation(DELETE_TODO);
  const handleDeleteTodo = async (id) => {
    const { data, error: deleteError } = await deleteTodo({
      variables: { id: id },
    });
    if (deleteError) {
      console.error("Error deleting todo:", deleteError);
    } else {
      console.log("Todo deleted:", data);
    }
  };

  if (loading) return <p>Loading...try refreshing the page.</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {" "}
      <br />
      <h2>Real-Time {isAdmin ? "All" : "Your"} Todos</h2>
      <ul>
        {data?.Todos.map((todo) => (
          <li key={todo.ID}>
            <strong>{todo.Title}</strong> - {todo.Description}{" "}
            {isAdmin && (
              <button
                className={styles.button}
                onClick={() => handleDeleteTodo(todo.ID)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Wrap component with ApolloProvider
const AppWithProvider = ({ userId, isAdmin }) => (
  <ApolloProvider client={apolloClient}>
    <SubscribeTodos userId={userId} isAdmin={isAdmin} />
  </ApolloProvider>
);

AppWithProvider.propTypes = {
  userId: isUUID,
  isAdmin: PropTypes.bool.isRequired,
};

SubscribeTodos.propTypes = {
  userId: isUUID,
  isAdmin: PropTypes.bool.isRequired,
};

export default AppWithProvider;
