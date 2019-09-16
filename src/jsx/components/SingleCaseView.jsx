import React, { Component } from "react";

import { Link } from "react-router-dom";

import Download from "-!svg-react-loader?name=Logo!../../img/download-icon.svg";
import Open from "-!svg-react-loader?name=Logo!../../img/open-details.svg";
import Close from "-!svg-react-loader?name=Logo!../../img/close-details.svg";

class SingleCaseView extends Component {
	constructor({ match }) {
		super();
		this.state = {
			details: false
		};
	}

	hideShowDetails() {
		this.setState({ details: !this.state.details });
	}

	render() {
		console.log(this.props);
		return (
			<div className="single-case-wrapper">
				<div className="single-case-header">
					<div className="details-open-close-button" onClick={this.hideShowDetails.bind(this)}>
						info {this.state.details ? <Close /> : <Open />}
					</div>
					<div className="download-button">
						<a
							href={`https://s3-ap-southeast-2.amazonaws.com/openlawnz-pdfs/${this.props.singleCase.pdf.pdfDbKey}`}
							download
						>
							<Download alt="Download" className="download-icon" />
						</a>
					</div>
				</div>
				<div className="row">
					<div className="case-document-viewer">
						<iframe
							src={`https://docs.google.com/gview?url=https://s3-ap-southeast-2.amazonaws.com/openlawnz-pdfs/${this.props.singleCase.pdf.pdfDbKey}&embedded=true`}
							frameBorder={0}
						/>
					</div>
					<div className={this.state.details ? "case-details" : "hide-case-details"}>
						<h3 className="header">Cites</h3>
						{this.props.singleCase.cites &&
							(this.props.singleCase.cites.length === 0 ? (
								<p>No cases</p>
							) : (
								<div role="listitem" className="item">
									{this.props.singleCase.cites.map(function(obj) {
										return (
											<div role="listitem" className="item" key={`cites-reference-${obj.id}`}>
												<Link to={`/case/${obj.id}`}>{obj.caseName}</Link>
											</div>
										);
									})}
								</div>
							))}
						<hr></hr>

						<h3 className="header">Cited By</h3>
						{this.props.singleCase.casesCitedsByCaseCited &&
							(this.props.singleCase.casesCitedsByCaseCited.length === 0 ? (
								<p>No cases</p>
							) : (
								<div role="listitem" className="item">
									{this.props.singleCase.casesCitedsByCaseCited.map(function(obj) {
										return (
											<div
												role="listitem"
												className="item"
												key={`cited-by-reference-${obj.caseByCaseCited.id}`}
											>
												<Link to={`/case/${obj.caseByCaseCited.id}`}>
													{obj.caseByCaseCited.caseName}
												</Link>
											</div>
										);
									})}
								</div>
							))}
						<hr></hr>

						<h3 className="header">Legislation Referenced</h3>
						{this.props.singleCase.legislationToCases &&
							(this.props.singleCase.legislationToCases.length === 0 ? (
								<p>No legislation</p>
							) : (
								<table cellSpacing="0" cellPadding="0">
									<thead className="">
										<tr className="">
											<th className="title">Title</th>
											<th className="section">Section</th>
										</tr>
									</thead>
									<tbody className="">
										{this.props.singleCase.legislationToCases.map(function(obj, i) {
											return (
												<tr className="" key={`legislation-reference-${i}`}>
													<td className="">{obj.legislation.title}</td>
													<td className="">{obj.section}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							))}
						<hr></hr>
					</div>
				</div>
			</div>
		);
	}
}

export default SingleCaseView;