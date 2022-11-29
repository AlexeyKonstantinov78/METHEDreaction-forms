import _ from './Form2.module.css';
import { useForm } from 'react-hook-form';

export const Form2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    
  };

  return (
    <form className={_.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={_.wrap}>
        <label className={_.label} htmlFor='email'>
          Email
        </label>
        <input 
          className={_.input} 
          id='email'           
          type='text'
          {...register('email', { 
              required: {
                  value: true,
                  message: 'введите email',
              },
              pattern: {
                value: /^.+@.+\..+$/,
                message: 'введите правильный email'
              }
            })}
          aria-invalid={!!errors.email}
          />
        {errors.email && <p className={_.error}>{errors.email.message}</p>}
      </div>
      <div className={_.wrap}>
        <label className={_.label} htmlFor='password'>
          Пароль
        </label>
        <input
          className={_.input}
          id='password'          
          type='password'
          {...register('password')}
        />
        <p className={_.error}>Сообщение об ошибке</p>
      </div>
      <div className={_.wrapCheckbox}>
        <input className={_.checkbox} 
          id='save'           
          type='checkbox' 
          {...register('save')}
          />
        <label className={_.labelCheckbox} htmlFor='save'>
          Сохранить пароль
        </label>
      </div>
      <button className={_.submit} type='submit'>
        Войти
      </button>
    </form>
  );
};
