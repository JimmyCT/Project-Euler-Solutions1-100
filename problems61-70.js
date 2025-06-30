import gf from "./generalFunctions.js"

//Problem 61 Cylical figurate numbers

//Cylic
	//Tail -> head
		//len 1, 2, or 3??? 4 digit numbers


//Cycles don't have to be in order, i.e. it can be square => triangular => pentagonal instead of tri => square => pent 
//we assume cylic sets have matching numbers specifically for the last 2 with the first 2 digits, not 1 or 3
//We also know we're looking for a six cyclic 4-digit number

//OKAY so assuming we only need to check last 2 digits against first 2 digits and not (1 OR 3)
//we can make our last vastly easier by
	//spliting n-polygonal type numbers into two data structures, one mapping first two digits (00 - 99, 100 keys max) to a list containing all n-polygonal containing those two digits and the same concept but mapping last two digits

//We do an exhaust all options type algorithm where we do 6_P_6 => 6! steps problem (we work with 6 polygonal types)
	//we have n-polygonal types ordered by a permutation style algo (6 types choose 6)
	//In whatever specific order we're working with, going left to right, we check for a cycle matching our criteria (assumption: 2 digits only, can modify here to check 1,2,3 digits)

//if we don't find a solution once all options are exhausted, either theres a problem with our code OR.... derp  
function problem61() {
	const triNums = []
	let triIndex = 1
	function getNextTriangle() {
		const res = triIndex * (triIndex + 1) / 2
		triIndex++
		return res
	}

	let triNum = getNextTriangle()
	while ((triNum = getNextTriangle()) < Math.pow(10, 3)) {
		// triNum = getNextTriangle() // can just find the index that starts with the first tri num >= 1000 and start there too
	}

	while (triNum < Math.pow(10, 4)) {
		triNums.push(triNum)
		// firstTriNums.push(`${triNum}`.slice(0, 2))
		// lastTriNums.push(`${triNum}`.slice(2))
		// const first = `${triNum}`.slice(0, 2)
		// const last = `${triNum}`.slice(2)

		triNum = getNextTriangle()

	}
	
	const squareNums = []
	const firstToLastSquareNums = new Map()

	let squareIndex = 1
	function getNextSquare() {
		const res = Math.pow(squareIndex, 2)
		squareIndex++
		return res
	}

	let squareNum = getNextSquare()
	while (squareNum < Math.pow(10, 3)) {
		squareNum = getNextSquare()
	}

	while (squareNum < Math.pow(10, 4)) {
		squareNums.push(squareNum)
		// const first = `${squareNum}`.slice(0, 2)
		// const last = `${squareNum}`.slice(2)

		// const list = firstToLastSquareNums.get(first)

		// if (list === undefined) {
		// 	firstToLastSquareNums.set(first, [last])
		// } else {
		// 	list.push(last)
		// }
		squareNum = getNextSquare()
	}




	const pentaNums = []
	const firstToLastPentaNums = new Map() 
	let pentIndex = 1
	function getNextPentagonal() {
		//n(3n -1) / 2
		const res = pentIndex * ((3 * pentIndex) - 1) / 2
		pentIndex++
		return res
	}

	let pentaNum = getNextPentagonal()
	while (pentaNum < Math.pow(10, 3)) {
		pentaNum = getNextPentagonal()
	}

	while (pentaNum < Math.pow(10, 4)) {
		pentaNums.push(pentaNum)
		// const first = `${pentaNum}`.slice(0, 2)
		// const last = `${pentaNum}`.slice(2)

		// const list = firstToLastPentaNums.get(first)
		// if (list === undefined) {
		// 	firstToLastPentaNums.set(first, [last])
		// } else {
		// 	list.push(last)
		// }
		pentaNum = getNextPentagonal()
	}




	const hexaNums = []
	const firstToLastHexaNums = new Map()


	let hexaIndex = 1
	function getNextHexagonal() {
		//n(2n - 1) 
		const res = hexaIndex * ((2 * hexaIndex) - 1)
		hexaIndex++
		return res
	}

	let hexaNum = getNextHexagonal()
	while (hexaNum < Math.pow(10, 3)) {
		hexaNum = getNextHexagonal()
	}

	while (hexaNum < Math.pow(10, 4)) {
		hexaNums.push(hexaNum)
		// const first = `${hexaNum}`.slice(0, 2)
		// const last = `${hexaNum}`.slice(2)

		// const list = firstToLastHexaNums.get(first)

		// if (list === undefined) {
		// 	firstToLastHexaNums.set(first, [last])
		// } else {
		// 	list.push(last)
		// }
		hexaNum = getNextHexagonal()
	}



	const heptaNums = []
	// const firstToLastHeptaNums = new Map()
	let heptaIndex = 1
	function getNextHeptagonal() {
		//n(5n - 3) / 2
		const res = (heptaIndex * ((5 * heptaIndex) - 3)) / 2
		heptaIndex++
		return res
	}

	let heptaNum = getNextHeptagonal()
	while (heptaNum < Math.pow(10, 3)) {
		heptaNum = getNextHeptagonal()
	}

	while (heptaNum < Math.pow(10, 4)) {
		heptaNums.push(heptaNum)
		// const first = `${heptaNum}`.slice(0, 2)
		// const last = `${heptaNum}`.slice(2)

		// const list = firstToLastHeptaNums.get(first)

		// if (list === undefined) {
		// 	firstToLastHeptaNums.set(first, [last])
		// } else {
		// 	list.push(last)
		// }
		heptaNum = getNextHeptagonal()
	}

	const octaNums = []
	const firstToLastOctaNums = new Map(
		)
	let octaIndex = 1
	function getNextOctagonal() {
		//n(3n - 2)
		const res = octaIndex * ((3 * octaIndex) - 2)
		octaIndex++
		return res
	}

	let octaNum = getNextOctagonal()
	while (octaNum < Math.pow(10, 3)) {
		octaNum = getNextOctagonal()
	}

	while (octaNum < Math.pow(10, 4)) {
		octaNums.push(octaNum)
		// const first = `${octaNum}`.slice(0, 2)
		// const last = `${octaNum}`.slice(2)

		// const list = firstToLastOctaNums.get(first)

		// if (list === undefined) {
		// 	firstToLastOctaNums.set(first, [last])
		// } else {
		// 	list.push(last)
		// }
		octaNum = getNextOctagonal()
	}

	const figTypes = [3,4,5,6,7,8]
	// const figTypes = [3,4,5]
	const figTypeNums = []
	const figTypeNumsSplit = []
	figTypeNums['3'] = triNums
	figTypeNums['4'] = squareNums
	figTypeNums['5'] = pentaNums
	figTypeNums['6'] = hexaNums
	figTypeNums['7'] = heptaNums
	figTypeNums['8'] = octaNums
	//Now that we have some sort of structure for each type of figurate/polygonal number matching

	//create map, n-polygonal fig type to object containing "start" and "end" maps
	for (const figType of figTypes) {
		const figNums = figTypeNums[figType]
		//start map: 00-99 => list of n-polygonal numbers starting with num in range [00-99] 
		//end map => 00-99 => list of n-polygonal numbers ending in num in range [00-99]

		const start = new Map()
		const end = new Map()

		// console.log(`The ${figType}-polygonal numbers are ${figTypeNums[figType]}`)
		for (const figNum of figNums) {
			const s = `${figNum}`.slice(0, 2)
			const e = `${figNum}`.slice(2)
			
			if (start.has(s)) {
				start.get(s).push(e)
			} else {
				start.set(s, [e])
			}

			if (end.has(e)) {
				end.get(e).push(s)
			} else {
				end.set(e, [s])
			}
		}

		figTypeNumsSplit[figType] = {start, end}
	}

	// use figurate types to determine cycle order
		// if all of the orders are exhausted and we haven't found a solution, either code is wrong... or we wrote the code poorly... 
	const limit = factorial(figTypes.length)
	let i = 0
	while (i < limit) {
		//work with the current fig type order
		//if this particular order has no solutions, check next order
		
		//We check all fig nums of our left most fig type
			//specifically all endings of our left most fig type
		const baseFigType = figTypes[0]
		const baseEnds = figTypeNumsSplit[baseFigType].end;


		for (const baseEnd of baseEnds.keys()) {
			const baseStartValues = figTypeNumsSplit[baseFigType].end.get(baseEnd)
			let pointer = 1
			let leftEnd = baseEnd


			let outputScramble = []
			const nestedStack = new Array(figTypes.length).fill(null).map(() => new Array())

			while (pointer < figTypes.length && pointer > 0) {
				const rightStarts = figTypeNumsSplit[figTypes[pointer]].start

				if (rightStarts.has(leftEnd)) {
					//we need to store end values from right end that have a start matching left end value
					outputScramble.push(leftEnd, leftEnd)
					nestedStack[pointer] = rightStarts.get(leftEnd).slice()
					pointer++
					leftEnd = nestedStack[pointer - 1].pop()
				} else {
					leftEnd = nestedStack[pointer - 1].pop()
					while (leftEnd === undefined) {
						pointer--
						if (pointer < 1) break;
						leftEnd = nestedStack[pointer - 1].pop()
					}
				}
			}

			// if (pointer < 1) {
			// 	//cycle not found check next
			// }

			if (pointer === figTypes.length) {
				//at this point, we just need to see if our base start matches with any of the end digits for the right most fig type
				//we could check each end fig type to see if its our start or one of our starts, OR check if one of our base starts is in the right fig end digts 

				//we already stored our leftmost starts at baseStartValues
				//we have variable leftEnd to track our end digits still and pointer is pointing at the rightmost figure, 
				while (leftEnd !== undefined) {
					for (const s of baseStartValues) {
						// if (s === leftEnd) return 'Cycle found, add additional data here'
						if (s === leftEnd) {
							outputScramble.unshift(leftEnd)
							outputScramble.push(leftEnd)

							const lessScrambled = []
							for (let i = 0; i < outputScramble.length; i = i + 2) {
								lessScrambled.push(`${outputScramble[i]}${outputScramble[i + 1]}`)
							}

							console.log(`Cycle found, verifying fig order ${figTypes}, ${lessScrambled}`)
							for (let i = 0; i < figTypes.length; i++) {
								const f = figTypes[i]
								if (!figTypeNums[f].includes(Number(lessScrambled[i]))) {
									console.log(`wait, ${lessScrambled[i]} is not an ${f}-polygonal number`)
								}
							}
							// return(`Cycle found with the following fig order: ${figTypes}, ${lessScrambled}`)
							console.log('verified')
							const outputSum = lessScrambled.reduce((acc, curr) => acc + Number(curr), 0)
							return `The sum of our 6 numbers that form a cycle in the order specified by P61 of Project Euler is ${outputSum}`
						}
					}

					leftEnd = nestedStack[pointer - 1].pop()
				}

			}
		}

		nextPermutation(figTypes)
		i++
	}
	console.log(`Yeah it didn't work`)
			//maybe k digits, where k = 2 initial assumption is wrong
		//Once all options in that order are exhuated,
			//i.e. leftmost n-polygonal type exhausts all 4 digit numbers without a solution
			//We try the next option 
}

