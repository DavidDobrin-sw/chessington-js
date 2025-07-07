import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = [];
        const kingInitialPosition: Square = board.findPiece(this);

        const kingMoves: number[][] = [[0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1]];

        for (let i = 0; i < kingMoves.length; i++) {
            availableMoves.push(new Square(kingInitialPosition.row + kingMoves[i][0], kingInitialPosition.col + kingMoves[i][1]));
        }

        return availableMoves;
    }
}
