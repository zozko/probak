let inputBtn = document.querySelector('button');
let displaySentence = document.querySelector('.sentenceInCamelCase');
inputBtn.addEventListener('click', readTheSentences);
let regexem = /[',.?@&#+-_!$%"(=){}*<>ˇ^]/;  // ezek a karakterek nem lehetnek a bevitt mondatba


function readTheSentences()
{ 
  
  let sentence = document.getElementById('mondat');
  if (sentence.classList.contains('alert'))
  {    
    sentence.classList.remove('alert');
  };


  let inputSentence = sentence.value.toLowerCase();
  if(regexem.test(inputSentence))
  {
    sentence.classList.add('alert');
    inputSentence = "";
   alert('a beirt mondat nem felel meg a felteteleknek - nem tartalmazhat irasjelet!');
  
   }
  // console.log(inputSentence, inputSentence.length);

  let sentenceArr = inputSentence.split(" ");
  let completSentence="";
  let newArr = sentenceArr.map(e =>
  {
     let firstLetter = e.charAt(0).toUpperCase();
     let rawWord = e.slice(1);
    let doneWord = firstLetter + rawWord;
      // console.log(doneWord);
      return doneWord;
  });
  // console.log('NEW ARRAY', newArr);
  
  completSentence = newArr.join('');
  let sentenceLowercase = completSentence.charAt(0).toLowerCase();
  let rawSentence = completSentence.slice(1);
  sentenceLowercase += rawSentence;
  



  
  // console.log('complet = ',completSentence);
  displaySentence.innerText = sentenceLowercase;
}