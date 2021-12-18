import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Axios from './axios';
import { endpoint } from '../api';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  mockAxios.get.mockClear();
});

/**
 * NOTE: on first guess it seems good to test the initial
 * render, before the useEffect triggers. But axios will get
 * called on first render, thus this test doesn't work, and
 * it SHOULDN'T! You must test components only when you are sure
 * no operations is running, like an async request in this case.
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
  /**
   * A better way to write this assertion is by using findByText.
   * This way you don't need waitFor, as findByText is a promise.
   * See test below 👇
   */
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
  // better assertion! 👇
  expect(
    await screen.findByText(`Error! Reason: ${errorMessage}`)
  ).toBeInTheDocument();
});
