import gf from './generalfunctions.js'

//Problem 71 Ordered Fractions

//Brute force naive approach, 
	//for 1 <= d <= 10^6, we get all values of n < d where n / d is in reduced proper fraction
	//Use a insertion sort type of algorithm to insert into our list
	//get position of 3/7
	//look to the left, return numerator

//less work
	//for n < d, n = 0 to n = d - 1
	//keep track of the greatest n / d less than 3 / 7
		//pointer for numerator and pointer for denominator, oh our n and d values

//Intent: Euclid's Algorithm
function gcd(n1, n2) {
	
	let a = Math.max(n1, n2)
	let b = Math.min(n1, n2)

	let r = a % b
	while (r !== 0) { 
		a = Math.max(b, r)
		b = Math.min(b, r)
		r = a % b
	}

	return b
}


//holy fuck this is slow, what is the time complexity of Euclid's algo?
	//Time complexity: O(log(min(a, b)))
	//without any sort of minute optimizations, 
		//we are running a log(min(n, d)) process on 1 + 2 + 3 + (1,000,000 - 1) steps 
			//1 + 2 + 3 + ... + n = n(n + 1)/2 
			//(10^6) - 1 because we are checking postive integers n, where n < d and d = 1, 2, 3 ..., 10^6
				//when d = 1, we do nothing, d = 2, 1 step, d = 3, 2 steps up, d = 10^6, we do 10^6 - 1 steps
		//so running euclid's algo on every fraction we expect a worst case m^2 * log(min(a_m, b_m)) where a_m and b_m are the values n and d respectively in our overarching m steps 

//would it be faster to just sort all n / d and then check for proper fractions?
	//no
		//for all postive integers d less than or equal to 10^6, d = 1,2,3,...,10^6
			//for all postive integers n, where n < d,
		//let m = max d = 10 ^ 6
			//we are running 1 + 2 + 3 + ... + m - 1 different fractions of n / d proper or not and sorting it into our list
				// => we are working with (m - 1)(m)/2 fractions

				//we start with an empty list and we keep it sorted as we add our fractions
					//binary search to find the position, and insert, (binary insertion sort?),
						//so we do a log(k) process where k is the size of the list during insertion,
						//k = 0,1,2,3,...,(m -1)(m)/2

						//keep track of position of 3/7 and check to left for proper fraction
							//this step 


//what if i think in primes??
	// if num a in prime factorization share a prime with with num b in PF form, then HCF > 1
		//Turning a random number x into its prime factor form for postive integers x < 1,000,000 is a relatively simple and quick process with a list of primes sorted LTG to work with
		//for the sake of just seeing if HCF(a, b) = 1, we just see if a prime number divides into both,
			//we'd be looking at primes < Math.sqrt(min(a, b)), which we can only estimate complexity with algorithms that estimate count of primes 
				//pi(x) = count of primes less than x => time complexity = O(pi(z)) where z = sqrt(min(a, b))

			//at worst min(a,b) = 999,999, sqrt(10^6) = 10^3 and pi(10^3) = 168, log(min(a,b)) at worst is log(1,000,000) = 6. 6 < 168
				// const {primes, primeBools} = gf.getPrimeData(Math.pow(10, 3))
		//Note; the HCF is the product of individual prime(s) p_n^(count of p_n that they sharee)





//P72 efficient solution ?
	//Thinking in primes a little differently... HCF(n, d) = 1 if n and d in prime factor form share no common primes at all
		//Knowing this... we could use a combination algorithm to work with primes and get precise numbers n < d that are also HCF(n, d) = 1
			//for a value d, we work strictly with all primes less than or equal to the sqrt(d)
				//from here, we convert that value d into prime factor form
				//since all HCF(n, d) = 1 are unique proper fractions, use combinatorics to get all possible values
				//of n < d by using primes <= sqrt(d) and (prime value in n !== prime value in d)
					//we start with a count of 0 for all primes in n that don't match in d that fit are criteria
						// => i.e. n = 1 / d
						// using these same primes we adjust the exponents of the primes to get unique combinations for values n
							//Each unique combination (order of the primes does not matter) is a unique value of n that is also < d and HCF(n, d) = 1
							//the number of unique combinations... i'm not sure how to do a general time complexity yet thinking about the average...
								//but we can work with it to verify n < d and get the count of unique combinations for p72


function p71(limit) {
	let res = null
	let quotient = 0 // 0/0 ?
	let d = 2

	while (d <= limit) {
		console.log(`d= ${d}`)
		let n = 1

		//we want to consider n / d that is < 3/7 AND > our current quotient AND is in proper fraction form
		while ((n / d) < quotient && n < d) {
			n++
		}

		while ((n / d) < (3 / 7)) {
			//is n / d a proper fraction? - GCD(n, d) = 1
			if (gcd(n, 1) === 1) {
				//we don't really need a sorted list
				//we just need the greatest n / d that is < 3 / 7
					//may need to do manual divsion for precision
				if ((n / d) < (3/7) && (n / d) > quotient) {
					res = n
					quotient = n / d
				}
			}
			n++
		}
		d++
	}

	return res
}
//Solved it with the algorithm above, but it took a lot longer than I'd like
// answer:428570

// console.log(p71(1000000))


//Problem 72 Counting fractions
//Random note, we can easily cut work by a quarter by skipping even numbers n with even numbers d 

//n, d = postive integers and n < d, considering d <=1,000,000
	//=> min n = 1, min d = 2 so that both are postive integers and n < d
function p72(limit) {
	let doubleCheckCount = 0
	// const properFractions = new Set() //unordered

	let d = 2

	while (d <= limit) {
		console.log(`working on d= ${d}`)
		let n = 1
		// 1 divided by any num d will be a unique propeer fraction
		// properFractions.add(`${n}/${d}`)
		doubleCheckCount++
		n++
		while (n < d) {
			if (d % 2 === 0) {
				if (n % 2 === 0) {
					n++
					continue;
				}
			}
			if (gcd(n, d) === 1) {
				// properFractions.add(`${n}/${d}`) //any HCF(n, d) = 1 will be a unqiue proper fraction  n / d 
				doubleCheckCount++
			}
			n++
		}
		d++
	}

	console.log(`we expect doubleCheckCount=${doubleCheckCount} to be the same value as the size of our set of proper fractions =${properFractions.size}`)
	return doubleCheckCount
	// return properFractions.size
}

// p72(8)
p72(Math.pow(10, 6))