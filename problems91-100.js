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


//Problem 100 - Arranged Probability 

//I suck at probability. 

//If we had a stack of over 10^12 discs made of blue and red discs, how many are blue discs such that the probability of getting 2 blue discs in a row is exactly 50%

//let x = the number of blue discs in 
//let y = number of red discs 
// x + y = z, z >= 10^12

//so... what? ->  (x / z) * (x - 1) / (z - 1) = .5

// eq1: x + y = z
// eq2: (x / z) * (x - 1) / (z - 1) = .5
// eq3: ?

//x = ? , y = ?, z = ? 3 unknowns, 2 equations - if we were to assume random values for z, we'd be working with 2 equations 2 unknowns, is there a solution without checking random values > 10^12?

///hmmm... (x / z) * (x - 1) / (z - 1) = .5, we're looking for x(x - 1) / (z)(z-1) = 1 / 2
// => 2x(x - 1) = z(z - 1)
// => 2x^2 - 2x = z^2  - z, could we plug and chug? Use values of z >= 10^12 and determine a whole number x?
// => 2x^2 - 2x - (z^2 - z) = 0, quadratic formula to determine x?
		// x = -b +- sqrt(b^2 - 4ac) / 2a? => a and b is fixed at 2, c is whatever is evaluated from our value of z
			//search for a whole postiive value x?

//if we're still assuming random values of z, we can use the closest value of x that gets us 1/2. if its exactly we're good, if it never reaches 1/2, try another value of z
	//but... that results in using quadratic formula anyways to determine the value x

//There has to be a better way without assuming values of z


//Assumption of z approach
function p100(z) {
	let res = null

	while(res === null) {
		const c = -(Math.pow(z, 2) - z)

		const x = (2 + Math.sqrt(4 - (4 * 2 * c))) / 4 // since values a and b of quadratic is fixed, I used literal values instead of variable
		if (Number.isInteger(x)) {
			//second layer check
			const l = x / z
			const r = (x - 1) / (z - 1)
			console.log(`l = ${l}, r = ${r} and l * r = ${l * r}`)
			if (l * r === .5) {
				// res = x
				return `AYYO its this one!!!! x:${x} for z:${z}, c:${c} `
			}

		}
		// (x/z) * (x-1)/(z-1) = 1/2 => x(x-1) = z(z-1) / 2 => x^2 - x - (z(z-1) / 2)	\
		console.log(x,z, x / z * (x - 1) / (z - 1))
		return;
		z++
	}
}
85/120, 84/119, 17/2, 7/119
console.log(p100(120))

let x = 707106802629
let z = 1000000030324

console.log((x / z) * (x - 1) / (z - 1))