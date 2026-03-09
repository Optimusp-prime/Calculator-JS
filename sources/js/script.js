let button = document.getElementById('operate');
let displayResult = document.getElementById('resultDisplay');
let champ = document.getElementById('champ');
const btns = document.querySelectorAll('.calc-btn');
let clearBtn = document.getElementById('clear-btn');
const historyBtn = document.getElementById('history-btn');
const historyList = document.getElementById('history-list');
const historyContainer = document.getElementById('history-container');
const historyCloseBtn = document.getElementById('history-close-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');


const themeToggle = document.getElementById('theme-toggle');

// Initialize theme
const initTheme = () => {
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
initTheme();

themeToggle.addEventListener('click', () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
});

const allButton = {};


const hoverClasses = ['scale-95', 'shadow-inner', 'bg-white/40', 'dark:bg-black/20', 'shadow-sm'];

const allowed = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '+', '-', '*', '/', '(', ')', '.', ' ',

]

champ.focus();


class CalcHistory {
  static STORAGE_KEY = 'calcHistory';

  static getHistory() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (err) {
      console.error('Erreur de parsing du history:', err);
      // en cas de données corrompues, on remet à zéro
      this.clearHistory();
      return [];
    }
  }

  static addOperation(expression, result) {
    const history = this.getHistory();
    const op = {
      expression,
      result,
      timestamp: new Date().toISOString()
    };
    history.push(op);
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (err) {
      console.error('Impossible de sauvegarder l’historique:', err);
    }
  }
  static clearHistory() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

const History = CalcHistory;



for (let i = 0; i < btns.length; i++) {
  const btn = btns[i];
  const value = btn.dataset.value;
  if (allowed.includes(value)) allButton[value] = btn;
}

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const char = btn.dataset.value;
    champ.value += char
    champ.focus();
  });
});

champ.addEventListener('input', e => {
  const v = e.target.value;
  const filtered = [...v].filter(ch => allowed.includes(ch)).join('');
  if (filtered !== v) {
    e.target.value = filtered;
  }
});

champ.addEventListener('keydown', e => {
  const ctrlKeys = ['Backspace', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  if (e.key === 'Enter') {
    e.preventDefault();
    button.click();
  }
  if (allButton.hasOwnProperty(e.key)) {
    const btn = allButton[e.key];
    btn.classList.add(...hoverClasses);
    setTimeout(() => {
      btn.classList.remove(...hoverClasses);
    }, 200);
  }
  if (ctrlKeys.includes(e.key)) return;
  if (!allowed.includes(e.key)) {
    e.preventDefault();
  }
});

clearBtn.addEventListener('click', () => {
  champ.value = '';
  displayResult.value = '0';
});

function addOperationToDisplay(op) {
  const li = document.createElement('li');
  const spanTime = document.createElement('span');
  const divResult = document.createElement('div');
  const spanExpression = document.createElement('span');
  const spanResult = document.createElement('span');


  spanResult.className = 'font-semibold text-2xl dark:text-white';
  li.className = 'flex flex-col text-gray-600 dark:text-gray-300';
  spanExpression.className = 'font-medium text-2xl dark:text-gray-200';
  divResult.className = 'flex justify-between ml-2 bg-blue-300/20 dark:bg-blue-900/20 backdrop-blur-sm rounded-lg p-2';
  spanTime.className = 'text-gray-400 text-md self-start mb-1';

  const date = new Date(op.timestamp);
  const formattedDate = date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  spanTime.innerText = formattedDate;
  spanExpression.innerText = op.expression;
  spanResult.innerText = op.result;

  li.appendChild(spanTime);
  divResult.appendChild(spanExpression);
  divResult.appendChild(spanResult);
  li.appendChild(divResult);

  historyList.insertBefore(li, historyList.firstChild);
}


historyList.innerHTML = '';
History.getHistory().reverse().forEach(op => {
  addOperationToDisplay(op);
});

button.addEventListener('click', () => {
  let champContain = champ.value.trim();
  //Verifier si le champ est vide
  if (champContain === '') {
    displayResult.value = '0';
    return;
  }
  try {
    // Check if the input contains only allowed characters
    for (let i = 0; i < champContain.length; i++) {
      if (!allowed.includes(champContain[i])) {
        return;
      }
    }
    let result = eval(champContain);
    if (typeof result === 'number' && !Number.isInteger(result)) {
      result = parseFloat(result.toFixed(2));
    }
    displayResult.value = "=" + result;
    History.addOperation(champContain, result);
    addOperationToDisplay({
      expression: champContain,
      result: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.log("Il y a une erreur dans l'expression");
    displayResult.value = 'Erreur';
  }
});

historyBtn.addEventListener('click', () => {
  historyContainer.classList.toggle('z-50');
  historyContainer.classList.toggle('hidden');
});

historyCloseBtn.addEventListener('click', () => {
  historyContainer.classList.remove('z-50');
  historyContainer.classList.toggle('hidden');
});

clearHistoryBtn.addEventListener('click', () => {
  History.clearHistory();
  historyList.innerHTML = ''; // Clear existing history display
  champ.focus();
});