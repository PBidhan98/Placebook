// Stateful Component as it will fetch data from backend

// even when we are not logged In we can see a list of users and no. of places they shared
import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    // dummy array
    const USERS = [
        {
            id: 'u1',
            name: 'Preeti Bidhan',
            image: 'https://i.pinimg.com/originals/3a/74/5d/3a745d3dcba72feb73e44e399ec97bea.jpg',
            places: 3
        },
        {
            id: 'u2',
            name: 'Pratik Bidhan',
            image: 'https://i.pinimg.com/originals/6b/e2/61/6be2616cc58da2ceb9d87eece0390ae1.jpg',
            places: 6
        }
    ];
    return <UsersList items={USERS} />
};

export default Users;