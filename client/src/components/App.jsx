import React from 'react';
import {DatePicker} from './DatePicker.jsx';
import styles from './styles/app.module.css';

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showMainButton: true,
      showDatePicker: false
    };

    this.handleMainButtonClick = this.handleMainButtonClick.bind(this);
  }

  handleMainButtonClick() {
    this.setState({
      showMainButton: !this.state.showMainButton,
      showDatePicker: !this.state.showDatePicker
    })
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

      {mainButton}{datePicker}
      </div>
    )
  }
}





