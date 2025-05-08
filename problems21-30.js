const fs = require('fs')
const gf = require(__dirname + '/generalFunctions.js') // same thing as require('./generalFunctions.js')
// const gf = require('./generalFunctions.js')
// import {strSum} from './generalFunctions.js'
// import { strSum } from './generalFunctions.js';

//Template

//Problem X <Name>

/**
 * Problem Summary
 **/

//Answer:

/** Notes
 * 
 **/




//Problem 21 Amicable Numbers

/**
 * Problem Summary
 * let D(n) be the sum of proper divisors of n (numbers that divide evenly into n except n itself)
 * if D(a) = b and D(b) = a, where a != b, then a and b are amicable pairs and both are amicable numbers
 * Evaluate the sum of all amicable numbers under 10000
 **/

//Answer: 31626

/** Notes
 * Cool thing I noticed, sum of proper divisors of all powers of 2, is 1 less than that number
 * 	-Ex: 2 ^ 3 = 8, proper divisors 1,2,4 sum up to 7
 * 	-ex: 2 ^ 5 = 32, proper divisors 1,2,4,8,16, sum up to 31
 * 		- possible connection or usage with binary numbers?
 **/

//D(n)
	//Get proper divisors of n
	//sum the proper divisors, 
//we can reduce work by marking paired numbers under 10000, so when we reach that number, the work has already been done
	//actually its not even reducing work, its preventing over-work that overestimates the solution

function getProperDivisors(n) {
	if (n < 2) return [];

	const leftDivisors = [1]
	const rightDivisors = []

	let i = 2

	while (i < Math.sqrt(n)) {
		if (n % i === 0) {
			leftDivisors.push(i)
			rightDivisors.unshift(n / i)
		}
		i++
	}
	if (i === Math.sqrt(n)) {
		leftDivisors.push(i)
	}

	return leftDivisors.concat(rightDivisors)
}

function problem21(n) {
	// D[n] = sum of proper divisors of n
	let properDivisorSums = new Array(n)
	// properDivisorSums[0] = 0
	let i = 0 // really we can start at 4 because (2,3) is prime or 0,1 whatever the hell we want to call those numbers, they have a proper divisor sum of 0, D(0) = 0, but it adds 0 to the sum, so we don't carre

	while(i < n) {
		properDivisorSums[i] = getProperDivisors(i).reduce((acc, curr) => acc + curr, 0)
		i++
	}

	const amicableNumbers = []
	for (let num = 4; num < properDivisorSums.length; num++) {
		const sum = properDivisorSums[num]
		if (sum >= 10000) continue;

		//D(a) = b && D(b) = a, first condition is already true, we check for second
		if (sum !== num && properDivisorSums[sum] === num) {
			amicableNumbers.push(num, sum)
			//set D(b) = 0 to prevent double counting when we reach b
			properDivisorSums[sum] = 0
		}
	}

	return amicableNumbers.reduce((acc, curr) => acc + curr, 0)
}

// console.log(problem21(10000))


//Problem 22 Names Score

/**
 * Given a names.txt file with over 5000 names, 
 * Sort the names in alphbetical orderr
 * Then work out the alphabetical value for each name, multiply that value by its position in the list to obtain a name score
 * 	-Name score = alphabetical value * position in list
 * What is the total name score 
 **/

//Answer: 871198282

/** Notes
 * //Assumptions being made: Position in list starts at 1 and not 0, A = 1, Z = 26, Characters are all Upper case
 **/

const problem22Promise = fs.promises.readFile(__dirname + '/problem22Names.txt', 'utf-8');


//Given a name, return its alphabetical value
function problem22Helper(name) {
	// let sum = 0
	// for (const char of name) {
	// 	sum += char.charCodeAt(0) - 64
	// }
	// return sum
	return name.split('').reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);
}


//Problem 22 Solution output 
// problem22Promise.then((data) => {
// 	let totalScore = 0

// 	const names = data.split(',')
// 	names.sort()

