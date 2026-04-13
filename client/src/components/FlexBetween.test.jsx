import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlexBetween from './FlexBetween';

describe('FlexBetween component', () => {
  it('should render with correct flex styles', () => {
    const { container } = render(<FlexBetween>Test Content</FlexBetween>);
    const element = container.firstChild;

    expect(element).toHaveStyle('display: flex');
    expect(element).toHaveStyle('justify-content: space-between');
    expect(element).toHaveStyle('align-items: center');
  });
});
