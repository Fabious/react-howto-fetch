import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoint } from '../api';

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios(endpoint)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) return <>Error! Reason: {error}</>;

  return <p>there are {users.length} users</p>;
}
