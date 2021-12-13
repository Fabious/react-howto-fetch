import Fetch from './fetch';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

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
  jest
    .spyOn(global, 'fetch')
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(fakeUsers), ok: true })
    );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Fetch />, container);
  });

  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect((container as HTMLDivElement).textContent).toMatchInlineSnapshot(
    `"there are 3 users"`
  );

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it('renders with no data initially', () => {
  jest.spyOn(global, 'fetch');
  render(<Fetch />, container);

  expect(window.fetch).toHaveBeenCalledTimes(0);
  expect((container as HTMLDivElement).textContent).toMatchInlineSnapshot(
    `"there are 0 users"`
  );

  global.fetch.mockRestore();
});

it('shows an error if fetch rejects', async () => {
  jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.reject('Access denied'));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Fetch />, container);
  });

  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect((container as HTMLDivElement).textContent).toMatchInlineSnapshot(
    `"Error! Reason: Access denied"`
  );

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
