const gf = require(__dirname + '/generalFunctions.js')

//Problem 31 Coin sums british version


//Note: This algorithim works the way it does because we're working with the currency values sorted 
// function problem31(target) {
// 	const currencyValues = [1, 2, 5, 10, 20, 50, 100, 200]; // the LTG sorted nums makes our combination process much easier and concise
// 	let res = 0

// 	//combination style because order does not matter, repetitive use of currency is allowed
// 	//start from greatest to least,
// 		//check sum currency pointer value to >= target,
// 			//if >= target, remove current, and check next currency 
// 			//else we keep adding current pointer value
// 		//do this until we've exhausted all our options

// 	let basePointer = currencyValues.length -1
// 	console.log(`Checking for target sum of ${target}`)
// 	while (basePointer >= 0) {
// 		const baseValue = currencyValues[basePointer]
// 		let baseCount = Math.floor(target / baseValue)//min value such that base Count * base value <= target
// 		let pointer = basePointer


// 		let sum = baseValue * baseCount // sum currently includes n base values, summing up to a value <= target
// 		// while(baseCount > 0) {
// 		// 	sum = baseValue * baseCount
// 		// 	if (sum === target) {
// 		// 		res++

// 		// 	}
// 		// }
// 		while(baseCount > 0 && pointer >= 0) {
// 			// sum += currencyValues[pointer]
// 			if (sum >= target) {
// 				// if (sum === target) res++;
// 				if (sum === target) {
// 					console.log('sup,', pointer, basePointer)
// 					res++
// 				}

// 				//either way, we decrement current pointer value from our sum, decrement pointer
// 				sum -= currencyValues[pointer]

// 				if (sum === 0) break;
// 				pointer--
// 			} else {
// 				//less than, keep adding
// 				//do nothing, keep pointer where it is
// 			}
// 		}

// 		basePointer--
// 	}

// 	return res
// }

function problem31 (target, currencyValues = [1, 2, 5, 10, 20, 50, 100, 200]) {
	let res = 0


	function helper(sum, index) {
		if (index === currencyValues.length) return;
		sum += currencyValues[index]

		if (sum === target) {
			
			res++
		} else if (sum < target) {
			// helper(sum, index, nums.slice())
			// helper(sum, index + 1, nums.slice())
			for (let i = index; i < currencyValues.length; i++) {
				helper(sum, i);
			}
		}
	}

	let i = 0
	while (currencyValues[i] <= target) {
		helper(0, i)
		i++
	}
	return res
}

function dpProblem31(target, currencyValues = [1, 2, 5, 10, 20, 50, 100, 200]) {
	const dp = new Array(target + 1).fill(0) // dp[i] = number ways to make i
	dp[0] = 1
	
	for (const currencyVal of currencyValues) {
		let i = currencyVal;
		while (i <= target) {
			dp[i] += dp[i - currencyVal]
			i++
		}
	}

	return dp[target]
}

// for our combination tests our "leftmost sum digit" is n numbers of the basePointer number, if n is 0, decrement base pointer, so we start at the min val n such that n * (base val) <= target
// console.log(`There are ${problem31(1)} different ways to make 1 pence using british currency`)
// console.log(`There are ${problem31(2)} different ways to make 2 pence using british currency`)
// console.log(`There are ${problem31(5)} different ways to make 5 pence using british currency`)
// console.log(`There are ${problem31(10)} different ways to make 10 pence using british currency`)
// console.log(console.log(`There are ${problem31(20)} different ways to make 20 pence using british currency`))
// console.log(`There are ${problem31(50)} different ways to make 50 pence using british currency`)
// console.log(`There are ${problem31(100)} different ways to make 1 pound using british currency`)
// console.log(`There are ${problem31(200)} different ways to make 2 pounds using british currency`)

let totalRuntime1 = 0
let totalRuntime2 = 0
// for (let i = 1; i <= 200; i++) {
// 	// console.log(`There are ${problem31(i)} different ways to make ${i} pence using british currency`)
// 	// console.log(`Solution 1:${problem31(i)} vs Solution2:${dpProblem31(i)}`)


// 	let startTime = performance.now()
// 	const sol1 = problem31(i)
// 	const sol1Runtime = performance.now() - startTime

// 	startTime = performance.now()
// 	const sol2 = dpProblem31(i)
// 	const sol2Runtime = performance.now() - startTime

