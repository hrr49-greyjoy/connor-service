import React from 'react';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import mockState from './mocks/mockState';

import {DatePicker} from '../client/src/components/DatePicker.jsx';

describe('DatePicker', () => {

  test('renders', () => {
    const wrapper = shallow(<DatePicker
      checkIn={mockState.checkIn}
      checkOut={mockState.checkOut}
      unavailableDates={mockState.unavailableDates}
      now={mockState.now}
      selectedMonth={mockState.selectedMonth}
    />);
    expect(wrapper.exists()).toBe(true);
  });

});
