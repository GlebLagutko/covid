import {render} from '@testing-library/react';

import Select from '.';
import React from "react";

describe('Select', () => {

  it('renders correctly', async () => {

    const {container} = render(<Select/>);

    expect(container).toMatchSnapshot();
  });
});