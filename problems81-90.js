import gf from './generalFunctions.js'

const __dirname = import.meta.dirname


//Problem 89 Roman Numerals

//Given a text file containing VALID Roman numerals, but not necessarily in minimal format
	//find number of characters saved by rewriting in the minimal format

//I: Text file of Roman numerals - Valid, not necessarily minimal format
//O: num characters saved
//C
//E

// Thinking two main step process
	//First main step - Read the line and decipher the roman numeral
	//Second main step - Write the numeral in minimal format
//Final step - sum the difference in lengths with our result

//Optimization 
	/*
	- Instead of deciphering in one pass, and then another pass writing a minimal format
	we do some sort of sliding window, trusting that its already valid and using the fact that roman numerals are represented in descending order, we determine whether that portion is written optimally or not
			- if it is, we leave it alone
			- if it isn't, we "mend" that portion and sum the amount of characters saved
	*/

async function p89() {
	let res = 0

	const numeralToNum = {'I': 1, 'V': 5, 'X':10,
												'L': 50, 'C': 100, 'D':500, 'M': 1000}
	const numToNumeral = {'1': 'I', '5': 'V', '10': 'X',
												'50': 'L', '100': 'C', '500':'D', '1000': 'M'}
	//Takes in a string roman numeral
	//returns an int numberr
	function decipher(rNumeral) {
		let num = 0

		let i = 0
		while (i < rNumeral.length - 1) {
			//2 cases comparing current character with character next to it
				//1) L >= R, simple sum of L character, increment index
				//2) L < R, reduce value L from value R, increment index twice
					//we're also working with the expectation that all roman numerals provided are valid
					// => only ONE I, X, or C will be used for the subtractive pair
					// 	  L = 'I' will only precede R = 'V' || 'X',
					// 		L = "X" "       				" R = 'L' || 'C'
					//		L = "L"

			const L = rNumeral[i]
			const R = rNumeral[i + 1]
			if (numeralToNum[L] >= numeralToNum[R]) {
				num += numeralToNum[L]
				i++
			} else {
				num += numeralToNum[R] - numeralToNum[L]
				i += 2
			}
			//exhaust our string
		}
		if (i === rNumeral.length - 1) {
			num += numeralToNum[rNumeral[i]]
		}
		//and return
		return num
	}


	//Given an int num
	//returns a str roman numeral in minmal characters
	function writeNumeral(num) {
		const minRNumeral = []

		while (num >= 1000) {
			//do shit with M
			minRNumeral.push('M')
			num -= 1000
		}

		//considering V, L, D can only appear once, we don't need a while loop for them
		if (num >= 900) {
			//CM
			minRNumeral.push('C', 'M')
			num -= 900
		}

		if (num >= 500) {
			minRNumeral.push('D')
			num -= 500
		}

		if (num >= 400) {
			minRNumeral.push('C', 'D')
			num -= 400
		}
		while (num >= 100) {
			minRNumeral.push('C')
			num -= 100
		}

		if (num >= 90) {
			//XC
			minRNumeral.push('X', 'C')
			num -= 90
		}

		if (num >= 50) {
			minRNumeral.push('L')
			num -=50
		}

		if (num >= 40) {
			minRNumeral.push('X', 'L')
			num -= 40
		}

		while(num >= 10) {
			minRNumeral.push('X')
			num -= 10
		}
		if (num === 9) {
			minRNumeral.push('I', 'X')
			num -= 9 // num = 0
		}

		if (num >= 5) {
			minRNumeral.push('V')
			num -=5
		} 

		if (num === 4) {
			minRNumeral.push('I', 'V')
			num -= 4
		}

		while (num > 0) {
			minRNumeral.push('I')
			num -= 1
		}

		// ZERROOOOOOOO
		return minRNumeral.join('')
	}

	await gf.fetchData(__dirname + '/0089_roman.txt').then((data) => {
		const rNumerals = data.split('\n')

		for (const rNumeral of rNumerals) {
			const num = decipher(rNumeral)
			console.log(`${rNumeral} = ${num}`)
			const minRNumeral = writeNumeral(num)
			console.log(`Written minmally, we get ${minRNumeral}`)
			res += Math.abs(minRNumeral.length - rNumeral.length)
		}
	})

	return res
}


p89().then((THEANSWER) => {
	console.log(`The amount of characters we saved by writing non-minimal roman numerals as minimal as possible is, ${THEANSWER}`)
})
// console.log(`The amount of characters we saved by writing non-minimal roman numerals as minimal as possible is, ${p89()}`)