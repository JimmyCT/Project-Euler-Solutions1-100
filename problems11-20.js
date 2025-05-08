const fs = require('fs')

//Template

//Problem X <Name>

/**
 * Problem Summary
 **/

//Answer:

/** Notes
 * 
 **/

function primesLessThanN(n) {
	const primes = []
	const nums = new Array(Math.ceil(n)).fill(true)

	let i = 2
	while (i < n) {
		if (nums[i] === true) {
			primes.push(i)
			let sum = i
			while ((sum += i) < n) {
				nums[sum] = false
			}
		}
		i++
	}

	return primes
} 

//Problem 11 Largest Product in a Grid

/** Notes
 *  - We can "modularize" the sliding window process
 * 		-Push numbers in row/column/diagonal into a list, then perform a sliding window process on that list 
 * 		-yeah so i ended up doing it anyway because it made the whole process just about 1000000x easier so fuck yeah
 **/

//Answer: 70600674

/**
 * Given a 20 x 20 grid of numbers, return the greatest product of 4 adjacent digits in any directions top-down, left-right, or diagonally
 **/

function fetchData(path) {
	return fs.promises.readFile(path, 'utf-8')
}

//returns a nested array from the provided text/string
//assume the provided text is already formatted correctly, so pruning or error handling is needed
	//in other terms, build in error handling or another method to format the data correctly before calling this function

