import React from 'react';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import mockState from './mocks/mockState';

import {Options} from '../client/src/components/Options.jsx';

describe('Options', () => {

  test('renders', () => {
    const wrapper = shallow(<Options appState={mockState}/>);
    expect(wrapper.exists()).toBe(true);
  });
});