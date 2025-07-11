import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";
import gameSettings from "../gameSettings";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = [];
        const knightInitialPosition: Square = board.findPiece(this);

        const knightMoves: number[][] = [[1, 2], [-1, 2], [2, 1], [-2, 1], [1, -2], [-1, -2], [2, -1], [-2, -1]];

        for (let i = 0; i < knightMoves.length; i++) {
            const nextRow = knightInitialPosition.row + knightMoves[i][0];
            const nextCol = knightInitialPosition.col + knightMoves[i][1];
            const nextKnightMove: Square = new Square(nextRow, nextCol);
            if (!this.isSquareInBounds(nextKnightMove)) {
                continue;
            }
            const pieceAtNextKnightMove: Piece | undefined = board.getPiece(nextKnightMove);
            if(!pieceAtNextKnightMove || (pieceAtNextKnightMove && pieceAtNextKnightMove.player != this.player && !(pieceAtNextKnightMove instanceof King))) {
                availableMoves.push(new Square(knightInitialPosition.row + knightMoves[i][0], knightInitialPosition.col + knightMoves[i][1]));
            }
        }

        return availableMoves;
    }
    private isSquareInBounds(position: Square): boolean {
        return position.row >= 0 && position.col >= 0 && position.row < gameSettings.BOARD_SIZE && position.col < gameSettings.BOARD_SIZE;
    }
}