// 	// for (let i = 0; i < names.length; i++) {
// 	// 	// const av = problem22Helper(names[i])
// 	// 	// const pos = i + 1
// 	// 	// const score = av * pos
// 	// 	// totalScore += score
// 	// 	const name = names[i].replaceAll(`"`, ``)
// 	// 	totalScore += problem22Helper(name) * (i + 1)
// 	// }
// 	totalScore = names.reduce((sum, name, idx) => sum + (problem22Helper(name.replaceAll(`"`, ``)) * (idx + 1)), 0)
// 	console.log(`The total name score is ${totalScore}`)
// })

//Alphabetical value helper function correctly calculates the AV
//Names is sorted correctly (COLIN => 938th position)
// Ex: 'COLIN', AV = 53, pos = 938, namescore = 49714

//Are all the names in the names list correct? 
	//start and end (last 2 names) seemed to be sorted correctly, 


//Problem 23 Non-Abundant sums

/**
 * A perfect number is a number in which its proper divisors sum up to that number
 * 	=>let D(n) be the sum of n's proper divisors, 
 * 		=> if D(n) < n, n is deficient
 * 		=> if D(n) > n, n is abundant
 * 		=> if D(n) = n, n is perfect
 * 
 * The smallest abundant number is 12, thus the smallest number that can be represented by the sum of two abundant number is 24
 * By Mathematical analysis, all numbers greater than 28123 can be represented as the sum of two abundant numbers
 * 	but this number can not be reduced any furthur
 * -- Find the sum of all positive integers that can not be represented as the sum of two abundant numbers
 * 		=> for all postive integers n, n <= 28123 since n > 28123 can all be represented as the sum of two abundant numbers
 **/ 

//Answer: 4179871

/** Notes
 * 
 **/

//Given a number n, 
//return all abundant numbers between 12 and n exclusive, 
//Conveniently sorted LTG
	//We were already told 12 is the smallest abundant number
// function getAllAbundantNumsLessThan(n) {
// 	const abundantNums = []

// 	if (n < 12) return abundantNums;

// 	let i = 12
// 	while (i < n) {
// 		const properDivisorSum = getProperDivisors(i).reduce((sum, num) => sum + num, 0)
// 		// if (properDivisorSum > i) {
// 		// 	console.log(`${i} is an abundant number with proper divisors summing up to ${properDivisorSum}`)
// 		// } else if (properDivisorSum < i) {
// 		// 	console.log(`${i} is a deficient number with proper divisors summing up to ${properDivisorSum}`)
// 		// } else {
// 		// 	console.log(`${i} is a perfect number with the expected sum of ${properDivisorSum}`)
// 		// }
// 		if (properDivisorSum > i) abundantNums.push(i);
// 		i++
// 	}

// 	return abundantNums
// }

function getAllAbundantNumsLessThan(n) {
	const nums = new Array(n)
	for (let i = 0; i < n; i++) {
		nums[i] = i
	}
	// abundantNums = nums.filter(num => getProperDivisors(num).reduce((acc, curr) => acc + curr, 0) > curr)

	abundantNums = nums.filter((num) => {
		return getProperDivisors(num).reduce((acc, curr) => acc + curr, 0) > num
	})
	return abundantNums
}

function problem23(n) {
	let res = []
	const abundantNums = getAllAbundantNumsLessThan(n)
	//True if exists, undefined otherwise
	const abundantNumsBool = {}
	for (const abundantNum of abundantNums) {
		abundantNumsBool[abundantNum] = true
	}
	console.log(abundantNums)
	// console.log(abundantNumsBool[])
	//consider all numbers between 1 and 28123 inclusive, call it m
		//We're checking all positive integers
		//if there are no two abundant numbers that can sum up to m, add to our res
	for (let num = 1; num < n; num++) {
		let i = 0
		while (abundantNums[i] <= num) {
			const firstNum = abundantNums[i]
			const secondNum = num - firstNum

			//First num is guranteed abundant, check 2nd num for abundance
				//we expect booleans or undefined here, for extra care / error handling, add a type check beforre
			if (abundantNumsBool[secondNum]) {
				console.log(num, firstNum, secondNum)
				// => there are two abundantNums that can sum up to i, therefore i will not be part of our sum
				break;
			}
			i++
		}
		//if we exhausted our list, there are no two abundant nums that summed up to i, we add i to our sol
		//an exhuasted list is one in which abundantNums[i] > i || i
		if (abundantNums[i] > num || i === abundantNums.length) {
			// console.log(num, i)
			res.push(num)
		}
	}
	console.log(res)
	// console.log(`The list of numbers that can not be represented as the sum of two abundant numbers is ${res}`)
	return res.reduce((sum, curr) => sum + curr, 0)
}

