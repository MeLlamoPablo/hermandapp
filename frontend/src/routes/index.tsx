import * as React from "react";
import { Route } from "react-router-dom"
import { Admin } from "./Admin"
import { Home } from "./Home"

export const Routes = () => <div>
	<Route exact={true} path="/" component={Home} />
	<Route path="/admin" component={Admin} />
</div>
