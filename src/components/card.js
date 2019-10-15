import RoundButton from './round-button.js';

function Card(props) {
  const template = `
  <li>
    <div id="post">  
      ${props.post} 
    </div>
    <div id="buttons">
      ${RoundButton({ icone: '', class: 'like', title: 'heart', onclick: like })}
    </div>
  </li>
  `;

  return template;
}
;

export default Card;