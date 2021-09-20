import React from 'react';
import { format } from 'date-fns';

export const maskDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy');
};
