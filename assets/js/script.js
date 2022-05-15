// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;
let labelAnswers = document.querySelector('.label');
let unlock = true;
showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions
function showQuestion() {
    
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
   if(unlock){
      let clickedOption = parseInt(e.target.getAttribute('data-op'));
    let correctElem = document.querySelector(`div[data-op="${questions[currentQuestion].answer}"]`);
    let hit = false;
    unlock = false;

      // ACERTO DA QUESTÃO

    if(questions[currentQuestion].answer === clickedOption) { 
      correctAnswers++;
      hit = true;
      correctElem.classList.add('.infoProgressAnimation');
      correctElem.style.backgroundColor = 'green';
      correctElem.style.color = "#fff";
      labelAnswers.style.display = 'block';
      labelAnswers.innerHTML = 'Resposta correta!'
      labelAnswers.style.backgroundColor = 'green';
      labelAnswers.style.color = '#fff';
        
    }else{
      labelAnswers.style.display = 'block';
      correctElem.style.backgroundColor = 'green';
      correctElem.style.color = "#fff";
      e.target.style.backgroundColor = 'red';
      e.target.style.color = "#fff";
      labelAnswers.innerHTML = 'Resposta errada!';
      labelAnswers.style.backgroundColor = 'red';
      labelAnswers.style.color = '#fff';
      
    }
    correctElem.classList.add('infoProgressAnimation');
    correctElem.style.backgroundColor = 'green';
    correctElem.style.color = "#fff";
    
    setTimeout(() => {
      currentQuestion++;
      labelAnswers.style.display = 'none';
      showQuestion();
      unlock = true;
  }, 2000);
}
   }
    

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 50) {
        document.querySelector('.scoreText1').innerHTML = 'Ruim!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 50 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}
