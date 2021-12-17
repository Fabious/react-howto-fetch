import { useState, useEffect } from 'react';
import { endpoint } from '../api';

export default function Fetch() {
  const [users, setUsers] = useState<unknown[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => setUsers(data));
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) return <p>Error! Reason: {error}</p>;

  return <p>there are {users.length} users</p>;
}
