import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <h1> test </h1>
    )
  }
}
// const mapStoreToProps = (store, ownProps) => {
//   return {...ownProps, user: store.user}
// }
// const App = connect(mapStoreToProps, {fetchUser, setCollectedReadlists})(AppBeforeConnect)

ReactDOM.render(
  <App />,
  document.getElementById('main')
)
