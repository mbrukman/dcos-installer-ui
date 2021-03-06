/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import APIErrorModal from './APIErrorModal';
import StoreMap from '../constants/StoreMap';
import StringUtil from '../utils/StringUtil';

const METHODS_TO_BIND = ['handleErrorClose', 'handleErrorClick'];

class ErrorLabel extends React.Component {
  constructor() {
    super();

    this.state = {
      openErrorModal: false
    };

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  handleErrorClick() {
    this.setState({openErrorModal: true});
  }

  handleErrorClose() {
    this.setState({openErrorModal: false});
  }

  getErrorLabel(errors) {
    if (!errors || errors.length === 0) {
      return <span>No Errors Found</span>;
    }

    let nodesText = StringUtil.pluralize('Node', errors.length);

    return (
      <a className={this.props.className} onClick={this.handleErrorClick}>
        {`Errors Found on ${errors.length} ${nodesText}`}
      </a>
    );
  }

  render() {
    let errors = StoreMap[this.props.step].get('errorDetails');

    return (
      <div>
        {this.getErrorLabel(errors)}
        <APIErrorModal
          errors={errors}
          onClose={this.handleErrorClose}
          open={this.state.openErrorModal}
          step={this.props.step} />
      </div>
    );
  }
}

ErrorLabel.defaultProps = {
  className: 'error-label'
};

ErrorLabel.propTypes = {
  className: React.PropTypes.string,
  step: React.PropTypes.string // preflight, deploy, postflight
};

module.exports = ErrorLabel;
