import React from "react";

const withTransformProps = (transformFunc) => (Component) => {
  const WithTransformProps = (props) => {
    const newProps = transformFunc(props);
    return <Component {...newProps} />;
  };

  return WithTransformProps;
};

export default withTransformProps;
