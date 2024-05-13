import React,{useState,useRef} from "react";
import "./App.css"



function App() {
  const date = new Date();
  const [words,setArray] = useState([]);
  const [wordIndex,setIndex] = useState(0);
  const [str,setString] = useState("");
  const [time,setTime] = useState(0)
  const quoteRef = useRef();
  const typeRef = useRef();
  const messageRef = useRef();
const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
 function logic(){
  const quote = quotes[Math.floor(Math.random()*quotes.length)]
  console.log(quote);
  const wordArray = quote.split(" ")
   setArray(wordArray);
   setIndex(0);
   setTime(date.getTime());
  //  setArray(quote.split(" "));
  const s = wordArray.map((word)=>{return `<span>${word} </span>`});
  

  messageRef.current.innerText = "";
  typeRef.current.value = '';
  
  quoteRef.current.innerHTML = s.join("");
  quoteRef.current.childNodes[0].className='highlight';
  // setIndex(wordIndex+1);
  console.log(wordIndex);
}

function checkAndMove(event){
  const currentWord = words[wordIndex];
  const typedValue = event.target.value.trim();
  if(currentWord===typedValue && wordIndex === words.length-1){
    const elapsedTime =  date.getTime() - time;
    const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
    messageRef.current.innerText = message;
  }
  else if(currentWord === typedValue){
    typeRef.current.value = '';
    setIndex(wordIndex+1);
    for(const wordEle of quoteRef.current.childNodes){
      wordEle.className = ''
    }
  quoteRef.current.childNodes[wordIndex+1].className='highlight';

  }
  else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typeRef.current.className = '';
  } else {
    // error state
    typeRef.current.className = 'error';

  }
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Typing game</h1>
        <p>Practice your typing skills with a quote from Sherlock Holmes. Click **start** to begin!</p>
        <p ref={quoteRef}  id="quote" ></p>
        <p ref={messageRef} id="message"></p>
        <input ref={typeRef} type="text" aria-label="custom word" id="typed-value" onChange={checkAndMove} />
        <br />
        <br />
        <button type="button" id="start" onClick={logic}>Start</button>
      </header>
    </div>
  );
}

export default App;
