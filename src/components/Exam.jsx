import React, { Component } from 'react'
import Answer from './Answer';

export default class Exam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			data: null
		};
	}
	componentDidMount() {
		fetch("https://webhook.site/79a0f2d7-0c34-465c-a62a-9647f1e219c9")
			.then(res => res.json())
			.then(
				(result) => {
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
		if (this.state.isLoaded === false) {
			return (
				<h1>Loading ...</h1>
			)
		}
		if (this.state.error != null) {
			return (
				<h1>Error</h1>
			)
		}
		return (
			<div>
				
				<div class="container">
					<div class="row">
						<div class="col col-8">
							<h1>{this.state.data.code}</h1>
							<br></br>
							{
								this.state.data.questions.map((question, id) => {
									return (
										<div key={id} id={id + 1}>
											<div className="card">
												<div className="card-header">Question {id + 1}</div>
												<div className="card-body">
													<pre>{question.text}</pre>
													<div>
														{
															question.answers.map((answer, id) =>
																<Answer key={id} answer={answer}></Answer>
															)
														}
													</div>
												</div>
											</div>
										</div>
									)
								}
								)
							}
						</div>
						<div class="col col-4">

						</div>
					</div>
				</div>

			</div>
		)
	}
}
