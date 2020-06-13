
const routes = {
	institutions: {
		add:"https://f916157f3bc2.ngrok.io/learnfromhouse/institutions_/add/",
		list:"https://f916157f3bc2.ngrok.io/learnfromhouse/institutions_/list/",
		update:"https://f916157f3bc2.ngrok.io/learnfromhouse/institutions_/update/",
		delete:"https://f916157f3bc2.ngrok.io/learnfromhouse/institutions_/delete/"
	},

	groups: {
		add:"https://f916157f3bc2.ngrok.io/learnfromhouse/groups_/add/",
		list:"https://f916157f3bc2.ngrok.io/learnfromhouse/groups_/list/",
		listforid:"https://f916157f3bc2.ngrok.io/learnfromhouse/groups_/listforid/",
		update:"https://f916157f3bc2.ngrok.io/learnfromhouse/groups_/update/",
		delete:"https://f916157f3bc2.ngrok.io/learnfromhouse/groups_/delete/"
	},

	teachers: {
		addCredentials:"https://f916157f3bc2.ngrok.io/learnfromhouse/teachers_/addcredentials/",
		add:"https://f916157f3bc2.ngrok.io/learnfromhouse/teachers_/add/",
		list:"https://f916157f3bc2.ngrok.io/learnfromhouse/teachers_/list/",
		update:"https://f916157f3bc2.ngrok.io/learnfromhouse/teachers_/update/",
		delete:"https://f916157f3bc2.ngrok.io/learnfromhouse/teachers_/delete/"
	},

	students: {
		addCredentials:"https://f916157f3bc2.ngrok.io/learnfromhouse/students_/addcredentials/",
		add:"https://f916157f3bc2.ngrok.io/learnfromhouse/students_/add/",
		list:"https://f916157f3bc2.ngrok.io/learnfromhouse/students_/list/",
		listforinstitution:"https://f916157f3bc2.ngrok.io/learnfromhouse/students_/listforinstitution/",
		loadforinstitution:"https://f916157f3bc2.ngrok.io/learnfromhouse/students_/loadforinstitution/",
		searchforinstitution:"https://f916157f3bc2.ngrok.io/learnfromhouse/students_/searchstudentforinstitution/",
		update:"https://f916157f3bc2.ngrok.io/learnfromhouse/students_/update/",
		delete:"https://f916157f3bc2.ngrok.io/learnfromhouse/students_/delete/"
	},

	inscriptions:{
		add:"https://f916157f3bc2.ngrok.io/learnfromhouse/inscriptions_/add/",
		listforinstitution:"https://f916157f3bc2.ngrok.io/learnfromhouse/inscriptions_/listforinstitution/",
		loadforinstitution:"https://f916157f3bc2.ngrok.io/learnfromhouse/inscriptions_/loadforinstitution/",
		searchforinstitution:"https://f916157f3bc2.ngrok.io/learnfromhouse/inscriptions_/searchstudentforinstitution/",
		delete:"https://f916157f3bc2.ngrok.io/learnfromhouse/inscriptions_/delete/",
	},

	courses: {
		add:"https://f916157f3bc2.ngrok.io/learnfromhouse/courses_/add/",
		list:"https://f916157f3bc2.ngrok.io/learnfromhouse/courses_/list/",
		listId:"https://f916157f3bc2.ngrok.io/learnfromhouse/courses_/listforid/",
		update:"https://f916157f3bc2.ngrok.io/learnfromhouse/courses_/update/",
		delete:"https://f916157f3bc2.ngrok.io/learnfromhouse/courses_/delete/"
	},

	tasks: {
		add:"https://f916157f3bc2.ngrok.io/learnfromhouse/tasks_/add/",
		list:"https://f916157f3bc2.ngrok.io/learnfromhouse/tasks_/list/",
		listId:"https://f916157f3bc2.ngrok.io/learnfromhouse/tasks_/listforid/",
		update:"https://f916157f3bc2.ngrok.io/learnfromhouse/tasks_/update/",
		delete:"https://f916157f3bc2.ngrok.io/learnfromhouse/tasks_/delete/"
	},

	specialties: {
		list:"https://f916157f3bc2.ngrok.io/learnfromhouse/specialties_/list/"
	},

	login: {
		login:"https://f916157f3bc2.ngrok.io/learnfromhouse/login_/login/"
	},
	

	baseurl: {
		url: "https://f916157f3bc2.ngrok.io"
	}
};


export default routes;
