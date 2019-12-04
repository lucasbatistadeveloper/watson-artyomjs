const textInput = document.getElementById('textInput');
const chat = document.getElementById('chat');

let context = {};
var test = "";

function textVoz(text, isFinal) {
  if(isFinal){
    getWatsonMessageAndInsertTemplate(text);
    const template = templateChatMessage(text, 'user');
    InsertTemplateInTheChat(template);
    text = '';
  }else {
    console.log(text);
  }
}

const templateChatMessage = (message, from) =>
  `<div class="from-${from}">
    <div class="message-inner">
      <p>${message}</p>
    </div>
  </div>
  `;

const InsertTemplateInTheChat = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;

  chat.appendChild(div);
};

const getWatsonMessageAndInsertTemplate = async (text = '') => {
  const uri = 'http://localhost:3000/conversation/';

  const response = await (await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      context,
    }),
  })).json();

  context = response.context;
  artyom.say(JSON.stringify(response.output.text));
  const template = templateChatMessage(response.output.text, 'watson');
  
  InsertTemplateInTheChat(template);
};

getWatsonMessageAndInsertTemplate();