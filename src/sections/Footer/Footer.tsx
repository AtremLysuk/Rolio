

import type React from 'react';
import './_footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer__container container'>
        <div className='footer__inner'>
          <div className='footer__logo'></div>
          <nav className='footer__menu'></nav>
          <ul className='footer__socia1s'></ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer