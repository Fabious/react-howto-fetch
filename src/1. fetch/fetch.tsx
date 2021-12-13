import { useState, useEffect } from 'react';
import { endpoint } from '../api';

export default function Fetch() {
  const [users, setUsers] = useState<unknown[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUsers([{ id: 1 }]);
    // fetch(endpoint)
    //   .then((response) => {
    //     if (response.ok) {
    //       response.json().then((data) => setUsers(data));
    //     }
    //     throw response;
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data: ', error);
    //     setError(error);
    //   });
  }, []);

  if (error) return <>Error!</>;

  return <p>there are {users.length} users</p>;
}
