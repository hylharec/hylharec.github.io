'use strict';

const e = React.createElement;

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menu_open: false };
  }

  render() {
    if (this.state.menu_open) {
      return e(
        'button',
        { onClick: () => this.setState({ menu_open: false }) },
        'MENUOPENED'
      );
    }

    return e(
      'button',
      { onClick: () => this.setState({ menu_open: true }) },
      'MENUCLOSED'
    );
  }
}

const domContainer = document.querySelector('#menu_button_container');
ReactDOM.render(e(MenuButton), domContainer);