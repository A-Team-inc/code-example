import { CloseIcon } from '../Icons';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from 'stores/store';

import s from './AlertsWrapper.module.scss';

const AlertsWrapper = () => {
  const { NotificationStore } = useStore();

  if (NotificationStore.alertMessages.length === 0) return null;

  return (
    <div className={s.AlertsWrapper__messages__wrapper}>
      {NotificationStore.alertMessages.map((notification) => {
        return (
          <div
            key={`${notification.id}`}
            className={cn(s.AlertsWrapper__message__wrapper, s.AlertsWrapper__message__default)}
          >
            <div
              className={s.AlertsWrapper__message__text__box}
              onClick={() => NotificationStore.markDirectAsRead(notification)}
            >
              {notification.offering_name && (
                <div className={s.AlertsWrapper__message__text__head}>
                  {notification.offering_name}
                </div>
              )}
              {notification.message && (
                <div className={s.AlertsWrapper__message__text}>{notification.message}</div>
              )}
            </div>
            <div
              className={s.AlertsWrapper__message__close}
              onClick={() => NotificationStore.markAsRead(notification)}
            >
              <CloseIcon width={'12px'} height={'12px'} gFill="#fff" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default observer(AlertsWrapper);
