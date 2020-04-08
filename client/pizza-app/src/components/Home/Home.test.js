import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../../../test/testUtils';

import Home from './Home';

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} state - initial state for set up
 * @returns {ShallowWrapper}
 */
const setup = (state = {}) => {
    const store = storeFactory(state);
    const wrapper = shallow(<Home store={store} />).dive();
    return wrapper;
}

describe('renders <Home /> component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });

    test('renders without error', () => {
        const homeComponent = findByTestAttr(wrapper, 'component-Home');
        expect(homeComponent.length).toBe(1);
    });

    describe('login form', () => {
        test('login form fields exist', () => {
            const formLogin = findByTestAttr(wrapper, 'form-login');
            expect(formLogin.length).toBe(1); 
        });

        test('label for user email input exists', () => {
            const labelUserEmail = findByTestAttr(wrapper, 'label-user-email');
            expect(labelUserEmail.length).toBe(1);
        });

        test('input field for user email', () => {
            const inputUserEmail = findByTestAttr(wrapper, 'input-user-email');
            expect(inputUserEmail.length).toBe(1);
        });

        test('label for user password input exists', () => {
            const labelUserPassword = findByTestAttr(wrapper, 'label-user-password');
            expect(labelUserPassword.length).toBe(1);
        });

        test('input field for user password exists', () => {
            const inputUserPassword = findByTestAttr(wrapper, 'input-user-password');
            expect(inputUserPassword.length).toBe(1);
        });

        test('user login button exists', () => {
            const buttonLogin = findByTestAttr(wrapper, 'button-login');
            expect(buttonLogin.length).toBe(1);
        })
    });

    describe('guest user button', () => {
        test('guest user button or link exists', () => {
            const buttonGuest = findByTestAttr(wrapper, 'button-guest');
            expect(buttonGuest.length).toBe(1);
        })
    })
})