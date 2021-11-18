import { DOMMessage, DOMMessageResponse } from '../types/dom-messages';

// Function called when a new message is received
const messagesFromReactAppListener = (
   msg: DOMMessage,
   sender: chrome.runtime.MessageSender,
   sendResponse: (response: DOMMessageResponse) => void) => {
   console.log('[content.js]. Message received', msg);
   sendResponse({});
}
 
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

var customScript: any = document.createElement('script');
customScript.src = chrome.runtime.getURL('switch.js');
customScript.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(customScript);