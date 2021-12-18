import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoint } from '../api';

export default function Axios() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) return <p>Error! Reason: {error}</p>;

  return <p>there are {users.length} users</p>;
}
