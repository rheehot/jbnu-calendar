import React from 'react';
import PropTypes from 'prop-types';

function Calendar(props) {
  return (
    <svg viewBox="0 0 203.543 203.543" {...props}>
      <path d="M194.139 11.918h-39.315V6a6 6 0 00-12 0v5.918h-35.053V6a6 6 0 00-12 0v5.918H62.208V6a6 6 0 00-12 0v5.918H9.404a6 6 0 00-6 6V153.49a6 6 0 006 6H46.23c5.901 25.214 28.555 44.053 55.541 44.053s49.64-18.84 55.541-44.053h36.826a6 6 0 006-6V17.918a5.999 5.999 0 00-5.999-6zm-143.931 12v5.422a6 6 0 0012 0v-5.422h33.563v5.422a6 6 0 0012 0v-5.422h35.053v5.422a6 6 0 0012 0v-5.422h33.315v24.536H15.404V23.918h34.804zm51.563 167.625c-24.842 0-45.053-20.211-45.053-45.053s20.211-45.053 45.053-45.053 45.053 20.21 45.053 45.053-20.21 45.053-45.053 45.053zm57.028-44.053c.006-.334.025-.665.025-1 0-31.459-25.594-57.053-57.053-57.053s-57.053 25.594-57.053 57.053c0 .335.02.666.025 1h-29.34V60.455h172.735v87.035h-29.339z" />
      <path d="M107.771 148.004v-29.026a6 6 0 00-12 0v31.512c0 1.591.632 3.117 1.757 4.243l13.79 13.791a5.984 5.984 0 004.243 1.757 6 6 0 004.243-10.242l-12.033-12.035z" />
    </svg>
  );
}

Calendar.propTypes = {
  width: PropTypes.string,
};
Calendar.defaultProps = {
  width: '16px'
};

export default Calendar;