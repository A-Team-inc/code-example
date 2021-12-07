import Highcharts from 'highcharts';
import noData from 'highcharts/modules/no-data-to-display';
import treemap from 'highcharts/modules/treemap';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect } from 'react';
import { configBuilder } from 'utils/chartConfigBuilder';

interface IHighGraph {
  config?: Highcharts.Options;
  dataValues?: Highcharts.Options;
  chartType?: string;
}

const getHighcharts = (chartType?: string) => {
  switch (chartType) {
    case 'treemap':
      treemap(Highcharts);
  }

  return Highcharts;
};

const Chart = ({ config, dataValues, chartType }: IHighGraph) => {
  const chartConfig = configBuilder(config, dataValues);

  useEffect(() => {
    noData(Highcharts);
  }, [chartType]);

  return <HighchartsReact highcharts={getHighcharts(chartType)} options={chartConfig} />;
};

export default Chart;
