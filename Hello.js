import React from 'react';

const Hello = () => {
	const date = new Date();
	const hours = date.getHours();
	let timeNow;

	if(hours < 11){
		timeNow = "morning"
	}else if(hours >= 11 && hours < 18){
		timeNow = "afternoon"
	}else{
		timeNow = "night"
	}

	return (
		<h2>Good {timeNow}!</h2>
	)
}

export default Hello;