function convertTextIntoMatrix(str) {
	const rows = str.split('\n')
	const matrix = rows.map((row) => row.split(' ').map(strVal => Number(strVal)))
	return matrix 
}
function getNorthEastDiagonalNums(matrix, i, j) {
	const nums = []
	//heading north east, decrementing rows, incrementing columns
	while (i >= 0 && j < matrix[0].length) {
		nums.push(matrix[i][j])
		i--
		j++
	}
	return nums
}
function getSouthEastDiagonalNums(matrix, i ,j) {
	const nums = []
	while (i < matrix.length && j < matrix[0].length) {
		nums.push(matrix[i][j]);
		i++
		j++
	}
	return nums
}
function largestProduct(arr, n) {
	if (arr.length < n) return null;

	let zeroCounter = 0
	let left = right = 0
	let product = 1
	let maxProduct = null
	while (right - left < n) {
		if (arr[right] === 0) {
			zeroCounter++
		} else {
			product *= arr[right]
		}
		right++
	}
	maxProduct = zeroCounter === 0 ? product : 0

	while (right < arr.length) {
		if (arr[left] === 0) {
			zeroCounter--
		} else {
			product /= arr[left]
		}
		left++

		if (arr[right] === 0) {
			zeroCounter++
		} else {
			product *= arr[right]
		}
		right++

		maxProduct = zeroCounter === 0 ? Math.max(maxProduct, product) : maxProduct
	}

	return maxProduct
}
function nAdjacentNumProduct(matrix, n) {
	//left to right
		//max_left = row length - 4, while index < row.length - 3 => row length = number of columns
	let maxLeftToRight = null
	let transposedMatrix = new Array(matrix.length).fill(null).map(element => new Array(matrix[0].length))
	
	for (let row = 0; row < matrix.length; row++) {
		// if (matrix[row].length < n) break;
		// // const row = matrix[i]
		// //sliding window
		// let left = 0
		// let right = 0
		// let zeroCounter = 0
		// let product = 1
		// let maxProduct = null
		// while (right - left < n) {
		// 	if (matrix[row][right] === 0) {
		// 		zeroCounter++
		// 	} else {
		// 		product *= matrix[row][right]
		// 	}
		// 	right++
		// }
		// maxProduct = zeroCounter === 0 ? product : 0

		// while (right < matrix[row].length) {
		// 	if (matrix[row][left] === 0) {
		// 		zeroCounter--
		// 	} else {
		// 		product /= matrix[row][left]
		// 	}
		// 	left++

		// 	if (matrix[row][right] === 0) {
		// 		zeroCounter++
		// 	} else {
		// 		product *= matrix[row][right]
		// 	}
		// 	right++
		// 	maxProduct = zeroCounter === 0 ? Math.max(maxProduct, product) : maxProduct
		// }
		// console.log(largestProduct(matrix[row], n) === maxProduct)
		// maxLeftToRight = Math.max(maxLeftToRight, maxProduct)
		maxLeftToRight = Math.max(maxLeftToRight, largestProduct(matrix[row], n))
		let col = 0
		while (col < matrix[row].length) {
			transposedMatrix[col][row] = matrix[row][col]
			col++
		}
	}
	//top down
		//max_top = row length - 4, while row < row.length - 3
	let maxTopDown = null
	for (let col = 0; col < matrix[0].length; col++) {
		// if (matrix[0].length < n) {
		// 	break;
		// }
		// let top = 0
		// let bottom = 0
		// let product = 1
		// let maxProduct = null
		// let zeroCounter = 0
		// while (bottom - top < n) {
		// 	if (matrix[bottom][col] === 0) {
		// 		zeroCounter++
		// 	} else {
		// 		product *= matrix[bottom][col]
		// 	}
		// 	bottom++
		// }
		// maxProduct = zeroCounter === 0 ? product : 0
		// while (bottom < matrix.length) {
		// 	if (matrix[top][col] === 0) {
		// 		zeroCounter--
		// 	} else {
		// 		product /= matrix[top][col]
		// 	}
		// 	top++

		// 	if (matrix[bottom][col] === 0) {
		// 		zeroCounter++
		// 	} else {
		// 		product *= matrix[bottom][col]
		// 	}
		// 	bottom++

		// 	maxProduct = zeroCounter === 0 ? Math.max(maxProduct, product) : maxProduct
		// }

		// maxTopDown = Math.max(maxTopDown, maxProduct)
		maxTopDown = Math.max(maxTopDown, largestProduct(transposedMatrix[col], n))
	}

	//diagonals going top left to bottom right direction,

	//assume row length and col length are both < n, otherwise it's handled before function invocation
	// function slidingDiagonalTopLeft(row, col) {
	// 	let top = bottom = row
	// 	let left = right = col
	// 	let product = 1
	// 	let maxProduct = null
	// 	let zeroCounter = 0

	// 	while (bottom - top < n && right - left < n) {
	// 		testVarNums.push(matrix[bottom][right])
	// 		if (matrix[bottom][right] === 0) {
	// 			zeroCounter++
	// 		} else {
	// 			product *= matrix[bottom][right]
	// 		}
	// 		bottom++
	// 		right++
	// 	}
	// 	maxProduct = zeroCounter === 0 ? product : 0

	// 	//slideeeee
	// 	while (bottom < matrix.length && right < matrix[0].length) {
	// 		if (matrix[top][left] === 0) {
	// 			zeroCounter--
	// 		} else {
	// 			product /= matrix[top][left]
	// 		}
	// 		top++
	// 		left++
			

	// 		if (matrix[bottom][right] === 0) {
	// 			zeroCounter++
	// 		} else {
	// 			product *= matrix[bottom][right]
	// 		}
	// 		bottom++
	// 		right++
	// 		maxProduct = zeroCounter === 0 ? Math.max(maxProduct, product) : maxProduct
	// 	}
	// 	return maxProduct
	// }

	let i = matrix.length - n
	let j = 0

	let maxDiagonalSouthEast = null
	// console.log(slidingDiagonalTopLeft(0, 0), 'func1')
	// console.log(largestProduct(getSouthEastDiagonalNums(matrix, 0, 0), n), 'func2')
	
	while (i >= 0) {
		maxDiagonalSouthEast = Math.max (maxDiagonalSouthEast, largestProduct(getSouthEastDiagonalNums(matrix, i, j), n))
		i--
	}
	i = 0
	while (j <= matrix[0].length - n) {
		maxDiagonalSouthEast = Math.max(maxDiagonalSouthEast, largestProduct(getSouthEastDiagonalNums(matrix, i, j), n))
		j++
	}

	i = matrix.length - 1
	j = matrix[0].length - 1

	let maxDiagonalNorthEast = null

	while (j >= 0) {
		maxDiagonalNorthEast = Math.max(maxDiagonalNorthEast, largestProduct(getNorthEastDiagonalNums(matrix, i,j), n))
		j--
	}

	j = 0
	while (i >= 0) {
		maxDiagonalNorthEast = Math.max(maxDiagonalNorthEast, largestProduct(getNorthEastDiagonalNums(matrix, i,j), n))
		i--
	}

	return Math.max(maxLeftToRight, maxTopDown, maxDiagonalNorthEast, maxDiagonalSouthEast)
}

// const fetchProblem11Promise = fetchData(__dirname + '/problem11.txt')

// fetchProblem11Promise.then((data) => {
// 	const grid = convertTextIntoMatrix(data)
// 	console.log (nAdjacentNumProduct(grid, 4))
// })

//Problem 12 Highly Divisible Triangular Number

/**
 * Triangular number i = sum of natural numbers up to i
 * Ex: Triangular number[5] = 15 = 1 + 2 + 3 + 4 + 5
 * What is the first triangular number to have over 500 divisors
 **/

// 1 + 2 + 3 + ... + n = (n * (n + 1)) / 2

/** Notes
 * - Getting all the divisors of a number
 * 	- how would i make this efficient?
 * 		- Break a number into its prime factorization 
 * 		- Use the prime factorization format to get all divisors of a number, divisors will not be ordered
 * 			- ACTUALLY, we can just get the product of the powers (power + 1) of every prime divisor of num x, and that is our number divisors
 * 				-if the number is a square, subtract 1 
 * 	- How do I get the prime factorizatized format of a number efficiently?
 * 
 * 	- YEAHHHH, I'm probably going to just get all primes between 1 < n < 1,000,000,000 
 * 		-then store it in a file and just access that file whenever i'm working with prime numbers
 * 		-maybe add a few zeroes why not... huge text file? 
 **/
