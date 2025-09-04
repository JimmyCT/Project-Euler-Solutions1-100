import gf from './generalFunctions.js'

const __dirname = import.meta.dirname



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
function p98() {
	gf.fetchData(__dirname + '/0098_words.txt').then((res) => {
		console.log(res)

	//Sort the words
		//Create a table matching word length to sub-tables
		//sub-table matching initial letter to list containing lists of anagram words

	//Start with the longest word length for early termination if an answer is found
	//For words of length x,
		//match with square numbers containing x digits, ordered greatest to least 
		//Work with lists containing words all anagrams with each other
			//Brute force (n^2) style check left to right, square nums greatest to least
				//anagram pair found - check against highest, and mark highest

		//if highest square number of x digit is marked OR (the entire list of length x words are exhausted AND an answer with x digits is found)
			//we've found our highest square num for the given list of words, return

		
	})
}

p98()
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

