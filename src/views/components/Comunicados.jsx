import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

export class Comunicados extends Component {
    constructor() {
				super();
				this.state = {
					categories: [],
					notices: []
				}
		}
		componentDidMount(){
			this.getAllNoticeTypes();
			this.getAllNotices();
		}

		getAllNoticeTypes(){
			fetch('http://localhost:84/tiposComunicados')
			.then(
				results => 
					results.json()
			).then(
				data => {
					this.setState({categories: data})
				}
			);
		}

		getAllNotices(){
			fetch('http://localhost:84/comunicados')
			.then(
				results => 
					results.json()
			).then(
				data => {
					this.setState({notices: data})
					console.log(this.state.notices);
				}
			);
		}
    render() {
        return (
            <div className="container-fluid">
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
								{this.state.notices.map(
										notice => {
											return(
												<div className="row">
													<div className="col-sm-12">
														<div className="card notice shadow">
															
															<div className="card-body pb-1 pt-3">
																<h5 className="card-title"> {notice.title} </h5>
																<div className="row">
																	<p className="card-text pull-left col-6"> {this.state.categories.map(
																		category => {
																			if(category.type === notice.type){
																				return (category.name);
																			}
																	})} 
																	</p>
																	<p className="card-text pull-right text-right col-6">
																		{moment(notice.date,'YYYY-MM-DD HH:mm').format('DD/MM/YYYY - HH[h]mm').toString()}
																	</p>
																</div>
															</div>
														</div>
													</div>
												</div>
												);
										}
								)}
								<div className="row">
										<div className="col-sm-12">
											<div className="card">
												<div className="card-body">
													<h5 className="card-title"> Metas Março </h5>
													<div className="row">
														<p className="card-text pull-left col-6"> Força de Vendas </p>
														<p className="card-text pull-right text-right col-6">11/02/2018 - 16h30</p>
													</div>
												</div>
											</div>
										</div>
								</div>
            </div>
        );
    }
}