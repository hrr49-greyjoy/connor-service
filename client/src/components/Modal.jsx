import React, { useState } from 'react';
import styles from './styles/modal.module.css';
import ReactDom from 'react-dom';
import { getDatesFromRange } from '../helpers/getDatesFromRange.js';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsX } from "react-icons/bs";

export const Modal = ({open, openCloseModal, nightlyRate, checkIn, checkOut, subTotal}) => {

  const [showDates, setShowDates] = useState(true);

  let nights = getDatesFromRange(checkIn, checkOut);
  let dates;
  if (showDates) {
    dates = <div>
      <div className={styles.separator}>
        <div className={`${styles.itemA} ${styles.infoText}`}>{`${nights.length} nights`}</div>
        <div className={`${styles.itemB} ${styles.infoText}`}>average per night</div>
      </div>
      <div>
      {nights.map((night, index) => (
        <div className={styles.separator} key={index}>
          <div className={`${styles.itemA} ${styles.infoText}`}>{night.format('MMMM Do YYYY')}</div>
          <div className={`${styles.itemB} ${styles.infoText}`}>{'$' + nightlyRate}</div>
        </div>
      ))}
      </div>
    </div>
  }

  if (!open) {return null}

  return ReactDom.createPortal(
    <>
      <div className={styles.overLay} id='overlayer'></div>
      <div className={styles.modal} id="subtotal-modal-content">

        <div className={styles.separator}>
          <div className={`${styles.itemA} ${styles.header}`}>Subtotal</div>
          <BsX size={30} onClick={openCloseModal} className={`${styles.itemB} ${styles.exitButton}`}/>
        </div>


          <div className={styles.middleContainer}>
            <div className={styles.separator}>
              <div className={`${styles.itemA} ${styles.subHeader}`}>Nightly Rate</div>
              <div className={`${styles.itemB} ${styles.infoText}`}>{`$ ${nightlyRate}.00`}</div>
            </div>
            {dates}
          </div>


        <div>
          <div className={styles.separator}>
            <div className={`${styles.itemA} ${styles.subHeader}`}>Subtotal</div>
            <div className={`${styles.itemB} ${styles.subHeader}`}>{`$ ${subTotal}.00`}</div>
          </div>
          <div className={styles.infoText}>Before any applicable taxes and service fees</div>
        </div>

      </div>
    </>,
    document.body
  )
}