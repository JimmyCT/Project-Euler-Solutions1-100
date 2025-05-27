//Problem 61 Cylical figurate numbers

//Cylic
	//Tail -> head
		//len 1, 2, or 3??? 4 digit numbers


//Mark and check which polygonal numbers have been checked

function problem61() {
	const triNums = []
	// const firstTriNums = [] // first two digits
	// const lastTriNums = [] // last two digits
	const firstToLastTriNums = new Map()

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
		const first = `${triNum}`.slice(0, 2)
		const last = `${triNum}`.slice(2)

		const list = firstToLastTriNums.get(first)

		if (list === undefined) {
			firstToLastTriNums.set(first, [last])
		} else {
			list.push(last)
		}

		triNum = getNextTriangle()

	}
	
	// console.log(triNums, '\n', firstTriNums, '\n', lastTriNums)
	console.log(triNums, '\n', firstToLastTriNums)

	return;

	const squareNums = []

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
		squareNum = getNextSquare()
	}






	let pentaNums = []

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
		pentaNum = getNextPentagonal()
	}







	const hexaNums = []

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
		hexaNum = getNextHexagonal()
	}






	const heptaNums = []

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
		heptaNum = getNextHeptagonal()
	}




	const octaNums = []

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
		octaNum = getNextOctagonal()
	}


	console.log(triNums)
	console.log(squareNums)
	console.log(pentaNums)
	console.log(hexaNums)
	console.log(heptaNums)
	console.log(octaNums)

}

problem61()

//Option 1:
	//Store all 4 digit results of the figurate numbers
		//assuming we are looking for 2 digit cycles, so last two digits of one digit matches first two digits of another figurate we haven't seen yet
			//we can rewrite our code to check for last 1-3 digit matching first/first three digit(s) of unseen marked figurate sets
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