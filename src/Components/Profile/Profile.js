import React from 'react' ;
import Navigation from '../Navigation/Navigation';
import CreateContest from '../CreateContest/CreateContest';


const Profile = ({UserName}) =>{
	return(
		<div>
			<Navigation/>
			<div>
				<h1>{UserName}</h1>
				<h2>your rank is 100</h2>
			</div>
		</div>
	);
};

export default Profile;