//Answer: 76576500

const primes = [2]

const expandAmount = 1000
const modifiedSieve = new Array(3).fill(null).map((ele, index) => {
	const tmp = new Object()
	tmp.isPrime = true
	tmp.lastMultiple = index
	return tmp
})

function expandPrimesList() {

	let sieveIndex = modifiedSieve.length
	modifiedSieve.push(...(new Array(expandAmount).fill(null)))
	while (sieveIndex < modifiedSieve.length) {
		const tmp = new Object()
		tmp.isPrime = true
		tmp.lastMultiple = sieveIndex
		modifiedSieve[sieveIndex] = tmp;
		sieveIndex++
	}
	let i = 0
	while (i < primes.length) {
		const prime = primes[i]

		let multiple = modifiedSieve[prime].lastMultiple + prime
		while (multiple < modifiedSieve.length) {
	
			modifiedSieve[multiple].isPrime = false
			multiple += prime
		}
		modifiedSieve[prime].lastMultiple = multiple - prime 
		i++
	}
	let num = primes[primes.length - 1] + 1
	
	while (num < modifiedSieve.length) {
		if (modifiedSieve[num].isPrime === true) {
			primes.push(num)
			let multiple = num * 2
			while (multiple < modifiedSieve.length) {
				modifiedSieve[multiple].isPrime = false
				multiple += num
			}
			modifiedSieve[num].lastMultiple = multiple - num
		}
		num++
	}
}

//accepts postive integers, returns a list containing prime numbers and their power stored in an object
function primeFactorization(n) {
	if (n < 1 || !Number.isInteger(n)) {
		throw new Error('Function only accepts positive Integerrs');
	}

	const res = []
	if (n <= 1) return res

	let primeIndex = 0
	while (n > 1) {
		let prime = primes[primeIndex]
		let power = 0
		while (prime === undefined) {
			expandPrimesList()
			prime = primes[primeIndex]
		}

		if (n % prime === 0) {
			while (n % prime === 0) {
				power++
				n /= prime
			}
			res.push({prime, power})
		} 

		primeIndex++
	}
	
	return res
}

// console.log(primeFactorization(12))
// console.log(primeFactorization(100))
// console.log(primeFactorization(1524))
// console.log(primeFactorization(2))

// console.log(primeFactorization(65741374315))
// console.log(5 * 47 * 1543 * 181303, 'dsflk')

function problem12() {
	let triangularNum = 0
	let naturalNum = 1
	while (naturalNum < 1000000) {
		triangularNum += naturalNum
		console.log(`Triangular number: ${triangularNum} and Natural Number;${naturalNum}`)
		const pf = primeFactorization(triangularNum)
		let numDivisors = 1
		for (const p of pf) {
			numDivisors *= p.power + 1
		}
		if (numDivisors > 500) {
			console.log(`Triangular number: ${triangularNum} contains ${numDivisors} factors`)
			return triangularNum
		}

		naturalNum++
	}
	console.log('expand limits of our func')
	return -1
}

//Problem 13 Large sum

/**
 * Work out the first ten digits of the sum of the following one-hundred 50-digit numbers
 * --problem13.txt
 *	-Ah I see, these numbers are larger than the (memory?) capacity of computers 
 *	-Store these numbers in a matrix format and perform addition like its elementary 
 **/

//Answer: 5537376230


//str num matrix
function largeSum(matrix) {
	
	// const promise = fetchData(__dirname + '/problem13.txt');
	// await promise.then((data) => {

	//a 'column' of digits at most sums up to 909 (100 9's + 1 possible 9 carried over) which carries 2 digits over, so the sum is at most 102 digits
	//I know javascript is liberal with  its implicit coercion so i'm doing "more work" to account for the carry
	let res = ''

	let sumDigits = new Array(52)

	// await fetchData(__dirname + '/problem13.txt').then((data) => {
	// 	//data
	// 	const numsMatrix = data.split('\n')
	// 		//remove empty lines
	// 		.filter(line => line.trim() !== '')
	// 		//remove white space from start and end of the line
	// 		.map(line => line.trim().split(''));
		
	// 	let digitIndex = 49
	// 	let carry = 0
	// 	while (digitIndex >= 0) {
	// 		let digitSum = carry
	// 		for (num of numsMatrix) {
	// 			digitSum += Number(num[digitIndex])
	// 		}
	// 		sumDigits[digitIndex + 2] = digitSum % 10
	// 		carry = Math.floor(digitSum / 10)
	// 		digitIndex--
	// 	}
	// 	while (carry > 0) {
	// 		sumDigits[digitIndex + 2] = carry % 10
	// 		carry = Math.floor(carry / 10);
	// 		digitIndex--
	// 	}

	// });
	let digitIndex = 49
	let carry = 0
	while (digitIndex >= 0) {
		let digitSum = carry
		for (num of matrix) {
			digitSum += Number(num[digitIndex])
		}
		sumDigits[digitIndex + 2] = digitSum % 10
		carry = Math.floor(digitSum / 10)
		digitIndex--
	}
	while (carry > 0) {
		sumDigits[digitIndex + 2] = carry % 10
		carry = Math.floor(carry / 10);
		digitIndex--
	}
	let i = 0
	while(sumDigits[i] === '0') {
		i++
	}

	const limit = i + 10
	while (i < limit) {
		res = res + ('' + sumDigits[i])
		i++
	}

	return res
	// return sumDigits.join('')
}

