import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Pawn extends Piece {

    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = [];
        const pawnCurrentPosition: Square = board.findPiece(this);

        switch (this.player) {
            case Player.WHITE:
                if (!this.isSquareInBounds(new Square(pawnCurrentPosition.row + 1, pawnCurrentPosition.col))){
                    break;
                }
                const pieceAboveThePawn: Piece | undefined = board.getPiece(new Square(pawnCurrentPosition.row + 1, pawnCurrentPosition.col));

                if (pawnCurrentPosition.row === 1) {
                    const pieceAboveWithTwoSquares: Piece | undefined = board.getPiece(new Square(pawnCurrentPosition.row + 2, pawnCurrentPosition.col));
                    if (!pieceAboveWithTwoSquares && !pieceAboveThePawn) {
                        availableMoves.push(new Square(pawnCurrentPosition.row + 2, pawnCurrentPosition.col));
                    }
                }

                if (!pieceAboveThePawn) {
                    availableMoves.push(new Square(pawnCurrentPosition.row + 1, pawnCurrentPosition.col));
                }
                break;
            case Player.BLACK:
                if (!this.isSquareInBounds(new Square(pawnCurrentPosition.row - 1, pawnCurrentPosition.col))){
                    break;
                }
                const pieceUnderThePawn: Piece | undefined =  board.getPiece(new Square(pawnCurrentPosition.row - 1, pawnCurrentPosition.col));

                if (pawnCurrentPosition.row === 6) {
                    const pieceUnderWithTwoSquares: Piece | undefined = board.getPiece(new Square(pawnCurrentPosition.row - 2, pawnCurrentPosition.col));
                    if (!pieceUnderWithTwoSquares && !pieceUnderThePawn) {
                        availableMoves.push(new Square(pawnCurrentPosition.row - 2, pawnCurrentPosition.col));
                    }
                }

                if (!pieceUnderThePawn) {
                    availableMoves.push(new Square(pawnCurrentPosition.row - 1, pawnCurrentPosition.col));
                }
                break;
        }


        return availableMoves;
    }

    private isSquareInBounds(position: Square): boolean {
        return position.row >= 0 && position.col >= 0 && position.row < gameSettings.BOARD_SIZE && position.col < gameSettings.BOARD_SIZE;
    }
}
