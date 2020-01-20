const erro = (error) => {
  const errorCode = error.code;
  const errorMessage = document.querySelector('.error');
  if (errorCode === 'auth/weak-password') errorMessage.textContent = 'A senha deve possuir no mínimo 6 caracteres';
  if (errorCode === 'auth/email-already-in-use') errorMessage.textContent = 'O e-mail informado já está em uso';
  if (errorCode === 'auth/operation-not-allowed') errorMessage.textContent = 'Conta não ativada';
  if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
  if (errorCode === 'auth/user-disabled') errorMessage.textContent = 'Usuário desabilitado';
  if (errorCode === 'auth/user-not-found') errorMessage.textContent = 'Usuário não encontrado';
  if (errorCode === 'auth/wrong-password') errorMessage.textContent = 'Senha incorreta';
};

window.erro = erro;

export default erro;
