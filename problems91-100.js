import gf from './generalFunctions.js'

const __dirname = import.meta.dirname

//Problem 93 - Arithmetic Expressions
	
/* Starting solution - Greedy AF brute force
	What is our limit?

	** "By using each of the digits from the set" - meaning we are using digits, NOT numbers. Our "limit"
			really is a brute force approach and exhausting every possible combination of DIGITS a < b < c < d
				-Store highest value of 1, 2, ... , n for a any valid combination 

		Start with values a = 1, b = 2, c = 3, and d = 4. We know n = 28 here as provided
		1) increment d and use <greedy algorithm> to get all possible outcomes
			=> <greedy Algorithm> 
				Get all possible outcomes and store them
				if values 1, 2, 3 ... n exist, great its valid so far
					next check what values > n also exist, return this new max value
				else its not, return n

			=>increment d again until ?
				//I'd want to stop incrementing d when I know 
					1) Its impossible to represent any number less than n
					OR
					2) I can gurantee 1 to n can be expressed, but know that n + 1 can not be expressed
						//Can use this fact as a short circuit and save a lot of time 


		4 distinct integers, order matters, non-repetitive
			4 pick 4 = 4! = 24
		4 arithmetic operators, order matters, repetition allowed
			4^3 = 64
	=> 24 * 64 = 1536 unique ways to arrange 4 distinct integers exactly once with the arithmetic operations + brackets/parenthesis
		At most n can be 1536


	Brute Force method
	-24 ways to represent 4 unique digits in 4 indices
		-For each unique way to represent the 4 digit, there are 64 possible ways present the 4 artihmetic operators (with reptition)
			- for each of the (24 * 64) ways, we

	-Parentheses pattern
		-In consideration of only the 4 arithmetic operators, parentheses only has an effect when 
		prioritizing addition/subtraction (within the parenthesis) as a priority over multiplicaton/divison
		-Use of parentheses pattern with all permutations of a,b,c,d in an expression will lead to duplicate work
			Ex: ((a + b) - c) * d
				has the same result as d * ((a + b) - c)
			-Q:

	a + b + c + d

	a * (b + c) + d

	(a + b) * c + d
	((a + b) * c) + d // remove duplicate work with parenthesis + multiplication/division
	(a + b) * c + d
	a + (b + c) + d
	a + ((b + c) + d)
	a + b * (c + d)
	a + b + c + d
	a + b + c + d
	a + b + c + d
*/
//Problem 94 - Almost Equilateral Triangles

