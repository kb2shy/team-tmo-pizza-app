import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../../../test/testUtils';

import App from './App';

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} state - initial state for set up
 * @returns {ShallowWrapper}
 */
const setup = (state={}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />).dive().dive();
  return wrapper;
}

describe('renders <App /> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  })

  test('renders without error', () => {
    const appComponent = findByTestAttr(wrapper, 'component-App');
    expect(appComponent.length).toBe(1);
  })

  describe('has a header or banner', () => {
    test('header or banner exists', () => {
      const header = findByTestAttr(wrapper, 'header-banner');
      expect(header.length).toBe(1);
    })

    test('header/banner contains `Pizza` in title', () => {
      const header = findByTestAttr(wrapper, 'header-banner');
      expect(header.text()).contain()
    })
  })
})
