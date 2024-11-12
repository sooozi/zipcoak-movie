import { Outlet } from 'react-router';
import Header from './header';

const AppLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet />
        </div>
    );
};

export default AppLayout;
