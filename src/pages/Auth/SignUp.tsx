import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useSession } from '../../contexts/SessionContext';
import { SignUpFormType, SignUpValidationSchema } from '../../types/auth';
import { RoutesCompletePath } from '../../types/router';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    mode: 'onTouched',
    resolver: yupResolver(SignUpValidationSchema),
  });

  const onSubmit = (data: SignUpFormType) =>
    signUp(data.email, data.password)
      .then(() => {
        navigate('../verify');
      })
      .catch((err) => {
        console.log(err.code);
      });

  const onClick = () => {
    signInWithGoogle().then(() => navigate(RoutesCompletePath.PARTIES));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Inscription</h5>
      <div>
        <label htmlFor='username'>
          Nom d'utilisateur
          <input
            type='text'
            // eviter les spread dans les props, add eslint rules
            {...register('username')}
            placeholder="Nom d'utilisateur"
          />
          <p>{errors.username?.message}</p>
        </label>
      </div>
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
      <div>
        <label htmlFor='passwordConfirm'>
          Confirmation du mot de passe
          <input type='password' {...register('confirmPassword')} placeholder='R??p??ter' />
          <p>{errors.confirmPassword?.message}</p>
        </label>
      </div>
      <Button type='submit' label='Cr??er un compte' />
      <Button label='Connexion avec google' onClick={onClick} />
      <div>
        Vous poss??dez d??j?? un compte ? {}
        <Link to='/authentication/sign-in'>Connectez-vous</Link>
      </div>
    </form>
  );
};

export default SignUp;
