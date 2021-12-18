import { useFetch } from './hooks/useFetch';
import { endpoint } from '../api';

export default function CustomHook() {
  const { data: users, error } = useFetch(endpoint);

  if (error) return <p>Error! Reason: {error}</p>;

  return <p>there are {users?.length ?? 0} users</p>;
}
