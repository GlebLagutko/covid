import {render} from '@testing-library/react';

import SearchBar from '.';
import React from "react";

describe('SearchBar', () => {

  it('renders correctly', async () => {

    const {container} = render(<SearchBar/>);

    expect(container).toMatchSnapshot();
  });
});