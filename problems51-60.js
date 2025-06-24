// const gf = require(__dirname + '/generalFunctions.js')
import gf from "./generalFunctions.js"
//problem 51 Prime digit replacements

// //Power set
// let testArr = [1,2,3,4,5]
// function powerSet(arr) {
// 	const res = []
// 	//power set = sum from r = 0 to r = n for n choose r 
// 	function combinationHelper(subArr, index, r) {
// 		if (subArr.length === r) {
// 			res.push(subArr.slice())
// 			return;
// 		}
// 		for (let i = index; i < arr.length; i++) {
// 			subArr.push(arr[i])
// 			combinationHelper(subArr, i + 1, r)
// 			subArr.pop()
// 		}
// 	}

// 	for (let r = 0; r <= arr.length; r++) {
// 		combinationHelper([], 0, r)
// 	}
// 	return res
// }

//Power set function
// const testList = [1,2,3,4]
function powerSet(list) {
	const res = new Set()
	// res.add('[]') //empty set

	function helper(i, sublist) {
		if (i === list.length) return;
		sublist.push(list[i])
		// res.push(sublist.slice())
		// res.add(`[${sublist}]`)
		res.add(`${sublist}`)
		helper(i + 1, sublist)
		sublist.pop()
		helper(i + 1, sublist)
	}
	helper(0, [])
	return res
}


// const testPowerSet = powerSet(testList)
// console.log(testPowerSet)
// console.log(testPowerSet.size)
//remove empty list and list itself
// testPowerSet.delete('[]')
// testPowerSet.delete(`[${testList}]`)
// console.log(testPowerSet)
// console.log(testPowerSet.size)


// 123 12 13 23 1 2 3 null, let n be size of our set S, let m be the size of the power set of set S, m = 2 ^ n 

//Now for our problem, we're essentially doing a power set minus the empty set portion and the portion that contains (n choose r) values where r = n = the number of values in the set
function modifiedPowerSet(arr) {
	const res = []

	function combinationHelper(subArr, index, r) {
		if (subArr.length === r) {
			res.push(subArr.slice())
			return;
		}
		for (let i = index; i < arr.length; i++) {
			subArr.push(arr[i])
			combinationHelper(subArr, i + 1, r)
			subArr.pop()
		}
	}

	for (let r = 1; r < arr.length; r++) {
		combinationHelper([], 0, r)
	}
	return res
}

//Modified power set works great as intended,


//Option1: Power set style algorithm to determine which digits to be replaced
	//For every prime number, let n be the number of digits of the prime number
	//let m be the number of prime numbers length n,
		//we'd be doing a 2^n time complexity on m prime numbers of length n, until we find a solution
		//the 2^n process chooses which digits to omit, we replace those digits with 1-9 (or 0-9), which we consider constant time work
			//but we still have to "zip the number" back together, i.e. the digit replacement and check process still takes n work
		
		//We're looking at m * n * 2^n 

//Option2: we go through all primes of n digits, 1,2,3,4...,n
	//for every prime number of length n, we do a O(n) process to store digit counts 
		//we use a nested lists style storage system, O(9^n) space
		//let m = num of prime numbers of length n
		//create storage space of space (10^n), its 9 * 10^(n - 1) to be precise
		//time = O(mn)

		//we store the count of a numbers 1-9 at for our leftmost digit in our top layered list,
			//with each count we include a sublist containing the count for numbers 0-9 in the next digit, with their own sublist

	//then similiar to option1, we do a power set style algo to decide which digit to "omit",e
		//for digits that are omitted, we use the count for every number in that digit index
		//for digits that are not omitted, we use the count for each number in that index individually

	// O(2^n) to determine which digits to omit
		// O(9 ^ n) process for value in our subset
		// => overall O((2^n)(9^n)) = O(18^n) time
	//same storage being used
		
//O(mn * 2^n) time, O(1) space relative to n, O(k) space where k = size of primeBools 
//O(18^n)time, O(9 ^ n) space for n > k and O(k) for n <= k, where k = size of primeBools