// 	totalRuntime1 += sol1Runtime
// 	totalRuntime2 += sol2Runtime
// 	console.log (
// 		`Target:${i}\nSolution1:${sol1} with runtime ${sol1Runtime} at an average of ${totalRuntime1 / i}\nSolution2:${sol2} with runtime ${sol2Runtime} at an average of ${totalRuntime2 / i}`
// 	)
// }
//order doesn't matter 


//Recursive approach
	//use of stack? 
//DP approach



//Problem 32 Pandigital Products

//Pandigtal Number - An n-digit number is pandigital if that number includes the digits 1 to 5 exactly once
// 15432, 52314, 654321 are all pandigital numbers
// The Multiplicand, Multiplier and Product 38 * 186 = 7254 is Pandigital
// Find sum of all products whose multiplication identity is Pandigital
//	Ex: 38 * 186 = 7254 


//Okay how the fuck do I do this

//let n = i + j + k, n = 9 fixed
	//i = number of digits in multiplicand = where digits arre made up of digits i_0, i_1, ... 
	//j = number of digits in multiplier = where digits are made up of digits j_0, j_1 ...
	//k = number of digits in the product = where digits are made up of digits k_0, k_1 ...
		//such that no digits of i, j, or k are the same


//Brute force? 
/*
test 1 digit vs 7 digit check for 1 digit 
test 1 digit vs 6 digit check for 2 digits
test 1 digit vs ... down to 1 digit for ... 9 - 1 -1 digits

test 2 digits vs 6 digits check for 1 digit
test 2 digits vs 5 digits check for 2 digits

...

test 7 digits vs 1 digit check for 1 digit
 */

//exhausted
function problem32() {
	let baseLeftDigitCount = 1
	let baseRightDigitCount = 7

	const pandigitalProductSet = new Set()
	while (/*baseLeftDigitCount <= 7*/baseLeftDigitCount <= 4 ) {
		// let leftDigitCount = baseLeftDigitCount
		let rightDigitCount = baseRightDigitCount

		while (rightDigitCount > 0) {
			//test all left digit numbers against right digit numbers
			let leftMin = Math.pow(10, baseLeftDigitCount - 1)
			let leftMax = Math.pow(10, baseLeftDigitCount) - 1 // 10-99, 100-999, 1000 - 9999 etc

			let rightMin = Math.pow(10, rightDigitCount - 1)
			let rightMax = Math.pow(10, rightDigitCount) - 1

			for (let left = leftMin; left <= leftMax; left++) {
				for (let right = rightMin; right < rightMax; right++) {
					//check if left number and right number have any digits in common
					const seenDigits = {}
					// const leftStr = `${left}`
					// for (const strDigit of leftStr) {
					// 	if (seenDigits[strDigit] === undefined) {
					// 		seenDigits[strDigit] = true //not undefined
					// 	} else {
					// 		//exists, check next
					// 		break;
					// 	}
					// }

					// for (const strDigit of rightStr) {
					// 	if (seenDigits[strDigit] === undefined) {
					// 		seenDigits[strDigit] = true
					// 	} else {
					// 		break;
					// 	}
					// }

					// //check result for digit count
					// const product = left * right
					// const strProduct = `${product}`
					// if (strProduct.length !== (9 - rightDigitCount - baseLeftDigitCount)) break;
					// //check result for duplicate digits
					// for (const strDigit of strProduct) {
					// 	if (seenDigits[strDigit] !== undefined) {
					// 		seenDigits[strDigit = true]
					// 	}
					// }

					const product = left * right
					const strNums = [`${left}`, `${right}`, `${product}`]	
					let totalDigitCount = 0
					let uniqueDigits = true

					for (const strNum of strNums) {
						totalDigitCount += strNum.length
					}
					if (totalDigitCount !== 9) break;

					for (const strNum of strNums) {
						let i = 0
						while (uniqueDigits && i < strNum.length) {
							const strDigit = strNum[i]
							if (seenDigits[strDigit] !== undefined || strDigit === '0') {
								uniqueDigits = false
								break;
							} 


							seenDigits[strDigit] = true
							i++
						}
						totalDigitCount += strNum.length
					}
					//if none of the above, check if product has been counted, include it. Might just use a set.
					if (uniqueDigits) {
						console.log(`${strNums} makes the a 1-9 pandigital product identity`)
						pandigitalProductSet.add(product)
					}
				}
			}
			rightDigitCount--
		}
		baseLeftDigitCount++
		baseRightDigitCount--
	}

	console.log(pandigitalProductSet)
	let pdProductSum = 0
	for (const product of pandigitalProductSet) {
		pdProductSum += product
	}

	console.log(`The sum of all pandigital product identities 1-9 is ${pdProductSum}`)
	return pdProductSum
}

