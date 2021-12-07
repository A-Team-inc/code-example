import { AxisOptions, Options } from 'highcharts';

export const configBuilder = (chartConfig?: Options, dataValues?: Options) => ({
  ...(chartConfig && { ...chartConfig }),
  ...(dataValues && { ...dataValues })
});

export const axisBuilder = (axisConfig: AxisOptions, data?: number[] | string[]) => {
  const { title, labels } = axisConfig;

  return {
    ...axisConfig,
    ...(title && { title }),
    ...(labels && { labels }),
    ...(data && { categories: data })
  };
};