//Option 1 solution
//This solution takes a few liberties geared towards solving the specific problem instead of making a general solution 
function problem51(target, limit) {
	const {primes, primeBools} = gf.getPrimeData(Math.pow(10, limit))


	// let i = 0;
	// let prime = primes[i]

	// while (prime < 10) {
	// 	i++
	// 	prime = primes[i]
	// }
	//we know 56003 is the smallest prime in which we can find a 7 prime family
	//to find a prime family > 7, the number would absolutely have to be > 56003
	
	let i = primes.indexOf(56003)
	let prime = primes[i]

	const tmp = []
	let pvrs  //set containing lists telling which place values to be manipulate

	let n = 0
	while (n < `${prime}`.length) {
		tmp.push(n)
		n++
	}

	while (n <= limit) {
		pvrs = powerSet(tmp)
		//remove empty set and set itself
		// pvrs.delete('[]')
		pvrs.delete(`${tmp}`)

		while (prime < Math.pow(10, n)) {
			// if (prime === 56003) {
			// 	console.log('am i crazy?!')
			// 	console.log(pvrs)
			// 	return;
			// }
			const digits = `${prime}`.split('')

			//we want to ignore cases where we put 0 in the 0th index (think 0 index digits) 
				//any pvrs involving the 0th index, we look at digits 0-9

			for (let pvs of pvrs) {
				pvs = pvs.split(',')
				
				const copy = digits.slice()
				let primeFamily = []
				for (let replacementNum = 0; replacementNum <= 9; replacementNum++) {
					if (pvs[0] === '0' && replacementNum === 0) continue;
					for (const pv of pvs) {
						copy[pv] = replacementNum
					}

					const newNum = copy.join('')
					if (primeBools[newNum]) {
						primeFamily.push(newNum)

						// console.log(`${newNum} is a prime num formed by manipulating digits ${pvs} in ${digits.join()} to ${replacementNum}`)
						// console.log(`added to our prime family, now containing: ${primeFamily}`)
						if (primeFamily.length === target) {
							// console.log(primeFamily)
							console.log(`[${primeFamily}] are the first prime values where we see ${target} primes, by replacing the place values [${pvs}] specifically`)
							//since we test replacement numbers in order from least to greatest, the prime family is naturally ordered LTG as well
							return primeFamily[0];
						}
					}
				}
			}


			i++
			prime = primes[i]
		}
		console.log(`${prime ? `${prime} is greater than ${Math.pow(10, n)}, incrementing ${n} to ${n + 1}` : `Exceeded our limit, consider expanding the limit`}`)
		tmp.push(n)
		n++
	}

}
const t = [1,2,3,4]

// problem51(7, 6) //expect 56033
// problem51(8, 7) //P51 problem
//problem 52 Permuted Multiples


//return the smallest postive integer x such that x 2x 3x ... 6x all contain the same digits
function problem52() {
	let res = null
	let num = 1
	while (res === null) {
		const digits = `${num}`.split('')
		const digitToCount = {}
		let isPermutation = true // Different option is to make isPermutation a func that checks if two numbers are permutations of each other
		for (let i = 0; i < 10; i++) {
			digitToCount[i] = 0
		}
		for (const digit of digits) {
			digitToCount[digit]++
		}
		// console.log(`1`, digitToCount)
		let n = 2
		let multiple = num * n
		while (isPermutation && n < 7) {
			const multipleDigits = `${multiple}`.split('')
			const mDigitToCount = {}


			for (let i = 0; i < 10; i++) {
				mDigitToCount[i] = 0
			}

			for (const digit of multipleDigits) {
				mDigitToCount[digit]++
			}

			// console.log(n, mDigitToCount)

			for (let digit = 0; digit < 10; digit++) {
				if (digitToCount[digit] !== mDigitToCount[digit]) {
					isPermutation = false
				}
			}
			n++
			multiple = num * n
		}
		
		if (isPermutation) {
			console.log(`${num} and its next 5 multiples all contain the same digits`)
			for (let i = 1; i < 7; i++) {
				console.log(`${num * i}`)
			}
			res = num // can also just return the num here
		}
		num++
	}

	return res
}

// console.log(`lazy answer: ${problem52()}`);

//Problem 53 Combinatoric Selections

function problem53(max) {
	let res = 0

	function factorial(n) {
		let res = 1

		while (n > 0) {
			res *= n 
			n--
		}

		return res
	}

	function totalCombinations(n, r) {
		const top = factorial(n)
		const bottom = factorial(r) * factorial(n - r)
		return (top / bottom)
	}

	for (let n = 1; n <= max; n++) {
		let r = 0;
		while (r <= n) {
			if (totalCombinations(n, r) > Math.pow(10, 6)) {
				res++
			}
			r++
		}
	}
	return res
}


// console.log(`For n = 1 to n = 100, there are a total of ${problem53(100)} values where n choose r for r <= n results in a value greater than 1-million`)


//problem54 Poker Hands

//Think of it like making a poker game

