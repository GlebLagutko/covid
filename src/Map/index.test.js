import {render} from '@testing-library/react';

import CovidMap from '.';
import React from "react";

describe('CovidMap', () => {

  it('renders correctly', async () => {

    const {container} = render(<CovidMap/>);

    expect(container).toMatchSnapshot();
  });
});