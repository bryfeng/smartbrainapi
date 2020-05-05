const handleRegister = (req, res, db, bcrypt) => { /*receive dependency injection */
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submission')
	}
	const hash = bcrypt.hashSync(password);
	//transactions 
		db.transaction(trx =>{
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			//returned email goes into loginEmail
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name: name,
						joined: new Date()
				})
				.then(user =>{
					res.json(user[0]);
				})
			})
			//need to commit in order to store in db
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to register'))
	//always remember to send some type of response
}


module.exports = {
	handleRegister: handleRegister
};