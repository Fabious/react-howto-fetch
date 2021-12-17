import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomHook from './customHook';
import { endpoint } from '../api';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('CustomHook', () => {
  afterEach(() => {
    mockAxios.get.mockClear();
  });

  it('renders number of users fetched', async () => {
    const fakeUsers = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    mockAxios.get.mockResolvedValue({ data: fakeUsers });

    render(<CustomHook />);

    expect(mockAxios.get).toBeCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(endpoint);
    await waitFor(() => {
      expect(screen.getByText(/there are 4 users/i)).toBeInTheDocument();
    });
  });

  it('renders an error on failed request', async () => {
    const errorMessage = 'All your base are belong to us';
    mockAxios.get.mockRejectedValue(errorMessage);

    render(<CustomHook />);

    expect(mockAxios.get).toBeCalledTimes(1);
    expect(mockAxios.get).toBeCalledWith(endpoint);
    await waitFor(() => {
      expect(
        screen.getByText(`Error! Reason: ${errorMessage}`)
      ).toBeInTheDocument();
    });
  });
});
