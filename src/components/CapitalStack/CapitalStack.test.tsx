import { shallow } from 'enzyme';
import preloadAll from 'jest-next-dynamic';
import React from 'react';

import CapitalStack from './CapitalStack';

const props = {
  stack: [
    {
      title: 'Investor Equity',
      color: '#43c3d3',
      percentage: 31.9
    },
    {
      title: 'Sponsor Co-Investment',
      color: '#8ac13f',
      percentage: 3.5
    },
    {
      title: 'Senior Debt',
      color: '#1ea0c0',
      percentage: 53
    }
  ],
  total: 10000
};

describe('Capital Stack Component', () => {
  it('should match snapshots', async () => {
    await preloadAll();
    const wrapper = shallow(<CapitalStack {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
