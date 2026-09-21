import { mount } from '@vue/test-utils';

import PlayerList from '@src/components/players/PlayerList.vue';
import type { Player } from '@src/types/domain';

describe('PlayerList', () => {
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

  test('PlayerList info Player A', () => {
    const wrapper = mount(PlayerList, {
      props: {
        players,
      },
    });

    expect(wrapper.get('span').text()).toContain('Player A');
    expect(wrapper.get('li').text()).toContain('Rename');
    expect(wrapper.get('li').text()).toContain('Delete');
  });

  test('PlayerList delete emit event click', async () => {
    const wrapper = mount(PlayerList, {
      props: {
        players,
      },
    });
    const buttonRename = wrapper
      .findAll('button')
      .find((element) => element.text().toLowerCase() === 'rename');

    expect(buttonRename).toBeTruthy();

    await buttonRename?.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });
  test('Editing is not visible when init', () => {
    const wrapper = mount(PlayerList, {
      props: {
        players,
      },
    });

    expect(wrapper.find('form').exists()).toBe(false);
  });

  test('Editing form is visible', async () => {
    const wrapper = mount(PlayerList, {
      props: {
        players,
      },
    });

    const buttonRename = wrapper
      .findAll('button')
      .find((element) => element.text().toLowerCase() === 'rename');

    expect(buttonRename).toBeTruthy();

    await buttonRename?.trigger('click');
    const input = wrapper.get('input').element as HTMLInputElement;

    expect(input.value).toBe('Player A');
    expect(wrapper.get('button').text().toLowerCase()).toContain('save');
  });
});
