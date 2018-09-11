import web3 from 'public-modules/Utilities/Web3Client';
import config from 'public-modules/config';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function* stubbed() {
	yield sleep(2000).then(() => '1');
	yield sleep(2000).then(() => '2');
	return sleep(2000).then(() => '3');
}


const runPoll = () => new Promise(resolve => {
	console.log('enter promise')

	const poll = generator => {
		console.log('enter poll')

		if (!generator) {
			generator = stubbed()
		}

		const p = generator.next()
		console.log(p)

		p.value.then(value => {
			console.log(value);
			if(!p.done) {
				console.log('not done')
				poll(generator)
			} else {
				resolve(value)
			}
		})
	}

	poll()
})

const tokenValidation = values => {
	return runPoll().then(a => {
		console.log('result', a)
	})
}

export default {
	tokenValidation
}