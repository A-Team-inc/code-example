import { Options } from 'highcharts';
import Chart from 'molecules/Chart';
import React from 'react';
import { currencyFormat, currencyManager } from 'utils/currencyManipulation';
import { ICapitalStack } from 'utils/globalTypes';

import s from './CapitalStack.module.scss';
import { chartConfig, setChartData } from './chartConfig';

const CapitalStack = ({ stack, total }: ICapitalStack) => {
  const content = currencyManager(stack, total) as {
    title: string;
    color: string;
    percentage: number;
    amount: string;
  }[];

  const preparedData = setChartData(content) as Options;

  return (
    <div className={s.CapitalStack}>
      <div className={s.CapitalStack__row}>
        <div className={s.CapitalStack__graph}>
          <div className={s.CapitalStack__graphContent}>
            <Chart config={chartConfig} dataValues={preparedData} chartType="treemap" />
          </div>
        </div>
        <div className={s.CapitalStack__content}>
          {content &&
            content.map(({ title, color, percentage, amount }) => (
              <div key={`content-${title}`} className={s.CapitalStack__contentItem}>
                <div className={s.CapitalStack__titleWrapper}>
                  <span className={s.CapitalStack__label} style={{ backgroundColor: color }} />
                  {title}
                </div>
                <div className={s.CapitalStack__amountContent}>
                  {`${percentage}%`}
                  <span className={s.CapitalStack__amount}>{`${amount}`}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={s.CapitalStack__footer}>
        {total && (
          <div className={s.CapitalStack__footerContent}>
            <span>Total:</span>
            {currencyFormat(total, 'en-US')}
            <span>(100%)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapitalStack;
