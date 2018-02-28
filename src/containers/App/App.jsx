import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";

import { Header, Footer, Sidebar } from "components";

import appRoutes from "routes/app.jsx";

import appStyle from "variables/styles/appStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

// test db
// import { fetchDBData } from '../../data/main.db'
// import { ipcRenderer, remote } from 'electron';
// import { EventEmitter } from 'events';
// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3000');

import axios from 'axios';

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {

  state = {
    mobileOpen: false,
    username: ''
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }

  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }

  getTodosSQLite() {
    console.log('getTodosSQLite');
    // socket.on("connect-db");

    axios.get('http://localhost:3200/todos')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    // ipcRenderer.on("db-result", function (evt, result) {
    //   let list = [];

    //   for (var i = 0; i < result.length; i++) {
    //     list.push(result[i].FirstName.toString());
    //   }
    // });
    // const { usersTest } = remote.require('./electron/data/users.data.js')
    // ipcRenderer.send('connect-db');

    // socket.on('db-result', (event, result) => {
    //   console.log(result);
    // })

    // import('./moduleA')
  }
  getTodosGraphQL() {
    console.log('getTodosGraphQL');
    // socket.on("connect-db");

    // axios.get('http://localhost:3200/todos')
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // ipcRenderer.on("db-result", function (evt, result) {
    //   let list = [];

    //   for (var i = 0; i < result.length; i++) {
    //     list.push(result[i].FirstName.toString());
    //   }
    // });
    // const { usersTest } = remote.require('./electron/data/users.data.js')
    // ipcRenderer.send('connect-db');

    // socket.on('db-result', (event, result) => {
    //   console.log(result);
    // })

    // import('./moduleA')
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={appRoutes}
          logoText={"Creative Tim"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={appRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />

          {/* test button */}
          <button onClick={this.getTodosSQLite()}>Get Todos from SQLite</button>

          {/* test button */}
          <button onClick={this.getTodosGraphQL()}>Get Todos from GraphQL</button>

          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
