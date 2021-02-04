import TestRenderer from 'react-test-renderer';

import React from "react";
import Chart from ".";

describe('Chart', () => {
    it('renders correctly', () => {

        const testRenderer = TestRenderer.create(<Chart/>);

        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

})