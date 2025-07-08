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
        for (let i = 0; i < gameSettings.BOARD_SIZE; i++) {
            if (i != rookCurrentPosition.row) {
                availableMoves.push(new Square(i,  rookCurrentPosition.col));
            }
        }

        for (let j = 0; j < gameSettings.BOARD_SIZE; j++) {
            if (j != rookCurrentPosition.col) {
                availableMoves.push(new Square(rookCurrentPosition.row,  j));
            }
        }

        return availableMoves;
    }
}
