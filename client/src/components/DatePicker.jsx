import React, { Component } from 'react';
import moment from 'moment';
import styles from './styles/datePicker.module.css';
import { isAvailableDate } from '../helpers/isAvailableDate.js';
import {FaSlash} from 'react-icons/fa';
import {BsFillCaretLeftFill, BsFillCaretRightFill} from 'react-icons/bs';

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
      let slash;
      if (!isAvailableDate(startOfMonth.format('YYYY-MM-DD'), this.props.unavailableDates)) {
        unavailable = styles.dayUnavailable;
        isAvailable = false;
        slash = <FaSlash className={styles.slash}/>;
      }

      if ((startOfMonth.format('YYYY-MM-DD') === this.props.checkIn) || (startOfMonth.format('YYYY-MM-DD') === this.props.checkOut)) {
        selected = styles.daySelected;
      }

      let currentDate = moment(startOfMonth).format('YYYY-MM-DD');

      dates.push(<div
        key={i}
        onClick={() => {
          let available = isAvailable;
          let date = currentDate;
          this.props.handleDateClick(available, date);
        }}
        className={`${styles.day} ${unavailable} ${selected}`}>
        <div className={styles.dayText} >
        {startOfMonth.format('DD')}
        </div>
        <div>{slash}</div>
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
      backButton = <div
        id="btn-previous-month"
        className={styles.btnChangeMonth}
        onClick={(e) => this.props.handleChangeMonth(e)}>
        <BsFillCaretLeftFill/>
        </div>
    } else {
      backButton = <div></div>
    }
    return(
      <div className={styles.calendarContainer}>

        <div className={styles.monthWrapper}>
         {backButton}
          <div>{this.props.selectedMonth.format('MMMM YYYY')}</div>
          <div id="btn-next-month" className={styles.btnChangeMonth} onClick={(e) => this.props.handleChangeMonth(e)}><BsFillCaretRightFill/></div>
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

        <div className={styles.dateWrapper} >{this.state.dates.map((date) => date)}</div>

      </div>
    )
  }
}