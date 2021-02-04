import Table from '.';
import React from "react";
import {render} from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'

describe('Table', () => {

  const data = {cases: 1000, recovered: 0, deaths: 10};
  const server = setupServer(
    rest.get('https://disease.sh/v3/covid-19/countries/belarus', (req, res, ctx) => {
      return res(ctx.json(data))
    }),
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('renders correctly', async () => {

    const {container, findByText} = render(<Table/>);

    expect(await findByText("1000")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

});