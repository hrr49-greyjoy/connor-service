import React from 'react';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';

import {App} from '../client/src/components/App.jsx';

describe('App', () => {

  test('renders', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.exists()).toBe(true);
  });

});
