import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
//import '../../assets/open-iconic-master/font/css/open-iconic-bootstrap.css';


export class Comunicados extends Component {
	constructor() {
		super();
		this.state = {
			categories: [],
			notices: [],
			read: []
		}
	}
	componentDidMount() {
		this.getAllNoticeTypes();
		this.getAllNotices();
	}

	getAllNoticeTypes() {
		fetch('http://localhost:84/tiposComunicados')
			.then(
				results =>
					results.json()
			).then(
				data => {
					this.setState({ categories: data })
				}
			);
	}

	getAllNotices(type) {
		fetch('http://localhost:84/comunicados')
			.then(
				results =>
					results.json()
			).then(
				data => {
					if (type != undefined) {
						const notices = [];
						data.forEach(notice => {
							if (notice.type === type) {
								notices.push(notice);
							}
						});
						this.setState({ notices });
					} else {
						this.setState({ notices: data })
					}
				}
			);
	}
	getNoticeColor(type){
		let className = 'stripe ';
		switch(type){
			case 0:
				className = className + 'informativos';
				break;
			case 1:
				className = className + 'forca';
				break;
			case 2:
				className = className + 'vivo';
				break;
			 case 3:
				className = className + 'vendas';
				break;
		}
		return className;
	}

	renderFiles(files){
		if(files != undefined){
			for (let index = 0; index < files.length; index++) {
				const file = files[index];
				return(
					<button type="button" className="btn btn-outline-dark btn-block" href={file.url}>
						{file.url}
						<span className="oi oi-icon-name" title="icon name" aria-hidden="true"></span>
					</button>
				);
				
			}
		}
	}

	downloadFile(url){

	}

	readNotice(id){
		let read = this.state.read;
		read.push(id);
		this.setState(read);
	}

	getRead(id){
		let className = 'card notice shadow';
		this.state.read.map(
			r => {
				if(r === id){
					console.log(r);
					className = className + ' read-notice';
					return className ;
				}
			}
		);
		return className;
	}
/*	<div className="row text-center">
						<div className="card col-10 file notice">
							<div className="card-body">
								<a href="#" className="card-text">
									{file.url}
								</a>
								<div className="download icon"></div>
							</div>
						</div>
					</div> */

	render() {
		return (
			<div className="container-fluid">
				<h5 className="text-secondary"> Categorias </h5>
				<div className="row">
					<div className="col-sm-12 categories">
						{this.state.categories.map(
							category => {
								return (
									<button type="button" className="btn btn-outline-dark" onClick={() => this.getAllNotices(category.type)}>{category.name}</button>
								);
							}
						)}
					</div>
				</div>
				{this.state.notices.map(
					notice => {
						return (
							<div className="row">
								<div className="col-sm-12">
									<div className={this.getRead(notice.id)}>
										
										<div className={this.getNoticeColor(notice.type)}></div>
										<div className="card-body pb-1 pt-3">
											<div className="row">
												<h5 className="card-title col-6 pull-left" onClick={() => this.readNotice(notice.id)}>
													<a href="#"> {notice.title} </a>
												</h5>
												<h5 className="card-title col-6 text-right pull-right"> {notice.id} </h5>
											</div>
											{this.renderFiles(notice.files)}
											
											<div className="row">
												<p className="card-text pull-left col-6"> {this.state.categories.map(
													category => {
														if (category.type === notice.type) {
															return (category.name);
														}
													})}
												</p>
												<p className="card-text pull-right text-right col-6">
													{moment(notice.date, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY - HH[h]mm').toString()}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					}
				)}
			</div>
		);
	}
}