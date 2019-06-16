import React from 'react';

const OjsContext = React.createContext({});

const DataProvider = ({ store, children }) => (
  <OjsContext.Provider value={store}>{children}</OjsContext.Provider>
);

const dataConnect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
  class DataConnect extends React.Component {
    constructor(props) {
      super(props);
      this.state = props.store.getState();
      this.unsubscribe = null;
    }

    componentDidMount() {
      this.unsubscribe = this.props.store
        .subscribe(state => this.setState(state));
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }

    mapStateTo() {
      const { store } = this.props;
      if (mapStateToProps === "function") {
        return mapStateToProps(store.getState());
      }
      return store.getState();
    }

    mapDispatchTo() {
      const { store } = this.props;
      if (mapDispatchToProps === "function") {
        return mapDispatchToProps(store.dispatch);
      }
      return store.dispatch;
    }

    render() {
      const { mapStateTo, mapDispatchTo } = this.state;

      return (
        <WrappedComponent {...this.props} {...mapStateTo()} {...mapDispatchTo()}/>
      );
    }
  }

  return (props) => (
    <OjsContext.Consumer>
      {store => <DataConnect {...props} store={store} />}
    </OjsContext.Consumer>
  );
}

export { DataProvider, dataConnect };