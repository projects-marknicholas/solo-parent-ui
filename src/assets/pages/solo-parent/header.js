import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from './session';
import Notification from '../../img/bell.svg';

function SoloParentHeader() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { session } = useSession();

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <div className='admin-header'>
      <button className='notif-button' onClick={toggleNotification}>
        <img src={Notification} alt='notification'/>
        {isNotificationOpen && (
          <div className='notification-list'>
            <div className='notification-head'>
              <h4>Notifications</h4>
            </div>
            <Link to='' className='notification-item'>
              <h4>This is a notification</h4>
              <p>This is a details for the notification</p>
            </Link>
            <Link to='' className='notification-item'>
              <h4>This is a notification</h4>
              <p>This is a details for the notification</p>
            </Link>
          </div>
        )}
      </button>
      <button className='button'>{session.name}</button>
    </div>
  );
}

export default SoloParentHeader;