async function problem54(handsFilePath) {
	let numWins = 0 //Number of wins for player 1
	//Check for hands can be broken up to make things simpler
		//is there a straight ? 
			//if yes, is it the highest level (10 - A) or once below (no Ace)
		//is there a flush?

		//At this point we've checked for potential royal flush, straight flush, straight and flush
		//if its straight or flush, theres no chance for four of a kind or full house
			//if its straight and flush, return if royal or straight
				//else return either straight or flush

		//at this point it has something to do with pairs
			//four of a kind
			//three of a kind + pair make a full hous
			//Three of a kind
			// 2 pairs
			// pair
			// high value ==> for cards with no "pairing", sort in greatest to least order
	function checkHand(hand) {
		const values = []

		let isFlush = true
		let isStraight = true
		let randomSuit = hand[0][hand[0].length - 1]
		for (const card of hand) {
			// let [value, suit] = card.split('')
			const suit = card[card.length - 1]
			let value = card.slice(0, card.length - 1)
	
			if (suit !== randomSuit) {
				isFlush = false
			}
			switch (value) {
				case 'J':
					value = 11
					break;
				case 'Q':
					value = 12
					break;
				case 'K':
					value = 13
					break;
				case 'A':
					value = 14;
					break;
				case 'T':
					value = 10;
					break;
				default:
					value = Number(value)
			}

			values.push(value)
			
		}
		values.sort((left, right) => left - right)
		
		for (let i = 0; i < 5; i++) {
			if (values[i] !== values[0] + i) {
				isStraight = false
			}
		}
		
		//if flush or straight, it can not be four of a kind or full house
		if (isFlush || isStraight) {
			if (isFlush) {
				if (isStraight) {
					if (values[values.length - 1] === 14) {
						return 'Royal Flush'
					} else {
						return 'Straight Flush'
					}
				} 
				return 'Flush'
			}

			return 'Straight'
		}


		let maxDupeCount = 1
		let uniqueValueCount = 0
		const valueToCount = {}

		for (const value of values) {
			if (valueToCount[value] === undefined) {
				valueToCount[value] = 1
				uniqueValueCount++
			} else {
				valueToCount[value]++
			}

			maxDupeCount = Math.max(maxDupeCount, valueToCount[value])
		}

		switch (maxDupeCount) {
			case 4:
				return 'Four of a Kind'
			case 3:
				if (uniqueValueCount === 2) {
					return 'Full House'
				}
				return 'Three of a Kind'	
			case 2:
				if (uniqueValueCount === 3) {
					//3 cards 2 pairs 1 solo
					return 'Two Pairs'
				}
				//4 cards, 1 pair, 3 solo
				return 'Pair'
			}
			return 'No Pair'
	}

	function compareHands(hand1, hand2) {
		const handToValue = { 'No Pair': 0, 'Pair': 1, 'Two Pairs': 2, 'Three of a Kind': 3,
												'Straight': 4, 'Flush': 5, 'Full House': 6,
												'Four of a Kind': 7, 'Straight Flush': 8, 'Royal Flush': 9 }

		const handValue1 = handToValue[checkHand(hand1)]
		const handValue2 = handToValue[checkHand(hand2)]

		if (handValue1 > handValue2) return '1';
		if (handValue2 > handValue1) return '2';
		// must be equal, do tie breaker
		// console.log('tieeeee breaker') 

		const values1 = hand1.map((card) => {
			val = card.slice(0, card.length - 1)
			switch (val) {
				case 'J':
					return 11;
				case 'Q':
					return 12;
				case 'K':
					return 13;
				case 'A':
					return 14;
				case 'T':
					return 10;
				default:
					return Number(val)
			}
		}).sort((left, right) => right - left)

		const values2 = hand2.map((card) => {
			val = card.slice(0, card.length - 1)
			switch (val) {
				case 'J':
					return 11;
				case 'Q':
					return 12;
				case 'K':
					return 13;
				case 'A':
					return 14;
				case 'T':
					return 10;
				default:
					return Number(val)
			}
		}).sort((left, right) => right - left)
		

		switch (handValue1) {
			case 9:
				// console.log('Group Case 1 The Royal Flush')
				//has to be a tie, we assume 52 playing cards, so they can't be of the same suit
				return 'Tie'
			//Get the high value between the two straights
			case 8:
			case 4:
				// console.log('group case 2 Straight or Straight Flush')
				if (values1[0] > values2[0]) return '1';
				else if (values1[0] < values2[0]) return '2';
				else return 'Tie'
			//4 of a kind, full house, three of a kind all have similiar logic,
				//check the matching card values (for 2 full houses, no two players can have the same 3 cards for their full house in a 52 card deck, we work with this assumption)	
			case 7:
			case 6:
			case 3:
				// console.log('group case 3 4 of a kind, Full House, Three of a Kind')
				//There are 0 possibilities a tie breaker here to have the same high cards for a full tie
					//there must be a winner in this tie breaker
				// let matchCard1 = null

				// let matchCardCount = 0
				// let tmp = {}
				// for (const value of values) {
				// 	if (tmp[value] === undefined) {
				// 		tmp[value] = 1
				// 	} else {
				// 		tmp[value]++
				// 	}

				// 	if (tmp[value] > matchCardCount) {
				// 		matchCard1 = value
				// 		matchCardCount = tmp[value]
				// 	}
				// }

				// switch (matchCard1) {
				// 	case 'A':
				// 		matchCard1 = 14;
				// 		break;
				// 	case 'K':
				// 		matchCard1 = 13;
				// 		break;
				// 	case 'Q':
				// 		matchCard1 = 12;
				// 		break;
				// 	case 'J':
				// 		matchCard1 = 11;
				// 	default:
				// 		matchCard1 = Number(matchCard1)
				// }
				// let matchCard2 = null

				// matchCardCount = 0
				// tmp = {}
				// for (const value of values) {
				// 	if (tmp[value] === undefined) {
				// 		tmp[value] = 1
				// 	} else {
				// 		tmp[value]++
				// 	}
				// }

				// if (tmp[value] > matchCardCount) {
				// 	matchCard2 = value
				// 	matchCardCount = tmp[value]
				// }

				// switch (matchCard2) {
				// 	case 'A':
				// 		matchCard2 = 14;
				// 		break;
				// 	case 'K':
				// 		matchCard2 = 13;
				// 		break;
				// 	case 'Q':
				// 		matchCard2 = 12;
				// 		break;
				// 	case 'J':
				// 		matchCard2 = 11;
				// 	default:
				// 		matchCard2 = Number(matchCard2)
				// }

				// if (matchCard1 > matchCard2) return '1';
				// else return '2';

				//sorted GTL, [(three of a kind, two pair) , (lone card x 0 - 2, three of a kind, lone card x 0 - 2)] or [(4 of a kind, lone card), (lone card , 4 of a kind)]
				if (values1[2] > values2[2]) return '1';
				else return '2'
			//no pair and flush have the same rules
			case 5:
			case 0:
				// console.log('group case 4 the no pair and flushes')
				for (let i = 0; i < 5; i++) {
					//both hands are sorted GTL
					if (values1[i] > values2[i]) return '1';
					else if (values1[i] < values2[i]) return '2';
				}

				//no pairs and flushes can have the exact same value cards but different suits, so tie is possible
				return 'Tie'
			case 2:
				//the two pairs, possible for two hands to have the same high pair, so check for low pair in that case
				// console.log('The two pairs case')
				//For two pairs, we have a high pair, a low pair, and a single card
				//compare high pairs
					//then low pairs
						//then single card, if all the same, its a tie
				let loneCard1 = null

				tmp = {}
				let tmpPairs = []
				for (const value of values1) {
					if (tmp[value] === undefined) tmp[value] = 1;
					else tmp[value]++;
				}
				for (const value of tmp) {
					if (tmp[value] === 2) tmpPairs.push(value);
					else loneCard1 = value
				}

				const lowPair1 = Math.min(tmpPairs[0], tmpPairs[1])
				const highPair1 = Math.max(tmpPairs[0], tmpPairs[1])

				let loneCard2 = null

				tmp = {}
				tmpPairs = []
				for (const value of values2) {
					if (tmp[value] === undefined) tmp[value] = 1;
					else tmp[value]++;
				}
				for (const value of tmp) {
					if (tmp[value] === 2) tmpPairs.push(value);
					else loneCard2 = value
				}

				const lowPair2 = Math.min(tmpPairs[0], tmpPairs[1])
				const highPair2 = Math.max(tmpPairs[0], tmpPairs[1])

 				if (highPair1 > highPair2) return '1';
				else if (highPair1 < highPair2) return '2';

				if (lowPair1 > lowPair2) return '1';
				else if (lowPair1 < lowPair2) return '2';

				if (loneCard1 > loneCard2) return '1';
				else if (loneCard1 < loneCard2) return '2';

				//High pairs match, low pairs match, lone cards match, its a tie
				return 'Tie';
			case 1:
				// console.log('The single pair case')
				//find the pair in each hand, compare them, if the same, compare remaining single cards
				let pair1 = null
				let loneCards1 = []
				
				let i = 0
				while (i < 5) {
					if (values1[i] === values1[i + 1]) {
						pair1 = values1[i]
						i++
					} else {
						loneCards1.push(values1[i])
					}
					i++
				}


				let pair2 = null
				let loneCards2 = []
				i = 0
				while (i < 5) {
					if (values2[i] === values2[i + 1]) {
						pair2 = values2[i]
						i++
					} else {
						loneCards2.push(values2[i])
					}
					i++
				}

				if (pair1 > pair2) return '1';
				else if (pair1 < pair2) return '2';

				i = 0
				while (i < 3) {
					if (loneCards1[i] > loneCards2[i]) return '1';
					else if (loneCards1[i] < loneCards2[i]) return '2';
					//else its a tie, check next
					i++
				}

				return 'Tie'
			// default:
				console.error(`We've reached the default case for comparing two hands, we should not have ever reached this point`)
		}
	}

	await gf.fetchData(handsFilePath).then((data) => {
		
		const lines = data.split('\n') //break up data by each line in the file
											.filter((line) => line.trim() !== ''); // filter out empty lines
		for (const line of lines) {
			const cards = line.split(' ')
			const hand1 = cards.slice(0, 5)
			const hand2 = cards.slice(5)
			
			if (compareHands(hand1, hand2) === '1') {
				numWins++
			} 
			//else player two wins or its a tie, either way, player one did not win
		}
	})

	return numWins
}

