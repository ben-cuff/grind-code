export type Question = {
	createdAt: string;
	id: string;
	name: string;
	pattern: string;
	prompt: string;
	questionNumber: number;
	solutionRoute: string;
	updatedAt: string;
	urlQuestion: string;
	urlSolution: string;
	explanation?: string;
	solution?: string;
};
