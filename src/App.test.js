import React from 'react';
import { render } from '@testing-library/react';
import NotFound404 from './components/NotFound404/NotFound404';
import { HashRouter } from 'react-router-dom';

describe('NotFound404', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <HashRouter >
        <NotFound404 />
      </HashRouter>
    );
  });

  test('number one', () => {
    const { asFragment } = wrapper
    expect(wrapper).toMatchSnapshot()
  })
});
