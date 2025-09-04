import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LazyImage from './LazyImage';

describe('LazyImage', () => {
  it('renders loading state initially', () => {
    render(<LazyImage src="test.jpg" alt="Test" />);
    
    // Check loading spinner
    const loadingSpinner = screen.getByRole('status');
    expect(loadingSpinner).toBeInTheDocument();
    expect(loadingSpinner).toHaveAttribute('aria-label', 'Loading image');
    
    // Check image
    const img = screen.getByRole('img');
    expect(img).toHaveStyle({ opacity: '0' });
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'Test');
  });

  it('transitions to loaded state when image loads', async () => {
    render(<LazyImage src="test.jpg" alt="Test" />);
    
    const img = screen.getByRole('img');
    fireEvent.load(img);

    // Loading spinner should be removed
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    
    // Image should be visible
    expect(img).toHaveStyle({ opacity: '1' });
  });

  it('shows error state when image fails to load', () => {
    render(<LazyImage src="invalid.jpg" alt="Test" />);
    
    const img = screen.getByRole('img');
    fireEvent.error(img);

    // Error message should be shown
    expect(screen.getByText('Failed to load image')).toBeInTheDocument();
    
    // Image should be removed
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('applies custom className while maintaining default styles', () => {
    const { container } = render(<LazyImage src="test.jpg" alt="Test" className="custom-class" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveClass('custom-class');
    expect(img).toHaveClass('w-full');
    expect(img).toHaveClass('h-full');
    expect(img).toHaveClass('object-cover');
    
    // Check container
    expect(container.firstChild).toHaveClass('relative');
  });
});
