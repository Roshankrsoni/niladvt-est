import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import {Link} from 'react-router-dom';
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import {NotificationManager} from 'react-notifications';
import { useForm } from 'react-hook-form';

const Login = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();

  const [loginAtt, setLoginAtt] = useState(3);
  const [loginErr, setLoginErr] = useState(false);
  const [loginText, setLoginText] = useState('Log In');

  const onSubmit = useCallback(
    async data => {
      setLoginText('Processing...');
      const { email, password } = data;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email, password);
          setLoginText('Log In');
          history.push("/");
      } catch (error) {
        // alert(error);
        console.log(error);
        NotificationManager.error(`${error.message}`);
        setLoginErr(true);
        setLoginAtt(loginAtt-1);
        setLoginText('Log In');
      }
    },
    [history, loginAtt]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page">
      <div className="form">
      <h3>  Sign In </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
          <input name="email" type="email" placeholder="Email address" style={{border:!!errors.email ? 'solid 1px red' : null}} ref={register({required: true, pattern: /^\S+@\S+$/i})} />
          <input name="password" type="password" placeholder="Password" style={{border:!!errors.password ? 'solid 1px red' : null}}  ref={register({required: true})} />
       <button type="submit" disabled={loginAtt <= 0 ? true : false}>{loginText}</button>
          <p className="message">Not registered? <Link to='signup'>Sign Up</Link></p>
          {loginErr &&
          <div className='attempts'>
          <small> You have {loginAtt} Attempts Left </small>
          </div> }
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
