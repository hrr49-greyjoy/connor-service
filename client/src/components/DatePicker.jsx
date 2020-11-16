import React, { Component } from 'react';
import moment from 'moment';
import styles from './styles/datePicker.module.css';

export class DatePicker extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedMonth: moment(),
      dates: [],
      unavailableDates: null
    }
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
  }

  handleChangeMonth(event) {
    console.log(event.target);
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
      dates.push(<div key={i} className={styles.day}>{startOfMonth.format('DD')}</div>);
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
      <div>
      <div className="calendar-container">

        <section className={styles.monthWrapper}>
        <div id="btn-previous-month"  className={styles.btnChangeMonth} onClick={(e) => this.handleChangeMonth(e)}>{"<"}</div>
        <h2>{this.state.selectedMonth.format('MMMM YYYY')}</h2>
        <div id="btn-next-month" className={styles.btnChangeMonth} onClick={(e) => this.handleChangeMonth(e)}>{">"}</div>
        </section>

        <div className={styles.weekWrapper}>
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        <div className={styles.dateWrapper}>{this.state.dates.map((date) => date)}</div>

      </div>
      </div>
    )
  }
}