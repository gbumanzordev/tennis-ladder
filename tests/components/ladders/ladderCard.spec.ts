import { mount, RouterLinkStub } from '@vue/test-utils';
import LadderCard from '@src/components/ladders/LadderCard.vue';
import type { Ladder } from '@src/types/domain';

describe('ladderCard', () => {
  const ladder: Ladder = {
    name: 'NewLadder',
    id: 'l1',
    owner_id: 'u1',
    created_at: '',
  };
  test('RouterLink has props to correct', () => {
    const wrapper = mount(LadderCard, {
      props: {
        ladder,
      },
    });
    const routerLink = wrapper.findComponent(RouterLinkStub);
    expect(routerLink.props('to')).toContain(`/ladders/${ladder.id}`);
  });

  test('RouterLink render de Ladder name', () => {
    const wrapper = mount(LadderCard, {
      props: {
        ladder,
      },
    });

    expect(wrapper.get('a').text()).toBe(ladder.name);
  });

  test('RouterLink has two buttons rename/delete', () => {
    const wrapper = mount(LadderCard, {
      props: {
        ladder,
      },
    });

    expect(wrapper.get('li').text().toLowerCase()).toContain('rename');
    expect(wrapper.get('li').text().toLowerCase()).toContain('delete');
  });

  test('Editing form is visible', async () => {
    const wrapper = mount(LadderCard, {
      props: {
        ladder,
      },
    });

    const buttonRename = wrapper
      .findAll('button')
      .find((element) => element.text().toLowerCase() === 'rename');

    expect(buttonRename).toBeTruthy();

    await buttonRename?.trigger('click');
    const input = wrapper.get('input').element as HTMLInputElement;

    expect(input.value).toBe('NewLadder');
    expect(wrapper.get('button').text().toLowerCase()).toContain('save');
  });
});
