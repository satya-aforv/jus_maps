import React, { useEffect } from 'react';
import apiService from '../../utils/ApiService';
import { useDispatch } from 'react-redux';
import { addProfileData } from '../../redux/slices/authSlice';

const ProfilePage = () => {
  const [userData, setUserData] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const result = await apiService.get(
        'auth/profile',
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`
          }
        }
      );
      setProfile(result);
      dispatch(addProfileData(result));
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Handle error (show toast, etc.)
    }
  };
  useEffect(() => {
    const isUserExists = localStorage.getItem('user') || sessionStorage.getItem('user');
    const parsedUser = isUserExists ? JSON.parse(isUserExists) : null;
    // console.log(parsedUser?.user, 'profile');
    setUserData(parsedUser);
    fetchProfile();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}></div>

      <div style={styles.card}>
        <div style={styles.avatarWrapper}>
          <img src="https://i.pravatar.cc/150?img=32" alt="Profile" style={styles.avatar} />
        </div>

        {/* <div style={styles.stats}>
          <div style={styles.statBox}>
            <h4 style={styles.statNumber}>22</h4>
            <p style={styles.statLabel}>Friends</p>
          </div>
          <div style={styles.statBox}>
            <h4 style={styles.statNumber}>10</h4>
            <p style={styles.statLabel}>Photos</p>
          </div>
          <div style={styles.statBox}>
            <h4 style={styles.statNumber}>89</h4>
            <p style={styles.statLabel}>Comments</p>
          </div>
        </div> */}

        <h2 style={styles.name}>
          {userData?.user?.profile?.firstName + ' ' + userData?.user?.profile?.lastName || 'N/A'} <span style={styles.age}>, 27</span>
        </h2>
        <p style={styles.location}>Dept: {userData?.user?.profile?.department}</p>
        <p style={styles.role}>Emp ID: {userData?.user?.profile?.employeeId}</p>
        <p style={styles.university}>Role: {userData?.user?.role}</p>

        {/* <div style={styles.buttons}>
          <button style={styles.connectBtn}>CONNECT</button>
          <button style={styles.messageBtn}>MESSAGE</button>
        </div> */}
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: '#f8f9fa',
    minHeight: '100vh'
  },
  header: {
    background: 'linear-gradient(to right, #5e72e4, #825ee4)',
    height: '200px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px'
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 0 30px rgba(0,0,0,0.05)',
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '-100px auto 0',
    textAlign: 'center',
    position: 'relative'
  },
  avatarWrapper: {
    marginBottom: '20px'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    border: '4px solid #fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    objectFit: 'cover',
    marginTop: '-90px'
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px 0'
  },
  statBox: {
    textAlign: 'center'
  },
  statNumber: {
    margin: 0,
    fontSize: '18px',
    color: '#344767'
  },
  statLabel: {
    fontSize: '13px',
    color: '#8898aa',
    marginTop: '5px'
  },
  name: {
    margin: '10px 0 5px',
    color: '#32325d',
    fontSize: '24px'
  },
  age: {
    fontSize: '20px',
    color: '#525f7f'
  },
  location: {
    fontSize: '14px',
    color: '#8898aa'
  },
  role: {
    marginTop: '10px',
    fontWeight: '500',
    color: '#525f7f'
  },
  university: {
    color: '#8898aa',
    fontSize: '13px'
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px'
  },
  connectBtn: {
    background: '#11cdef',
    border: 'none',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  messageBtn: {
    background: '#172b4d',
    border: 'none',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  }
};

export default ProfilePage;
