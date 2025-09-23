import gf from './generalFunctions.js'

const __dirname = import.meta.dirname


//Problem 94 - Almost Equilateral Triangles


//Personal Notes 
	//Okay the problem seems simple enough

	//I misread the conditions, integral side lengths and integrral areas, and perimeters that do not exceed 1 billion. The area can exceed one billion

	//Workarounds for stupidly large areas?

	//Looking at our use of Heron's formula
		//Really we're just trying to see if the square root results in an integer
			//if it were to be an integer value, then s * (s - a) * (s - b) * (s - c) would need to be a square number
				//max, a = b =  333,333,333 and c = 333,333,334, s = 1,000,000,000, doing a bit of cheating, area = (s * 3(2/3s)) = 3s


	// Looking at our area... where can we find something like... a mirror or symmetry... 
		//can we have our area to be in the form area = x^2 where x can substitute for some form of Heron's formula
		//Heron's formula will results in an integer value area 
			//if the area is a square number
			//if the area can be expressed as area = x^2, so let x = abc, then area can be expressed in some form (abc)(abc)

	//s = (a + b + c) / 2 => 2s = a + b + c
		//a = sqrt(x), x = s * (s - a) * (s - b) * (s - c)
		//	= (s^2 - sa) * (s^2 - sb) * (s^2 - sc)
		//  = (s^4 - s^3b - s^3a + s^2ab) * (s^2 - sc)
		//  = s^6 - s^5b - s^5a + s^4ab - s^5c + s^4bc + s^4ac - s^3abc
		//  = s^6 - s^5(a + b + c) + s^4(ab + bc + ac) - s^3abc
		//  = s^3 * (s^3 - s^2(a + b + c) + s(ab + bc + ac) - abc)
		//  = s^3 * (s^3 - 2s^3 + s(ab + bc + ac) - abc)
		// = s^3 * (-s^3 + s(ab + bc + ac) - abc )
				//can I prove situations where 2s^3 = s(ab + bc + ac) - abc
					//?
					//	substitue s = (a + b +c) / 2 for 
					//  2s^3 = s(ab + bc + ac) - abc
					//	2((a + b + c) / 2)^3 = (a + b + c) / 2 * (ab + bc + ac) - abc
					// => (a + b + c)^3 / 4 = (a + b + c)(ab + bc + ac)/2 - abc
					// => (a + b + c)^3 = 2(a + b + c)(ab + bc + ac) - 4abc
					// => (a + b + c)^3 = 2(a^2b + a^2c + abc + ab^2 + b^2c + abc + abc + bc^2 + ac^2) - 4abc
					// => (a + b + c)^3 = 2(a^2b + a^2c + ab^2 + b^2c + ac^2 + bc^2 + 3abc) - 4abc
					// => (a + b + c)^3 = 2(a^2b + a^2c + ab^2 + b^2c + ac^2 + bc^2) + 2abc
					// =>           = 2(a^2b + a^2c + ab^2 + b^2c + ac^2 + bc^2 + abc)
					// =>           = 2(a^2(b + c) + b^2(a + c) + c^2(a + b) + abc)
							//(a + b + c)^3 = (a^2 + b^2 + c^2 + 2ab + 2ac + 2bc)(a + b + c)
							//              = (a^3 + b^3 + c^3 + 2a^2b + 2a^2c + 2ab^2 + 2b^2c + 2ac^2 + 2bc^2 + 6abc)
							// 							= (a^3 + b^3 + c^3) + 2(a^2b + a^2c +ab^2 + b^2c + ac^2 + bc^2) + 6abc


	//might need to somewhere conveniently use the fact that a = b, and c = a +/- 1

	//area = s * (s - a) * (s - b) * (s - c), s = (a + b + c) / 2
		//case1: a = b, c = a - 1
			//	area = s * (s - a) (s - a) * (s - a - 1), s = (3a - 1) / 2
				//let x = s - a, => area = s(x)(x)(x - 1) = s(x^2)(x - 1) = sx^3 - sx^2 = s(s - a)^3 - s(s - a)^2
			// 	=>  area = ((3a - 1) / 2)((3a - 1) / 2 - a)((3a - 1) / 2 - a)((3a - 1) / 2 - a - 1)


		// (s^2 - sa)^2 * (s^2 - sa - s)
		// => (s^2 - sa)^3 - s(s^2 - sa)^2	
		//case2: a = b, c = a + 1
