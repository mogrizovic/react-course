// replaced by React.lazy() left here for reference
import React, { useState, useEffect } from "react";

// Lazy loading wrapper
const asyncComponent = (importComponent) => {
  return (props) => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
      importComponent().then((cmp) => {
        setComponent(cmp.default);
      });
    }, []);

    const C = component;

    return C ? <C {...props} /> : null;
  };
};

export default asyncComponent;