// problem54(__dirname + '/problem54.txt').then((res) => {
// 	console.log(`The number of times player1 has won in the thousand random hands is ${res}`)
// })

//Problem55
function problem55() {
	let res = 0

	function isPalindromic(num) {
		if (typeof num === 'number') {
			num = `${num}`
		}

		let left = 0
		let right = num.length - 1
		while (left < right) {
			if (num[left] !== num[right]) return false;
			left++
			right--
		}
		return true
	}

	let num = 9999
	
	while (num > 0) {
		let iteration = 0
		let tmpNum = num
		while (iteration < 50) {
			const reverse = Number(`${tmpNum}`.split('').reverse().join(''))
			tmpNum = tmpNum + reverse
			if (isPalindromic(tmpNum)) {
				// console.log(`${num} has a palindrome at the ${iteration + 1} iteration resulting in ${tmpNum}`)
				break;
			}
			iteration++
		}
		if (iteration >= 50) {
			//its a lychrel number
			res++
		}
		num--
	}

	return res
}

// console.log(`There are ${problem55()} lychrel numbers under 10,000`)

//Problem 56

function problem56() {
	let maxDigitSum = 0
	let a = 1

	function digitSum(strNum) {
		let sum = 0
		let i = 0
		while (i < strNum.length) {
			sum += Number(strNum[i])
			i++
		}
		return sum
	}
	while (a < 100) {
		let b = 1
		while (b < 100) {
			const strNum = gf.strPow(`${a}`, b)

			maxDigitSum = Math.max(maxDigitSum, digitSum(strNum))
			b++
		}
		a++
	}

	return maxDigitSum;
}

