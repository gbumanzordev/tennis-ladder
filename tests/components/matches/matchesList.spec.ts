import { mount } from '@vue/test-utils';

import MatchList from '@src/components/matches/MatchList.vue';
import type { Player, Match } from '@src/types/domain';

describe('render match test', () => {
    const matches: Match[] = [
        {
            id: 'm1',
            ladder_id: 'l1',
            player_a_id: 'p1',
            player_b_id: 'p2',
            played_on: '2026-09-09',
            created_at: '2026-09-09',
            score: '6-2 6-4',
            winner_id: 'p1',
        },
    ];
    const players: Player[] = [
        {
            id: 'p1',
            name: 'Player A',
            ladder_id: 'l1',
            created_at: '',
        },
        {
            id: 'p2',
            name: 'Player B',
            ladder_id: 'l1',
            created_at: '',
        },
    ];

    test('MatchList info Player A and Player B, the row has Delete button', () => {
        const wrapper = mount(MatchList, {
            props: {
                players,
                matches,
            },
        });

        expect(wrapper.get('div').text()).toContain('Player A');
        expect(wrapper.get('div').text()).toContain('Player B');
        expect(wrapper.get('button').text()).toBe('Delete');
    });

    test('MatchList delete emit event click', async () => {
        const wrapper = mount(MatchList, {
            props: {
                players,
                matches,
            },
        });
        const buttonSubmit = wrapper.find('button');

        await buttonSubmit.trigger('click');
        await wrapper.vm.$nextTick(); // Wait for async updates

        expect(wrapper.emitted('click')).toBeTruthy();
    });
});
