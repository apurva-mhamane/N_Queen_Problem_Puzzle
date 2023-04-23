# N_Queen_Problem_Puzzle
N-Queen problem puzzle here is to place queens on the empty chessboard in such a way that no queen attacks any other queen
Procedure:
1. Initialize an empty chessboard of size NxN.
2. Start with the leftmost column and place a queen in the first row of that column.
3. Move to the next column and place a queen in the first row of that column.
4. Repeat step 3 until either all N queens have been placed or it is impossible to place a queen in the current column without violating the rules of the problem.
5. If all N queens have been placed, print the solution.
6. If it is not possible to place a queen in the current column without violating the rules of the problem, backtrack to the previous column.
7. Remove the queen from the previous column and move it down one row.
8. Repeat steps 4-7 until all possible configurations have been tried.
![image](https://user-images.githubusercontent.com/131534195/233823857-928ab3a1-f9f0-4a24-834a-9f7d3da2b849.png)
![image](https://user-images.githubusercontent.com/131534195/233823892-c7cbceb8-c3f1-4667-abf4-bb3ec90673b9.png)
![image](https://user-images.githubusercontent.com/131534195/233823963-14eed26c-501b-4b87-ac2b-8364459ddfdd.png)
![image](https://user-images.githubusercontent.com/131534195/233824002-069249a3-b368-4fd9-8db9-ac84a93db624.png)
