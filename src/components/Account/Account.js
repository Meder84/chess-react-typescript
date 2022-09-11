import React from 'react';
import './Account.css';

function Account({customSubtitleAccount}) {
  return (
    <div className="account opacity">
     <h3 className={`
        subtitle-account
        ${customSubtitleAccount}
      `}
     >
      Аккаунт
     </h3>
     <div className='icon-account'></div>
    </div>
  );
}

export default Account;
