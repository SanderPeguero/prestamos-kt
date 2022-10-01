import mysql from 'mysql'

let ConnectionData = {
	/*host: 'localhost',
	user: 'root',
	password: '',
	database: 'heroku_292054ce91253dd'*/
	host: 'us-cdbr-east-06.cleardb.net',
	user: 'b458fc28443a1f',
	password: '84bca60a',
	database: 'heroku_d8d052703441713'
}

let Connection = mysql.createConnection({
	host: ConnectionData.host,
	user: ConnectionData.user,
	password: ConnectionData.password,
	database: ConnectionData.database
})

function ConnectionStart() {

	try {
		Connection.destroy()
		Connection = mysql.createConnection({
			host: ConnectionData.host,
			user: ConnectionData.user,
			password: ConnectionData.password,
			database: ConnectionData.database
		})

		return Connection

	} catch (err) {

		console.log("Restarting Connection..." + err)
		Connection.on('error', ConnectionStart())

	}


}

export { Connection, ConnectionStart } 