const React = require("react");

function ListItem(props) {
	return (
		<div className="notes__item">	
			<ul>
				<li className="notes__item-close"><button onClick={()=>props.deleteSingleNote(props.itemIndex)}>x</button></li>
				<li className="notes__item-content">
					<h3>{props.petName}</h3>
					<p><span>Owner: </span>{props.petOwner}</p>
					<p>{props.textarea}</p>
				</li>
				<li className="notes__item-date"><p>{props.date}{" "}{props.time}</p></li>
			</ul>
		</div>
	)
}

module.exports = ListItem;
