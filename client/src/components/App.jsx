import React from 'react';
import {DatePicker} from './DatePicker.jsx';
import {Options} from './Options.jsx';
import styles from './styles/app.module.css';

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showMainButton: true,
      showDatePicker: false,
      checkIn: "Nov 12",
      checkOut: "Nov 13",
      guests: 3,
      currentPicker: null,
    };

    this.handleMainButtonClick = this.handleMainButtonClick.bind(this);
    this.removeInstantBookShowCalendar = this.removeInstantBookShowCalendar.bind(this);
    this.handleGuestChange = this.handleGuestChange.bind(this);
    this.handleCheckInOutClick = this.handleCheckInOutClick.bind(this);
  }

  removeInstantBookShowCalendar() {
    this.setState({
      showMainButton: false,
      showDatePicker: true
    })
  }

  handleMainButtonClick() {
    this.removeInstantBookShowCalendar();
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
        console.log(this.state.currentPicker);
        this.removeInstantBookShowCalendar();
      })

    }
    if (event.currentTarget.id === "checkOut" && this.state.currentPicker) {
      this.setState({
        currentPicker: 'checkOut'
      }, () => {
        console.log(this.state.currentPicker);
        this.removeInstantBookShowCalendar();
      })
    }

  }

  render() {
    let mainButton;
    let datePicker;

    if (this.state.showDatePicker) {
      datePicker = <DatePicker/>;
    }

    if (this.state.showMainButton) {
      mainButton = <button onClick={this.handleMainButtonClick}>Instant Book</button>
    }

    return(
      <div className={styles.appContainer}>

        <div className={styles.gridContainer}>
          <div className={styles.priceContainer}>
            <div>$20</div>
            <div>per night</div>
          </div>
          <Options handleCheckInOutClick={this.handleCheckInOutClick} appState={this.state} handleGuestChange={this.handleGuestChange}/>
          {mainButton}

        </div>
        {datePicker}
      </div>
    )
  }
}





