import React from 'react';
import ContentLoader from 'react-content-loader'
export default class ContentLoadInstitutions extends React.Component{

	render(){
		const { countResult,count } = this.props;
		
		return Array.from(Array(countResult)).map(function(item, index, arr){
		    return(
					<tr key={index+1}>
							<th scope="row" style={{padding:'0px',width:'20px'}}>
								<ContentLoader
								  width={50}
								  height={50}
								  backgroundColor="#e3e3e3"
			   					  foregroundColor="rgba(135,135,135,0.26)"
			   					  speed={3}
								>
								  <circle cx="20" cy="22" r="8" />
								</ContentLoader>
							</th>
							<td style={{padding:'0px',width:'100px'}}>
							<ContentLoader
								width={100}
			   					height={45}
			   					backgroundColor="#e3e3e3"
			   					foregroundColor="rgba(135,135,135,0.26)"
			   					speed={3}
							>
								<rect x="8" y="16" rx="3" ry="4" width="70" height="9" />
							</ContentLoader>
						</td>
						<td style={{padding:'0px',width:'160px'}}>
							<ContentLoader
								width={220}
							   height={45}
							   backgroundColor="#e3e3e3"
							   foregroundColor="rgba(135,135,135,0.26)"
							   speed={3}
							>
								<rect x="15" y="16" rx="3" ry="4" width="160" height="9" />
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
								<rect x="15" y="16" rx="3" ry="4" width="100" height="9" />
							</ContentLoader>
						</td>
						{count === 6 ? <td style={{padding:'0px'}}>
							<ContentLoader
								width={170}
			   					height={45}
			   					backgroundColor="#e3e3e3"
			   					foregroundColor="rgba(135,135,135,0.26)"
			   					speed={3}
							>
								<rect x="15" y="16" rx="3" ry="4" width="100" height="9" />
							</ContentLoader>
						</td> : null}
					</tr>
				)
		  });
	}
}

