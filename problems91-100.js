import gf from './generalFunctions.js'

const __dirname = import.meta.dirname



//Problem 99 - Largest exponential

//Given a base number and an exponent, can we easily determine the number of digits easily?

	//Any number that can be broken up (represented) as a product of numbers, has a digit slot for each "10"...
		//^ nevermind, log base 10 is the key here
		//comparing two numbers, we can take the log base 10 on both sides of the comparision
			//instead of working with very large numbers, we end up with much smaller numbers	

	//Post working solution: yeah treating numbers in logarithmic form is the key to simplifying this problem
function p99() {
	let res = null 
	let max = null
	gf.fetchData(__dirname + '/0099_base_exp.txt').then((res) => {
		const data = res.split('\n').map((pair) => pair.split(','))

		res = 1 // first line is the max until we determine the numerical value of the next 999 lines
		max = data[0][1] * Math.log10(data[0][0])
		for (let line = 1; line < data.length; line++) {
			const [base, exponent] = data[line]
			
			const exp = exponent * Math.log10(base)
			if (exp  > max) {
				res = line + 1
				max = exp
			}
		}

		console.log(`The line with the longest numerical value is line ${res} with base:${data[res - 1][0]} and exponent:${data[res - 1][1]}`)
	})

}

// p99()

function p100() {
	
}