async function problem13() {
	let res = null
	await fetchData(__dirname + '/problem13.txt').then((data) => {
		const numMatrix = data.split('\n')
			.filter(line => line.trim() !== '')
			.map(line => line.trim().split(''));
		console.log(numMatrix)
		res = largeSum(numMatrix)
		console.log('res', typeof res)
	})
	return res
}

// console.log('test', problem13())
// problem13().then((data) => {
// 	console.log('output solution 1')
// 	console.log(data)
// })

//output 2 
// const problem13 = fs.promises.readFile(__dirname + '/problem13.txt', 'utf-8')

// problem13.then((data) => {
// 	const numsMatrix = data.split('\n')
// 												.filter(line => line.trim() !== '')
// 												.map(line => line.trim().split(''));
// 	console.log(`solution output 2`)												
// 	console.log(largeSum(numsMatrix))
// })

//Answer: 55373762303

//Problem 14 Longest Collatz Sequence

/**
 * Collatz sequence is defined as 
 * 	let n be a number in the set of natural numbers
 *  n => n / 2 for even n
 * 	n => 3n + 1 for odd n
 * 	let 1 term = 1 transformation
 * 	What number under 1 million produces the longest chain
 **/

//answer: 837799


/** Notes
 * 	Wow base code collatz sequence is simple
 * 	
 * 	We can add memoization to reduce reptitive work 
 **/
function collatzSequence(n, chainLength = 1) {
	if (n === 1) return chainLength;

	if (n % 2 === 0) {
		return collatzSequence(n / 2, chainLength + 1)
	} else {
		return collatzSequence(3 * n + 1, chainLength + 1)
	}
}

//Idk name it collatz max chain length or something
function problem14(n) {
	let num = 1
	let res = null
	let maxChainLength = 0

	while (num < n) {
		console.log(num)
		const chainLength = collatzSequence(num)
		if (chainLength > maxChainLength) {
			maxChainLength = chainLength
			res = num
		}
		num++
	}

	console.log(`Number:${res} has the longest chain length of ${maxChainLength} out of all postive integers less than ${n}`)
	return res
}
// console.log(collatzSequence(13))
// console.log(problem14(1000000))

//Problem 15 Lattice Paths

/**
 * Given a 2 x 2 grid and only being able to move right or down, there are 6 possible paths to the bottom right corner of the grid
 * Variable understanding: Starting in the top left hand corner of a n x n grid, how many possible possible paths are there to the bottom right corner of the grid ?
 * The Question: Given a 20 x 20 grid, how many possible paths are there to the bottom right corner of the grid?
 * 
 **/
//Answer: 137846528820

/** Notes
 *  For the brute force algothim, we don't even make use of grid, we can just generate a set of positive integers and mimic grid positions with that
 **/

//Given a postive integer n, return a n x n 'empty' grid
function generateSquareGrid(n) {
	// const grid = new Array(n).fill(null).map(row => new Array(n).fill(null))
	return new Array(n)
		.fill(null)
		.map(row => new Array(n).fill(null))
}

//Brute force instead of a mathematical approach
// brute force 20 x 20 is kinda ass, okay its too stupidly expensive, mathematical approach it is
function problem15(n) {
	// const grid = generateSquareGrid(n)	
	let res = 0;

	function helper(i, j)	{
		if (i < n) {
			helper(i + 1, j)
		}

		if (j < n) {
			helper(i, j + 1)
		}

		if (i === n && j === n) {
			// console.log(`bottom right corner reached, res:${res}`)
			res++
		}
	}

	helper(0, 0)
	return res
}

// console.log(problem15(2))
// console.log(problem15(3)) // 20
// console.log(problem15(4))
// console.log(problem15(5))
// console.log(problem15(10))
// console.log(problem15(15))
// console.log(problem15(18))
// console.log(problem15(19))
// console.log(problem15(20)/)



