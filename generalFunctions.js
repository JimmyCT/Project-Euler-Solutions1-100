const fs = require('fs');

// **NOTE**
// Probably want to split into something more specific than "general" functions, 
// String funcs, math funcs, something something helper?

function fetchData(path) {
	return fs.promises.readFile(path, 'utf-8')
}

//Input: file path
//Output: Returns tree 

class Node {
	constructor(val) {
		this.val = Number(val)
		// this.left = null
		// this.right = null
	}

	methodExample() {
		// console.log('class node')
		return 'class node'
	}
}

class TreeNode extends Node {
	constructor(val, left = null, right = null) {
		super(val);
		this.left = left
		this.right = right
	}
}

class PyramidNode extends Node {
	constructor(val, left = null, right = null) {
		super(val);
		this.left = left;
		this.right = right;
	}
}




//Given a list of numbers,
//return the numbers as a tree
function treeify(nums) {
	//let parent node = p, then left childNode (lc) lc = 2p + 1 and right child (rc) rc = 2p + 2
	const n = nums.length
	if (n === 0) return null;

	const nodes = nums.map(num => new TreeNode(num))

	let i = 0
	// let i  be the current node, if 2i + 1 < n, then leftChild exists, if 2i + 2 < n right child exists
	// => if 2i + 1 >= n, then the previous node was the last parent node and we are done
	while((2 * i + 1) < n) {
		nodes[i].left = nodes[2 * i + 1]
		if (2 * i + 2 < n) {
			nodes[i].right = nodes[2 * i + 2]
		}

		i++
	}

	return nodes[0]
}

const testTree = treeify([0,1,2,3,4,5,6,7,8,9])
// console.log(testTree.val, testTree.leftChild.val, testTree.rightChild.val, testTree.leftChild.leftChild.val, testTree.leftChild.rightChild.rightChild)
//Given a list of numbers, return the numbers as a "pyramid" 

// function pyramidify(nums) {
// 	const n = nums.length
// 	if (n === 0) return null
// }

// 0 => 1, 2 (n(n + 1) / 2)
// 1 => 3,4
// 2 => 4, 5
// 3 => 6, 7
// 4 => 7, 8
// 5 => 8, 9 
// 6 => 9, 10

async function convertFileIntoTree(path) {
	let res = null
	await fetchData(path).then((data) => {

		const lines = data.split('\n')
											.filter(line => line.trim() !== '')
											.map(line => line.trim());

		const nums = lines.map(line => line.split(' ')).flat()
		console.log(nums)
		
		const tree = treeify(nums)
		res = tree
	})
	return res
}

//Given a nested list of nums in pyramid order
//return a pyramid data structure of the list provided
function pyramidify(nestedNums) {
	if (nestedNums.length === 0) return null;	
	const n = nestedNums.length

	const nestedNodes = nestedNums.map(nums => nums.map(num => new PyramidNode(num)));
	const root = nestedNodes[0][0]
	
	let i = 1
	while (i < nestedNodes.length) {
		const prevRow = i - 1
		const currRow = i

		let j = 0
		while (j < nestedNodes[prevRow].length) {
			const parentNode = nestedNodes[prevRow][j]
			const leftChildNode = nestedNodes[currRow][j]
			const rightChildNode = nestedNodes[currRow][j + 1]
			if (leftChildNode === undefined) {
				return root
			} else {
				parentNode.left = leftChildNode
			}

			if (rightChildNode === undefined) {
				return root
			} else {
				parentNode.right = rightChildNode
			}
			j++
		}
		i++
	}

	return root
}
//Given a file containing lines of numbers already in pyramid order,
//convert and return the numbers in a pyramid data structure
async function convertFileIntoPyramid(path) {
	let res = null;
	await fetchData(path).then((data) => {
		const lines = data.split('\n')
											.filter(line => line.trim() !== '')
											.map(line => line.trim().split(' '));

		res = pyramidify(lines)
	});
	return res
}

//Given two string non-negative integers,
//Returrn the sum of both strings as a String

