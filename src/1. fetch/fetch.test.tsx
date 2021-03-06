import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Fetch from './fetch';

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

it('fetches data with window.fetch', async () => {
  const fakeUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const fetchMock = jest.spyOn(global, 'fetch');
  fetchMock.mockImplementation(() =>
    Promise.resolve({ json: () => Promise.resolve(fakeUsers), ok: true })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Fetch />, container);
  });

  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect((container as HTMLDivElement).textContent).toMatchInlineSnapshot(
    `"there are 3 users"`
  );

  fetchMock.mockClear();
});

it('shows an error if fetch rejects', async () => {
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.reject('Access denied'));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Fetch />, container);
  });

  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect((container as HTMLDivElement).textContent).toMatchInlineSnapshot(
    `"Error! Reason: Access denied"`
  );

  fetchMock.mockClear();
});
