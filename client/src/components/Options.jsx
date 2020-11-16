import React, {Component} from 'react';
import styles from './styles/options.module.css';

export class Options extends Component {

  constructor(props) {
    super(props)

  }


  render() {
    return(
    <div className={styles.optionsContainer}>

      <div id="checkIn" className={styles.checkDate} onClick={(e) => this.props.handleCheckInOutClick(e)}>
        <div>Check In</div>
        <div>{this.props.appState.checkIn}</div>
      </div>

      <div id="checkOut" className={styles.checkDate} onClick={(e) => this.props.handleCheckInOutClick(e)}>
        <div>Check Out</div>
        <div>{this.props.appState.checkOut}</div>
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