// console.log(problem61())


//Option 1:
	//Store all 4 digit results of the figurate numbers
		//assuming we are looking for 2 digit cycles, so last two digits of one digit matches first two digits of another figurate numbers we haven't seen yet
			//we can rewrite our code to check for last 1-3 digit matching first/first three digit(s) of unseen marked figurate numbers sets
				//for the sake of a quick solution instead of a generalized one, we check for 2 digit cycles first, if there isn't one, we check forr 1 or 3, if there isn't one, issue is probably within our code

//Option2: 
	//Start with triangular numbers 
		//Check last two digits of each 4 digit triangular number and see if we can those two digits start any of our later polygonal numbers 
			//Most likely will need two data structures for constant time look up per figurate sets
				//i.e. triagonal numbers have a data structure storing all unique (use set?) first two digit values in triagonal numbers and another structure storing all last two digit values for triagonal numbers
				//Do ^ for all the 4 digit polygonal numbers grouped in sets by their figurate
	//Once we've exhausted all triangular numbers, start of our cycle could be any of the other figurates and a triangular number is in the middle
		//This is an get all permutation style proccess... 

//Option2 definitely seems like the more efficient solution since it makes use of data structures to prevent repetitive work
	//Considering we are only looking at 4 digit polygonal numbers, our data structures technically have a constant space complexity, 
	//We are also working with the asssuption that the cycles only invovle two digits, if the cycles coiuld be 1 digit or even 3 digits (4 digits would only work if there would a 4 digit number that exists in every figurate set)
		//if there are 1 or 3 digit cycles, we may need to make use of more data structures to store these patterns, but again we're expecting constant space due to being 1-3 digits from 4 digit numbers only, i.e. a limited amount
	//Option 2 is actually just option 1 worked out to store "sub" digits instead of the number as a whole... oh




