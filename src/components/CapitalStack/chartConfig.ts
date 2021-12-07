import { Options } from 'highcharts';

export const chartConfig: Options = {
  chart: {
    height: 200,
    spacingTop: 0,
    spacingBottom: 0,
    margin: 0
  },
  title: {
    text: ''
  },
  tooltip: {
    enabled: false
  },
  lang: {
    noData: 'No data available'
  },
  noData: {
    style: {
      fontSize: '14px',
      color: '#999999'
    },
    position: {
      verticalAlign: 'middle',
      align: 'center'
    }
  }
};

interface ICapitalData {
  title: string;
  color: string;
  percentage: number;
  amount: string;
}

export const setChartData = (data: ICapitalData[]) => {
  const buildIDs = data.map(({ title, color }) => ({ id: title, color }));
  const buildChild = data.map(({ title, percentage }) => ({ parent: title, value: percentage }));

  return {
    series: [
      {
        type: 'treemap',
        levels: [
          {
            level: 1,
            layoutAlgorithm: 'sliceAndDice',
            dataLabels: {
              enabled: true,
              align: 'left',
              verticalAlign: 'top',
              style: {
                fontSize: '15px',
                fontWeight: 'bold'
              }
            }
          }
        ],
        data: [...buildIDs, ...buildChild]
      }
    ]
  };
};
