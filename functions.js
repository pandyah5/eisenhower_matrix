// The variable to store the urgency and importance points
let data = new Map();

// Function to add the task item supplied by the user
function add_item () {
	// Create an entry for the new task on the list
	let taskname = document.getElementById("taskname").value;
	document.getElementById("To_do_list").innerHTML += ('<li id="'+ taskname +'">' + taskname);
	document.getElementById("To_do_list").innerHTML += ('<button id="btn_'+taskname+'" class="cancel" type="button" onclick="delete_item(\'' + taskname + '\')">X</button> </li>');
	
	// Add the task to the data hashmap with its U and I params
	let urgency = document.getElementById("urgency").value;
	let importance = document.getElementById("importance").value;
	let scatter_point = {x: urgency, y: importance};
	data.set(taskname, scatter_point);
	
	// For debug let us print all elements of data
	for (const [key, value] of data) {
		console.log(key + " is mapped to: " + value.x + ", " + value.y);
	}
	
	// Update the eisenhower matrix
	update_eisenhower_matrix();

	return;
}

// Function to delete the task item when the "X" button is clicked
function delete_item(taskname) {
	// Delete the text entry
	let elem = document.getElementById(taskname);
	elem.parentNode.removeChild(elem);

	// Delete the "X" button associated with it
	document.getElementById("btn_" + taskname).remove();
	
	// Delete the entry from the data hashmap
	data.delete(taskname);
	
	// Update the eisenhower matrix
	update_eisenhower_matrix();

	return;
}

function update_eisenhower_matrix () {
	// Extract the plot points and labels from data
	let plot_data = [];
	let plot_labels = [];
	let plot_colors = [];
	for (const[key, value] of data) {
		plot_labels.push(key);
		plot_data.push(value);
		
		// We will color code each quadrant
		if (value.x < 0 && value.y > 0) {
			plot_colors.push("rgba(0,0,150,1)");     // Blue
		}
		else if (value.x > 0 && value.y > 0) {
			plot_colors.push("rgba(240,160,13,1)");  // Orange
		}
		else if (value.x < 0 && value.y < 0) {
			plot_colors.push("rgba(0,150,0,1)");     // Green
		}
		else if (value.x > 0 && value.y < 0) {
			plot_colors.push("rgba(150,0,0,1)");     // Red
		}
		else {
			plot_colors.push("rgba(70,70,60,1)");    // Gray
		}
	}
	
	// Get the chart and edit the values
	myChart.data.datasets[0].pointBackgroundColor = plot_colors;
	myChart.data.datasets[0].labels = plot_labels;
	myChart.data.datasets[0].data = plot_data;
	
	// Update the chart
	myChart.update();
}

function change_matrix_state() {
	let elem = document.getElementById('matrix_mode_toggle_btn');
	let txt = elem.textContent;
	
	if (txt == 'Show Matrix') {
		elem.textContent = 'Hide Matrix';
	}
	else {
		elem.textContent = 'Show Matrix';
	}
}