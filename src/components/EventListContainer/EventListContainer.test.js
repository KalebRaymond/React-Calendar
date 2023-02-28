import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventListContainer from './EventListContainer';

describe('<EventListContainer />', () => {
  test('it should mount', () => {
    render(<EventListContainer />);
    
    const eventListContainer = screen.getByTestId('EventListContainer');

    expect(eventListContainer).toBeInTheDocument();
  });
});