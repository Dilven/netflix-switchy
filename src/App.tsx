import './App.css';
import { useEffect } from 'react';
import { DOMMessage, DOMMessageResponse } from './types/dom-messages';

function App() {
  useEffect(() => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'on_mount' } as DOMMessage,
        (response: DOMMessageResponse) => {
          console.log("🚀 ~ file: App.tsx ~ line 30 ~ useEffect ~ response", response)
        });
    });
  });
  

  return (
    <div className="App">
      <header className="App-header">
        Use "P" or "E" key to switch subtitles on Netflix
      </header>
    </div>
  );
}

export default App;
