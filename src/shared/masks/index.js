import React from 'react';
import { format } from 'date-fns';

const masks = {
  maskDate: (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  }
};

export default masks;