import Axios from './axios';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { endpoint } from '../api';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  mockAxios.get.mockClear();
});

/**
 * NOTE: on first guess it seems good to test the initial
 * render, BEFORE the useEffect triggers. But axios will get
 * called on first render, thus this test doesn't work, and
 * it SHOULDN'T! You must test components only when you are sure
 * no operations is running, like a async request in this case.
 */
// it('renders no data initially', () => {
//   render(<Axios />);

//   expect(mockAxios.get).not.toHaveBeenCalled();
//   expect(screen.getByText(/there are 0 users/i)).toBeInTheDocument();
// });

it('renders number of users fetched', async () => {
  const fakeUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
  mockAxios.get.mockResolvedValue({ data: fakeUsers });

  render(<Axios />);

  expect(mockAxios.get).toBeCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(endpoint);
  await waitFor(() => {
    expect(screen.getByText(/there are 3 users/i)).toBeInTheDocument();
  });
});

it('renders an error on failed request', async () => {
  const errorMessage = 'All your base are belong to us';
  mockAxios.get.mockRejectedValue(errorMessage);

  render(<Axios />);

  expect(mockAxios.get).toBeCalledTimes(1);
  expect(mockAxios.get).toBeCalledWith(endpoint);
  await waitFor(() => {
    expect(
      screen.getByText(`Error! Reason: ${errorMessage}`)
    ).toBeInTheDocument();
  });
});
