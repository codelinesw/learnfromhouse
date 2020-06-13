import React from 'react';


export default class Pagination extends React.Component{

	render(){
		const { count, prev, next, currentPage, route }  = this.props; 
		return(
			 <ul className="pagination mr-4">
				<li className="page-item">
					<button type="button" className="page-link"  onClick={(ev) => prev(parseInt(currentPage)-1,route,false)}>Anterior</button>
				</li>
				{Array.from(Array(parseInt(count.count))).map((item,index) => {										  		
					if(item == 0 || item == '0'){
										  			
					}else{
						if(item === undefined){										  				
						let countpage = Math.ceil(parseInt(Array.from(Array(parseInt(count.count))).length)/10);
							if(index < countpage){
								return <li className={(index+1) == currentPage ? "page-item active" : "page-item"} key={index+1}><button type="button" className="page-link" >{index+1}</button></li>;
							}
						}else{
							if(Object.values(item)[0] === "empty"){

							}
						}
					}
										  		
				})}										  	
				<li className="page-item"><button type="button" className="page-link" onClick={() => next(parseInt(currentPage)+1,route,false)}>Siguiente</button></li>
			</ul>
		);
	}
}