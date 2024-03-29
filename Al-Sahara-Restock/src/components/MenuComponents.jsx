import UserList from "../components/UserList";
import RestockList from "../components/RestockList";
import OrderedList from "../components/OrderedList";

const menuComponents = (role) => {
    return [
        {
            title: 'UserList',
            component: <UserList />
        },
        {
            title: 'RestockList',
            component: <RestockList role={role}/>
            
        },
        {
            title: 'OrderedList',
            component: <OrderedList role={role}/>
        },
    ];
};

export {menuComponents}