import dynamic from 'next/dynamic';
import { createElement } from 'react';

export const ArrowIcon = dynamic(() => import('./ArrowIcon'), { ssr: false });
export const ArrowRight = dynamic(() => import('./ArrowRight'), { ssr: false });
export const CheckIcon = dynamic(() => import('./CheckIcon'), { ssr: false });
export const CircleLogo = dynamic(() => import('./CircleLogo'), { ssr: false });
export const City = dynamic(() => import('./City'), { ssr: false });
export const CloseIcon = dynamic(() => import('./CloseIcon'), { ssr: false });
export const Error404Icon = dynamic(() => import('./Error404Icon'), { ssr: false });
export const Error500Icon = dynamic(() => import('./Error500Icon'), { ssr: false });
export const ErrorIcon = dynamic(() => import('./ErrorIcon'), { ssr: false });
export const IconCheck = dynamic(() => import('./IconCheck'), { ssr: false });
export const IconSort = dynamic(() => import('./IconSort'), {
  ssr: false,
  loading: () =>
    createElement('div', {
      style: {
        className: 'iconSort',
        width: 24,
        height: 24,
        backgroundColor: '#eeeeee',
        position: 'absolute',
        left: 8,
        top: 6
      }
    })
});
export const JoinIcon = dynamic(() => import('./JoinIcon'), { ssr: false });
export const LabelIcon = dynamic(() => import('./LabelIcon'), { ssr: false });
export const QuestionCircle = dynamic(() => import('./QuestionCircle'), { ssr: false });
export const SaveIcon = dynamic(() => import('./SaveIcon'), { ssr: false });
export const Spinner = dynamic(() => import('./Spinner'), { ssr: false });
export const TooltipIcon = dynamic(() => import('./TooltipIcon'), { ssr: false });
export const WatchIcon = dynamic(() => import('./WatchIcon'), { ssr: false });
