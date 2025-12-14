
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

test('renders initial todos', () => {
  render(<TodoList />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});

test('adds a todo', () => {
  render(<TodoList />);
  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByText('New Todo')).toBeInTheDocument();
});

test('toggles todo', () => {
  render(<TodoList />);
  fireEvent.click(screen.getByText('Learn React'));
});

test('deletes todo', () => {
  render(<TodoList />);
  fireEvent.click(screen.getAllByText('X')[0]);
});
