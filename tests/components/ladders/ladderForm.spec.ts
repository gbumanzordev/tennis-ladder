import { mount } from '@vue/test-utils';

import LadderForm from '@src/components/ladders/LadderForm.vue';

describe('ladderForm', () => {
    test('LadderForm has the button Add', () => {
        const wrapper = mount(LadderForm);

        expect(wrapper.get('button').text()).toBe('Add');
    });

    test('LadderForm has input in the form', () => {
        const wrapper = mount(LadderForm);

        expect(wrapper.get('input')).toBeTruthy();
        expect(wrapper.get('form')).toBeTruthy();
    });

    test('LadderForm emit submit', async () => {
        const wrapper = mount(LadderForm);
        const buttonSubmit = wrapper.find('button');

        await buttonSubmit.trigger('click');
        await wrapper.vm.$nextTick(); // Wait for async updates

        expect(wrapper.emitted('click')).toBeTruthy();
    });
});