// console.log(problem56())


//Problem 57 Square Root Convergents
//1 + (1 / 2)  the 2 is the deepest denominator
//add 1/2 to the denominator portion => 1 + (1 / (2 + 1/2)) call the 2 portion of the newly added (1/2) the deepest denominator
//add 1/2 to the deepest denominator each time

//2 + 1 / 2 results in 3 / 2

//okay the pattern is, use the previous result, add 1(convert to matching fraction denominator),
	//flip the result 
	//add 1(convert to denominator of the flipped result) to the flipped result
	//done

function problem57() {
	let ans = 0
	// const results = [(3/2), (7/5), (17/12), (41/29)]
	const results = [{num:`3`, den:`2`}]

	while (results.length < 1000) {
		//using previous result,
		const prev = results[results.length - 1]
		let num = prev.num
		let den = prev.den
		//add the denominator value to the numerator
		num = gf.strSum(num, den)
		//flip
		let tmp = num
		num = den
		den = tmp
		//add denominator value to the numerator, this is our new result
		num = gf.strSum(num, den)
			//check digit length of numerator and denominator
		if (num.length > den.length) {
			ans++
		}
		results.push({num, den})
	}

	return ans
}

// console.log(`In the first thousand expansions of the the infinite continued fraction from the square root of two, we have ${problem57()} iterations that contain a numerator digit length greater than the denominator`);


//Problem 58 Spiral Primes
function problem58() {
	//initialize square spiral
	//we don't actually need to store these numbers in a matrix
		//Once we have the spiral visualized, we don't actually need a nested array to keep track of everything
		//we just "hit each corner of the spiral", everytime we add a spiral theres 4 more diagonals that get added, we just need to check whether or not those numbers are prrime 
	let primeCount = 0
	let diagonalCount = 1
 
 	// const {primes, primeBools} = gf.getPrimeData(Math.pow(10,7))
	
	function isPrime(num) {
		for (let i = 2; i <= Math.sqrt(num); i++) {
			if (num % i === 0) return false;
		}
		return true;
	}
	let num = 1
	let n = 1
	do {
		n += 2
		let row = n - 2
		let col = n - 2
		//populate - Note: might want to expand primes if num will be greater than our last known prime
		// if (Math.pow(n, 2) > primeBools.length - 1) {
		// 	console.log('need to extend our list')
		// 	return;
		// 	// gf.expandPrimes(primes, primeBools, Math.pow(n, 2) - primeBools.length - 1)
		// }
			//row and col indices are the indices of the last populated index
			//move over one to the right and began counter-clockwise pattern
			col++
			num++ //increment num since we move over one
			//if a diagonal index, check if prime 
			//populate up
			num += row //we move up the row until we hit the corner, i.e from current row up to top
			//row = 0, we're also at a diagonal index
			if (isPrime(num)) {
				primeCount++
			}
			diagonalCount++
			//left
			num += col //move from top right to top left, should always be col length
			if (isPrime(num)) {
				primeCount++
			}
			diagonalCount++

			//down
			num += n - 1 // top left to bottom left

			if (isPrime(num)) {
				primeCount++
			}
			diagonalCount++

			//right - done
			num += n - 1 //bottom left to bottom right
			if (isPrime(num)) {
				primeCount++
			}
			diagonalCount++
			console.log(num, primeCount, diagonalCount)
			//Could just do a diagonalCount += 4 at the end here, but eh
	} while (primeCount / diagonalCount > (1 / 10))
	// } while (num < 49)			

	// console.log(spiralSquare)
	return n
}

// console.log(`The spiral square where diagonal values that are prime make up less than 10% of diagional values has a length of ${problem58()}`)

//Problem 59 XOR decryption

