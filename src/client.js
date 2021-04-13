import fetch from 'node-fetch';
import chalk from 'chalk';

const client = mozaik => {

	const apiCalls = {

		lastCommits ( params ) {

			mozaik.logger.info(chalk.yellow(`[gitlab] calling gitlab.lastCommit`));

			return fetch(`${params.url}/api/v4/projects/${params.project}/repository/commits`, {
				method: 'GET',
				headers : {
					'Authorization' : `Bearer ${process.env.GITLAB_ACCESS_TOKEN}`,
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(json => json.slice(0, 5))
			.then(commits => commits.maps(x=>{
				return {
					id : x.short_id,
					author : x.author_name.split('.').map(e=>e[0].toUpperCase()+e.slice(1)).join(' '),
					msg : x.message,
					date : x.createdAt
				}
			}))
		},
		
	}

	return apiCalls;

};

export default client;
