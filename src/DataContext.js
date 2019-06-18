import React from 'react';

const OjsContext = React.createContext({});

const DataProvider = ({ store, children }) => (
  <OjsContext.Provider value={store}>{children}</OjsContext.Provider>
);

const dataConnect = () => WrappedComponent => {
  return (props) => (
    <OjsContext.Consumer>
      {store => <WrappedComponent {...props} store={store} />}
    </OjsContext.Consumer>
  );
}

export { DataProvider, dataConnect };