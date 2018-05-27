import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
export class Comunicados extends Component {
    constructor() {
				super();
				this.state = {
					categories: []
				}
		}
		componentDidMount(){
			this.getAllNoticeTypes();
		}
		getAllNoticeTypes(){
			fetch('http://localhost:84/tiposComunicados')
			.then(
				results => 
					results.json()
			).then(
				data => {
					this.setState({categories: data})
					console.log(this.state.categories);
				}
			);
		}
    render() {
        return (
            <div className="container">
								<h5 className=" text-secondary"> Categorias </h5>
								<div className="row">
									<div className="col-sm-12 categories">
										{this.state.categories.map(
											category => {
												return(
													<button type="button" className="btn btn-outline-dark">{category.name}</button>
												);
											}
										)}
									</div>
								</div>
            </div>
        );
    }
}