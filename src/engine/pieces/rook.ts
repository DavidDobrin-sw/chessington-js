import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        let availableMoves: Square[] = [];
        const rookCurrentPosition: Square = board.findPiece(this);

        for (let i = rookCurrentPosition.row + 1; i < gameSettings.BOARD_SIZE; i++) {
            const pieceNearRook: Piece | undefined = board.getPiece(new Square(i, rookCurrentPosition.col));
            if (pieceNearRook) {
                break;
            }

            availableMoves.push(new Square(i,  rookCurrentPosition.col));

        }

        for (let i = rookCurrentPosition.row - 1; i >= 0; i--) {
            const pieceNearRook: Piece | undefined = board.getPiece(new Square(i, rookCurrentPosition.col));
            if (pieceNearRook) {
                break;
            }

            availableMoves.push(new Square(i,  rookCurrentPosition.col));

        }

        for (let j = rookCurrentPosition.col + 1; j < gameSettings.BOARD_SIZE; j++) {
            const pieceNearRook: Piece | undefined = board.getPiece(new Square(rookCurrentPosition.row, j));
            if (pieceNearRook) {
                break;
            }

            availableMoves.push(new Square(rookCurrentPosition.row,  j));
        }

        for (let j = rookCurrentPosition.col - 1; j >= 0; j--) {
            const pieceNearRook: Piece | undefined = board.getPiece(new Square(rookCurrentPosition.row, j));
            if (pieceNearRook) {
                break;
            }

            availableMoves.push(new Square(rookCurrentPosition.row,  j));
        }

        return availableMoves;
    }
}
