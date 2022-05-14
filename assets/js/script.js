let query = document.querySelector.bind(document);
let currentQuest = 0;
let hits = 0;
query('.scoreArea button').addEventListener('click', reset)
showQuest();




function showQuest(){
   if(questions[currentQuest]){
      let quest = questions[currentQuest];
      let opt = '';
      let progress = (Math.floor((currentQuest/ (questions.length)) *100));
      query('.progress--bar').style.width = `${progress}%`;
      query('.scoreArea').style.display = 'none';
      query('.questionArea').style.display = 'block';
      query('.question').innerHTML = quest.question;
      for (let index = 0; index < quest.options.length; index++) {
         opt += `<div data-opt=${index} class="option"><span>${index+1}</span> ${quest.options[index]}</div>`;
      }
      query('.options').innerHTML = opt;
      document.querySelectorAll('.options .option').forEach(item =>{
         addEventListener('click', optClickEvent);
         
      });
      


   }else{
      
      finishQuiz();
   }
}
function optClickEvent(e){
   console.log(currentQuest + ' optclick')
   let clickOpt = (parseInt(e.target.getAttribute('data-opt')));
   if(questions[currentQuest].answer === clickOpt){
      hits++;
      console.log(currentQuest + ' optclick_if')
   }
   currentQuest++;
   showQuest();
}

function finishQuiz(){
   let points = (Math.floor((hits / (questions.length)) *100));

   if(points < 30){
      query('.scoreText1').innerHTML = 'Você precisa Estudar mais.'
      query('.scorePct').style.color = 'red';
   }else if(30 <= points && points < 50){
      query('.scoreText1').innerHTML = 'Quaselá! Estude mais um pouco.'
      query('.scorePct').style.color = '#ff4400';
   }else if(50 <= points && points < 70){
      query('.scoreText1').innerHTML = 'Bom! Mas pode melhorar!'
      query('.scorePct').style.color = 'yellow';
   }else if(70 <= points && points <= 99){
      query('.scoreText1').innerHTML = 'Parabéns! Muito bom'
      query('.scorePct').style.color = 'green';
   }

   query('.progress--bar').style.width = `100%`;
   query('.scoreArea').style.display = 'block';
   query('.questionArea').style.display = 'none';
   query('.scorePct').innerHTML = `Acertou ${points}%`;
   query('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${hits}.`;
}

function reset(){
  currentQuest = 0;
  hits = 0;
  showQuest();
}
