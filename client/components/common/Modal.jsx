import React from 'react';
import classNames from 'classnames';
import * as styles from '../../css/events.module.css';

const Modal = ({ hideModal, show, children }) => {
  const showHideClassName = show ? classNames('modal display-block', styles['edit-event-modal']) : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <button className={styles.close} onClick={hideModal}>&times;</button>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};
export default Modal;
