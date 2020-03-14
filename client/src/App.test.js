import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Login from './views/login'
import Chat from './views/chat'

test('renders login', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Join!/);
  expect(linkElement).toBeInTheDocument();
});

test('renders login', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/username/);
  expect(linkElement).toBeInTheDocument();
});

test('renders chat', () => {
  const { getByText } = render(<Chat users={['a','b']} msgs={[{content:'a', username:'b'}]}/>);
  const linkElement = getByText(/Connected Users:/);
  expect(linkElement).toBeInTheDocument();
});

test('renders chat', () => {
  const { getByText } = render(<Chat users={['a','b']} msgs={[{content:'a', username:'b'}]}/>);
  const linkElement = getByText(/stooq.com/);
  expect(linkElement).toBeInTheDocument();
});

test('renders chat', () => {
  const { getByText } = render(<Chat users={['a','b']} msgs={[{content:'a', username:'b'}]}/>);
  const linkElement = getByText(/Messages/);
  expect(linkElement).toBeInTheDocument();
});

test('renders chat', () => {
  const { getByText } = render(<Chat users={['a','b']} msgs={[{content:'a', username:'b'}]}/>);
  const linkElement = getByText(/Last line/);
  expect(linkElement).toBeInTheDocument();
});