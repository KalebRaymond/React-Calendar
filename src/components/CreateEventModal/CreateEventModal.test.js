import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateEventModal from './CreateEventModal';

describe('<CreateEventModal />', () => {
  test('it should mount', () => {
    render(<CreateEventModal />);
    
    const createEventModal = screen.getByTestId('CreateEventModal');

    expect(createEventModal).toBeInTheDocument();
  });
});