function strSum(str1, str2) {
	//Note: It would be easier to just create an empty array and push the digit sums (read) right to left then reverse the array at the end
	const res = new Array(Math.max(str1.length, str2.length) + 1).fill('0');

	let i = Math.max(str1.length, str2.length)
	let i1 = str1.length - 1
	let i2 = str2.length - 1 

	// let carry = 0 // carry is either 1 or 0, can also just check for a carry flag
	let carry = false
	while (i > 0) {
		const num1 = i1 >= 0 ? parseInt(str1[i1]) : 0
		const num2 = i2 >= 0 ? parseInt(str2[i2]) : 0

		// const sum = num1 + num2  + carry
		const sum = carry ? num1 + num2 + 1 : num1 + num2
		res[i] = '' + (sum % 10)
		if (sum > 9) {
			carry = true
		} else {
			carry = false
		}
		i--
		i1--
		i2--
	}

	//i === 0
	if (carry) {
		res[i] = '1'
	} else {
		res.shift()
	}
	
	return res.join('')
}

//accepts two string nums
//returns a string num
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

	//we expect reverseProduct to be non-zero, otherwise it would've been handled in line 195
	while(reverseProduct[reverseProduct.length - 1] === 0) {
		reverseProduct.pop()
	}

	return reverseProduct.reverse().join('')
}

//Given a string number and integer power
//return a string number that is the number raised to the integer power provided
function strPow(strNum, pow) {
	let res = '1'

	let i = 0
	while (i < pow) {
		res = strMultiplication(res, strNum)
		i++
	}

	return res
}


// convertFileIntoTree(__dirname + '/problem18.txt').then((res) => {
// 	console.log('Hello World\n\n', res)
// })

//Given a pyramid like graph data structure of numbers,
//Starting at the top and moving to adjacent numbers below
//Return the max total sum possible

//assume all "bottom" number sums are arrived at the same row/depth
//INCOMPLETE
// function maxPathSumPyramid(root) {
// 	// let copy = new PyramidNode(root.val)
// 	let sums = [root.val]

// 	let queue = [root];
// 	let i = 0
// 	while (i < queue.length) {
// 		const node = queue[i]

// 		const nextQueue = []
// 		if (node.left !== null) nextQueue.push(node.left);
// 		if (node.right !== null) nextQueue.push(node.right);

// 		const nextSums = []

// 		queue = nextQueue
// 		i++
// 	}
// }
// convertFileIntoPyramid(__dirname + '/problem18.txt').then((res) => {
// 	if (res === null)  {
// 		console.log('Null response, check pyramid build for errors')
// 		return
// 	}
	
// 	maxPathSumPyramid(res);
// })

