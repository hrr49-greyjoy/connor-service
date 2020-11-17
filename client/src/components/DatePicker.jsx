import React, { Component } from 'react';
import moment from 'moment';
import styles from './styles/datePicker.module.css';
import { isAvailableDate } from '../helpers/isAvailableDate.js';

export class DatePicker extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dates: []
    }
  }

  createDates(refDate) {
    let startOfMonth = moment(refDate.startOf('month'));
    let test = startOfMonth.format('dddd');

    while(test !== 'Sunday') {
      startOfMonth.subtract(1, 'days');
      test = startOfMonth.format('dddd');
    }

    let dates = [];

    for (let i = 0; i < 42; i++) {
      let isAvailable = true;
      let unavailable;
      let selected;
      if (!isAvailableDate(startOfMonth.format('YYYY-MM-DD'), this.props.unavailableDates)) {
        unavailable = styles.dayUnavailable;
        isAvailable = false;
      }

      if ((startOfMonth.format('YYYY-MM-DD') === this.props.checkIn) || (startOfMonth.format('YYYY-MM-DD') === this.props.checkOut)) {
        selected = styles.daySelected;
      }

      dates.push(<div key={i}
        className={`${styles.day} ${unavailable} ${selected}`}
        data-date={startOfMonth.format('YYYY-MM-DD')}
        data-available={isAvailable}>
        {startOfMonth.format('DD')}
        </div>);
      startOfMonth.add(1, 'days');
    }

    return dates;
  }

  componentDidMount() {
      let dates = this.createDates(this.props.selectedMonth);
      this.setState({
        dates
      });
  }

  componentDidUpdate() {
    let dates = this.createDates(this.props.selectedMonth);
    if (JSON.stringify(dates) !== JSON.stringify(this.state.dates)) {
      this.setState({
        dates
      });
    }
  }

  render() {
    let backButton;
    if (this.props.now.format('MMMM YYYY') !== moment(this.props.selectedMonth).format('MMMM YYYY')) {
      backButton = <div id="btn-previous-month"  className={styles.btnChangeMonth} onClick={(e) => this.props.handleChangeMonth(e)}>{"<"}</div>
    } else {
      backButton = <div></div>
    }
    return(
      <div className={styles.calendarContainer}>

        <div className={styles.monthWrapper}>
         {backButton}
          <div>{this.props.selectedMonth.format('MMMM YYYY')}</div>
          <div id="btn-next-month" className={styles.btnChangeMonth} onClick={(e) => this.props.handleChangeMonth(e)}>{">"}</div>
        </div>

        <div className={styles.weekWrapper}>
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        <div className={styles.dateWrapper} onClick={this.props.handleDateClick}>{this.state.dates.map((date) => date)}</div>

      </div>
    )
  }
}