import { useState, useEffect } from 'react';
import api from '../utils/api';
import UserInfo from '../components/UserInfo';

const ShowUsers = () => {
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>

          {users && users.length > 0 ? (
        users.map(user => (
          <UserInfo 
            key={user._id} 
            firstname={user.firstname} 
            lastname={user.lastname} 
            username={user.username} 
            dateCreated={user.dateAdded} 
          />
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>No user found</p>
      )}
    </>
  );
};

export default ShowUsers;
