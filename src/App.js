import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Details from './components/details';
import NotFound from './components/notFound';
import List from './components/List';
import "react-toastify/dist/ReactToastify.css";
import './App.scss';


function App() {
  return (
  	<React.Fragment>
  	<ToastContainer />
	    <Header />
  		<main className="container">
  			<Switch>
		    	<Route path="/product/:id" component={Details} />
          <Route path="/dashboard" component={List} />
		    	<Route path="/not-found" component={NotFound} />
		    	<Redirect from="/" exact to="/dashboard" />
		    	<Redirect to="/not-found" />
  			</Switch>
  		</main>
	    <Footer />
    </React.Fragment>
  );
}

export default App;