/*
Personal Notes 
	Workarounds for stupidly large areas?

	Looking at our use of Heron's formula
		Really we're just trying to see if the square root results in an integer
			if it were to be an integer value, then s * (s - a) * (s - b) * (s - c) would need to be a square number
				max, a = b =  333,333,333 and c = 333,333,334, s = 1,000,000,000, doing a bit of cheating, area = (s * 3(2/3s)) = 3s


	Looking at our area... where can we find something like... a mirror or symmetry... 
		can we have our area to be in the form area = x^2 where x can substitute for some form of Heron's formula
		Heron's formula will results in an integer value area 
			if the area is a square number
			if the area can be expressed as area = x^2, so let x = abc, then area can be expressed in some form (abc)(abc)


Okay the idea here is that we have 3 sides with lengths a,b,c and we know a = b
We have two cases
	case 1: c = a - 1
	case 2: c = a + 1
Heron's formula provides that 
	Area = sqrt(s * (s - a) * (s - b) * (s - c))
		s = (a + b + c) / 2, since values a,b,c are integers and a = b, s is an integer ONLY if c is an even
	considering we know a = b, => Area = sqrt(s * (s - a)^2 * (s - c))
														 => Area = (s - a) * sqrt(s * (s - c))
														 => Area = ((a + b + c - 2a) / 2) * sqrt((a + b  + c) / 2 * ((a + b + c - 2c) / 2))
														 => Area = (b + c - a / 2) * sqrt((a + b + c) * (a + b - c) / 4)
														 => Area = (b + c - a / 4) * sqrt((a + b + c) (a + b - c))
	since a = b 							 => Area = (c / 4) * sqrt((2a + c) * (2a - c))
														 => Area = (c / 4) * sqrt(4a^2 - c^2) // we don't want to have to take the square of 333,333,333 .... 
	instead, 								 => Area = sqrt((2a + c) * (2a - c) * (c / 4)^2)
														 =>      = sqrt('                 ' * c^2 / 16)
	case: c = a - 1						 => 		 = sqrt(2a + (a - 1)) * (2a - (a - 1)) * (c / 4)^2) 
	    															 = sqrt((3a - 1) * (a + 1) * c^2 / 16)
														 => 		 = sqrt((3a^2 + 2a - 1) * c^2 / 16)
		let pf(n) = the prime factorization of num n
		use pf(2a + c), pf(2a - c), and pf(c) where pf(c^2) is just double the power count of pf(c)
			substituting case 1: c = a - 1 || case 2: c = a + 1;
				case1: 
				=> pf(2a - c) = pf(2a - (a - 1)) = pf(a + 1) = pf(c)
			case2:
				=> pf(2a - c) = pf(2a - (a + 1)) = pf (a - 1) = pf(c)
			NEVERMIND I'M DUMB
		sum the powers of each prime in pf(2a + c), pf(2a - c) and pf(c^2)
			bare minimum needs to have at least 4 for the power of 2 to negate the '/16'
			an even count for powers of individual prime means the sqrt will cut the powers of each prime by half, still results in a guranteed integer (which is all we care about)
				what about primes with an odd count? does 2^(odd number / 2) ever result in an integer?
						We know 2^6 / 2 = 64 / 2 = 32, but that is an even number, what about something like prime^(odd num/ 2)?
						OKAY: So, lets say we have a prime number, now we square it, we get prime^2. LOGICALLY, a prime number squared should not be divisible by any other number other than the prime itself
									prime^oddNum = (odd count of primes) * itself => can't be divisble by any even powers of the prime number, the powers of a prime can only be divisble by that prime value itself, any other prime value results in a fraction since division of two primes never result in a whole number

							MY CONJECTURE: cause i'm too lazy to prove, 2 individual primes can not be multiplied together to form a number that, represented as set of primes, contain different prime values
								Futhur, two composite numbers or even a prime multiplied by a composite can not result in a number, represented as a set of primes, contain different prime values (and count) from the original two values
*/
	

//Reduce work: gf.primeFactorization multiple calls is causing a lot of repetiive work in getting prime data
	//put prime data into the p94 function and have a prime factorization helper that pulls from that data instead, should reduce a lot of extra work

function p94() {
	
}


//Problem 95 - Amicable Chains
//Assuming Amicable chains are formed when specifically the last sum of proper divisors points to the very first number in the chain and NOT when a chain (cycle is formed)
function p95(limit) {
	const seenNums = new Array(Math.pow(10, 6) + 1).fill(null)
	let longestChainLength = 0

	//0 ... chains to itself? undefined ???
	seenNums[0] = undefined
	//1 chains to 0
	//2 chains to 1 
	let res = null
	let num = 1
	//no element exceeding one million, 1,000,000 should be included
	while(num <= limit) {
		const startVal = num
		let chainNumsSet = new Set()
		chainNumsSet.add(num)
		let sumPDivisors = gf.getProperDivisors(num).reduce((sum, curr) => sum + curr, 0);

		while (!chainNumsSet.has(sumPDivisors) && sumPDivisors <= Math.pow(10, 6)) {
			chainNumsSet.add(sumPDivisors)
			if (seenNums[sumPDivisors] !== null) {
				sumPDivisors = seenNums[sumPDivisors]
			} else {
				seenNums[sumPDivisors] = gf.getProperDivisors(sumPDivisors).reduce((sum, curr) => sum + curr, 0)
				sumPDivisors = seenNums[sumPDivisors]
			}
		}
		//we've exit the loop, which means a chain has been formed or a value within the chain has exceeded our limit
		//Check to see if the chain (cycle) loops to the start or somewhere in the middle
		if (sumPDivisors === startVal) {
			if (chainNumsSet.size > longestChainLength) {
				res = Math.min(...[...chainNumsSet])
				longestChainLength = chainNumsSet.size

				console.log(`New Longest chain at ${longestChainLength} with the chain containing values ${[...chainNumsSet]}, smallest value ${res}, start of chain was ${startVal}`)
			}
		}
	
		num++
	}

	return res
}
// console.time('p95')
// console.log(p95(1000000))
// console.timeEnd('p95')
// console.log([30,42,54,66,78,90,144,259,45,33,15,9,4,3,1,0])
// console.log([30,42,54,66,78,90,144,259,45,33,15,9,4,3,1,0].map((val) => gf.getProperDivisors(val).reduce((sum, curr) => sum + curr, 0)))
// console.log(Math.min(...[30,42,54,66,78,90,144,259,45,33,15,9,4,3,1,0].map((val) => gf.getProperDivisors(val).reduce((sum, curr) => sum + curr, 0))))
//Problem 97 - Large Non-Mersenne Prime

