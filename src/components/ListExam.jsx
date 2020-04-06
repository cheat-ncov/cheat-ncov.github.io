import React, { Component } from 'react'

export default class ListExam extends Component {
	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Exam code</th>
						<th>Upload date</th>
					</tr>
				</thead>
				<tbody>
					{
						this.props.data.map((e, id) => 
							<tr key={id}>
								<td>{id+1}</td>
								<td>
									<a href={`/exam?id=${e.code}`}>{e.code}</a>
								</td>
								<td>{e.upload_date}</td>
							</tr>
						)
					}
				</tbody>
			</table>
		)
	}
}
