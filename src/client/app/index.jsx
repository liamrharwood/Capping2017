import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app.jsx';

//Renders application to the div in index.html
ReactDom.render(
	<App />,
  	document.getElementById("app")
);