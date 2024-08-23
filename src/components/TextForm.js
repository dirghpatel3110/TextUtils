import React, {useState,useEffect} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
//import PropTypes from 'prop-types'

export default function TextForm(props) { 
    const startListening = () => {
        resetTranscript();
        setText(""); 
        SpeechRecognition.startListening({ continuous: true, language:'en-IN' });
    }
    const stopListening = () => {
        SpeechRecognition.stopListening();
    }
    const { transcript, browserSupportsSpeechRecognition,resetTranscript } = useSpeechRecognition();


    useEffect(() => {
        setText(transcript); 
    }, [transcript]);

    const handleUpClick = () =>{
        //console.log("button was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to UpperCase","success");
    }
    const handleLoClick = () =>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to LowerCase","success");
    }
    const handleClClick = () =>{
        let newText = " ";
        setText(newText);
        props.showAlert("Clear Text","success");
    }
    const handleOnClick = () =>{
        navigator.clipboard.writeText(text);
        props.showAlert("Copy Text","success");
    }

    const handleOnChange = (event) =>{
        //console.log("on change");
        setText(event.target.value);
    }
    const [text,setText] = useState("")

    if (!browserSupportsSpeechRecognition) {
        return null
      }
  return (
    <>
        <div className='container' style={{color: props.mode === 'dark'? 'white':'#042743'}}>
            <h1>{props.heading}</h1>
            <div className="mb-3">   
                <textarea className="form-control" value={text}  onChange={handleOnChange} id="myBox" rows="8" style={{backgroundColor: props.mode === 'dark'? '#13466e':'white',color: props.mode === 'dark'? 'white':'#042743'}}></textarea>
            </div>
            <button className="btn btn-primary mx-1 my-1" disabled={text.length===0}  onClick={handleUpClick}> Convert to Uppercase</button>
            <button className="btn btn-primary mx-1 my-1" disabled={text.length===0} onClick={handleLoClick}> Convert to Lowercase</button>
            <button className="btn btn-primary mx-1 my-1" disabled={text.length===0} onClick={handleClClick}> Clear text</button>
            <button className="btn btn-primary mx-1 my-1" disabled={text.length===0} onClick={handleOnClick}> Copy text</button>
            <button className="btn btn-primary mx-1 my-1" onClick={startListening}> Start Listening</button>
            <button className="btn btn-primary mx-1 my-1" onClick={stopListening}> Stop Listening</button>
        </div>  
        <div className="container my-3" style={{color: props.mode === 'dark'? 'white':'#042743'}}>
            <h1>Your text summary</h1>
            <p>{text.split(/\s+/).filter(text => text !== '' ).length} words and {text.length} characters</p>
            <p>{0.008 * text.split(" ").filter(text => text !== '' ).length} Minutes Read</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to Preview!"}</p>
        </div>
    </>
  )
} 
