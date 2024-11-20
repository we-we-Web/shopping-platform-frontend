import { useState } from 'react';
import LoginButton from './LoginButton';
import LoginPopup from './LoginPopup';
import CartButton from './CartButton';

const NavigationBar = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px', 
        backgroundColor: '#fff',
        borderBottom: '1px solid #eaeaea',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1000,
        height: '80px', 
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        <a href="/" style={{ fontSize: '24px' }}>東毅中</a>
      </div>
        <LoginButton onOpen={() => setLoginOpen(true)} />
        {isLoginOpen && <LoginPopup onClose={() => setLoginOpen(false)} />}
        
        <CartButton />
    </nav>
  );
};

export default NavigationBar;
