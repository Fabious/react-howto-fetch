import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { endpoint } from '../api';
import { setLogger } from 'react-query';

/**
 * Per default, React Query prints errors to the console.
 * To avoid seeing 🔴 in the console even though all tests are 🟢,
 * React Query allows overwriting that default behaviour by setting a logger
 */
setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  error: () => {},
});

const fetchUsers = () => {
  return axios
    .get(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      /**
       * For React Query to determine a query has errored,
       * the query function must throw.
       */
      throw new Error(error);
    });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function ReactQuery() {
  const { data: users, error } = useQuery<any>('users', fetchUsers);

  if (error instanceof Error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return <p>there are {users?.length ?? 0} users</p>;
}

export default function ReactQueryWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQuery />
    </QueryClientProvider>
  );
}
