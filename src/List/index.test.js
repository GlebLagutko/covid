import {render} from '@testing-library/react';

import List from '.';
import React from "react";
import {rest} from 'msw'
import {setupServer} from 'msw/node'

describe('List', () => {

  const fakeUserResponse =[{country: 'US', cases: 1000}];
  const server = setupServer(
    rest.get('https://disease.sh/v3/covid-19/countries', (req, res, ctx) => {
      return res(ctx.json(fakeUserResponse))
    }),
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers())

  it('renders correctly', async () => {

    const {container, findByText} = render(<List/>);

    expect(await findByText("1000")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});