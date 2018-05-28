import React, {Component} from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

class DetalheComunicado extends Component {
	constructor(){
		super();
		this.state = {
			notice: []
		}
	}

	componentDidMount(){
		const id = this.props.match.params.id;
		fetch('http://localhost:84/comunicados/'+ id)
		.then(
			results =>
				results.json()
		).then(
			data => {
				console.log(data);
				this.setState({notice: data})
				this.readNotice(data);
			}
		);
	}

	readNotice(notice){
		notice.seen = true;
		fetch('http://localhost:84/comunicados/'+ notice.id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(notice)
		}).then(
			() => this.forceUpdate()
		);
	}
	renderFiles(files){
		if(files != undefined){
			for (let index = 0; index < files.length; index++) {
				const file = files[index];
				return(
					<button type="button" className="btn btn-outline-dark btn-block" href={file.url}>
						{file.url}
					</button>
				);
				
			}
		}
	}
	render() {
		console.log(this.props);
		return(
			<div className="container-fluid">
				<h5 className="text-secondary"> Detalhes </h5>
				<div className="row">
					<div className="col-sm-12 ">
						<div className="card">
							<div className="card-body">
								<div className="card-title">
									{this.state.notice.title}
								</div>
								<div className="card-text">
									Descrição: {this.state.notice.fullDescription}
								</div>
								<p className="card-text">
									Data: {moment(this.state.notice.date, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY - HH[h]mm').toString()}
								</p>

								{this.renderFiles(this.state.notice.files)}
							</div>
						</div>

						<Link to={'/'}>
							<button type="button" className="btn btn-primary" >Voltar</button>
						</Link>
					</div>
				</div>
			</div>

		);
	}
}

export default DetalheComunicado;