// function testFunc() {
// 	const baseLeftDigitCount = 2
// 	const rightDigitCount = 3
// 	let leftMin = Math.pow(10, baseLeftDigitCount - 1)
// 	let leftMax = Math.pow(10, baseLeftDigitCount) - 1 // 10-99, 100-999, 1000 - 9999 etc

// 	let rightMin = Math.pow(10, rightDigitCount - 1)
// 	let rightMax = Math.pow(10, rightDigitCount) - 1

// 	for (let left = leftMin; left <= leftMax; left++) {
// 		for (let right = rightMin; right <= rightMax; right++) {
// 			//check if left number and right number have any digits in common
// 			const seenDigits = {}

// 			const product = left * right
// 			const strNums = [`${left}`, `${right}`, `${product}`]
// 			let totalDigitCount = 0
// 			let uniqueDigits = true

// 			for (const strNum of strNums) {
// 				totalDigitCount += strNum.length
// 			}
// 			if (totalDigitCount !== 9) break;
// 			// console.log('Sup', left, right, product)
// 			for (const strNum of strNums) {
// 				let i = 0
// 				while (uniqueDigits && i < strNum.length) {
// 					const strDigit = strNum[i]
// 					if (seenDigits[strDigit] !== undefined || strDigit === '0') {
// 						uniqueDigits = false
// 						break;
// 					} 


// 					seenDigits[strDigit] = true
// 					i++
// 				}
// 			}

// 			if (totalDigitCount === 9 && uniqueDigits) {
// 				console.log(`${left} * ${right} = ${product} is a pandigital product identity`)
// 			}
// 		}
// 	}
// }

// problem32()
// testFunc()

//Problem 33 Digit Cancelling Fractions 

//There are 4 non-trival digit cancelling fractions with fraction n / d where 10 <= n, d <= 99, and n / d < 1
function problem33() {
	let n = 10
	const resArr = []
	let res = 1
	while (n < 100) {
		let d = n + 1
		while (d < 100) {
			const strN = `${n}`
			const strD = `${d}`

			if (strN[1] === strD[0]) {
				const incorrectMethod = parseInt(strN[0]) / parseInt(strD[1])

				if (incorrectMethod === n / d) {
					console.log(`${n}/${d} will still result in the correct answer in its lowest form`)
					resArr.push(`${strN[0]}/${strD[1]}`)
					res *= parseInt(strD[1])
				}
			}
			d++
		}
		n++
	}

	
	console.log(`The product of the 4 non-trival curious fractions, ${resArr}, has a denominator of ${res} in its lowest common term (form sounds better...)`)
	return resArr
}

// console.log(problem33())


//Problem 34 Digit Factorials 
// 145 => 1! + 4! + 5! = 145, find all numbers such that the factorial of their digits summed togetherr equals the number
// return the sum of all those numbers

