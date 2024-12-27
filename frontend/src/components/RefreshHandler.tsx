import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }: { setIsAuthenticated: any }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/dashboard') {
                navigate('/', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default RefreshHandler