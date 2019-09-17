import React from 'react';
import './App.css';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      WikiSerachTerms: ""
    }
    this.changeWikiSearchTerms = this.changeWikiSearchTerms.bind(this)
  }

  changeWikiSearchTerms(event) {
    this.setState({
      WikiSerachTerms: event.target.value
    })
  }

  useWikiSearchEngine() {

  }

  render() {
    return (
      <div className="App">
        <h1>Wikipedia Search Engine</h1>
        <form action="" >
          <input type="text" value={this.state.WikiSerachTerms} onChange={this.changeWikiSearchTerms} placeholder="Search Wikipedia Articles" />
          <button type="submit" onClick={this.useWikiSearchEngine} >Search</button>
        </form>
      </div>
    )
  }
}

export default App;
