import App from '../App';
import renderer from 'react-test-renderer';

it('smoke', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
