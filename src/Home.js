import React, {useContext } from "react";
import app from "./base";
import { AuthContext } from "./Auth.js";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  
  return (
    <>
    <div className="login-page" style={{width:'100%'}}>
      <div className="form" style={{maxWidth: '40%'}}>
        <img src='https://pngriver.com/wp-content/uploads/2018/03/Download-Welcome-PNG-HD-469-1000x278.png' alt='welcome' style={{width:'100%'}}/>
      <p>Hi  <b>{currentUser.email}</b></p><br />
      <button onClick={() => app.auth().signOut()}>Sign out</button>
      </div>
      </div>
    </>
  );
};

export default Home;
