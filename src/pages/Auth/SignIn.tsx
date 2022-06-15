import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useSession } from '../../contexts/SessionContext';
import { SignInFormType, SignInValidationSchema } from '../../types/auth';
import { RoutesCompletePath } from '../../types/router';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({
    mode: 'onTouched',
    resolver: yupResolver(SignInValidationSchema),
  });

  const onSubmit = (data: SignInFormType) =>
    signIn(data.email, data.password)
      .then(() => {
        navigate(RoutesCompletePath.PARTIES);
      })
      .catch((err) => {
        console.log(err);
      });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Inscription</h5>
      <div>
        <label htmlFor='email'>
          Email
          <input type='email' {...register('email')} placeholder='Email' />
          <p>{errors.email?.message}</p>
        </label>
      </div>
      <div>
        <label htmlFor='password'>
          Mot de passe
          <input type='password' {...register('password')} placeholder='Mot de passe' />
          <p>{errors.password?.message}</p>
        </label>
      </div>
      <Button type='submit' label='Connexion' />
      <div>
        Vous n'avez pas encore de compte? {}
        <Link to='/auth/sign-up'>Créer en un</Link>
      </div>
    </form>
  );
};

export default SignIn;
