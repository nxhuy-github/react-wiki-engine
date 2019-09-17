import React from 'react'

class Item extends React.Component {
  render() {
    return(
      <div className="searchResultDiv" >
        <h3>
          <a href={this.props.item.queryResultPageFullURL}>{this.props.item.queryResultPageTitle}</a>
        </h3>
        <span className="link">
          <a href={this.props.item.queryResultPageFullURL}>{this.props.item.queryResultPageFullURL}</a>
        </span>
        <p className="description" dangerouslySetInnerHTML={{__html: this.props.item.queryResultPageSnippet}}>
          
        </p>
      </div>
    )
  }
}

export default Item