import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom'
import app from "./base";
import {NotificationManager} from 'react-notifications';
import { useForm } from 'react-hook-form';

const SignUp = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();

  const [signText, setsignText] = useState('Sign Up');

  const onSubmit = useCallback(async event => {
    setsignText('Processing...');
    const { email, password } = event;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
        setsignText('Sign Up');
        history.push("/");
    } catch (error) {
      NotificationManager.error(`${error.message}`);
      setsignText('Sign Up');
    }
  }, [history]);

  return (
    <div className="login-page">
      <div className="form">
        <h3>  Sign Up </h3>
        <form onSubmit={handleSubmit(onSubmit)} >
          <input name="name" type="text" placeholder="Full name"/>
          <input name="email" type="email" placeholder="Email address"  style={{border:!!errors.email ? 'solid 1px red' : null}} ref={register({required: true, pattern: /^\S+@\S+$/i})} />
          <input name="password" type="password" placeholder="Password" style={{border:!!errors.password ? 'solid 1px red' : null}}  ref={register({required: true})}/>
  <button type="submit">{signText}</button>
          <p className="message">Already registered? <Link to='/login'>Sign In</Link></p>
        </form>
      </div>
    </div>

  );
};

export default withRouter(SignUp);
