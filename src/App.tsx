import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert from './components/Alert/alert' 

// function App() {
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Alert></Alert>
        <Button
          onClick={(e) => { e.preventDefault();alert(123); }}> Hello </Button>
        <Button 
          btnType={ButtonType.Primary}
          className="custom"
          size={ButtonSize.Large}  
          disabled
        > Hello </Button>
        <Button 
          btnType={ButtonType.Danger}
          size={ButtonSize.Small}  
          disabled
        > Hello </Button>
        <Button 
          btnType={ButtonType.Link}
          href="http://www.baidu.com"
        > Baidu </Button>        
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
