import { Outlet, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../service/auth.service';
import { useEffect } from 'react';

const PrivateOutlet = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const localAuth = getUserInfo();
    if (!localAuth) {navigate('/login', {replace: true})}
  }, [navigate])

  return <Outlet />
};

export default PrivateOutlet;