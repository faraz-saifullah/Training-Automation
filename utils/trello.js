const request = require("request-promise");

async function createBoard(email, name) {
	let options = {
		method: `POST`,
		url: `https://api.trello.com/1/boards`,
		qs: 
		 { name: name,
		   defaultLabels: `true`,
		   defaultLists: `false`,
		   keepFromSource: `none`,
		   prefs_permissionLevel: `private`,
		   prefs_voting: `disabled`,
		   prefs_comments: `members`,
		   prefs_invitations: `members`,
		   prefs_selfJoin: `true`,
		   prefs_cardCovers: `true`,
		   prefs_background: `blue`,
		   prefs_cardAging: `regular`,
		   key: `f10e060f34ab430fe0d8e89a1c11f98f`,
		   token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` }
	};
	let boardDetails = await request(options);
	boardDetails = JSON.parse(boardDetails);

	options = {
		method: `PUT`,
		url: `https://api.trello.com/1/boards/${boardDetails.id}/members`,
		qs: 
		 { email: `${email}`,
		   key: `f10e060f34ab430fe0d8e89a1c11f98f`,
		   token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` },
		headers: { 'content-type': `application/json`, type: `normal` },
		body: `{"fullName":"${name}"}`
	};
	request(options);
	options = {
		method: 'POST',
		url: `https://api.trello.com/1/boards/${boardDetails.id}/lists`,
		qs: 
		 { name: 'Todo',
		   pos: '1',
		   key: 'f10e060f34ab430fe0d8e89a1c11f98f',
		   token: 'ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165' }
	};
	request(options);
	options = {
		method: 'POST',
		url: `https://api.trello.com/1/boards/${boardDetails.id}/lists`,
		qs: 
		 { name: 'In Progress',
		   pos: '2',
		   key: 'f10e060f34ab430fe0d8e89a1c11f98f',
		   token: 'ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165' }
	};
	request(options);
	options = {
		method: 'POST',
		url: `https://api.trello.com/1/boards/${boardDetails.id}/lists`,
		qs: 
		 { name: 'In Review',
		   pos: '3',
		   key: 'f10e060f34ab430fe0d8e89a1c11f98f',
		   token: 'ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165' }
	};
	request(options);
	options = {
		method: 'POST',
		url: `https://api.trello.com/1/boards/${boardDetails.id}/lists`,
		qs: 
		 { name: 'Done',
		   pos: '4',
		   key: 'f10e060f34ab430fe0d8e89a1c11f98f',
		   token: 'ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165' }
	};
	request(options);
	return boardDetails;
}

module.exports = {
	createBoard,
}
