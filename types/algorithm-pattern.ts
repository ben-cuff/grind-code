export type AlgorithmPattern = {
	id: string;
	name: string;
	description: string;
};

export const algorithmPatterns: AlgorithmPattern[] = [
	{
		id: "slidingWindow",
		name: "Sliding Window",
		description:
			'**Sliding Window**  \nA technique that efficiently processes arrays or strings by maintaining a "window" (a subrange of elements) and sliding it through the data. It minimizes redundant calculations by reusing previous computations, making it ideal for solving problems involving contiguous sequences or subarrays with optimal time complexity (often O(n)).  \n\n**Use Cases:**  \n1. **Fixed-size window:**  \n   - Find the maximum sum of `k` consecutive elements.  \n   - Calculate the average of every `k`-sized subarray.  \n2. **Variable-size window:**  \n   - Identify the longest substring without repeating characters.  \n   - Find the smallest subarray with a sum ≥ target.  \n3. **Pattern matching:**  \n   - Check for substring permutations (anagrams).  \n   - Count occurrences of specific subarray patterns.  \n\n**Examples:**  \nSolve problems like *Maximum Sliding Window* (LeetCode) or *Longest Repeating Character Replacement* efficiently.',
	},
	{
		id: "twoPointer",
		name: "Two Pointer",
		description:
			"**Two Pointer**  \nA technique where two pointers traverse a data structure (often an array or linked list) in tandem or from opposite ends to efficiently solve problems with minimal space complexity. Ideal for scenarios requiring comparisons, pair searches, or in-place modifications, typically achieving linear time complexity (O(n)).  \n\n**Use Cases:**  \n1. **Sorted array traversal:**  \n   - Find pairs summing to a target (e.g., Two Sum II).  \n   - Remove duplicates from a sorted array.  \n2. **Multiple sequences:**  \n   - Merge two sorted arrays.  \n   - Check for subsequences (e.g., is one string a subsequence of another?).  \n3. **In-place modifications:**  \n   - Reverse a string or linked list.  \n   - Move all zeros to the end of an array.  \n4. **Cycle detection:**  \n   - Detect cycles in linked lists (Floyd’s algorithm).  \n\n**Examples:**  \nSolve problems like *Container With Most Water*, *Valid Palindrome*, or *3Sum* efficiently.",
	},
	{
		id: "fastSlowPointers",
		name: "Fast Slow Pointers",
		description:
			'**Fast Slow Pointers**  \nA technique where two pointers traverse a data structure (e.g., linked list or array) at different speeds—one "fast" (moves multiple steps) and one "slow" (moves single steps). Efficiently solves problems involving cycles, midpoint detection, or synchronization in sequences, often achieving O(n) time and O(1) space complexity.  \n\n**Use Cases:**  \n1. **Cycle detection:**  \n   - Detect cycles in linked lists (Floyd’s algorithm).  \n   - Determine the starting node of a cycle.  \n2. **Middle element identification:**  \n   - Find the middle of a linked list (e.g., for partitioning or reversing).  \n3. **Palindrome/sequence analysis:**  \n   - Check if a linked list is a palindrome.  \n   - Identify repeating patterns in sequences.  \n\n**Examples:**  \nSolve problems like *Linked List Cycle* (LeetCode), *Happy Number*, or *Palindrome Linked List* efficiently.',
	},
	{
		id: "binarySearch",
		name: "Binary Search",
		description:
			"**Binary Search**  \nA technique that efficiently locates a target in a **sorted** array by repeatedly dividing the search interval in half. It eliminates half of the remaining elements at each step, achieving logarithmic time complexity (O(log n)). Ideal for problems involving sorted data or search-space reduction.  \n\n**Use Cases:**  \n1. **Search in sorted data:**  \n   - Find the index of a target value.  \n   - Verify if a value exists in a sorted array.  \n2. **Boundary detection:**  \n   - Find the first/last occurrence of a target.  \n   - Identify the insertion position for a target (e.g., in dynamic arrays).  \n3. **Range-based problems:**  \n   - Search in rotated sorted arrays.  \n   - Find the smallest/largest valid value (e.g., in monotonic functions).  \n\n**Examples:**  \nSolve problems like *Search in Rotated Sorted Array*, *Find First and Last Position of Element*, or *Sqrt(x)* efficiently.",
	},
	{
		id: "heapTopK",
		name: "Heap Top K",
		description:
			"**Heap (Priority Queue) - Top K**  \nA technique that leverages heap data structures (min-heap or max-heap) to efficiently track and retrieve the top or bottom **K** elements from a dataset. Optimizes time complexity for problems requiring frequent access to extreme values (e.g., largest, smallest, most frequent) without full sorting, often achieving O(n log k) efficiency.  \n\n**Use Cases:**  \n1. **Stream processing:**  \n   - Find the Kth largest/smallest element in a data stream.  \n   - Maintain real-time top K results from dynamic input.  \n2. **Frequency analysis:**  \n   - Identify the K most frequent elements in a dataset.  \n   - Track the K highest-scoring entries.  \n3. **Optimized sorting:**  \n   - Merge K sorted arrays/lists efficiently.  \n   - Select K closest points to a target.  \n\n**Examples:**  \nSolve problems like *Top K Frequent Elements*, *Kth Largest Element in a Stream*, or *Find Median from Data Stream* efficiently.",
	},
	{
		id: "bfs",
		name: "BFS",
		description:
			"**BFS (Breadth-First Search)**  \nA graph traversal algorithm that explores nodes level by level, using a queue to track the next nodes to visit. Ideal for finding **shortest paths in unweighted graphs**, exploring neighbors systematically, or processing hierarchical data, with time complexity O(n + m) (nodes + edges) and space complexity O(n).  \n\n**Use Cases:**  \n1. **Shortest path in grids/graphs:**  \n   - Minimum steps to reach a target in a maze or grid.  \n   - Social network degree-of-separation analysis.  \n2. **Level-order processing:**  \n   - Traverse binary trees level by level.  \n   - Capture all nodes at a specific depth.  \n3. **Connected components:**  \n   - Identify islands in a matrix.  \n   - Check network connectivity.  \n4. **Puzzle/state transitions:**  \n   - Solve problems like Word Ladder (changing one letter at a time).  \n   - Simulate spreading processes (e.g., rotting oranges, virus spread).  \n\n**Examples:**  \nSolve problems like *Binary Tree Level Order Traversal*, *Rotting Oranges*, or *Word Ladder* (LeetCode) efficiently.",
	},
	{
		id: "dfs",
		name: "DFS",
		description:
			"**DFS (Depth-First Search)**  \nA graph traversal algorithm that explores nodes as far as possible along a branch before backtracking, using a stack (explicitly or via recursion). Ideal for **exhaustive path exploration**, backtracking scenarios, or hierarchical processing, with time complexity O(n + m) (nodes + edges) and space complexity O(n).  \n\n**Use Cases:**  \n1. **Path exploration:**  \n   - Find all possible paths in a maze or grid.  \n   - Traverse trees/graphs in pre-order, in-order, or post-order.  \n2. **Cycle/connectivity analysis:**  \n   - Detect cycles in graphs.  \n   - Check if a graph is bipartite.  \n3. **Backtracking/permutations:**  \n   - Generate all subsets, permutations, or combinations.  \n   - Solve puzzles like Sudoku or N-Queens.  \n4. **Topological sorting:**  \n   - Resolve dependencies (e.g., course scheduling).  \n   - Order nodes in directed acyclic graphs (DAGs).  \n\n**Examples:**  \nSolve problems like *Number of Islands*, *Combination Sum*, *Target Sum*, or *Course Schedule* (LeetCode) efficiently.",
	},
	{
		id: "bitwise",
		name: "Bitwise",
		description:
			"**Bitwise Manipulation**\nA technique that uses bit-level operations (AND, OR, XOR, shifts, etc.) to manipulate data directly in its binary form. Enables highly optimized solutions for problems involving binary representations, flags, or arithmetic optimizations, often achieving O(1) time for individual operations and minimal space overhead.\n\n**Use Cases:**\n1. **Efficiency optimizations:**\n   - Count set bits (1s) in a number’s binary form.\n   - Check if a number is a power of two.\n2. **Binary representation tricks:**\n   - Generate all subsets of a set via bitmasking.\n   - Swap values without temporary variables.\n3. **Specific algorithms:**\n   - Find the single unique element in a duplicated array (XOR trick).\n   - Reverse bits of a number.\n   - Perform arithmetic operations (e.g., addition) using bitwise logic.\n\n**Examples:**\nSolve problems like *Single Number*, *Number of 1 Bits*, *Subsets*, or *Power of Two* (LeetCode) efficiently.",
	},
	{
		id: "backtracking",
		name: "Backtracking",
		description:
			"**Backtracking**\nA brute-force technique that builds candidates incrementally and abandons partial solutions (backtracks) when they fail to satisfy constraints. Ideal for exhaustive search problems requiring exploration of all permutations, combinations, or configurations, often with pruning to optimize performance (time complexity varies, typically exponential).\n\n**Use Cases:**\n1. **Permutations/combinations:**\n   - Generate all possible subsets, permutations, or combinations.\n   - Find unique groupings (e.g., phone number letter combinations).\n2. **Constraint satisfaction:**\n   - Solve puzzles like Sudoku, N-Queens, or crossword patterns.\n   - Validate placements under specific rules (e.g., non-attacking chess pieces).\n3. **Partitioning problems:**\n   - Divide an array into k equal-sum subsets.\n   - Split strings into valid palindromic substrings.\n4. **Decision trees:**\n   - Explore paths in mazes or grids with obstacles.\n   - Evaluate all possible game moves (e.g., Tic-Tac-Toe).\n\n**Examples:**\nSolve problems like *Combination Sum*, *Subsets*, *N-Queens*, or *Palindrome Partitioning* (LeetCode) efficiently.",
	},
	{
		id: "dynamicProgramming1d",
		name: "Dynamic Programming 1D",
		description:
			"**Dynamic Programming (1D)**\nA technique that solves problems by breaking them into overlapping subproblems and storing results in a one-dimensional array. Optimizes time and space by reusing previous computations, typically achieving O(n) time and O(n) or O(1) space complexity.\n\n**Use Cases:**\n1. **Sequence optimization:**\n   - Maximize sum of non-adjacent elements (House Robber).\n   - Find the maximum subarray sum.\n2. **Step-based decisions:**\n   - Compute Fibonacci numbers or ways to climb stairs.\n   - Calculate minimum cost to climb stairs.\n3. **Combinatorial counting:**\n   - Determine ways to decode a string (Decode Ways).\n   - Count combinations to form a target sum (Coin Change).\n4. **Space efficiency:**\n   - Reduce space usage by reusing arrays (e.g., Fibonacci in O(1) space).\n   - Optimize 2D DP to 1D (e.g., knapsack variants).\n\n**Examples:**\nSolve problems like *House Robber*, *Climbing Stairs*, *Maximum Subarray*, or *Coin Change* (LeetCode) efficiently.",
	},
	{
		id: "dynamicProgramming2d",
		name: "Dynamic Programming 2D",
		description:
			"**Dynamic Programming (2D)**\nA technique that solves complex problems by breaking them into overlapping subproblems with **two dimensions** (e.g., sequences, grids) and storing results in a 2D array. Optimizes time by reusing precomputed states, typically achieving O(n*m) time and space complexity for problems involving two variables or sequences.\n\n**Use Cases:**\n1. **Sequence alignment/comparison:**\n   - Find the longest common subsequence (LCS) between two strings.\n   - Calculate the minimum edit distance (Levenshtein distance).\n2. **Grid/matrix traversal:**\n   - Count unique paths in a grid with obstacles.\n   - Find the minimum path sum in a grid.\n3. **Knapsack variants:**\n   - Solve 0/1 knapsack with item constraints.\n   - Determine if a subset sum exists with two variables.\n4. **State transitions with dependencies:**\n   - Track states for wildcard or regex string matching.\n   - Optimize 2D problems with space reduction (e.g., using rolling arrays).\n\n**Examples:**\nSolve problems like *Edit Distance*, *Longest Common Subsequence*, *Unique Paths*, or *Partition Equal Subset Sum* (LeetCode) efficiently.",
	},
	{
		id: "greedy",
		name: "Greedy",
		description:
			"**Greedy**\nA technique that builds a solution step-by-step by always selecting the **locally optimal** choice at each stage, aiming to achieve a globally optimal result. Efficient for problems where local optimality guarantees global optimality, often achieving O(n log n) time (due to sorting) or O(n) time. Requires proof of correctness to ensure greedy choices are valid.\n\n**Use Cases:**\n1. **Scheduling/selection:**\n   - Interval scheduling (maximize non-overlapping intervals).\n   - Select activities with earliest finish times.\n2. **Optimization:**\n   - Minimum spanning trees (Kruskal’s/Prim’s algorithms).\n   - Dijkstra’s shortest path algorithm.\n3. **Compression:**\n   - Huffman coding for optimal prefix codes.\n4. **Canonical problems:**\n   - Coin change (with canonical denominations).\n   - Merge overlapping intervals.\n\n**Examples:**\nSolve problems like *Jump Game*, *Merge Intervals*, *Task Scheduler*, or *Gas Station* (LeetCode) efficiently.",
	},
	{
		id: "stack",
		name: "Stack",
		description:
			"**Stack**\nA linear data structure that follows Last-In-First-Out (LIFO) principles, enabling efficient insertion/removal of elements from one end. Ideal for problems requiring order tracking, reversals, or nested structure validation, often achieving O(n) time complexity with O(n) space.\n\n**Use Cases:**\n1. **Order-sensitive operations:**\n   - Validate nested structures (e.g., parentheses, brackets, HTML tags).\n   - Evaluate arithmetic expressions (postfix notation).\n2. **Reversals/tracking history:**\n   - Reverse strings or linked lists.\n   - Implement undo/redo functionality.\n3. **Monotonic sequences:**\n   - Find the next greater/smaller element in arrays.\n   - Track temperatures for daily warmer days.\n4. **Backtracking/DFS:**\n   - Simulate recursion iteratively (e.g., tree traversals).\n   - Explore paths in graphs/mazes with backtracking.\n\n**Examples:**\nSolve problems like *Valid Parentheses*, *Min Stack*, *Daily Temperatures*, or *Decode String* (LeetCode) efficiently.",
	},
	{
		id: "mergeIntervals",
		name: "Merge Intervals",
		description:
			"**Merge Intervals**\nA technique for consolidating overlapping or adjacent intervals by sorting and iteratively merging them. Efficiently resolves problems involving time ranges, schedules, or numeric intervals, typically achieving O(n log n) time complexity (due to sorting) and O(n) space for results.\n\n**Use Cases:**\n1. **Overlap consolidation:**\n   - Merge overlapping intervals (e.g., schedules, time blocks).\n   - Insert a new interval into a sorted list without overlaps.\n2. **Conflict detection:**\n   - Check if intervals conflict (e.g., meeting room bookings).\n   - Find minimum rooms needed for overlapping meetings.\n3. **Coverage analysis:**\n   - Compute total time covered by intervals.\n   - Identify gaps between intervals.\n4. **Intersection identification:**\n   - Find overlapping regions between two sets of intervals.\n   - Extract mutual availability from calendars.\n\n**Examples:**\nSolve problems like *Merge Intervals*, *Insert Interval*, *Meeting Rooms II*, or *Interval List Intersections* (LeetCode) efficiently.",
	},
	{
		id: "math",
		name: "Math",
		description:
			"**Math**\nA technique leveraging mathematical principles (number theory, algebra, geometry, etc.) to solve problems efficiently, often avoiding brute-force iteration. Focuses on properties, patterns, and optimizations derived from mathematical insights, achieving optimal time (e.g., O(1) for formula-based solutions) or space complexity.\n\n**Use Cases:**\n1. **Number properties:**\n   - Check primes, palindromes, or perfect squares.\n   - Reverse digits or handle overflow (e.g., Reverse Integer).\n2. **Arithmetic/sequences:**\n   - Implement operations without built-in operators (+, -, *, /).\n   - Calculate sums (e.g., arithmetic series, missing numbers).\n3. **Geometric computations:**\n   - Compute areas, distances, or coordinate overlaps.\n   - Determine if points form valid shapes (e.g., rectangles).\n4. **Combinatorics/modular math:**\n   - Solve permutations/combinations (e.g., unique paths).\n   - Use modular arithmetic for cyclic patterns or hashing.\n5. **Optimized algorithms:**\n   - Fast exponentiation (e.g., Pow(x, n)).\n   - Sieve of Eratosthenes for prime generation.\n\n**Examples:**\nSolve problems like *Reverse Integer*, *Happy Number*, *Pow(x, n)*, *Rectangle Area*, or *Trapping Rain Water* (LeetCode) efficiently.",
	},
	{
		id: "trees",
		name: "Trees",
		description:
			"**Trees**\nA hierarchical data structure where nodes are connected by edges in a parent-child relationship. Used for efficient organization, traversal, and modification of data with structured dependencies. Common variants include binary trees, BSTs, AVL trees, and tries. Operations like search, insertion, or deletion achieve O(log n) time in balanced trees but O(n) in skewed structures.\n\n**Use Cases:**\n1. **Traversal and search:**\n   - Perform in-order, pre-order, or post-order traversals.\n   - Search, insert, or delete nodes in binary search trees (BSTs).\n2. **Path and hierarchy analysis:**\n   - Find the lowest common ancestor (LCA) of two nodes.\n   - Calculate maximum/minimum path sums.\n3. **Structural operations:**\n   - Validate BST properties or balance (e.g., AVL trees).\n   - Convert sorted arrays to height-balanced BSTs.\n4. **Specialized trees:**\n   - Use tries for prefix-based string searches.\n   - Implement segment trees for range queries.\n\n**Examples:**\nSolve problems like *Validate Binary Search Tree*, *Binary Tree Level Order Traversal*, *Serialize and Deserialize Binary Tree*, or *Word Search II* (LeetCode) efficiently.",
	},
	{
		id: "hashing",
		name: "Hashing",
		description:
			"**Hashing**\nA technique that uses hash functions and data structures (e.g., hash maps, hash sets) to enable **O(1) average-time** data insertion, deletion, and lookup. Efficiently resolves problems requiring rapid access, frequency tracking, or duplicate detection, with collision handling (e.g., chaining, open addressing) to manage key overlaps.\n\n**Use Cases:**\n1. **Data retrieval:**\n   - Instantly check element existence (e.g., *Two Sum*).\n   - Track frequencies of characters, numbers, or objects.\n2. **Duplicate detection:**\n   - Identify duplicate entries in arrays/strings.\n   - Find unique elements (e.g., *Single Number* XOR variant).\n3. **Key-value storage:**\n   - Cache/memoize results (e.g., memoization in DP).\n   - Map keys to values (e.g., database indexing).\n4. **Efficient lookups:**\n   - Group anagrams by hashable keys (e.g., sorted strings).\n   - Find subarrays with target sums (prefix-sum tracking).\n\n**Examples:**\nSolve problems like *Two Sum*, *Group Anagrams*, *Longest Substring Without Repeating Characters*, or *Subarray Sum Equals K* (LeetCode) efficiently.",
	},
	{
		id: "linkedList",
		name: "Linked List",
		description:
			"**Linked List**\nA linear data structure consisting of nodes connected by pointers, enabling efficient insertion/deletion at specific positions (unlike arrays). Optimized for sequential access and dynamic memory allocation, with operations like traversal, reversal, and cycle detection typically achieving O(n) time and O(1) auxiliary space.\n\n**Use Cases:**\n1. **Cycle detection/manipulation:**\n   - Detect cycles using Floyd’s Tortoise and Hare algorithm.\n   - Find the starting node of a cycle.\n2. **Node operations:**\n   - Reverse the entire list or segments (e.g., in groups of k).\n   - Remove the Nth node from the end (two-pointer approach).\n3. **Structural modifications:**\n   - Merge two sorted linked lists.\n   - Reorder nodes (e.g., odd-even separation, zigzag patterns).\n4. **Specialized algorithms:**\n   - Add two numbers represented as linked lists.\n   - Flatten a multilevel doubly linked list.\n\n**Examples:**\nSolve problems like *Linked List Cycle*, *Reverse Linked List*, *Merge Two Sorted Lists*, or *Add Two Numbers* (LeetCode) efficiently.",
	},
	{
		id: "divideAndConquer",
		name: "Divide and Conquer",
		description:
			"**Divide and Conquer**\nA technique that solves problems by recursively breaking them into smaller subproblems, solving each independently, and combining their results. Optimizes efficiency for problems with overlapping substructures, often achieving O(n log n) time complexity (e.g., sorting) and enabling parallelism.\n\n**Use Cases:**\n1. **Sorting/searching:**\n   - Implement Merge Sort or Quick Sort.\n   - Find the Kth largest element (QuickSelect).\n2. **Mathematical computations:**\n   - Compute large powers (e.g., Pow(x, n)).\n   - Multiply large integers (Karatsuba algorithm).\n3. **Tree/grid operations:**\n   - Construct binary trees from preorder/inorder traversals.\n   - Solve matrix multiplication (Strassen’s algorithm).\n4. **Spatial/sequence analysis:**\n   - Find the closest pair of points in 2D space.\n   - Solve the maximum subarray problem (Kadane’s variant).\n\n**Examples:**\nSolve problems like *Merge Sort*, *QuickSort*, *Different Ways to Add Parentheses*, or *Kth Largest Element in an Array* (LeetCode) efficiently.",
	},
];
