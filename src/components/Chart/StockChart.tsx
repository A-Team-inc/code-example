import Highcharts from 'highcharts/highstock';
import noData from 'highcharts/modules/no-data-to-display';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect } from 'react';
import { configBuilder } from 'utils/chartConfigBuilder';

interface IHighGraph {
  config?: Highcharts.Options;
  dataValues?: Highcharts.Options;
}

const StockChart = ({ config, dataValues }: IHighGraph) => {
  const chartConfig = configBuilder(config, dataValues);

  useEffect(() => {
    noData(Highcharts);
  }, []);

  return (
    <HighchartsReact highcharts={Highcharts} constructorType="stockChart" options={chartConfig} />
  );
};

export default StockChart;
