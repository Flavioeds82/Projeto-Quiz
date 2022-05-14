let currentQuest = 0;
let query = document.querySelector.bind(document);
let hits = 0;



function showQuest(){
   if(questions[currentQuest]){
      let quest = questions[currentQuest];
      let opt = '';
      let progress = (Math.floor((currentQuest/ (questions.length)) *100));
      console.log(progress)
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
   console.log('clicou')
   let clickOpt = (parseInt(e.target.getAttribute('data-opt')));
   if(questions[currentQuest].answer === clickOpt){
      hits++;
   }
   currentQuest++;
   showQuest();
}

function finishQuiz(){
   query('.progress--bar').style.width = `100%`;
   query('.scoreArea').style.display = 'block';
   query('.questionArea').style.display = 'none';
}
showQuest();