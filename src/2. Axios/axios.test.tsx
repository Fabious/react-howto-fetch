import Axios from './axios';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { endpoint } from '../api';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container as Element);
  (container as HTMLDivElement).remove();
  container = null;
});

it('renders number of users fetched', async () => {
  const fakeUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
  axiosMock.mockResolvedValue({ data: fakeUsers });

  await act(async () => {
    render(<Axios />, container);
  });

  expect(axiosMock).toHaveBeenCalledWith(endpoint);
  expect((container as HTMLDivElement).textContent).toMatchInlineSnapshot(
    `"there are 3 users"`
  );

  axiosMock.mockReset();
});

// it('renders no data initially', () => {
//   render(<Axios />, container);

//   expect(axiosMock).not.toHaveBeenCalled();
//   expect((container as HTMLDivElement).textContent).toMatchInlineSnapshot(
//     `"there are 0 users"`
//   );
// });