// For unbreakable encryption, the key is the same length as the plain text message,
	//To get the key, we use the length of the plain text message ?
//Given a file with encrypted ascii codes
//decrypt the codes into a message
function problem59(p59CipherFile) {

	gf.fetchData(p59CipherFile).then((response) => {
		const codes = response.split(',')
		//If i'm understanding this correctly, we have a list of encrypted ascii codes
		//we use the encryption key that consists of 3 lower case characters as specified by problem defintion, (what are these 3 lower case characters??)
			//Ah, we don't know what the encryption key is, just that it is 3 lower case characters, - need to figure out what the key is

			//Figure out the key
			//Option 1) use the first 3 codes to figure out possible lower chars for the encryption key
				//then using the possibilities for index 0,1,2 of the encryption key, run against the rest of the message figure out possibilites that keep up
			//Option 2) Assume at 26 lower case characters are possible, as we go through the message, we remove possibilites that are "bad"
				//We go with option 2
			const keyPossibilities = [new Set(), new Set(), new Set()]

			for (const possibilities of keyPossibilities) {
				for (let asciiCode = 97; asciiCode < 123; asciiCode++) {
					//adding ascii values 97-122 'a' - 'z'
					possibilities.add(asciiCode)
				}
			}
			let i = 0
			while (i < codes.length) {
				const encryptedCode = codes[i]
				//Using the possible characters, run it against the rest of the message until a message is shown
				if (keyPossibilities[i % 3].size === 0) {
					console.error(`Problem 59, we've checked all possible lower case characters for the 3-lower chracter encryption key at index ${i % 3}, please rework how we solve the encryption key`)
					return
				}
				for (const lowerCharCode of keyPossibilities[i % 3]) {
					const decryptedCode = encryptedCode ^ lowerCharCode
					// if (32 <= decryptedCode && decryptedCode <= 126) {
					// 	//its good!
					// }
					//Remove possibilities that result in a "bad" character/message
					//Assumption: "bad" codes are the ones outside the range [32, 126] - these codes are the printable codes
					if (decryptedCode < 32 || decryptedCode > 126) {
						// console.log(`Encrypted code ${encryptedCode} with lowerChar ${String.fromCharCode(lowerCharCode)} results in decryptedCode ${decryptedCode} which is outside of our ascii range of 32-126, removing ${lowerCharCode} from ${i % 3}'s possibilities`)
						keyPossibilities[i % 3].delete(lowerCharCode)
					}
				}
				i++
			}
			
			//Next 20-ish lines are used to figure out an encryption key that returns a proper message
				//its 'exp'
// 			for (const keyIndex0 of keyPossibilities[0]) {
// 				for (const keyIndex1 of keyPossibilities[1]) {
// 					for (const keyIndex2 of keyPossibilities[2]) {
// 						const keyCodes = [keyIndex0, keyIndex1, keyIndex2]
// 						const stringChars = []
// 						let i = 0
// 						while (i < codes.length) {
// 							const char = String.fromCharCode(codes[i] ^ keyCodes[i % 3])
// 							stringChars.push(char)
// 							i++
// 						}
// 						const charKey0 = String.fromCharCode(keyIndex0)
// 						const charKey1 = String.fromCharCode(keyIndex1)
// 						const charKey2 = String.fromCharCode(keyIndex2)
// 						// console.log(`Encryption key ${charKey0}${charKey1}${charKey2} results in the following message:
// // ${stringChars.join('')}`)
// 						// console.log('Encryption key',charKey0 + charKey1 + charKey2, 'results in the following message: \n' + stringChars.join(''))
// 					}
// 				}
// 			}

			//3-lowercase character encryption, multiple possibilties for each index of the key
				//Through brute force, key 'exp' gives a 

			const key = 'exp'
			const keyCodes = key.split('').map((char) => char.charCodeAt('0'))
			
			const messageArr = []
			let messageCodeSum = 0
			i = 0
			while (i < codes.length) {
				const encryptedCode = codes[i]
				const decryptedCode = encryptedCode ^ keyCodes[i % 3];

				messageArr.push(String.fromCharCode(decryptedCode))
				messageCodeSum += decryptedCode
				i++
			}

			console.log(messageArr.join(''))
			console.log(`The sum of the ascii codes in the decrypted message is ${messageCodeSum}`)
	})
}

// problem59(__dirname + '/problem59.txt');


//Problem 60 Prime pair sets


//Find 5 primes that fit the quota, get the sum
//check for any other sets of 5 primes that match the condition
//if sum of potential primes is greater than our min, we need not check futhur (using a list of sorted primes)
	//we know we're done because we're working with primes sorted least to greatest
		//so either when we find the solution, its already the min possible
		//or we exhausts our options such that when we know a combination of 5 primes works, any future combinations that will sum up to something greater need not be checked and will always be greater, thus we've exhuasted all our options
// function problem60(target) {
// 	let res = null

// 	const {primes, primeBools} = gf.getPrimeData(Math.pow(10, 7))
// 	let primesPointer = 1