//Given a positive integer n, return all divisors of n
function getDivisors(n) {
	if (n < 1) {
		console.error('Function only accepts numbers greater than or equal to 1')
		return []
	}
	const leftDivisors = []
	const rightDivisors = []

	let i = 1
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

function getProperDivisors(n) {
	//I am lazy
	const divisors = getDivisors(n)
	divisors.pop()
	return divisors
}




//Prime functions together as a collective sucks, need to rework to prevent bugs and prevent errors
//Uses sieve of eratosthenes 

function getPrimes(n) {
	const primes = []
	const primeBools = new Array(n).fill(true) //primeBool[num] = true/false, boolean determines if index number is prime or not

	//start at 2 because 1 is not prime,
	let i = 2
	while (i < n) {
		if (primeBools[i]) {
			primes.push(i)
			let multiple = i + i;

			while (multiple < n) {
				primeBools[multiple] = false
				multiple += i
			}
		}

		i++
	}

	return primes
}

function getPrimeBools(n) {
	// const primes = []
	const primeBools = new Array(n).fill(true) //primeBool[num] = true/false, boolean determines if index number is prime or not

	//start at 2 because 1 is not prime,
	let i = 2
	while (i < n) {
		if (primeBools[i] === false) {
			i++
			continue;
		}
		// primes.push(i)
		let multiple = i + i;
		while (multiple < n) {
			primeBools[multiple] = false
			multiple += i
		}

		i++
	}

	return primeBools;
}

function getPrimeData(n) {
	const primes = []
	const primeBools = new Array(n).fill(true) //primeBool[num] = true/false, boolean determines if index number is prime or not

	//start at 2 because 1 is not prime,
	let i = 2
	while (i < n) {
		if (primeBools[i]) {
			primes.push(i)
			let multiple = i + i;

			while (multiple < n) {
				primeBools[multiple] = false
				multiple += i
			}
		}

		i++
	}

	return {primes, primeBools}
}

//Deprecated, please use expandPrimeData
function expandPrimes(primes, primeBools, addCount) {

	if (typeof newLimit !== 'number' || newLimit < primeBools.length) return;
	if (typeof primes !== 'object' || typeof primeBools !== 'object') {
		throw new Error(`Invalid prime data provided for expandPrimes function`) // this could be more specific since we treat it very specifically
	}

	let n = 1

	if (primeBools.length === 0) {
		primes = getPrimes(10)
		primeBools = getPrimeBools(10)
	}
	let min = primeBools.length //last known number that hasn't been checked
	let max = min + addCount

	const newPrimeBools = new Array(addCount).fill(true)
	for (const bool of newPrimeBools) {
		primeBools.push(bool);
	}
	
	for (let primeIndex = 0; primeIndex < primes.length; primeIndex++) {
		const primeVal = primes[primeIndex]
		let multiple = min
		while (multiple % primeVal !== 0) {
			multiple--
		}

		multiple = multiple === primeVal ? 2 * primeVal : multiple
		while (multiple < max) {
			primeBools[multiple] = false
			multiple += primeVal
		}
	}

	let i = min
	while (i < max) {
		if (primeBools[i]) {
			const primeVal = i
			primes.push(primeVal)
			let multiple = 2 * primeVal

			while (multiple < max) {
				primeBools[multiple] = false
				multiple += primeVal
			}
		}

		i++
	}
}

function nextPermutationNums(digits) {
	function swap(i, j) {
		const tmp = digits[i]
		digits[i] = digits[j]
		digits[j] = tmp
	}

	function reverse(i, j) {
		while (i < j) {
			swap(i, j)
			i++
			j--
		} 
	}

	let i = digits.length - 1
	while (i > 0 && digits[i] <= digits[i - 1]) {
		i--
	}
	if (i === 0) {
		reverse(0, digits.length - 1)
		return
	}

	//i > i - 1, find first num j such that j > i - 1
	let j = digits.length - 1
	while (digits[j] <= digits[i - 1]) {
		j--
	}
	swap(i - 1, j)
	reverse(i, digits.length - 1)
}

/* Random Testing Gibberish
const primesBase = getPrimes(2098)
const primes = getPrimes(98)
const primeBools = getPrimeBools(98)

while (primeBools.length < 10000000) {
	expandPrimes(primes, primeBools, primeBools.length + Math.pow(10, 6))
}
console.log(`Base primes, ${primesBase}`)
console.log('Hello World', primes, primeBools)
expandPrimes(primes, primeBools, 2000)
console.log('Good-bye World', primes, primeBools)
console.log(primes.length, primesBase.length, primeBools.length)
let flag = primes.length === primesBase.length && primeBools.length === 2000;
let flag = primeBools.length === 2098
for (let i = 0; i < primesBase.length; i++) {
	if (!flag) break;
	if (primes[i] !== primesBase[i]) {
		console.log(`Primes and basePrimes differ at the ${i}th index, we have prime:${primes[i]} and basePrime:${primesBase[i]}`)
		flag = false
	} 
}

if (flag) console.log(`primes and primesBase match perfectly`);
if (!flag) console.log(`Nope, they did not match`)

for (let i = 0; i < 200; i++) {
	// console.log(`Divisors of ${i}=${getDivisors(i)}`);
	console.log(`Proper Divisors of ${i}=${getProperDivisors(i)}`);
}


*/
module.exports = {strSum, strMultiplication, strPow, getPrimes, getPrimeBools, getPrimeData, expandPrimes, fetchData, nextPermutationNums}