// console.log(problem23(28124))

//Problem 24 Lexographical Permutation

/**
 * Given 3 numbers 0 1 2, the permutations of 012 in numerical (can also be alphabetical for other cases)
 * are 012 021 102 120 201 210
 * 
 * What is the millionith lexicograophic permutation of the digits 0 1 2 3 4 5 6 7 8 9
 **/

//Answer:

/** Notes
 * Permutation formla = nPr = n! / (n - r)!
 * in this case n = r => nPr = n! / 0! = n!
 * n = 10 => n! > 3.6mil
 **/


//This is more a utility function than a helper function
function swap(arr, i, j) {
	const tmp = arr[i]
	arr[i] = arr[j]
	arr[j] = tmp
}


//reverses sub array values of a list from start to end exclusive
function subArrayReverse(arr, start, end = arr.length) {
	while (start < end) {
		swap(arr, start, end - 1)
		start++
		end--
	}
}

//I've done this before, given a list of numbers, get the next permutation, do the replacement in place
function nextPermutation(list) {
	let i = list.length - 1

	while (i > 0) {
		if (list[i] > list[i - 1]) {
			let j =  list.length - 1
			while (list[j] <= list[i - 1]) {
				j--
			}
			//list[j] > list[i - 1]
			swap(list, i - 1, j)
			//reverse list from i to end
			subArrayReverse(list, i)
			return
		}
		i--
	}
	//list is GTL order
	subArrayReverse(list, 0)
}

const testList = []
for (let i = 0; i < 5; i++) {
	testList.push(i)
}

// console.log(`Our test list starts at ${testList} and we'll call it permutation 1`)
// for (let i = 2; i <= 121; i++) {
// 	nextPermutation(testList)
// 	console.log(`Permutation ${i} is ${testList}`)
// }

//returns the 1,000,000th permutation from a list of nums starting at 0 to n,
//assume overflow cycles back to permutation 1
function problem24(n) {
	const nums =  new Array(n + 1)

	let i = 0
	while (i < nums.length) {
		nums[i] = i
		i++
	}
	

	//base 0 to n is permutation 1,
	i = 1
	while (i < 1000000) {
		nextPermutation(nums)
		i++
	}
	//i = 1,000,000, we're at the 1000000th permutation
	return nums
}


// console.log(problem24(9).join(''))
/**
 * 0 1 2 3 => [3], swap 3 with 2
 * 0 1 3 2 => [3, 2] swap 2 with 1, than reverse GTL to LTG
 * 0 2 1 3 
 * 0 2 3 1 
 * 0 3 1 2
 * 0 3 2 1 => when GTL, swap last num with num in our swap index
 **/

/**
 * 0 1 2 3 4 => [4] swap with 3 "reverse [3]"
 * 0 1 2 4 3 => [4, 3] swap 3 with 2 then reverse [4, 2]
 * 0 1 3 2 4
 * 0 1 3 4 2
 * 0 1 4 2 3 
 * 0 1 4 3 2
 * 0 2 1 3 4 => [4, 3] swap 3 with 1, then reverse [4, 1]
 * 0 2 1 4 3 => 
 * 0 2 3 1 4 
 * 0 2 3 4 1
 * 0 2 4 1 3 => [4, 3, 1]
 * 0 2 4 3 1
 * 0 3 1 2 4
 **/

