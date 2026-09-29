import { ReactNode } from 'react';

export type SegmentedControlItem<TValue extends string> = {
  disabled?: boolean;
  icon?: ReactNode;
  label: string;
  tooltip?: string;
  value: TValue;
};
