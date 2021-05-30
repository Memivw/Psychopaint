import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "./history";
// page
import NavigationBar from './layout/navbar/NavigationBar'
import Home from './views/pages/home'
import HTP from './views/pages/htp/htp'
import CDT from './views/pages/cdt/cdt'
import CDT_success from './views/pages/cdt/cdt_success'
import TotalReview from './views/pages/cdt/review/totalreview'
import TotalReview_HTP from './views/pages/htp/review/totalreview_htp'
import Result_HTP from './views/pages/htp/result_htp'
import Result_CDT from './views/pages/cdt/result'
import LOGIN from "./views/pages/login";



export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {},
        logIn: localStorage.getItem('login'),
        count: 1
    };
  }

  // for firebase login 
  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if(user){
  //       this.setState({ user })
  //       this.setState({ logIn : true })
  //     }else{
  //       this.setState({ user : null,logIn: false})
  //     }
  //   });
  // }
  setLongin = () =>{
    localStorage.setItem('login',false)
  }
  componentDidMount(){
    const log = localStorage.getItem('login')
    if(log == "null" || log == null){
      localStorage.setItem('login',false)
      this.setState({
        logIn: localStorage.getItem('login')
      })
      console.log(localStorage.getItem('login'))
    }
  }

  componentDidUpdate(){
    if(this.state.count == 1){
      const log = localStorage.getItem('login')
      if(log == "null" || log == null){
        localStorage.setItem('login',false)
        this.setState({
          count: 0,
          logIn: localStorage.getItem('login')
        })
      }
    }
  }

  render(){
    console.log(localStorage.getItem('login'))
    if( this.state.logIn == "false" ){
      return (
        <div>
          <Router history={history}>
              <Route path="/">
                  <LOGIN/>
              </Route>
            <Redirect to="/" />
          </Router>
        </div>
      )
    }else if(this.state.logIn == "true"){
      return (
        <Router history={history}>
         <NavigationBar/> 
          <div>
            <Switch>
                <Route path="/totalreview">
                  <TotalReview/>
                </Route>  
                <Route path="/totalreview_htp">
                  <TotalReview_HTP/>
                </Route>
                <Route path="/result_htp">
                  <Result_HTP/>
                </Route>
                <Route path="/result_cdt">
                  <Result_CDT/>
                </Route>
                <Route path="/htp">
                  <HTP />
                </Route>
                <Route path="/cdt">
                  <CDT />
                </Route>
                <Route path="/cdt_success">
                  <CDT_success />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
                <Redirect to="/" />
            </Switch>
          </div>   
        </Router>
      );
    }else{
      return (
          <div>
          </div>   
      );
    }
  }
}




