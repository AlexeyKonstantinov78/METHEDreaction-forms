import { useState } from 'react';
import _ from './Form.module.css';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDitry, setEmailDitry] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordDitryError, setPasswordDitryError] = useState(false);
  const [checkErrorForm, setCheckErrorForm] = useState(false);
  const [save, setSave] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [onErrBlur, setErrBlur] = useState(false);
  

  const validEmail = (value) => {
    setEmailError(/^.+@.+\..+$/.test(value));    
  };

  const validPassword = (value) => {
    setPasswordError(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/.test(value));
  };

  const handleEmail = ({ target }) => {
    setEmail(target.value);
    validEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
    validPassword(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!emailError || !passwordError) {
      console.log(event);
      setErrBlur(true);
      setCheckErrorForm(true);
      setEmailDitry(!validEmail(event.target[0].value));
      setPasswordDitryError(!validPassword(event.target[1].value));
      return;
    }

    setIsPending(true);
    console.log({
      email, 
      password, 
      save,
    });
  };

  const handleSave = ({target}) => {
    setSave(target.checked);
  };

  return (
    <form className={_.form} onSubmit={handleSubmit}>
      <div className={_.wrap}>
        <label className={_.label} htmlFor='email'>
          Email
        </label>
        <input
          className={_.input} 
          id='email' 
          name='email' 
          type='text'
          value={email}
          onChange={handleEmail}
          onBlur={() => {
              if (onErrBlur) {
                setEmailDitry(true);
              }
            }} 
          disabled={isPending}
            />
        {!emailError && emailDitry && <p className={_.error}>???? ???????????? email</p>}
      </div>
      <div className={_.wrap}>
        <label className={_.label} htmlFor='password'>
          ????????????
        </label>
        <input
          className={_.input}
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handlePassword}
          onBlur={() => {
            if (onErrBlur) {
              setPasswordDitryError(true);
            }
          }}
          disabled={isPending}
        />
        {!passwordError && passwordDitryError && <p className={_.error}>???????????????? ????????????</p>}
      </div>
      <div className={_.wrapCheckbox}>
        <input 
          className={_.checkbox} 
          id='save' 
          name='save' 
          type='checkbox' 
          onChange={handleSave}
          checked={save}
          />
        <label className={_.labelCheckbox} 
          htmlFor='save' >
          ?????????????????? ????????????
        </label>
      </div>

      {isPending ? (<p className={_.pending}>????????????????</p>) :
        (<button 
          className={_.submit} 
          type='submit'>
          ??????????
        </button>)        
      }
      {checkErrorForm && (!passwordError || !emailError) && (
        <p className={_.errorSubmit}>?????????????????? ???? ????????????</p>
      )}
    </form>
  );
};
