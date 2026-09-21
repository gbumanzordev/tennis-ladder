import { mount } from '@vue/test-utils';

import MatchForm from '@src/components/matches/MatchForm.vue';
import type { Player } from '@src/types/domain';

describe('MatchForm', () => {
  const players: Player[] = [
    {
      id: 'p1',
      name: 'Player A',
      ladder_id: 'l1',
      created_at: '',
      deleted_at: '',
    },
    {
      id: 'p2',
      name: 'Player B',
      ladder_id: 'l1',
      created_at: '',
      deleted_at: '',
    },
  ];
  test('MatchForm has the button Add', () => {
    const wrapper = mount(MatchForm, {
      props: {
        players,
      },
    });

    expect(wrapper.get('button').text()).toBe('Add match');
  });

  test('MatchForm has inputs in the form', () => {
    const wrapper = mount(MatchForm, {
      props: {
        players,
      },
    });

    expect(wrapper.get('form').text().toLowerCase()).toContain('player a');
    expect(wrapper.get('form').text().toLowerCase()).toContain('player b');
    expect(wrapper.get('form').text().toLowerCase()).toContain('winner');
    expect(wrapper.get('form').text().toLowerCase()).toContain('score');
    expect(wrapper.get('form').text().toLowerCase()).toContain('played on');
    expect(wrapper.get('form')).toBeTruthy();
  });

  test('MatchForm emit submit', async () => {
    const wrapper = mount(MatchForm, {
      props: {
        players,
      },
    });
    const buttonSubmit = wrapper.find('button');

    await buttonSubmit.trigger('click');
    await wrapper.vm.$nextTick(); // Wait for async updates

    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
