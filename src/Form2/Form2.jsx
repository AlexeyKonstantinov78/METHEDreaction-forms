import { useState } from 'react';
import _ from './Form2.module.css';

export const Form2 = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDitry, setEmailDitry] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordDitryError, setPasswordDitryError] = useState(false);
  const [checkErrorForm, setCheckErrorForm] = useState(false);
  const [save, setSave] = useState(false);
  const [isPending, setIsPending] = useState(false);
  

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

    if(!emailError && !passwordError) {
      setCheckErrorForm(true);
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
            setEmailDitry(true);
            }} 
          disabled={isPending}
            />
        {!emailError && emailDitry && <p className={_.error}>Сообщение об ошибке</p>}
      </div>
      <div className={_.wrap}>
        <label className={_.label} htmlFor='password'>
          Пароль
        </label>
        <input
          className={_.input}
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handlePassword}
          onBlur={() => {
            setPasswordDitryError(true);
          }}
          disabled={isPending}
        />
        {!passwordError && passwordDitryError && <p className={_.error}>Сообщение об ошибке</p>}
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
          Сохранить пароль
        </label>
      </div>

      {isPending ? (<p className={_.pending}>Отправка</p>) :
        (<button 
          className={_.submit} 
          type='submit'>
          Войти
        </button>)        
      }
      {checkErrorForm && (!passwordError || !emailError) && (
        <p className={_.errorSubmit}>Сообщение об ошибке</p>
      )}
    </form>
  );
};
