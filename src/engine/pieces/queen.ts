import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = [];

        this.getAvailableMovesLaterally(board, availableMoves);
        this.getAvailableMovesDiagonally(board, availableMoves);

        return availableMoves;
    }

    private getAvailableMovesDiagonally(board: Board, availableMoves: Square[]) {
        const queenInitialPosition: Square = board.findPiece(this);

        let queenCurrentPosition = new Square(queenInitialPosition.row, queenInitialPosition.col);
        // forwards up diagonal
        while (queenCurrentPosition.row < gameSettings.BOARD_SIZE - 1 && queenCurrentPosition.col < gameSettings.BOARD_SIZE - 1) {
            queenCurrentPosition.row++;
            queenCurrentPosition.col++;
            availableMoves.push(new Square(queenCurrentPosition.row, queenCurrentPosition.col));
        }

        queenCurrentPosition = new Square(queenInitialPosition.row, queenInitialPosition.col);
        // forwards down diagonal
        while (queenCurrentPosition.row > 0 && queenCurrentPosition.col > 0) {
            queenCurrentPosition.row--;
            queenCurrentPosition.col--;
            availableMoves.push(new Square(queenCurrentPosition.row, queenCurrentPosition.col));
        }

        queenCurrentPosition = new Square(queenInitialPosition.row, queenInitialPosition.col);
        // backwards up diagonal
        while (queenCurrentPosition.row < gameSettings.BOARD_SIZE - 1 && queenCurrentPosition.col > 0) {
            queenCurrentPosition.row++;
            queenCurrentPosition.col--;
            availableMoves.push(new Square(queenCurrentPosition.row, queenCurrentPosition.col));
        }

        queenCurrentPosition = new Square(queenInitialPosition.row, queenInitialPosition.col);
        // backwards down diagonal
        while (queenCurrentPosition.row > 0 && queenCurrentPosition.col < gameSettings.BOARD_SIZE - 1) {
            queenCurrentPosition.row--;
            queenCurrentPosition.col++;
            availableMoves.push(new Square(queenCurrentPosition.row, queenCurrentPosition.col));
        }
    }

    private getAvailableMovesLaterally(board:Board, availableMoves: Square[]) {
        const queenInitialPosition: Square = board.findPiece(this);

        for (let i = 0; i < gameSettings.BOARD_SIZE; i++) {
            if (i != queenInitialPosition.row) {
                availableMoves.push(new Square(i,  queenInitialPosition.col));
            }
        }

        for (let j = 0; j < gameSettings.BOARD_SIZE; j++) {
            if (j != queenInitialPosition.col) {
                availableMoves.push(new Square(queenInitialPosition.row,  j));
            }
        }
    }
}
