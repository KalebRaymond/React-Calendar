import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventForm from './EventForm';

describe('<EventForm />', () => {
  test('it should mount', () => {
    render(<EventForm />);
    
    const eventForm = screen.getByTestId('EventForm');

    expect(eventForm).toBeInTheDocument();
  });
});