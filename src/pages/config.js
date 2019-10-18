import Input from '../components/input.js';
import Button from '../components/button.js';

function save() {
// função para atualizar os dados no firebase
  window.location = '#feed';
}

function cancel() {
  window.location = '#profile';
}

function Config() {
  const template = `
  <section class="box-config">
    <h1>Editar Dados</h1>
    <form>
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'nome' })}<br>
      ${Input({ type: 'text', class: 'js-text2-input', placeholder: 'sobrenome' })}<br>
      ${Input({ type: 'text', class: 'js-bio-input', placeholder: 'bio' })}<br>
      ${Input({ type: 'date', class: 'js-date-input' })}<br>
      <select class='js-status-input'>
        <option value=solteiro>Solteiro(a)</option>
        <option value=namorando>Namorando</option> 
        <option value=casado>Casado(a)</option>";
      </select>
      ${Button({ class: 'cancel', title: 'Cancelar', onclick: cancel })}<br>
      ${Button({ class: 'update', title: 'Salvar', onclick: save })}<br>
    </form>
    </section>
  `;
  return template;
}

export default Config;
