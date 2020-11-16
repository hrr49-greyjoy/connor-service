import React, {Component} from 'react';
import styles from './styles/options.module.css';
import moment from 'moment';

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
        <div>Check In</div>
        <div>{moment(this.props.appState.checkIn).format('MMM D')}</div>
      </div>

      <div id="checkOut" className={`${styles.checkDate} ${conditionalClassCheckOut}`} onClick={(e) => this.props.handleCheckInOutClick(e)}>
        <div>Check Out</div>
        <div>{moment(this.props.appState.checkOut).format('MMM D')}</div>
      </div>

      <div className={styles.guests}>
        <div>Guests</div>

        <div className={styles.incrementCount}>
          <div onClick={(e) => this.props.handleGuestChange(e)}>-</div>
          <div>{this.props.appState.guests}</div>
          <div onClick={(e) => this.props.handleGuestChange(e)}>+</div>
        </div>

      </div>

    </div>
    )
  }
}