function displayMatrix(mat) {
	for (const row of mat) {
		console.log(row.join(' '))
	}
}
function problem15(n) {
	if (n === undefined) {
		throw new Error('Invalid Input')
	}

	//initalize matrix
	const mat = Array.from({length:n + 1}, () => new Array(n + 1).fill(0))
	mat[0][0] = 1 

	let bound = 1

	// displayMatrix(mat)
	while (bound <= n) {
		let pointer = 1
		mat[0][bound] = 1
		//column traversal (going down the column, same column diff rows)
		while(pointer < bound) {
			mat[pointer][bound] = mat[pointer - 1][bound] + mat[pointer][bound - 1]
			pointer++
		}

		//row traversal (going across the row, same row, diff columnszz)
		pointer = 1
		mat[bound][0] = 1
		while (pointer < bound) {
			mat[bound][pointer] = mat[bound - 1][pointer] + mat[bound][pointer - 1]
			pointer++
		}
		mat[bound][bound] = mat[bound - 1][bound] + mat[bound][bound - 1]
		// console.log(`x = ${bound}`)
		displayMatrix(mat)
		bound++
	}
	// displayMatrix(mat)
	return mat
}


// problem15(4)
// displayMatrix(problem15(20))







//Problem 16 Power Digit Sum

/**
 * What is the sum of digits of 2^1000
 **/

//Answer: 1366 

/** Notes
 * Let f(x) = 2^x
 * Let sum = sum of f(x) from from x = 1 to x = n
 * f(n) - 1 = sum(f(n - 1)) ===> f(n) = sum(f(n - 1)) + 1 for f(x) = 2 ** x
 * --The approach for big num n, 
 * (2 ** n) - 1= sum(2 ** i) for i = 1 ... n
 * Math.pow(2, 100) = sum to 99 + 1 = sum to 98 + 99 + 1 = sum to 98 + (sum to 98 + 1) + 1 = 2(sum(to 98)) + 2
 * 
 * 
 * 2 **100 = sum(99) + 1
 * 		=> sum(99) + 1 = sum(98) + 99 + 1 = 2(sum(98)) + 2
 * 		=> 2(sum(98)) + 2 = 2(sum(97) + 98) + 2 = 2(sum(97) + (sum(97) + 1)) + 2 = 4sum(97) + 4
 * 		=> 4(sum(97)) + 4 = 4(sum(96) + 97) + 4 = 4(sum(96) + (sum (96) + 1) + 4 = 8sum(96) + 8
 * 		=> (2 ** (m - 1))(sum(n - m)) + (2 ** (m - 1))
 * 		=> (2 ** (m - 1))(sum(n - m) + 1)		
 * 		=> (2 ** (m - 1))(f(n - m + 1)) = 2 ** (m - 1) * 2 ** (n - m + 1), you're a fucking idiot jim jam, power rule 
 * 
 * 		=> get a small sum(value) => fixed n, large m
 * 		=> n = 1000, m = 998
 * 			=>(2 ** (998 - 1)) * sum(1000 - 998) + 2 (2 ** (998 -1))
 * 		=> n = 1000, m = 500
 * 			=> (2 ** 499) * sum(500) + 2 ** 499
 * 	-we would need to modify our large sum function to accommodate for various length digits, i.e powers of 2
 **/

function addDigits(n) {
	if (n < 0) {
		throw new Error('Function addDigits only accepts non-negative integers')
	}
	let sum = 0

	while (n > 0) {
		sum += n % 10
		n = Math.floor(n / 10)
	}
	return sum
}

//Accepts a 'large' String number returns the sum (Number?)
function addDigitsLargeNumber(strNum) {
	let sum = 0 
	for (const strDigit of strNum) {
		sum += Number(strDigit)
	}
	return sum
}

function addLargeNumbers(...nums) {
	let sumDigits = []

	for (let num of nums) {
		if (typeof num === 'number') {
			// console.log('converting number to string', num)
			num = '' + num
		}
		let sumIndex = sumDigits.length -1
		let numIndex = num.length - 1

		// console.log(numIndex, sumIndex)

		//introduce a carry variable for digit overflow 
		let carry = 0
		while (numIndex >= 0 || sumIndex >= 0 || carry > 0) {
			// sumValue = sumIndex >= 0 ? sumDigits[sumIndex] : 0
			// numValue = numIndex >= 0 ? num[numIndex] : 0
			sumValue = Number(sumDigits[sumIndex]) || 0
			numValue = Number(num[numIndex]) || 0
			// console.log(sumValue, numValue, carry)

			const sum = sumValue + numValue + carry
			let sumDigit;
			if (sum > 9) {
				sumDigit = sum % 10
				carry = Math.floor(sum / 10)
			} else {
				sumDigit = sum
				carry = 0
			}

			if (sumIndex < 0) {
				sumDigits.unshift('' + (sumDigit)) 
			} else {
				sumDigits[sumIndex] = '' + (sumDigit)
			}

			sumIndex--
			numIndex--
			// console.log(sumDigits)
		}
	}
	// console.log(sumDigits)
	return sumDigits.join('')
}

// console.log(addDigits(120))
// console.log(addDigits(Math.pow(2, 15)))
// console.log(Math.pow(2, 1000))
// console.log('add Digits route', addDigits(Math.pow(2, 1000))) //1189 *WRONG*

