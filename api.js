// Response object from the GET request
const puzzle_instance_get = {
	puzzleName: String,
	image: String,
	time: new Date,
	}

// Request object to POST game data
const puzzle_post_req = {
		puzzleName: String,
		characterName: String,
		location: [Number, Number],
	}

// Response object to the POST reques
const puzzle_post_res = {
	correct: Boolean,
	win: Boolean,
	iD: String,
	}

// Request object to post name to leaderboard
const leaderbord_post_req = {
	name: String,
	iD: String,
	}

