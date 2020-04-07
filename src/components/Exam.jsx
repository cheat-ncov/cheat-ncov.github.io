import React, { Component } from 'react'
import Answer from './Answer';
import config from '../config';

export default class Exam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			data: null
		};

		this.eventSource = new EventSource(config.API_URL + "answer_stream" + this.props.location.search)
	}

	updateAnswer = (data) => {
		console.log('see', data)
		let questions = this.state.data.questions.map(q => {
			if(q.question_id === data.question_id) {
				q.answers = q.answers.map(a => {
					if(a.answer_id === data.answer_id) {
						a.checked = data.checked
					}
					return a
				})
			}
			return q;
		})
		let tmp_data = this.state.data
		tmp_data.questions = questions
		this.setState({data: tmp_data})
	}

	handleAnswerChange = (e) => {
		const data = {
			code: e.exam,
			question_id: e.question,
			answer_id: e.answer.answer_id,
			checked: !e.answer.checked
		}

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};

		fetch(config.API_URL + "/answer", requestOptions)
			.then(async response => {
				const data = await response.json();
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
			})
			.catch(error => {
				// this.setState({ errorMessage: error });
				console.error('There was an error!', error);
			});
	}

	componentDidMount() {
		fetch(config.API_URL + 'exam' + this.props.location.search)
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
		this.eventSource.onmessage = e => this.updateAnswer(JSON.parse(e.data))
	}

	isChecked = (question) => {
		let check_list = question.answers.filter(q => q.checked)
		return check_list.length > 0
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
			<h1>Error: {error}</h1>
			)
		}
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col col-8">
							<h1>{data.code}</h1>
							<br></br>
							{
								data.questions.map((question, id) => {
									return (
										<div key={id} id={id + 1}>
											<div className="card mb-3">
												<div className="card-header">Question {id + 1}</div>
												<div className="card-body">
													<pre>{question.text}</pre>
													<div>
														{
															question.answers.map((answer, id) =>
																<Answer key={id} exam={data.code} question={question.question_id} answer={answer} onChange={this.handleAnswerChange}></Answer>
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
						<div className="col col-4">
							<div className="border-primary fix-pos p-4">
								<label className="form-control text-center">Question list</label>
								<div className="d-flex justify-content-center">
									<h5>{data.code}</h5>
								</div>
								<div className="">{
									data.questions.map((e, id) =>
										<a className={`badge ${this.isChecked(e) ? 'badge-success' : 'badge-light'}`} key={id} href={`#${id + 1}`}>{id + 1}</a>
									)
								}
								</div>
							</div>

						</div>
					</div>
				</div>

			</div>
		)
	}
}