function getPowersOf2(n) {
	let res = ['1']

	let i = 1
	let sum = res[0] // sum of powers of 2 from 0 to i
	while (i <= n) {
		// res[i] = sum + 1
		// sum += res[i]
		res[i] = addLargeNumbers(sum, '1')
		sum = addLargeNumbers(res[i], sum)
		i++
	}

	return res[n]
}

// console.log('Powers test', getPowersOf2(0))
// console.log('Powers test', getPowersOf2(1))
// console.log('Powers test', getPowersOf2(2))
// console.log('Powers test', getPowersOf2(3))
// console.log('Powers test', getPowersOf2(4))
// console.log('Powers test', getPowersOf2(5))
// console.log('Powers test', getPowersOf2(10))
// console.log('Powers test', getPowersOf2(16))
// console.log('2^1000:', getPowersOf2(1000))
// console.log(addDigitsLargeNumber('1234567890'));
// console.log('Problem 16 Solution:', addDigitsLargeNumber(getPowersOf2(1000))) // 1366 *CORRECT*

//Problem 17 Number Letter Counts

/**
 * If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 
 * 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
 * If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, 
 * how many letters would be used?
 * NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 
 * 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers 
 * is in compliance with British usage
 **/

//Answer: 21124

/** Notes
 * 
 **/

//1-9 total length: 36
const singleDigit = { 1: 'one', 2: 'two', 3: 'three',
											4: 'four', 5: 'five', 6: 'six',
											7: 'seven', 8: 'eight', 9: 'nine'};								
//10-19 total length: 70
const doubleDigit = { 10: 'ten', 11: 'eleven', 12: 'twelve',
											13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
											16: 'sixteen', 17: 'seventeen', 18: 'eighteen',
											19: 'nineteen'}
//2x-9x total length: 
const belowHundred = { 2:'Twenty', 3:'Thirty', 4:'Forty', 5:'Fifty', 6:'Sixty', 7:'Seventy', 8:'Eighty', 9: 'Ninety'}



function problem17() {
	let res = 0
	let num
	//ones
	for (num = 1; num < 10; num++) {
		res += singleDigit[num].length
	}

	//tens
		//10-19
	for (num = 10; num < 20; num++) {
		res += doubleDigit[num].length;
	}
		//20-99
		//Twenty-one, fifty-eight, thirty-two, etc
		//Do not count hyphens or spaces
	// for (num = 20; num < 25; num++) {
	// console.log(num, num % 10, Math.floor(num / 10) % 10)
	// 	if (num % 10 === 0) {
	// 		console.log(`Length of ${num} is ${belowHundred[Math.floor(num / 10) % 10].length}`)
	// 		res += belowHundred[num / 10].length
	// 	} else {
	// 		console.log(`Length of ${num} is ${belowHundred[Math.floor(num / 10)  % 10].length + singleDigit[num % 10].length}`)
	// 		res +=	belowHundred[Math.floor(num / 10)].length + singleDigit[num % 10].length
	// 	}
	// }
	// console.log(res)
	for (num = 20; num < 100; num++) {
		if (num % 10 === 0) {
			res += belowHundred[num / 10].length
		} else {
			res += belowHundred[Math.floor(num / 10)].length + singleDigit[num % 10].length
		}
	}
	//hundreds
	//one hundred and forty-two, five hundred and eighty-three, nine hundred and twenty-seven
	//Do not count hyphens or spaces
	for (num = 100; num < 1000; num++) {
		if (num % 100 === 0) {
			res += singleDigit[num / 100].length + 'hundred'.length
		} else {
			res += singleDigit[Math.floor(num / 100)].length + 'hundred'.length + 'and'.length

			const dd = num % 100
			if (dd < 10) {
				res += singleDigit[dd].length;
			} else if (dd < 20) {
				res += doubleDigit[dd].length;
			} else {
				//should be 20-99
				res += dd % 10 === 0 ? belowHundred[dd / 10].length : belowHundred[Math.floor(dd / 10)].length + singleDigit[dd % 10].length
			}
		}
	}

	//1000
	//I am lazy
	res += 'one'.length + 'thousand'.length
	return res
}

// console.log(problem17())

//Problem 18 Maximum path sum 1

/**
 **/

//answer: 1074

/** Notes
 * The idea a top down BFS approach, treat it like a tree
 * 	-Parent node looks at left and right node, adds its value with the child node and "stores" the sum in child node
 * 		-Child node can only have 2 parents at most, so there are at most two possible values to be stored
 * 	-When we get to the child node, check possible sums stored with one or two parent nodes, store the greater value, repeat process of parent node
 * 	-Bottom level as we go across the last/bottom row, record the greatest value
 * 
 * 
 * 	-SO YEAH I did a lot of extra work trying to build a pyramid-like data structure to solve my problem
 * 	-With a BFS approach, we can just use the indices of nested nums for parent/child interaction
 * 		-if child index === 0 || === row length - 1, child only has 1 parent, "right" and "left" facing respectively
 * 		-else child has 2 parents, left parent is the previous row child index - 1, right parent is the previous row same index as child 
 *
 **/

