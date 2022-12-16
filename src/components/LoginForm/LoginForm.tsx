import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const isLoading = useSelector((state: any) => state.auth.loading);
  const errorMsg = useSelector((state: any) => state.auth.errorMsg);

  //Validate schema declare
  const schema = yup
    .object({
      email: yup.string().email().required('Please fill in your email address'),
      password: yup.string().required('Please fill in your password'),
    })
    .required();

  //Call useForm hook
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors, touchedFields },
  } = useForm<IFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  //continurHandle
  const handleContinue = () => {
    if (!getFieldState('email').invalid) {
      setShowLogin(true);
    }
  };

  //Submit event
  const onValidSubmit = async (data: IFormInputs) => {
    dispatch(getAuth(data));
  };

  const onInvalidSubmit = () => {
    // alert('Validation failed!');
  };

  //Input validate state
  const emailStateClasses =
    touchedFields.email === undefined
      ? ''
      : !!errors.email && !!touchedFields.email
      ? styles.warning
      : styles.valid;

  const passwordStateClasses = !!errors.password ? styles.warning : '';

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
        {/* EMAIL input */}
        <div className={styles['form-input']}>
          <label className={emailStateClasses} htmlFor="email">
            Email address
          </label>
          <div className={styles['input-group']}>
            <input id="email" {...register('email')} autoFocus />
            {!errors.email && touchedFields.email && (
              <i className={`fa-solid fa-check ${styles.valid}`}></i>
            )}
            {errors.email && (
              <p className={styles.warning}>*{errors.email?.message}</p>
            )}
          </div>
        </div>

        {showLogin && (
          <>
            {/* PASSWORD input */}
            <div className={styles['form-input']}>
              <label className={passwordStateClasses} htmlFor="password">
                Password
              </label>
              <div className={styles['input-group']}>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                />
                {errors.password && (
                  <p className={styles.warning}>*{errors.password?.message}</p>
                )}
              </div>
            </div>

            {/* REMEMBER input */}
            <div className={styles['remember-group']}>
              <input id="remember" type="checkbox" {...register('remember')} />

              <label htmlFor="password">Remember me</label>
            </div>

            {/* LOGIN button */}
            <button
              className={
                isLoading
                  ? `${styles['button-group']} ${styles['submitting']}`
                  : styles['button-group']
              }
            >
              {isLoading && <LoadingSpinner />}
              <span>SIGN IN</span>
              {errorMsg && <p className={styles.warning}>{errorMsg}</p>}
            </button>
          </>
        )}

        {/* CONTINUE button */}
        {!showLogin && (
          <button
            className={styles['button-group']}
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