// Single digit numbers are excluded because theres no sum involved, 1! = 1, 2! =  2
function problem34() {
	const curiousNumbers = []

	const factorials = [1, 1]
	for (let i = 2; i < 10; i++) {
		factorials[i] = i * factorials[i - 1]
	}
	function sumDigitFactorial(num) {
		const digits = []
		let sum = 0 // additive identity 
		while (num > 0) {
			digits.push(num % 10)
			num = Math.floor(num / 10)
		}


		for (const digit of digits) {
			sum += factorials[digit]
		}

		return sum
	}

	let n = 2
	let min = Math.pow(10, n - 1)
	let max = Math.pow(10, n)

	const digitMax = factorials[9]

	while (n * digitMax > min) {
		let i = min;
		while (i < max) {
			if (sumDigitFactorial(i) === i) {
				curiousNumbers.push(i)
			}
			i++
		}
		n++
		min = Math.pow(10, n - 1)
		max = Math.pow(10, n)
	}

	const sum = curiousNumbers.reduce((sum, curr) => sum + curr, 0)
	return {sum, curiousNumbers}

	//Whats the fooking limit?
	// For an n digit number, we'd be summing up n digits, at worst, n digits all equaling 9, 

	// Can we separate into min and max ???

	// we start at 2 digits, 10 = 1, 99 = (9! + 9!way too high
	// 2 digit numbers
		// min = 1 because fuck errors
		// max = 99, 4! = 24, 5! = 120, 5! is way too high, test two digit numbers up to 4
			//=> max digit = 4
	// 3 digit numbers 1 + 1 + 5! = 122 1 + 2! + 5! =
		// min = 1 bc fuck the errors
		// max = 999 < 7! => max digit = 6

	// 4 digit numbers
		// min = 1 bc ... 
		// max = 9999 < 8! => max digit = 7

	// 5 digit numbers
		// max = 99999 < 9! => max digit = 8 bc if any 1 digit is 9, then its greater than any 5-digit number we could possibly look at 

	// 6 digit
		//max = 999999 > 9! => max digit = 9
	// while (/*We figure out the limit ...*/) {

	// }

	// ...

	// min of n digit number is 10 ^ n - 1
	//Eventually for an n digit number, the sum of n, 9!, will always be less than 10 ^ n - 1, that is our limit
		// in mathy terms, let n be the number of digits for a number,
			//while n * 9! > min
				//we check all possibilities for n digits
				//optimization: for n digits, let i be the highest term such that i! < max
					//we can furthur optimize with an incrementer such that m terms of the incrementer
					//is less than our max and the remaining n - m digits are all strictly less than our incrementer
					//we won't do this optmization cause i'm lazy 


}

// const problem34Res = problem34()
// console.log(`The sum of these curious numbers is ${problem34Res.sum}, interestingly enough, there are only ${problem34Res.curiousNumbers.length} of these curious numbers: ${problem34Res.curiousNumbers}`)

//Problem 35 Circular Primes

//we can optimize with memoization
	//for numbers that have been visited during rotation, we can just count them and mark it as visited to avoid repetitive work
function problem35(n) {
	const primeBools = gf.getPrimeBools(Math.pow(10, `${n}`.length))
	let res = 0
	
	//rotates all digits in a strNumber to the left, overflow wraps around
	//maybe (no maybe, it is smarter to rework), rework this function as a string method, shift all characters to the left, same handling for overflow 
	function rotateStrNum(strNum) {
		const strNumArr = strNum.split('')

		const end = strNumArr[0]
		let i = 0
		while(i < strNumArr.length - 1) {
			strNumArr[i] = strNumArr[i + 1]
			i++
		}
		strNumArr[i] = end

		return strNumArr.join('')
	}

	let num = 2
	const circularNumbers = new Set()
	while (num < n) {
		//if the number is prime, check all rotations to see if they're prime
		//if not prime, or we do either n rotations for an n digit number OR, we arrive back at our original number, we're done and we deal with it appropriately

		let strNum = `${num}`
		let numRotations = 0

		if (circularNumbers.has(strNum)) {
			num++
			continue;
		}
		const comboSet = new Set()
		while (primeBools[strNum] && numRotations < strNum.length) {
			comboSet.add(strNum)
			strNum = rotateStrNum(strNum)
			numRotations++
		}
		

		if (numRotations === strNum.length) {
			console.log(`${num} fulfills our circular prime requirement`) 
			res += comboSet.size
			for (const combo of comboSet) {
				circularNumbers.add(combo)
			}
		}
		num++
	}

	return circularNumbers.size
}

// console.log(problem35(1000000))

//Problem 36 Double-base Palindromes
//Find the sum of all numbers less than 1 million where the number is palindromic in base 10 and base 2

function problem36() {
	function isPalindromic(strNum) {
		let left = 0
		let right = strNum.length - 1

		while (left < right) {
			if (strNum[left] !== strNum[right]) {
				return false;
			}
			left++
			right--
		}

		return true
	}

	let i = 1 

	let sum = 0
	while (i < Math.pow(10, 6)) {
		const strNum = `${i}`
		if (isPalindromic(strNum)) {
			const base2Form = i.toString(2)
			if (isPalindromic(base2Form)) {
				sum += i
			}
		}
		i++
	}

	return sum
}

