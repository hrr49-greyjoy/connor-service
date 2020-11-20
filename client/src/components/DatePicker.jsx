import React, { Component } from 'react';
import moment from 'moment';
import styles from './styles/datePicker.module.css';
import { isAvailableDate } from '../helpers/isAvailableDate.js';
import {FaSlash, FaAngleRight, FaAngleLeft} from 'react-icons/fa';

export class DatePicker extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dates: []
    }
    this.createDates = this.createDates.bind(this);
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
        slash = <FaSlash className={styles.slash} size={20}/>;
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
    this.props.changeDatePickerHeight();
    let dates = this.createDates(this.props.selectedMonth);
    setTimeout(() => this.setState({ dates }), 500);
  }

  componentWillUnmount() {
    this.props.changeDatePickerHeight();
  }

  componentDidUpdate() {
    let dates = this.createDates(this.props.selectedMonth);
    if (JSON.stringify(dates) !== JSON.stringify(this.state.dates) && this.state.dates.length) {
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
        <FaAngleLeft/>
        </div>
    } else {
      backButton = <div></div>
    }
    return(
      <div className={styles.calendarContainer}>

        <div className={styles.monthWrapper}>
         {backButton}
          <div>{this.props.selectedMonth.format('MMMM YYYY')}</div>
          <div id="btn-next-month" className={styles.btnChangeMonth} onClick={(e) => this.props.handleChangeMonth(e)}><FaAngleRight/></div>
        </div>

        <div className={styles.weekWrapper}>
          <div className={styles.weekDay}>S</div>
          <div className={styles.weekDay}>M</div>
          <div className={styles.weekDay}>T</div>
          <div className={styles.weekDay}>W</div>
          <div className={styles.weekDay}>T</div>
          <div className={styles.weekDay}>F</div>
          <div className={styles.weekDay}>S</div>
        </div>

        <div className={styles.dateWrapper} >{this.state.dates.map((date) => date)}</div>

      </div>
    )
  }
}