import React, { Component } from "react";

const withCardView = (CustomComponent) => {
  return class WithCardView extends Component {
    render() {
      const { style, ...rest } = this.props;
      return (
        <div className="card border-info mb-3" style={style}>
          <div className="card-body">
            <CustomComponent {...rest}></CustomComponent>
          </div>
        </div>
      );
    }
  };
};

export default withCardView;
