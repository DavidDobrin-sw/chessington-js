import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = [];
        const pawnCurrentPosition: Square = board.findPiece(this);

        switch (this.player) {
            case Player.WHITE:
                const squareAboveThePawnPiece: Piece | undefined = board.getPiece(new Square(pawnCurrentPosition.row + 1, pawnCurrentPosition.col));

                if (!squareAboveThePawnPiece) {
                    availableMoves.push(new Square(pawnCurrentPosition.row + 1, pawnCurrentPosition.col));
                }
                break;
            case Player.BLACK:
                const squareUnderThePawnPiece: Piece | undefined =  board.getPiece(new Square(pawnCurrentPosition.row - 1, pawnCurrentPosition.col));

                if (!squareUnderThePawnPiece) {
                    availableMoves.push(new Square(pawnCurrentPosition.row - 1, pawnCurrentPosition.col));
                }
        }


        return availableMoves;
    }
}