//steps
	//1) from right to left indexed by i => i = len(nums) - 1, find first pair where num at i > num at i - 1
		//when i reaches 0, there are no values where the nums at i > i - 1, thus the entire list is in GTL order, its our last permutation and we reverse the whole list to cycle around again
	//2) starting from right to left again, find first number at index j, where j > i - 1, swap the numbers

	//if the entire list is in GTL order, its the last permutation and we cycle around (reverse to LTG)

//The idea behind maintaining the numerical order is that
	//from right to left, we maintain a LTG order to determine the two values to swap for the next permutation in the order

	//We're treating our list as 2 sublists,
		//the left sublist left to right is sorted LTG,
		//the right sublist left to right is sorted GTL
	//we go throughh the permutations of the right sublist until the entire list is GTL,
	//then we find the first value (by going right to left since GTL order) that is greater than the last num in our left sublist
		//Note: left sublist ends at i - 1 inclusive, right sublist starts at i, for the i > i - 1 treatment 


//Problem 25 1,000 digit fibonacci number

/**
 * Fib f(x) = f(x - 1) + f(x - 2), f(1) = 1, f(2) = 1, f(3) = 2, f(4) = 3, f(5) = 5 ...
 * What is the ith (x) term that contains 1000 digits
 **/

//Answer: 4782

/** Notes
 * 
 **/


function problem25() {
	const fibNums = ['0','1','1']

	
	while (fibNums[fibNums.length - 1].length < 1000) {
		fibNums.push(gf.strSum(fibNums[fibNums.length - 1], fibNums[fibNums.length - 2]))
	}
	// return fibNums[fibNums.length - 1]
	return fibNums.length - 1
}

console.log(problem25())


//Problem 26 Reciprocal Cycle

/**
 * A unit fraction contains 1 in the numerator, 
 * 1 / 2 = .5
 * 1 / 3 = .(3) => has a 1 digit cycle
 * 1 / 4 = .25
 * 1 / 5 = .2
 * 1 / 6 = .1(6) => has a 1 digit cycle
 * 		=> 1/6 = .166666666
 * 1 / 7 = .(142857) => has a 6 - digit cycle indicated by repeating (cycle) numbers in parenthesis
 * 		=> 1/7 = .142857142857142857142857
 * 
 * For d < 1000, return the value d that contains the longest recurring cycle in its decimal fraction part
 **/

//Answer:

/** Notes
 * 
 **/

//Perform standard division, take snapshots of the numerator position
//Division proccess either finishes at 0 indicating its a rational number
//or we arrive at a "snapshot" we've seen before, indicating a cycle will occur, irrational number

