import React from 'react';
import {DatePicker} from './DatePicker.jsx';
import {Options} from './Options.jsx';
import styles from './styles/app.module.css';
import moment from 'moment';
import {isValidSubmission} from '../helpers/isValidSubmission.js';
import {getBadDates} from '../helpers/dataHandlers.js';

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showMainButton: true,
      showDatePicker: false,
      showBookButton: false,
      checkIn: null,
      checkOut: null,
      guests: 3,
      currentPicker: null,
      unavailableDates: {}
    };

    this.handleMainButtonClick = this.handleMainButtonClick.bind(this);
    this.removeInstantBookShowCalendar = this.removeInstantBookShowCalendar.bind(this);
    this.handleGuestChange = this.handleGuestChange.bind(this);
    this.handleCheckInOutClick = this.handleCheckInOutClick.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  componentDidMount() {
    getBadDates()
    .catch((err) => {
      if (err) throw err;
    })
    .then((results) => {
      this.setState({
        unavailableDates: results.data
      });
    })
  }

  removeInstantBookShowCalendar() {
    this.setState({
      showMainButton: false,
      showDatePicker: true
    })
  }

  closeCalendarAddBook() {
    console.log('called closeCalendarAddBook');
    this.setState({
      showDatePicker: false,
      showBookButton: true
    })
  }

  handleMainButtonClick() {
    this.removeInstantBookShowCalendar();
    this.setState({
      currentPicker: 'checkIn'
    });
  }

  handleBookButtonClick() {
    console.log('booked');
  }

  handleGuestChange(event) {

    if (event.target.innerText === '+' && this.state.guests < 8) {
      let increment = this.state.guests + 1;
      this.setState({
        guests: increment
      })
    }
    if (event.target.innerText === '-' && this.state.guests > 0) {
      let decrement = this.state.guests - 1;
      this.setState({
        guests: decrement
      })
    }
  }

  handleCheckInOutClick(event) {

    if (event.currentTarget.id === "checkIn" || (event.currentTarget.id === "checkOut" && !this.state.currentPicker)) {
      this.setState({
        currentPicker: 'checkIn'
      }, () => {
        this.removeInstantBookShowCalendar();
      })

    }
    if (event.currentTarget.id === "checkOut" && this.state.currentPicker) {
      this.setState({
        currentPicker: 'checkOut'
      }, () => {
        this.removeInstantBookShowCalendar();
      })
    }
  }

  handleDateClick(event) {
    let date = event.target.dataset.date;
    if (!JSON.parse(event.target.dataset.available)) {
      return;
    }
    if (this.state.currentPicker === 'checkIn') {

      //if checkout is null
      //  set checkin to date
      //  set picker to checkout

      //if checkout is after date
      //  set checkin to date
      //  set currentPicker to null
      //  call closeCalendarAddBook

      //if checkout is before or on date
      //  set checkin and checkout to null,
      //  set picker to checkIn
      if (!this.state.checkOut) {
        this.setState({
          checkIn: date,
          currentPicker: 'checkOut'
        })
      } else if(moment(this.state.checkOut).isAfter(moment(date))) {
        //first check if submission is valid
        if (isValidSubmission(date, this.state.checkOut, this.state.unavailableDates)) {

          this.setState({
            checkIn: date,
            currentPicker: null
          }, () => {
             this.closeCalendarAddBook();
          });
        }

      } else if(moment(this.state.checkOut).isSameOrBefore(moment(date))) {
        this.setState({
          checkIn: null,
          checkOut: null,
          currentPicker: 'checkIn'
        });
      }
    }
    if (this.state.currentPicker === 'checkOut') {

      //if checkin is null
      //  set checkout to date
      //  set picker to checkin

      //if checkin is before date
      //  set checkout to date
      //  set currentPicker to null
      //  call closeCalendarAddBook

      //if checkin is after or on date
      //  set checkin and checkout to null
      //  set picker to checkin

      if (!this.state.checkIn) {
        this.setState({
          checkOut: date,
          currentPicker: 'checkIn'
        })
      } else if(moment(this.state.checkIn).isBefore(moment(date))) {
        if (isValidSubmission(this.state.checkIn, date, this.state.unavailableDates)) {

          this.setState({
            checkOut: date,
            currentPicker: null
          }, () => {
            this.closeCalendarAddBook();
          });
        }
      } else if(moment(this.state.checkIn).isSameOrAfter(moment(date))) {
        this.setState({
          checkIn: null,
          checkOut: null,
          currentPicker: 'checkIn'
        });
      }
    }
  }

  render() {
    let mainButton;
    let datePicker;
    let bookButton;

    if (this.state.showDatePicker) {
      datePicker = <DatePicker
      handleDateClick={this.handleDateClick}
      checkIn={this.state.checkIn}
      checkOut={this.state.checkOut}
      unavailableDates={this.state.unavailableDates}
      />;
    }

    if (this.state.showMainButton) {
      mainButton = <div className={styles.bookingButtonContainer}><button onClick={this.handleMainButtonClick}>Instant Book</button></div>
    }

    if (this.state.showBookButton) {
      bookButton = <div className={styles.bookingButtonContainer}><button onClick={this.handleBookButtonClick}>Book</button></div>
    }

    return(
      <div className={styles.appContainer}>

        <div className={(mainButton || bookButton) ? styles.gridContainer : styles.gridContainerNoButton}>

          <div className={styles.priceContainer}>
            <div>$20</div>
            <div>per night</div>
          </div>
          <Options handleCheckInOutClick={this.handleCheckInOutClick} appState={this.state} handleGuestChange={this.handleGuestChange}/>
          {mainButton}{bookButton}

        </div>
        {datePicker}
      </div>
    )
  }
}