const testArr = [4,5,6,7]
// [4,5,6,7] 
// [4,5,7,6]
// [4,6,5,7]
// [4,6,7,5] // find first digit where last is less than, than find first digit where last digit is greater, swap those two
// [4,7,5,6]
// [4,7,6,5]
// [5,4,6,7]

//In-place swap, returns nothing
function swap(arr, i, j) {
	const tmp = arr[i]
	arr[i] = arr[j]
	arr[j] = tmp
}

//Modified reverse, instead of reversing the whole array, it reverses a subsection of the list in place
function reverse(arr, i, j = arr.length - 1) {
	while (i < j) {
		swap(arr, i, j)
		i++
		j--
	}
}

function factorial(n) {
	const dp = [1, 1]
	while (dp.length <= n) {
		dp.push(dp.length * dp[dp.length - 1])
	}
	return dp[n] //same thing as dp[dp.length - 1]
}

function nextPermutation(arr) {
	let i = arr.length - 1
	// from right to left find pair such that right > left
		//keep track of left value
	// starting at the right side again, find first value > the stored left value
		//swap
		//than reverse the list

	while (i > 0) {
		if (arr[i - 1] < arr[i]) {
			let j = arr.length - 1 

			while (arr[j] <= arr[i - 1]) {
				j--
			}
			swap(arr, i - 1, j)
			reverse(arr, i)
			return;
		}
		i--
	}
	
	//reverse the whole array
	reverse(arr, i)
}

