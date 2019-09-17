import React from 'react';
import './App.css';
import Item from './Item'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      wikiSearchTerms: "",
      wikiSearchReturnValues: []
    }
    this.changeWikiSearchTerms = this.changeWikiSearchTerms.bind(this)
    this.useWikiSearchEngine = this.useWikiSearchEngine.bind(this)
  }

  changeWikiSearchTerms(event) {
    this.setState({
      wikiSearchTerms: event.target.value
    })
  }

  useWikiSearchEngine(event) {
    event.preventDefault()
    this.setState({
      wikiSearchReturnValues: []
    })
    let url = "https://en.wikipedia.org/w/api.php"

    let params = {
        action: "query",
        list: "search",
        srsearch: this.state.wikiSearchTerms,
        format: "json"
    }

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key]})
    let that = this
    fetch(url)
        .then(function(response){return response.json()})
        .then(function(response) {
            console.log(response)
            for(let key in response.query.search) {
              that.state.wikiSearchReturnValues.push({
                queryResultPageFullURL: "",
                queryResultPageID: response.query.search[key].pageid,
                queryResultPageTitle: response.query.search[key].title,
                queryResultPageSnippet: response.query.search[key].snippet
              })
            }
        })
        .then(function(response) {
          for(let k in that.state.wikiSearchReturnValues) {
            let page = that.state.wikiSearchReturnValues[k]
            let pageID = page.queryResultPageID
            let _url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`
            fetch(_url)
              .then(function(response) {return response.json()})
              .then(function(response) {
                page.queryResultPageFullURL = response.query.pages[pageID].fullurl
                that.forceUpdate()
              })
              .catch(function(error){console.log(error)})
          }
        })
        .catch(function(error){console.log(error)})
  }

  render() {
    let wikiSearchResults = this.state.wikiSearchReturnValues.map(function(e) {
      return <Item item={e} key={e.queryResultPageID} />
    })
    return (
      <div className="App">
        <h1>Wikipedia Search Engine</h1>
        <form action="" >
          <input
            type="text" 
            value={this.state.wikiSearchTerms} 
            onChange={this.changeWikiSearchTerms} 
            placeholder="Search Wikipedia Articles" />
          <button type="submit" onClick={this.useWikiSearchEngine} >Search</button>
        </form>
        {wikiSearchResults}
      </div>
    )
  }
}

export default App;
