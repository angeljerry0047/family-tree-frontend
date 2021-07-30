import React from 'react';
import { View} from 'react-native';
import SearchBar from '../../components/SearchBar';
import SearchResults from './SearchResults';
import styles from './styles';
import individualsService from '../../services/individualsService';
export default class SearchScreen extends React.Component {
  state = {
    results: []
  };

  static navigationOptions = {
    header: null,
  };

  async handleSearchTextChange(query) {
    if(query && query.length >= 3) {
      const result = await individualsService.search(query);
      this.setState({results: result.data});
    }
  };

  handleSelection(individual) {
    if (this.props.handleSelection) {
      this.props.handleSelection(individual);
    } else {
      this.props.navigation.navigate('IndividualScreen', {id: individual.id});
    }
  }

  render() {
    const {results} = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          onCancel={this.props.onCancel}
          onChangeText={query => this.handleSearchTextChange(query)}
          renderCustomAction={this.props.renderCustomAction}
        />
        <SearchResults users={results} onSelect={i => this.handleSelection(i)}/>
      </View>
    );
  }
}

