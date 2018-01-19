const React = require("react");
const ListItem = require("./item");

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arr: [],
			petName: "",
			petOwner: "",
			date: "",
			time: "",
			textarea: "",
			sortField: "date",
			searchField: ""
		}
	}

	getInfo(e, flag) {
		let text = e.target.value;
		console.log(text);

		let obj = {}
		obj[flag] = text;

		this.setState(obj);
	}

	createNote(e) {
		e.preventDefault();
		
		let notePetNameText = this.state.petName;
		let notePetOwnerText = this.state.petOwner;
		let noteDateText = this.state.date;
		let noteTimeText = this.state.time;
		let noteTextareaText = this.state.textarea;

		if (notePetNameText !== "" & notePetOwnerText !== "" 
			& noteDateText !== "" & noteTimeText !== "" 
			& noteTextareaText !== "") {
			let id = this.generateId();
			let obj = {
				petName: notePetNameText,
				petOwner: notePetOwnerText,
				date: noteDateText,
				time: noteTimeText,
				textarea: noteTextareaText,
				key: id
			}
			let currentArr = this.state.arr;
			currentArr.push(obj);
			this.setState({
				arr: currentArr,
				petName: "",
				petOwner: "",
				date: "",
				time: "",
				textarea: ""
			});
			console.log(this.state.arr);
		}
	}

	generateId() {
		this.uId = this.uId || 0;
		return this.uId++;
	}

	deleteNote(index) {
		let arr = this.state.arr;
		arr.splice(index, 1);
		this.setState({arr: arr});
	}

	sortArr(arr, field) {
		if (field !== "sort") {
			arr.sort( (a, b) => {
				if(a[field].toLowerCase() > b[field].toLowerCase()) {
					return 1
				}
				else {return -1}
			})
		}
	}

	setSort(e) {
		let field = e.target.value;
		this.setState({sortField: field});
	}

	showForm(click) {
		this.formContent.classList.toggle("open");
	}

	/*filterFn (e, item, index, arr) {
		let text = e.target.value;
		console.log(text);
		return arr.indexOf(item) > text;	
	}*/
	setFilter (e) {
		let search = e.target.value;
		this.setState({searchField: search});
		console.log(search);
	}
	/*filterArr(arr) {
		arr.filter(this.filterFn());
		this.createNote();
	}*/

	render() {

		let arr = this.state.arr.concat([]);
		this.sortArr(arr, this.state.sortField);
		console.log(arr);
		
		let a = this.state.searchField;
		arr.filter(function(a){
			return a !== -1;
		});

		let items = arr.map( (item, index) => {
			return <ListItem 
			petName={item.petName} 
			petOwner={item.petOwner}
			date={item.date}
			time={item.time}
			textarea={item.textarea}
			key={item.key} 
			itemIndex={index}  
			deleteSingleNote={this.deleteNote.bind(this)}/>
		});

		return (
			<div className="wrapper">
				<div className="form">
					<div className="form__heading">
						<h2 onClick={this.showForm.bind(this)}>+ Add Appointment</h2>
					</div>
					<div className="form__content" ref={formContent => this.formContent = formContent}>
						<form>
							<ul className="form__content-list">
								<li>
									<label htmlFor="name">Pet Name</label>
									<input
									onChange={ e => { this.getInfo(e, "petName") } }
									value={this.state.petName} 
									className="petName" 
									type="text" 
									name="name" 
									placeholder="Pet's Name"/>
								</li>
								<li>
									<label htmlFor="owner">Pet Owner</label>
									<input 
									onChange={ e => { this.getInfo(e, "petOwner") } }
									value={this.state.petOwner} 
									className="petOwner" 
									type="text" 
									name="owner" 
									placeholder="Owner's Name"/>
								</li>
								<li className="form__content-time">
									<label htmlFor="date">Date</label>
									<input 
									onChange={ e => { this.getInfo(e, "date") } }
									value={this.state.date}
									className="date"
									type="date" 
									name="date"									 
									placeholder="dd/mm/yyyy"/>
									<label htmlFor="time">Time</label>
									<input
									onChange={ e => { this.getInfo(e, "time") } }
									value={this.state.time} 
									type="time" 
									name="time"/>
								</li>
								<li>
									<label htmlFor="notes">Apt. Notes</label>
									<textarea 
									onChange={ e => { this.getInfo(e, "textarea") } }
									value={this.state.textarea}
									className="textarea"
									name="notes" 
									cols="75" rows="6" 
									placeholder="Appointment Notes">
									</textarea>
								</li>
								<li>
									<button className="btnAdd" onClick={this.createNote.bind(this)}>Add Appointment</button>
								</li>
							</ul>
						</form>
					</div>
				</div>

				<div className="search">
					<input type="search" onChange={ e => { this.setFilter(e) } } placeholder="Search"/>
					<select onChange={this.setSort.bind(this)}>
						<option value="sort">Sort By:</option>
						<option value="petName">By Name</option>
						<option value="petOwner">By Owner</option>
						<option value="date">By Date</option>
						<option value="time">By Time</option>
					</select>
				</div>

				<div className="notes">
					{items}
				</div>
		</div>
		)
	}
}

module.exports = List;
