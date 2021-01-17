import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Layout from './Layout/Layout';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders with or without a name', () => {
  act(() => {
    render(
      <Provider>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </Provider>,
      container
    );
  });
  expect(container.textContent).toBe('Welcome');
});
