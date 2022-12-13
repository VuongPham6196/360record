import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { IFormInputs } from '../../constants/interface';
import styles from './LoginForm.module.scss';

import { getAuth } from '../../redux/auth/actions';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

const LoginForm: React.FC = (props): JSX.Element => {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const isLogged = useSelector((state: any) => state.auth.loginStatus);
  const isLoading = useSelector((state: any) => state.auth.loading);

  console.log(isLogged);

  //Validate schema declare
  const schema = yup
    .object({
      email: yup.string().email().required('Please fill in your email address'),
      password: yup.string().required('Please fill in your password').min(8),
    })
    .required();

  //Call useForm hook
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<IFormInputs>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  //continurHandle
  const handleContinue = () => {
    const emailValue = getValues().email;
    if (!!emailValue && !errors.email) {
      setShowLogin(true);
    }
  };

  //Submit event
  const onValidSubmit = (data: IFormInputs) => {
    dispatch(getAuth(data));
  };

  const onInvalidSubmit = () => {
    alert('Validation failed!');
  };

  //Input validate state
  const emailStateClasses =
    touchedFields.email === undefined
      ? ''
      : !!errors.email && !!touchedFields.email
      ? styles.warning
      : styles.valid;
  const passwordState =
    touchedFields.password === undefined
      ? ''
      : !!errors.password && !!touchedFields.password
      ? styles.warning
      : styles.valid;

  return (
    <div className={styles['form-wrapper']}>
      <div className={styles['login-header']}>
        <p className={styles.title}>LOGIN TO</p>
        <img
          src="https://dashboard.record360.com/1e6bc8243c036829e11d147abf3d077d.png"
          alt=""
        />
      </div>

      <form
        className={styles['form-container']}
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      >
        <div className={styles['form-input']}>
          <label className={emailStateClasses} htmlFor="email">
            Email address
          </label>
          <div className={styles['input-group']}>
            <input id="email" {...register('email')} autoFocus />
            <i className={`fa-solid fa-check ${emailStateClasses}`}></i>
            <p className={styles.warning}>*{errors.email?.message}</p>
          </div>
        </div>

        {showLogin && (
          <>
            <div className={styles['form-input']}>
              <label className={passwordState} htmlFor="password">
                Password
              </label>
              <div className={styles['input-group']}>
                <input id="password" {...register('password')} />
                <i className={`fa-solid  fa-check ${passwordState}`}></i>
                <p className={styles.warning}>*{errors.password?.message}</p>
              </div>
            </div>
            <button
              className={
                isLoading
                  ? `${styles['button-submit']} ${styles['submitting']}`
                  : styles['button-submit']
              }
            >
              {isLoading && <LoadingSpinner />}
              <span>SIGN IN</span>
            </button>
          </>
        )}

        {!showLogin && (
          <button
            className={styles['button-submit']}
            type="button"
            onClick={handleContinue}
          >
            CONTINUE
          </button>
        )}
      </form>
      <Link to="/forgot-password">Forgot password?</Link>
    </div>
  );
};

export default LoginForm;
