import React, { Component } from 'react'

import config from '../config'


export default class ListExam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			data: null
		};
	}
	
	componentDidMount() {
		fetch(config.API_URL + 'all')
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result)
					this.setState({
						isLoaded: true,
						data: result
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}
	render() {
		const { error, isLoaded, data } = this.state
		if (isLoaded === false) {
			return (
				<h1>Loading ...</h1>
			)
		}
		if (error != null) {
			return (
				<h1>Error</h1>
			)
		}
		let { exams } = data
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm">
						<h1>Exam list</h1>
						<table className="table">
							<thead>
								<tr>
									<th>#</th>
									<th>Exam code</th>
									<th>Upload date</th>
								</tr>
							</thead>
							<tbody>
								{
									exams.map((e, id) =>
										<tr key={id}>
											<td>{id + 1}</td>
											<td>
												<a href={`/exam?code=${e.exam_code}`}>{e.exam_code}</a>
											</td>
											<td>{e.upload_date}</td>
										</tr>
									)
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>

		)
	}
}