function p94() {
	let res = '0'
	//Heron's Formula for Area of a triangle
	function getArea(a, b, c) {
		const s = (a + b + c) / 2
		return Math.sqrt(s * (s - a) * (s - b) * (s - c))
	}

	//v2 gets a little high, leads to precision errors, irrelevant for an integer check tho
	function v2(a,b,c) {
		return Math.sqrt(-(Math.pow(a, 4)) - Math.pow(b, 4) - Math.pow(c, 4) + (2 * Math.pow(a,2) * Math.pow(b, 2)) + (2 * Math.pow(a,2) * Math.pow(c,2)) + (2 * Math.pow(b, 2) * Math.pow(c, 2))) / 4
	}
	//Perimeter AND Area of "almost-equilateral" triangles up for consideration will not exceed 1 billion
	//two sides are the same, the third differ by 1, +/- 1

	//quick check at 1 1 2 since 1 1 0 is impossible
	// console.log(getArea(1,1,2)) results in an area of 0... Do we include Degenerate Triangles????????????
		//Might vary the answer here, include first, exclude later
		res = gf.strSum(res, '4') // 1 1 2 results in a degenerate triangle, 0 is still an integer

	//loop at 2 2 1, 2 2 3 until either perimeter OR area exceeds one billion, in which case we've exhausted all of our options	
	let i = 2
	let lowerArea = getArea(i, i, i - 1)
	let lowerPerimeter = i + i + i - 1
	let upperArea =  getArea(i, i, i + 1)
	let upperPerimeter = i + i + i + 1

	let tmp = 1
	while (lowerPerimeter <= Math.pow(10, 9)) {
		if (i > Math.pow(10, tmp)) {
			console.log(`Checking values greater than ${Math.pow(10, tmp)}`)
			tmp++
		}
		if (i === 333333333) {
			console.log('YO IT SHOULD STOP AFTER THIS')
		}
		if (i === 333333334) {
			console.log('WTF')
		}
		if (Number.isInteger(lowerArea)) {
			// res += i + i + i - 1
			// console.log(`Almost Equilateral triangle with sides ${i} and ${i - 1} results in an integer area of ${lowerArea}`)
			// res += 3 * i - 1
			res = gf.strSum(res, `${lowerPerimeter}`)
			// console.log(`current sum is at ${res}`)
		}

		if (Number.isInteger(upperArea)) {
			// console.log(`Almost Equilateral triangle with sides ${i} and ${i + 1} results in an integer area of ${upperArea}`)
			// res += 3 * i + 1
			res = gf.strSum(res, `${upperPerimeter}`)
			// console.log(`current sum is at ${res}`)
		}

		i++
		lowerArea = getArea(i, i, i - 1)
		upperArea =  getArea(i, i, i + 1)
		lowerPerimeter = i + i + i - 1
		upperPerimeter = i + i + i + 1
	}

	return res
}

console.log(p94())


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
		let chainNumsSet = new Set()
		const startVal = num
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
		//we've exit the loop, which means a chain has been formed
		//Check to see if the chain (cycle) loops to the start or somewhere in the middle
		if (sumPDivisors <= Math.pow(10,6) && sumPDivisors === startVal) {
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
// console.log(p95(1000000))
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

// console.log(`If I did this correctly, then the last 10 digits of 2^7830457 * 28433 + 1 is ${p97()}`)


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
	console.log('start')
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

					// console.log(`Populating squareNums for wordLength of ${wordLength}. Square Nums:${squareNums}`)
					console.log(`Populating squareNums for wordLength of ${wordLength}, we are working with ${squareNums.length} square numbers`)
					//The anagram check might actually be the most expensive part just dealing with so many square numbers at higher digit counts
				}

				let squareNumIndex = 0
				let squareNum = squareNums[squareNumIndex]
				//base word, we increment base word when all compared words are exhausted with all possible square nums for our base 
				console.log(`Checking out words from the list containing [${anagramWords}]`)
				while(baseWord !== undefined) {
					if (currentWord === undefined) {
						// console.log('current words exhausted, checking next base word')
						squareNumIndex++
						if (squareNumIndex >= squareNums.length) {
							baseIndex++
							squareNumIndex = 0
							// squareNum = squareNum[squareNumIndex]

							// currentIndex = baseIndex + 1
							// currentWord = anagramWords[currentIndex]
						} else {
							// squareNum = squareNums[squareNumIndex]
							// currentIndex = baseIndex + 1
							// currentWord = anagramWords[currentIndex]
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
						console.log(`We found an anagram pair!!! ${baseWord} with ${currentWord} associating ${squareNum} with ${baseWord} for ${currentWord}`)

						//Since we're not smarter, we check for the higher value between the base and current word
						console.log(`${squareNum} for ${baseWord} has a square root of ${Math.sqrt(squareNum)}`)
						console.log(`Assigning the digit to letter relationship`)

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

							// const digit = letterToDigit[letter].digit
							cDigits.push(letterToDigit[letter].digit)
						}
						const cNum = Number(cDigits.join(''))
						console.log(`${currentWord} results in ${cNum}, which has the square root value ${Math.sqrt(cNum)}`)
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

	console.log(maxSquare)
	console.log('Done')
}

// p98()
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
function p100(z) {
	//assume a value z,
	const pf1 = gf.primeFactorization(z)
	const pf2 = gf.primeFactorization(z - 1)
	console.log(pf1, pf2) 
	//break z and z - 1 into prime factorization form, product of primes, call it z'
	//reduce z' by 2, call it x'

	//take the sqrt of x'
		//if x' is a perfect square, we have no viable options
		//else, check floor and ceil of sqrt value, take product and check if results in x'
}
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



// let z = Math.pow(10, 12) + Math.pow(10, 6)
// console.log(Math.sqrt(z * (z - 1)))