async function maxPathSum(path) {
	let res = null
	await fetchData(path).then((data) => {
		// console.log(data)
		const nestedNums = data.split('\n')
													 .filter(line => line.trim() !== '')
													 .map(line => line.trim()
													 									.split(' ')
													 									.map(strNum => Number(strNum)));
		let sums = [nestedNums[0][0]]
		let i = 1
		while (i < nestedNums.length) {
			const tmp = []
			const nums = nestedNums[i]

			tmp.push(sums[0] + nums[0])
			let j = 1
			while (j < nums.length - 1) {
				tmp.push(Math.max(nums[j] + sums[j - 1], nums[j] + sums[j]))
				j++
			}
			tmp.push(nums[j] + sums[j - 1])

			sums = tmp
			i++
		}

		// console.log('Max path sum:', Math.max(...sums))
		res = Math.max(...sums);
	})

	return res
}

function problem18() {
	maxPathSum(__dirname + '/problem18.txt').then((res) => {
		console.log('Max path sum for problem 18:', res)
	});
}
// problem18()

//Probelm 67 is similiar just longer, so we're going to try it
function problem67() {
	maxPathSum(__dirname + '/problem67.txt').then((res) => {
		console.log('Max path sum for problem 67:', res)
	})
}
// problem67()

//Problem 19

/**
 * Problem Summary
You are given the following information, but you may prefer to do some research for yourself.

1 Jan 1900 was a Monday.
Thirty days has September,
April, June and November.
All the rest have thirty-one,
Saving February alone,
Which has twenty-eight, rain or shine.
And on leap years, twenty-nine.
A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.

How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
 **/

//Answer:

/** Notes
 * -4 months contain 30 days,
 * -1 month contains 28 unless its a leap year, then 29
 * 	-leap year rules, if year is divisble by 4 but not on a century UNLESS its divisble by 400, its 29
 * 	=> leap years are years divisble by 400 OR (4 AND NOT 100)m
 * 	=> else it is not a leap year 
 * 
 * -7 months contains 31 days
 **/

//Figure out what day of the week Jan 1, 1901 is
//Count number of days between Jan, 1 1901 - Dec, 31 2000

//subtract number of days needed to reach sunday from the total

// => We've reached sunday count = 1
//Every 7 days after is another sunday, so get int value of the difference divided by 7
//return Integer(diff / 7) + 1

// function problem19() {
// 	console.log('January 1st, 1900 is a monday')
// 	console.log('we\'re working with ', (4 * 30 + 28 +7 * 31),'days')
// 	console.log('Which is 52 weeks and 1 day to January 1, 1901 Tuesday')
// 	// console.log(day)
// 	let numDays = 0
// 	let numSundays = 0
// 	let year = 1901 
// 		//Every year has 4 months with 30 days and 7 with 31 => 
// 		//Every year has feburary with 28 days unless its a leap year then it is 29
// 		// => Every year has (120 + 217 + 28 = 365 days) unless it is a leap year then it i has (366 days)

// 	while(year <= 2000) {
// 		if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
// 			console.log('leap year', year)
// 			numDays += 366
// 		} else {
// 			numDays += 365
// 		}
// 		year++
// 	}

// 	numDays -= 1 //We stop on Dec 31 2000, not Jan 1, so we subtract 1 day 

// 	//Since Jan 1, 1901 is a tuesday, it takes 5 days to reach our first sunday
// 	numDays -= 5
// 	numSundays = 1
// 	console.log(numDays, numSundays)
// 	//Every full 7 days from here is another sunday
// 	console.log(numDays / 7)
// 	numSundays += Math.floor(numDays / 7)
// 	return numSundays
// }

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

//Given a year n after 1901, 
//return the number of sundays that fell on the 1st day of the month between Jan 1 1901, and Dec 31, n inclusive

function problem19(n) {
	let res = 0;
	let dayOfWeek = 2

	let year = 1901
	while (year <= n) {
		let month = 1 
		while (month <= 12) {
			if (dayOfWeek === 0) res++;
			if (dayOfWeek === 0) console.log(`${month}/${1}/${year} falls on a sunday`)
			// console.log(`dayOfWeek:${dayOfWeek}, for month:${month}, and year:${year}`)
			switch (month) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				//numDays is 31
				dayOfWeek = dayOfWeek + 31
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				//numDays is 30
				dayOfWeek =  dayOfWeek + 30
				break;
			case 2:
				//can be treated as default case
				if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
					//leap year, 29
					dayOfWeek += 29
				} else {
					//not, 28
					dayOfWeek += 28
				}
			}
			dayOfWeek = dayOfWeek % 7
			month++
		}
		year++
	}

	return res
}

