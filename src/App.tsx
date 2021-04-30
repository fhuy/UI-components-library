import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert from './components/Alert/alert' 
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import Menu1 from './components/Menu/menu1'
import MenuItem1 from './components/Menu/menuitem1'

// function App() {
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index) => {console.log(`这是${index}`)}}>
          <MenuItem index={0}>
            cool link
          </MenuItem>
          <MenuItem index={1} disabled>
            cool link2
          </MenuItem>
          <MenuItem index={2}>
            cool link3
          </MenuItem>
        </Menu>
        <Menu1 defaultIndex={0}></Menu1>
        <Alert 
          className="custom" 
          alertType="default" 
          title="消息提示"
          description="文字说明文字说明文字说明文字说明文字说明文字说明"
        ></Alert>
        <Alert 
          className="custom" 
          alertType="success" 
          title="消息提示"
          close-text="知道了"
        ></Alert>
        <Alert 
          className="custom" 
          alertType="warning" 
          title="消息提示"
          description="文字说明文字说明文字说明文字说明文字说明文字说明"
        ></Alert>
        <Alert 
          className="custom" 
          alertType="danger" 
          title="消息提示"
          description="文字说明文字说明文字说明文字说明文字说明文字说明"
        ></Alert>
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
