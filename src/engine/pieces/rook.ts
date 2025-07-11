import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";
import King from "./king";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    private checkMove(board: Board , row: number, col: number, availableMoves: Square[]): Piece | undefined {
        const pieceNearRook: Piece | undefined = board.getPiece(new Square(row, col));
        if (pieceNearRook) {
            if (pieceNearRook.player != this.player && !(pieceNearRook instanceof King)) {
                availableMoves.push(new Square(row,  col));
            }
        }

        return pieceNearRook;

    }

    public getAvailableMoves(board: Board) {

        let availableMoves: Square[] = [];
        const rookCurrentPosition: Square = board.findPiece(this);

        for (let i = rookCurrentPosition.row + 1; i < gameSettings.BOARD_SIZE; i++) {
            if(this.checkMove(board, i, rookCurrentPosition.col, availableMoves)) {
                break;
            }

            availableMoves.push(new Square(i,  rookCurrentPosition.col));
        }

        for (let i = rookCurrentPosition.row - 1; i >= 0; i--) {
            if(this.checkMove(board, i, rookCurrentPosition.col, availableMoves)) {
                break;
            }

            availableMoves.push(new Square(i,  rookCurrentPosition.col));
        }

        for (let j = rookCurrentPosition.col + 1; j < gameSettings.BOARD_SIZE; j++) {
            if(this.checkMove(board, rookCurrentPosition.row, j, availableMoves)) {
                break;
            }

            availableMoves.push(new Square(rookCurrentPosition.row,  j));
        }

        for (let j = rookCurrentPosition.col - 1; j >= 0; j--) {
            if(this.checkMove(board, rookCurrentPosition.row, j, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(rookCurrentPosition.row,  j));
        }

        return availableMoves;
    }

}
