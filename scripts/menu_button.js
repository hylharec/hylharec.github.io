'use strict';

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menu_open: false };
  }

  render() {
    if (this.state.menu_open)
    {
      return (
        <button onClick={() => this.setState({ menu_open: false }) }>
          Menu opened
        </button>
      );
    }
    else
    {
      return (
        <button onClick={() => this.setState({ menu_open: true }) }>
          Menu closed
        </button>
      );
    }
  }
}

ReactDOM.render(<MenuButton />, document.getElementById('menu_button_container'));