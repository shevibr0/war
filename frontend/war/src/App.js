import './App.css';
// import { setConnectedUser } from './features/userSlice';
import { AppRouter } from './routes/AppRouter';
import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { FetchDataFromApiAsync } from './utils/SoldierUtil';

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   console.log("storedUser", storedUser)
  //   if (storedUser) {
  //     const userData = JSON.parse(storedUser);
  //     dispatch(setConnectedUser(userData)); // שחזור המצב של המשתמש ל-Redux store
  //   }
  // }, []);

  // useEffect(() => {
  //   const TimeOutFetchSoldierApi = () => {
  //     setTimeOut(() => {
  //       FetchDataFromApiAsync().then(res => {
  //         if (res.data) {
  //           alert("בוצע בהצלחה שליפת נתונים ועדכון")
  //         }
  //       })
  //     }, 50000);
  //   }

  //   TimeOutFetchSoldierApi();

  // }, []);
  return (
    <AppRouter />
  );
}

export default App;