// console.log(`Sum of all decimal numbers less than 1 million that are palindromic in both base 10 and base 2, ${problem36()}`)

//Problem 37 Truncatable Primes
//there are exactly 11 primes that are truncatable primes, which are prime numbers that can have digits removed from left to right or right to left and remain prime throughout

//Is that our limit? go through the list of primes until we find 11?
	//fuck it we find the 11 numbers
//NOTE states that we ignore single digit primes

//3797, 797 97 7, 379 37 3

//we can improve the search with memoization
	//for example for 3797, we know know 3797 from left to right are all prime,
		//so if we ever do a left to right check and we end up at any of those numbers, we know its trunctable left to right
		// do the same for right to left, this will save a loooot of timels



//Yeah so for our limit, we're going to look for the 11 primes and we'll stop when we find 11
function problem37() {
	// const res = []
	const primes = gf.getPrimes(100)
	const primeBools = gf.getPrimeBools(100)

	console.log(primes)
	console.log(primeBools)

	//Memoization to reduce repetitive work
	const trunctableNums = {2:true, 3:true, 5:true, 7:true}
	const leftTrunctable = {...trunctableNums} // nums that are trunctable left to right
	const rightTrunctable = {...trunctableNums} // nums that are trunctable right to left

	// console.log(Object.keys(rightTrunctable).length)
	let i = 4;
	while (Object.keys(trunctableNums).length < 15) {
		const prime = primes[i]
		if (/*prime >= primeBools.length*/ prime === undefined) {
			gf.expandPrimes(primes, primeBools, primeBools.length + 1000000)
			continue;
		}
		console.log(`Checking prime value ${prime}`)

		//check if trunctable from left to right
		//if the prime without the leftmost digit is left trunctable, then the whole digit is left trunctable
		//same concept works right to left, if the number with the rightmost digit is removed, 
		const strPrime = `${prime}`
		if (leftTrunctable[strPrime.substring(1)]) {
			leftTrunctable[strPrime] = true
		}
		
		//check if trunctable from right to left
		if (rightTrunctable[strPrime.substring(0, strPrime.length - 1)]) {
			rightTrunctable[strPrime] = true
		}

		if (leftTrunctable[strPrime] && rightTrunctable[strPrime]) {
			console.log(`${strPrime} is trunctable from both left and right directions`)
			trunctableNums[strPrime] = true
		}

		i++
	}

	const trunctablePrimes = Object.keys(trunctableNums)
	const resValues = trunctablePrimes.filter(primeVal => primeVal.length > 1)
	console.log(`The following prime values are trunctable from left to right ${resValues}`)
	console.log(`The following prime values with more than a single digit are trunctable from left to right ${resValues}`)
	console.log(`The sum is ${resValues.reduce((sum, num) => sum + Number(num), 0)}`)

}	

// problem37()


//we know with integer 9, we get 918273645, is there another integer that returns something greater than that?
function problem38() {
	let res = 0
	// const multipliers = [0, 1,2,3,4,5,6,7,8,9]

	//check if concatenated product is pandigital
	//limit is when concatenated will always be a 10 digit number (no possible ways to get only 1-9 once)
	//concatenated product has to be integer * multipliers 1, 2, 3 .., n where n > 1, so we can't do 1 * 987654321 for an easy solution

	//since we always multiply by 1 first, and we know 918263645 is the current max
	//we want our integer to always start with 9, otherwise the number will guranteed be less than curr max
		//m digit range min = Math.pow(10, m) - Math.pow(10, m - 1) for 1, 2, 3 ... m
		//m digit range max = Math.pow(10, m) exclusive

	//kay lets think about it, a 4 digit number + a 5 digit number gives 9 digit, 1 * 5 digit + 2 * 5 digit will be at least 10 digits, we test up to 4 digit nums
	let m = 1
	let rangeMin = Math.pow(10, m) - Math.pow(10, m - 1)
	let rangeMax = Math.pow(10, m)
	// while (`${rangeMin}${2 * rangeMin}`.length < 10) {
	while(m < 5) {
		console.log('working with min:', rangeMin, ' and max:', rangeMax)
		let num = rangeMin;
		while (num < rangeMax) {
			let seenDigits = {}
			let duplicateDigits = false
			let concatProduct = ``
			let multiplier = 1
			while (concatProduct.length < 9 && !duplicateDigits) {
				const rightOp = `${multiplier * num}`//concatProducrt is our leftOperand

				concatProduct = concatProduct + rightOp
				//digit check
				for (const digit of rightOp) {
					if (seenDigits[digit] || digit === '0') {
						duplicateDigits = true
						break;
					} else {
						seenDigits[digit] = true
					}
				}
				multiplier++
			}

			if (!duplicateDigits) {
				console.log(concatProduct);
			}
			if (concatProduct.length === 9 && !duplicateDigits) {
				console.log(`Pandigital concatenatedProduct for integer ${num}, checking ${concatProduct} against our current max ${res}`)
				res = Math.max(Number(concatProduct), res)
			}
			num++
		}

		m++
		rangeMin = Math.pow(10, m) - Math.pow(10, m - 1)
		rangeMax = Math.pow(10, m)
	}

	return res
}

