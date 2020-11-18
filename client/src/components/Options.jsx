import React, {Component} from 'react';
import styles from './styles/options.module.css';
import moment from 'moment';
import {FaPlus, FaMinus} from 'react-icons/fa';

export class Options extends Component {

  constructor(props) {
    super(props)

  }


  render() {
    let conditionalClassCheckIn;
    let conditionalClassCheckOut;
    if (this.props.appState.currentPicker === 'checkIn') {
      conditionalClassCheckIn = styles.checkDateSelected;
    }
    if (this.props.appState.currentPicker === 'checkOut') {
      conditionalClassCheckOut = styles.checkDateSelected;
    }


    return(
    <div className={styles.optionsContainer}>

      <div id="checkIn" className={`${styles.checkDate} ${conditionalClassCheckIn}`}
      onClick={(e) => this.props.handleCheckInOutClick(e)}>
        <div className={styles.check1}>Check In</div>
        <div className={styles.check2}>{this.props.appState.checkIn === null ? 'Select date' : moment(this.props.appState.checkIn).format('MMM D')}</div>
      </div>

      <div id="checkOut" className={`${styles.checkDate} ${conditionalClassCheckOut}`} onClick={(e) => this.props.handleCheckInOutClick(e)}>
        <div className={styles.check1}>Check Out</div>
        <div className={styles.check2}>{this.props.appState.checkOut === null ? 'Select date' : moment(this.props.appState.checkOut).format('MMM D')}</div>
      </div>

      <div className={styles.guests}>
        <div className={styles.check1}>Guests</div>

        <div className={styles.incrementCount}>
          <div id="decrement" onClick={(e) => this.props.handleGuestChange(e)}><FaMinus size={10}/></div>
          <div>{this.props.appState.guests}</div>
          <div id="increment" onClick={(e) => this.props.handleGuestChange(e)}><FaPlus size={10} /></div>
        </div>

      </div>

    </div>
    )
  }
}