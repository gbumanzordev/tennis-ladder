import { mount } from '@vue/test-utils';

import StandingsTable from '@src/components/standings/StandingsTable.vue';
import type { StandingRow } from '@src/types/domain';

describe('Standings Table', () => {
  const standings: StandingRow[] = [
    {
      rank: 1,
      playerId: 'p1',
      name: 'Player A',
      played: 3,
      won: 2,
      lost: 1,
      winPercent: 66,
      points: 10,
    },
  ];

  test('Standing name Player A', () => {
    const wrapper = mount(StandingsTable, {
      props: {
        rows: standings,
      },
    });

    expect(wrapper.get('tbody').text()).toContain('Player A');
  });

  test('standing has info Player A', () => {
    const wrapper = mount(StandingsTable, {
      props: {
        rows: standings,
      },
    });

    expect(wrapper.get('tbody').text()).toContain('Player A');
    expect(wrapper.get('tbody').text()).toContain('3');
    expect(wrapper.get('tbody').text()).toContain('2');
    expect(wrapper.get('tbody').text()).toContain('1');
    expect(wrapper.get('tbody').text()).toContain('66');
  });
});