//for a list of length n, we expect n! n choose n permutations
// for (let i = 0; i < factorial(testArr.length); i++) {
// 	console.log(testArr)
// 	nextPermutation(testArr)
// }

//dfs type of solution
const testTree = gf.treeify([0,1,2,3,4,5,6,7,8, 9])


//DFS algorithm without use of recursion
//The idea really is to come up with something that _could_ help with p61
function dfs(tree) {
	const root = tree
	const stack = [root]

	while(stack.length > 0) {
		const curr = stack.pop()
		console.log(curr.val)
		if (curr.right) stack.push(curr.right);
		if (curr.left) stack.push(curr.left);
	}
}


// dfs(testTree) // Expect order: 0 1 3 7 8 4 9 2 5 6 
const testSet = new Set()

class Node {
	constructor(val, left, right) {
		if (val === undefined) {
			throw new Error('Please provide a val for node')
		}
		this.val = val
		this.left = left || null
		this.right = right || null
	}
}

const testNode = new Node(2)
let testArr1 = [1,2,3]
let testArr2 = testArr1

testSet.add(testArr1)
testArr1 = 'different data type'
// console.log(testSet.has(testArr1)) //false
// console.log(testSet.has(testArr2)) //true
// console.log(testSet.has([1,2,3])) // false


//Problem 62

//The idea is we take a number n cubed, and sort the digits in order from LTG and we store that specific orderr
	//if we see that order again, it means another number cubed contains the same permutation - store in a list tied by that specific permutation
//Each time we reach a new order of magnitude (add another digit for the cubed form)
	//none of our previous options will work so we can optimize storage by wiping previous options
function problem62(n = 1, target = 3) {
	let res = null
	
	const permutations = new Map()
	while (res === null) {
		const cubedN = Math.pow(n, 3)
		const digits = `${cubedN}`.split('');
		digits.sort((a, b) => a - b)

		if (permutations.has(digits.join(''))) {
			const candidates = permutations.get(digits.join(''))
			candidates.push(cubedN)
			if (candidates.length === target) {
				res = candidates[0] //by nature of its insertion order, the smallest value should be the first one in the list
			}
		} else {
			permutations.set(digits.join(''), [cubedN])
		}

		n++
	}

	return res
}

// console.log(problem62(346, 5))

//Problem 63
//How many n-digit postive integers exists where it is also an n-th power number
	//ex: 16807 is 5 digits and also 7^5
