import { calculateWinner } from "../../helpers";

describe('calculateWinner', () => {
    test('should return null on empty board', () => {
        let squares = Array(9).fill(null);
        expect(calculateWinner(squares)).toBe(null);
    });
    
    test('should return line on winning X', () => {
        let squares = Array(9).fill(null);
        squares[0] = 'X';
        squares[3] = 'X';
        squares[6] = 'X';
        expect(calculateWinner(squares)).toHaveProperty("winner", "X");
        expect(calculateWinner(squares)).toHaveProperty("line", [0, 3, 6]);
    });

    test('should return line on winning O', () => {
        let squares = Array(9).fill(null);
        squares[0] = 'O';
        squares[3] = 'O';
        squares[6] = 'O';
        expect(calculateWinner(squares)).toHaveProperty("winner", "O");
        expect(calculateWinner(squares)).toHaveProperty("line", [0, 3, 6]);
    });

    test('should return null if not same symbol in line', () => {
        let squares = Array(9).fill(null);
        squares[0] = 'O';
        squares[3] = 'X';
        squares[6] = 'O';
        expect(calculateWinner(squares)).toBe(true);
    });
});
