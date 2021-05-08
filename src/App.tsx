import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';

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

        <Tabs
          defaultIndex={0}
          type="card"
          onSelect={(content) => {
            alert(content);
          }}
        >
          <TabItem label={8}>11111</TabItem>
          <TabItem label="选项卡二" disabled>
            22222
          </TabItem>
          <TabItem label="用户管理">今天天气很热</TabItem>
        </Tabs>
        <Tabs
          defaultIndex={0}
          onSelect={(content) => {
            alert(content);
          }}
        >
          <TabItem label="选项卡一">11111</TabItem>
          <TabItem label="选项卡二">22222</TabItem>
          <TabItem label="用户管理">33333</TabItem>
        </Tabs>
      </header>
    </div>
  );
};

export default App;
