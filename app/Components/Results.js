'use strict';

import React from 'react'

import FoundArticle from './FoundArticle'

module.exports = React.createClass({
  getInitialState() {
    return { articles: [], deleted: [] }
  },

  onDelete(index) {
    this.setState({ deleted: this.state.deleted.concat([index]) })
  },

  render() {
    // Reset deleted to empty array on new search
    if (this.state.articles !== this.props.articles) {
      this.state.articles = this.props.articles;
      this.state.deleted = [];
    }

    return (
      <div className="container">
        <div className="section">
          <h3 className="header center pad-top-bot-med grey white-text">Results</h3>
          <div className="row">
            <div className="col s12">
              {this.props.articles
                .map((article, i) => this.state.deleted.indexOf(i) === -1 ?  // If the article index is not in the deleted array
                  <FoundArticle
                    key={i}
                    index={i}
                    article={article}
                    setSaved={this.props.setSaved}
                    onDelete={this.onDelete}
                  /> : ''
                )
              }
              <div className="divider"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});