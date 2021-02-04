import TestRenderer from 'react-test-renderer';

import ListItem from '.';
import React from "react";

describe('ListItem', () => {
    it('renders correctly', () => {

        const testRenderer = TestRenderer.create(<ListItem country='us' count='0' key='us'/>);
        // const { queryByText } = render(<AlertRow alert={alert} />);

        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

})