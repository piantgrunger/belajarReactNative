import React from 'react';
import { FlatList,View,Picker,Item } from 'react-native';

// Import getNews function from news.js
import { getNews,getSources } from './src/news';
// We'll get to this one later
import Article from './src/components/Article';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true,sources:[],source:null };
    this.fetchNews = this.fetchNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchSources();
    this.fetchNews();
   }



  fetchNews() {

      getNews(this.state.source)
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
      
  }
  fetchSources() {
    getSources()
      .then(sources => this.setState({ sources, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  
      
  }

  handleRefresh() {

    this.setState(
      {
        refreshing: true
    },
      () => this.fetchNews()
    );
  }

  render() {
    return (
      <View>
        <Picker
    mode="dropdown"
    selectedValue={this.state.source}
    onValueChange={(itemValue, itemIndex) => this.setState({ source: itemValue,refreshing:true })}
    >
      {this.state.sources.map((val, key) => {
        return (<Item label={val.name} key={val.id} value ={val.id}/>) 
    })}
</Picker>
      <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
      </View>
  );
  }
}