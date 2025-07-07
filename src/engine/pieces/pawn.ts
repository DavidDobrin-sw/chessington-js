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
                const pieceAboveThePawn: Piece | undefined = board.getPiece(new Square(pawnCurrentPosition.row + 1, pawnCurrentPosition.col));

                if(pawnCurrentPosition.row === 1){
                    const pieceAboveWithTwoSquares: Piece | undefined = board.getPiece(new Square(pawnCurrentPosition.row + 2, pawnCurrentPosition.col));
                    if(!pieceAboveWithTwoSquares && !pieceAboveThePawn) {
                        availableMoves.push(new Square(pawnCurrentPosition.row + 2, pawnCurrentPosition.col));
                    }
                }

                if (!pieceAboveThePawn) {
                    availableMoves.push(new Square(pawnCurrentPosition.row + 1, pawnCurrentPosition.col));
                }
                break;
            case Player.BLACK:
                const pieceUnderThePawn: Piece | undefined =  board.getPiece(new Square(pawnCurrentPosition.row - 1, pawnCurrentPosition.col));

                if(pawnCurrentPosition.row === 6){
                    const pieceUnderWithTwoSquares: Piece | undefined = board.getPiece(new Square(pawnCurrentPosition.row - 2, pawnCurrentPosition.col));
                    if(!pieceUnderWithTwoSquares && !pieceUnderThePawn) {
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
}
