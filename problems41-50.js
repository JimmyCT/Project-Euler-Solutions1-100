const gf =  require(__dirname + '/generalFunctions.js');


//Problem 41 Pandigital Prime

//Pandigital 1 to n, can n be greater than 9?, then we'd need to check for primes above 9 digits
//We're going to assume n <= 9

//Option 1, get all primes less than a billion, and test for pandigital,
	//getting all primes using sieve of era (sorry i can't spell this) n(log(n))
	//Check for pandigital is pretty simple constant time process basically worst case is O(9)
//Option 2, do a permutation style route with numbers 1, 2, ... , n and check if prime
		//permutation style will involve sum of 1P1 + 2P2 + ... + 9P9 possiblle permutations 
			//can optimize by starting with 9P9 and then doing early termination if found since it'd be considered higher than any lower amount of digit possibilites
		//The check itself will be a sqrt(num) process, 
		
	//so we'd be doing sqrt(num) on all those permutations
function problem41() {

	function isPandigital(strNum) {
		const n = strNum.length
		const seenDigits = new Array(n + 1).fill(false)
		for (const digit of strNum) {

			if (Number(digit) > n || digit === '0' || seenDigits[digit]) {
				return false
			}
			seenDigits[digit] = true
		}
		return true
	}

	// console.log(isPandigital('999999937'))
	// return 'tits'
	function isPrime(num) {
		for (let i = 2; i <= Math.sqrt(num); i++) {
			if (num % i === 0) return false;
		}
		return true;
	}
	//lets go greatest to least so when we find a pandigital we number, we know its already the greatest
	let num = Math.pow(10, 9) - 1
	while(num > 1) {
		// if (isPandigital(`${num}`) && isPrime(num)) {
		// 	return `${num} is the highest possible pandigital prime number`
		// }
		if (isPandigital(`${num}`)) {
			console.log(`${num} is pandigital, checking if prime`)
			if (isPrime(num)) {
				return `${num} is the highest possible pandigital prime number`
			}
			console.log('nope, not prime')
		}
		num--
	}

	return `1 because something went wrong`
}

// console.log(problem41())

//Problem 42 Coded triangle Numbers

