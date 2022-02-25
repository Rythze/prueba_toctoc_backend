const systemInformation = require('./service/systemInformation')
const sqlite = require('./repository/sqlite')
const EventEmitter = require('events');
require('dotenv').config();

const delay = process.env.DELAY_AMOUNT;
const limit = process.env.MIN_DISCONNECT * 60;
let iteracion = 1;

async function init() {
	if (delay === null || delay === '' || delay === undefined) {
		throw "Delay es necesario para el proceso"
	}

	if (limit === null || limit === '' || limit === undefined) {
		throw "Limit es necesario para el proceso"
	}
	const evento = new EventEmitter()

	evento.on('iniciarConexion', async () => {
		console.log("Conectado a la base de datos")
	})
	evento.on('terminarConexion', () => { sqlite.closeDB() })
	evento.on('insertarMetrica', (uuid, memoria, hostname) => { sqlite.insertData(uuid, memoria, hostname) })
	// evento.on('removerMetrica', () => { console.log('metrica removida de la bd') })

	evento.emit('iniciarConexion')

	const limitedInterval = setInterval(async () => {
		iteracion++
		const uuid = await systemInformation.getUuid()
		const memoria = await systemInformation.getMemory()
		const hostname = await systemInformation.getHostname()
		evento.emit('insertarMetrica', uuid.uuid, memoria.active, hostname.hostname)
		if (iteracion > limit) {
			evento.emit('terminarConexion')
			clearInterval(limitedInterval);
		}
	}, delay * 1000);
}

init();