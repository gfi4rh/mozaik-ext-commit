import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import moment from 'moment';
import 'moment/locale/fr';


class Commits extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			commits : null,
			error : null
		}
	}
	
	getApiRequest() {
		let { url, project } = this.props;
		
		return {
			id:     `gitlab.lastCommits.${project}`,
			params: {
				url : url,
				project : project
			}
		};
	}
	
	onApiData(commits) {

		if('errno' in commits){
			this.setState({
				error : "L'adresse du serveur GitLab est inaccessible"
			})
		} else {
			if(!Object.keys(commits).length){
				this.setState({
					error : "Ce numero de projet n'existe pas"
				})
			} else {
				this.setState({
					commits : commits
				})
			}
		}
	}
	
	
	render() {
		
		const { title } = this.props
		const { commits, error } = this.state

		let commitsNode

		if(commits){
			commitsNode =
				<table className="gitlab__commits__table">
					{commits.map(commit => 
					<tr>
						<td className="gitlab__commits__id gitlab__commits__ellipsis">#{commit.id}</td>
						<td className="gitlab__commits__author gitlab__commits__ellipsis">{commit.author}</td>
						<td className="gitlab__commits__message gitlab__commits__ellipsis" title={commit.msg}>{commit.msg}</td>
						<td className="gitlab__commits__date gitlab__commits__ellipsis">{moment(commit.dateCommit).format('L') + " | " + moment(commit.dateCommit).format('HH:mm:ss')}</td>
					</tr>)}
				</table>
		} else {
			if(error){
				commitsNode = (<div className="gitlab__commits__error">{error}</div>)
			}
		}

		
		return (
			<div>
				<div className="widget__header">
					<span>
						<span className="widget__header__subject">{title}</span>
					</span>
				</div>
				<div className="widget__body">
					{commitsNode}
				</div>
			</div>
			);
		}
	}
	
	Commits.displayName = 'Commits';
	
	reactMixin(Commits.prototype, ListenerMixin);
	reactMixin(Commits.prototype, Mozaik.Mixin.ApiConsumer);
	
	export default Commits;