console.log(problem19(2000))
//1901 is a tuesday
//75 years with 52 weeks + 1 day
//25 years with 52 weeks + 2 days
// => 100 years with 52 weeks, => 5200 sundays
// => 25 * 2 + 75 = 125 extra days => 17 weeks 6 days 
// => 5217 sundays + 6 days on tuesdaym so 5218 sundays 

//5218 total sundays is correct if we were counting the number of sundays...
//we're checking to see how many months had sunday fall on the first day of the month... 

//Template

//Problem 20 Factorial Digit Sum
/**
 * Find sum of digits for 100!
 **/

//Answer:

/** Notes
 * 
 **/


//Given an int n, return n!
function factorial(n) {
	let resArr = [1, 1]

	let i = 2
	while (i <= n) {
		resArr[i] = resArr[i - 1] * i // can also do res.push(res[i - 1] * i)
		// resArr[i] = parseInt(strMultiplication(`${resArr[i - 1]}`, `${i}`))
		i++
	}

	return resArr[n]
}

//Given a value n that reaches large numbers greater than 2 ** 32 (64? 128?) - 1,
//Return the factorial number as a string
function largeNFactorial(n) {
	let resArr = ['1', '1']

	let i = 2
	while (i <= n) {
		resArr[i] = strMultiplication(`${resArr[i - 1]}`, `${i}`)
		i++
	}

	return resArr[n]
}

//Given two non-negative string numbers, return their product as a string
	//we're going to simplify the process and ignore negative numbers for now
function strMultiplication(str1, str2) {
	const n1 = str1.length
	const n2 = str2.length 

	if (str1 === '0' || str2 === '0') return 0;

	const reverseProduct = new Array(2 * Math.max(n1, n2)).fill(0)

	//perform regular multplication 
		//in a multiplication table s1 is the bottom value and s2 is the top value visually
	//right to left s1
	for (let i = n1 - 1; i >= 0; i--) {
		const s1Digit = parseInt(str1[i])
		//right to left s2
		let carry = 0
		const digitIndex1 = n1 - 1 - i
		for (let j = n2 - 1; j >= 0; j--) {
			const s2Digit = parseInt(str2[j]);
			//product of s1 and s2 digits + carry + number at that position
			const digitIndex2 = n2 - 1 - j
			// console.log(s1Digit, s2Digit, carry, reverseProduct[digitIndex1 + digitIndex2])
			const product = s1Digit * s2Digit + carry + reverseProduct[digitIndex1 + digitIndex2]
			// console.log(product)
			
			carry = Math.floor(product / 10)
			reverseProduct[digitIndex1 + digitIndex2] = product % 10
		}
		// console.log(reverseProduct.join(''), 'b4 carry addition')
		if (carry > 0) {
			reverseProduct[digitIndex1 + n2] = carry
		}
		// console.log(reverseProduct.join(''), 'after carry addition')
	}

	//we expect reverseProduct to be non-zero, otherwise it would've been handled in line 1183
	while(reverseProduct[reverseProduct.length - 1] === 0) {
		reverseProduct.pop()
	}

	return reverseProduct.map(num => `${num}`).reverse().join('')
}

function problem20Solution() {
	const factorial100 = largeNFactorial(100)

	const sum = factorial100.split('').reduce((acc, val) => acc + parseInt(val), 0)
	return sum
}

console.log('Sum of digits for 100!: ', problem20Solution())
// console.log(factorial(0))
// console.log(factorial(1))
// console.log(factorial(2))
// console.log(factorial(3))
// console.log(factorial(4))
// console.log(factorial(5))
// console.log(factorial(6))
// console.log(factorial(7))
// console.log(factorial(8))
// console.log(factorial(20))
// console.log(factorial(100))


// console.log(largeNFactorial(1))
// console.log(largeNFactorial(2))
// console.log(largeNFactorial(3))
// console.log(largeNFactorial(4))
// console.log(largeNFactorial(5))
// console.log(largeNFactorial(6))
// console.log(largeNFactorial(7))
// console.log(largeNFactorial(8))
// console.log(largeNFactorial(20))
// console.log(largeNFactorial(100))

// console.log(strMultiplication('123434', '0')) // expect 0
// console.log(strMultiplication('0', '32450')) // expect 0
// console.log(strMultiplication('12345', '54321') === (12345 * 54321).toString()) 
// console.log(strMultiplication('423897', '324234324') === (423897 * 324234324).toString()) 
// console.log(strMultiplication('098452', '2580345') === (098452 * 2580345).toString()) 
// console.log(strMultiplication('0039949500', '0394850930') === (0039949500 * 0394850930).toString()) 

// 99999 x 99999 =
	// at most we have 9 x 9 + 8(the carry) = 89
	//if we multiply 2 numbers with n digits, the product at most contains n + 1 + (n - 1) digits => 2n digits

































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































