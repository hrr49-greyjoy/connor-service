import React from 'react';
import {DatePicker} from './DatePicker.jsx';
import styles from './styles/app.module.css';

export const App = () => {
  return(
    <div className={styles.appContainer}>
    <DatePicker/>
    </div>
  )
};



