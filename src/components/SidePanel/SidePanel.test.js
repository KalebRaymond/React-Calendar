import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SidePanel from './SidePanel';

describe('<SidePanel />', () => {
  test('it should mount', () => {
    render(<SidePanel />);
    
    const sidePanel = screen.getByTestId('SidePanel');

    expect(sidePanel).toBeInTheDocument();
  });
});