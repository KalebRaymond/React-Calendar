import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditEventModal from './EditEventModal';

describe('<EditEventModal />', () => {
  test('it should mount', () => {
    render(<EditEventModal />);
    
    const editEventModal = screen.getByTestId('EditEventModal');

    expect(editEventModal).toBeInTheDocument();
  });
});