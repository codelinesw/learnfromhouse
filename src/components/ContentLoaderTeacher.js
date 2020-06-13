import React from 'react';
import ContentLoader from 'react-content-loader'
export default class ContentLoadTeacher extends React.Component{

	render(){
		const { countResult } = this.props;
		
		return Array.from(Array(countResult)).map(function(item, index, arr){
		    return(
					<tr key={index+1}>
						<th scope="row"></th>
							<td style={{padding:'0px',width:'200px'}}>
							<ContentLoader
								width={200}
			   					height={45}
			   					backgroundColor="#e3e3e3"
			   					foregroundColor="rgba(135,135,135,0.26)"
			   					speed={3}
							>
								<rect x="50" y="16" rx="3" ry="4" width="100" height="9" />
								<circle cx="20" cy="22" r="17" />
							</ContentLoader>
						</td>
						<td style={{padding:'0px',width:'100px'}}>
							<ContentLoader
								width={220}
							   height={45}
							   backgroundColor="#e3e3e3"
							   foregroundColor="rgba(135,135,135,0.26)"
							   speed={3}
							>
								<rect x="15" y="16" rx="3" ry="4" width="100" height="9" />
							</ContentLoader>
						</td>
						<td style={{padding:'0px'}}>
							<ContentLoader
								width={170}
			   					height={45}
			   					backgroundColor="#e3e3e3"
			   					foregroundColor="rgba(135,135,135,0.26)"
			   					speed={3}
							>
								<rect x="10" y="16" rx="3" ry="4" width="100" height="9" />
							</ContentLoader>
						</td>
						<td style={{padding:'0px'}}>
							<ContentLoader
								width={170}
			   					height={45}
			   					backgroundColor="#e3e3e3"
			   					foregroundColor="rgba(135,135,135,0.26)"
			   					speed={3}
							>
								<rect x="10" y="16" rx="3" ry="4" width="100" height="9" />
							</ContentLoader>
						</td>
						<td style={{padding:'0px'}}>
							<ContentLoader
								width={170}
			   					height={45}
			   					backgroundColor="#e3e3e3"
			   					foregroundColor="rgba(135,135,135,0.26)"
			   					speed={3}
							>
								<rect x="10" y="16" rx="3" ry="4" width="100" height="9" />
							</ContentLoader>
						</td>
					</tr>
				)
		  });
	}
}