function problem26() {
	// i === 1 divides perfectly and has no remainder, 
	//we start at 2 to make the math easier since we expect everything to be a decimal

	let res  = null
	let maxCycleLength = 0

	for (let i = 2; i < 1000; i++) {
		let dividend = 1
		let divisor = i

		//snapshots
			// => 10 / 3 = '3' in position 0

			// => 10 / 6 = '1' in position 0
			// 		40 / 6 = '6' in position 1  ** if dividend - quotient = previously seen dividend...
			//    40 / 6 = '6' Seen in position 1, (2 - 1)

			// => 10 / 7 = '1' in position 0
			// 		30 / 7 = '4' in position 1
			// 		20 / 7 = '2' in position 2
			// 		60 / 7 = '8' in position 3
			//    40 / 7 = '5' in position 4
			// 		50 / 7 = '7' in position 5, 
			//    10 / 7 = '1', seen in position 0 (6 - 0) 

			// => 10 / 9 = '1' in position 0
			//    10 / 9 = '1' in position 1 (1 - 0)

			// => 10 / 11 = '0' in position 0
			//		100 / 11 = '9' in position 1
			//    10 / 11 = '0', seen in position 0 (2 - 0)

			// => 10 / 12 = '0' in pos 0
			//    100 / 12 = '8' in pos 1
			//    40 / 12 = '3' in pos 2
			//		40 / 12 = '3' seen in pos 2 (3 - 2) = 1

		const decimalPlaceDigits = []
		//numerator = dividend, denominator = divisor
		//perform divison process
		dividend *= 10 // adding the 0 after the decimal 1.0 / 4 => 10 / 4

		const dividendToDecimalPlace = {}
		// const dividendToDivisor = {}

		let cycleLength = null
		while (dividend !== 0) {
			if (dividend % divisor === 0) {

				decimalPlaceDigits.push(dividend / divisor)
				dividend = 0

			} else {
					// if (dividend < divisor) {
					// 	decimalPlaceDigits.push(0)
					// } else {
					// 	//dividend > divisor, if '=' then its already handled
					// 	const quotient = Math.floor(dividend / divisor)
					// 	decimalPlaceDigits.push(quotient)
					// 	dividend -= quotient * divisor 
					// }

					const quotient = Math.floor(dividend / divisor)
					if (dividendToDecimalPlace[dividend] !== undefined) {
						//cycle detected
						// const cycleLength = decimalPlaceDigits.length - quotientToDecimalPlace[quotient]
						cycleLength = decimalPlaceDigits.length - dividendToDecimalPlace[dividend]

						if (cycleLength > maxCycleLength) {
							res = divisor
							maxCycleLength = cycleLength
						}
						break;

					} else {
						dividendToDecimalPlace[dividend] = decimalPlaceDigits.length
					}
					// if (dividendToDivisor[dividend] !== undefined) {
					// 	//
					// } else {
					// 	dividendToDivisor[dividend] = null //[divisor, position]
					// }
					decimalPlaceDigits.push(quotient)
					dividend -= quotient * divisor
			} 
			dividend *= 10
		}
		// if (dividend === 0) {
		// 	console.log(`unit fraction for divisor ${divisor} results in rational number of .${decimalPlaceDigits.join('')}`)
		// }else {
		// 	decimalPlaceDigits.splice(dividendToDecimalPlace[dividend], 0, '(')
		// 	decimalPlaceDigits.push(')')
		// 	console.log(`unit fraction for divisor ${divisor} results in an irrational decimal fraction of .${decimalPlaceDigits.join('')}`)
		// }
		//if we make it here, we're looking at a rational number
	}
	console.log(`The divisor ${res} contains the longest decimal place recurring cycle with a cycle length of ${maxCycleLength}`)
	return res

}

// console.log(problem26())


//Problem 27 Quadratic Primes

/**
 * TODO
 **/

//Answer: -59231

/** Notes
 * 
 **/


function problem27() {

	function checkPrime(num) {
		if (num === 2 || num === 3) return true;

		for (let i = 2; i <= Math.sqrt(num); i++) {
			if (num % i === 0) return false;
		}
	return true
	}

	

	//brute force all possible combinations of (a,b) for abs(a) < 1000 and abs(b) < 1000

	//x^2 + ax + b

	// 1) check if x^2 + ax + b for whatever value x, start at 0, go until we no longer get a prime number
	// 2) if we get a new max x, record product of a and b

	let maxLength = 0
	let res = null
	let a = -999
	while(a < 1000) {

		let b = -999
		while (b < 1000) {
			let n = 0 //we'll call it to follow problem summary format

			let quadraticResult = Math.pow(n, 2) + (a * n) + b
			while(quadraticResult > 1 && checkPrime(quadraticResult)) {
				n++
				quadraticResult = Math.pow(n, 2) + (a * n) + b
			}

			// not prime @ n, 0 to n - 1 are all prime,
			//  => Translation: We have n prime numbers for values 0 to n - 1 with values a and b
			if (n > maxLength) {
				maxLength = n
				res = a * b
				console.log(`New max length loged at length ${maxLength} with values ${a} and ${b} resulting in a product of ${a * b}`)
			}
			//if new max, record product of a and b
			b++
		}

		a++
	}
}

// problem27()


//Problem 28 Number Spiral Diagonal

