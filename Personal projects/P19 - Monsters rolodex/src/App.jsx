import React, { Component } from 'react';
import './App.css';
import { CardList } from './Components/card-list/card-list.component';
import { SearchInput } from './Components/Search-box/search-box.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchValue: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => this.setState({ monsters: data }))
  }
  handleEvent() {
    console.log('button clicked')
    console.log(this)
  }

  render() {
    const { monsters, searchValue } = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchValue.toLowerCase()))
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchInput placeholder='Search monsters' handleChange={
          e => this.setState({ searchValue: e.target.value })
        } />
        <CardList monsters={filteredMonsters} />
      </div >
    );
  }
}

export default App;