// (a * b) mod m === (a_r * b_r) mod m where a_r = a mod m and b_r = b mod m
// (a * b * c * ...) === (a_r * b_r * c_r *... ) mod m where a_r = a mod m .... x_r = x mod m


function p97() {
	//modular arithmetic - given two numbers that results in too large of a number
	//return a mod m value for their product

	// (a * b) mod m = (r_a * r_b) mod m where r_a = (a mod m) and r_b = (b mod m )
	// = (r_a1 * r_b1) mod m where r_a1 = (r_a mod m) and r_b1 = (r_b mod m)

	// (a * b * c * d) mod m = (r_a * r_b * r_c * r_d) mod m where r_letter = letter % m
	// = ((r_a * r_b) * (r_c * r_d)) mod m
	// = (r_ab * r_cd) mod m where r_ab = (r_a * r_b) mod m and r_cd = (r_c * r_d) mod m
	// function modHelper(m, ...nums) {
	function modHelper(m, nums) {
		const modValues = []
		let tmp = 1

		for (const num of nums) {
			tmp *= num
			if (tmp > m) {
				modValues.push(tmp % m)
				tmp = 1
			}
		}
		modValues.push(tmp % m)

		const product = modValues.reduce((sum, curr) => sum * curr, 1)
		if (product > Number.MAX_SAFE_INTEGER) {
			return modHelper(m, modValues)
		}

		return (product) % m
	}

	let tmp = 1
	let pow = 0

	const m = Math.pow(10, 10)
	let mValues = []
	while (pow < 7830457) {
		tmp *= 2
		pow++
		// console.log(pow)
		if (tmp > m) {
			mValues.push(tmp % m)
			tmp = 1
		}
	}

	//if tmp were 1, pushing it would be irrelevant to our final "product"
	// if (tmp !== 1) mValues.push(tmp % m);
	mValues.push(tmp % m)
	return modHelper(m, [...mValues, 28433]) + 1
	
}				

// console.time('p97')
// console.log(`If I did this correctly, then the last 10 digits of 2^7830457 * 28433 + 1 is ${p97()}`)
// console.timeEnd('p97')

//Problem 98 - Anagram Squares

//Input - Given a text file containing nearly 2000 words
//Output - Return the largest square number that can be formed from any pair
//Constraints - None?
//Optimality/Efficiency - Solved in less than 1-3 minutes? Project Euler standards I believe


//Square anagram word pair, we associate a single digit number with a letter, if that word forms a square number and the letter (exact same numbers) can be rearranged (in an angram) to represent another square number
	//we call these two numbers a square anagram pair

//Solution 1) 

//Given a text with nearly 2000 words, 
	//we can make our life easier by sorting the words into lists based on length,
		//we can furthur break this list into sublists matching words of length x that are anagrams of each other
			//sort the letters of a word in alphabetical order, mark that as a key
				//if key found - add to storage
				//else create key-value pair. Value : list
		
//Working with a list containing words that are all anagrams of each other
		//We can work with the following assumptions: 
			//1. We know all the words in the list are of length x, so we can work with numbers containing x digits
		//Optimization:
			//we can have our base word be paired with a square number of length x sorted from greatest to least. If find a word pair, base word is the highest square of length x,

//For our square pair check
	//Safely working with our previous assumption that we're working with a list containing words all anagrams of each other
		//Cost: O(n^2 * x) where n is the size of the list (containing anagram words)
			//for an O(n^2) process
				//We can safely assume every word is of length x
					//We start with our leftmost word as a 'base' word to be checked against every word to the right of it in our list, call those words 'test words'
						//for the inner O(x) process, 
								//Check for matching unique # of digits/letters between the candidate square number and our base word
									//if repeating digits/letters,  check matching counts
								//store the letter to digit map
			
								//Use the the letter to digit map to check if 'test' words results in square numbers
									//if test word results in a square, 
										//process assumes base word is using the current highest eligible square number of length x
										//return result


