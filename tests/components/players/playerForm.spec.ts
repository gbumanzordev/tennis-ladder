import { mount } from '@vue/test-utils';

import PlayerForm from '@src/components/players/PlayerForm.vue';

describe('PlayerForm', () => {
  test('PlayerForm has the button Add player', () => {
    const wrapper = mount(PlayerForm);

    expect(wrapper.get('button').text()).toBe('Add player');
  });

  test('PlayerForm has inputs in the form', () => {
    const wrapper = mount(PlayerForm);

    expect(wrapper.get('form').text().toLowerCase()).toContain('new player');
    expect(wrapper.get('form')).toBeTruthy();
  });

  test('PlayerForm emit submit', async () => {
    const wrapper = mount(PlayerForm);
    const buttonSubmit = wrapper.find('button');

    await buttonSubmit.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
