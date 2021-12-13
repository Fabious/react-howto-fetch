import Fetch from './fetch';
import renderer from 'react-test-renderer';

describe('Fetch', () => {
  let component: renderer.ReactTestRenderer;

  beforeEach(() => {
    // const mockResponseData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    // global.fetch = jest.fn(async () => ({
    //   json: async () => mockResponseData,
    // }));

    renderer.act(() => {
      component = renderer.create(<Fetch />);
    });
  });

  it('fetches data with window.fetch', async () => {
    // await renderer.act(() => new Promise(() => {}));
    // component.update(<>pouet</>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
