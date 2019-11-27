import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { fetchCollectionStatistics } from 'src/actions';
import { selectCollectionStatistics } from 'src/selectors';
import CollectionStatistics from './CollectionStatistics';


import './CollectionStatisticsMode.scss';

const statFields = [
  'schema', 'emails', 'addresses', 'ibans', 'languages', 'phones', 'names',
];


class CollectionStatisticsMode extends React.PureComponent {
  componentDidMount() {
    const { collection } = this.props;
    this.props.fetchCollectionStatistics(collection);
  }

  renderStatisticsItem(statKey) {
    const { collection, statistics } = this.props;
    const values = statistics[statKey];

    if (values && !_.isEmpty(values)) {
      return (
        <CollectionStatistics
          collection={collection}
          key={statKey}
          field={statKey}
          statistics={values}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div className="CollectionStatisticsMode">
        {statFields.map(stat => this.renderStatisticsItem(stat))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { collection } = ownProps;
  return {
    statistics: selectCollectionStatistics(state, collection.id),
  };
};

const mapDispatchToProps = { fetchCollectionStatistics };

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(CollectionStatisticsMode);