function problem28(n) {

	//if odd start 1 @ center, center = Math.floor(n / 2)
	//if even, start at 'top left in the 2x2 center', Math.floor((n - 1)/2) <- int val
	function formSpiral(n) {
		if (n === 0) return [[]];
		const matrix = new Array(n).fill(null).map(() => new Array(n).fill(null))

		//populate spiral
		//start at center
		//order is right down left up,
			//keep track of bounds
			//bounds = center +/- limit, in horizontal and vertical directions
			//for n is odd, limit starts at 0, 
			//for n is even limit is 1 for right and lower(downward) directions
			//											 0 for left and upper directions
		if (n % 2 === 0) {
			//for the sake of finishing problem 28 and time we're going to ignore even cases for now
		} else {
			const center = Math.floor(n / 2)
			console.log(`Center:${center}`)
			let num = 1

			let row = center
			let col = center
			let limit = 1

			matrix[row][col] = num
			num++
			while (center + limit < n) {

				//right
				while(col < center + limit) {
					col++

					matrix[row][col] = num
					num++
				}

				//down
				while (row < center + limit) {
					row++

					matrix[row][col] = num
					num++
				}
				//left
				while (col > center - limit) {
					col--
					matrix[row][col] = num
					num++
				}

				//up
				while (row > center - limit) {
					row--
					matrix[row][col] = num
					num++
				}

				limit++
			}
			//top row isn't populated, yet
			while (col < n - 1) {
				col++

				matrix[row][col] = num
				num++
			}

			// console.log(matrix)
			return matrix
		}
	}
	const matrix = formSpiral(n)

	let row = 0
	let col = 0
	let bottomRightDiagonalSum = 0
	while (row < matrix.length && col < matrix[0].length) {
		bottomRightDiagonalSum += matrix[row][col]

		row++
		col++
	}

	row = matrix.length - 1
	col = 0
	let topRightDiagonalSum = 0
	while (row >= 0 && col < matrix[0].length) {
		topRightDiagonalSum += matrix[row][col]

		row--
		col++
	}


	const sum = topRightDiagonalSum + bottomRightDiagonalSum - (n % 2 === 0 ? 0 : 1); // double counted center (only for odd n) from diagonal pass, remove 1 count, and we know the center is 1
	console.log(`the diagonal sum for an ${n} x ${n} matrix with center value 1 is ${sum}`)
	// return sum
}

// problem28(1001)

/** Notes
 * 
 **/


//Problem 29 Distinct Powers
function problem29() {
	let a = 2


	function strPow(num, pow) {
		if (typeof num !== 'string') {
			throw new Error('Function strPow only accepts String numbers for its first parameter')
		}
		pow = parseInt(pow)

		let res = '1'
		let i = 0
		while(i < pow) {
			res = gf.strMultiplication(res, num)
			i++
		}

		return res
	}

	const resSet = new Set()
	// console.log(Math.pow(100, 100))
	while(a <= 100) {
		let b = 2

		while (b <= 100) {
			// resSet.add(Math.pow(a , b))
			resSet.add(strPow(`${a}`, b))

			b++
		}

		a++
	}

	console.log(`We're looking at ${resSet.size} distinct terms`)
}

// problem29()



//Problem 30 Digit 5th powers

//  1: 1 - 9 ^ 5, none of these work anyways because you can't sum with a single digit

