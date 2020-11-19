import React from 'react';
import {DatePicker} from './DatePicker.jsx';
import {Options} from './Options.jsx';
import styles from './styles/app.module.css';
import moment from 'moment';
import {isValidSubmission} from '../helpers/isValidSubmission.js';
import {getBadDates, getPricingByDates, getDailyPrice} from '../helpers/dataHandlers.js';

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showMainButton: true,
      showDatePicker: false,
      showBookButton: false,
      showSubTotal: false,
      checkIn: null,
      checkOut: null,
      guests: 3,
      currentPicker: null,
      unavailableDates: {},
      price_per_night: 'loading icon',
      subTotal: null,
      selectedMonth: moment(),
      now: moment(),
    };

    this.handleMainButtonClick = this.handleMainButtonClick.bind(this);
    this.removeInstantBookShowCalendar = this.removeInstantBookShowCalendar.bind(this);
    this.handleGuestChange = this.handleGuestChange.bind(this);
    this.handleCheckInOutClick = this.handleCheckInOutClick.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
  }

  componentDidMount() {
    getDailyPrice()
    .catch((err) => {
      if (err) throw err;
    })
    .then((results) => {
      this.setState({
        price_per_night: results.data.price_per_night
      })
    })
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

  removeBookRemoveSubTotal(callback) {
    this.setState( {
      showBookButton: false,
      showSubTotal: false
    }, callback());
  }

  removeCalendarShowMainBook() {
    this.setState( {
      showMainButton: true,
      showDatePicker: false,
      showBookButton: false,
      showSubTotal: false
    });
  }

  closeCalendarAddBook() {
    getPricingByDates(this.state.checkIn, this.state.checkOut, this.state.guests)
      .then((results) => {
        this.setState({
          subTotal: results.data.total_price,
          showDatePicker: false,
          showBookButton: true,
          showSubTotal: true
        })
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
    if (event.currentTarget.id === 'increment' && this.state.guests < 8) {
      let increment = this.state.guests + 1;
      this.setState({
        guests: increment
      }, () => {
        if (this.state.checkIn && this.state.checkOut) {
          getPricingByDates()
            .then((results) => {
              this.setState({
                price_per_night: results.data.price_per_night
              });
            });
        }
      });
    }
    if (event.currentTarget.id === 'decrement' && this.state.guests > 0) {
      let decrement = this.state.guests - 1;
      this.setState({
        guests: decrement
      }, () => {
        if (this.state.checkIn && this.state.checkOut) {
          getPricingByDates()
            .then((results) => {
              this.setState({
                price_per_night: results.data.price_per_night
              });
            });
        }
      });
    }
  }

  handleChangeMonth(event) {
    if (event.currentTarget.id === "btn-previous-month") {
      let previousMonth = moment(this.state.selectedMonth).subtract(1, 'months');
      this.setState({
        selectedMonth: previousMonth
      })
    }
    if (event.currentTarget.id === "btn-next-month") {
      let nextMonth = moment(this.state.selectedMonth).add(1, 'months');
      this.setState({
        selectedMonth: nextMonth
      })
    }
  }

  handleCheckInOutClick(event) {
    this.removeBookRemoveSubTotal(() => {

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

    });

  }

  handleDateClick(available, date) {

    if (!available) {
      return;
    }

    if (this.state.currentPicker === 'checkIn') {

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
        } else {
          this.setState({
            checkIn: null,
            checkOut: null,
            currentPicker: 'checkIn'
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
        } else {
          this.setState({
            checkIn: null,
            checkOut: null,
            currentPicker: 'checkIn'
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
    let subTotal;
    let container;

    if (this.state.showDatePicker) {
      datePicker = <DatePicker
      handleDateClick={this.handleDateClick}
      checkIn={this.state.checkIn}
      checkOut={this.state.checkOut}
      unavailableDates={this.state.unavailableDates}
      handleChangeMonth={this.handleChangeMonth}
      selectedMonth={this.state.selectedMonth}
      now={this.state.now}
      />;
    }

    if (this.state.showMainButton) {
      mainButton = <div className={styles.bookingButtonContainer}>
        <button onClick={this.handleMainButtonClick} className={styles.bookingButton}>Instant Book</button>
        </div>;
    }

    if (this.state.showBookButton) {
      bookButton = <div className={styles.bookingButtonContainer}>
        <button onClick={this.handleBookButtonClick} className={styles.bookingButton}>Book</button>
        </div>;
    }

    if (this.state.showSubTotal) {
      subTotal  = <div className={styles.subTotalContainer}>
        <div>Subtotal</div><div>{'$' + this.state.subTotal + '.00'}</div>
        </div>
    }

    if (mainButton) {
      container = styles.gridContainer;
    } else if(bookButton) {
      container = styles.gridContainerSubTotal;
    } else {
      container = styles.gridContainerNoButton;
    }



    return(
      <div className={styles.appContainer}>

        <div className={container}>

          <div className={styles.priceContainer}>
            <div className={styles.pricePerNight}>{`$ ${this.state.price_per_night}`}</div>
            <div className={styles.perNight}>per night</div>
          </div>
          <Options handleCheckInOutClick={this.handleCheckInOutClick} appState={this.state} handleGuestChange={this.handleGuestChange}/>
          {mainButton}{subTotal}{bookButton}

        </div>
        {datePicker}
      </div>
    )
  }
}





