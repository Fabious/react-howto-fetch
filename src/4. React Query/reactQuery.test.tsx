import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactQuery from './reactQuery';
import { endpoint } from '../api';

/**
 * Good post about testing react-query:
 * https://tkdodo.eu/blog/testing-react-query
 */

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('ReactQuery', () => {
  afterEach(() => {
    mockAxios.get.mockClear();
  });

  it('renders number of users fetched', async () => {
    const fakeUsers = [{ id: 1 }, { id: 2 }];
    mockAxios.get.mockResolvedValue({ data: fakeUsers });

    render(<ReactQuery />);

    expect(mockAxios.get).toBeCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(endpoint);
    expect(await screen.findByText(/there are 2 users/i)).toBeInTheDocument();
  });

  it('renders an error on failed request', async () => {
    const errorMessage = 'All your base are belong to us';
    mockAxios.get.mockRejectedValue(errorMessage);

    render(<ReactQuery />);

    expect(mockAxios.get).toBeCalledTimes(1);
    expect(mockAxios.get).toBeCalledWith(endpoint);
    expect(
      await screen.findByText(`An error has occurred: ${errorMessage}`)
    ).toBeInTheDocument();
  });
});