function problem63() {
	let res = 0
	//Soooo whats our limit??
	//We go until any number to the power of n will ALWAYS have more than n digits

	let n = 1
	//inclusive exclusive range: [min, max) for numbers that have n digits
	let min = Math.pow(10, n - 1)
	let max = gf.strPow('10', n)
	// The smallest number whose n-th power is >= min
	let num = Math.ceil(Math.pow(min, (1 / n)))
	while (gf.compareStrNums(`${gf.strPow(`${num}`, n)}`, max) === -1) {
		while (gf.compareStrNums(`${gf.strPow(`${num}`, n)}`, max) === -1) {
			// gf.compareStrNums(`${Math.pow(num, n)}`, max)
			console.log(num, n, gf.strPow(`${num}`, n), max)
			res++
			num++
		}
		n++
		min = Math.pow(10, n -1)
		max = gf.strPow('10', n)
		num = Math.ceil(Math.pow(min, (1 / n)))
	}

	return res
}

// console.log(problem63())


//_PROBABLY_ going to need more decimal precision 
	//idk what javascript has to offer for irrational values... 
	//but maybe to check for a cycle, we can split our irrational value into a numerator and denominator
		//and then we keep track of the irrational values involved in either and 
		//ex: 23 + 5 + sqrt(10) !== 23 + 3 + 1 + sqrt(10)


//Let b_n = a_n + x_n; a = set of all (postive?) integers 
//let b_0 = Math.sqrt(n)
//let a_n = Math.floor(b_n)
	//x_n = 1 / b_n + 1 => b_n = 1 / x_n - 1
	//Should have everything we need (except maybe precision) 
function problem64() {
	function convertIrrationalNumToCF(n) {
		const intValues = []
		const irrationalValues = []
		let tmp = Math.sqrt(n)
		intValues.push(Math.floor(tmp))
		irrationalValues.push(tmp - intValues[0])
		tmp = 1 / irrationalValues[0]

		//While we find something that confirms the cycle/period 
		while(null) {
			intValues.push(Math.floor(tmp))
			irrationalValues.push(tmp - intValues[intValues.length - 1])
			tmp = 1 / irrationalValues[irrationValues.length - 1]
		}
	}
}



//logically, really high number has a high numerator and a low denominator
	// denominator = totient(n), to get a low totient(n), we get as many different prime values involved as possible
		//to do this we keep multiplying by the next smallest prime number while the final product stays under our limit
			//so..... 2 * 3 * 5 * 7 * ... 
			//in other words: let p_i = a prime in the set of primes, Max(product(p_0 + p_1 + ... P_k) < limit)

	//ex: n = 10, 2 * 3 * 5 > 10; so 2 * 3 = 6, there are 
function problem69(limit) {
	if (limit < 2) {
		return 0
	}

	const {primes} = gf.getPrimeData(limit)
	
	let n = 1
	let primeIndex = 0
	while (n * primes[primeIndex] < limit) {
		n *= primes[primeIndex]
		primeIndex++
	}
	
	return n;
	function primeFactorization(n) {
		let num = n
		let res = {}
		//the greatest number that can divide into n is Math.sqrt(n)
		let primeIndex = 0

		while(num > 1 && primeIndex < primes.length) {
			const prime = primes[primeIndex]

			if (num % prime === 0) {
				if (res[prime] === undefined) res[prime] = 1;
				else res[prime]++;

				num = num / prime
			} else {
				primeIndex++
			}
		}

		if (num !== 1) {
			//num should be a prime number
			if (res[num] === undefined) res[num] = 1;
			else res[num]++;
		}

		return res;
	}	
	//Given a number n
	//return the number of positive integers relatively prime to n
	function totient(n) {
		if (n === 1) return 0;
		let count = 1 //1 is relatively prime to all numbers n >= 2
		let num = 2
		const primeFactors = Object.keys(primeFactorization(n))
		while (num < n) {
			let i = 0
			while (i < primeFactors.length) {
				if (num % Number(primeFactors[i]) === 0) {
					break;
				}
				i++
			}

			if (i === primeFactors.length) {
				//relatively prime
				count++
			}
			num++
		}
		
		return count
	}

	return res
}

console.log(problem69(Math.pow(10, 6) + 1))