// 	//find 5 numbers that fit the description we're looking for
// 	// console.log(primes[primes.length - 1])
// 	let candidates = [] //  

// 	function isPrime(num) {
// 		for (let i = 2; i < Math.sqrt(num); i++) {
// 			if (num % i === 0) {
// 				return false
// 			}
// 		}

// 		return true
// 	}

// 	function isPrimePair(n1, n2) {
// 		const s1 = `${n1}`
// 		const s2 = `${n2}`

// 		return (primeBools[`${s1 + s2}`] && primeBools[`${s2 + s1}`])	
// 	}

// 	/********|| our subset sum is not guranteed to be greater than the current res*/

// 	// let currentPrime = primes[primesPointer]
// 	let currentPrime = undefined
// 	while (res === null && currentPrime !== undefined) {
// 		//populate our subset
// 		//start with the smallest prime, 2
// 			//NO DON'T START WITH 2, concatenating 2 on the right side will always be even you twat
// 				//find a matching prime for whatever is in our subset until we have a set of size 5
// 		let candidatesPointer = 0
// 		while (candidatesPointer < candidates.length) {
// 			if (!isPrimePair(candidates[candidatesPointer], primes[primesPointer])) {
// 				break;
// 			}
// 			candidatesPointer++
// 		}
// 		if (candidatesPointer !== candidates.length) {
// 			primesPointer++
// 			currentPrime = primes[primesPointer]
// 			continue;
// 		}
		
// 		candidates.push(primes[primesPointer])
// 		console.log(candidates)
// 		//Sum it up and treat it as a min
// 		if (candidates.length === target) {
// 			res = candidates.reduce((acc, curr) => acc + curr, 0)
// 		}
// 		primesPointer++
// 		currentPrime = primes[primesPointer]
// 		// console.log(currentPrime)
// 	}
// 	// console.log(res, candidates)
 
// 	let pow10 = 0
// 	let n = 1
// 	if (res === null) {
// 		console.log('try hybrid algo??')
// 		// currentPrime = primes[primes.length - 1] + 2
// 		currentPrime = 3;


// 		while (candidates.length < target) {
// 			if (isPrime(currentPrime)) {
// 				if (currentPrime > Math.pow(10, pow10)) {
// 					console.log(`Checking primes greater than 10 to the ${pow10}, currentPrime:${currentPrime}`)
// 					// console.log(`Checking primes greater than ${n * Math.pow(10, pow10)}, currentPrime:${currentPrime}`)
// 					// n++
// 					pow10++
// 					n = 2
// 				}

// 				if (currentPrime > n * Math.pow(10, pow10 - 1)) {
// 					console.log(`Checking primes greater than ${n * Math.pow(10, pow10 - 1)}, currentPrime:${currentPrime}`) 
// 					n++
// 				}

// 				if (pow10 === 9) {
// 					console.log('early exit, try a more efficient solution')
// 				}
// 				let candidatesPointer = 0
// 				while (candidatesPointer < candidates.length) {
// 					if (!isPrimePair(candidates[candidatesPointer], currentPrime)) {
// 						break;
// 					}
// 					candidatesPointer++
// 				}

// 				if (candidatesPointer === candidates.length) {
// 					candidates.push(currentPrime)
// 					console.log(`New addition, current list: ${candidates}`)
// 				}
				
// 				if (candidates.length === target) {
// 					res = candidates.reduce((acc, num) => acc + num, 0);
// 				}
// 			}

// 			currentPrime += 2 //increment by 2 to stay on odd numbers, 
// 		}

// 		console.log(`derp, candidates: ${candidates}`)
// 	}
// 	// we have list/set containing 5 primes that produce another prime when concatenating any 2 primes in any order

// 	//test any other possible combinations of prime, once these possibilities are guranteed to be a sum greater than our min, we've exhausted all our options
// 		//pop the last prime
// 			//any additional prime will be greater than our current sub min, so we pop again


// 				//we should be at 3 primes, 4th prime should be the "next one" that fits what we're looking for for the 4th option,
// 				 //if its still less than our current min (or we can look at sub mins to optimize) then we keep populating
// 		//Overall ^ is a recursive process until we have an empty subset, we increment our leftmost prime until its guranteed to be greater than our min (possible optimizations here again by running against sub-mins)	
// }




//Different route at solving p60

//Work with primes in order from smallest to greatest
	//start at 3, 2 makes even numbers
//Have a list of potential subsets

//Current prime number checks against all potential subsets, if it can be added, add it (use helper func)
	//if it gets added, does the subset contain our target amount,
		//yes - record the sum
			//need to verify against other potential solutions until we're guranteed to exhaust our options (any potential sum > current solution)
		//no - carrry on

	//Once all subsets are tested, we add the prime by itself as a candidate 