//When we do our square number check, we use a table to check if a number is indeed square, that is a finite list since there are a finite number of numbers containing x digits
	//a different option to the additional storage would be to use our already sorted list of squares to see if the number exists
		// -this is not a constant time check, binary search could have it down in log(n) time, but would reduce storage.
			// --if we're considering definite storage space, we know theres a definite number of squares containing x digits, call it n, then binary search - log(n) time is a definite time as well ?
			// --generally prefer using extra storage over extra time



//A letter cannot have the same digit as another letter, 
//Can... one letter have two different digits? -While not specified, assuming no single letter can be mapped to two separate digits
async function p98() {
	let maxSquare = null
	function isAnagramPair(baseWord, comparedWord, squareNum, squareExists) {
		//assign square num to base word, match letters to digits
			//Track digit to letter, as well as the count. ltg = {letter: {digit: int, count: int}}
		const letterToDigit = {}
		const usedDigits = {}
		const strNum = `${squareNum}`

		for (let i = 0; i < strNum.length; i++) {
			const digit = strNum[i]
			const letter = baseWord[i]

			if (letterToDigit[letter] === undefined) {
				// letterToDigit[letter] = {digit, count: 1}
				if (usedDigits[digit] !== undefined) {
					//letter hasn't been associated with digit yet, but digit has been used
					return false
				}
				usedDigits[digit] = true
				letterToDigit[letter]= {digit}
			} else {
				if (letterToDigit[letter][digit] !== digit) {
					//we got duplicate digit placement that isn't matching duplicate letters 
					return false
				}
				// letterToDigit[letter][count]++
			}
		}
		//we know the two words are anagrams of each other, letters and count we expect to match
		//As long as the letter to digits line up, we don't have to be concerned about positions 
		//We just need to check that there are no leading zeroes in our comparedWord 

		//Check for matching letter to digit, 
		
		const cDigits = [] 
		for (let i = 0; i < comparedWord.length; i++) {
			const letter = comparedWord[i]

			cDigits.push(letterToDigit[letter].digit)
		}

		//Careful about leading zeroes
		if (cDigits[0] === 0) {
				//leading zero, false
				return false
		}
		//Return if its a square or not 
		return squareExists[cDigits.join('')] !== undefined
	}

	await gf.fetchData(__dirname + '/0098_words.txt').then((res) => {
	//Sort the words
		//Create a table matching word length to sub-tables
		const words = res.replace(/["]/g, "").split(',')
		const wordLengthToWords = {}
		let maxWordLength = 0
		//sort the words by wordLength to sub-tables of anagram words
		for (const word of words) {
			const wordLength = word.length

			//rearrange and sort letters of a word in alphabetical order to check for matching anagram words
			const sortedLetters = word.split('').sort().join('')
			if (wordLengthToWords[wordLength] === undefined) {
				wordLengthToWords[wordLength] = {}
				wordLengthToWords[wordLength][sortedLetters] = [word]

				maxWordLength = Math.max(maxWordLength, wordLength)
			} else {
				// wordLengthToWords[wordLength].push(word)
				if (wordLengthToWords[wordLength][sortedLetters] === undefined) {
					wordLengthToWords[wordLength][sortedLetters] = [word]
				} else {
					wordLengthToWords[wordLength][sortedLetters].push(word)
				}
			}
		} 

		//not a single word with >9 letters contains anagram pair(s) 
		//should be easy and quick work since theres no two words to compare, no need to filter out 
		// for (let i = 14; i > 9; i--) {
		// 	console.log(wordLengthToWords[i])
		// }

		// for (let i = 9; i > 0; i--) {
		// 	console.log(wordLengthToWords[i])
		// }
		//Theres actually not a lot of anagram pairs
		//Since we're doing a one time step on every list of anagram words, theres no reason to filter out all the lists with only 1 word (and theres a lot of them)
			//Also what we are doing at each step will be an early exit due to containing only 1 word


	//Start with the longest word length for early termination if an answer is found
	//For words of length x,
		//match with square numbers containing x digits, ordered greatest to least 
		//Work with lists containing words all anagrams with each other
			//Brute force (n^2) style check left to right, square nums greatest to least
				//anagram pair found - check against highest, and mark highest

		//if highest square number of x digit is marked OR (the entire list of length x words are exhausted AND an answer with x digits is found)
			//we've found our highest square num for the given list of words, return

		let pointer = maxWordLength
		// pointer = 5
		while(pointer > -1) {

			//Once we find an answer for a certain amount of x digits, or words of length x
			//we want to be certain the verified is certainly the max for those x digits/length
			//Any possible answers with less than x digits will be guranteed to be less
			// if (maxSquare !== null) {
			// 	//we've found an answer for the previous wordLength, it should be the max
			// 	console.log(`The largest square number formed by our anagramic pair is ${maxSquare}`)
			// 	return
			// }
			console.log(`Working with words of length ${pointer}`)
			const wordLength = pointer
			let squareNums = [] //squareNums of x digits, sorted GTL
			let squareNumsCheck = {}
			// wordLengthToWords[wordLength] gives me a table [key:sortedLetters, value:list [words]]
			for (const sortedLetters in wordLengthToWords[wordLength]) {
				const anagramWords = wordLengthToWords[wordLength][sortedLetters]

				let baseIndex = 0
				let baseWord = anagramWords[baseIndex]

				let currentIndex = baseIndex + 1
				let currentWord = anagramWords[currentIndex]

				//we use the fact that currentWord will not be undefined with a list containing more than 1 word
				if (currentWord !== undefined && squareNums.length === 0) {
					//we actually need to populate our list

					//get the largest square number containing x digit as its square root
					const min = Math.pow(10, wordLength - 1)
					const max = Math.pow(10, wordLength) - 1
					let num = Math.floor(Math.sqrt(max))
					let squareNum = Math.pow(num, 2)

					while (squareNum >= min) {
						squareNums.push(squareNum)
						squareNumsCheck[squareNum] = true

						num--
						squareNum = Math.pow(num, 2)
					}

					// console.log(`Populating squareNums for wordLength of ${wordLength}, we are working with ${squareNums.length} square numbers`)
					//The anagram check might actually be the most expensive part just dealing with so many square numbers at higher digit counts
				}

				let squareNumIndex = 0
				let squareNum = squareNums[squareNumIndex]
				//base word, we increment base word when all compared words are exhausted with all possible square nums for our base 
				// console.log(`Checking out words from the list containing [${anagramWords}]`)
				while(baseWord !== undefined) {
					if (currentWord === undefined) {
						// console.log('current words exhausted, checking next base word')
						squareNumIndex++
						if (squareNumIndex >= squareNums.length) {
							baseIndex++
							squareNumIndex = 0
						}

						baseWord = anagramWords[baseIndex]
						squareNum = squareNums[squareNumIndex]
						currentIndex = baseIndex + 1
						currentWord = anagramWords[currentIndex]
						continue;
					}
					//compare the two words, check next word
						//if I were a smarter person I'd use the helper function to return null or the higher value of the two instead of boolean
					if (isAnagramPair(baseWord, currentWord, squareNum, squareNumsCheck)) {
						//mark it and make sure its the max of this length x

						// console.log(`We found an anagram pair!!! ${baseWord} with ${currentWord} associating ${squareNum} with ${baseWord} for ${currentWord}`)

						//Since we're not smarter, we check for the higher value between the base and current word

						// console.log(`${squareNum} for ${baseWord} has a square root of ${Math.sqrt(squareNum)}`)
						// console.log(`Assigning the digit to letter relationship`)

						const letterToDigit = {}
						const strNum = `${squareNum}`

						for (let i = 0; i < baseWord.length; i++) {
							const digit = strNum[i]
							const letter = baseWord[i]
							if (letterToDigit[letter] === undefined) {
								letterToDigit[letter] = {digit, pos:[i]}
							} else {
								letterToDigit[letter].pos.push(i)
							}
						}

						const cDigits = []
						for (let i = 0; i < currentWord.length; i++) {
							const letter = currentWord[i]

							cDigits.push(letterToDigit[letter].digit)
						}
						const cNum = Number(cDigits.join(''))
						// console.log(`${currentWord} results in ${cNum}, which has the square root value ${Math.sqrt(cNum)}`)
						maxSquare = Math.max(maxSquare, squareNum, cNum)
					} else {
						//check next word 
					}
					// console.log('I don\'t expect to reach this point for pointer > 9')
					// console.log('I do however expect it at 9')
					// everything is working nice and dandy....anagramic square check time
					currentIndex++
					currentWord = anagramWords[currentIndex]
				}
			}
			pointer--
		}


	})
	return maxSquare
}

// console.time('p98')
// p98().then((res) => {
// 	console.log(`Max square is ${res}`)
// 	console.timeEnd('p98')
// })
//I DID ITTTTT :)!!!!!! 

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


//Been a while, coming back. Prety sure the general idea is, z = B + R, and looking at B * B - 1 / (z * z - 1), get prime factorization of numerator and denominator side, cancel out primes so numerator is left with no primes, and denominator is left with 2 by itself indicating a 1 to 2 ratio
	//Ah, we want to start with z > Math.pow(10, 12), figuring out what our B and R looks like
		//pick a number Z, go for a B + R ratio that gets as close to 50/50 as possible, increment blue (decrementing red) or vice versa to adjust ratio, if crosses .5, options exhausted 
			//Case 1: (b * b - 1) / (z * z -1) results in .5 - its what we're looking for. Great! Return
			//Case 2: ' 											' results in prime set we're not looking for, ratio >.5, decrement b increment r
			//Case 3: '												' results in prime set we're not looking for, ratio <.5, increemntb, decrement r
				//case 2,3: once increment/decrement process crosses .5, increment z and try again

		//Choosing our value for Z, early on, 2/3 (66.67%) * 3/4 (75%) = 1/2 
			//																	15/21 (71.42857 %) * 14/20 (70%) = 1/2
			// I imagine we want to work close to 70% B to Z, maybe see if it should be higher as Z gets higher

// Lets say we're working a value z, that is the sum of x = blue discs and y = red discs. z = x + y
// if we were to represent z and z - 1 as a product of primes
	//is there a value x such that x and x - 1 as a product of primes matches z and z - 1, with one less 2 involved - meaning the ratio of x * (x - 1) with z * (z - 1) would be 1:2 => 1/2
		//ex: z = 120, 120 = 2^3 * 3 * 5, 119 = 7 * 17, we are looking for a value x and x - 1 that contains 2^2 * 3 * 5 * 7 * 17
			//120 * 119 = 2^3 * 3 * 5 * 7 * 17 = z primes (z * (z - 1))
			//2^2 * 3 * 5 * 7 * 17 = 7140 = x primes (x * (x - 1))
				//2 approaches here,
				//1) we try to use 'x' primes with an algorithmic apporach to see if a value x and x - 1 exists
				//2) we check for divisors of 7140 and see if there aren't 2 divisors 1 apart that contain the result we're looking for
						//for divisors, 
						//OHHHHHH - from our example, 7140 call it x' since its the result of product of primes between a value x and (x-1, if it were to have an x and x - 1
						//1) It can not be a perfect square - assume that x' is a perfect square, then the sqrt x' is some value x and there is no value x such that x * (x - 1) results in x', since x * x = x' for all positive integers x' (x' = 0 results in x = 0 where x * x and x * (x - 1) both result in x'=0)
						//2) Since its not a perfect square, x and x - 1 can be checked as the floor and ceiling values of the sqrt(7140)
							//in other words, sqrt(x') results in some value x'' that is not an integer, floor(x'') and ceil(x'') results in a value x and x - 1 that potentially results in x'
			//The issue: for obscenely large values z, even if we were to reduce z * z- 1 by 2 to get z', z' would still be a ridiculously high value like... ~10^23 ,
				//let z' -
// console.time('test')
// for (let i = 0; i < Math.pow(10, 4); i++) {
// 	// const num = Math.pow(10, 12) - Math.floor(Math.random() * Math.pow(10, 12))
// 	const num = Math.pow(10, 12) - i
// 	console.log(num)
// 	console.log(gf.primeFactorization(num))
// }
// console.timeEnd('test')



//AHHHHHHHHHHHHHHHH
//SOMETHNG SOMETHING SOMETHING
//I'm pretty certain modular arithmetic can my life easier here 
	//or something using congruence
			//idea is 2/3 * 3/4 = .5 => (2 * x) * (3 * x) / ((3 * x) * (4 * x)), basically x cancels out, result we're looking is (or should be made into) "simplest form" fraction that we've recognized and know will result in .5


//Another idea is that we're trying to take the pf of "large" numbers, we can perhaps reduce the complexity of this process by simplifying our numerator and denominator before we start looking at the prime values invovled 
	//the process of simplifying invovles finding common terms and canceling out, typically common primes or common composite numbers (which end up being made of the same common primes), sooooo, searching for primes to simplify - is it really a time/process saver? or are we just moving work somewhere else... 
		//might just want to skip the simplify process 


//HMMMMMMMM
	//pf(b) + pf( b - 1) ??? or pf(b * (b - 1)), b * b - 1 is a much larger number, but one time invocation, and the whole pf process is a relatively simple and straight forward process... 
		//we'd only rather do pf(b) + pf(b - 1) in situations where the product results in a number far too large to check for prime divisors 
		//SO, an arbitrary value b, for z > Math.pow(10, 12), b * b - 1, hell even z * z -1 will be a 13 digit * 13 digit resulting in at least 20 digits to work with, this is probably beyond (my computer's) processing and storage capabilites...
			//pf(b) + pf(b - 1) - pf(z) - pf(z - 1) it is

//Also from what I can tell, we're looking at a 7:3 ratio (more or less) of blue to red for the typical solution


// OOOOH, forgot about this, but for a value n, n and n - 1 are co-prime
	//might be useful? might not be 

//Helping me choose a number... What if we use binary search to reduce our process from linear to log
//instead of looking for an arbitrary number and working our way close to a .5 ratio, can we, at a fixed value z, use a formula to determine the amount of blues and red to be as close as possible to a .5 ratio
	//ex: z = 4, 4 * 3 = 12,  12 / 2 = 6 = 3 * 2
	//    z = 21, 21 * 20 = 420, 210 (15 * 14) => floor(sqrt(210)) * ceil(sqrt(210)) =  14 * 15 => difference of 1, IT WORKS
	//    z = 33, 33 * 32 = 1056, 528 => floor(sqrt(528)) * ceil(sqrt(528)) = 2
	//    z = 120, 120 * 119 = x, x / 2 (85 * 84) => 

	//I can use mods to see if two numbers (1 apart) divide into half our z * z - 1
		//issue is z * z - 1 is a crazy large number

	//get pf(z) && pf(z - 1), combine their prime and power sets, increment powers for matching primes
		//decrement power of 2 by 1. This is the intended power and prime set of our numerator if it exists
			//1st solution (idea): form 2 numbers 1 apart with the prime/power 
				//each number will be made of unique primes. 0 intersecting primes
				//How? : No fucking clue....stlll no fucking clue :)
			//2nd solution idea: take product of primes^power and check divisors if a divisor pair is 1 apart
				//issue, stupidly large number 

	//What if... we worked in the opposite direction???
		//We pick a value b, multiply it with b - 1, double it. Again stupidly large number, Ah, but then we'd just be looking for divisor of this number that results in a pair 1 apart...
		//FUCK

//trying to figure out how to get around working with stupidly large numbers and the idea for now is to use prime numbers

//we have a value z and z - 1, we break the two in sets of prime and combine them, remove a single 2,
	//what can we do with this (if anything) to check for a valid value for b
		//we would need to use every prime number to form two numbers with a difference of 1

	//hmmmm let x be the value where 3 * x results in the first number > 10^12
		//we can treat it 
function p100() {

	const {primes} = gf.getPrimeData(Math.floor(Math.sqrt(Math.pow(10, 12))) + 1)
	function pfHelper(n) {
		// console.log(`Working on the pf of ${n}`)
		const res = {}

		if (n < 2) return res;


		let num = n
		let primeIndex = 0
		let primeNum = primes[primeIndex]
		while (num > 1) {
			// console.log(`considering value prime number${primeNum} in our factorization`)
			if (num % primeNum === 0) {
				let pow = 0
				while (num % primeNum === 0 && num >= primeNum) {
					pow++
					num = num / primeNum
				}
				res[primeNum] = pow
			}
			primeIndex++
			primeNum = primes[primeIndex]

			//Personal line of code catered towards the problem, we expect that once our list of primes are exhausted, we've reached a range where we trust the number we're looking at is itself, a prime value
			if (primeNum === undefined) {
				res[num] = 1
				break;
			}
		}

		return res
	} 

	// let z = Math.pow(10, 12)
	let z = 3
	while (z < Math.pow(10, 3)) {
		//run our 3 cases, >, <, = to .5
		//typical solutions at 1 < z < 10000 our in the b : r, 7 : 3 ratio, we'll use that for our arbitrary starts
		const pfz1 = pfHelper(z)
		const pfz2 = pfHelper(z - 1)

		// const pfz = {...pfz1}

		// for (const [key, value] of Object.entries(pfz2)) {
		// 	if (pfz[key] === undefined) {
		// 		pfz[key] = value
		// 	} else {
		// 		pfz[key] += value
		// 	}
		// }

		const pfz = {...pfz1, ...pfz2} //since n and n - 1 are co prime, we dont expect overlapping primes
		// console.log('1', pfz1, pfz2)
		// console.log('2', pfz)
		let b = Math.floor(.7 * z)

		const pfb1 = pfHelper(b)
		const pfb2 = pfHelper(b - 1)
		const pfb = {...pfb1, ...pfb2}

		//we have pf of num and denom
			//now we break it down 
			//for the result we're looking for, numerator need to be empty, denominator has a remainder of 2
				//if its not, we need to figure out if we should incrementing or decrementing b


		for (const [prime, power] of Object.entries(pfz)) {
			if (pfb[prime] !== undefined) {
				const diff = Math.min(pfb[prime], pfz[prime])

				pfb[prime] -= diff
				pfz[prime] -= diff

				if (pfb[prime] === 0) delete pfb[prime];
				if (pfz[prime] === 0) delete pfz[prime];
			}
		}

		//we've gone through all of the primes in the denominator (z side), if any prime in the numserator (b side) wasn't checked, its because its not shared with z
		//if numerator isn't empty and denominator has a remainder of 2, we work with the simplified fraction to figure out if its > or < .5

		if (Object.keys(pfb).length !== 0 && Object.keys(pfz).length !== 1) {
			//check simplified fraction
				//use remaining primes of numerator and denominator to form a simplified fraction
			let numerator = 1
			let denominator = 1

			for (const [prime, power] of Object.entries(pfb)) {
				numerator *= Math.pow(prime, power)
			}

			for (const [prime, power] of Object.entries(pfz)) {
				denominator *= Math.pow(prime, power)
			}

			const fract = numerator / denominator

			if (fract > .5) {
				//decrement numerator side, b side
			} else if (fract < .5) {
				//increment numerator side, b side
			} else {
				console.log('HUH? Check this out pls')
			}
		} else if (pfz['2'] !== undefined && pfz['2'] === 1) {
			console.log('GREAT IT WORKED')
		}
		z++	
	}	



}
p100()


//tryin figure out how I want to pick an "arbitrary" blue and red mix to choose from
function v100() {
	let z = 3
	let b = Math.ceil(z / 2)
	let r = z - b

	while (z < Math.pow(10, 3)) {
		//run our 3 cases, >, <, = to .5
		let numerator = b * (b - 1)
		const denominator = z * (z - 1)
		let fract = numerator / denominator
		console.log(numerator / denominator)
		console.log(numerator / denominator === .5) 

		if (fract === .5) {
			console.log('great!', b, r, z)
		} else if (fract < .5) {
			//increment numerator until >= .5

			while (fract < .5) {
				b++
				r-- //really no need to think about r. z stays the same (b is the only thing we ever adjust that affects our fraction
				numerator = b * (b - 1)
				// denominator = z * (z - 1)
				fract = numerator / denominator

				if (fract === .5) {
					console.log('g2', b, r, z)
					break;
				}
			}
		} else if (fract > .5) {
			//decrement numerator until <= .5

			while (fract > .5) {
				b--
				r++ //again no need
				numerator = b * (b - 1)
				// denominator = z * (z - 1)
				fract = numerator / denominator

				if (fract === .5) {
					console.log('g3', b, r, z)
					break;
				}
			}
		}
		z++
		b = Math.ceil(z / 2)
		r = z - b //blah
	}
}
// v100()


// console.log(64 * 63 / (91 * 90))
// p100(10)
// 144 = 12^2 = (2^2 * 3)^2
// 784 = 28*2 = (2^2 * 7)^2, fun fact: every perfect square has a even number of primes in pf form
// console.log(2 * 2 * 3 * 5 * 7 * 17)

// for (let i = 1; i < Math.sqrt(7140); i++) {
// 	if (7140 % i === 0) {
// 		console.log(`${i} * ${7140 / i} results in 7140`)
// 	}
// }
// console.log(Math.sqrt(7140))

//
// let z = Math.pow(10, 12) + Math.pow(10, 6)
// console.log(Math.sqrt(z * (z - 1)))

