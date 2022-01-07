import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.css";
// import background from './background.svg'

function App() {
  const [text, setText] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Sorry your Browser does not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleEdit = () => {
    stopHandle();
    resetTranscript();
  };

  // const handleClear = () => {
  //   setText('')
  // };

  return (
    <div className="microphone-wrapper">
      <div className="title">
        <h1>Takenote📝</h1>
      </div>
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <img
            src="https://img.icons8.com/color-glass/48/000000/microphone.png"
            alt="mic"
          />
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click and say anything"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {
        <div className="microphone-result-container">
          <textarea
            cols="30"
            rows="10"
            placeholder="Type something"
            spellCheck="false"
            value={transcript || text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="microphone-reset btn" onClick={handleEdit}>
            Editz
          </button>
        </div>
      }
    </div>
  );
}
export default App;