function problem60(target) {
	let res = null

	const primePow = 7
	const {primes, primeBools} = gf.getPrimeData(Math.pow(10, primePow));

	function isPrimePair(n1, n2) {
		const s1 = `${n1}${n2}`
		const s2 = `${n2}${n1}`

		// primePow = 6, => 1,000,000 s1.length >= primePow + 1 => s1 > Math.pow(10, primePow)
		if (s1.length >= primePow + 1) {
			if (!isPrime(s1)) return false;
		} else {
			if (!primeBools[s1]) return false
		}

		if (s2.length >= primePow + 1) {
			if (!isPrime(s2)) return false
		} else {
			if (!primeBools[s2]) return false
		}

		return true
		// return (primeBools[`${s1 + s2}`] && primeBools[`${s2 + s1}`])	
	}

	function isPrime(num) {
		num =  Number(num)
		if (Number.isNaN(num)) {
			throw new Error(`Please input a number for helper function: isPrime`)
		}

		for (let i = 2; i < Math.sqrt(num); i++) {
			if (num % i === 0) {
				return false
			}
		}

		return true
	}

	let primeIndex = 1
	let currentPrime = primes[primeIndex]
	let subsets = []


	let testPow = 0
	while (res === null) {
		if (currentPrime > Math.pow(10, testPow)) {
			console.log(`Testing primes greater than ${Math.pow(10, testPow)}, currentPrime: ${currentPrime}`)
			console.log(`Size of potential subsets being tested: ${subsets.length}`)
			testPow++
		}
		let subsetsIndex = 0
		while (subsetsIndex < subsets.length) {
			const subset = subsets[subsetsIndex]

			let subsetPrimeIndex = 0
			while (subsetPrimeIndex < subset.length) {
				const subsetPrime =subset[subsetPrimeIndex]
				if (!isPrimePair(currentPrime, subsetPrime)) {
					break;
				}

				subsetPrimeIndex++
			}
			if (subsetPrimeIndex === subset.length) {
				//Current prime works with all primes in the current subset, add it as a new subset
				const newSubset = subset.slice()
				newSubset.push(currentPrime)

				if (newSubset.length === target) {
					console.log('hi',  subset)
					console.log(`${currentPrime} works with all the primes in ${subset}`)
				}
				subsets.push(newSubset)
				if (newSubset.length === target) {
					// console.log('WE GOT A RES', newSubset.reduce((acc, sum) => acc + sum, 0))
					const sum = newSubset.reduce((acc, num) => acc + num, 0)

					res = res === null ? sum : Math.min(res, sum)		 
				}
			}

			subsetsIndex++
		}

		subsets.push([currentPrime])
		primeIndex++
		currentPrime = primes[primeIndex]
	}


	console.log('hi we made it this far, so we should have some sort of solution')
	console.log(res)

	//OKAY

	//current prime should be the next option

	//we can make our life a million times easier if we removed "potentials with sum greater than our res"

	// function cleanPotentials(potentials, res) {
	// 	return potentials.filter((potential) => potential.reduce((acc, num) => acc + num, 0) < res)
	// }

	//Make life easier, instead of in place array manipulation
	//We take in a list of potentials and return a copy where sums > res are filtered out
	subsets = subsets.filter((subset) => subset.reduce((acc, num) => acc + num, 0) < res)
	console.log(subsets, subsets.length)
	while(currentPrime < res && subsets.length > 0) {
		//we test against all possible subsets for a solution less than our res
		let subsetsIndex = 0
		const filteredSubset = []
		while (subsetsIndex < subsets.length) { 
			const subset = subsets[subsetsIndex]

			let subsetPrimeIndex = 0
			let subsetSum = 0
			while (subsetPrimeIndex < subset.length) {
				const subsetPrime = subset[subsetPrimeIndex]
				if (!isPrimePair(currentPrime, subsetPrime)) {
					break;
				}
				subsetPrimeIndex++
			}

			const sum = subset.reduce((acc, num) => acc + num, 0) + currentPrime
			if (subsetPrimeIndex === subset.length) {

				if (sum < res) {
					//if target amount great!, if less than we add it to possibilties
					if (subset.length + 1 === target) {
						res = sum

						//some sort of good filter?
					} else if (subset.length + 1 < target) {
						const newSubset = subset.slice()
						newSubset.push(currentPrime)
						// subsets.push(newSubset)
						filteredSubset.push(newSubset)
					}
				}
				//if (sum > res) regardless, we don't want to work with it
			} else if (sum < res) {
				filteredSubset.push(subset)
			}
			subsetsIndex++
		}
		primeIndex++
		if (primeIndex === primes.length) {
			throw new Error('Exhausted all prime options, WIP')
		}
		currentPrime = primes[primeIndex]
		subsets = filteredSubset
		console.log(`Working with ${currentPrime} and ${subsets.length} subsets`)
	}

	return res
}





//Note to self, we start with a solution solving for min of 4, once it "works", we adjust to 5
// problem60(5)
// try {
// 	console.log('p60:', problem60(5))
// } catch(error) {
// 	console.error(error)
// }

//26033 is a solution with [13, 5197, 5701, 6733, 8389]
	//need to verify theres no solution less than
// let test = [3, 7, 109, 673] 
