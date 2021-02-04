import {render} from '@testing-library/react';

import SelectPeriod from '.';
import React from "react";

describe('SelectPeriod', () => {

  it('renders correctly', async () => {

    const {container} = render(<SelectPeriod/>);

    expect(container).toMatchSnapshot();
  });
});