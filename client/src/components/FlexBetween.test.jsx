import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlexBetween from './FlexBetween';

describe('FlexBetween component', () => {
  it('should render with correct flex styles', () => {
    render(<FlexBetween data-testid="flex-between">Test Content</FlexBetween>);
    const element = screen.getByTestId('flex-between');

    expect(element).toHaveStyle('display: flex');
    expect(element).toHaveStyle('justify-content: space-between');
    expect(element).toHaveStyle('align-items: center');
  });
});