// console.log(`The highest pandigital concatenated product that we can get is ${problem38()}`)

//Problem 39 Integer right triangles
//Fuck it we brute force a solution

function problem39() {
	let res = 1
	let resSolutions = [] // we don't need to use a list to store solutions, just keep count of number of solutions, we keep this to see what exactly values a b c sum up to p 
	let resP = null
	let p = 3

	while (p <= 1000) {
		let a = 1
		let b = 1
		// let c = p - a - b
		//a ^ 2 + b ^ 2 =  c ^ 2
		//and p = a + b + c
		//c > a || b, c = Math.sqrt(a ^ 2 + b ^ 2)
		const rightTriangleSolutions = []
		while (a < p - 1) {
			const c = p - a - b
			if ((Math.pow(a, 2) + Math.pow(b, 2)) === Math.pow(c, 2)) {
				//we have a right triangle
				rightTriangleSolutions.push([a,b,c])
			}
			b++
			if (b === p) {
				a++
				b = a
			}
		}
		// console.log(`Value p:${p} has ${rightTriangleSolutions.length} and our current max amount of solutions is ${res}`)
		// resSolutions = rightTriangleSolutions.length > res ? rightTriangleSolutions : resSolutions
		if (rightTriangleSolutions.length > res) {
			resSolutions = rightTriangleSolutions
			resP = p
		}
		res = Math.max(rightTriangleSolutions.length, res);
		p++
	}

	//option 1: log res count and solution set (uncessary but i want to) here
	//option 2: return both as a data table (HT whatever you wanna cal it) again because I want to see the solution set
	// return res
	console.log('testtesttest', resSolutions)
	return {res, resSolutions, resP}
}

// const p39 = problem39()
// console.log(`The value p:${p39.resP} contains ${p39.res} triples that sum up to the value ${p39.resP}: with the following solutions:${JSON.stringify(p39.resSolutions)}`)



//Problem 40 Champernowne's Constant
//Math.pow(10, 0) = d_1 * d_10 * ... * d_1000000 = Math.pow(10, 6)
	//=> 10 single digits (9 actually, 1- 9) => 9 digits
	//=> 100 2-digits (10-99) => 200 digits
	//=> 1000 3- digits (100 - 999) => 3000 digits
	//=> 10000 4-digits (1000- 9999) => 40000 digits
	//=> 100,000 5-digits (10k- 99999) => 500000 digits, sum = 543209 digits
	//=> 1 million 6 digits => 6 million digits, d_1000000 exists after adding Math.ceil((1000000 - 543209) / 6) 6 digit numbers
function problem40() {
	let resProduct = 1
	//so if i'm thinking this right, a js array can not hold 1 million digits in each index
	const champsDigits = ['0'] // 0 is a placeholder so can easily identify d_n = Math.pow(10, n) for n = 0, 1, 2, ... 6

	let num = 1
	while(champsDigits.length <= Math.pow(10, 6)) {
		champsDigits.push(...`${num}`.split(''))
		num++
	}

	let n = 0
	while (n <= 6) {
		console.log(`Multiplying value ${champsDigits[Math.pow(10, n)]} against our current product:${resProduct}`)
		resProduct *= champsDigits[Math.pow(10, n)];
		n++
	}
	// return champsDigits
	return resProduct
}

console.log(`The product of the 7 specified digits for Champerowne's constant is ${problem40()}`)