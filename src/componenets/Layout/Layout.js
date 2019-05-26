import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";
import Toolbar from "../Navigation/ToolBar/ToolBar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

    state  = {
        showSideDrawer : true
    }
    SideDrawerCloseHandler = ()=>{
        this.setState({showSideDrawer:false})
    }

  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer open = {this.state.showSideDrawer} closed={this.SideDrawerCloseHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;