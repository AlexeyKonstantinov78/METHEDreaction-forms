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
          {...register('password', {
            required: {
              value: true,
              message: 'введите пароль'
            },
            pattern:{
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
              message: 'введите пароль (6 символов, строчная и прописаная буква, цифра и спецсимвол)'
            }
          })}
          aria-invalid={!!errors.password}
        />
        {errors.password && <p className={_.error}>{errors.password.message}</p>}
      </div>
      <div className={_.wrapCheckbox}>
        <input className={_.checkbox} 
          id='save2'           
          type='checkbox' 
          {...register('save2')}
          />
        <label className={_.labelCheckbox} htmlFor='save2'>
          Сохранить пароль
        </label>
      </div>
      <button className={_.submit} type='submit'>
        Войти
      </button>
    </form>
  );
};