async function problem42() {
	let triWordCount = 0

	const words = await gf.fetchData(__dirname + '/problem42.txt').then((res) => {
		return res.split(',').map((str) => str.replace(/^['"]|['"]$/g, ''))

	})
	let triangularNumberSet = new Set()
	triangularNumberSet.add(1)
	
	let lastTriNum = 1
	let incrementer = 2

	function helperExpandTriNums(n) {
		while (lastTriNum < n) {
			lastTriNum += incrementer
			triangularNumberSet.add(lastTriNum)
			incrementer++
		}
	}

	// console.log ('A'.charCodeAt(0) - 64)
	// console.log('Z'.charCodeAt(0) - 64)
	for (const word of words) {
		let wordValue = 0
		for (const char of word) {
			const charValue = char.charCodeAt(0) - 64
			wordValue += charValue
		}

		if (wordValue > lastTriNum) {
			helperExpandTriNums(wordValue)
		}

		if (triangularNumberSet.has(wordValue)) {
			console.log(`The word ${word} is a triangle word`)
			triWordCount++
		}
	}

	return {words, triWordCount}
}	

// problem42().then((res) => {
// 	console.log(`The text containing ${res.words.length} has ${res.triWordCount} words that are considered triangle words`)
// })


//problem43 sub-string divisiblity

//Permutation style algorithm to get all 0-9 pandigital numbers, ignore cases with a leading zero
//Sliding window technique to get substring sums
function problem43() {
	let sum = 0
	let digits = [1, 0, 2, 3, 4, 5, 6, 7, 8, 9];

	//in places changes digits to its next permutation
	//helper func specifically for this func
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

	function helper() {
		let i = digits.length - 1

		while (i > 0) {
			if (digits[i] > digits[i - 1]) {
				let j =  digits.length - 1
				while (digits[j] <= digits[i - 1]) {
					j--
				}
				//list[j] > list[i - 1]
				swap(i - 1, j)
				//reverse list from i to end
				reverse(i, digits.length - 1)
				return
			}
			i--
		}
		//list is GTL order
		reverse(0, digits.length - 1)
	}

	let primes = [2,3,5,7,11,13,17]

	while(digits[0] !== 0) {
		// console.log(`Checking ${digits.join('')}`)
		let i = 0
		while (i < primes.length) {
			const num = Number(digits.slice(i + 1, i+ 4).join(''))
			if (num % primes[i] !== 0) {
				break;
			}
			i++
		}
		if (i === primes.length) {
			console.log(`The 0-9 pandigital number ${digits.join('')} has the unique property in this problem`)
			console.log(`Adding to our current sum of ${sum}`)
			sum += Number(digits.join(''))
			console.log(`New sum: ${sum}`)
		}
		helper()
	}

	return sum
}

// console.log(`The sum of all 0-9 Pandigital numbers with the unique property is, ${problem43()}`)

//problem 44 Pentagon Numbers

//Note: Come back later and write an optimized solution perhaps?

//What is our limit?
//We could find a pair of pentagon numbers where they both sum and diff are pentagon numbers
	//the first number we find is the minimum diff (D) so far
	//if pairs have a difference greater than or equal to our value we don't really care
		//if its less than, then we check sum and diff if they are pentagon values (Set/HT for constant time look up)

//SO what is our limit?
	//we test numbers within range, so once we find a value D, theres no point in testing pentagon number 1 with any value greater than 1 + D
	//what about an expanding list of pentagon numbers?
		//well eventually the difference between each "new" pentagon number will always be greater than D, so it'll be impossible to see a new one

function problem44() {
	//List of Pentagon numbers and a set/ht for constant time pentagon number check
	const pentagonNumbers = [0, 1,5,12]
	const pNumSet = new Set(pentagonNumbers)

	//Find value D

	//Helper func that adds 10 more numbers to our list
	function expandPentaNums() {
		let i = 0
		while (i < 2) {
			const n = pentagonNumbers.length
			const pentagonNumber = (n * ((3 * n) - 1)) / 2
			pentagonNumbers.push(pentagonNumber)
			pNumSet.add(pentagonNumber)
			i++
		}
	}

	let D = null
	while (D === null) {
		let i = 1
		const lastPentagonIndex = pentagonNumbers.length - 1
		while (i < lastPentagonIndex) {
			const p_i = pentagonNumbers[i]
			let j = i + 1
			while (j <= lastPentagonIndex) {
				const p_j = pentagonNumbers[j]
				const diff = Math.abs(p_i - p_j)
				const sum = p_i + p_j

				if (sum > pentagonNumbers[pentagonNumbers.length - 1]) {
					while(sum > pentagonNumbers[pentagonNumbers.length - 1]) {
						expandPentaNums()
					}
				}
				if (pNumSet.has(diff) && pNumSet.has(p_i + p_j)) {
					console.log(`Assigning D =${diff} with values p_i:${p_i} and p_j${p_j}`)
					D = diff
				}
				j++
			}
			i++
		}		
	}

	if (D === null) {
		console.log('still not found... somehow')
	} else {
		console.log(D)
	}

	//while the last 2 pentagon numbers have a difference less than D, expand our list
	let n = pentagonNumbers.length 
	let diff = Math.abs(pentagonNumbers[n - 1] - pentagonNumbers[n - 2])
	while (diff < D) {
		// console.log(pentagonNumbers[n - 1], pentagonNumbers[n - 2], diff)
		// console.log('expanding our list')
		expandPentaNums()
		diff = Math.abs(pentagonNumbers[n - 1] - pentagonNumbers[n - 2])
		n = pentagonNumbers.length
	}
	//once our list is at its "limit"

	//starting at the 1st pentagon number, checking all subsequent pentagon numbers where the difference between them is less than D,
		//check sum and diff for pentagon numberr
		//re-assign D as necessary
	let i = 1
	n = pentagonNumbers.length
	while (i < n - 1) {
		let j = i + 1
		const p_i = pentagonNumbers[i]
		while (j < n) {
			const p_j = pentagonNumbers[j]

			const sum = p_i + p_j
			const diff = Math.abs(p_i - p_j)

			if (diff >= D) {
				break;
			}
			if (!pNumSet.has(diff)) {
				j++
				continue;
			}

			while (sum > pentagonNumbers[pentagonNumbers.length - 1]) {
				expandPentaNums()
			}

			if (pNumSet.has(sum)) {
				//D < diff, no need for a comparison check
				D = diff
			}
			j++
		}
		i++
	}
	console.log('quick check', pNumSet.has(D))
	//once list is exhuasted, we're done
	return D
	//We can optimize potentially by doing the range check first and expanding our list as we hit our bounds and each time we expand our bounds also check if the difference between the last two is less than D

}

// console.log(`D = ${problem44()}`)

//problem45 Triangular, Pentagonal, and Hexagonal

//We're looking for a solution past T_285, P_165, and H_143, ANY solutions before should be ignored

//Note: Post solution: keeping track of penta nums and hexa nums is unnecessary, just need to keep track of their existence, keep track of the index of the last penta/hexa number and, keep track the value of the last penta/hexa num
function problem45() {
	const triNums = [0, 1,3,6,10,15];
	// const triNumSet = new Set(triNums)

	const pentaNums = [0, 1, 5, 12, 22, 35]
	const pentaNumSet = new Set (pentaNums) 

	const hexaNums = [0, 1, 6, 15, 28, 45]
	const hexaNumSet = new Set(hexaNums)

	//adds the next 10 triangular numbers to the list
	function expandTriNums() {
		for (let i = 0; i < 10; i++) {
			const n = triNums.length
			const nextTriNum = (n * (n + 1)) / 2
			triNums.push((n * (n + 1)) / 2)
		}
	}

	function expandPentaNums() {
		for (let i = 0; i < 10; i++) {
			const n = pentaNums.length
			const nextPentaNum = (n * ((3 * n) - 1)) / 2

			pentaNums.push(nextPentaNum)
			pentaNumSet.add(nextPentaNum)
		}
	}

	function expandHexaNums() {
		for (let i = 0; i < 10; i++) {
			const n = hexaNums.length
			const nextHexaNum = n * ((2 * n) - 1)

			hexaNums.push(nextHexaNum)
			hexaNumSet.add(nextHexaNum)
		}
	}

	//expand each list to the example provided so we can find another solution after
	while (triNums.length < 285) {
		expandTriNums()
	}

	while (pentaNums.length < 165) {
		expandPentaNums()
	}

	while (hexaNums.length < 143) {
		expandHexaNums()
	}

	let triIndex = 286
	let res = null
	while (res === null) {
		while (triIndex < triNums.length) {
			const num = triNums[triIndex]
			//check if penta and hexa
			while (num > pentaNums[pentaNums.length - 1]) {
				expandPentaNums()
			}
			while (num > hexaNums[hexaNums.length - 1]) {
				expandHexaNums()
			}
			if (pentaNumSet.has(num) && hexaNumSet.has(num)) {
				const pentaIndex = pentaNums.indexOf(num)
				const hexaIndex = hexaNums.indexOf(num)
				console.log(triIndex, pentaIndex, hexaIndex, num)
				return `${num} is a triangular number, pentagonal number, and hexagonal all at the same time `
			}
			//if not increment
			triIndex++
		}
		//once list is exhausted and no response is found, expand list
		expandTriNums()
	}

	console.log(`Hey we shouldn't have ever made it here, something went wrong check out problem45`)
}

// console.log(problem45())

//problem46 Proving one of Goldbach's conjectures false

//Find a composite number that can not be written as the sum of a prime and 2 times the square of a number

function problem46() {
	let res = null
	//get some primes numbers
	// const data = gf.getPrimeData(1000)
	// console.log('primes',data.primes)
	// console.log(data.primeBools)
	const {primes, primeBools} = gf.getPrimeData(1000)

	//start 4 (smallest composite number)
	let num = 5
	while(res === null) {
		let primeIndex = 0
		let prime = primes[primeIndex]
		let solutionFound = false
		//check all primes less than
		while (prime < num && !solutionFound) {
			//for each prime check if there is a "matching" number that fits the conjecture
			if (Number.isInteger(Math.sqrt((num - prime) / 2))) {
				solutionFound = true
			}

			primeIndex++
			prime = primes[primeIndex]
		}
		//if there is a solution, we keep going
		//if there isn't a solution, the conjecture is thus proven false
		if (!solutionFound) {
			res = num
		}

		if (primes[primes.length - 1] < num + 1000) {
			gf.expandPrimes(primes, primeBools, 10000)
		}
		num += 2
		while(primeBools[num]) {
			num += 2
		}
	}
	return res

	//increment until the conjecture is proven false (we know for a fact it is false instead  of blindly searching)
}

// console.log(`${problem46()} proves the goldbach conjecture false`)

//problem 47 Distinct prime factors
function problem47() {
	const {primes, primeBools} = gf.getPrimeData(10000)


	//returns a HT: factor/count pair 
	function getPrimeFactors(num) {
		let res = {}
		if (num > primes[primes.length - 1]) {
			gf.expandPrimes(primes, primeBools, num - primes[primes.length - 1] + 10000)
		}

		for (const prime of primes) {
			let count = 0
			while (num % prime === 0) {
				num = num / prime
				count++
			}
			if (count > 0) {
				res[prime] = count
			}

			if (primeBools[num]) {
				res[num] = 1
				num = 1
			}
			if (num === 1) break;
		}

		return res
	}

	function getPFCount(num) {
		let res = 0
		if (num > primes[primes.length - 1]) {
			gf.expandPrimes(primes, primeBools, num - primes[primes.length - 1] + 10000)
		}

		for (const prime of primes) {
			let count = 0
			while (num % prime === 0) {
				num = num / prime
				count++
			}
			if (count > 0) {
				res++
			}

			if (primeBools[num]) {
				res++
				num = 1
			}
			if (num === 1) break;
		}

		return res
	}

	let num = 2
	let windowLength = 0
	while (windowLength < 4) {
		if (getPFCount(num + windowLength) === 4) {
			windowLength++
		} else {
			num = num + windowLength + 1
			windowLength = 0
		}
	}

	console.log(`${num} and the next 3 integers all have exactly 4 distinct prime factors`)
}

// problem47()

//problem 48 Self Powers


//we can optimize surely,
	//we only can about the last ten digits, so keeping track of our sum as well as values while getting the powers
		//we can just keep track the "last ten digits" or all digits if less than 10, for our overall sum, as well as what the last ten digits would look like for something like 729 ^ 729
function problem48() {
	//Given a string number and an integer pow
	//return the num ^ pow as a string
	function strPow(strNum, pow) {
		let res = '1'
		let i = 0
		while (i < pow) {
			// console.log(strNum, res, pow)
			res = gf.strMultiplication(res, strNum)
			i++
		}
		return res
	}

	let sum = '0'
	let i = 1
	while (i <= 1000) {
		// console.log('working with', i)
		sum = gf.strSum(sum, strPow(`${i}`, i))
		i++
	}	
	console.log(sum)
	console.log(`The last ten digits of the sum is ${sum.slice(sum.length - 10)}`)
}

//please don't uncomment this, it take a while to run
// problem48()


//problem49 Prime permutations

//We are looking for 3 4-digit numbers that are equidistant from each other
	// and they are all prime
function problem49() {
	const {primeBools} = gf.getPrimeData(10000)
	const checkedNums = new Array(10000).fill(false)
	let num = 1000
	while (num < Math.pow(10, 4)) {
		if (checkedNums[num]) {
			num++
			continue;
		}

		//ignore permutations that result in < 4 digits
		let digits = `${num}`.split('').sort() // sorted least to greatest
		let permutation = Number(digits.join(''))
		const smallestPermutation = permutation

		let permutations = []

		if (smallestPermutation >= 1000) {
			checkedNums[permutation]
			permutations.push(smallestPermutation)
		}
		gf.nextPermutationNums(digits)
		permutation = Number(digits.join(''))

		while(permutation !== smallestPermutation) {
			if (permutation >= 1000) {
				permutations.push(permutation)
				checkedNums[permutation] = true
			}


			gf.nextPermutationNums(digits)
			permutation = Number(digits.join(''))
		}

		//permutations list should be sorted least to greatest by nature of the permutation process

		//looking for 3 consecutive permutations that are equidistance from each other
		// for (let i = 0; i < permutations.length - 2; i++) {
		// 	const diff = permutations[i + 1] = permutations[i]
		// 	if (permutations[i + 2] - permutations[i + 1] === diff) {
		// 		//they are all equidistant, check for prime
		// 		const p1 = primeBools[permutations[i]]
		// 		const p2 = primeBools[permutations[i + 1]]
		// 		const p3 = primeBools[permutations[i + 2]]
		// 		console.log(p1, p2, p3, `are all equidistant from each other and a permutation of each other`)
		// 		if (primeBools[p1] && primeBools[p2] && primeBools[p3]) {
		// 			console.log(`The following values ${p1}, ${p2}, ${p3} are all  4 digit permutations of each other, they are all prime, and they are all ${diff} from each other`)
		// 		}
		// 	}
		// }

		let i = 0
		while (i < permutations.length - 2) {
			const p1 = permutations[i]

			let j = i + 1
			while (j < permutations.length - 1) {
				const p2 = permutations[j]
				const diff = p2 - p1


				let k = j + 1
				while (k < permutations.length) {
					const p3 = permutations[k]
					if (p3 - p2 === diff) {
						// console.log(`values ${p1}, ${p2}, ${p3} are all equidistant from each other and permutations of each other`)
						// console.log('commencing prime check')
						
						if (primeBools[p1] && primeBools[p2] && primeBools[p3]) {
							console.log(`values ${p1}, ${p2}, ${p3} fit the quota of the problem`)
						}	
					}
					k++
				}
				j++
			}
			i++
		}
		num++
	}

	console.log('All 4-digit numbers have be worked')
}

// problem49()

//problem 50 Consecutive Prime sum


//alright I can't think of a quick efficient solution, lets brute froce
//we're going to ignore 953 having 21 consecutive terms for a more generalized solution
	//actually working with that fact might make an inefficient solution...

//Start at 2, sum up primes until sum is greater than a million
	//along the way check if each sum is a prime number (less than a million)
		//if it is, record the length
			//any future checks will have that length as a minimum
	//Once sum is greater than a million
//we repeat the process at 3,
//brute force means we do this until our leftmost number is < 1 million
	//we could stop a bit earlier by seeing if the current prime index + the answer length will result in a prime absolutely greater than 1million, then no point in summing
		//we could also make it more efficient by dividing the 1 million by the answer, so if we have 21 consecutive terms, there no point in adding a number greater than 1mil / 21 as the left most because 21 of those terms will guranteed be greater than 1 million
			//while (leftmost prime < 1million / answer)
function problem50() {
	const {primes, primeBools} = gf.getPrimeData(Math.pow(10, 6) + Math.pow(10, 5) * 5)

	let resLength = 1 //a prime number by itself sums up to a prime number
	let res = null;

	let i = 0
	while (primes[i] < Math.pow(10, 6) / resLength) {
		const left = i
		let right = left
		let sum = 0

		while (sum < Math.pow(10, 6) && right < primes.length) {
			sum += primes[right]
			right++

			if (sum < Math.pow(10,6) && primeBools[sum] && right - left > resLength) {
				console.log(`${right - left} terms starting at ${primes[left]} sum up to ${sum}`)
				resLength = right - left
				res = sum
			}
		}
		i++
	}

	return res
}

// console.log(`The prime number less than 1 million with the most consecutive primes that sum up to it is ${problem50()}`)