//  2: 1 - 9 ^ 5 + 9 ^ 5 => 10 - 99, limited to 1 and 2s, 3 ^ 5 > 99
//		- 10 - 99
//		- 3^ 5 = 243 > 99, 2 ^ 5 = 32
//			-We only test numbers with digits values 0,1,2
//  3: 1 - 3(9 ^ 5) => if its a 3, its 1 - 3(3 ^ 5) => 1 - 3 ^ 6, 4 ^ 5 > 999
//		- 100- 999
//		- 4 ^ 5 = 1024 > 999, 3 ^ 5 = 243
//			-We only test numbers with digit values 0,1,2,3, 3(3 ^ 5) = 3 ^ 6 = 729
//  4: 1 - 4(9 ^ 5) limited to 1 - 4 => 1 - 4^6, 9999
//
// ....
//
//  6: 100 000 - 999 999
//		-6(8 ^ 5) = 32768 * 6 = little less than 198k
//		-6(9 ^ 5) = 3million
//
//	7: 1 000 000 - 9 999 999
//		-7(9 ^ 5) = 420k < 1m
//		
//	8: 1- 8(9 ^ 5) => even if all 8 digits we 9, it wouldn't reach the smallest 8 digit number
//		-10000000 - 99999999
//			-8^5 = 32768, 8 ^ 6 = 261144 <<<< 10 000 000
//			-9^5 = 59049, 8 * 9^5 = 480k roughly <<<<< 10m 


//min val for n digits, max val for n digits
	// min = 10 ^ n - 1, max = (10 ^ n) - 1
//while n * 9 ^ 5 > min val
	//test all possible sums for those n digits
		//we start at the min
			//Increment the rightmost digit until the sum of digits is greater than our number or the digit is 9
				//then increment leftmost digit and reset current digit to 0
				//repeat this process until sum of digits excluding rightmost digit is greater than our max, this means we've exhausted all our options for n digits
				//lets ignore this optimizations because intuitively there are exceptions to this idea meaning this is not true in a for all values within our range
					//in other terms I retract my statement in line 810
					//we're just going to brute force all numbers within our min and max range

	//if sum from left to right is greater than our max range for n digits, than any additional increments from the right will overflow, i.e. we exhausted all our options 

	//we expect to only test up to six digits, since n = 7 digits, 7 * (9 * 5) < 10 ^ 6 => in order words, if every digit were its highest value, 9, and summed up, it would still be less than the smallest 7 digit number. and this is true for n >= 7
function problem30(pow) {
	let n = 2 // n = 1, implies 1 digit, no possible sum

	//Helper Function for problem 30, returns the sum of every digit in our num raised to the 5th power => sum(digit val ^ 5)
	function sumDigits(num, pow) {
		//Whats better? converting to a string, getting individual digits, convert those to int and add that val ^ 5th power to our sum
		// OR, keep as a number, and use modulo

		//129
		// 9 => 129 % 10
		// 2 => subtract 9, mod 100, divide 10 => 129 - 9 = 120 % 100 = 20 /10 = 2
		// 1 => subtract 20, mod 1000, divide 100 => 120 - 20 = 100 / 100 = 1
		//while num > 0, n starts at 1, prev digit is 0,
			// num => num = num - prev digit, num % 10 ^ n, divide by 10 ^ n - 1 = digit
			// store digit to prev
			//increment n

		//129
		// 9 => 129 % 10 = 9, get the 9 divide by 10, take the floor to remove decimal
		// 2 => 12 % 10 = 2, get the 2 divide by 10, take the floor to remove decimal
		// 1 => 1 % 10 = 1, get the 1 divide by 10, take the floor, we're at zero, done
			//derp

		let sum = 0
		while (num > 0) {
			const digit = num % 10
			
			sum += Math.pow(digit, pow)
			num = Math.floor(num / 10)
		}

		return sum
	}

	let min = Math.pow(10, n - 1)
	let max = Math.pow(10, n)

	let res = []
	while (n * Math.pow(9, 5) > min) {

		let i = min
		while(i < max) {
			if (i === sumDigits(i, pow)) {
				//record the num
				res.push(i)
			}
			i++
		}
		n++
		min *= 10
		max *= 10
	}

	return res
}

//test case checks out :D
console.log(`The following numbers are equal to their digits raised to the 4th power and sumed together`, problem30(4)) // we can test this by checking digits raised to the 4th and verifying against the project Euler results

const fifthPowerNums = problem30(5)
console.log(`The following numbers are equal to their digits raised to the 5th power and summed together, ${fifthPowerNums} and they add up to ${fifthPowerNums.reduce((sum, num) => sum + num, 0)}`)

