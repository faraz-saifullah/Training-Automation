const request = require("request-promise");
const task = require(`../models`).task;
const sequelize = require(`sequelize`);
const Op = sequelize.Op;

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
		method: `POST`,
		url: `https://api.trello.com/1/boards/${boardDetails.id}/lists`,
		qs: 
		 { name: `Todo`,
		   pos: `1`,
		   key: `f10e060f34ab430fe0d8e89a1c11f98f`,
		   token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` }
	};
	request(options);
	options = {
		method: `POST`,
		url: `https://api.trello.com/1/boards/${boardDetails.id}/lists`,
		qs: 
		 { name: `In Progress`,
		   pos: `2`,
		   key: `f10e060f34ab430fe0d8e89a1c11f98f`,
		   token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` }
	};
	request(options);
	options = {
		method: `POST`,
		url: `https://api.trello.com/1/boards/${boardDetails.id}/lists`,
		qs: 
		 { name: `In Review`,
		   pos: `3`,
		   key: `f10e060f34ab430fe0d8e89a1c11f98f`,
		   token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` }
	};
	request(options);
	options = {
		method: `POST`,
		url: `https://api.trello.com/1/boards/${boardDetails.id}/lists`,
		qs: 
		 { name: `Done`,
		   pos: `4`,
		   key: `f10e060f34ab430fe0d8e89a1c11f98f`,
		   token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` }
	};
	request(options);
	return boardDetails;
}

async function addTtrainer(boardId, trainerEmail, name) {
	let options = {
		method: `PUT`,
		url: `https://api.trello.com/1/boards/${boardId}/members`,
		qs: 
		 {
			email: trainerEmail,
			key: `f10e060f34ab430fe0d8e89a1c11f98f`,
			token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` 
		 },
		headers: { 'content-type': `application/json`, type: `admin` },
		body: `{"fullName":"${name}"}`
	};
	request(options);
}

async function deleteTrainer(boardId, trainerEmail) {
	let options = {
		method: `DELETE`,
		url: `https://api.trello.com/1/boards/${boardId}/members/${trainerEmail}`,
		qs: 
		{ 
			key: `f10e060f34ab430fe0d8e89a1c11f98f`,
		  	token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165`
		}
	};
	request(options);
}

async function createCard(boardId, cardName, checklistNames) {
	boardId = `5cdd4388d1c22689abe87f6d`
	checklistNames = [1,2];
	cardName = `New Card`;
	let options = {
		method: `GET`,
		url: `https://api.trello.com/1/boards/${boardId}`,
		qs:
		{
			boardStars: `none`,
			cards: `none`,
			card_pluginData: `false`,
			checklists: `none`,
			customFields: `false`,
			fields: `name,desc,descData,closed,idOrganization,pinned,url,shortUrl,prefs,labelNames`,
			lists: `open`,
			members: `none`,
			memberships: `none`,
			membersInvited: `none`,
			membersInvited_fields: `all`,
			pluginData: `false`,
			organization: `false`,
			organization_pluginData: `false`,
			myPrefs: `false`,
			tags: `false`,
			key: `f10e060f34ab430fe0d8e89a1c11f98f`,
			token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` 
		} 
	};
	let boardDetails = JSON.parse(await request(options));
	let listId = boardDetails.lists[0].id;
	options = {
		method: `POST`,
		url: `https://api.trello.com/1/cards`,
		qs: 
		{
			name: `${cardName}`,
			desc: `Module Description`,
			pos: `top`,
			idList: `${listId}`,
			keepFromSource: `all`,
			key: `f10e060f34ab430fe0d8e89a1c11f98f`,
			token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` 
		} 
	};
	let cardDetails = JSON.parse(await request(options));
	let cardId = cardDetails.id;
	let tasks = await task
		.findAll({
			raw: true,
			where: {
				id: {
					[Op.or]: checklistNames
				}
			}
		})
	for(let i = 0; i < tasks.length; i++)
	{
		options = {
			method: `POST`,
			url: `https://api.trello.com/1/cards/${cardId}/checklists`,
			qs: 
			 {
				name: `${tasks[i].name}`,
				key: `f10e060f34ab430fe0d8e89a1c11f98f`,
				token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` 
			 } 
		};
		let checklistId =JSON.parse(await request(options)).id;
		options = {
			method: `POST`,
			url: `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
			qs: 
			 {
			  name: `${tasks[i].description}`,
			  pos: `bottom`,
			  checked: `false`,
			  key: `f10e060f34ab430fe0d8e89a1c11f98f`,
			  token: `ab4fdf8435e399b23ded7ebb07c84c574d38e86d38d19a446dd58645fe059165` 
			 } 
		}
		request(options);
	}
}

module.exports = {
	createBoard,
	addTtrainer,
	deleteTrainer,
	createCard
}
