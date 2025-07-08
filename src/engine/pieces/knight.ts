import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = [];
        const knightInitialPosition: Square = board.findPiece(this);

        const knightMoves: number[][] = [[1, 2], [-1, 2], [2, 1], [-2, 1], [1, -2], [-1, -2], [2, -1], [-2, -1]];

        for (let i = 0; i < knightMoves.length; i++) {
            availableMoves.push(new Square(knightInitialPosition.row + knightMoves[i][0], knightInitialPosition.col + knightMoves[i][1]));
        }

        return availableMoves;
    }
}
