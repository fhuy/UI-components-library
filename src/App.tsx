import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

// function App() {
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Menu
          defaultIndex="0"
          onSelect={(index) => {
            alert(index);
          }}
          mode="vertical"
          // mode="horizontal"
          defaultOpenSubMenus={['2']}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
          <li>?</li>
        </Menu>
        {/* <Alert
          className="custom"
          alertType="default"
          title="消息提示"
          description="文字说明文字说明文字说明文字说明文字说明文字说明"
        />
        <Alert className="custom" alertType="success" title="消息提示" close-text="知道了" />
        <Alert
          className="custom"
          alertType="warning"
          title="消息提示"
          description="文字说明文字说明文字说明文字说明文字说明文字说明"
        />
        <Alert
          className="custom"
          alertType="danger"
          title="消息提示"
          description="文字说明文字说明文字说明文字说明文字说明文字说明"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            alert(123);
          }}
        >
          {' '}
          Hello{' '}
        </Button>
        <Button btnType={ButtonType.Primary} className="custom" size={ButtonSize.Large} disabled>
          {' '}
          Hello{' '}
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small} disabled>
          {' '}
          Hello{' '}
        </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">
          {' '}
          Baidu{' '}
        </Button> */}
      </header>
    </div>
  );
};

export default App;
