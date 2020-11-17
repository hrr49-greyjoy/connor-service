import React, { Component } from 'react';
import moment from 'moment';
import styles from './styles/datePicker.module.css';
import { isAvailableDate } from '../helpers/isAvailableDate.js';

export class DatePicker extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedMonth: moment(),
      dates: []
    }
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
  }


  handleChangeMonth(event) {
    if (event.target.id === "btn-previous-month") {
      let previousMonth = moment(this.state.selectedMonth).subtract(1, 'months');
      this.setState({
        selectedMonth: previousMonth
      })
    }
    if (event.target.id === "btn-next-month") {
      let nextMonth = moment(this.state.selectedMonth).add(1, 'months');
      this.setState({
        selectedMonth: nextMonth
      })
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
      let dates = this.createDates(this.state.selectedMonth);
      this.setState({
        dates
      });
  }

  componentDidUpdate() {
    let dates = this.createDates(this.state.selectedMonth);
    if (JSON.stringify(dates) !== JSON.stringify(this.state.dates)) {
      this.setState({
        dates
      });
    }
  }

  render() {
    return(
      <div className={styles.calendarContainer}>

        <div className={styles.monthWrapper}>
        <div id="btn-previous-month"  className={styles.btnChangeMonth} onClick={(e) => this.handleChangeMonth(e)}>{"<"}</div>
        <div>{this.state.selectedMonth.format('MMMM YYYY')}</div>
        <div id="btn-next-month" className={styles.btnChangeMonth} onClick={(e) => this.handleChangeMonth(e)}>{">"}</div>
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