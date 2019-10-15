import Button from '../components/button.js';

function edit() {
  window.location = '#config';
}

function feed() {
  window.location = '#feed';
}

function Profile() {
  const template = `
    <section class="box-profile">
    <h1>foto</h1>
      <h3>Nome</h3>
      ${Button({ class: 'edit', title: 'Editar', onclick: edit })}
      ${Button({ class: 'voltar', title: 'Ir para o Feed', onclick: feed })}
      <p>BLa bla bla</p>
      </section>
      `;
  return template;
}  

export default Profile;